import { useEffect, useRef } from 'react'

// Real 3D phone (three.js) recreating tamalsen.dev's featured-project loop.
// Keyframes were read off that video frame by frame: a fast tumbling 360°
// flip (the top tips far back mid-flip), then a slow drift, every 5 seconds.
const LOOP = 5
const LEAN = 0.5 // radians the phone leans to the left, whole loop
const deg = Math.PI / 180

// [time s, yaw° (spin around long axis), pitch° (− = top tips away), x offset]
const KEYS = [
  [0.0, 75, -12, 0],
  [0.2, 108, -15, -0.03],
  [0.4, 168, -20, -0.12],
  [0.5, 200, -26, -0.13],
  [0.6, 266, -34, -0.02],
  [0.7, 298, -40, 0.07],
  [0.8, 318, -40, 0.09],
  [0.9, 331, -35, 0.07],
  [1.0, 339, -28, 0.04],
  [1.2, 347, -18, 0.01],
  [2.6, 365, -11, 0],
  [4.4, 410, -9, 0],
]

// Key i of an endless loop: wraps around, adding a full turn per lap.
function key(i) {
  const n = KEYS.length
  const lap = Math.floor(i / n)
  const [t, yaw, pitch, x] = KEYS[((i % n) + n) % n]
  return [t + lap * LOOP, yaw + lap * 360, pitch, x]
}

// Smooth (C1) cubic Hermite through uneven keyframes.
function sample(time) {
  const p = time % LOOP
  let i = KEYS.length - 1
  while (KEYS[i][0] > p) i--
  const k0 = key(i - 1)
  const k1 = key(i)
  const k2 = key(i + 1)
  const k3 = key(i + 2)
  const dt = k2[0] - k1[0]
  const u = (p - k1[0]) / dt
  const h00 = 2 * u ** 3 - 3 * u ** 2 + 1
  const h10 = u ** 3 - 2 * u ** 2 + u
  const h01 = -2 * u ** 3 + 3 * u ** 2
  const h11 = u ** 3 - u ** 2
  return [1, 2, 3].map((c) => {
    const m1 = ((k2[c] - k0[c]) / (k2[0] - k0[0])) * dt
    const m2 = ((k3[c] - k1[c]) / (k3[0] - k1[0])) * dt
    return h00 * k1[c] + h10 * m1 + h01 * k2[c] + h11 * m2
  })
}

function roundedRect(THREE, w, h, r) {
  const s = new THREE.Shape()
  const x = -w / 2
  const y = -h / 2
  s.moveTo(x + r, y)
  s.lineTo(x + w - r, y)
  s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0)
  s.lineTo(x + w, y + h - r)
  s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2)
  s.lineTo(x + r, y + h)
  s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI)
  s.lineTo(x, y + r)
  s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5)
  return s
}

// ShapeGeometry UVs are in shape units; stretch them to 0..1 across the rect.
function flatRect(THREE, w, h, r) {
  const g = new THREE.ShapeGeometry(roundedRect(THREE, w, h, r), 32)
  const pos = g.attributes.position
  const uv = g.attributes.uv
  for (let i = 0; i < pos.count; i++) uv.setXY(i, pos.getX(i) / w + 0.5, pos.getY(i) / h + 0.5)
  return g
}

