import { useState } from 'react'
import { experience } from '../data.jsx'

export default function Experience() {
  const [open, setOpen] = useState(0)

  return (
    <section id="experience" className="section experience">
      <h2 className="section-title rv">
        Professional
        <br />
        Experience
      </h2>

      <div className="accordion">
        {experience.map((job, i) => {
          const isOpen = open === i
          return (
            // .rv lives on a wrapper whose className never changes: React rewriting the
            // inner item's className (open/closed) would otherwise wipe the reveal's `in` class.
            <div className="rv" key={job.company}>
              <div className={`acc-item${isOpen ? ' open' : ''}`}>
                <button className="acc-head" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}>
                  <span>
                    {job.role} @ {job.company}
                  </span>
                  <span className="acc-right">
                    <span className="acc-period">{job.period}</span>
                    <span className="acc-plus">+</span>
                  </span>
                </button>
                <div className="acc-body">
                  <div className="acc-inner">
                    <div className="acc-meta">
                      <span>📍 {job.location}</span>
                      {job.site && (
                        <a href={`https://${job.site}`} target="_blank" rel="noopener">
                          🔗 {job.site}
                        </a>
                      )}
                    </div>
                    <p>{job.body}</p>
                    <div className="acc-tags">
                      {job.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
