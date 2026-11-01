import { useEffect } from 'react'
import PlanHero from '../../components/pages/Plan/Hero/Hero'
import Calculator from '../../components/pages/Plan/Calculator/Calculator'
import Cta from '../../components/pages/Home/Cta/Cta'
import ctaImage from '../../assets/branding/brand3.png'

function Plan() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main>
      <PlanHero />
      <Calculator />
      <Cta flush image={ctaImage} to="/kontakt" linkLabel="Kontakti" />
    </main>
  )
}

export default Plan
