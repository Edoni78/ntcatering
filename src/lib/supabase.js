import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient(url, key)

export async function sendContact(values) {
  const { error } = await supabase.from('contacts').insert({
    name: values.name.trim(),
    phone: `+383${values.phone}`,
    event_date: values.date || null,
    guests: values.guests ? Number(values.guests) : null,
    message: values.message.trim(),
  })

  if (error) throw error
}

export async function adminLogin(username, password) {
  const { data, error } = await supabase.rpc('admin_login', {
    p_user: username,
    p_pass: password,
  })

  if (error) throw error
  return data || null
}

export async function adminMessages(token) {
  const { data, error } = await supabase.rpc('admin_messages', { p_token: token })
  if (error) throw error
  return data || []
}

export async function adminDelete(token, id) {
  const { error } = await supabase.rpc('admin_delete', { p_token: token, p_id: id })
  if (error) throw error
}
