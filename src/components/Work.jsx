import { useMemo, useState } from 'react'
import { featured, projects } from '../data.jsx'
import StoreDialog from './StoreDialog.jsx'
import Phone3D from './Phone3D.jsx'

const filters = ['All', ...new Set(projects.map((p) => p.category))]

function ProjectMedia({ project }) {
  if (project.cover) {
    return (
      <div className="card-media cover">
        <img src={`/images/${project.cover}`} alt={`${project.title} cover`} loading="lazy" />
      </div>
    )
  }
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
  const [storeProject, setStoreProject] = useState(null)
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
          <div className="featured-phone">
            <Phone3D src={`/images/${featured.image}`} alt="Upthyme app home screen" />
          </div>
          <div className="featured-copy">
            {/* hand-drawn double-stroke arrow pointing up at the phone */}
            <svg className="featured-arrow" viewBox="0 0 96 80" fill="none" aria-hidden="true">
              <path d="M4 76C6 48 24 26 62 15" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
              <path d="M10 77C13 52 30 32 64 22" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
              <path d="M58 6L90 12 70 37 66 24Z" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" />
            </svg>
            <p>Featured Project</p>
            <h3 className="mono">{featured.name}</h3>
            <button className="btn-purple" onClick={() => setStoreProject(projects[0])} aria-haspopup="dialog">
              View Project
            </button>
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
          const Tag = p.appStore ? 'button' : p.href ? 'a' : 'div'
          return (
            <Tag
              key={p.title}
              className="work-card"
              {...(p.appStore ? { type: 'button', onClick: () => setStoreProject(p), 'aria-haspopup': 'dialog' } : p.href ? { href: p.href, target: '_blank', rel: 'noopener' } : {})}
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
      {storeProject && <StoreDialog project={storeProject} onClose={() => setStoreProject(null)} />}
    </section>
  )
}
