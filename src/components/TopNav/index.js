import './index.scss'
import { NavLink } from 'react-router-dom'

const links = [
  { label: 'HOME', to: '/' },
  { label: 'ABOUT', to: '/about' },
  { label: 'PORTFOLIO', to: '/portfolio' },
  { label: 'EXPERIENCE', to: '/work' },
]

const TopNav = ({ backgroundEnabled, onToggleBackground, motionDisabled }) => {
  return (
    <header className='top-nav'>
      <div className='top-nav__inner'>
        <NavLink to='/' className='top-nav__brand'>
          SA
        </NavLink>
        <nav className='top-nav__links' aria-label='Primary'>
          {links.map(link => (
            <NavLink key={link.to} to={link.to}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <button
          type='button'
          className='top-nav__toggle'
          onClick={onToggleBackground}
          aria-pressed={backgroundEnabled}
          aria-label='Toggle background animation'
          disabled={motionDisabled}
          title={motionDisabled ? 'Disabled by reduced-motion preference' : 'Toggle background animation'}
        >
          {backgroundEnabled && !motionDisabled ? 'BG ON' : 'BG OFF'}
        </button>
      </div>
    </header>
  )
}

export default TopNav
