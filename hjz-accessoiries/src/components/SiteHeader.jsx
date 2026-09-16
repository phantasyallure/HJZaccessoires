import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import './SiteHeader.css'

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
            aria-pressed={lang === 'fr'}
          >
            <span className="lang-switch__flag" aria-hidden="true">🇫🇷</span>
            <span className="lang-switch__label">FR</span>
          </button>
          <button
            type="button"
            className={`lang-switch__btn ${lang === 'ar' ? 'is-active' : ''}`}
            onClick={() => setLang('ar')}
            aria-label="العربية"
            aria-pressed={lang === 'ar'}
          >
            <span className="lang-switch__flag" aria-hidden="true">🇩🇿</span>
            <span className="lang-switch__label">عربي</span>
          </button>
        </div>
      </div>
    </header>
  )
}
