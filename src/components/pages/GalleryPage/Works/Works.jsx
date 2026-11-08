import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SectionLabel from '../../../shared/SectionLabel/SectionLabel'
import { useI18n } from '../../../../i18n/I18n'
import g1 from '../../../../assets/home/gallery/img1.png'
import g2 from '../../../../assets/home/gallery/img2.png'
import g3 from '../../../../assets/home/gallery/img3.png'
import g4 from '../../../../assets/home/gallery/img4.png'
import g5 from '../../../../assets/home/gallery/img5.png'
import ph1 from '../../../../assets/home/ourphilosophy/img1.jpg'
import ph2 from '../../../../assets/home/ourphilosophy/img2.jpg'
import f1 from '../../../../assets/otherimages/IMG_7093.jpg'
import f2 from '../../../../assets/otherimages/IMG_7094.jpg'
import f3 from '../../../../assets/otherimages/IMG_7095.jpg'
import f4 from '../../../../assets/otherimages/IMG_7096.jpg'
import f5 from '../../../../assets/otherimages/IMG_7097.jpg'
import f6 from '../../../../assets/otherimages/IMG_7098.jpg'
import './Works.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const photos = [g1, g2, g3, g4, g5, ph1, ph2, f1, f2, f3, f4, f5, f6]

function Works() {
  const { t } = useI18n()
  const heading = t('gallery.heading')
  const rootRef = useRef(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const root = rootRef.current
      if (!root || reduced) return

      const label = root.querySelector('.gallery-works__header .section-label')
      const lines = root.querySelectorAll('.gallery-works__line span')
      const cells = root.querySelectorAll('.gallery-works__cell')

      gsap.set(label, { y: 6, autoAlpha: 0 })
      gsap.set(lines, { yPercent: 35 })
      gsap.set(cells, { y: 8, autoAlpha: 0 })

      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: root,
            start: 'top 80%',
            once: true,
          },
        })
        .to(label, { y: 0, autoAlpha: 1, duration: 0.4, ease: 'power2.out' }, 0)
        .to(lines, { yPercent: 0, duration: 0.55, stagger: 0.05 }, 0.04)
        .to(cells, { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.02 }, 0.08)
    },
    { scope: rootRef },
  )

  return (
    <section className="gallery-works" aria-labelledby="gallery-works-title" ref={rootRef}>
      <div className="container gallery-works__header">
        <SectionLabel>{t('gallery.archive')}</SectionLabel>
        <h2 className="gallery-works__heading" id="gallery-works-title">
          {heading.map((line) => (
            <span className="gallery-works__line" key={line}>
              <span>{line}</span>
            </span>
          ))}
        </h2>
      </div>

      <div className="gallery-works__grid">
        {photos.map((src, index) => (
          <figure className="gallery-works__cell" key={`${src}-${index}`}>
            <img src={src} alt="" />
          </figure>
        ))}
      </div>
    </section>
  )
}

export default Works
