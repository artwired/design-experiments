import { Link } from 'react-router-dom'

const actions = [
  { to: '/a', label: 'View Design A' },
  { to: '/b', label: 'View Design B', tone: 'secondary' },
]

function Header() {
  return (
    <header className="landing-header">
      <p className="landing-header__eyebrow">A/B Comparison Study</p>

      <div className="landing-header__copy">
        <h1 id="landing-title" className="landing-header__title">
          Content Layout Systems
        </h1>
        <p className="landing-header__description">
          A comparison of two layout approaches for presenting a collection of
          visual content.
        </p>
        <p className="landing-header__description">
          This study explores how structure and hierarchy impact scanability and
          visual clarity.
        </p>
      </div>

      <p className="landing-header__note">
        Same artwork set. Two layout systems. One noticeably clearer browsing
        experience.
      </p>

      <div className="landing-header__actions">
        {actions.map(({ to, label, tone }) => (
          <Link
            key={label}
            className={[
              'landing-header__button',
              tone === 'secondary' ? 'landing-header__button--secondary' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            to={to}
          >
            {label}
          </Link>
        ))}
      </div>
    </header>
  )
}

export default Header
