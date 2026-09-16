import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { WILAYAS } from '../data/wilayas'
import SupportChat from '../components/SupportChat.jsx'
import './ProductDetail.css'

export default function ProductDetail() {
  const { id } = useParams()
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
      const { data } = await supabase.from('products').select('*').eq('id', id).single()
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
      setError('Merci de remplir tous les champs obligatoires.')
      return
    }
    if (product.has_size && !form.size) {
      setError('Merci de choisir une taille.')
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
      setError("La commande n'a pas pu être envoyée. Réessayez.")
      return
    }
    setSubmitted(true)
  }

  if (loading) {
    return (
      <div className="container product-page__status">
        <p>Chargement...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container product-page__status">
        <p>Ce produit n'existe pas ou n'est plus disponible.</p>
        <Link to="/" className="btn">Retour à la boutique</Link>
      </div>
    )
  }

  const images = product.images?.length ? product.images : [null]

  return (
    <div className="product-page">
      <div className="container product-page__top">
        <Link to="/" className="product-page__back">← HJZ Accessoiries</Link>
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
          <p className="product-info__price">{Number(product.price).toLocaleString('fr-FR')} DA</p>

          {submitted ? (
            <div className="order-success">
              <h3>Commande envoyée</h3>
              <p>Merci {form.firstName}, notre équipe vous contactera au {form.phone} pour confirmer la livraison.</p>
            </div>
          ) : (
            <form className="order-form" onSubmit={submitOrder}>
              <h3>Passer commande</h3>

              <div className="order-form__row">
                <div className="field">
                  <label>Prénom</label>
                  <input type="text" value={form.firstName} onChange={updateField('firstName')} />
                </div>
                <div className="field">
                  <label>Nom</label>
                  <input type="text" value={form.lastName} onChange={updateField('lastName')} />
                </div>
              </div>

              <div className="field">
                <label>Numéro de téléphone</label>
                <input type="tel" placeholder="05XX XX XX XX" value={form.phone} onChange={updateField('phone')} />
              </div>

              <div className="field">
                <label>Wilaya</label>
                <select value={form.wilaya} onChange={updateField('wilaya')}>
                  <option value="">Sélectionnez votre wilaya</option>
                  {WILAYAS.map((w) => (
                    <option key={w} value={w}>{w}</option>
                  ))}
                </select>
              </div>

              {product.has_size && (
                <div className="field">
                  <label>Taille</label>
                  <select value={form.size} onChange={updateField('size')}>
                    <option value="">Choisissez une taille</option>
                    {product.sizes.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              )}

              {error && <p className="order-form__error">{error}</p>}

              <button type="submit" className="btn btn-solid" disabled={submitting}>
                {submitting ? 'Envoi...' : 'Confirmer la commande'}
              </button>
            </form>
          )}
        </div>
      </div>

      <SupportChat />
    </div>
  )
}
