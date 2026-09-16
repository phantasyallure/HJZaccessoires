import { useLanguage } from '../i18n/LanguageContext.jsx'
import { formatPrice } from '../lib/format.js'
import { categoryLabel } from '../data/categories.js'
import './ProductCard.css'

export default function ProductCard({ product }) {
  const { lang, t } = useLanguage()
  const cover = product.images?.[0]
  const soldOut = !!product.sold_out

  const openProduct = () => {
    window.open(`/product/${product.id}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <button className={`product-card ${soldOut ? 'is-sold-out' : ''}`} onClick={openProduct}>
      <div className="product-card__image">
        {cover ? (
          <img src={cover} alt={product.name} loading="lazy" />
        ) : (
          <div className="product-card__placeholder">HJZ</div>
        )}
        {soldOut && <span className="product-card__badge">{t('product.soldOut')}</span>}
      </div>
      <div className="product-card__info">
        <span className="product-card__category">{categoryLabel(product.category, lang)}</span>
        <h3>{product.name}</h3>
        <span className="product-card__price">{formatPrice(product.price, lang)}</span>
      </div>
    </button>
  )
}
