import { Link } from 'react-router-dom'
import { useI18n } from '../../../i18n/I18n'
import './Footer.css'

function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <p className="site-footer__name">NT Catering</p>

        <div className="site-footer__grid">
          <div className="site-footer__col">
            <p className="site-footer__heading">( {t('footer.contact')} )</p>
            <a className="site-footer__email" href="mailto:hello@ntcatering.com">
              hello@ntcatering.com
            </a>
            <p className="site-footer__status">
              <span className="site-footer__dot" aria-hidden />
              {t('footer.accepting')}
            </p>
          </div>

          <div className="site-footer__col">
            <p className="site-footer__heading">( {t('footer.pages')} )</p>
            <nav className="site-footer__nav" aria-label={t('footer.pages')}>
              <Link to="/">{t('footer.home')}</Link>
              <Link to="/sherbimet">{t('nav.services')}</Link>
              <Link to="/rreth-nesh">{t('nav.about')}</Link>
              <Link to="/galeria">{t('nav.gallery')}</Link>
              <Link to="/planifiko-eventin">{t('nav.plan')}</Link>
              <Link to="/kontakt">{t('nav.contact')}</Link>
            </nav>
          </div>

          <div className="site-footer__col">
            <p className="site-footer__heading">( {t('footer.other')} )</p>
            <nav className="site-footer__nav" aria-label={t('footer.social')}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </nav>
          </div>

          <div className="site-footer__col">
            <p className="site-footer__heading">( {t('footer.location')} )</p>
            <p className="site-footer__place">{t('footer.place')}</p>
            <p className="site-footer__hours">{t('footer.hours')}</p>
          </div>
        </div>
      </div>

      <div className="site-footer__bar">
        <div className="container site-footer__bar-inner">
          <p>© {year} NT Catering — {t('footer.rights')}</p>
          <p>{t('footer.place')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
