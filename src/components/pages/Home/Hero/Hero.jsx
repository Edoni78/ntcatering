import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import heroImage from '../../../../assets/home/hero2.png'
import { useI18n } from '../../../../i18n/I18n'
import './Hero.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function Hero() {
  const { t } = useI18n()
  const rootRef = useRef(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const root = rootRef.current
      if (!root) return

      const media = root.querySelector('.hero__media')
      const parallax = root.querySelector('.hero__parallax')
      const image = root.querySelector('.hero__media img')
      const lines = root.querySelectorAll('.hero__line span')
      const aside = root.querySelector('.hero__aside')
      const copy = root.querySelector('.hero__copy')
      const scroll = root.querySelector('.hero__scroll')
      const isMobile = window.matchMedia('(max-width: 900px)').matches

      gsap.set(root, { autoAlpha: 1 })

      if (reduced) {
        gsap.set([media, parallax, image, lines, aside, copy, scroll], { clearProps: 'all' })
        return
      }

      gsap.set(image, { scale: 1.05 })
      gsap.set(lines, { yPercent: 40 })
      gsap.set(aside, { x: 12, autoAlpha: 0 })
      gsap.set(copy, { y: 8, autoAlpha: 0 })
      gsap.set(scroll, { y: 6, autoAlpha: 0 })

      let started = false

      const play = () => {
        if (started) return
        started = true

        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .to(image, { scale: 1, duration: 1.15, ease: 'power2.out' }, 0)
          .to(lines, { yPercent: 0, duration: 0.55, stagger: 0.05 }, 0.04)
          .to(aside, { x: 0, autoAlpha: 1, duration: 0.5 }, 0.1)
          .to(copy, { y: 0, autoAlpha: 1, duration: 0.5 }, 0.16)
          .to(scroll, { y: 0, autoAlpha: 1, duration: 0.4 }, 0.22)
      }

      gsap.fromTo(
        parallax,
        { yPercent: isMobile ? -4 : -8 },
        {
          yPercent: isMobile ? 8 : 16,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      )

      const waiting = Boolean(document.getElementById('preloader'))

      if (!waiting) {
        play()
      } else {
        document.addEventListener('preloader:reveal', play, { once: true })
        document.addEventListener('preloader:done', play, { once: true })
      }

      const refresh = () => ScrollTrigger.refresh()
      document.addEventListener('preloader:done', refresh)

      return () => {
        document.removeEventListener('preloader:reveal', play)
        document.removeEventListener('preloader:done', play)
        document.removeEventListener('preloader:done', refresh)
      }
    },
    { scope: rootRef },
  )

  return (
    <section className="hero" ref={rootRef}>
      <div className="hero__media">
        <div className="hero__parallax">
          <img
            src={heroImage}
            alt={t('home.hero.alt')}
            fetchPriority="high"
          />
        </div>
      </div>
      <div className="hero__overlay" />

      <div className="container hero__content">
        <div className="hero__top">
          <h1>
            <span className="hero__line hero__line--main">
              <span>{t('home.hero.title')}</span>
            </span>
          </h1>
          <p className="hero__aside">{t('home.hero.aside')}</p>
        </div>

        <p className="hero__copy">{t('home.hero.copy')}</p>
      </div>

      <button
        className="hero__scroll"
        type="button"
        aria-label={t('home.hero.scroll')}
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
        }
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M6 9l6 6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </section>
  )
}

export default Hero
