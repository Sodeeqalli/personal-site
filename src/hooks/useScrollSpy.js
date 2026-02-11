import { useEffect, useMemo, useState } from 'react'

const getDocumentProgress = () => {
  if (typeof document === 'undefined') return 0
  const root = document.documentElement
  const max = root.scrollHeight - root.clientHeight
  if (max <= 0) return 0
  return Math.min(1, Math.max(0, root.scrollTop / max))
}

export const useScrollSpy = sectionIds => {
  const [activeSection, setActiveSection] = useState(sectionIds?.[0] ?? 'hero')
  const [progress, setProgress] = useState(0)

  const ids = useMemo(() => sectionIds.filter(Boolean), [sectionIds])

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const supportsIntersectionObserver = typeof window.IntersectionObserver === 'function'
    const observer = supportsIntersectionObserver
      ? new IntersectionObserver(
          entries => {
            const visible = entries
              .filter(entry => entry.isIntersecting)
              .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

            if (visible[0]?.target?.id) {
              setActiveSection(visible[0].target.id)
            }
          },
          {
            rootMargin: '-20% 0px -55% 0px',
            threshold: [0.1, 0.2, 0.4, 0.6, 0.8],
          }
        )
      : null

    if (supportsIntersectionObserver) {
      ids.forEach(id => {
        const node = document.getElementById(id)
        if (node) observer.observe(node)
      })
    }

    const handleScroll = () => setProgress(getDocumentProgress())
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      if (observer) observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [ids])

  return { activeSection, progress }
}
