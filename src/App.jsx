import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Expertise from './components/Expertise.jsx'
import Work from './components/Work.jsx'
import Experience from './components/Experience.jsx'
import Testimonials from './components/Testimonials.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import ScrollTop from './components/ScrollTop.jsx'
import { useReveal } from './hooks/useReveal.js'

export default function App() {
  useReveal()

  return (
    <>
      <div className="grid-bg" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Expertise />
        <Work />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ScrollTop />
    </>
  )
}
