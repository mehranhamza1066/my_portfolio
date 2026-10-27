import { useEffect, useRef, useState } from 'react'
import { navLinks } from '../data.jsx'

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)
  const menuRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 40)
    onScroll()
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuRef.current?.focus()
      }
    }
    const onOutside = (event) => {
      if (!navRef.current?.contains(event.target)) setMenuOpen(false)
    }
    const desktop = matchMedia('(min-width: 761px)')
    const onDesktop = () => { if (desktop.matches) setMenuOpen(false) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onOutside)
    desktop.addEventListener('change', onDesktop)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onOutside)
      desktop.removeEventListener('change', onDesktop)
    }
  }, [menuOpen])

  return (
    <nav ref={navRef} aria-label="Main navigation" className={`nav${scrolled ? ' scrolled' : ''}${menuOpen ? ' menu-open' : ''}`}>
      <a className="logo" href="#home" onClick={() => setMenuOpen(false)}>
        Mehran<span className="logo-dot">.</span>
        <span className="logo-cursor">_</span>
      </a>
      <button ref={menuRef} className="nav-toggle" type="button"
        aria-expanded={menuOpen} aria-controls="main-nav-links"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        onClick={() => setMenuOpen((open) => !open)}>
        <span>{menuOpen ? 'Close' : 'Menu'}</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          {menuOpen ? <path d="m5 5 10 10M15 5 5 15" /> : <path d="M3 5h14M3 10h14M3 15h14" />}
        </svg>
      </button>
      <div id="main-nav-links" className="nav-links">
        {navLinks.map((l, i) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
            <sup>0{i + 1}</sup>
            <span className="slashes">//</span> {l.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
