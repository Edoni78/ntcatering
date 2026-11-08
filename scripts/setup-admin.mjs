import pg from 'pg'

const password = process.env.PGPASSWORD
const adminPass = process.env.ADMIN_PASS

if (!password || !adminPass) {
  console.error('Missing PGPASSWORD or ADMIN_PASS')
  process.exit(1)
}

const client = new pg.Client({
  host: 'db.pxeaaxnbvrcdcoyocjat.supabase.co',
  port: 5432,
  user: 'postgres',
  password,
  database: 'postgres',
  ssl: { rejectUnauthorized: false },
})

const sql = `
create extension if not exists pgcrypto;

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  event_date date,
  guests integer,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  username text primary key,
  password_hash text not null
);

create table if not exists public.admin_sessions (
  token text primary key,
  expires_at timestamptz not null
);

alter table public.contacts enable row level security;
alter table public.admin_users enable row level security;
alter table public.admin_sessions enable row level security;

drop policy if exists "contacts_insert" on public.contacts;
create policy "contacts_insert" on public.contacts
  for insert to anon, authenticated
  with check (
    char_length(name) between 1 and 120
    and char_length(phone) between 8 and 20
    and char_length(message) between 1 and 2000
  );

grant usage on schema public to anon, authenticated;
grant insert on public.contacts to anon, authenticated;

insert into public.admin_users (username, password_hash)
values ('ntcatering', crypt($1, gen_salt('bf')))
on conflict (username) do update set password_hash = excluded.password_hash;

create or replace function public.admin_login(p_user text, p_pass text)
returns text
language plpgsql
security definer
set search_path = public
as $fn$
declare
  ok boolean;
  tok text;
begin
  select (crypt(p_pass, password_hash) = password_hash) into ok
  from public.admin_users
  where username = p_user;

  if not coalesce(ok, false) then
    return null;
  end if;

  delete from public.admin_sessions where expires_at < now();
  tok := encode(gen_random_bytes(24), 'hex');
  insert into public.admin_sessions (token, expires_at)
  values (tok, now() + interval '12 hours');
  return tok;
end;
$fn$;

create or replace function public.admin_messages(p_token text)
returns setof public.contacts
language plpgsql
security definer
set search_path = public
as $fn$
begin
  if not exists (
    select 1 from public.admin_sessions
    where token = p_token and expires_at > now()
  ) then
    raise exception 'unauthorized';
  end if;

  return query
  select * from public.contacts
  order by created_at desc;
end;
$fn$;

create or replace function public.admin_delete(p_token text, p_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $fn$
begin
  if not exists (
    select 1 from public.admin_sessions
    where token = p_token and expires_at > now()
  ) then
    raise exception 'unauthorized';
  end if;

  delete from public.contacts where id = p_id;
end;
$fn$;

revoke all on function public.admin_login(text, text) from public;
revoke all on function public.admin_messages(text) from public;
revoke all on function public.admin_delete(text, uuid) from public;
grant execute on function public.admin_login(text, text) to anon, authenticated;
grant execute on function public.admin_messages(text) to anon, authenticated;
grant execute on function public.admin_delete(text, uuid) to anon, authenticated;
`

await client.connect()
await client.query(sql, [adminPass])
await client.end()
console.log('admin ready')
