import { skills } from '../data.jsx'

export default function Skills() {
  return (
    <section className="wrap rv">
      <div className="mono eyebrow">Toolkit</div>
      <h2 className="h2" style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)' }}>
        What I work with
      </h2>
      <div className="skills">
        {skills.map((s) => (
          <span className="skill" key={s}>
            {s}
          </span>
        ))}
      </div>
    </section>
  )
}
