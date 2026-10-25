import { tasklyNums } from '../data.jsx'

export default function Taskly() {
  return (
    <section id="taskly" className="wrap">
      <div className="taskly rv">
        <div className="mono eyebrow">Personal product</div>
        <h2 className="h2" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)' }}>
          Taskly
        </h2>
        <p className="sub">
          A task and habit app I design, build and maintain on my own — product decisions, architecture, UI and
          testing. It's where I keep my BLoC and testing practice sharp, and it's built to reference-quality rather
          than demo-quality.
        </p>
        <div className="nums">
          {tasklyNums.map((n) => (
            <div key={n.label}>
              <b>{n.value}</b>
              <span>{n.label}</span>
            </div>
          ))}
        </div>
        <div className="links" style={{ marginTop: 32 }}>
          <a className="store" href="https://github.com/mehranhamza1066/task_management_app" target="_blank" rel="noopener">
            View source on GitHub ↗
          </a>
        </div>
      </div>
    </section>
  )
}
