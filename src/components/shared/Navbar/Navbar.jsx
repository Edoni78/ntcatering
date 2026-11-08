import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import logo from '../../../assets/brand.png'
import { useI18n } from '../../../i18n/I18n'
import './Navbar.css'

gsap.registerPlugin(useGSAP)

function LangSwitch({ compact = false }) {
  const { lang, setLang, t } = useI18n()

  return (
    <div className={`navbar__lang${compact ? ' navbar__lang--menu' : ''}`} role="group" aria-label={t('nav.lang')}>
      <button type="button" className={lang === 'sq' ? 'is-on' : ''} onClick={() => setLang('sq')}>
        SQ
      </button>
      <span aria-hidden>/</span>
      <button type="button" className={lang === 'en' ? 'is-on' : ''} onClick={() => setLang('en')}>
        EN
      </button>
    </div>
  )
}

function Navbar() {
  const { t } = useI18n()
  const navRef = useRef(null)
  const menuRef = useRef(null)
  const wasOpen = useRef(false)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const leftLinks = [
    { to: '/sherbimet', label: t('nav.services') },
    { to: '/rreth-nesh', label: t('nav.about') },
  ]

  const rightLinks = [
    { to: '/galeria', label: t('nav.gallery') },
    { to: '/kontakt', label: t('nav.contact') },
  ]

  const menuLinks = [...leftLinks, ...rightLinks]

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
          <nav className="navbar__cluster navbar__cluster--left" aria-label={t('nav.primary')}>
            {leftLinks.map((link) => (
              <Link key={link.to} className="navbar__link" to={link.to} onClick={closeMenu}>
                {link.label}
              </Link>
            ))}
          </nav>

          <Link to="/" className="navbar__brand" onClick={closeMenu}>
            <img src={logo} alt="NT Catering" />
          </Link>

          <div className="navbar__cluster navbar__cluster--right">
            <nav className="navbar__cluster-links" aria-label={t('nav.secondary')}>
              {rightLinks.map((link) => (
                <Link key={link.to} className="navbar__link" to={link.to} onClick={closeMenu}>
                  {link.label}
                </Link>
              ))}
            </nav>

            <LangSwitch />

            <Link className="navbar__cta" to="/planifiko-eventin" onClick={closeMenu}>
              {t('nav.plan')}
            </Link>

            <button
              className={`navbar__toggle ${open ? 'is-open' : ''}`}
              type="button"
              aria-label={open ? t('nav.close') : t('nav.open')}
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
        <nav className="navbar__menu-nav" aria-label={t('nav.menu')}>
          {menuLinks.map((link, index) => (
            <Link
              key={link.to}
              className="navbar__menu-item navbar__menu-link"
              to={link.to}
              onClick={closeMenu}
            >
              <span className="navbar__menu-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="navbar__menu-label">{link.label}</span>
            </Link>
          ))}
          <Link className="navbar__menu-item navbar__menu-cta" to="/planifiko-eventin" onClick={closeMenu}>
            {t('nav.plan')}
          </Link>
          <LangSwitch compact />
        </nav>
        <p className="navbar__menu-item navbar__menu-foot">{t('nav.foot')}</p>
      </div>
    </header>
  )
}

export default Navbar
