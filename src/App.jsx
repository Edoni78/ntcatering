import { Route, Routes, useLocation } from 'react-router-dom'
import Loader from './components/shared/Loader/Loader'
import Navbar from './components/shared/Navbar/Navbar'
import Footer from './components/shared/Footer/Footer'
import Home from './pages/Home/Home'
import Plan from './pages/Plan/Plan'
import Contact from './pages/Contact/Contact'
import Gallery from './pages/Gallery/Gallery'
import Services from './pages/Services/Services'
import About from './pages/About/About'
import Admin from './pages/Admin/Admin'

function App() {
  const { pathname } = useLocation()
  const isPrivate = pathname.startsWith('/admin') || pathname === '/login'

  return (
    <>
      {isPrivate ? null : <Loader />}
      {isPrivate ? null : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planifiko-eventin" element={<Plan />} />
        <Route path="/kontakt" element={<Contact />} />
        <Route path="/galeria" element={<Gallery />} />
        <Route path="/sherbimet" element={<Services />} />
        <Route path="/rreth-nesh" element={<About />} />
        <Route path="/login" element={<Admin />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      {isPrivate ? null : <Footer />}
    </>
  )
}

export default App
