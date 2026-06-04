import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function ParticleNetworkCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const isMobile = window.innerWidth < 768
    const PARTICLE_COUNT = isMobile ? 30 : 60
    const CONNECTION_DISTANCE = 150
    const MOUSE_DISTANCE = 200

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 200

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Particles
    const particleGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const velocities: { x: number; y: number; z: number }[] = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 600
      positions[i * 3 + 1] = (Math.random() - 0.5) * 400
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100
      velocities.push({
        x: (Math.random() - 0.5) * 0.3,
        y: (Math.random() - 0.5) * 0.3,
        z: (Math.random() - 0.5) * 0.1,
      })
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xC8A45E,
      size: 2.5,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    // Lines for connections
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xC8A45E,
      transparent: true,
      opacity: 0.08,
    })

    const linesGroup = new THREE.Group()
    scene.add(linesGroup)

    // Mouse tracking
    const mouse = new THREE.Vector2(9999, 9999)
    const mouseWorld = new THREE.Vector3()

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

      mouseWorld.set(
        mouse.x * 300,
        mouse.y * 200,
        0
      )
    }

    if (!isMobile) {
      container.addEventListener('mousemove', onMouseMove)
    }

    // Animation
    let animationId: number

    const animate = () => {
      animationId = requestAnimationFrame(animate)

      const posArray = particleGeometry.attributes.position.array as Float32Array

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        // Update positions
        posArray[i * 3] += velocities[i].x
        posArray[i * 3 + 1] += velocities[i].y
        posArray[i * 3 + 2] += velocities[i].z

        // Mouse repulsion
        if (!isMobile) {
          const dx = posArray[i * 3] - mouseWorld.x
          const dy = posArray[i * 3 + 1] - mouseWorld.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_DISTANCE && dist > 0) {
            const force = (MOUSE_DISTANCE - dist) / MOUSE_DISTANCE * 0.5
            posArray[i * 3] += (dx / dist) * force
            posArray[i * 3 + 1] += (dy / dist) * force
          }
        }

        // Boundary wrap
        if (posArray[i * 3] > 300) posArray[i * 3] = -300
        if (posArray[i * 3] < -300) posArray[i * 3] = 300
        if (posArray[i * 3 + 1] > 200) posArray[i * 3 + 1] = -200
        if (posArray[i * 3 + 1] < -200) posArray[i * 3 + 1] = 200
      }

      particleGeometry.attributes.position.needsUpdate = true

      // Update connections
      linesGroup.clear()
      const linePositions: number[] = []

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const dx = posArray[i * 3] - posArray[j * 3]
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1]
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2]
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (dist < CONNECTION_DISTANCE) {
            linePositions.push(
              posArray[i * 3], posArray[i * 3 + 1], posArray[i * 3 + 2],
              posArray[j * 3], posArray[j * 3 + 1], posArray[j * 3 + 2]
            )
          }
        }
      }

      if (linePositions.length > 0) {
        const lineGeo = new THREE.BufferGeometry()
        lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
        const lines = new THREE.LineSegments(lineGeo, lineMaterial)
        linesGroup.add(lines)
      }

      renderer.render(scene, camera)
    }

    animate()

    // Resize
    const onResize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', onResize)
      if (!isMobile) {
        container.removeEventListener('mousemove', onMouseMove)
      }
      renderer.dispose()
      particleGeometry.dispose()
      particleMaterial.dispose()
      lineMaterial.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  )
}
