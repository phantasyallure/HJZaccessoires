import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductsTab from './admin/ProductsTab.jsx'
import OrdersTab from './admin/OrdersTab.jsx'
import ChatTab from './admin/ChatTab.jsx'
import './AdminDashboard.css'

const TABS = [
  { id: 'products', label: 'Produits' },
  { id: 'orders', label: 'Commandes' },
  { id: 'chat', label: 'Messages' },
]

export default function AdminDashboard() {
  const [tab, setTab] = useState('products')
  const navigate = useNavigate()

  const logout = () => {
    sessionStorage.removeItem('hjz_admin_session')
    navigate('/admin')
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-dashboard__header">
        <div className="container admin-dashboard__header-inner">
          <h1>HJZ — Administration</h1>
          <button className="btn" onClick={logout}>Se déconnecter</button>
        </div>
      </header>

      <nav className="container admin-dashboard__tabs">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`admin-dashboard__tab ${tab === t.id ? 'is-active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="container admin-dashboard__content">
        {tab === 'products' && <ProductsTab />}
        {tab === 'orders' && <OrdersTab />}
        {tab === 'chat' && <ChatTab />}
      </main>
    </div>
  )
}
