import { useEffect, useState } from 'react'
import { navLinks } from '../data.jsx'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 40)
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <a className="logo" href="#home">
        Mehran<span className="logo-dot">.</span>
        <span className="logo-cursor">_</span>
      </a>
      <div className="nav-links">
        {navLinks.map((l, i) => (
          <a key={l.href} href={l.href}>
            <sup>0{i + 1}</sup>
            <span className="slashes">//</span> {l.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
