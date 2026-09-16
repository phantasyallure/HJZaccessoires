import { useLanguage } from '../i18n/LanguageContext.jsx'
import { formatPrice } from '../lib/format.js'
import './ProductCard.css'

export default function ProductCard({ product }) {
  const { lang } = useLanguage()
  const cover = product.images?.[0]

  const openProduct = () => {
    window.open(`/product/${product.id}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <button className="product-card" onClick={openProduct}>
      <div className="product-card__image">
        {cover ? (
          <img src={cover} alt={product.name} loading="lazy" />
        ) : (
          <div className="product-card__placeholder">HJZ</div>
        )}
      </div>
      <div className="product-card__info">
        <h3>{product.name}</h3>
        <span className="product-card__price">{formatPrice(product.price, lang)}</span>
      </div>
    </button>
  )
}
