import { engineering } from '../data.jsx'

export default function Engineering() {
  return (
    <section id="engineering" className="wrap">
      <div className="rv">
        <div className="mono eyebrow">Under the hood</div>
        <h2 className="h2">
          The parts most
          <br />
          Flutter devs don't touch.
        </h2>
        <p className="sub">
          Anyone can build a list view. These are the problems that needed native code, platform internals, and a lot
          of testing on real devices.
        </p>
      </div>

      <div className="eng">
        {engineering.map((card) => (
          <div className="card rv" key={card.title}>
            <span className="tag">{card.tag}</span>
            <h4>{card.title}</h4>
            <p>{card.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
