import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experiences from './components/Experiences'
import Skills from './components/Skills'
import Formations from './components/Formations'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Login from './pages/Login'
import AdminLayout from './components/admin/AdminLayout'
import AdminProjects from './pages/admin/Projects'
import AdminExperiences from './pages/admin/Experiences'
import AdminSkills from './pages/admin/Skills'
import AdminFormations from './pages/admin/Formations'
import AdminMessages from './pages/admin/Messages'
import Dashboard from './pages/admin/Dashboard'

function Portfolio() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <Hero />
      <Experiences />
      <Skills />
      <Formations />
      <Projects />
      <Contact />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="experiences" element={<AdminExperiences />} />
          <Route path="skills" element={<AdminSkills />} />
          <Route path="formations" element={<AdminFormations />} />
          <Route path="messages" element={<AdminMessages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}