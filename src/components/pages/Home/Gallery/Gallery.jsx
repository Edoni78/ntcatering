import { useRef } from 'react'
import { HiArrowUpRight } from 'react-icons/hi2'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SectionLabel from '../../../shared/SectionLabel/SectionLabel'
import img1 from '../../../../assets/home/gallery/img1.png'
import img2 from '../../../../assets/home/gallery/img2.png'
import img3 from '../../../../assets/home/gallery/img3.png'
import img4 from '../../../../assets/home/gallery/img4.png'
import './Gallery.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const works = [
  {
    index: '01',
    title: 'Darkë galerie',
    meta: 'Gala — 2026',
    image: img1,
  },
  {
    index: '02',
    title: 'Tryeza e dritës',
    meta: 'Kopësht — 2026',
    image: img2,
  },
  {
    index: '03',
    title: 'Detaji',
    meta: 'Private — 2025',
    image: img3,
  },
  {
    index: '04',
    title: 'Meze në lëndinë',
    meta: 'Dasma — 2025',
    image: img4,
  },
]

function Gallery() {
  const rootRef = useRef(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const root = rootRef.current
      if (!root || reduced) return

      const label = root.querySelector('.gallery__head .section-label')
      const lines = root.querySelectorAll('.gallery__line span')
      const intro = root.querySelector('.gallery__intro')
      const cta = root.querySelector('.gallery__cta')
      const cells = root.querySelectorAll('.gallery__cell')

      gsap.set(label, { y: 6, autoAlpha: 0 })
      gsap.set(lines, { yPercent: 35 })
      gsap.set([intro, cta], { y: 6, autoAlpha: 0 })
      gsap.set(cells, { y: 8, autoAlpha: 0 })

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
        .to(intro, { y: 0, autoAlpha: 1, duration: 0.4, ease: 'power2.out' }, 0.08)
        .to(cta, { y: 0, autoAlpha: 1, duration: 0.4, ease: 'power2.out' }, 0.1)
        .to(cells, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.04 }, 0.12)

      const refresh = () => ScrollTrigger.refresh()
      document.addEventListener('preloader:done', refresh)
      return () => document.removeEventListener('preloader:done', refresh)
    },
    { scope: rootRef },
  )

  return (
    <section className="gallery" id="gallery" aria-label="Galeria" ref={rootRef}>
      <div className="container gallery__head">
        <SectionLabel>Galeria</SectionLabel>

        <div className="gallery__copy">
          <h2 className="gallery__heading">
            <span className="gallery__line">
              <span>Katër projekte,</span>
            </span>
            <span className="gallery__line">
              <span>fotografuar</span>
            </span>
            <span className="gallery__line">
              <span>ngadalë.</span>
            </span>
          </h2>

          <div className="gallery__row">
            <p className="gallery__intro">
              Një përzgjedhje nga tre vitet e fundit — çdo event i kompozuar në vend, në dritë të ditës.
            </p>
            <a className="gallery__cta" href="#notes">
              Shiko të gjitha
              <HiArrowUpRight />
            </a>
          </div>
        </div>
      </div>

      <div className="gallery__grid">
        <div className="gallery__col">
          {[works[0], works[2]].map((work) => (
            <article className="gallery__cell" key={work.index}>
              <img src={work.image} alt={work.title} />
              <div className="gallery__caption">
                <p>
                  {work.index} {work.title}
                </p>
                <p>{work.meta}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="gallery__col gallery__col--offset">
          {[works[1], works[3]].map((work) => (
            <article className="gallery__cell" key={work.index}>
              <img src={work.image} alt={work.title} />
              <div className="gallery__caption">
                <p>
                  {work.index} {work.title}
                </p>
                <p>{work.meta}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
