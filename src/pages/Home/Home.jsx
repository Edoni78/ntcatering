import Hero from '../../components/pages/Home/Hero/Hero'
import Philosophy from '../../components/pages/Home/Philosophy/Philosophy'
import Identity from '../../components/pages/Home/Identity/Identity'
import EventIndex from '../../components/pages/Home/EventIndex/EventIndex'
import Clients from '../../components/pages/Home/Clients/Clients'
import Notes from '../../components/pages/Home/Notes/Notes'
import Menus from '../../components/pages/Home/Menus/Menus'
import Gallery from '../../components/pages/Home/Gallery/Gallery'
import Finale from '../../components/pages/Home/Finale/Finale'

function Home() {
  return (
    <main>
      <Hero />
      <Philosophy />
      <Identity />
      <EventIndex />
      <Clients />
      <Notes />
      <Menus />
      <Gallery />
      <Finale />
    </main>
  )
}

export default Home
