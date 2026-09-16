import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { IconReceipt, IconTag } from '../../components/AdminIcons.jsx'

const STATUSES = ['new', 'contacted', 'confirmed', 'cancelled']
const STATUS_LABELS = {
  new: 'Nouvelle',
  contacted: 'Contacté',
  confirmed: 'Confirmée',
  cancelled: 'Annulée',
}

export default function OrdersTab() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const loadOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select('*, products(name, price)')
      .order('created_at', { ascending: false })
    setOrders(data || [])
    setLoading(false)
  }

  useEffect(() => { loadOrders() }, [])

  const updateStatus = async (id, status) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
    await supabase.from('orders').update({ status }).eq('id', id)
  }

  return (
    <div className="admin-card">
      <h3><IconReceipt /> Commandes ({orders.length})</h3>
      {loading && <p className="admin-hint">Chargement...</p>}
      {!loading && orders.length === 0 && <p className="admin-hint">Aucune commande reçue.</p>}

      <div className="admin-table">
        {orders.map((o) => (
          <div key={o.id} className="admin-order-row" data-status={o.status}>
            <div className="admin-order-row__main">
              <span className={`admin-status-dot admin-status-dot--${o.status}`}>{STATUS_LABELS[o.status]}</span>
              <strong>{o.first_name} {o.last_name}</strong>
              <span>{o.phone}</span>
              <span>{o.wilaya}</span>
            </div>
            <div className="admin-order-row__product">
              <span>{o.products?.name || 'Produit supprimé'}</span>
              {o.size && <span className="admin-tag"><IconTag /> Taille : {o.size}</span>}
            </div>
            <select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)}>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{STATUS_LABELS[s]}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}