function buildPhone(THREE, texture, aspect) {
  const screenW = 0.7
  const screenH = screenW / aspect
  const bezel = 0.028
  const bevel = 0.014
  const depth = 0.07
  const phoneW = screenW + bezel * 2
  const phoneH = screenH + bezel * 2
  const front = depth / 2 + bevel

  const phone = new THREE.Group()

  const bodyGeo = new THREE.ExtrudeGeometry(roundedRect(THREE, phoneW - bevel * 2, phoneH - bevel * 2, 0.11), {
    depth,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 10,
    curveSegments: 40,
  })
  bodyGeo.translate(0, 0, -depth / 2)
  const glassBlack = new THREE.MeshPhysicalMaterial({ color: 0x050506, roughness: 0.18, metalness: 0.3, clearcoat: 1, clearcoatRoughness: 0.08 })
  const titanium = new THREE.MeshPhysicalMaterial({ color: 0x3a3a40, roughness: 0.22, metalness: 1, clearcoat: 0.6 })
  phone.add(new THREE.Mesh(bodyGeo, [glassBlack, titanium]))

  // Screen: the screenshot exactly as-is (unlit), under a faintly reflective glass layer.
  const screenGeo = flatRect(THREE, screenW, screenH, 0.085)
  const screen = new THREE.Mesh(screenGeo, new THREE.MeshBasicMaterial({ map: texture, toneMapped: false }))
  screen.position.z = front + 0.0008
  const glass = new THREE.Mesh(
    screenGeo,
    new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.04, metalness: 1, transparent: true, opacity: 0.07 }),
  )
  glass.position.z = front + 0.0012
  phone.add(screen, glass)

  const island = new THREE.Mesh(flatRect(THREE, 0.2, 0.052, 0.026), new THREE.MeshBasicMaterial({ color: 0x000000 }))
  island.position.set(0, screenH / 2 - screenH * 0.026, front + 0.002)
  phone.add(island)

  // Side buttons
  const btnMat = titanium
  const addButton = (x, y, h) => {
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.012, h, 0.03), btnMat)
    b.position.set(x, y, 0)
    phone.add(b)
  }
  addButton(phoneW / 2 + 0.004, phoneH * 0.22, 0.2)
  addButton(-phoneW / 2 - 0.004, phoneH * 0.27, 0.12)
  addButton(-phoneW / 2 - 0.004, phoneH * 0.17, 0.12)

  // Camera bump on the back (top-left when looking at the back).
  const back = -front
  const plate = new THREE.Mesh(
    new THREE.ExtrudeGeometry(roundedRect(THREE, 0.27, 0.27, 0.07), { depth: 0.014, bevelEnabled: true, bevelThickness: 0.004, bevelSize: 0.004, bevelSegments: 4, curveSegments: 24 }),
    new THREE.MeshPhysicalMaterial({ color: 0x1c1c20, roughness: 0.35, metalness: 0.5 }),
  )
  plate.position.set(phoneW / 2 - 0.19, phoneH / 2 - 0.19, back - 0.014)
  phone.add(plate)
  const lensMat = new THREE.MeshPhysicalMaterial({ color: 0x050508, roughness: 0.05, metalness: 0.2, clearcoat: 1 })
  const ringMat = new THREE.MeshPhysicalMaterial({ color: 0x55555c, roughness: 0.2, metalness: 1 })
  for (const [dx, dy] of [[-0.06, 0.06], [-0.06, -0.06], [0.065, 0]]) {
    const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.052, 0.02, 40), ringMat)
    ring.rotation.x = Math.PI / 2
    ring.position.set(plate.position.x + dx, plate.position.y + dy, back - 0.026)
    const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.036, 0.022, 40), lensMat)
    lens.rotation.x = Math.PI / 2
    lens.position.set(ring.position.x, ring.position.y, back - 0.028)
    phone.add(ring, lens)
  }

  return { phone, height: phoneH, width: phoneW }
}

export default function Phone3D({ src, alt }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    let disposed = false
    let cleanup = () => {}

    ;(async () => {
      const THREE = await import('three')
      const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js')
      if (disposed) return

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.05
      mount.appendChild(renderer.domElement)

      const scene = new THREE.Scene()
      const pmrem = new THREE.PMREMGenerator(renderer)
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
      const key = new THREE.DirectionalLight(0xffffff, 1.6)
      key.position.set(-2, 3, 4)
      const rim = new THREE.DirectionalLight(0xa78bfa, 1.2)
      rim.position.set(3, -1, -2)
      scene.add(key, rim)

      // Close, wide-ish camera for the strong perspective of the original.
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50)
      camera.position.set(0, 0, 2.4)

      const texture = await new THREE.TextureLoader().loadAsync(src)
      if (disposed) {
        renderer.dispose()
        return
      }
      texture.colorSpace = THREE.SRGBColorSpace
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
      const { phone } = buildPhone(THREE, texture, texture.image.width / texture.image.height)

      // lean (z) → pitch (x, tips the top back) → phone spins on its long axis (y)
      const lean = new THREE.Group()
      lean.rotation.z = LEAN
      const pitch = new THREE.Group()
      lean.add(pitch)
      pitch.add(phone)
      scene.add(lean)
      const pose = (t) => {
        const [yaw, tip, x] = sample(t)
        phone.rotation.y = yaw * deg
        pitch.rotation.x = tip * deg
        lean.position.x = x
      }

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = mount
        renderer.setSize(w, h, false)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
      }
      resize()
      const ro = new ResizeObserver(resize)
      ro.observe(mount)

      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
      let raf = 0
      let visible = true
      const start = performance.now()
      const render = () => {
        const t = (performance.now() - start) / 1000
        pose(reduced ? 2.6 : t)
        renderer.render(scene, camera)
        if (!reduced && visible) raf = requestAnimationFrame(render)
      }
      render()

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting
        cancelAnimationFrame(raf)
        if (visible && !reduced) raf = requestAnimationFrame(render)
      })
      io.observe(mount)

      cleanup = () => {
        cancelAnimationFrame(raf)
        io.disconnect()
        ro.disconnect()
        scene.traverse((o) => {
          o.geometry?.dispose()
          ;[].concat(o.material || []).forEach((m) => m.dispose())
        })
        texture.dispose()
        pmrem.dispose()
        renderer.dispose()
        renderer.domElement.remove()
      }
    })()

    return () => {
      disposed = true
      cleanup()
    }
  }, [src])

  return <div className="phone3d-stage" ref={mountRef} role="img" aria-label={alt} />
}
