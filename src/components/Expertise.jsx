import { expertise, quote } from '../data.jsx'
import { ExpertiseIcon } from './Icons.jsx'

const codeDecor = `class Mehran extends StatelessWidget {
  const Mehran({super.key});

  @override
  Widget build(BuildContext context) {
    // Things I do to ship a feature...
    return Column(children: [
      Architecture(clean: true),
      MethodChannel('kotlin & swift'),
      // Maybe a geofence that survives force-close?
      Tests(unit: true, widget: true, bloc: true),
      Release(stores: ['Play', 'App Store']),
    ]);
  }
}`

export default function Expertise() {
  return (
    <section id="expertise" className="section expertise">
      <h2 className="section-title rv">My Expertise</h2>

      <div className="exp-grid">
        {expertise.map((e) => (
          <article className="exp-card rv" key={e.title[0]}>
            <div className="exp-head">
              <ExpertiseIcon name={e.icon} />
              <h3>
                <span className="hl" style={{ '--hl': e.accent }}>
                  {e.title[0]}
                </span>
                <br />
                {e.title[1]}
              </h3>
            </div>
            <div className="code-block mono-body">
              <span className="tag">&lt;h3&gt;</span>
              <p>{e.body}</p>
              <span className="tag">&lt;/h3&gt;</span>
            </div>
          </article>
        ))}
        <blockquote className="exp-quote rv">
          <p>{quote.text}</p>
          <cite>— {quote.by}</cite>
        </blockquote>
      </div>

      <pre className="code-decor" aria-hidden="true">
        {codeDecor}
      </pre>
    </section>
  )
}
