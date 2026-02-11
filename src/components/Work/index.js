import { useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faSchool, faStar } from '@fortawesome/free-solid-svg-icons'
import Reveal from '../ui/Reveal'
import './index.scss'

const minYear = 2004
const maxYear = 2025

const timelineEvents = [
  {
    year: 2004,
    title: 'Hello World 🌍',
    description: 'Born in Lagos, Nigeria and instantly surrounded by curiosity and rhythm.',
    type: 'milestone',
  },
  {
    year: 2010,
    title: 'First Classroom Adventure',
    description: 'Started primary school, leading every group science project I could join.',
    type: 'school',
  },
  {
    year: 2013,
    title: 'Tinkering with Tech',
    description: 'Pulled apart a family computer to understand how the magic worked (and successfully reassembled it!).',
    type: 'milestone',
  },
  {
    year: 2016,
    title: 'STEM High School',
    description: 'Enrolled in a science-focused secondary school and dove deep into math, physics, and robotics.',
    type: 'school',
  },
  {
    year: 2019,
    title: 'Code Club Captain',
    description: 'Organised after-school coding meetups and guided classmates through HTML, CSS, and basic Python.',
    type: 'milestone',
  },
  {
    year: 2021,
    title: 'Computer Science Undergraduate',
    description: 'Began BSc studies, focusing on software engineering, algorithms, and cloud architecture.',
    type: 'school',
  },
  {
    year: 2022,
    title: 'Cloud Engineering Intern',
    description: 'Automated cloud infrastructure, writing IaC templates and ensuring deployments were reproducible.',
    type: 'work',
  },
  {
    year: 2023,
    title: 'Full-Stack Product Intern',
    description: 'Shipped React/Node features and implemented observability for more reliable user experiences.',
    type: 'work',
  },
  {
    year: 2024,
    title: 'Community Builder',
    description: 'Hosted workshops on cloud-native patterns and mentored new developers entering tech.',
    type: 'milestone',
  },
  {
    year: 2025,
    title: 'Software & Cloud Engineer',
    description: 'Designing resilient systems, advising teams on architecture, and constantly learning the next big thing.',
    type: 'work',
  },
]

const stageNarratives = [
  { maxAge: 2, label: 'Infant Explorer', note: 'Tiny footsteps and endless wonder.' },
  { maxAge: 6, label: 'Curious Kid', note: 'Asking why about everything under the sun.' },
  { maxAge: 12, label: 'Young Tinkerer', note: 'Building, breaking, and rebuilding gadgets.' },
  { maxAge: 18, label: 'STEM Trailblazer', note: 'Leading school teams and STEM initiatives.' },
  { maxAge: 22, label: 'Emerging Engineer', note: 'Leveling up through university labs and internships.' },
  { maxAge: 40, label: 'Systems Craftsman', note: 'Designing cloud-native journeys with confidence.' },
]

const icons = {
  school: faSchool,
  work: faBriefcase,
  milestone: faStar,
}

const Work = () => {
  const [currentYear, setCurrentYear] = useState(minYear)

  const age = currentYear - minYear
  const progressPercent = Math.max(0, Math.min(100, ((currentYear - minYear) / (maxYear - minYear)) * 100))

  const currentEvent = useMemo(
    () => timelineEvents.find(event => event.year === currentYear),
    [currentYear]
  )

  const stage = useMemo(
    () => stageNarratives.find(item => age <= item.maxAge) ?? stageNarratives[stageNarratives.length - 1],
    [age]
  )

  return (
    <div className='container work-page'>
      <div className='text-zone'>
        <Reveal>
          <header className='work-header'>
            <p>Experience</p>
            <h1>Life Journey</h1>
            <p className='work-sub'>
              Slide through the years to watch my story unfold. Every step unlocks a checkpoint from first classrooms
              and hackathons to shipping production-ready cloud solutions in 2025.
            </p>
          </header>
        </Reveal>

        <Reveal delay={0.06}>
          <section className='journey-panel'>
            <div className='journey-meta'>
              <h2>{stage.label}</h2>
              <p>{stage.note}</p>
              <span>Year: {currentYear}</span>
              <span>Age: {age}</span>
            </div>

            <div className='journey-controls'>
              <div className='timeline-track' aria-hidden='true'>
                <span style={{ width: `${progressPercent}%` }} />
              </div>
              <div className='timeline-range'>
                <span>{minYear}</span>
                <input
                  type='range'
                  min={minYear}
                  max={maxYear}
                  step={1}
                  value={currentYear}
                  onChange={event => setCurrentYear(Number(event.target.value))}
                  aria-label='Select a year to explore the journey'
                />
                <span>{maxYear}</span>
              </div>
            </div>

            {currentEvent ? (
              <article className='event-card'>
                <span className='event-pill'>
                  <FontAwesomeIcon icon={icons[currentEvent.type]} /> {currentEvent.type}
                </span>
                <h3>
                  {currentEvent.year} · {currentEvent.title}
                </h3>
                <p>{currentEvent.description}</p>
              </article>
            ) : null}
          </section>
        </Reveal>
      </div>
    </div>
  )
}

export default Work
