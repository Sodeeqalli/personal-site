import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord, faInstagram, faLinkedinIn, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faCertificate, faEnvelope, faGlobe, faSuitcase } from '@fortawesome/free-solid-svg-icons'
import { heroContent, linkItems } from '../../data/siteContent'
import './index.scss'

const ease = [0.22, 1, 0.36, 1]

const heroVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 1.5, ease, staggerChildren: 0.4, delayChildren: 0.7 },
  },
}

const copyVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 2.4, ease } },
}

const nameLineVariants = {
  hidden: { opacity: 0, y: '110%' },
  show: { opacity: 1, y: '0%', transition: { duration: 2.9, ease } },
}

const railVariants = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: { duration: 2.1, ease, delay: 1.8, staggerChildren: 0.36 } },
}

const iconVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.8, ease } },
}

const iconByLabel = {
  Portfolio: faSuitcase,
  X: faXTwitter,
  Instagram: faInstagram,
  Discord: faDiscord,
  LinkedIn: faLinkedinIn,
  Credly: faCertificate,
}

const Home = () => {
  const reducedMotion = useReducedMotion()
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    if (reducedMotion) return undefined

    let rafId = 0

    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        const root = document.documentElement
        const max = Math.max(1, root.scrollHeight - root.clientHeight)
        setScrollProgress(Math.max(0, Math.min(1, root.scrollTop / max)))
        rafId = 0
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [reducedMotion])

  const heroParallax = useMemo(() => {
    if (reducedMotion) return undefined
    return { transform: `translate3d(0, ${(-12 * scrollProgress).toFixed(2)}px, 0)` }
  }, [reducedMotion, scrollProgress])

  const entryMotion = reducedMotion
    ? {
        initial: false,
        animate: 'show',
      }
    : {
        initial: 'hidden',
        animate: 'show',
      }

  return (
    <main className='site-home'>
      <motion.section className='section hero landing-only hero-shell' id='hero' variants={heroVariants} {...entryMotion}>
        <div className='hero-copy'>
          <motion.p className='kicker' variants={copyVariants}>
            {heroContent.script}
          </motion.p>
          <h1 style={heroParallax}>
            {heroContent.name.map(line => (
              <span className='hero-line-mask' key={line}>
                <motion.span className='hero-line' variants={nameLineVariants}>
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p className='hero-role' variants={copyVariants}>
            {heroContent.role}
          </motion.p>
          <motion.p className='hero-sub' variants={copyVariants}>
            {heroContent.sub}
          </motion.p>
        </div>

        <motion.aside className='contact-rail' aria-label='Contact links' variants={railVariants}>
          <motion.a
            className='icon-link icon-link--primary'
            href={`mailto:${heroContent.email}`}
            aria-label='Contact by email'
            title='Contact by email'
            variants={iconVariants}
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </motion.a>
          {linkItems.map(item => (
            <motion.a
              className='icon-link icon-link--secondary'
              key={item.label}
              href={item.href}
              target='_blank'
              rel='noreferrer'
              aria-label={item.label}
              title={item.label}
              variants={iconVariants}
            >
              <FontAwesomeIcon icon={iconByLabel[item.label] ?? faGlobe} />
            </motion.a>
          ))}
        </motion.aside>
      </motion.section>
    </main>
  )
}

export default Home
