import { useRef, useState } from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi2'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SectionLabel from '../../../shared/SectionLabel/SectionLabel'
import './Faq.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const questions = [
  {
    q: 'Sa herë përpara duhet të rezervoj?',
    a: 'Katër deri gjashtë javë për shumicën e eventeve. Festat e mëdha i planifikojmë së bashku, zakonisht dy muaj më herët.',
  },
  {
    q: 'A shërbeni edhe jashtë qytetit?',
    a: 'Po. Udhëtojmë për evente në kopësht, vila dhe ambiente të zgjedhura, me marrëveshje paraprake për logjistikën.',
  },
  {
    q: 'Çfarë ndodh me alergjitë dhe dietat?',
    a: 'Menuja përshtatet. Na tregoni kufizimet që në fillim, që kuzhina t’i ketë parasysh në çdo pjatë.',
  },
  {
    q: 'A mund të ndryshohet menuja?',
    a: 'Po. Tre menutë janë pikënisje. I kompozojmë sipas numrit të mysafirëve, stinës dhe stilistikës së eventit.',
  },
  {
    q: 'Si fillojmë?',
    a: 'Dërgoni një mesazh me datën, vendin dhe numrin e përafërt. Një fjali mjafton për të hapur bisedën.',
  },
]

function Faq() {
  const rootRef = useRef(null)
  const [open, setOpen] = useState(0)

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const root = rootRef.current
      if (!root || reduced) return

      const lines = root.querySelectorAll('.faq__line span')
      const lead = root.querySelector('.faq__lead')
      const items = root.querySelectorAll('.faq__item')

      gsap.set(lines, { yPercent: 35 })
      gsap.set(lead, { y: 6, autoAlpha: 0 })
      gsap.set(items, { y: 6, autoAlpha: 0 })

      gsap
        .timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: root,
            start: 'top 75%',
            once: true,
          },
        })
        .to(lines, { yPercent: 0, duration: 0.5, stagger: 0.05 }, 0)
        .to(lead, { y: 0, autoAlpha: 1, duration: 0.4, ease: 'power2.out' }, 0.06)
        .to(items, { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.04 }, 0.08)
    },
    { scope: rootRef },
  )

  return (
    <section className="faq" id="contact" aria-label="Pyetje" ref={rootRef}>
      <div className="container faq__inner">
        <div className="faq__side">
          <SectionLabel tone="burgundy">Pyetje</SectionLabel>
        </div>
        <div className="faq__main">
          <h2 className="faq__heading">
            <span className="faq__line">
              <span>Para se</span>
            </span>
            <span className="faq__line">
              <span>të shkruani.</span>
            </span>
          </h2>
          <p className="faq__lead">
            Pesë pyetjet që vijnë pothuajse në çdo mesazh të parë.
          </p>

          <ul className="faq__list">
            {questions.map((item, index) => {
              const isOpen = open === index
              return (
                <li key={item.q} className={`faq__item${isOpen ? ' is-open' : ''}`}>
                  <button
                    type="button"
                    className="faq__q"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : index)}
                  >
                    <span>{item.q}</span>
                    {isOpen ? <HiMinus /> : <HiPlus />}
                  </button>
                  <div className="faq__a" hidden={!isOpen}>
                    <p>{item.a}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Faq
