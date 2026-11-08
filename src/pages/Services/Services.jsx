import { useEffect } from 'react'
import ServicesHero from '../../components/pages/Services/Hero/Hero'
import Offer from '../../components/pages/Services/Offer/Offer'
import Kitchen from '../../components/pages/Services/Kitchen/Kitchen'
import Tableau from '../../components/pages/Services/Tableau/Tableau'
import Pair from '../../components/pages/Services/Pair/Pair'
import Cta from '../../components/pages/Home/Cta/Cta'
import ctaImage from '../../assets/branding/brand3.png'

function Services() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main>
      <ServicesHero />
      <Offer />
      <Kitchen />
      <Tableau />
      <Pair />
      <Cta flush image={ctaImage} />
    </main>
  )
}

export default Services
