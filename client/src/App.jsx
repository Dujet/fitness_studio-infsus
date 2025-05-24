import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Classes from './pages/Classes'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import './App.css'
import Profile from './pages/Profile'
import AdminTerms from './pages/AdminTerms'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/terms" element={<AdminTerms />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
