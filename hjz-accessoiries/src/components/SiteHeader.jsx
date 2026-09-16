import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import './SiteHeader.css'

export default function SiteHeader() {
  const { lang, toggleLang, t } = useLanguage()

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-header__brand">
          <span className="site-header__mark">HJZ</span>
          <span className="site-header__sub">{t('nav.brandSub')}</span>
        </Link>

        <button
          type="button"
          className="lang-switch"
          onClick={toggleLang}
          aria-label={lang === 'ar' ? 'Switch to French' : 'التبديل إلى العربية'}
        >
          <span className={lang === 'fr' ? 'is-active' : ''}>FR</span>
          <span className="lang-switch__divider" aria-hidden="true" />
          <span className={lang === 'ar' ? 'is-active' : ''}>عربي</span>
        </button>
      </div>
    </header>
  )
}
