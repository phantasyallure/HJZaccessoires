import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import ProductCard from '../components/ProductCard.jsx'
import SupportChat from '../components/SupportChat.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import './Landing.css'

export default function Landing() {
  const { t } = useLanguage()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
      setProducts(data || [])
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="landing">
      <SiteHeader />

      <section className="hero">
        <div className="hero__media" aria-hidden="true">
          <img src="/images/hero-bg.jpg" alt="" fetchpriority="high" />
          <div className="hero__fade" />
        </div>
      </section>

      <section className="intro">
        <div className="container intro__inner">
          <h1>{t('hero.title')}</h1>
          <p>{t('hero.subtitle')}</p>
          <a href="#collection" className="btn btn-solid">{t('hero.cta')}</a>
        </div>
      </section>

      <section className="trust">
        <div className="container trust__row">
          <span>{t('trust.delivery')}</span>
          <span className="trust__divider" aria-hidden="true" />
          <span>{t('trust.cod')}</span>
          <span className="trust__divider" aria-hidden="true" />
          <span>{t('trust.curated')}</span>
        </div>
      </section>

      <main id="collection" className="container landing__main">
        <div className="landing__main-head">
          <h2>{t('collection.heading')}</h2>
          <p>{t('collection.subheading')}</p>
        </div>

        {loading && <p className="landing__status">{t('collection.loading')}</p>}

        {!loading && products.length === 0 && (
          <p className="landing__status">{t('collection.empty')}</p>
        )}

        <div className="landing__grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </main>

      <footer className="landing__footer">
        <div className="container landing__footer-inner">
          <div>
            <span className="landing__footer-brand">HJZ Accessories</span>
            <p className="landing__footer-tagline">{t('footer.tagline')}</p>
          </div>
          <p className="landing__footer-rights">© {new Date().getFullYear()} HJZ Accessories — {t('footer.rights')}</p>
        </div>
      </footer>

      <SupportChat />
    </div>
  )
}
