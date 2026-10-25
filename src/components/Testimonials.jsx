import { testimonials } from '../data.jsx'

function initials(name) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function Testimonials() {
  return (
    <section className="testimonials" aria-label="Testimonials">
      {testimonials.map((t, i) => (
        <figure className={`testi testi-${i}`} key={i}>
          <div className="testi-top">
            <span className="testi-mark">“</span>
            <span className="testi-avatar">{initials(t.name)}</span>
          </div>
          <blockquote>{t.text}</blockquote>
          <figcaption>
            <b>– {t.name}</b>
            <span>{t.role}</span>
          </figcaption>
        </figure>
      ))}
    </section>
  )
}
