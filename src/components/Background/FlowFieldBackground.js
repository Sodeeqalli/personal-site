import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const MAX_DPR = 1.6
const MOBILE_BREAKPOINT = 768
const MOUSE_RADIUS = 140
const WAKE_DURATION = 250

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

const createParticles = (count, width, height) => {
  return Array.from({ length: count }, () => {
    const x = Math.random() * width
    const y = Math.random() * height

    return {
      x,
      y,
      px: x,
      py: y,
      speed: 0.45 + Math.random() * 0.85,
      alpha: 0.03 + Math.random() * 0.09,
    }
  })
}

const getParticleTarget = (width, lowEnd) => {
  const target = width < MOBILE_BREAKPOINT ? 500 : 1200
  if (!lowEnd) return target
  return Math.floor(target * 0.62)
}

const flowAngle = (x, y, time) => {
  const scale = 0.00125
  const tScale = 0.00018

  const nx = x * scale
  const ny = y * scale
  const t = time * tScale

  const a = Math.sin(nx * 1.35 + t)
  const b = Math.cos(ny * 1.12 - t * 0.82)
  const c = Math.sin((nx + ny) * 0.72 + t * 0.46)

  return (a + b + c) * Math.PI
}

const FlowFieldBackground = ({ enabled = true }) => {
  const reducedMotion = useReducedMotion()
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!enabled || reducedMotion) return undefined

    const canvas = canvasRef.current
    if (!canvas) return undefined

    const context = canvas.getContext('2d', { alpha: true })
    if (!context) return undefined

    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    const lowEnd = (navigator.deviceMemory ?? 8) <= 4 || (navigator.hardwareConcurrency ?? 8) <= 4
    const allowMouseForces = !isCoarsePointer && !lowEnd

    const mouse = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.5,
      active: false,
      wakeUntil: 0,
    }

    let width = 0
    let height = 0
    let dpr = 1
    let particles = []
    let frameId = 0
    let lastTime = performance.now()
    let speedMultiplier = 0.9
    let fieldOffsetY = 0
    let repulsionStrength = window.innerWidth > 1200 ? 1.05 : 0.72

    const syncScroll = () => {
      const root = document.documentElement
      const max = Math.max(1, root.scrollHeight - root.clientHeight)
      const progress = clamp(root.scrollTop / max, 0, 1)

      speedMultiplier = 0.9 + 0.25 * progress
      fieldOffsetY = progress * 120
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.lineCap = 'round'

      repulsionStrength = width > 1200 ? 1.05 : 0.72
      particles = createParticles(getParticleTarget(width, lowEnd), width, height)
    }

    const respawn = particle => {
      particle.x = Math.random() * width
      particle.y = Math.random() * height
      particle.px = particle.x
      particle.py = particle.y
    }

    const tick = now => {
      frameId = 0

      if (document.hidden) return

      const delta = Math.min(32, now - lastTime)
      lastTime = now
      const dt = delta / 16.667

      context.fillStyle = 'rgba(5, 5, 5, 0.07)'
      context.fillRect(0, 0, width, height)
      context.lineWidth = 0.9

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i]
        p.px = p.x
        p.py = p.y

        const fieldY = p.y + fieldOffsetY
        const angle = flowAngle(p.x, fieldY, now)

        let localSpeed = p.speed * speedMultiplier * dt

        if (allowMouseForces && mouse.active) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const distance = Math.hypot(dx, dy)

          if (distance > 0.0001 && distance < MOUSE_RADIUS) {
            const falloff = 1 - distance / MOUSE_RADIUS
            const force = falloff * falloff * repulsionStrength
            const ux = dx / distance
            const uy = dy / distance

            p.x += ux * force
            p.y += uy * force

            if (now < mouse.wakeUntil) {
              localSpeed *= 1 + 0.1 * falloff
            }
          }
        }

        p.x += Math.cos(angle) * localSpeed
        p.y += Math.sin(angle) * localSpeed

        if (p.x < -6 || p.x > width + 6 || p.y < -6 || p.y > height + 6) {
          respawn(p)
          continue
        }

        context.strokeStyle = `rgba(255, 255, 255, ${p.alpha.toFixed(3)})`
        context.beginPath()
        context.moveTo(p.px, p.py)
        context.lineTo(p.x, p.y)
        context.stroke()
      }

      frameId = requestAnimationFrame(tick)
    }

    const onMouseMove = event => {
      mouse.active = true
      mouse.x = event.clientX
      mouse.y = event.clientY
      mouse.wakeUntil = performance.now() + WAKE_DURATION
    }

    const onMouseLeave = () => {
      mouse.active = false
    }

    const onVisibilityChange = () => {
      if (!document.hidden && !frameId) {
        lastTime = performance.now()
        frameId = requestAnimationFrame(tick)
      }
    }

    resize()
    syncScroll()

    frameId = requestAnimationFrame(tick)

    window.addEventListener('resize', resize)
    window.addEventListener('scroll', syncScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)

    if (allowMouseForces) {
      window.addEventListener('mousemove', onMouseMove, { passive: true })
      window.addEventListener('mouseleave', onMouseLeave)
    }

    return () => {
      if (frameId) cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', syncScroll)
      document.removeEventListener('visibilitychange', onVisibilityChange)

      if (allowMouseForces) {
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseleave', onMouseLeave)
      }
    }
  }, [enabled, reducedMotion])

  return (
    <div className={`flowfield-bg ${reducedMotion || !enabled ? 'is-static' : ''}`} aria-hidden='true'>
      <div className='flowfield-bg__base' />
      {!reducedMotion && enabled ? <canvas ref={canvasRef} /> : null}
    </div>
  )
}

export default FlowFieldBackground
