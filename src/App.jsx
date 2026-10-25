import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Apps from './components/Apps.jsx'
import Engineering from './components/Engineering.jsx'
import Taskly from './components/Taskly.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { useReveal } from './hooks/useReveal.js'

export default function App() {
  useReveal()

  return (
    <>
      <div className="aura">
        <div className="orb a" />
        <div className="orb b" />
        <div className="orb c" />
      </div>
      <div className="grid-bg" />

      <Nav />
      <main id="top">
        <Hero />
        <About />
        <Apps />
        <Engineering />
        <Taskly />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
