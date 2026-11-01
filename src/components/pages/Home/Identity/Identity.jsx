import { useEffect, useRef, useState } from 'react'
import identityImage from '../../../../assets/home/ouridentity/identity.png'
import './Identity.css'

const TITLE = 'Identiteti ynë.'

function Identity() {
  const rootRef = useRef(null)
  const [typed, setTyped] = useState('')

  useEffect(() => {
    const node = rootRef.current
    if (!node) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let intervalId = 0

    const type = () => {
      if (reduce) {
        setTyped(TITLE)
        return
      }

      setTyped('')
      let i = 0
      intervalId = window.setInterval(() => {
        i += 1
        setTyped(TITLE.slice(0, i))
        if (i >= TITLE.length) window.clearInterval(intervalId)
      }, 180)
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
  }, [])

  return (
    <section className="identity" id="identity" aria-label="Identiteti ynë" ref={rootRef}>
      <figure className="identity__bleed">
        <img src={identityImage} alt="Peceta N+T Catering" />
        <h2 className="identity__title">
          <span className="identity__ghost" aria-hidden>
            {TITLE}
          </span>
          <span className="identity__typed">
            {typed}
            {typed !== TITLE ? (
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
