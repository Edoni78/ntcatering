import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SectionLabel from '../../../shared/SectionLabel/SectionLabel'
import garden from '../../../../assets/home/ourphilosophy/img2.jpg'
import lawn from '../../../../assets/otherimages/IMG_7095.jpg'
import buffet from '../../../../assets/otherimages/IMG_7097.jpg'
import { useI18n } from '../../../../i18n/I18n'
import './Where.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const placeImages = [garden, lawn, buffet]

function Where() {
  const { t } = useI18n()
  const heading = t('about.where.heading')
  const places = t('about.where.places').map((item, index) => ({ ...item, image: placeImages[index] }))
  const rootRef = useRef(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const root = rootRef.current
      if (!root || reduced) return

      const lines = root.querySelectorAll('.about-where__line span')
      const cells = root.querySelectorAll('.about-where__cell')

      gsap.set(lines, { yPercent: 35 })
      gsap.set(cells, { y: 8, autoAlpha: 0 })

      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: root, start: 'top 75%', once: true },
        })
        .to(lines, { yPercent: 0, duration: 0.55, stagger: 0.05 }, 0)
        .to(cells, { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.06 }, 0.08)
    },
    { scope: rootRef },
  )

  return (
    <section className="about-where" aria-labelledby="about-where-title" ref={rootRef}>
      <div className="container about-where__header">
        <SectionLabel>{t('about.where.label')}</SectionLabel>
        <h2 className="about-where__heading" id="about-where-title">
          {heading.map((line) => (
            <span className="about-where__line" key={line}>
              <span>{line}</span>
            </span>
          ))}
        </h2>
      </div>

      <div className="about-where__grid">
        {places.map((place) => (
          <article className="about-where__cell" key={place.index}>
            <img src={place.image} alt="" />
            <p>
              <span>{place.index}</span>
              {place.title}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Where
