import { Route, Routes } from 'react-router-dom'
import Loader from './components/shared/Loader/Loader'
import Navbar from './components/shared/Navbar/Navbar'
import Home from './pages/Home/Home'

function App() {
  return (
    <>
      <Loader />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App
