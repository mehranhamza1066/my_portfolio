import { useEffect, useState } from 'react'

export default function Footer() {
  const [viewport, setViewport] = useState('')

  useEffect(() => {
    const update = () => setViewport(`${innerWidth}×${innerHeight}`)
    update()
    addEventListener('resize', update)
    return () => removeEventListener('resize', update)
  }, [])

  return (
    <footer className="footer mono">
      <span>© {new Date().getFullYear()} Mehran Hamza</span>
      <span>Built with React</span>
      <span>Viewport {viewport}</span>
    </footer>
  )
}
