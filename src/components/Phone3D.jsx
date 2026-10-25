import { useEffect, useRef } from 'react'

// Real 3D phone (three.js) recreating tamalsen.dev's featured-project loop.
// Keyframes were read off a screen recording of that site at 0.1s steps:
// the back swings past the camera, the screen comes round as a tipped-back
// wedge, the phone "pops" closer and leans harder, then settles and slowly
// drifts back to edge-on. 5 seconds per loop.
const LOOP = 5
const deg = Math.PI / 180

// [time s, yaw° (spin on long axis), pitch° (− = top tips away), lean°, x, y, z (+ = toward camera)]
const KEYS = [
  [0.0, 80, -12, 30, 0, 0, 0],
  [0.2, 96, -13, 30, -0.02, 0, 0.02],
  [0.4, 140, -15, 28, -0.1, 0, 0.12],
  [0.6, 180, -16, 26, -0.14, 0, 0.25],
  [0.7, 212, -20, 27, -0.1, 0, 0.24],
  [0.8, 262, -30, 31, 0, 0.02, 0.2],
  [0.9, 300, -40, 36, 0.08, 0.06, 0.26],
  [1.1, 325, -40, 38, 0.1, 0.08, 0.3],
  [1.3, 340, -30, 36, 0.07, 0.06, 0.24],
  [1.5, 350, -21, 32, 0.03, 0.03, 0.12],
  [1.8, 358, -14, 30, 0, 0, 0],
  [3.0, 375, -12, 30, 0, 0, 0],
  [4.3, 420, -12, 30, 0, 0, 0],
]

// Key i of an endless loop: wraps around, adding a full turn per lap.
function key(i) {
  const n = KEYS.length
  const lap = Math.floor(i / n)
  const k = [...KEYS[((i % n) + n) % n]]
  k[0] += lap * LOOP
  k[1] += lap * 360
  return k
}

// Smooth (C1) cubic Hermite through uneven keyframes, every channel.
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
  return k1.slice(1).map((_, j) => {
    const c = j + 1
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
  const glassBlack = new THREE.MeshPhysicalMaterial({ color: 0x050506, roughness: 0.4, metalness: 0.3, clearcoat: 0.6, clearcoatRoughness: 0.35, envMapIntensity: 0.35 })
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
      const key = new THREE.DirectionalLight(0xffffff, 0.7)
      key.position.set(-2, 3, 4)
      const rim = new THREE.DirectionalLight(0xa78bfa, 1.2)
      rim.position.set(3, -1, -2)
      scene.add(key, rim)

      // Close, wide-ish camera for the strong perspective of the original.
      const camera = new THREE.PerspectiveCamera(62, 1, 0.1, 50)
      camera.position.set(0, 0, 2.2)

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
      const pitch = new THREE.Group()
      lean.add(pitch)
      pitch.add(phone)
      scene.add(lean)
      const pose = (t) => {
        const [yaw, tip, tilt, x, y, z] = sample(t)
        phone.rotation.y = yaw * deg
        pitch.rotation.x = tip * deg
        lean.rotation.z = tilt * deg
        lean.position.set(x, y, z)
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
        pose(reduced ? 2.4 : t)
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
