import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SectionLabel from '../../../shared/SectionLabel/SectionLabel'
import img1 from '../../../../assets/home/ourphilosophy/img1.jpg'
import img2 from '../../../../assets/home/ourphilosophy/img2.jpg'
import { useI18n } from '../../../../i18n/I18n'
import './Story.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function Story() {
  const { t } = useI18n()
  const heading = t('about.story.heading')
  const words = t('about.story.words')
  const rootRef = useRef(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const root = rootRef.current
      if (!root || reduced) return

      const lines = root.querySelectorAll('.about-story__line span')
      const frames = root.querySelectorAll('.about-story__frame')
      const words = root.querySelectorAll('.about-story__word span')

      gsap.set(lines, { yPercent: 35 })
      gsap.set(frames, { clipPath: 'inset(100% 0 0 0)' })
      gsap.set(words, { yPercent: 35 })

      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: root, start: 'top 75%', once: true },
        })
        .to(lines, { yPercent: 0, duration: 0.55, stagger: 0.05 }, 0)
        .to(frames, { clipPath: 'inset(0% 0 0 0)', duration: 0.8, stagger: 0.1, ease: 'power2.inOut' }, 0.06)
        .to(words, { yPercent: 0, duration: 0.5, stagger: 0.04 }, 0.2)
    },
    { scope: rootRef },
  )

  return (
    <section className="about-story" aria-labelledby="about-story-title" ref={rootRef}>
      <div className="container about-story__inner">
        <div className="about-story__copy">
          <SectionLabel>{t('about.story.label')}</SectionLabel>
          <h2 className="about-story__heading" id="about-story-title">
            {heading.map((line) => (
              <span className="about-story__line" key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h2>
        </div>

        <div className="about-story__photos">
          <figure className="about-story__frame about-story__frame--main">
            <img src={img2} alt="" />
          </figure>
          <figure className="about-story__frame about-story__frame--side">
            <img src={img1} alt="" />
          </figure>
        </div>
      </div>

      <div className="container about-story__statement">
        <p className="about-story__kicker">{t('about.story.kicker')}</p>
        <p className="about-story__words">
          {words.map((word, index) => (
            <span
              className={`about-story__word${index > 1 ? ' about-story__word--mute' : ''}`}
              key={word}
            >
              <span>{word}</span>
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}

export default Story
