import { useEffect, useState } from 'react'

const sections = [
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

const SectionIndicator = () => {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver !== 'function') return undefined

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target?.id) {
          setActive(visible[0].target.id)
        }
      },
      {
        rootMargin: '-35% 0px -50% 0px',
        threshold: [0.15, 0.3, 0.5, 0.8],
      }
    )

    sections.forEach(section => {
      const node = document.getElementById(section.id)
      if (node) observer.observe(node)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <nav className='section-indicator' aria-label='Section indicator'>
      {sections.map(section => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={active === section.id ? 'is-active' : ''}
          aria-label={section.label}
          aria-current={active === section.id ? 'true' : undefined}
        >
          <span />
        </a>
      ))}
    </nav>
  )
}

export default SectionIndicator
