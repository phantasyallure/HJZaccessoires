import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import './SiteHeader.css'

function FlagFR() {
  return (
    <svg viewBox="0 0 3 2" className="flag-icon" aria-hidden="true">
      <rect width="1" height="2" x="0" fill="#0055A4" />
      <rect width="1" height="2" x="1" fill="#fff" />
      <rect width="1" height="2" x="2" fill="#EF4135" />
    </svg>
  )
}

function FlagDZ() {
  return (
    <svg viewBox="0 0 30 20" className="flag-icon" aria-hidden="true">
      <rect width="15" height="20" x="0" fill="#006233" />
      <rect width="15" height="20" x="15" fill="#fff" />
      <circle cx="16.2" cy="10" r="5.6" fill="#D21034" />
      <circle cx="18" cy="10" r="4.6" fill="#fff" />
      <path
        fill="#D21034"
        d="M17.4 6.6l.68 2.1h2.2l-1.78 1.3.68 2.1-1.78-1.3-1.78 1.3.68-2.1-1.78-1.3h2.2z"
      />
    </svg>
  )
}

export default function SiteHeader() {
  const { lang, setLang, t } = useLanguage()

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-header__brand">
          <span className="site-header__mark">HJZ</span>
          <span className="site-header__sub">{t('nav.brandSub')}</span>
        </Link>

        <div className="lang-switch" role="group" aria-label="Language">
          <button
            type="button"
            className={`lang-switch__btn ${lang === 'fr' ? 'is-active' : ''}`}
            onClick={() => setLang('fr')}
            aria-label="Français"
            title="Français"
            aria-pressed={lang === 'fr'}
          >
            <FlagFR />
          </button>
          <button
            type="button"
            className={`lang-switch__btn ${lang === 'ar' ? 'is-active' : ''}`}
            onClick={() => setLang('ar')}
            aria-label="العربية"
            title="العربية"
            aria-pressed={lang === 'ar'}
          >
            <FlagDZ />
          </button>
        </div>
      </div>
    </header>
  )
}
