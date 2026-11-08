import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SectionLabel from '../../../shared/SectionLabel/SectionLabel'
import canape from '../../../../assets/otherimages/IMG_7096.jpg'
import dessert from '../../../../assets/otherimages/IMG_7098.jpg'
import { useI18n } from '../../../../i18n/I18n'
import './Pair.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function Pair() {
  const { t } = useI18n()
  const heading = t('services.pair.heading')
  const rootRef = useRef(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const root = rootRef.current
      if (!root || reduced) return

      const lines = root.querySelectorAll('.svc-pair__line span')
      const cards = root.querySelectorAll('.svc-pair__card')

      gsap.set(lines, { yPercent: 35 })
      gsap.set(cards, { y: 8, autoAlpha: 0 })

      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: root, start: 'top 75%', once: true },
        })
        .to(lines, { yPercent: 0, duration: 0.55, stagger: 0.05 }, 0)
        .to(cards, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.08 }, 0.08)
    },
    { scope: rootRef },
  )

  return (
    <section className="svc-pair" aria-labelledby="svc-pair-title" ref={rootRef}>
      <div className="container svc-pair__inner">
        <header className="svc-pair__header">
          <SectionLabel>{t('services.pair.label')}</SectionLabel>
          <h2 className="svc-pair__heading" id="svc-pair-title">
            {heading.map((line) => (
              <span className="svc-pair__line" key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h2>
        </header>

        <div className="svc-pair__grid">
          <article className="svc-pair__card">
            <figure>
              <img src={canape} alt={t('services.pair.altCanape')} />
            </figure>
            <p className="svc-pair__index">01</p>
            <h3>{t('services.pair.canape')}</h3>
            <p>{t('services.pair.canapeText')}</p>
          </article>
          <article className="svc-pair__card">
            <figure>
              <img src={dessert} alt={t('services.pair.altDessert')} />
            </figure>
            <p className="svc-pair__index">02</p>
            <h3>{t('services.pair.dessert')}</h3>
            <p>{t('services.pair.dessertText')}</p>
          </article>
        </div>
      </div>
    </section>
  )
}

export default Pair
