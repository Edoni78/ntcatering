import { useEffect } from 'react'
import AboutHero from '../../components/pages/About/Hero/Hero'
import Story from '../../components/pages/About/Story/Story'
import Values from '../../components/pages/About/Values/Values'
import Studio from '../../components/pages/About/Studio/Studio'
import Where from '../../components/pages/About/Where/Where'
import Cta from '../../components/pages/Home/Cta/Cta'
import ctaImage from '../../assets/branding/brand3.png'

function About() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main>
      <AboutHero />
      <Story />
      <Values />
      <Studio />
      <Where />
      <Cta flush image={ctaImage} />
    </main>
  )
}

export default About
