import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AdminLogin.css'

export default function AdminLogin() {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    const expected = import.meta.env.VITE_ADMIN_PIN
    if (pin === expected) {
      sessionStorage.setItem('hjz_admin_session', 'true')
      navigate('/admin/dashboard')
    } else {
      setError('Code incorrect.')
    }
  }

  return (
    <div className="admin-login">
      <form className="admin-login__card" onSubmit={submit}>
        <div className="admin-login__icon">🔐</div>
        <p className="admin-login__eyebrow">HJZ Accessoiries</p>
        <h1>Espace administration</h1>
        <div className="field">
          <label>Code d'accès</label>
          <input
            type="password"
            inputMode="numeric"
            autoFocus
            value={pin}
            onChange={(e) => { setPin(e.target.value); setError('') }}
          />
        </div>
        {error && <p className="admin-login__error">{error}</p>}
        <button type="submit" className="btn btn-solid">Entrer</button>
      </form>
    </div>
  )
}
