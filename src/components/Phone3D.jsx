// CSS-only iPhone that slowly turns in 3D. Thickness comes from stacked
// frame layers pushed back along the Z axis.
const DEPTH_LAYERS = 14

export default function Phone3D({ src, alt }) {
  return (
    <div className="phone3d-stage">
      <div className="phone3d">
        {Array.from({ length: DEPTH_LAYERS }, (_, i) => (
          <span key={i} className="phone3d-edge" style={{ '--z': `${-(i + 1)}px` }} aria-hidden="true" />
        ))}
        <span className="phone3d-back" aria-hidden="true" />
        <div className="phone3d-front">
          <span className="phone3d-btn phone3d-btn-power" aria-hidden="true" />
          <span className="phone3d-btn phone3d-btn-vol1" aria-hidden="true" />
          <span className="phone3d-btn phone3d-btn-vol2" aria-hidden="true" />
          <div className="phone3d-screen">
            <img src={src} alt={alt} />
            <span className="phone3d-island" aria-hidden="true" />
            <span className="phone3d-glare" aria-hidden="true" />
          </div>
        </div>
      </div>
      <span className="phone3d-shadow" aria-hidden="true" />
    </div>
  )
}
