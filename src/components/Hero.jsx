import { useEffect, useRef } from 'react'
import { EMAIL, fanShots, stats } from '../data.jsx'

export default function Hero() {
  const fanRef = useRef(null)

  // Parallax tilt on the phone fan.
  useEffect(() => {
    const fan = fanRef.current
    if (!fan || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const onMove = (e) => {
      const x = e.clientX / innerWidth - 0.5
      const y = e.clientY / innerHeight - 0.5
      fan.style.transform = `rotateY(${x * 7}deg) rotateX(${-y * 5}deg)`
    }
    addEventListener('mousemove', onMove, { passive: true })
    return () => removeEventListener('mousemove', onMove)
  }, [])

  return (
    <header className="hero wrap">
      <div className="badge rv">
        <span className="dot" /> Open to remote, hybrid &amp; on-site
      </div>
      <h1 className="rv">
        I build Flutter apps
        <br />
        that <span className="g">actually ship.</span>
      </h1>
      <p className="lede rv">
        Three apps live right now on Google Play and the App Store. I'm the sole Flutter developer behind a workforce
        platform used by shift workers internationally — architecture, native Android &amp; iOS, CI/CD and store
        releases.
      </p>
      <div className="cta rv">
        <a className="btn primary" href="#apps">
          See the apps &rarr;
        </a>
        <a className="btn ghost" href={`mailto:${EMAIL}`}>
          Get in touch
        </a>
      </div>

      <div className="fan" ref={fanRef}>
        {fanShots.map((s) => (
          <img key={s.src} className="p" src={`/images/${s.src}`} alt={s.alt} loading={s.eager ? undefined : 'lazy'} />
        ))}
      </div>

      <div className="stats rv">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <b>{s.value}</b>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </header>
  )
}
