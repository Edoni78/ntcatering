import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Cta from '../Cta/Cta'
import Faq from '../Faq/Faq'
import './Finale.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function Finale() {
  const rootRef = useRef(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const root = rootRef.current
      if (!root) return

      const cta = root.querySelector('.cta')
      const image = root.querySelector('.cta__image')
      const shade = root.querySelector('.cta__shade')
      const copy = root.querySelectorAll('.cta__copy > *')
      const wash = root.querySelector('.finale__wash')

      if (reduced) {
        gsap.set(wash, { autoAlpha: 1 })
        gsap.set(image, { filter: 'blur(0px) saturate(1)', scale: 1 })
        return
      }

      gsap.set(wash, { autoAlpha: 0 })
      gsap.set(image, { filter: 'blur(16px) saturate(0.82)', scale: 1.12 })
      gsap.set(copy, { y: 18, autoAlpha: 0 })

      gsap
        .timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: cta,
            start: 'top top',
            end: '+=160%',
            pin: true,
            pinSpacing: true,
            scrub: 1.35,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        .to(copy, { y: 0, autoAlpha: 1, duration: 0.18, stagger: 0.04, ease: 'power2.out' }, 0)
        .to(
          image,
          { filter: 'blur(0px) saturate(1)', scale: 1, duration: 0.85 },
          0.08,
        )
        .to(shade, { opacity: 0.7, duration: 1 }, 0)
        .to(wash, { autoAlpha: 1, duration: 1 }, 0)

      const refresh = () => ScrollTrigger.refresh()
      document.addEventListener('preloader:done', refresh)
      window.addEventListener('load', refresh)
      return () => {
        document.removeEventListener('preloader:done', refresh)
        window.removeEventListener('load', refresh)
      }
    },
    { scope: rootRef },
  )

  return (
    <div className="finale" ref={rootRef}>
      <div className="finale__wash" aria-hidden />
      <div className="finale__content">
        <Cta />
        <Faq />
      </div>
    </div>
  )
}

export default Finale
