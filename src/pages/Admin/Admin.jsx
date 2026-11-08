import { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { adminDelete, adminLogin, adminMessages } from '../../lib/supabase'
import { useI18n } from '../../i18n/I18n'
import './Admin.css'

const TOKEN_KEY = 'nt-admin-token'

function formatWhen(value, lang) {
  if (!value) return '—'
  return new Date(value).toLocaleString(lang === 'en' ? 'en-GB' : 'sq-AL', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function Admin() {
  const { t, lang } = useI18n()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isLogin = pathname === '/login'
  const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || '')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [messages, setMessages] = useState([])
  const [openId, setOpenId] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const load = async (nextToken) => {
    const rows = await adminMessages(nextToken)
    setMessages(rows)
  }

  useEffect(() => {
    if (!token) return
    load(token).catch(() => {
      sessionStorage.removeItem(TOKEN_KEY)
      setToken('')
    })
  }, [token])

  const onLogin = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const next = await adminLogin(username.trim(), password)
      if (!next) {
        setError(t('admin.bad'))
        return
      }
      sessionStorage.setItem(TOKEN_KEY, next)
      setToken(next)
      setPassword('')
      navigate('/admin', { replace: true })
    } catch {
      setError(t('admin.fail'))
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async (id) => {
    setError('')
    try {
      await adminDelete(token, id)
      setMessages((current) => current.filter((item) => item.id !== id))
      if (openId === id) setOpenId(null)
    } catch {
      setError(t('admin.deleteFail'))
    }
  }

  const logout = () => {
    sessionStorage.removeItem(TOKEN_KEY)
    setToken('')
    setMessages([])
    navigate('/login', { replace: true })
  }

  if (isLogin && token) return <Navigate to="/admin" replace />
  if (!isLogin && !token) return <Navigate to="/login" replace />

  if (isLogin) {
    return (
      <main className="admin">
        <form className="admin__login" onSubmit={onLogin}>
          <p className="admin__eyebrow">Admin</p>
          <h1>{t('admin.loginTitle')}</h1>
          <label>
            <span>{t('admin.user')}</span>
            <input value={username} onChange={(event) => setUsername(event.target.value)} required />
          </label>
          <label>
            <span>{t('admin.pass')}</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {error ? <p className="admin__error">{error}</p> : null}
          <button className="btn btn--fill" type="submit" disabled={loading}>
            <span>{loading ? t('admin.entering') : t('admin.enter')}</span>
          </button>
        </form>
      </main>
    )
  }

  return (
    <main className="admin">
      <div className="container admin__board">
        <header className="admin__bar">
          <div>
            <p className="admin__eyebrow">Admin</p>
            <h1>{t('admin.messages')}</h1>
          </div>
          <button className="admin__logout" type="button" onClick={logout}>
            {t('admin.logout')}
          </button>
        </header>

        {error ? <p className="admin__error">{error}</p> : null}

        {messages.length === 0 ? (
          <p className="admin__empty">{t('admin.empty')}</p>
        ) : (
          <ul className="admin__list">
            {messages.map((item) => {
              const open = openId === item.id
              return (
                <li className={`admin__item${open ? ' is-open' : ''}`} key={item.id}>
                  <button type="button" className="admin__summary" onClick={() => setOpenId(open ? null : item.id)}>
                    <span>
                      <strong>{item.name}</strong>
                      <span>{item.phone}</span>
                    </span>
                    <span>{formatWhen(item.created_at, lang)}</span>
                  </button>
                  {open ? (
                    <div className="admin__detail">
                      <p>{t('admin.eventDate')}: {item.event_date || '—'}</p>
                      <p>{t('admin.guests')}: {item.guests ?? '—'}</p>
                      <p className="admin__message">{item.message}</p>
                      <button className="admin__delete" type="button" onClick={() => onDelete(item.id)}>
                        {t('admin.delete')}
                      </button>
                    </div>
                  ) : null}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </main>
  )
}

export default Admin
