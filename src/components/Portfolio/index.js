import { useMemo, useState } from 'react'
import Reveal from '../ui/Reveal'
import './index.scss'

const entries = [
  {
    name: 'Cloud Expense Tracker',
    summary: 'Serverless cost dashboards with automated budget alerts and reporting.',
    story:
      'Born from monthly budget surprises, this project stitches together event-driven functions, workflow automation, and lightweight BI dashboards to surface spending anomalies in near real time. It also generates weekly digests for finance stakeholders.',
    media: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=80',
    cta: { label: 'View Case Study', href: 'https://github.com/yourusername/cloud-expense-tracker' },
    tags: ['project', 'python', 'serverless'],
  },
  {
    name: 'Realtime Fleet Monitor',
    summary: 'Live geolocation pipeline using Node.js, websockets, and MQTT brokers.',
    story:
      'Designed to coordinate field engineers, the monitor ingests vehicle telemetry via MQTT brokers, enriches it with weather alerts, and streams live status dashboards built in React. Dispatchers can replay any journey to debug incidents.',
    media: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
    cta: { label: 'Watch Demo', href: 'https://fleet-monitor.example.com' },
    tags: ['project', 'node.js', 'javascript', 'iot'],
  },
  {
    name: 'AI Resume Ranker',
    summary: 'LangChain-powered evaluator that scores resumes against job descriptions.',
    story:
      'An internal hiring assistant that uses embeddings to match applicants to roles, highlight skill gaps, and suggest interview questions. Built with LangChain, Pinecone, and a FastAPI backend tuned for low-latency inference.',
    media: 'https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=900&q=80',
    cta: { label: 'Explore Repo', href: 'https://github.com/yourusername/ai-resume-ranker' },
    tags: ['project', 'python', 'ai', 'ml'],
  },
  {
    name: 'React Design System',
    summary: 'Composable component library with themed tokens and accessibility baked in.',
    story:
      'A multi-brand design system leveraging Storybook, CSS variables, and unit-tested primitives. It cut new feature build time by 30% and ensures WCAG conformance across marketing and product surfaces.',
    media: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80',
    cta: { label: 'Browse Storybook', href: 'https://design-system.example.com' },
    tags: ['project', 'react', 'javascript', 'design'],
  },
  {
    name: 'Dart Task Companion',
    summary: 'Cross-platform productivity app syncing Flutter clients with Firebase.',
    story:
      'Personal productivity side project focussed on offline-first sync and habit loops. Built with Flutter, Firebase, and Riverpod, it keeps tasks consistent across devices even on spotty connections.',
    media: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=900&q=80',
    cta: { label: 'See Live Build', href: 'https://task-companion.example.com' },
    tags: ['project', 'dart', 'flutter', 'firebase'],
  },
  {
    name: 'Observability Mesh',
    summary: 'Distributed tracing setup bridging OpenTelemetry collectors with Grafana dashboards.',
    story:
      'Mission was to unify metrics, logs, and traces. Implemented a Kubernetes add-on mesh that forwards telemetry to Grafana Loki and Tempo, with SLO alerts via PagerDuty and auto-remediation playbooks.',
    media: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    cta: { label: 'View Architecture', href: 'https://github.com/yourusername/observability-mesh' },
    tags: ['project', 'observability', 'devops'],
  },
  {
    name: 'Systems Design Nanodegree',
    summary: 'Capstone credential focused on distributed systems, caching, and scalability trade-offs.',
    story:
      'Completed real-world architecture labs covering load balancing, data partitioning, and chaos testing. Culminated in designing a video streaming platform with automated resilience drills.',
    media: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
    cta: { label: 'View Credential', href: 'https://graduation.example.com/systems-design' },
    tags: ['certification', 'architecture'],
  },
  {
    name: 'Google Cloud Digital Leader',
    summary: 'Demonstrated cloud strategy leadership across GCP products and services.',
    story:
      'Exam covered cloud transformation case studies, data analytics, and ML strategy. It broadened my multi-cloud perspective when advising stakeholders.',
    media: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=900&q=80',
    cta: { label: 'View Credential', href: 'https://www.credly.com/badges/google-cloud-digital-leader' },
    tags: ['certification', 'cloud', 'strategy'],
  },
  {
    name: 'Scrum Master PSM I',
    summary: 'Certified in agile facilitation, sprint planning, and continuous delivery coaching.',
    story:
      'Proved mastery of Scrum framework and facilitation techniques that keep product and engineering aligned. Helps drive predictable delivery and healthy agile rituals on complex programs.',
    media: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
    cta: { label: 'View Credential', href: 'https://www.scrum.org/certification-listing' },
    tags: ['certification', 'agile', 'leadership'],
  },
]

