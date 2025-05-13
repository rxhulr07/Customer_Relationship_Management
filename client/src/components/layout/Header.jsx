import { useAuth } from '../../services/auth'
import '../../styles/layout/header.css'

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="app-header">
      <div className="header-content">
        <h1>Mini CRM</h1>
        <div className="user-info">
          {user && (
            <>
              <span>Welcome, {user.name}</span>
              <button onClick={logout} className="btn-logout">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}