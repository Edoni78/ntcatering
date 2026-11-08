import { useRef, useState } from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi2'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SectionLabel from '../../../shared/SectionLabel/SectionLabel'
import { useI18n } from '../../../../i18n/I18n'
import './Faq.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function Faq() {
  const { t } = useI18n()
  const heading = t('home.faq.heading')
  const questions = t('home.faq.items')
  const rootRef = useRef(null)
  const [open, setOpen] = useState(0)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const root = rootRef.current
      if (!root || reduced) return

      const lines = root.querySelectorAll('.faq__line span')
      const lead = root.querySelector('.faq__lead')
      const items = root.querySelectorAll('.faq__item')

      gsap.set(lines, { yPercent: 35 })
      gsap.set(lead, { y: 6, autoAlpha: 0 })
      gsap.set(items, { y: 6, autoAlpha: 0 })

      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: root,
            start: 'top 75%',
            once: true,
          },
        })
        .to(lines, { yPercent: 0, duration: 0.5, stagger: 0.05 }, 0)
        .to(lead, { y: 0, autoAlpha: 1, duration: 0.4, ease: 'power2.out' }, 0.06)
        .to(items, { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.04 }, 0.08)
    },
    { scope: rootRef },
  )

  return (
    <section className="faq" id="contact" aria-label={t('home.faq.label')} ref={rootRef}>
      <div className="container faq__inner">
        <div className="faq__side">
          <SectionLabel tone="burgundy">{t('home.faq.label')}</SectionLabel>
        </div>
        <div className="faq__main">
          <h2 className="faq__heading">
            {heading.map((line) => (
              <span className="faq__line" key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h2>
          <p className="faq__lead">{t('home.faq.lead')}</p>

          <ul className="faq__list">
            {questions.map((item, index) => {
              const isOpen = open === index
              return (
                <li key={item.q} className={`faq__item${isOpen ? ' is-open' : ''}`}>
                  <button
                    type="button"
                    className="faq__q"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : index)}
                  >
                    <span>{item.q}</span>
                    {isOpen ? <HiMinus /> : <HiPlus />}
                  </button>
                  <div className="faq__a" hidden={!isOpen}>
                    <p>{item.a}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Faq
