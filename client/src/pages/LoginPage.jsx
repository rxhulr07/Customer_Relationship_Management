import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../services/auth'
import GoogleLoginButton from '../components/auth/GoogleLoginButton'
import '../styles/pages/login.css'

export default function LoginPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/')
  }, [user, navigate])

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Mini CRM Platform</h1>
        <p>Sign in to manage your customer segments and campaigns</p>
        <div className="login-button">
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  )
}