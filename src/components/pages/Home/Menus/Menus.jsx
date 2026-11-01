import { useRef } from 'react'
import { HiArrowUpRight } from 'react-icons/hi2'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SectionLabel from '../../../shared/SectionLabel/SectionLabel'
import './Menus.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const menus = [
  {
    index: '01',
    title: 'Menu 1',
    text: 'Për pritje të lehta, me zgjedhje të kujdesshme në tryezë.',
    price: '8',
    unit: '€ / për person',
  },
  {
    index: '02',
    title: 'Menu 2',
    text: 'Më e plotë, me meze, tortilla dhe ëmbëlsira.',
    price: '13,50',
    unit: '€ / për person',
  },
  {
    index: '03',
    title: 'Menu 3',
    text: 'Menuja më e pasur, me fli dhe tre lloje brusketash.',
    price: '15,50',
    unit: '€ / për person',
  },
]

const rows = [
  { label: 'Brusketa', values: ['1 lloj (klasik)', '2 lloje', '3 lloje'] },
  { label: 'Meze e ftohtë', values: ['Djathë, mish, zarzavate', 'Djathë, mish, sos', 'Djathë, mish, zarzavate'] },
  { label: 'Mini tortilla', values: ['Po', '—', 'Po'] },
  { label: 'Tortilla', values: ['—', 'Po', 'Po'] },
  { label: 'Bite-size sandwich', values: ['Tuna, qepë, misër', 'Tuna, qepë, misër', '—'] },
  { label: 'Sallata', values: ['Sallatë me pasta', 'Sallatë Ruse', 'Sallatë Ruse'] },
  { label: 'Spinach rolls', values: ['Po', 'Po', 'Po'] },
  { label: 'Chicken fingers', values: ['—', 'Po', 'Po'] },
  { label: 'Mini burger', values: ['—', 'Po', '—'] },
  { label: 'Sallatë frutash', values: ['—', 'Sipas sezonës', '—'] },
  { label: 'Fli', values: ['—', '—', 'Po'] },
  { label: 'Ëmbëlsira', values: ['Torte në gotë', 'Ëmbëlsira ose pancake', 'Sallatë frutash'] },
]

function Menus() {
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

      gsap.set(label, { y: 14, autoAlpha: 0 })
      gsap.set(lines, { yPercent: 110 })
      gsap.set(lead, { y: 16, autoAlpha: 0 })
      gsap.set(cols, { y: 28, autoAlpha: 0 })
      gsap.set(rows, { y: 18, autoAlpha: 0 })
      gsap.set(ctas, { y: 16, autoAlpha: 0 })

      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: root,
            start: 'top 75%',
            once: true,
          },
        })
        .to(label, { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power2.out' }, 0)
        .to(lines, { yPercent: 0, duration: 1.15, stagger: 0.12 }, 0.05)
        .to(lead, { y: 0, autoAlpha: 1, duration: 0.75, ease: 'power2.out' }, 0.2)
        .to(cols, { y: 0, autoAlpha: 1, duration: 0.95, stagger: 0.12 }, 0.22)

      gsap.to(rows, {
        y: 0,
        autoAlpha: 1,
        duration: 0.7,
        stagger: 0.06,
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
        duration: 0.75,
        stagger: 0.1,
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
    <section className="menus" id="services" aria-label="Menutë" ref={rootRef}>
      <div className="container menus__inner">
        <header className="menus__header">
          <SectionLabel>Menutë</SectionLabel>
          <h2 className="menus__heading">
            <span className="menus__line">
              <span>Tre menu</span>
            </span>
            <span className="menus__line">
              <span>për person.</span>
            </span>
          </h2>
          <p className="menus__lead">
            Çdo menu shërbehet për person. Çmimet janë në euro.
          </p>
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
                <span className="menus__unit">{menu.unit}</span>
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
            <a className="menus__cta" href="#plan" key={`cta-${menu.index}`}>
              Planifiko eventin
              <HiArrowUpRight />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Menus
