import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import heroImage from '../../../../assets/branding/brand1.png'
import { useI18n } from '../../../../i18n/I18n'
import './Hero.css'

gsap.registerPlugin(useGSAP)

function PlanHero() {
  const { t } = useI18n()
  const rootRef = useRef(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const root = rootRef.current
      if (!root || reduced) return

      const copy = root.querySelectorAll('.plan-hero__copy > *')
      gsap.fromTo(
        copy,
        { y: 22, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, stagger: 0.1, delay: 0.2, ease: 'power3.out' },
      )
    },
    { scope: rootRef },
  )

  return (
    <section className="plan-hero" aria-labelledby="plan-hero-title" ref={rootRef}>
      <img className="plan-hero__photo" src={heroImage} alt="" />
      <div className="plan-hero__fade" />

      <div className="plan-hero__copy">
        <p className="plan-hero__eyebrow">{t('plan.eyebrow')}</p>
        <h1 id="plan-hero-title">{t('plan.title')}</h1>
        <p className="plan-hero__lead">{t('plan.lead')}</p>
      </div>
    </section>
  )
}

export default PlanHero
