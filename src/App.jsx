import { Route, Routes } from 'react-router-dom'
import Loader from './components/shared/Loader/Loader'
import Navbar from './components/shared/Navbar/Navbar'
import Footer from './components/shared/Footer/Footer'
import Home from './pages/Home/Home'
import Plan from './pages/Plan/Plan'
import Contact from './pages/Contact/Contact'

function App() {
  return (
    <>
      <Loader />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planifiko-eventin" element={<Plan />} />
        <Route path="/kontakt" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
