import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  aboutData,
  experienceCards,
  heroData,
  portfolioEntries,
  sectionOrder,
  siteMeta,
  socialLinks,
  stageNarratives,
  tagLabels,
  timelineBounds,
  timelineEvents,
  toolSkills,
} from '../data/portfolioData'
import ProjectModal from '../components/Portfolio/ProjectModal'
import SectionNav from '../components/Portfolio/SectionNav'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { getReducedItem, getReducedVariant, staggerParent, viewport } from '../utils/motion'

const LazyHeroScene = lazy(() => import('../components/Portfolio/HeroScene'))

const getStage = age => stageNarratives.find(item => age <= item.maxAge) ?? stageNarratives[stageNarratives.length - 1]

const isLowEndDevice = () => {
  if (typeof navigator === 'undefined') return false
  const cpuCores = navigator.hardwareConcurrency ?? 8
  const memory = navigator.deviceMemory ?? 8
  return cpuCores <= 4 || memory <= 4
}

const copyText = async text => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return true
  }

  const fallback = document.createElement('textarea')
  fallback.value = text
  fallback.style.position = 'fixed'
  fallback.style.left = '-9999px'
  document.body.appendChild(fallback)
  fallback.select()
  const success = document.execCommand('copy')
  document.body.removeChild(fallback)
  return success
}

const sortTags = tagSet => {
  const priority = ['all', 'project', 'certification']
  return Array.from(tagSet).sort((a, b) => {
    const first = priority.indexOf(a)
    const second = priority.indexOf(b)

    if (first === -1 && second === -1) return a.localeCompare(b)
    if (first === -1) return 1
    if (second === -1) return -1

    return first - second
  })
}

const toastVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: 12, transition: { duration: 0.16 } },
}

