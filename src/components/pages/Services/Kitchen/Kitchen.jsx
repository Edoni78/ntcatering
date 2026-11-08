import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SectionLabel from '../../../shared/SectionLabel/SectionLabel'
import imgRolls from '../../../../assets/otherimages/IMG_7093.jpg'
import imgSalad from '../../../../assets/otherimages/IMG_7094.jpg'
import { useI18n } from '../../../../i18n/I18n'
import './Kitchen.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function Kitchen() {
  const { t } = useI18n()
  const heading = t('services.kitchen.heading')
  const rootRef = useRef(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const root = rootRef.current
      if (!root || reduced) return

      const lines = root.querySelectorAll('.svc-kitchen__line span')
      const frames = root.querySelectorAll('.svc-kitchen__frame')
      const note = root.querySelector('.svc-kitchen__note')

      gsap.set(lines, { yPercent: 35 })
      gsap.set(frames, { clipPath: 'inset(100% 0 0 0)' })
      gsap.set(note, { y: 8, autoAlpha: 0 })

      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: root, start: 'top 75%', once: true },
        })
        .to(lines, { yPercent: 0, duration: 0.55, stagger: 0.05 }, 0)
        .to(frames, { clipPath: 'inset(0% 0 0 0)', duration: 0.8, stagger: 0.1, ease: 'power2.inOut' }, 0.06)
        .to(note, { y: 0, autoAlpha: 1, duration: 0.45 }, 0.28)
    },
    { scope: rootRef },
  )

  return (
    <section className="svc-kitchen" aria-labelledby="svc-kitchen-title" ref={rootRef}>
      <div className="container svc-kitchen__inner">
        <div className="svc-kitchen__copy">
          <SectionLabel>{t('services.kitchen.label')}</SectionLabel>
          <h2 className="svc-kitchen__heading" id="svc-kitchen-title">
            {heading.map((line) => (
              <span className="svc-kitchen__line" key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h2>
          <p className="svc-kitchen__note">{t('services.kitchen.note')}</p>
        </div>

        <div className="svc-kitchen__photos">
          <figure className="svc-kitchen__frame svc-kitchen__frame--main">
            <img src={imgRolls} alt={t('services.kitchen.altRolls')} />
          </figure>
          <figure className="svc-kitchen__frame svc-kitchen__frame--side">
            <img src={imgSalad} alt={t('services.kitchen.altSalad')} />
          </figure>
        </div>
      </div>
    </section>
  )
}

export default Kitchen
