import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SectionLabel from '../../../shared/SectionLabel/SectionLabel'
import './Clients.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const clients = [
  {
    index: '01',
    name: 'Vila Arbëri',
    detail: 'Elira K. — Prishtinë',
    quote:
      'NT e kompozon një darkë ashtu siç shpresonim të ndihej një mbrëmje e vërtetë.',
  },
  {
    index: '02',
    name: 'Shtëpia Goga',
    detail: 'Arben M. — Tiranë',
    quote:
      'Çdo pjatë erdhi në kohë, me qetësi dhe kujdes — mysafirët ende flasin për atë natë.',
  },
  {
    index: '03',
    name: 'Hotel Europa',
    detail: 'Drita S. — Prizren',
    quote:
      'Eleganca e tryezës dhe shija e kuzhinës u ndjenë si një gjest i vetëm, i plotë.',
  },
  {
    index: '04',
    name: 'Studio Lumi',
    detail: 'Nora B. — Gjakovë',
    quote:
      'Nga pritja e parë te ëmbëlsira e fundit, asgjë nuk dukej e ngutur. Vetëm kujdes.',
  },
]

function Clients() {
  const rootRef = useRef(null)
  const [active, setActive] = useState(0)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const root = rootRef.current
      if (!root || reduced) return

      const quote = root.querySelector('.clients__quote')
      const items = root.querySelectorAll('.clients__item')

      gsap.set(quote, { y: 8, autoAlpha: 0 })
      gsap.set(items, { y: 6, autoAlpha: 0 })

      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: root,
            start: 'top 75%',
            once: true,
          },
          onComplete: () => {
            gsap.set(items, { clearProps: 'opacity,visibility,transform' })
          },
        })
        .to(quote, { y: 0, autoAlpha: 1, duration: 0.5 }, 0)
        .to(items, { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.05 }, 0.08)

      const refresh = () => ScrollTrigger.refresh()
      document.addEventListener('preloader:done', refresh)
      return () => document.removeEventListener('preloader:done', refresh)
    },
    { scope: rootRef },
  )

  return (
    <section className="clients" id="clients" aria-label="Klientët" ref={rootRef}>
      <div className="container clients__inner">
        <SectionLabel>Klientët</SectionLabel>
        <p className="clients__quote">{clients[active].quote}</p>

        <ul className="clients__list">
          {clients.map((client, index) => (
            <li key={client.index}>
              <button
                type="button"
                className={`clients__item${active === index ? ' is-active' : ''}`}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
              >
                <span className="clients__num">{client.index}</span>
                <span className="clients__name">{client.name}</span>
                <span className="clients__detail">{client.detail}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Clients
