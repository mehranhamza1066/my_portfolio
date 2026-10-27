import { useEffect, useRef } from 'react'
import './StoreDialog.css'

export default function StoreDialog({ project, onClose }) {
  const dialog = useRef(null)
  useEffect(() => {
    const element = dialog.current
    const previousOverflow = document.body.style.overflow
    element.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      element.close()
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return (
    <dialog ref={dialog} className="store-dialog" aria-labelledby="store-title"
      aria-describedby="store-description" onClose={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div className="store-panel">
        <button className="store-close" aria-label="Close store chooser" onClick={onClose} autoFocus>×</button>
        <span className="mono store-eyebrow">Explore the app</span>
        <p className="store-project">{project.title}</p>
        <h2 id="store-title">Choose your store.</h2>
        <p id="store-description">A native experience, on your platform of choice.</p>
        <div className="store-options">
          <a href={project.href} target="_blank" rel="noopener noreferrer" className="store-option">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m5 3 15 9-15 9V3Z" strokeLinejoin="round"/><path d="m5 3 10 12M5 21l10-12"/></svg>
            <span><small>For Android</small><strong>Google Play</strong></span><span aria-hidden="true">↗</span>
          </a>
          <a href={project.appStore} target="_blank" rel="noopener noreferrer" className="store-option">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="m8 18 7-12M9 6l7 12M6 14h12"/></svg>
            <span><small>For iPhone &amp; iPad</small><strong>App Store</strong></span><span aria-hidden="true">↗</span>
          </a>
        </div>
        <p className="store-footnote">Opens the official store in a new tab.</p>
      </div>
    </dialog>
  )
}
