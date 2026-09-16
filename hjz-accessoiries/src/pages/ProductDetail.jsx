import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { WILAYAS, WILAYAS_AR } from '../data/wilayas'
import SupportChat from '../components/SupportChat.jsx'
import SiteHeader from '../components/SiteHeader.jsx'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { formatPrice } from '../lib/format.js'
import './ProductDetail.css'

export default function ProductDetail() {
  const { id } = useParams()
  const { t, lang } = useLanguage()
  const wilayaLabels = lang === 'ar' ? WILAYAS_AR : WILAYAS
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    wilaya: '',
    size: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('products_public').select('*').eq('id', id).single()
      setProduct(data)
      setLoading(false)
    }
    load()
  }, [id])

  const updateField = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const submitOrder = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.firstName.trim() || !form.lastName.trim() || !form.phone.trim() || !form.wilaya) {
      setError(t('productDetail.errorRequired'))
      return
    }
    if (product.sold_out) return
    if (product.has_size && !form.size) {
      setError(t('productDetail.errorSize'))
      return
    }

    setSubmitting(true)
    const { error: insertError } = await supabase.from('orders').insert({
      product_id: product.id,
      first_name: form.firstName.trim(),
      last_name: form.lastName.trim(),
      phone: form.phone.trim(),
      wilaya: form.wilaya,
      size: product.has_size ? form.size : null,
    })
    setSubmitting(false)

    if (insertError) {
      setError(t('productDetail.errorSubmit'))
      return
    }
    setSubmitted(true)
  }

  if (loading) {
    return (
      <div className="product-page">
        <SiteHeader />
        <div className="container product-page__status">
          <p>{t('productDetail.loading')}</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="product-page">
        <SiteHeader />
        <div className="container product-page__status">
          <p>{t('productDetail.notFound')}</p>
          <Link to="/" className="btn">{t('productDetail.backToShop')}</Link>
        </div>
      </div>
    )
  }

  const images = product.images?.length ? product.images : [null]

  return (
    <div className="product-page">
      <SiteHeader />

      <div className="container product-page__top">
        <Link to="/" className="product-page__back">← {t('productDetail.back')}</Link>
      </div>

      <div className="container product-page__grid">
        <div className="product-gallery">
          <div className="product-gallery__main">
            {images[activeImage] ? (
              <img src={images[activeImage]} alt={product.name} />
            ) : (
              <div className="product-gallery__placeholder">HJZ</div>
            )}
          </div>
          {images.length > 1 && (
            <div className="product-gallery__thumbs">
              {images.map((src, i) => (
                <button
                  key={i}
                  className={`product-gallery__thumb ${i === activeImage ? 'is-active' : ''}`}
                  onClick={() => setActiveImage(i)}
                >
                  {src && <img src={src} alt={`${product.name} ${i + 1}`} />}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          {product.sold_out && <span className="product-info__badge">{t('product.soldOut')}</span>}
          <p className="product-info__price">{formatPrice(product.price, lang)}</p>

          {submitted ? (
            <div className="order-success">
              <h3>{t('productDetail.successTitle')}</h3>
              <p>{t('productDetail.successMessage', { name: form.firstName, phone: form.phone })}</p>
            </div>
          ) : product.sold_out ? (
            <div className="order-form order-form--sold-out">
              <h3>{t('productDetail.soldOutTitle')}</h3>
              <p>{t('productDetail.soldOutMessage')}</p>
            </div>
          ) : (
            <form className="order-form" onSubmit={submitOrder}>
              <h3>{t('productDetail.formTitle')}</h3>

              <div className="order-form__row">
                <div className="field">
                  <label>{t('productDetail.firstName')}</label>
                  <input type="text" value={form.firstName} onChange={updateField('firstName')} />
                </div>
                <div className="field">
                  <label>{t('productDetail.lastName')}</label>
                  <input type="text" value={form.lastName} onChange={updateField('lastName')} />
                </div>
              </div>

              <div className="field">
                <label>{t('productDetail.phone')}</label>
                <input type="tel" placeholder={t('productDetail.phonePlaceholder')} value={form.phone} onChange={updateField('phone')} />
              </div>

              <div className="field">
                <label>{t('productDetail.wilaya')}</label>
                <select value={form.wilaya} onChange={updateField('wilaya')}>
                  <option value="">{t('productDetail.wilayaPlaceholder')}</option>
                  {WILAYAS.map((w, i) => (
                    <option key={w} value={w}>{wilayaLabels[i]}</option>
                  ))}
                </select>
              </div>

              {product.has_size && (
                <div className="field">
                  <label>{t('productDetail.size')}</label>
                  <select value={form.size} onChange={updateField('size')}>
                    <option value="">{t('productDetail.sizePlaceholder')}</option>
                    {product.sizes.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              )}

              {error && <p className="order-form__error">{error}</p>}

              <button type="submit" className="btn btn-solid" disabled={submitting}>
                {submitting ? t('productDetail.submitting') : t('productDetail.submit')}
              </button>
            </form>
          )}
        </div>
      </div>

      <SupportChat />
    </div>
  )
}
