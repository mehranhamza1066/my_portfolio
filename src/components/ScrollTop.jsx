import { useEffect, useState } from 'react'

export default function ScrollTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(scrollY > innerHeight * 0.8)
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a className={`scroll-top${show ? ' show' : ''}`} href="#home" aria-label="Back to top">
      ↑
    </a>
  )
}
