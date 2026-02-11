import { useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCuttlefish,
  faGithub,
  faGitAlt,
  faJava,
  faJs,
  faNodeJs,
  faPython,
  faReact,
} from '@fortawesome/free-brands-svg-icons'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import Reveal from '../ui/Reveal'
import './index.scss'

const tools = [
  { name: 'Python', icon: faPython, level: 80 },
  { name: 'GitHub', icon: faGithub, level: 80 },
  { name: 'Git', icon: faGitAlt, level: 80 },
  { name: 'JavaScript', icon: faJs, level: 70 },
  { name: 'Node.js', icon: faNodeJs, level: 70 },
  { name: 'React', icon: faReact, level: 70 },
  { name: 'Dart', icon: faCode, level: 70 },
  { name: 'Java', icon: faJava, level: 40 },
  { name: 'C++', icon: faCuttlefish, level: 40 },
]

const About = () => {
  const sortedTools = useMemo(() => tools.slice().sort((a, b) => b.level - a.level), [])

  return (
    <div className='container about-page'>
      <div className='text-zone'>
        <Reveal>
          <header className='about-header'>
            <p>About me</p>
            <h1>Software and cloud engineering with a reliability mindset.</h1>
          </header>
        </Reveal>

        <Reveal delay={0.05}>
          <div className='about-copy'>
            <p>
              I am a dedicated and results-driven Software and Cloud Engineer with a strong foundation in computer
              science and a passion for developing innovative solutions. With expertise in Python, JavaScript, and
              modern cloud tooling, I design, implement, and maintain scalable applications and cloud infrastructure.
            </p>
            <p>
              My experience spans full-stack development, cloud architecture, and DevOps practices. I thrive in
              collaborative teams and enjoy moving projects from concept to deployment with a focus on reliability and
              performance.
            </p>
            <p>
              I am committed to continuous learning and staying current with modern tooling and patterns. My goal is to
              build impactful software that aligns with business needs and delivers great user experiences.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <section className='skills-panel'>
            <h2>Languages, Frameworks &amp; Tools</h2>
            <div className='tool-skills' role='list'>
              {sortedTools.map(tool => (
                <article className='skill-row' key={tool.name} role='listitem' aria-label={`${tool.name} proficiency ${tool.level} percent`}>
                  <div className='skill-row__head'>
                    <span className='skill-icon'>
                      <FontAwesomeIcon icon={tool.icon} />
                    </span>
                    <span className='skill-name'>{tool.name}</span>
                    <span className='skill-percent'>{tool.level}%</span>
                  </div>
                  <div className='skill-bar' role='progressbar' aria-valuemin='0' aria-valuemax='100' aria-valuenow={tool.level}>
                    <span className='skill-fill' style={{ width: `${tool.level}%` }} />
                  </div>
                </article>
              ))}
            </div>
          </section>
        </Reveal>
      </div>
    </div>
  )
}

export default About
