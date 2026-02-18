import { useEffect, useMemo, useState } from 'react'
import AuthContext from './auth-context'

const AUTH_STORAGE_KEY = 'shopzone-auth-v1'

function readAuthFromStorage() {
  try {
    const rawValue = localStorage.getItem(AUTH_STORAGE_KEY)

    if (!rawValue) {
      return false
    }

    const parsed = JSON.parse(rawValue)
    return Boolean(parsed?.isAuthenticated)
  } catch {
    return false
  }
}

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(readAuthFromStorage)

  useEffect(() => {
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({ isAuthenticated }),
    )
  }, [isAuthenticated])

  function loginAsGuest() {
    setIsAuthenticated(true)
  }

  function logout() {
    setIsAuthenticated(false)
  }

  const value = useMemo(
    () => ({ isAuthenticated, loginAsGuest, logout }),
    [isAuthenticated],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthProvider }
