import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const modalVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: 16,
    scale: 0.98,
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
  },
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.16 } },
}

const getFocusableNodes = root => {
  if (!root) return []
  return Array.from(
    root.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
  )
}

const ProjectModal = ({ entry, tagLabels, onClose }) => {
  const panelRef = useRef(null)

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return undefined

    const previousActive = document.activeElement
    const focusable = getFocusableNodes(panel)
    focusable[0]?.focus()

    const onKeyDown = event => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusables = getFocusableNodes(panel)
      if (!focusables.length) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const isShift = event.shiftKey

      if (isShift && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!isShift && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      if (previousActive && typeof previousActive.focus === 'function') {
        previousActive.focus()
      }
    }
  }, [onClose])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return (
    <motion.div
      className='modal-backdrop'
      variants={overlayVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      onClick={onClose}
      role='presentation'
    >
      <motion.div
        className='project-modal'
        variants={modalVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
        ref={panelRef}
        onClick={event => event.stopPropagation()}
        role='dialog'
        aria-modal='true'
        aria-labelledby='project-modal-title'
      >
        <button type='button' className='project-modal__close' onClick={onClose}>
          Close
        </button>

        <div className='project-modal__media'>
          <img src={entry.media} alt={`${entry.name} visual`} loading='lazy' decoding='async' />
        </div>

        <div className='project-modal__content'>
          <h3 id='project-modal-title'>{entry.name}</h3>
          <p className='project-card__summary'>{entry.summary}</p>
          <p>{entry.story}</p>
          <div className='project-card__tags'>
            {entry.tags.map(tag => (
              <span key={tag}>{tagLabels[tag] ?? tag}</span>
            ))}
          </div>
          {entry.cta?.href ? (
            <a href={entry.cta.href} target='_blank' rel='noreferrer' className='button button--primary'>
              {entry.cta.label}
            </a>
          ) : null}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ProjectModal
