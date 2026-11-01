import { useEffect, useRef, useState } from 'react'
import brandMark from '../../../assets/brand.png'
import './Loader.css'

let played = false

function Loader() {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [gone, setGone] = useState(played || reduce)
  const [done, setDone] = useState(false)
  const rafRef = useRef(0)

  useEffect(() => {
    if (played) {
      setGone(true)
      return
    }

    const elGone = () => {
      played = true
      setGone(true)
      document.documentElement.classList.remove('pl-lock')
      document.dispatchEvent(new Event('preloader:done'))
    }

    if (reduce) {
      played = true
      setGone(true)
      return
    }

    const root = document.documentElement
    root.classList.add('pl-lock')

    let t0 = performance.now()
    let loaded = document.readyState === 'complete'
    let finished = false

    const onLoad = () => {
      loaded = true
    }
    window.addEventListener('load', onLoad)

    const MIN = 1100
    const MAX = 3500

    const finish = () => {
      if (finished) return
      finished = true
      setDone(true)
      document.dispatchEvent(new Event('preloader:reveal'))
      window.setTimeout(elGone, 900)
    }

    const tick = (now) => {
      const t = now - t0
      if ((loaded && t >= MIN) || t > MAX) {
        finish()
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('load', onLoad)
      cancelAnimationFrame(rafRef.current)
      root.classList.remove('pl-lock')
    }
  }, [reduce])

  if (gone) return null

  return (
    <div
      id="preloader"
      className={`is-playing${done ? ' is-done' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Duke u ngarkuar N+T Catering"
    >
      <div className="pl-panel pl-top" />
      <div className="pl-panel pl-bottom" />
      <div className="pl-stage">
        <div className="pl-glow" />
        <img className="pl-mark" src={brandMark} alt="" />
      </div>
    </div>
  )
}

export default Loader
