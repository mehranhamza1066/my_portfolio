import { EMAIL, navLinks } from '../data.jsx'

export default function Nav() {
  return (
    <nav>
      <div className="wrap">
        <a className="brand" href="#top">
          Mehran<span>.</span>
        </a>
        <div className="navlinks">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
          <a className="btn-sm" href={`mailto:${EMAIL}`}>
            Hire me
          </a>
        </div>
      </div>
    </nav>
  )
}
