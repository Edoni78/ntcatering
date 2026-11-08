import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import en from './en'
import sq from './sq'

const dictionaries = { sq, en }
const KEY = 'nt-lang'

function read(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj)
}

const I18nContext = createContext(null)

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem(KEY)
      return saved === 'en' || saved === 'sq' ? saved : 'sq'
    } catch {
      return 'sq'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(KEY, lang)
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang
    const description = read(dictionaries[lang], 'meta.description')
    const tag = document.querySelector('meta[name="description"]')
    if (tag && typeof description === 'string') tag.setAttribute('content', description)
  }, [lang])

  const value = useMemo(() => {
    const dict = dictionaries[lang]
    const t = (path, vars) => {
      let next = read(dict, path)
      if (next == null) next = read(dictionaries.sq, path)
      if (typeof next !== 'string') return next ?? path
      if (!vars) return next
      return next.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ''))
    }
    return { lang, setLang, t }
  }, [lang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider')
  return ctx
}
