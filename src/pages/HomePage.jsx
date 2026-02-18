import { Link } from 'react-router-dom'

const categoryCards = [
  {
    title: 'Beauty Picks',
    description: 'Glow essentials under Rs. 999',
    to: '/shop?category=beauty',
  },
  {
    title: 'Home Furniture',
    description: 'Minimal and modern pieces',
    to: '/shop?category=furniture',
  },
  {
    title: 'Daily Grocery',
    description: 'Fast delivery essentials',
    to: '/shop?category=groceries',
  },
  {
    title: 'Top Fragrances',
    description: 'Best-rated scents this week',
    to: '/shop?category=fragrances',
  },
]

function HomePage() {
  return (
    <section className="home-page">
      <div className="home-hero">
        <div className="home-hero-content">
          <p className="hero-overline">This week special</p>
          <h1>Shop like a pro with fast filters and instant cart updates.</h1>
          <p>
            Explore products, open details with dynamic routes, and manage your cart
            globally without page reloads.
          </p>
          <div className="hero-actions">
            <Link className="btn-primary" to="/shop">
              Start Shopping
            </Link>
            <Link className="btn-secondary" to="/cart">
              View Cart
            </Link>
          </div>
        </div>
      </div>

      <div className="home-strip">
        <span>Free delivery above Rs. 999</span>
        <span>7-day easy returns</span>
        <span>Secure checkout flow</span>
      </div>

      <div className="home-category-grid">
        {categoryCards.map((card) => (
          <article className="home-category-card" key={card.title}>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            <Link className="btn-link" to={card.to}>
              Explore now
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}

export default HomePage
