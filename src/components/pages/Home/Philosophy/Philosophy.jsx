import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import img1 from '../../../../assets/home/ourphilosophy/img1.jpg'
import img2 from '../../../../assets/home/ourphilosophy/img2.jpg'
import './Philosophy.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

function Philosophy() {
  const rootRef = useRef(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const root = rootRef.current
      if (!root || reduced) return

      const isMobile = window.matchMedia('(max-width: 900px)').matches
      const thumb = root.querySelector('.philosophy__thumb')
      const thumbMedia = root.querySelector('.philosophy__thumb .philosophy__media')
      const thumbImg = root.querySelector('.philosophy__thumb img')
      const book = root.querySelector('.philosophy__book')
      const lines = root.querySelectorAll('.philosophy__line span')
      const note = root.querySelector('.philosophy__note')
      const frame = root.querySelector('.philosophy__frame')
      const frameMedia = root.querySelector('.philosophy__frame .philosophy__media')
      const frameImg = root.querySelector('.philosophy__frame img')

      const timeScale = isMobile ? 0.82 : 1

      gsap.set([thumb, frame], {
        clipPath: 'inset(100% 0 0 0)',
        willChange: 'clip-path',
      })
      gsap.set([thumbImg, frameImg], { scale: 1.08, willChange: 'transform' })
      gsap.set(lines, { yPercent: 110, willChange: 'transform' })
      gsap.set([book, note], { y: 15, autoAlpha: 0, willChange: 'transform, opacity' })

      const clearWill = () => {
        gsap.set([thumb, frame, thumbImg, frameImg, lines, book, note], {
          willChange: 'auto',
        })
      }

      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: root,
            start: 'top 75%',
            once: true,
          },
          onComplete: clearWill,
        })
        .to(
          book,
          { autoAlpha: 1, y: 0, duration: 0.8 * timeScale, ease: 'power2.out' },
          0,
        )
        .to(
          lines,
          { yPercent: 0, duration: 1.2 * timeScale, stagger: 0.15, ease: 'power3.out' },
          0.08,
        )
        .to(
          frame,
          { clipPath: 'inset(0% 0 0 0)', duration: 1.5 * timeScale, ease: 'power2.inOut' },
          0.22,
        )
        .to(
          frameImg,
          { scale: 1, duration: 1.5 * timeScale, ease: 'power2.inOut' },
          0.22,
        )
        .to(
          thumb,
          { clipPath: 'inset(0% 0 0 0)', duration: 1.2 * timeScale, ease: 'power2.inOut' },
          0.47,
        )
        .to(
          thumbImg,
          { scale: 1, duration: 1.2 * timeScale, ease: 'power2.inOut' },
          0.47,
        )
        .to(
          note,
          { autoAlpha: 1, y: 0, duration: 0.8 * timeScale, ease: 'power2.out' },
          0.82,
        )

      if (!isMobile) {
        gsap.fromTo(
          frameMedia,
          { y: -12 },
          {
            y: 13,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        )
        gsap.fromTo(
          thumbMedia,
          { y: -20 },
          {
            y: 20,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        )
      }

      const refresh = () => ScrollTrigger.refresh()
      document.addEventListener('preloader:done', refresh)

      return () => {
        document.removeEventListener('preloader:done', refresh)
      }
    },
    { scope: rootRef },
  )

  return (
    <section className="philosophy" id="about" aria-label="Filozofia jonë" ref={rootRef}>
      {/* Version 1 — overlapping photos
      <div className="container philosophy__layout">
        <p className="philosophy__text">
          Kujdes
          <br />
          në çdo
          <br />
          detaj.
        </p>

        <div className="philosophy__photos">
          <img
            className="philosophy__photo philosophy__photo--back"
            src={img2}
            alt="Tryezë catering-u në ambient të hapur"
          />
          <img
            className="philosophy__photo philosophy__photo--front"
            src={img1}
            alt="Bruschetta të shërbyera në dërrasë druri"
          />
        </div>
      </div>
      */}

      <div className="container philosophy__stage">
        <div className="philosophy__left">
          <div className="philosophy__thumb">
            <div className="philosophy__media">
              <img src={img2} alt="Tryezë catering-u në ambient të hapur" />
            </div>
          </div>

          <a className="philosophy__book" href="#plan">
            (Planifiko)
          </a>

          <h2 className="philosophy__title">
            <span className="philosophy__line">
              <span>Kujdes</span>
            </span>
            <span className="philosophy__line philosophy__line--italic">
              <span>në çdo</span>
            </span>
            <span className="philosophy__line">
              <span>detaj</span>
            </span>
          </h2>

          <p className="philosophy__note">Evente të kuruara me kujdes</p>
        </div>

        <figure className="philosophy__frame">
          <div className="philosophy__media">
            <img src={img1} alt="Bruschetta të shërbyera në dërrasë druri" />
          </div>
        </figure>
      </div>
    </section>
  )
}

export default Philosophy
