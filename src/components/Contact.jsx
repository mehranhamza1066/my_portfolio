import { EMAIL, socials } from '../data.jsx'

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <h2 className="rv">
        Available for select
        <br />
        Flutter opportunities
      </h2>
      <p className="mono-body rv">
        Have an app that needs to ship? Remote, contract or full-time —
        <br />
        send me an email or reach out on LinkedIn!
      </p>
      <a className="contact-email mono rv" href={`mailto:${EMAIL}`}>
        {EMAIL}
      </a>
      <ul className="contact-links mono rv">
        {socials.map((s) => (
          <li key={s.label}>
            <a href={s.href} target="_blank" rel="noopener">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
