import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import imgGala from '../../../../assets/home/hero2.png'
import imgFeast from '../../../../assets/home/ourphilosophy/img1.jpg'
import imgGarden from '../../../../assets/home/ourphilosophy/img2.jpg'
import imgPrivate from '../../../../assets/home/ouridentity/identity.png'
import './EventIndex.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const events = [
  {
    index: '01',
    title: 'Gala',
    tag: 'Darkë e plotë',
    meta: 'Nga 40 mysafirë',
    copy: 'Kuzhinë e rafinuar dhe shërbim i qetë për darka që duhen mbajtur mend.',
    image: imgGala,
    alt: 'Darkë e ndriçuar me qirinj',
  },
  {
    index: '02',
    title: 'Dasma',
    tag: 'Ditë e plotë',
    meta: 'Menu e kuruar',
    copy: 'Nga pritja e parë te torta, çdo pjatë kompozohet me kujdes për ditën tuaj.',
    image: imgFeast,
    alt: 'Bruschetta të shërbyera në dërrasë',
  },
  {
    index: '03',
    title: 'Kopësht',
    tag: 'Ambient i hapur',
    meta: 'Tryeza e dritës',
    copy: 'Catering në natyrë, i vendosur me elegancë mbi lëndinë dhe dritë të butë.',
    image: imgGarden,
    alt: 'Tryezë catering-u në ambient të hapur',
  },
  {
    index: '04',
    title: 'Private',
    tag: 'Intim',
    meta: 'Në shtëpi',
    copy: 'Darka të mbyllura ku identiteti ynë ndihet në çdo detaj të tryezës.',
    image: imgPrivate,
    alt: 'Peceta N+T Catering',
  },
]

function EventIndex() {
  const rootRef = useRef(null)
  const [active, setActive] = useState(0)
  const current = events[active]

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const root = rootRef.current
      if (!root || reduced) return

      const lines = root.querySelectorAll('.event-index__line span')
      const lead = root.querySelector('.event-index__lead')
      const items = root.querySelectorAll('.event-index__item')
      const media = root.querySelector('.event-index__media')
      const caption = root.querySelector('.event-index__caption')

      gsap.set(lines, { yPercent: 110 })
      gsap.set(lead, { y: 16, autoAlpha: 0 })
      gsap.set(items, { y: 28, autoAlpha: 0 })
      gsap.set(media, { clipPath: 'inset(100% 0 0 0)' })
      gsap.set(caption, { y: 12, autoAlpha: 0 })

      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: root,
            start: 'top 75%',
            once: true,
          },
        })
        .to(lines, { yPercent: 0, duration: 1.15, stagger: 0.12 }, 0)
        .to(lead, { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power2.out' }, 0.18)
        .to(media, { clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'power2.inOut' }, 0.2)
        .to(items, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08 }, 0.28)
        .to(caption, { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power2.out' }, 0.55)
        .add(() => {
          gsap.set(items, { clearProps: 'transform,opacity,visibility' })
        })

      const refresh = () => ScrollTrigger.refresh()
      document.addEventListener('preloader:done', refresh)
      return () => document.removeEventListener('preloader:done', refresh)
    },
    { scope: rootRef },
  )

  return (
    <section className="event-index" id="gallery" aria-label="Indeksi i eventeve" ref={rootRef}>
      <div className="container event-index__inner">
        <header className="event-index__header">
          <h2 className="event-index__heading">
            <span className="event-index__line">
              <span>Indeksi i</span>
            </span>
            <span className="event-index__line">
              <span>eventeve.</span>
            </span>
          </h2>
          <p className="event-index__lead">
            Nga një darkë intime deri te një festë e tërë, e kompozuar me kujdes.
          </p>
        </header>

        <div className="event-index__body">
          <ul className="event-index__list">
            {events.map((event, index) => {
              const isActive = active === index
              return (
                <li key={event.index}>
                  <button
                    type="button"
                    className={`event-index__item${isActive ? ' is-active' : ''}`}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                  >
                    <span className="event-index__num">{event.index}</span>
                    <span className="event-index__copy">
                      <span className="event-index__title">{event.title}</span>
                      <span className="event-index__text">{event.copy}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="event-index__media">
            {events.map((event, index) => (
              <img
                key={event.index}
                className={`event-index__photo${active === index ? ' is-on' : ''}`}
                src={event.image}
                alt={event.alt}
              />
            ))}
            <div className="event-index__caption">
              <span>{current.tag}</span>
              <span>{current.meta}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventIndex
