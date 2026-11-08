import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SectionLabel from '../../../shared/SectionLabel/SectionLabel'
import { useI18n } from '../../../../i18n/I18n'
import './Values.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function Values() {
  const { t } = useI18n()
  const heading = t('about.values.heading')
  const items = t('about.values.items')
  const rootRef = useRef(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const root = rootRef.current
      if (!root || reduced) return

      const lines = root.querySelectorAll('.about-values__line span')
      const cards = root.querySelectorAll('.about-values__card')

      gsap.set(lines, { yPercent: 35 })
      gsap.set(cards, { y: 8, autoAlpha: 0 })

      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: root, start: 'top 75%', once: true },
        })
        .to(lines, { yPercent: 0, duration: 0.55, stagger: 0.05 }, 0)
        .to(cards, { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.06 }, 0.08)
    },
    { scope: rootRef },
  )

  return (
    <section className="about-values" aria-labelledby="about-values-title" ref={rootRef}>
      <div className="container about-values__inner">
        <header className="about-values__header">
          <SectionLabel>{t('about.values.label')}</SectionLabel>
          <h2 className="about-values__heading" id="about-values-title">
            {heading.map((line) => (
              <span className="about-values__line" key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h2>
        </header>

        <div className="about-values__list">
          {items.map((item) => (
            <article className="about-values__card" key={item.index}>
              <p className="about-values__index">{item.index}</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Values
