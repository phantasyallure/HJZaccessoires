import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductsTab from './admin/ProductsTab.jsx'
import OrdersTab from './admin/OrdersTab.jsx'
import ChatTab from './admin/ChatTab.jsx'
import { IconBox, IconReceipt, IconChat, IconLogout, IconSparkle } from '../components/AdminIcons.jsx'
import './AdminDashboard.css'

const TABS = [
  { id: 'products', label: 'Produits', icon: IconBox },
  { id: 'orders', label: 'Commandes', icon: IconReceipt },
  { id: 'chat', label: 'Messages', icon: IconChat },
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
          <h1>
            HJZ — Administration
            <span className="admin-dashboard__badge">
              <IconSparkle aria-hidden="true" />
              Back-office
            </span>
          </h1>
          <button className="btn" onClick={logout}>
            <IconLogout aria-hidden="true" />
            Se déconnecter
          </button>
        </div>

        <nav className="container admin-dashboard__tabs">
          {TABS.map((t) => {
            const Icon = t.icon
            return (
              <button
                key={t.id}
                className={`admin-dashboard__tab ${tab === t.id ? 'is-active' : ''}`}
                onClick={() => setTab(t.id)}
              >
                <Icon aria-hidden="true" />
                {t.label}
              </button>
            )
          })}
        </nav>
      </header>

      <main className="container admin-dashboard__content">
        {tab === 'products' && <ProductsTab />}
        {tab === 'orders' && <OrdersTab />}
        {tab === 'chat' && <ChatTab />}
      </main>
    </div>
  )
}