const tagLabel = {
  project: 'Projects',
  certification: 'Certifications',
  python: 'Python',
  serverless: 'Serverless',
  'node.js': 'Node.js',
  javascript: 'JavaScript',
  iot: 'IoT',
  ai: 'AI',
  ml: 'Machine Learning',
  react: 'React',
  design: 'Design Systems',
  dart: 'Dart',
  flutter: 'Flutter',
  firebase: 'Firebase',
  observability: 'Observability',
  devops: 'DevOps',
  architecture: 'Architecture',
  cloud: 'Cloud',
  strategy: 'Strategy',
  agile: 'Agile',
  leadership: 'Leadership',
}

const sortTags = tags => {
  const priority = ['all', 'project', 'certification']
  return tags.sort((a, b) => {
    const ap = priority.indexOf(a)
    const bp = priority.indexOf(b)

    if (ap === -1 && bp === -1) return a.localeCompare(b)
    if (ap === -1) return 1
    if (bp === -1) return -1

    return ap - bp
  })
}

const Portfolio = () => {
  const [activeTag, setActiveTag] = useState('all')

  const tags = useMemo(() => {
    const set = new Set(['all'])
    entries.forEach(entry => entry.tags.forEach(tag => set.add(tag)))
    return sortTags(Array.from(set))
  }, [])

  const filteredEntries = useMemo(() => {
    if (activeTag === 'all') return entries
    return entries.filter(entry => entry.tags.includes(activeTag))
  }, [activeTag])

  return (
    <div className='container portfolio-page'>
      <div className='text-zone'>
        <Reveal>
          <header className='portfolio-header'>
            <p>Portfolio</p>
            <h1>Projects and Certifications</h1>
          </header>
        </Reveal>

        <Reveal delay={0.06}>
          <div className='filter-row' role='toolbar' aria-label='Filter projects and certifications'>
            {tags.map(tag => (
              <button
                key={tag}
                type='button'
                className={activeTag === tag ? 'is-active' : ''}
                aria-pressed={activeTag === tag}
                onClick={() => setActiveTag(tag)}
              >
                {tag === 'all' ? 'All' : tagLabel[tag] ?? tag}
              </button>
            ))}
          </div>
        </Reveal>

        <div className='portfolio-grid'>
          {filteredEntries.map((entry, index) => (
            <Reveal key={entry.name} delay={Math.min(index * 0.04, 0.24)}>
              <article className='portfolio-card'>
                <div className='portfolio-card__media'>
                  <img src={entry.media} alt={`${entry.name} visual`} loading='lazy' />
                </div>
                <div className='portfolio-card__content'>
                  <h2>{entry.name}</h2>
                  <p className='portfolio-card__summary'>{entry.summary}</p>
                  <p>{entry.story}</p>
                  <div className='portfolio-card__tags'>
                    {entry.tags.map(tag => (
                      <span key={`${entry.name}-${tag}`}>{tagLabel[tag] ?? tag}</span>
                    ))}
                  </div>
                  {entry.cta?.href ? (
                    <a href={entry.cta.href} target='_blank' rel='noreferrer'>
                      {entry.cta.label}
                    </a>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Portfolio
