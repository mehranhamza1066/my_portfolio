import { useMemo, useState } from 'react'
import { featured, projects } from '../data.jsx'

const filters = ['All', ...new Set(projects.map((p) => p.category))]

function ProjectMedia({ project }) {
  if (project.shots) {
    return (
      <div className="card-media phones">
        {project.shots.map((s) => (
          <img key={s} src={`/images/${s}`} alt="" loading="lazy" />
        ))}
      </div>
    )
  }
  const [a, b] = project.tint
  return (
    <div className="card-media title-card" style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}>
      <span className="title-card-name">{project.title.split(' — ')[0]}</span>
      <span className="mono title-card-stack">{project.stack}</span>
    </div>
  )
}

export default function Work() {
  const [filter, setFilter] = useState('All')
  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )

  return (
    <section id="work" className="section work">
      <div className="work-top">
        <div className="rv">
          <h2 className="work-title">
            My
            <br />
            Work
          </h2>
          <p className="mono-body work-intro">
            Shipped three Flutter apps to Google Play and the App Store for a workforce-management platform used by
            shift workers across several countries — employee, manager and a face-recognition kiosk. I own the whole
            mobile layer: architecture, native code, CI/CD and releases.
          </p>
        </div>

        <div className="featured rv">
          <svg className="featured-arrow" viewBox="0 0 120 120" fill="none" aria-hidden="true">
            <path d="M18 110C14 70 40 30 96 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            <path d="M80 10l18 8-12 15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <img className="featured-phone" src={`/images/${featured.image}`} alt="Upthyme app home screen" />
          <div className="featured-copy">
            <p>Featured Project</p>
            <h3 className="mono">{featured.name}</h3>
            <a className="btn-purple" href={featured.href} target="_blank" rel="noopener">
              View Project
            </a>
          </div>
        </div>
      </div>

      <div className="filters rv">
        <span>Filter by</span>
        {filters.map((f, i) => {
          const count = f === 'All' ? projects.length : projects.filter((p) => p.category === f).length
          return (
            <button key={f} className={f === filter ? 'active' : ''} onClick={() => setFilter(f)}>
              {f}
              <sup>{String(count).padStart(2, '0')}</sup>
              {i < filters.length - 1 && <span className="sep">/</span>}
            </button>
          )
        })}
      </div>

      <div className="work-grid">
        {visible.map((p) => {
          const Tag = p.href ? 'a' : 'div'
          return (
            <Tag
              key={p.title}
              className="work-card"
              {...(p.href ? { href: p.href, target: '_blank', rel: 'noopener' } : {})}
            >
              <ProjectMedia project={p} />
              <div className="card-body">
                <h3>{p.title}</h3>
                <p>{p.stack}</p>
              </div>
            </Tag>
          )
        })}
      </div>
    </section>
  )
}
