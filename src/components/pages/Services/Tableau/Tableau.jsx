import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import buffet from '../../../../assets/otherimages/IMG_7097.jpg'
import { useI18n } from '../../../../i18n/I18n'
import './Tableau.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function Tableau() {
  const { t } = useI18n()
  const rootRef = useRef(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const root = rootRef.current
      if (!root || reduced) return

      const copy = root.querySelectorAll('.svc-tableau__copy > *')
      gsap.set(copy, { y: 8, autoAlpha: 0 })
      gsap.to(copy, {
        y: 0,
        autoAlpha: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: { trigger: root, start: 'top 70%', once: true },
      })
    },
    { scope: rootRef },
  )

  return (
    <section className="svc-tableau" aria-labelledby="svc-tableau-title" ref={rootRef}>
      <img className="svc-tableau__photo" src={buffet} alt={t('services.tableau.alt')} />
      <div className="svc-tableau__veil" />
      <div className="container svc-tableau__copy">
        <p className="svc-tableau__eyebrow">{t('services.tableau.eyebrow')}</p>
        <h2 id="svc-tableau-title">{t('services.tableau.title')}</h2>
      </div>
    </section>
  )
}

export default Tableau
