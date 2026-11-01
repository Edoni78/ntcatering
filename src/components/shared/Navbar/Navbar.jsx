import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import logo from '../../../assets/brand.png'
import './Navbar.css'

gsap.registerPlugin(useGSAP)

const leftLinks = [
  { href: '#services', label: 'Shërbimet' },
  { href: '#about', label: 'Rreth nesh' },
]

const rightLinks = [
  { href: '#gallery', label: 'Galeria' },
  { href: '#contact', label: 'Kontakti' },
]

const menuLinks = [...leftLinks, ...rightLinks]

function Navbar() {
  const navRef = useRef(null)
  const menuRef = useRef(null)
  const wasOpen = useRef(false)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('is-locked', open)

    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('is-locked')
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) return

      gsap.fromTo(
        '.navbar__bar',
        { y: -28 },
        { y: 0, duration: 1.1, delay: 0.35, ease: 'power3.out' },
      )
    },
    { scope: navRef },
  )

  useGSAP(
    () => {
      const menu = menuRef.current
      if (!menu) return

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const items = menu.querySelectorAll('.navbar__menu-item')
      const origin = 'calc(100% - 42px) 42px'

      if (open) {
        wasOpen.current = true
        gsap.set(menu, { pointerEvents: 'auto' })

        if (reduced) {
          gsap.set(menu, { autoAlpha: 1, clipPath: 'none' })
          gsap.set(items, { autoAlpha: 1, y: 0 })
          return
        }

        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .fromTo(
            menu,
            { autoAlpha: 1, clipPath: `circle(0% at ${origin})` },
            { clipPath: `circle(160% at ${origin})`, duration: 0.8, ease: 'power3.inOut' },
          )
          .fromTo(
            items,
            { y: 48, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.75, stagger: 0.08 },
            0.28,
          )
        return
      }

      if (wasOpen.current) {
        wasOpen.current = false

        if (reduced) {
          gsap.set(menu, { autoAlpha: 0, pointerEvents: 'none' })
          gsap.set(items, { autoAlpha: 0 })
          return
        }

        gsap
          .timeline({ defaults: { ease: 'power2.inOut' } })
          .to(items, { y: -18, autoAlpha: 0, duration: 0.28, stagger: 0.03 })
          .to(menu, { clipPath: `circle(0% at ${origin})`, duration: 0.55 }, 0.08)
          .set(menu, { autoAlpha: 0, pointerEvents: 'none' })
        return
      }

      gsap.set(menu, { autoAlpha: 0, pointerEvents: 'none' })
      gsap.set(items, { autoAlpha: 0 })
    },
    { scope: navRef, dependencies: [open] },
  )

  const closeMenu = () => setOpen(false)

  return (
    <header
      ref={navRef}
      className={`navbar ${scrolled && !open ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}
    >
      <div className="navbar__frost" aria-hidden />
      <div className="navbar__bar">
        <div className="container navbar__inner">
          <nav className="navbar__cluster navbar__cluster--left" aria-label="Kryesore">
            {leftLinks.map((link) => (
              <a key={link.href} className="navbar__link" href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <Link to="/" className="navbar__brand" onClick={closeMenu}>
            <img src={logo} alt="N+T Catering" />
          </Link>

          <div className="navbar__cluster navbar__cluster--right">
            <nav className="navbar__cluster-links" aria-label="Dytësore">
              {rightLinks.map((link) => (
                <a key={link.href} className="navbar__link" href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>

            <a className="navbar__cta" href="#plan">
              Planifiko eventin
            </a>

            <button
              className={`navbar__toggle ${open ? 'is-open' : ''}`}
              type="button"
              aria-label={open ? 'Mbyll menunë' : 'Hap menunë'}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen((value) => !value)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-navigation"
        ref={menuRef}
        className="navbar__menu"
        aria-hidden={!open}
      >
        <div className="navbar__menu-pattern" aria-hidden="true" />
        <nav className="navbar__menu-nav" aria-label="Menuja">
          {menuLinks.map((link, index) => (
            <a
              key={link.href}
              className="navbar__menu-item navbar__menu-link"
              href={link.href}
              onClick={closeMenu}
            >
              <span className="navbar__menu-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="navbar__menu-label">{link.label}</span>
            </a>
          ))}
          <a className="navbar__menu-item navbar__menu-cta" href="#plan" onClick={closeMenu}>
            Planifiko eventin
          </a>
        </nav>
        <p className="navbar__menu-item navbar__menu-foot">Evente të kuruara me kujdes</p>
      </div>
    </header>
  )
}

export default Navbar
