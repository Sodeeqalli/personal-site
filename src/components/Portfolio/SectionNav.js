import { sectionOrder } from '../../data/portfolioData'

const SectionNav = ({ activeSection, progress }) => {
  return (
    <>
      <div className='scroll-progress' aria-hidden='true'>
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>
      <a className='skip-link' href='#main-content'>
        Skip to main content
      </a>
      <header className='site-nav'>
        <div className='site-nav__inner'>
          <a href='#hero' className='site-nav__brand'>
            SA
          </a>
          <nav aria-label='Section navigation'>
            <ul className='site-nav__list'>
              {sectionOrder.map(section => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={activeSection === section.id ? 'is-active' : ''}
                    aria-current={activeSection === section.id ? 'location' : undefined}
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  )
}

export default SectionNav
