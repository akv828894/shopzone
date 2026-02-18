import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../context/useAuth'

function LoginPage() {
  const { isAuthenticated, loginAsGuest } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const redirectPath = location.state?.from?.pathname || '/checkout'

  function handleGuestLogin() {
    loginAsGuest()
    navigate(redirectPath, { replace: true })
  }

  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />
  }

  return (
    <section className="auth-page">
      <article className="auth-card">
        <h1>Sign in</h1>

        <label>
          Email or mobile phone number
          <input type="text" placeholder="Enter email" />
        </label>

        <button className="btn-primary" type="button">
          Continue
        </button>

        <p className="auth-note">
          By continuing, you agree to ShopZone conditions of use and privacy notice.
        </p>

        <button className="btn-secondary" type="button" onClick={handleGuestLogin}>
          Login as Guest
        </button>
      </article>
    </section>
  )
}

export default LoginPage
