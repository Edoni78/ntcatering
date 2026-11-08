import { useEffect } from 'react'
import GalleryHero from '../../components/pages/GalleryPage/Hero/Hero'
import Works from '../../components/pages/GalleryPage/Works/Works'
import Cta from '../../components/pages/Home/Cta/Cta'
import ctaImage from '../../assets/branding/brand3.png'

function Gallery() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main>
      <GalleryHero />
      <Works />
      <Cta flush image={ctaImage} />
    </main>
  )
}

export default Gallery
