import { useEffect, useRef, useState } from 'react'
import identityImage from '../../../../assets/home/ouridentity/identity.png'
import { useI18n } from '../../../../i18n/I18n'
import './Identity.css'

function Identity() {
  const { t, lang } = useI18n()
  const title = t('home.identity.title')
  const rootRef = useRef(null)
  const [typed, setTyped] = useState('')

  useEffect(() => {
    const node = rootRef.current
    if (!node) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let intervalId = 0

    const type = () => {
      if (reduce) {
        setTyped(title)
        return
      }

      setTyped('')
      let i = 0
      intervalId = window.setInterval(() => {
        i += 1
        setTyped(title.slice(0, i))
        if (i >= title.length) window.clearInterval(intervalId)
      }, 42)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        type()
        observer.disconnect()
      },
      { threshold: 0.35 },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      window.clearInterval(intervalId)
    }
  }, [title, lang])

  return (
    <section className="identity" id="identity" aria-label={t('home.identity.label')} ref={rootRef}>
      <figure className="identity__bleed">
        <img src={identityImage} alt={t('home.identity.alt')} />
        <h2 className="identity__title">
          <span className="identity__ghost" aria-hidden>
            {title}
          </span>
          <span className="identity__typed">
            {typed}
            {typed !== title ? (
              <span className="identity__caret" aria-hidden>
                |
              </span>
            ) : null}
          </span>
        </h2>
      </figure>
    </section>
  )
}

export default Identity
