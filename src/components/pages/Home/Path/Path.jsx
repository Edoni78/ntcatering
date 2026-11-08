import { useEffect, useMemo, useRef, useState } from 'react'
import {
  HiOutlineCalendarDays,
  HiOutlineChatBubbleLeftRight,
  HiOutlineClipboardDocumentList,
  HiOutlineSparkles,
  HiOutlineTruck,
} from 'react-icons/hi2'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SectionLabel from '../../../shared/SectionLabel/SectionLabel'
import { useI18n } from '../../../../i18n/I18n'
import './Path.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const icons = [
  HiOutlineChatBubbleLeftRight,
  HiOutlineClipboardDocumentList,
  HiOutlineCalendarDays,
  HiOutlineSparkles,
  HiOutlineTruck,
]

const layouts = {
  wide: {
    viewBox: [0, 0, 1000, 560],
    points: [
      { x: 120, y: 168 },
      { x: 310, y: 392 },
      { x: 500, y: 156 },
      { x: 690, y: 404 },
      { x: 860, y: 176 },
    ],
  },
  mid: {
    viewBox: [0, 0, 1000, 720],
    points: [
      { x: 130, y: 190 },
      { x: 320, y: 490 },
      { x: 500, y: 180 },
      { x: 680, y: 505 },
      { x: 820, y: 200 },
    ],
  },
  narrow: {
    viewBox: [0, 0, 360, 1180],
    points: [
      { x: 180, y: 72 },
      { x: 180, y: 320 },
      { x: 180, y: 568 },
      { x: 180, y: 816 },
      { x: 180, y: 1064 },
    ],
  },
}

