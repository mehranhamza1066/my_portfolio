import { apps } from '../data.jsx'

export default function Apps() {
  return (
    <section id="apps" className="wrap">
      <div className="rv">
        <div className="mono eyebrow">Shipped to production</div>
        <h2 className="h2">
          Three apps. Both stores.
          <br />
          Built end to end.
        </h2>
        <p className="sub">
          The Upthyme suite — a workforce-management platform built for a Lebanon-based client and used by shift
          workers across multiple countries. I own the entire mobile layer.
        </p>
      </div>

      {apps.map((app, i) => (
        <div key={app.name} className={`app rv${i % 2 ? ' rev' : ''}`}>
          <div>
            <h3>{app.name}</h3>
            <p>{app.description}</p>
            <div className="chips">
              {app.chips.map((c) => (
                <span className="chip" key={c}>
                  {c}
                </span>
              ))}
            </div>
            <div className="links">
              <a className="store" href={app.play} target="_blank" rel="noopener">
                Google Play ↗
              </a>
              <a className="store" href={app.appStore} target="_blank" rel="noopener">
                App Store ↗
              </a>
            </div>
          </div>
          <div className="shots">
            {app.shots.map((s) => (
              <img key={s.src} src={`/images/${s.src}`} alt={s.alt} loading="lazy" />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
