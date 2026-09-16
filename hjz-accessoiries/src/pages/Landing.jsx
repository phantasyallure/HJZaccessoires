import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import ProductCard from '../components/ProductCard.jsx'
import SupportChat from '../components/SupportChat.jsx'
import './Landing.css'

export default function Landing() {
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
      <header className="landing__hero">
        <div className="container landing__hero-inner">
          <p className="landing__eyebrow">HJZ Accessoiries</p>
          <h1>Des accessoires choisis avec soin,<br />livrés dans les 58 wilayas.</h1>
        </div>
      </header>

      <main className="container landing__main">
        {loading && <p className="landing__status">Chargement des produits...</p>}

        {!loading && products.length === 0 && (
          <p className="landing__status">Aucun produit disponible pour le moment.</p>
        )}

        <div className="landing__grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </main>

      <footer className="landing__footer">
        <div className="container">
          <span>HJZ Accessoiries</span>
          <a href="/admin">Espace administration</a>
        </div>
      </footer>

      <SupportChat />
    </div>
  )
}
