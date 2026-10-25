import { useEffect, useRef } from 'react'

// Real 3D phone (three.js) recreating tamalsen.dev's featured-project loop:
// a fast 360° flip around the phone's long axis, then a slow drift, every 5s.
const LOOP = 5
const FLIP = 1.3
const FROM = (70 * Math.PI) / 180 // steep angle, screen turning away
const REST = (-28 * Math.PI) / 180 // facing the viewer after the flip

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2

function spinAngle(time) {
  const p = time % LOOP
  if (p < FLIP) return FROM + (REST + Math.PI * 2 - FROM) * easeInOutCubic(p / FLIP)
  return REST + (FROM - REST) * easeInOutSine((p - FLIP) / (LOOP - FLIP))
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

  // Screen: shows the screenshot as-is (not lit, not tone mapped) under a clear glossy coat.
  const screen = new THREE.Mesh(
    flatRect(THREE, screenW, screenH, 0.085),
    new THREE.MeshPhysicalMaterial({
      color: 0x000000,
      emissive: 0xffffff,
      emissiveMap: texture,
      roughness: 0.1,
      clearcoat: 1,
      clearcoatRoughness: 0.04,
      toneMapped: false,
    }),
  )
  screen.position.z = front + 0.0008
  phone.add(screen)

  const island = new THREE.Mesh(flatRect(THREE, 0.2, 0.052, 0.026), new THREE.MeshBasicMaterial({ color: 0x000000 }))
  island.position.set(0, screenH / 2 - screenH * 0.026, front + 0.0016)
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

      const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 50)
      camera.position.set(0, 0, 5.4)

      const texture = await new THREE.TextureLoader().loadAsync(src)
      if (disposed) {
        renderer.dispose()
        return
      }
      texture.colorSpace = THREE.SRGBColorSpace
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
      const { phone } = buildPhone(THREE, texture, texture.image.width / texture.image.height)

      // Outer group = the fixed lean; inner phone spins around its own long axis.
      const tilt = new THREE.Group()
      tilt.rotation.set(0.12, 0, 0.44)
      tilt.add(phone)
      scene.add(tilt)

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
        phone.rotation.y = reduced ? REST : spinAngle(t)
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
