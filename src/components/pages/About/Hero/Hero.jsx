import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import heroImage from '../../../../assets/home/ouridentity/identity.png'
import { useI18n } from '../../../../i18n/I18n'
import '../../Plan/Hero/Hero.css'

gsap.registerPlugin(useGSAP)

function AboutHero() {
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
        { y: 12, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08, delay: 0.15, ease: 'power3.out' },
      )
    },
    { scope: rootRef },
  )

  return (
    <section className="plan-hero" aria-labelledby="about-hero-title" ref={rootRef}>
      <img className="plan-hero__photo" src={heroImage} alt="" />
      <div className="plan-hero__fade" />

      <div className="plan-hero__copy">
        <p className="plan-hero__eyebrow">{t('about.eyebrow')}</p>
        <h1 id="about-hero-title">{t('about.title')}</h1>
        <p className="plan-hero__lead">{t('about.lead')}</p>
      </div>
    </section>
  )
}

export default AboutHero
