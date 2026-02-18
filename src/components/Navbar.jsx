import { useMemo } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import useCart from '../context/useCart'
import useAuth from '../context/useAuth'

const subNavItems = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/contact', label: 'Customer Service' },
  { to: '/checkout', label: 'Checkout' },
]

function Navbar() {
  const { cartCount } = useCart()
  const { isAuthenticated, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const queryFromUrl = useMemo(() => {
    if (!location.pathname.startsWith('/shop')) {
      return ''
    }

    const searchParams = new URLSearchParams(location.search)
    return searchParams.get('q') || ''
  }, [location.pathname, location.search])

  function handleSearchSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const query = String(formData.get('q') || '').trim()

    if (!query) {
      navigate('/shop')
      return
    }

    navigate(`/shop?q=${encodeURIComponent(query)}`)
  }

  return (
    <header className="navbar">
      <div className="top-nav content-shell">
        <NavLink className="nav-brand" to="/">
          <span className="nav-brand-main">shopzone</span>
          <span className="nav-brand-sub">.in</span>
        </NavLink>

        <div className="nav-location">
          <span className="nav-location-label">Deliver to</span>
          <span className="nav-location-value">Intern Team, India</span>
        </div>

        <form className="nav-search" onSubmit={handleSearchSubmit}>
          <label className="visually-hidden" htmlFor="site-search">
            Search products
          </label>
          <select className="search-category" defaultValue="all" aria-label="Search category">
            <option value="all">All</option>
            <option value="beauty">Beauty</option>
            <option value="fragrances">Fragrances</option>
            <option value="furniture">Furniture</option>
            <option value="groceries">Groceries</option>
          </select>
          <input
            id="site-search"
            className="search-input"
            name="q"
            type="search"
            placeholder="Search ShopZone"
            defaultValue={queryFromUrl}
            key={queryFromUrl || 'empty-query'}
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>

        <NavLink className="nav-pill" to="/login">
          <span className="nav-pill-top">
            {isAuthenticated ? 'Welcome back' : 'Hello, sign in'}
          </span>
          <span className="nav-pill-bottom">
            {isAuthenticated ? 'Guest Account' : 'Account'}
          </span>
        </NavLink>

        {isAuthenticated ? (
          <button className="nav-pill nav-pill-button" type="button" onClick={logout}>
            <span className="nav-pill-top">Signed in</span>
            <span className="nav-pill-bottom">Logout</span>
          </button>
        ) : (
          <NavLink className="nav-pill" to="/contact">
            <span className="nav-pill-top">Need help?</span>
            <span className="nav-pill-bottom">Support</span>
          </NavLink>
        )}

        <NavLink className="nav-cart" to="/cart">
          <span className="nav-cart-count">{cartCount}</span>
          <span className="nav-cart-text">Cart</span>
        </NavLink>
      </div>

      <div className="sub-nav">
        <div className="content-shell sub-nav-inner">
          <span className="menu-all">All</span>
          {subNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? 'sub-link sub-link-active' : 'sub-link'
              }
            >
              {item.label}
            </NavLink>
          ))}
          <span className="sub-nav-offer">Fresh deals every day</span>
        </div>
      </div>
    </header>
  )
}

export default Navbar
