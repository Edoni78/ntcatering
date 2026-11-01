import { useEffect } from 'react'
import ContactHero from '../../components/pages/Contact/Hero/Hero'
import ContactForm from '../../components/pages/Contact/Form/Form'
import Cta from '../../components/pages/Home/Cta/Cta'
import ctaImage from '../../assets/branding/brand3.png'

function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main>
      <ContactHero />
      <ContactForm />
      <Cta flush image={ctaImage} />
    </main>
  )
}

export default Contact
