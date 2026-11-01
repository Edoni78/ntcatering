import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p className="site-footer__name">NT Catering</p>

        <div className="site-footer__grid">
          <div className="site-footer__col">
            <p className="site-footer__heading">( Kontakti )</p>
            <a className="site-footer__email" href="mailto:hello@ntcatering.com">
              hello@ntcatering.com
            </a>
            <p className="site-footer__status">
              <span className="site-footer__dot" aria-hidden />
              Duke pranuar evente për 2026
            </p>
          </div>

          <div className="site-footer__col">
            <p className="site-footer__heading">( Faqet )</p>
            <nav className="site-footer__nav" aria-label="Faqet">
              <Link to="/">Fillimi</Link>
              <a href="/#services">Shërbimet</a>
              <a href="/#gallery">Galeria</a>
              <Link to="/planifiko-eventin">Planifiko eventin</Link>
              <Link to="/kontakt">Kontakti</Link>
            </nav>
          </div>

          <div className="site-footer__col">
            <p className="site-footer__heading">( Tjetër )</p>
            <nav className="site-footer__nav" aria-label="Rrjetet">
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </nav>
          </div>

          <div className="site-footer__col">
            <p className="site-footer__heading">( Studio )</p>
            <p className="site-footer__place">Kosovë</p>
            <p className="site-footer__hours">Evente me rezervim</p>
          </div>
        </div>
      </div>

      <div className="site-footer__bar">
        <div className="container site-footer__bar-inner">
          <p>© {year} NT Catering — Të gjitha të drejtat e rezervuara</p>
          <p>Kosovë</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
