import { EMAIL, GITHUB, LINKEDIN, latest } from '../data.jsx'
import { Cursor, FlutterLogo } from './Icons.jsx'
import Signature from './Signature.jsx'
import './Signature.css'

export default function Hero() {
  return (
    <header id="home" className="hero">
      <div className="hero-inner">
        <div className="pendant" aria-hidden="true">
          <span className="pendant-line" />
          <FlutterLogo className="pendant-logo" />
        </div>
        <h1 className="hero-name rv">
          Mehran
          <br />
          Hamza
        </h1>
        <p className="mono hero-role rv">
          Flutter developer · Mobile engineer · Android &amp; iOS
          <br />
          Lead Flutter developer @ Askus Solution
        </p>
        <p className="hero-bio rv">
          Building Flutter apps that <a href="#work">actually ship</a> — three of them live on Google Play and the
          App Store right now. Known for the parts most Flutter devs don't touch:{' '}
          <a href="#expertise">native Kotlin &amp; Swift</a>, background geofencing and{' '}
          <a href="#expertise">offline-first real-time</a> systems. Built my own product,{' '}
          <a href="https://github.com/mehranhamza1066/task_management_app" target="_blank" rel="noopener">
            Taskly
          </a>
          , to reference quality.
        </p>

        <div className="hero-links-row rv">
          <p className="mono hero-links">
            <a href="#work">Work</a>
            <span>·</span>
            <a href={`mailto:${EMAIL}`}>Email</a>
            <span>·</span>
            <a href={LINKEDIN} target="_blank" rel="noopener">
              LinkedIn
            </a>
            <span>·</span>
            <a href={GITHUB} target="_blank" rel="noopener">
              GitHub
            </a>
          </p>
          <Signature />
        </div>

        <div className="latest rv">
          <p className="mono latest-title">Latest</p>
          <ul>
            {latest.map((item) => (
              <li key={item.label}>
                <a
                  className="mono"
                  href={item.href}
                  {...(item.external ? { target: '_blank', rel: 'noopener' } : {})}
                >
                  <Cursor className="cursor-icon" />
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a className="mono view-all" href="#work">
                View all ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="status mono">
        <span>
          <i className="status-dot" /> Open to remote · contract · full-time
        </span>
        <span>
          <i className="status-pin">◎</i> Faisalabad, PK · UTC+5
        </span>
      </div>
    </header>
  )
}
