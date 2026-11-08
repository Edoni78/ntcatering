import { useRef } from 'react'
import { HiArrowUpRight } from 'react-icons/hi2'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SectionLabel from '../../../shared/SectionLabel/SectionLabel'
import { useI18n } from '../../../../i18n/I18n'
import './Menus.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function Menus() {
  const { t } = useI18n()
  const heading = t('home.menus.heading')
  const menus = t('home.menus.items')
  const rows = t('home.menus.rows')
  const unit = t('home.menus.unit')
  const rootRef = useRef(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const root = rootRef.current
      if (!root || reduced) return

      const label = root.querySelector('.menus__header .section-label')
      const lines = root.querySelectorAll('.menus__line span')
      const lead = root.querySelector('.menus__lead')
      const cols = root.querySelectorAll('.menus__col')
      const rows = root.querySelectorAll('.menus__row')
      const ctas = root.querySelectorAll('.menus__cta')
      const table = root.querySelector('.menus__table')
      const actions = root.querySelector('.menus__actions')

      gsap.set(label, { y: 6, autoAlpha: 0 })
      gsap.set(lines, { yPercent: 35 })
      gsap.set(lead, { y: 6, autoAlpha: 0 })
      gsap.set(cols, { y: 8, autoAlpha: 0 })
      gsap.set(rows, { y: 6, autoAlpha: 0 })
      gsap.set(ctas, { y: 6, autoAlpha: 0 })

      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: root,
            start: 'top 75%',
            once: true,
          },
        })
        .to(label, { y: 0, autoAlpha: 1, duration: 0.4, ease: 'power2.out' }, 0)
        .to(lines, { yPercent: 0, duration: 0.55, stagger: 0.05 }, 0.04)
        .to(lead, { y: 0, autoAlpha: 1, duration: 0.4, ease: 'power2.out' }, 0.08)
        .to(cols, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.05 }, 0.1)

      gsap.to(rows, {
        y: 0,
        autoAlpha: 1,
        duration: 0.4,
        stagger: 0.03,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: table,
          start: 'top 82%',
          once: true,
        },
      })

      gsap.to(ctas, {
        y: 0,
        autoAlpha: 1,
        duration: 0.4,
        stagger: 0.04,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: actions,
          start: 'top 90%',
          once: true,
        },
      })

      const refresh = () => ScrollTrigger.refresh()
      document.addEventListener('preloader:done', refresh)
      return () => document.removeEventListener('preloader:done', refresh)
    },
    { scope: rootRef },
  )

  return (
    <section className="menus" id="services" aria-label={t('home.menus.label')} ref={rootRef}>
      <div className="container menus__inner">
        <header className="menus__header">
          <SectionLabel>{t('home.menus.label')}</SectionLabel>
          <h2 className="menus__heading">
            {heading.map((line) => (
              <span className="menus__line" key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h2>
          <p className="menus__lead">{t('home.menus.lead')}</p>
        </header>

        <div className="menus__plans">
          <div className="menus__spacer" aria-hidden />
          {menus.map((menu) => (
            <div className="menus__col" key={menu.index}>
              <p className="menus__index">{menu.index}</p>
              <h3 className="menus__title">{menu.title}</h3>
              <p className="menus__text">{menu.text}</p>
              <p className="menus__price">
                <span className="menus__amount">{menu.price}</span>
                <span className="menus__unit">{unit}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="menus__table">
          {rows.map((row) => (
            <div className="menus__row" key={row.label}>
              <p className="menus__label">{row.label}</p>
              {row.values.map((value, index) => (
                <p className="menus__value" key={`${row.label}-${index}`}>
                  {value}
                </p>
              ))}
            </div>
          ))}
        </div>

        <div className="menus__actions">
          <span className="menus__spacer" aria-hidden />
          {menus.map((menu) => (
            <a className="menus__cta" href="/planifiko-eventin" key={`cta-${menu.index}`}>
              {t('nav.plan')}
              <HiArrowUpRight />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Menus
