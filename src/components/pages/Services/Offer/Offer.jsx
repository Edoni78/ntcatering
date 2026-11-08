import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SectionLabel from '../../../shared/SectionLabel/SectionLabel'
import { useI18n } from '../../../../i18n/I18n'
import './Offer.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function Offer() {
  const { t } = useI18n()
  const heading = t('services.offer.heading')
  const items = t('services.offer.items')
  const rootRef = useRef(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const root = rootRef.current
      if (!root || reduced) return

      const lines = root.querySelectorAll('.svc-offer__line span')
      const rows = root.querySelectorAll('.svc-offer__row')

      gsap.set(lines, { yPercent: 35 })
      gsap.set(rows, { y: 8, autoAlpha: 0 })

      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: root, start: 'top 75%', once: true },
        })
        .to(lines, { yPercent: 0, duration: 0.55, stagger: 0.05 }, 0)
        .to(rows, { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.05 }, 0.08)
    },
    { scope: rootRef },
  )

  return (
    <section className="svc-offer" aria-labelledby="svc-offer-title" ref={rootRef}>
      <div className="container svc-offer__inner">
        <header className="svc-offer__header">
          <SectionLabel>{t('services.offer.label')}</SectionLabel>
          <h2 className="svc-offer__heading" id="svc-offer-title">
            {heading.map((line) => (
              <span className="svc-offer__line" key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h2>
        </header>

        <div className="svc-offer__list">
          {items.map((item) => (
            <article className="svc-offer__row" key={item.index}>
              <p className="svc-offer__index">{item.index}</p>
              <h3>{item.title}</h3>
              <p className="svc-offer__text">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Offer
