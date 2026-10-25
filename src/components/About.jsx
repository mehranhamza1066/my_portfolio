export default function About() {
  return (
    <section id="about" className="wrap">
      <div className="about">
        <div className="aboutPhoto rv">
          <img src="/images/mehran.png" alt="Mehran Hamza" width="750" height="1000" loading="lazy" />
        </div>
        <div className="rv">
          <div className="mono eyebrow">About</div>
          <h2 className="h2">Hi, I'm Mehran.</h2>
          <p>
            A Flutter developer based in <strong>Faisalabad, Pakistan</strong>. I'm the sole Flutter developer at AskUs
            Solution, where I own the entire mobile layer of Upthyme — a workforce-management platform built for a
            Lebanon-based client and used by shift workers across several countries.
          </p>
          <p>
            <strong>Three apps, both stores</strong>, from architecture through to the release builds. Nobody hands me
            a spec and a design system; I make the calls and I ship the result.
          </p>
          <p>
            What I actually enjoy is the point where Flutter stops being enough — dropping into{' '}
            <strong>Kotlin and Swift</strong> to make geofencing survive a force-close, or building notifications that
            behave like a real messaging app instead of a plugin default.
          </p>
          <p>
            Outside client work I build and maintain <strong>Taskly</strong>, my own Flutter product, where I keep my
            BLoC and testing practice sharp.
          </p>
        </div>
      </div>
    </section>
  )
}
