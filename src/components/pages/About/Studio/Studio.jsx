import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import studioImage from '../../../../assets/branding/brand7.png'
import { useI18n } from '../../../../i18n/I18n'
import './Studio.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function Studio() {
  const { t } = useI18n()
  const rootRef = useRef(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const root = rootRef.current
      if (!root || reduced) return

      const copy = root.querySelectorAll('.about-studio__copy > *')
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
    <section className="about-studio" aria-labelledby="about-studio-title" ref={rootRef}>
      <img className="about-studio__photo" src={studioImage} alt="" />
      <div className="about-studio__veil" />
      <div className="container about-studio__copy">
        <p className="about-studio__eyebrow">{t('about.studio.eyebrow')}</p>
        <h2 id="about-studio-title">{t('about.studio.title')}</h2>
      </div>
    </section>
  )
}

export default Studio
