import { useEffect, useRef } from 'react'

const CursorFollower = ({ enabled = true }) => {
  const followerRef = useRef(null)

  useEffect(() => {
    if (!enabled) return undefined
    if (window.matchMedia('(pointer: coarse)').matches) return undefined

    const follower = followerRef.current
    if (!follower) return undefined

    let rafId = 0
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let x = targetX
    let y = targetY
    let visible = false

    const tick = () => {
      x += (targetX - x) * 0.16
      y += (targetY - y) * 0.16
      follower.style.transform = `translate3d(${x}px, ${y}px, 0)`
      follower.style.opacity = visible ? '1' : '0'
      rafId = requestAnimationFrame(tick)
    }

    const onMove = event => {
      targetX = event.clientX
      targetY = event.clientY
      visible = true
    }

    const onLeave = () => {
      visible = false
    }

    rafId = requestAnimationFrame(tick)
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseout', onLeave)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
    }
  }, [enabled])

  if (!enabled) return null

  return <span className='cursor-follower' ref={followerRef} aria-hidden='true' />
}

export default CursorFollower