function curveThrough(points, tension = 0.32) {
  if (points.length < 2) return ''

  const vertical = points.every((point) => point.x === points[0].x)
  let d = `M ${points[0].x} ${points[0].y}`

  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] || points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] || p2
    const sway = vertical ? (i % 2 === 0 ? 48 : -48) : 0
    const c1x = p1.x + (p2.x - p0.x) * tension + sway
    const c1y = p1.y + (p2.y - p0.y) * tension
    const c2x = p2.x - (p3.x - p1.x) * tension + sway
    const c2y = p2.y - (p3.y - p1.y) * tension
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x} ${p2.y}`
  }

  return d
}

function layoutForWidth(width) {
  if (width < 640) return 'narrow'
  if (width < 1100) return 'mid'
  return 'wide'
}

function progressAtPoints(line, points) {
  const length = line.getTotalLength()
  const samples = 320

  return points.map((point) => {
    let best = 0
    let bestDistance = Infinity

    for (let i = 0; i <= samples; i += 1) {
      const progress = i / samples
      const along = line.getPointAtLength(length * progress)
      const distance = (along.x - point.x) ** 2 + (along.y - point.y) ** 2
      if (distance < bestDistance) {
        bestDistance = distance
        best = progress
      }
    }

    return best
  })
}

function Path() {
  const { t } = useI18n()
  const heading = t('home.path.heading')
  const steps = t('home.path.steps')
  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const pathRef = useRef(null)
  const glowRef = useRef(null)
  const [mode, setMode] = useState('wide')

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const apply = () => setMode(layoutForWidth(stage.clientWidth))
    apply()
    const observer = new ResizeObserver(apply)
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  const layout = layouts[mode]
  const [vbX, vbY, vbW, vbH] = layout.viewBox
  const pathD = useMemo(() => curveThrough(layout.points), [layout])

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const root = rootRef.current
      const line = pathRef.current
      const glow = glowRef.current
      if (!root || !line) return

      const titles = root.querySelectorAll('.path__line span')
      const lead = root.querySelector('.path__lead')
      const nodes = root.querySelectorAll('.path-stage__motion')
      const length = line.getTotalLength()

      gsap.set(titles, { yPercent: reduced ? 0 : 35 })
      gsap.set(lead, reduced ? { autoAlpha: 1, y: 0 } : { y: 6, autoAlpha: 0 })
      gsap.set(nodes, reduced ? { autoAlpha: 1, y: 0 } : { y: 18, autoAlpha: 0 })
      gsap.set(line, {
        strokeDasharray: length,
        strokeDashoffset: reduced ? 0 : length,
      })

      const circles = root.querySelectorAll('.path-stage__circle')
      const stops = progressAtPoints(line, layout.points)

      if (glow) {
        const start = line.getPointAtLength(0)
        gsap.set(glow, { attr: { cx: start.x, cy: start.y }, autoAlpha: reduced ? 0 : 1 })
      }

      if (reduced) return

      const flow = { t: 0 }
      const band = 0.028

      const applyFlow = (progress) => {
        const point = line.getPointAtLength(length * progress)
        if (glow) gsap.set(glow, { attr: { cx: point.x, cy: point.y } })
        gsap.set(line, { strokeDashoffset: length * (1 - progress) })

        circles.forEach((circle, index) => {
          const onCircle = Math.abs(progress - stops[index]) <= band
          circle.classList.toggle('is-flow', onCircle)
        })
      }

      const inView = root.getBoundingClientRect().top < window.innerHeight * 0.92

      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        paused: inView,
        scrollTrigger: inView
          ? undefined
          : {
              trigger: root,
              start: 'top 88%',
              once: true,
            },
      })

      timeline
        .to(titles, { yPercent: 0, duration: 0.55, stagger: 0.05 }, 0)
        .to(lead, { y: 0, autoAlpha: 1, duration: 0.4, ease: 'power2.out' }, 0.06)
        .to(nodes, { y: 0, autoAlpha: 1, duration: 0.55, stagger: 0.12 }, 0.18)

      let from = 0
      stops.forEach((stop, index) => {
        timeline.to(
          flow,
          {
            t: stop,
            duration: Math.max(0.55, (stop - from) * 2.4),
            ease: 'sine.inOut',
            onUpdate: () => applyFlow(flow.t),
          },
          index === 0 ? 0.2 : '>',
        )
        timeline.to(
          flow,
          {
            t: stop,
            duration: 0.55,
            ease: 'none',
            onUpdate: () => applyFlow(flow.t),
            onStart: () => circles[index]?.classList.add('is-flow'),
            onComplete: () => {
              if (index === stops.length - 1) return
              circles[index]?.classList.remove('is-flow')
            },
          },
          '>',
        )
        from = stop
      })

      timeline.to(
        flow,
        {
          t: 1,
          duration: 0.7,
          ease: 'sine.out',
          onUpdate: () => applyFlow(flow.t),
          onComplete: () => circles.forEach((circle) => circle.classList.remove('is-flow')),
        },
        '>',
      )

      if (inView) timeline.play()

      return () => {
        timeline.kill()
      }
    },
    { scope: rootRef, dependencies: [mode, pathD] },
  )

  return (
    <section className="path" id="rruga" aria-label={t('home.path.label')} ref={rootRef}>
      <div className="container path__inner">
        <header className="path__header">
          <SectionLabel tone="burgundy">{t('home.path.label')}</SectionLabel>
          <h2 className="path__heading">
            {heading.map((line) => (
              <span className="path__line" key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h2>
          <p className="path__lead">{t('home.path.lead')}</p>
        </header>

        <div
          className={`path-stage path-stage--${mode}`}
          ref={stageRef}
          style={{ aspectRatio: `${vbW} / ${vbH}` }}
        >
          <svg
            className="path-stage__svg"
            viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="path-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#481420" stopOpacity="0.18" />
                <stop offset="42%" stopColor="#481420" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#481420" stopOpacity="0.22" />
              </linearGradient>
              <filter id="path-glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path className="path-stage__track" d={pathD} fill="none" />
            <path className="path-stage__line" ref={pathRef} d={pathD} fill="none" />
            <circle className="path-stage__glow" ref={glowRef} r="4.5" filter="url(#path-glow)" />
          </svg>

          <ol className="path-stage__list">
            {steps.map((step, index) => {
              const Icon = icons[index]
              const point = layout.points[index]
              return (
                <li
                  className={`path-stage__node path-stage__node--${index + 1}`}
                  key={step.index}
                  style={{
                    left: `${(point.x / vbW) * 100}%`,
                    top: `${(point.y / vbH) * 100}%`,
                  }}
                >
                  <div className="path-stage__motion">
                    <span className="path-stage__circle">
                      <Icon aria-hidden />
                    </span>
                    <div className="path-stage__copy">
                      <h3>{step.title}</h3>
                      <p className="path-stage__text">{step.text}</p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default Path
