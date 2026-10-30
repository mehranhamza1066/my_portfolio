import { EMAIL, GITHUB, LINKEDIN } from '../data.jsx'
import { Cursor, FlutterLogo } from './Icons.jsx'
import HeroAnimation from './HeroAnimation.jsx'
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
          Flutter Developer experienced in building production-ready mobile applications. Strong expertise in{' '}
          <a href="#api-websockets">API and WebSocket integration</a>,{' '}
          <a href="#native-method-channel">native method channel</a> communication, and{' '}
          <a href="#clean-architecture">clean architecture</a>. Proven experience delivering SaaS
          applications with scalable architecture, maintainable codebases, and high-quality UI/UX
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

        <HeroAnimation />

        <section className="tech-stack rv" aria-labelledby="tech-stack-title">
          <h2 id="tech-stack-title" className="mono tech-stack-title">Tech Stack</h2>
          <dl className="tech-stack-list">
            <div><dt><Cursor className="tech-stack-cursor" />Frontend</dt><dd>Flutter, Dart, BLoC, GetX</dd></div>
            <div><dt><Cursor className="tech-stack-cursor" />Native</dt><dd>Kotlin, Swift, Method Channels</dd></div>
            <div><dt><Cursor className="tech-stack-cursor" />Backend</dt><dd>Python, Django, Firebase</dd></div>
            <div><dt><Cursor className="tech-stack-cursor" />Architecture</dt><dd>Clean Architecture</dd></div>
            <div><dt><Cursor className="tech-stack-cursor" />Integrations</dt><dd>REST APIs, WebSockets</dd></div>
            <div><dt><Cursor className="tech-stack-cursor" />Storage</dt><dd>Hive, offline caching</dd></div>
            <div><dt><Cursor className="tech-stack-cursor" />CI/CD</dt><dd>GitHub Actions, Fastlane</dd></div>
          </dl>
          <p className="tech-stack-note">
            Flexible about tools, strict about structure. Currently focused on performance,
            making app onboarding faster and smoother.
          </p>
        </section>
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
