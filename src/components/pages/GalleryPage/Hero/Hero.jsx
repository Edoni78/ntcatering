import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import heroImage from '../../../../assets/branding/brand2.png'
import { useI18n } from '../../../../i18n/I18n'
import '../../Plan/Hero/Hero.css'

gsap.registerPlugin(useGSAP)

function GalleryHero() {
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
    <section className="plan-hero" aria-labelledby="gallery-hero-title" ref={rootRef}>
      <img className="plan-hero__photo" src={heroImage} alt="" />
      <div className="plan-hero__fade" />

      <div className="plan-hero__copy">
        <p className="plan-hero__eyebrow">{t('gallery.eyebrow')}</p>
        <h1 id="gallery-hero-title">{t('gallery.title')}</h1>
        <p className="plan-hero__lead">{t('gallery.lead')}</p>
      </div>
    </section>
  )
}

export default GalleryHero
