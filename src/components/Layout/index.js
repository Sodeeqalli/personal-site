import './index.scss'
import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { Outlet } from 'react-router-dom'
import CursorFollower from '../CursorFollower'

const NeuronBackground = lazy(() => import('../Background/NeuronBackground'))

const Layout = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [allowBackgroundMount, setAllowBackgroundMount] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setPrefersReducedMotion(query.matches)
    update()

    if (typeof query.addEventListener === 'function') {
      query.addEventListener('change', update)
      return () => query.removeEventListener('change', update)
    }

    query.addListener(update)
    return () => query.removeListener(update)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const handle = window.setTimeout(() => setAllowBackgroundMount(true), 180)
    return () => window.clearTimeout(handle)
  }, [])

  const backgroundActive = useMemo(() => !prefersReducedMotion, [prefersReducedMotion])

  return (
    <div className='App'>
      {allowBackgroundMount ? (
        <Suspense fallback={null}>
          <NeuronBackground enabled={backgroundActive} />
        </Suspense>
      ) : null}
      <CursorFollower enabled={!prefersReducedMotion} />
      <div className='page'>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