const PortfolioPage = () => {
  const sectionIds = useMemo(() => sectionOrder.map(section => section.id), [])
  const { activeSection, progress } = useScrollSpy(sectionIds)
  const [currentYear, setCurrentYear] = useState(timelineBounds.maxYear)
  const [activeTag, setActiveTag] = useState('all')
  const [canUse3D, setCanUse3D] = useState(false)
  const [is3DEnabled, setIs3DEnabled] = useState(false)
  const [isHeroSceneVisible, setIsHeroSceneVisible] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [toast, setToast] = useState('')
  const toastTimeoutRef = useRef(null)
  const heroVisualRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  const sectionVariant = getReducedVariant(shouldReduceMotion)
  const itemVariant = getReducedItem(shouldReduceMotion)

  useEffect(() => {
    const allow3D = process.env.NODE_ENV !== 'test' && !shouldReduceMotion && !isLowEndDevice()
    setCanUse3D(allow3D)
    setIs3DEnabled(allow3D)
  }, [shouldReduceMotion])

  useEffect(() => {
    if (!canUse3D || !is3DEnabled) return undefined

    const node = heroVisualRef.current
    if (!node) return undefined

    if (typeof window.IntersectionObserver !== 'function') {
      setIsHeroSceneVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setIsHeroSceneVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '220px 0px' }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [canUse3D, is3DEnabled])

  useEffect(
    () => () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current)
      }
    },
    []
  )

  const showToast = message => {
    setToast(message)
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    toastTimeoutRef.current = setTimeout(() => {
      setToast('')
      toastTimeoutRef.current = null
    }, 2400)
  }

  const handleCopyEmail = async () => {
    try {
      const copied = await copyText(siteMeta.email)
      showToast(copied ? 'Email copied to clipboard.' : 'Unable to copy email.')
    } catch (error) {
      showToast('Unable to copy email.')
    }
  }

  const age = currentYear - timelineBounds.minYear
  const stage = getStage(age)
  const growthProgress = (currentYear - timelineBounds.minYear) / (timelineBounds.maxYear - timelineBounds.minYear)
  const eventForYear = timelineEvents.find(event => event.year === currentYear)

  const tags = useMemo(() => {
    const unique = new Set(['all'])
    portfolioEntries.forEach(entry => entry.tags.forEach(tag => unique.add(tag)))
    return sortTags(unique)
  }, [])

  const filteredEntries = useMemo(() => {
    if (activeTag === 'all') return portfolioEntries
    return portfolioEntries.filter(entry => entry.tags.includes(activeTag))
  }, [activeTag])

  return (
    <div className='portfolio-shell'>
      <SectionNav activeSection={activeSection} progress={progress} />

      <main id='main-content' tabIndex='-1'>
        <section id='hero' className='section section--hero'>
          <div className='section__inner hero-layout'>
            <motion.div className='hero' variants={staggerParent} initial='hidden' animate='visible'>
              <motion.p className='hero__script' variants={itemVariant}>
                {heroData.scriptName}
              </motion.p>
              <motion.h1 variants={itemVariant}>{heroData.fullName}</motion.h1>
              <motion.p className='hero__role' variants={itemVariant}>
                {heroData.role}
              </motion.p>
              <motion.p className='hero__meta' variants={itemVariant}>
                {heroData.location} | {heroData.education}
              </motion.p>
              <motion.div className='hero__chips' variants={staggerParent}>
                {heroData.subRoles.map(item => (
                  <motion.span key={item} variants={itemVariant}>
                    {item}
                  </motion.span>
                ))}
              </motion.div>
              <motion.div className='hero__actions' variants={itemVariant}>
                <a className='button button--primary' href='#projects'>
                  View projects
                </a>
                <a className='button button--secondary' href={`mailto:${siteMeta.email}`}>
                  Contact me
                </a>
                {canUse3D ? (
                  <button
                    type='button'
                    className='button button--ghost'
                    onClick={() => setIs3DEnabled(current => !current)}
                    aria-pressed={is3DEnabled}
                  >
                    {is3DEnabled ? 'Disable 3D' : 'Enable 3D'}
                  </button>
                ) : (
                  <span className='hero__hint'>3D disabled automatically for reduced motion or low-end devices.</span>
                )}
              </motion.div>
            </motion.div>

            <div className='hero-visual' ref={heroVisualRef} aria-hidden='true'>
              {canUse3D && is3DEnabled && isHeroSceneVisible ? (
                <Suspense fallback={<div className='hero-visual__fallback' />}>
                  <LazyHeroScene />
                </Suspense>
              ) : (
                <div className='hero-visual__fallback' />
              )}
              <div className='hero-visual__noise' />
            </div>
          </div>
        </section>

        <motion.section id='about' className='section' initial='hidden' whileInView='visible' viewport={viewport} variants={sectionVariant}>
          <div className='section__inner split-grid'>
            <motion.div className='photo-stack' aria-label='Portraits' variants={staggerParent}>
              {aboutData.portraits.map((portrait, index) => (
                <motion.figure className={`photo-card photo-card--${index + 1}`} key={portrait.src} variants={itemVariant}>
                  <img src={portrait.src} alt={portrait.alt} loading='lazy' decoding='async' />
                </motion.figure>
              ))}
            </motion.div>
            <motion.div variants={staggerParent}>
              <motion.p className='section__kicker' variants={itemVariant}>
                About
              </motion.p>
              <motion.h2 variants={itemVariant}>Crafting resilient software and cloud systems.</motion.h2>
              <motion.div className='prose' variants={staggerParent}>
                {aboutData.paragraphs.map(text => (
                  <motion.p key={text} variants={itemVariant}>
                    {text}
                  </motion.p>
                ))}
              </motion.div>
              <motion.ul className='fact-list' variants={staggerParent}>
                {aboutData.quickFacts.map(item => (
                  <motion.li key={item} variants={itemVariant}>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </div>
        </motion.section>

        <motion.section id='skills' className='section' initial='hidden' whileInView='visible' viewport={viewport} variants={sectionVariant}>
          <div className='section__inner'>
            <motion.p className='section__kicker' variants={itemVariant}>
              Skills
            </motion.p>
            <motion.h2 variants={itemVariant}>Languages, Frameworks and Tools</motion.h2>
            <motion.div className='skills-grid' variants={staggerParent}>
              {toolSkills.map(skill => (
                <motion.article className='skill-card' key={skill.name} variants={itemVariant}>
                  <div className='skill-card__head'>
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className='skill-meter' role='progressbar' aria-valuemin='0' aria-valuemax='100' aria-valuenow={skill.level}>
                    <span style={{ width: `${skill.level}%` }} />
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section id='projects' className='section' initial='hidden' whileInView='visible' viewport={viewport} variants={sectionVariant}>
          <div className='section__inner'>
            <motion.p className='section__kicker' variants={itemVariant}>
              Projects + Certifications
            </motion.p>
            <motion.h2 variants={itemVariant}>Case-study style highlights</motion.h2>
            <motion.div className='tag-row' role='toolbar' aria-label='Filter portfolio entries' variants={itemVariant}>
              {tags.map(tag => (
                <button
                  type='button'
                  key={tag}
                  className={`tag ${activeTag === tag ? 'is-active' : ''}`}
                  onClick={() => setActiveTag(tag)}
                  aria-pressed={activeTag === tag}
                >
                  {tag === 'all' ? 'All' : tagLabels[tag] ?? tag}
                </button>
              ))}
            </motion.div>
            <motion.div className='card-grid' variants={staggerParent}>
              {filteredEntries.map(entry => (
                <motion.article className='project-card' key={entry.name} variants={itemVariant}>
                  <div className='project-card__media'>
                    <img src={entry.media} alt={`${entry.name} visual`} loading='lazy' decoding='async' />
                  </div>
                  <div className='project-card__body'>
                    <h3>{entry.name}</h3>
                    <p className='project-card__summary'>{entry.summary}</p>
                    <p>{entry.story}</p>
                    <div className='project-card__tags'>
                      {entry.tags.map(tag => (
                        <span key={tag}>{tagLabels[tag] ?? tag}</span>
                      ))}
                    </div>
                    <div className='project-card__actions'>
                      <button
                        type='button'
                        className='button button--secondary'
                        onClick={() => setSelectedEntry(entry)}
                        aria-label={`Quick view for ${entry.name}`}
                      >
                        Quick view
                      </button>
                      {entry.cta?.href ? (
                        <a href={entry.cta.href} target='_blank' rel='noreferrer' className='text-link'>
                          {entry.cta.label}
                        </a>
                      ) : null}
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section id='experience' className='section' initial='hidden' whileInView='visible' viewport={viewport} variants={sectionVariant}>
          <div className='section__inner'>
            <motion.p className='section__kicker' variants={itemVariant}>
              Experience
            </motion.p>
            <motion.h2 variants={itemVariant}>From internships to engineering and mentorship.</motion.h2>
            <motion.div className='experience-grid' variants={staggerParent}>
              {experienceCards.map(item => (
                <motion.article
                  key={item.company}
                  className='experience-card'
                  style={{ backgroundImage: `url(${item.logoImage})`, backgroundSize: item.backgroundSize }}
                  variants={itemVariant}
                >
                  <div className='experience-card__overlay'>
                    <p>{item.company}</p>
                    <h3>{item.role}</h3>
                    <span>{item.dates}</span>
                  </div>
                </motion.article>
              ))}
            </motion.div>

            <motion.div className='timeline-block' variants={itemVariant}>
              <div className='timeline-block__meta'>
                <h3>Life Journey</h3>
                <p>{stage.label}</p>
                <small>{stage.note}</small>
                <small>
                  Year: {currentYear} | Age: {age}
                </small>
              </div>
              <div className='timeline-block__body'>
                <div className='timeline-track' aria-hidden='true'>
                  <span style={{ width: `${growthProgress * 100}%` }} />
                </div>
                <input
                  className='timeline-slider'
                  type='range'
                  min={timelineBounds.minYear}
                  max={timelineBounds.maxYear}
                  value={currentYear}
                  onChange={event => setCurrentYear(Number(event.target.value))}
                  aria-label='Select year in life journey'
                />
                {eventForYear ? (
                  <article className='timeline-event'>
                    <h4>
                      {eventForYear.year}: {eventForYear.title}
                    </h4>
                    <p>{eventForYear.description}</p>
                  </article>
                ) : null}
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section id='contact' className='section section--contact' initial='hidden' whileInView='visible' viewport={viewport} variants={sectionVariant}>
          <motion.div className='section__inner contact-panel' variants={staggerParent}>
            <motion.p className='section__kicker' variants={itemVariant}>
              Contact
            </motion.p>
            <motion.h2 variants={itemVariant}>Let us build something useful.</motion.h2>
            <motion.p variants={itemVariant}>
              Reach me directly at{' '}
              <a className='text-link' href={`mailto:${siteMeta.email}`}>
                {siteMeta.email}
              </a>
            </motion.p>
            <motion.div className='contact-actions' variants={itemVariant}>
              <a className='button button--primary' href={`mailto:${siteMeta.email}`}>
                Start a conversation
              </a>
              <button type='button' className='button button--secondary' onClick={handleCopyEmail}>
                Copy email
              </button>
            </motion.div>
          </motion.div>
        </motion.section>

        <motion.section id='links' className='section' initial='hidden' whileInView='visible' viewport={viewport} variants={sectionVariant}>
          <div className='section__inner'>
            <motion.p className='section__kicker' variants={itemVariant}>
              Links
            </motion.p>
            <motion.h2 variants={itemVariant}>Socials and credentials</motion.h2>
            <motion.ul className='social-grid' variants={staggerParent}>
              {socialLinks.map(link => (
                <motion.li key={link.id} variants={itemVariant}>
                  <a href={link.href} target='_blank' rel='noreferrer'>
                    <span>{link.label}</span>
                    <span aria-hidden='true'>-&gt;</span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.section>
      </main>

      <AnimatePresence>{selectedEntry ? <ProjectModal entry={selectedEntry} tagLabels={tagLabels} onClose={() => setSelectedEntry(null)} /> : null}</AnimatePresence>

      <AnimatePresence>
        {toast ? (
          <motion.div className='toast' role='status' aria-live='polite' variants={toastVariants} initial='hidden' animate='visible' exit='exit'>
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default PortfolioPage
