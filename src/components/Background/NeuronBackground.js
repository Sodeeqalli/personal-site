import { useEffect, useRef } from 'react'

const MAX_DPR = 1.5

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

const createNodes = (count, width, height) => {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.26,
    vy: (Math.random() - 0.5) * 0.26,
    radius: Math.random() * 1.8 + 0.8,
  }))
}

const getConfig = () => {
  const width = window.innerWidth
  const memory = navigator.deviceMemory ?? 8
  const cores = navigator.hardwareConcurrency ?? 8

  if (width < 600 || memory <= 4 || cores <= 4) {
    return { count: 30, threshold: 120, speed: 0.5 }
  }

  if (width < 1024) {
    return { count: 48, threshold: 132, speed: 0.7 }
  }

  return { count: 66, threshold: 140, speed: 1 }
}

const NeuronBackground = ({ enabled = true }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!enabled) return undefined

    const canvas = canvasRef.current
    if (!canvas) return undefined

    const context = canvas.getContext('2d', { alpha: true })
    if (!context) return undefined

    const pointer = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      active: false,
    }

    let width = 0
    let height = 0
    let dpr = 1
    let nodes = []
    let config = getConfig()
    let rafId = 0
    let lastTime = performance.now()
    let scrollFactor = 0

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      config = getConfig()
      nodes = createNodes(config.count, width, height)
    }

    const onPointerMove = event => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      pointer.active = true
    }

    const onPointerLeave = () => {
      pointer.active = false
    }

    const onScroll = () => {
      scrollFactor = clamp(window.scrollY * 0.00018, -0.15, 0.9)
    }

    const onVisibility = () => {
      if (!document.hidden && !rafId) {
        lastTime = performance.now()
        rafId = requestAnimationFrame(animate)
      }
    }

    const animate = now => {
      rafId = 0

      if (document.hidden) return

      const delta = Math.min(32, now - lastTime)
      lastTime = now
      const dt = delta / 16.67

      context.clearRect(0, 0, width, height)

      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i]

        if (pointer.active) {
          const dx = pointer.x - node.x
          const dy = pointer.y - node.y
          const distance = Math.hypot(dx, dy)

          if (distance < 180 && distance > 0.001) {
            const force = (180 - distance) / 180
            const pull = 0.008 * force * dt
            node.vx -= (dx / distance) * pull
            node.vy -= (dy / distance) * pull
          }
        }

        node.vx += (Math.random() - 0.5) * 0.003 * dt
        node.vy += (Math.random() - 0.5) * 0.003 * dt

        node.vx = clamp(node.vx, -0.55, 0.55)
        node.vy = clamp(node.vy, -0.55, 0.55)

        node.x += node.vx * config.speed * dt
        node.y += (node.vy + scrollFactor) * config.speed * dt

        node.vx *= 0.985
        node.vy *= 0.985

        if (node.x < -20) node.x = width + 20
        if (node.x > width + 20) node.x = -20
        if (node.y < -20) node.y = height + 20
        if (node.y > height + 20) node.y = -20
      }

      context.lineWidth = 0.8

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i]

        context.beginPath()
        context.fillStyle = 'rgba(36, 84, 62, 0.18)'
        context.arc(a.x, a.y, a.radius, 0, Math.PI * 2)
        context.fill()

        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)

          if (dist < config.threshold) {
            const alpha = (1 - dist / config.threshold) * 0.16
            context.strokeStyle = `rgba(42, 98, 74, ${alpha.toFixed(3)})`
            context.beginPath()
            context.moveTo(a.x, a.y)
            context.lineTo(b.x, b.y)
            context.stroke()
          }
        }
      }

      rafId = requestAnimationFrame(animate)
    }

    resize()
    onScroll()

    rafId = requestAnimationFrame(animate)

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onPointerMove, { passive: true })
    window.addEventListener('mouseleave', onPointerLeave)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onPointerMove)
      window.removeEventListener('mouseleave', onPointerLeave)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [enabled])

  return (
    <div className='neuron-bg' aria-hidden='true'>
      <canvas ref={canvasRef} />
    </div>
  )
}

export default NeuronBackground
