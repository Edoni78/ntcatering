import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SectionLabel from '../../../shared/SectionLabel/SectionLabel'
import { useI18n } from '../../../../i18n/I18n'
import './Clients.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function Clients() {
  const { t } = useI18n()
  const clients = t('home.clients.items')
  const rootRef = useRef(null)
  const [active, setActive] = useState(0)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const root = rootRef.current
      if (!root || reduced) return

      const quote = root.querySelector('.clients__quote')
      const items = root.querySelectorAll('.clients__item')

      gsap.set(quote, { y: 8, autoAlpha: 0 })
      gsap.set(items, { y: 6, autoAlpha: 0 })

      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: root,
            start: 'top 75%',
            once: true,
          },
          onComplete: () => {
            gsap.set(items, { clearProps: 'opacity,visibility,transform' })
          },
        })
        .to(quote, { y: 0, autoAlpha: 1, duration: 0.5 }, 0)
        .to(items, { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.05 }, 0.08)

      const refresh = () => ScrollTrigger.refresh()
      document.addEventListener('preloader:done', refresh)
      return () => document.removeEventListener('preloader:done', refresh)
    },
    { scope: rootRef },
  )

  return (
    <section className="clients" id="clients" aria-label={t('home.clients.label')} ref={rootRef}>
      <div className="container clients__inner">
        <SectionLabel>{t('home.clients.label')}</SectionLabel>
        <p className="clients__quote">{clients[active].quote}</p>

        <ul className="clients__list">
          {clients.map((client, index) => (
            <li key={client.index}>
              <button
                type="button"
                className={`clients__item${active === index ? ' is-active' : ''}`}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
              >
                <span className="clients__num">{client.index}</span>
                <span className="clients__name">{client.name}</span>
                <span className="clients__detail">{client.detail}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Clients
