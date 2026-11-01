import { useEffect, useRef } from 'react'
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi2'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import img1 from '../../../../assets/home/hero2.png'
import img2 from '../../../../assets/home/ourphilosophy/img1.jpg'
import img3 from '../../../../assets/home/ourphilosophy/img2.jpg'
import img4 from '../../../../assets/home/ouridentity/identity.png'
import './Notes.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const notes = [
  {
    kicker: 'Pas kamerës',
    date: 'Maj 2026',
    title: 'Një ngjyrë, një gjest',
    image: img1,
  },
  {
    kicker: 'Shënime',
    date: 'Maj 2026',
    title: 'Tryeza në lëndinë',
    image: img2,
  },
  {
    kicker: 'Detaji',
    date: 'Prill 2026',
    title: 'Drita mbi pecetë',
    image: img3,
  },
  {
    kicker: 'Forma',
    date: 'Prill 2026',
    title: 'Kujdes në çdo pjatë',
    image: img4,
  },
  {
    kicker: 'Pas kamerës',
    date: 'Mars 2026',
    title: 'Elegancë e qetë',
    image: img1,
  },
  {
    kicker: 'Shënime',
    date: 'Mars 2026',
    title: 'Në ambient të hapur',
    image: img2,
  },
]

function Notes() {
  const rootRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let pressed = false
    let startX = 0
    let startScroll = 0

    const onDown = (event) => {
      pressed = true
      startX = event.pageX
      startScroll = track.scrollLeft
      track.classList.add('is-dragging')
    }

    const onMove = (event) => {
      if (!pressed) return
      event.preventDefault()
      track.scrollLeft = startScroll - (event.pageX - startX)
    }

    const onUp = () => {
      pressed = false
      track.classList.remove('is-dragging')
    }

    track.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove, { passive: false })
    window.addEventListener('pointerup', onUp)

    return () => {
      track.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const root = rootRef.current
      if (!root || reduced) return

      const lines = root.querySelectorAll('.notes__line span')
      const lead = root.querySelector('.notes__lead')
      const nav = root.querySelector('.notes__nav')
      const cards = root.querySelectorAll('.notes__card')
      const images = root.querySelectorAll('.notes__media img')

      gsap.set(lines, { yPercent: 110 })
      gsap.set([lead, nav], { y: 14, autoAlpha: 0 })
      gsap.set(cards, { y: 32, autoAlpha: 0 })
      gsap.set(images, { scale: 1.08 })

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
        .to(lead, { y: 0, autoAlpha: 1, duration: 0.75, ease: 'power2.out' }, 0.16)
        .to(nav, { y: 0, autoAlpha: 1, duration: 0.75, ease: 'power2.out' }, 0.2)
        .to(cards, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08 }, 0.28)
        .to(images, { scale: 1, duration: 1.4, ease: 'power2.out', stagger: 0.08 }, 0.28)
        .add(() => {
          gsap.set(images, { clearProps: 'transform' })
        })

      const refresh = () => ScrollTrigger.refresh()
      document.addEventListener('preloader:done', refresh)
      return () => document.removeEventListener('preloader:done', refresh)
    },
    { scope: rootRef },
  )

  const scrollByCard = (direction) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('.notes__card')
    const amount = (card?.offsetWidth || 360) + 18
    track.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  return (
    <section className="notes" id="notes" aria-label="Shënime nga terreni" ref={rootRef}>
      <div className="container notes__intro">
        <h2 className="notes__heading">
          <span className="notes__line">
            <span>Shënime nga terreni,</span>
          </span>
          <span className="notes__line">
            <span>mbi dritën dhe vendet.</span>
          </span>
        </h2>

        <div className="notes__meta">
          <p className="notes__lead">
            Ese të shkurtra mbi tryezën, vendin dhe kujdesin e ngadaltë.
          </p>
          <div className="notes__nav">
            <button
              type="button"
              className="notes__arrow"
              aria-label="Kartela e mëparshme"
              onClick={() => scrollByCard(-1)}
            >
              <HiArrowLeft />
            </button>
            <button
              type="button"
              className="notes__arrow"
              aria-label="Kartela tjetër"
              onClick={() => scrollByCard(1)}
            >
              <HiArrowRight />
            </button>
          </div>
        </div>
      </div>

      <div className="notes__track" ref={trackRef}>
        {notes.map((note, index) => (
          <article className="notes__card" key={`${note.title}-${index}`}>
            <div className="notes__media">
              <img src={note.image} alt="" draggable="false" />
            </div>
            <p className="notes__kicker">
              <span>{note.kicker}</span>
              <span>{note.date}</span>
            </p>
            <h3 className="notes__title">{note.title}</h3>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Notes
