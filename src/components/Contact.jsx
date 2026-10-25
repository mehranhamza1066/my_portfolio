import { EMAIL, GITHUB, LINKEDIN } from '../data.jsx'

export default function Contact() {
  return (
    <section className="contact wrap rv">
      <div className="mono eyebrow">Available now</div>
      <h2>
        Let's build something
        <br />
        that ships.
      </h2>
      <p className="lede" style={{ marginBottom: 36 }}>
        Open to remote, hybrid and on-site Flutter roles — contract or full-time. I work from Pakistan (UTC+5), which
        gives 4+ hours of overlap with US Eastern mornings and full overlap with European hours.
      </p>
      <div className="cta">
        <a className="btn primary" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
        <a className="btn ghost" href={LINKEDIN} target="_blank" rel="noopener">
          LinkedIn ↗
        </a>
        <a className="btn ghost" href={GITHUB} target="_blank" rel="noopener">
          GitHub ↗
        </a>
      </div>
    </section>
  )
}
