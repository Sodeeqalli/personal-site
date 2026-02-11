import { useMemo, useState } from 'react'
import {
  aboutContent,
  experienceCards,
  heroContent,
  linkItems,
  projectEntries,
  skills,
  stageNarratives,
  tagLabels,
  timelineBounds,
  timelineEvents,
} from '../../data/siteContent'
import './index.scss'

const sortTags = values => {
  const priority = ['all', 'project', 'certification']

  return values.sort((a, b) => {
    const ap = priority.indexOf(a)
    const bp = priority.indexOf(b)

    if (ap === -1 && bp === -1) return a.localeCompare(b)
    if (ap === -1) return 1
    if (bp === -1) return -1

    return ap - bp
  })
}

const Home = () => {
  const [activeTag, setActiveTag] = useState('all')
  const [currentYear, setCurrentYear] = useState(timelineBounds.minYear)

  const tags = useMemo(() => {
    const set = new Set(['all'])
    projectEntries.forEach(entry => entry.tags.forEach(tag => set.add(tag)))
    return sortTags(Array.from(set))
  }, [])

  const filteredProjects = useMemo(() => {
    if (activeTag === 'all') return projectEntries
    return projectEntries.filter(entry => entry.tags.includes(activeTag))
  }, [activeTag])

  const age = currentYear - timelineBounds.minYear
  const stage = useMemo(
    () => stageNarratives.find(item => age <= item.maxAge) ?? stageNarratives[stageNarratives.length - 1],
    [age]
  )

  const progress = ((currentYear - timelineBounds.minYear) / (timelineBounds.maxYear - timelineBounds.minYear)) * 100
  const currentEvent = useMemo(
    () => timelineEvents.find(event => event.year === currentYear),
    [currentYear]
  )

  return (
    <main className='site-home'>
      <section className='section hero' id='hero'>
        <p className='kicker'>{heroContent.script}</p>
        <h1>
          <span>{heroContent.name[0]}</span>
          <span>{heroContent.name[1]}</span>
        </h1>
        <p className='hero-role'>{heroContent.role}</p>
        <p className='hero-sub'>{heroContent.sub}</p>
        <div className='hero-actions'>
          <a className='button button--primary' href={`mailto:${heroContent.email}`}>
            Contact
          </a>
          <a className='button button--ghost' href={linkItems[3].href} target='_blank' rel='noreferrer'>
            LinkedIn
          </a>
        </div>
      </section>

      <section className='section about' id='about'>
        <div className='section-heading'>
          <p className='kicker'>About</p>
          <h2>Software and cloud engineering with a reliability mindset.</h2>
        </div>
        <div className='about-layout'>
          <div className='about-copy'>
            {aboutContent.paragraphs.map(text => (
              <p key={text}>{text}</p>
            ))}
            <ul className='facts'>
              {aboutContent.quickFacts.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className='about-portraits'>
            {aboutContent.portraits.map((portrait, index) => (
              <figure className={`portrait portrait--${index + 1}`} key={portrait.alt}>
                <img src={portrait.src} alt={portrait.alt} loading='lazy' />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className='section skills' id='skills'>
        <div className='section-heading'>
          <p className='kicker'>Skills</p>
          <h2>Languages, Frameworks &amp; Tools</h2>
        </div>
        <div className='skills-grid'>
          {skills.map(skill => (
            <article className='skill-card' key={skill.name}>
              <div className='skill-meta'>
                <span>{skill.name}</span>
                <span>{skill.level}%</span>
              </div>
              <div className='skill-track' role='progressbar' aria-valuemin='0' aria-valuemax='100' aria-valuenow={skill.level}>
                <span style={{ width: `${skill.level}%` }} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className='section projects' id='projects'>
        <div className='section-heading'>
          <p className='kicker'>Projects</p>
          <h2>Projects and Certifications</h2>
        </div>
        <div className='filters' role='toolbar' aria-label='Project filters'>
          {tags.map(tag => (
            <button
              type='button'
              key={tag}
              className={activeTag === tag ? 'is-active' : ''}
              aria-pressed={activeTag === tag}
              onClick={() => setActiveTag(tag)}
            >
              {tag === 'all' ? 'All' : tagLabels[tag] ?? tag}
            </button>
          ))}
        </div>

        <div className='project-grid'>
          {filteredProjects.map(entry => (
            <article className='project-card' key={entry.name}>
              <div className='project-media'>
                <img src={entry.media} alt={`${entry.name} visual`} loading='lazy' />
              </div>
              <div className='project-body'>
                <h3>{entry.name}</h3>
                <p className='project-summary'>{entry.summary}</p>
                <p>{entry.story}</p>
                <div className='project-tags'>
                  {entry.tags.map(tag => (
                    <span key={`${entry.name}-${tag}`}>{tagLabels[tag] ?? tag}</span>
                  ))}
                </div>
                {entry.cta?.href ? (
                  <a className='text-link' href={entry.cta.href} target='_blank' rel='noreferrer'>
                    {entry.cta.label}
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className='section experience' id='experience'>
        <div className='section-heading'>
          <p className='kicker'>Experience</p>
          <h2>Roles and Life Journey</h2>
        </div>

        <div className='experience-grid'>
          {experienceCards.map(item => (
            <article className='experience-card' key={item.company}>
              <div className='experience-cover' style={{ backgroundImage: `url(${item.image})` }} />
              <div className='experience-copy'>
                <p>{item.company}</p>
                <h3>{item.role}</h3>
                <span>{item.dates}</span>
              </div>
            </article>
          ))}
        </div>

        <div className='timeline-panel'>
          <div className='timeline-meta'>
            <h3>{stage.label}</h3>
            <p>{stage.note}</p>
            <span>Year: {currentYear}</span>
            <span>Age: {age}</span>
          </div>
          <div className='timeline-controls'>
            <div className='timeline-track' aria-hidden='true'>
              <span style={{ width: `${Math.max(0, Math.min(100, progress))}%` }} />
            </div>
            <div className='timeline-range'>
              <span>{timelineBounds.minYear}</span>
              <input
                type='range'
                min={timelineBounds.minYear}
                max={timelineBounds.maxYear}
                step={1}
                value={currentYear}
                onChange={event => setCurrentYear(Number(event.target.value))}
                aria-label='Select a year to explore the journey'
              />
              <span>{timelineBounds.maxYear}</span>
            </div>
          </div>
          {currentEvent ? (
            <article className='timeline-event'>
              <h4>
                {currentEvent.year} · {currentEvent.title}
              </h4>
              <p>{currentEvent.description}</p>
            </article>
          ) : null}
        </div>
      </section>

      <section className='section contact' id='contact'>
        <div className='section-heading'>
          <p className='kicker'>Contact</p>
          <h2>Let us build something useful.</h2>
        </div>
        <div className='contact-panel'>
          <p>
            Reach me directly at{' '}
            <a className='text-link' href={`mailto:${heroContent.email}`}>
              {heroContent.email}
            </a>
          </p>
          <ul>
            {linkItems.map(item => (
              <li key={item.label}>
                <a href={item.href} target='_blank' rel='noreferrer'>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default Home
