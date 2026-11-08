import { useEffect } from 'react'
import PlanHero from '../../components/pages/Plan/Hero/Hero'
import Calculator from '../../components/pages/Plan/Calculator/Calculator'
import Cta from '../../components/pages/Home/Cta/Cta'
import ctaImage from '../../assets/branding/brand3.png'
import { useI18n } from '../../i18n/I18n'

function Plan() {
  const { t } = useI18n()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main>
      <PlanHero />
      <Calculator />
      <Cta flush image={ctaImage} to="/kontakt" linkLabel={t('nav.contact')} />
    </main>
  )
}

export default Plan
