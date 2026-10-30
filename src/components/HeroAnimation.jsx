import { useEffect, useRef } from 'react'
import './HeroAnimation.css'

export default function HeroAnimation() {
  const stage = useRef(null)
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    const pointer = matchMedia('(hover: hover) and (pointer: fine)')
    const onMove = (event) => {
      if (motion.matches || !pointer.matches) return
      const x = event.clientX / innerWidth - 0.5
      const y = event.clientY / innerHeight - 0.5
      stage.current.style.transform = `rotateX(${8 - y * 8}deg) rotateY(${-14 + x * 14}deg)`
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
  return (
    <div className="hero-animation" aria-hidden="true">
<div className="ts-scene" aria-hidden="true">
  <div className="ts-stage" ref={stage}>
    <div className="ts-ring ts-r1"></div><div className="ts-ring ts-r2"></div>
    <div className="ts-p3d ts-pl">
      <div className="ts-notch"></div>
      <div className="ts-scr">
        <div className="ts-s-top"><b>Insights</b><span className="ts-pill">Live</span></div>
        <div className="ts-big">24.8k<small>active users</small></div>
        <div className="ts-s-chart"><span style={{ height: '30%' }}></span><span style={{ height: '55%' }}></span><span style={{ height: '42%' }}></span><span style={{ height: '75%' }}></span><span style={{ height: '62%' }}></span><span style={{ height: '92%' }}></span><span style={{ height: '80%' }}></span></div>
        <div className="ts-s-card ts-c2"><i></i><div><b>Retention</b><small>+12% this week</small></div></div>
      </div>
    </div>
    <div className="ts-p3d ts-pc">
      <div className="ts-notch"></div>
      <div className="ts-scr">
        <div className="ts-s-top"><b>Today</b><span className="ts-pill">3 tasks</span></div>
        <div className="ts-s-card ts-c1"><i></i><div><b>Design review</b><small>10:00 &middot; Team</small></div></div>
        <div className="ts-s-card ts-c2"><i></i><div><b>Ship v2.4 build</b><small>13:30 &middot; Release</small></div></div>
        <div className="ts-s-card ts-c3"><i></i><div><b>Customer demo</b><small>16:00 &middot; Client</small></div></div>
        <div className="ts-orb"></div>
      </div>
    </div>
    <div className="ts-p3d ts-pr">
      <div className="ts-notch"></div>
      <div className="ts-scr">
        <div className="ts-s-top"><b>Messages</b><span className="ts-pill">2</span></div>
        <div className="ts-bub ts-l">Build is ready</div>
        <div className="ts-bub ts-r">Ship it!</div>
        <div className="ts-bub ts-l">Live on the App Store</div>
        <div className="ts-bub ts-r">Amazing work</div>
      </div>
    </div>
    <div className="ts-chip ts-ch1"><span className="ts-dot"></span>Build passed</div>
    <div className="ts-chip ts-ch2">iOS &amp; Android</div>
    <div className="ts-chip ts-ch3">Smooth interfaces</div>
  </div>
</div>
    </div>
  )
}
