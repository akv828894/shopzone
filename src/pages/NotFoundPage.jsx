import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="simple-page">
      <h1 className="page-title">Page not found</h1>
      <p className="page-subtitle">Try searching for products from the top search bar.</p>
      <Link className="btn-primary" to="/">
        Return Home
      </Link>
    </section>
  )
}

export default NotFoundPage
