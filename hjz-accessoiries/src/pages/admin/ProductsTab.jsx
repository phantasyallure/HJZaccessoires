import { useEffect, useState } from 'react'
import { supabase, PRODUCT_IMAGES_BUCKET } from '../../lib/supabaseClient'

const MAX_PHOTOS = 5

const emptyForm = { name: '', price: '', hasSize: false, sizesText: '' }

export default function ProductsTab() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(emptyForm)
  const [files, setFiles] = useState([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const loadProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    setProducts(data || [])
    setLoading(false)
  }

  useEffect(() => { loadProducts() }, [])

  const onFilesChange = (e) => {
    const chosen = Array.from(e.target.files || []).slice(0, MAX_PHOTOS)
    setFiles(chosen)
  }

  const resetForm = () => {
    setForm(emptyForm)
    setFiles([])
  }

  const submit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.name.trim() || !form.price) {
      setError('Nom et prix sont obligatoires.')
      return
    }
    const sizes = form.hasSize
      ? form.sizesText.split(',').map((s) => s.trim()).filter(Boolean)
      : []
    if (form.hasSize && sizes.length === 0) {
      setError('Ajoutez au moins une taille, ou désactivez les tailles.')
      return
    }

    setSaving(true)
    try {
      const imageUrls = []
      for (const file of files) {
        const path = `${crypto.randomUUID()}-${file.name}`
        const { error: uploadError } = await supabase.storage
          .from(PRODUCT_IMAGES_BUCKET)
          .upload(path, file)
        if (uploadError) throw uploadError
        const { data: pub } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(path)
        imageUrls.push(pub.publicUrl)
      }

      const { error: insertError } = await supabase.from('products').insert({
        name: form.name.trim(),
        price: Number(form.price),
        has_size: form.hasSize,
        sizes,
        images: imageUrls,
      })
      if (insertError) throw insertError

      resetForm()
      await loadProducts()
    } catch (err) {
      setError(err.message || "Une erreur est survenue.")
    } finally {
      setSaving(false)
    }
  }

  const deleteProduct = async (id) => {
    if (!confirm('Supprimer ce produit ?')) return
    await supabase.from('products').delete().eq('id', id)
    await loadProducts()
  }

  return (
    <div className="admin-tab">
      <form className="admin-card admin-form" onSubmit={submit}>
        <h3>Ajouter un produit</h3>

        <div className="field">
          <label>Nom du produit</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
        </div>

        <div className="field">
          <label>Prix (DA)</label>
          <input
            type="number"
            min="0"
            step="1"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
          />
        </div>

        <label className="admin-checkbox">
          <input
            type="checkbox"
            checked={form.hasSize}
            onChange={(e) => setForm((f) => ({ ...f, hasSize: e.target.checked }))}
          />
          Ce produit a des tailles
        </label>

        {form.hasSize && (
          <div className="field">
            <label>Tailles disponibles (séparées par une virgule)</label>
            <input
              type="text"
              placeholder="S, M, L  ou  38, 39, 40"
              value={form.sizesText}
              onChange={(e) => setForm((f) => ({ ...f, sizesText: e.target.value }))}
            />
          </div>
        )}

        <div className="field">
          <label>Photos (jusqu'à {MAX_PHOTOS})</label>
          <input type="file" accept="image/*" multiple onChange={onFilesChange} />
          {files.length > 0 && <p className="admin-hint">{files.length} photo(s) sélectionnée(s)</p>}
        </div>

        {error && <p className="admin-error">{error}</p>}

        <button type="submit" className="btn btn-solid" disabled={saving}>
          {saving ? 'Ajout en cours...' : 'Ajouter le produit'}
        </button>
      </form>

      <div className="admin-card">
        <h3>Produits ({products.length})</h3>
        {loading && <p className="admin-hint">Chargement...</p>}
        {!loading && products.length === 0 && <p className="admin-hint">Aucun produit pour l'instant.</p>}

        <div className="admin-product-list">
          {products.map((p) => (
            <div key={p.id} className="admin-product-row">
              <div className="admin-product-row__thumb">
                {p.images?.[0] ? <img src={p.images[0]} alt={p.name} /> : <span>HJZ</span>}
              </div>
              <div className="admin-product-row__info">
                <strong>{p.name}</strong>
                <span>{Number(p.price).toLocaleString('fr-FR')} DA</span>
                {p.has_size && <span className="admin-tag">Tailles : {p.sizes.join(', ')}</span>}
              </div>
              <button className="btn admin-delete" onClick={() => deleteProduct(p.id)}>Supprimer</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
