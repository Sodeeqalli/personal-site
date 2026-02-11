import { useEffect, useMemo, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiscord, faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import Reveal from '../ui/Reveal'
import './index.scss'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

const services = [
  'Software Engineering',
  'Solutions Architecture',
  'Cloud Engineering',
  'Machine Learning & Big Data',
]

const socialLinks = [
  { label: 'X', href: 'https://x.com/allisodeeq_', icon: faXTwitter },
  { label: 'Instagram', href: 'https://www.instagram.com/sodeeq.alli/', icon: faInstagram },
  { label: 'Discord', href: 'https://discordapp.com/users/sodeeqalli', icon: faDiscord },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sodeeq-alli-94071b267/', icon: faLinkedin },
  { label: 'Credly', href: 'https://www.credly.com/users/sodeeq-alli', icon: null },
]

const techBadges = [
  'https://cdn.simpleicons.org/react/61dafb',
  'https://cdn.simpleicons.org/nodedotjs/5fa04e',
  'https://cdn.simpleicons.org/python/3776AB',
  'https://cdn.simpleicons.org/figma/F24E1E',
  'https://cdn.simpleicons.org/openai/412991',
  'https://cdn.simpleicons.org/storybook/FF4785',
  'https://cdn.simpleicons.org/git/F05033',
  'https://cdn.simpleicons.org/github/000000',
  'https://cdn.simpleicons.org/dart/0175C2',
  'https://cdn.simpleicons.org/java/EA2D2E',
  'https://cdn.simpleicons.org/cplusplus/00599C',
  'https://cdn.simpleicons.org/notion/000000',
  'https://cdn.simpleicons.org/databricks/FF3621',
  'https://cdn.simpleicons.org/apachespark/E25A1C',
  'https://cdn.simpleicons.org/jira/0052CC',
  'https://cdn.simpleicons.org/microsoftteams/4643CE',
  'https://cdn.simpleicons.org/slack/4A154B',
  'https://cdn.simpleicons.org/googlemeet/00897B',
  'https://cdn.simpleicons.org/miro/050038',
  'https://cdn.simpleicons.org/visualstudiocode/007ACC',
  'https://cdn.simpleicons.org/tensorflow/FF6F00',
  'https://cdn.simpleicons.org/mysql/4479A1',
  'https://cdn.simpleicons.org/amazonaws/FF9900',
]

const Home = () => {
  const prefersReducedMotion = useReducedMotion()
  const [scrollY, setScrollY] = useState(0)
  const [pointer, setPointer] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let rafId = 0

    const onScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY)
        rafId = 0
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return undefined

    const onMove = event => {
      const nx = (event.clientX / window.innerWidth) * 2 - 1
      const ny = (event.clientY / window.innerHeight) * 2 - 1
      setPointer({ x: clamp(nx, -1, 1), y: clamp(ny, -1, 1) })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [prefersReducedMotion])

  const heroParallaxStyle = useMemo(() => {
    if (prefersReducedMotion) return undefined

    const yShift = clamp(scrollY * -0.045, -40, 4)
    const xShift = pointer.x * 9
    const tilt = pointer.x * 0.8

    return {
      transform: `translate3d(${xShift.toFixed(2)}px, ${yShift.toFixed(2)}px, 0) rotate(${tilt.toFixed(2)}deg)`,
    }
  }, [pointer.x, prefersReducedMotion, scrollY])

  return (
    <main className='home-page'>
      <section className='home-hero'>
        <Reveal>
          <div className='home-hero__inner'>
            <div className='home-hero__copy' style={heroParallaxStyle}>
              <p className='hero-script'>Alli</p>
              <h1>
                <span>Sodeeq</span>
                <span>Ayobami</span>
              </h1>
              <p className='hero-role'>Software Engineer</p>
              <p className='hero-sub'>Located Calgary, AB · MEng @ University of Calgary</p>
              <div className='hero-cta'>
                <a href='mailto:sodeeqalli@gmail.com'>Contact me</a>
                <a href='https://www.linkedin.com/in/sodeeq-alli-94071b267/' target='_blank' rel='noreferrer'>LinkedIn</a>
              </div>
              <div className='social-links'>
                {socialLinks.map(link => (
                  <a key={link.label} href={link.href} target='_blank' rel='noreferrer' aria-label={link.label}>
                    {link.icon ? <FontAwesomeIcon icon={link.icon} /> : <span>Cr</span>}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className='home-section'>
        <Reveal>
          <div className='skills-panel'>
            <h2>Skills</h2>
            <div className='services-list'>
              {services.map(service => (
                <p key={service}>{service}</p>
              ))}
            </div>
            <div className='badge-cloud' aria-hidden='true'>
              {techBadges.map((logo, index) => (
                <span key={`${logo}-${index}`} style={{ backgroundImage: `url(${logo})` }} />
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  )
}

export default Home
