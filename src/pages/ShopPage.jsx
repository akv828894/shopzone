import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import useCart from '../context/useCart'

function ShopPage() {
  const { addToCart } = useCart()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()

  const query = searchParams.get('q') || ''
  const category = searchParams.get('category') || 'all'
  const sortBy = searchParams.get('sort') || 'featured'

  const [searchInput, setSearchInput] = useState(query)

  useEffect(() => {
    setSearchInput(query)
  }, [query])

  useEffect(() => {
    const controller = new AbortController()

    async function fetchProducts() {
      try {
        setLoading(true)
        setError('')
        const response = await fetch('https://dummyjson.com/products?limit=100', {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Products load nahi hue. Please try again.')
        }

        const data = await response.json()
        setProducts(data.products ?? [])
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unexpected error')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
    return () => controller.abort()
  }, [])

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map((product) => product.category))]
    return uniqueCategories.sort((first, second) => first.localeCompare(second))
  }, [products])

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    const matchingProducts = products.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category

      const matchesSearch =
        normalizedQuery.length === 0 ||
        product.title.toLowerCase().includes(normalizedQuery) ||
        (product.brand || '').toLowerCase().includes(normalizedQuery)

      return matchesCategory && matchesSearch
    })

    if (sortBy === 'price-low') {
      return [...matchingProducts].sort((a, b) => a.price - b.price)
    }

    if (sortBy === 'price-high') {
      return [...matchingProducts].sort((a, b) => b.price - a.price)
    }

    if (sortBy === 'rating') {
      return [...matchingProducts].sort((a, b) => b.rating - a.rating)
    }

    return matchingProducts
  }, [products, category, query, sortBy])

  function updateSearchParams(updates) {
    const next = new URLSearchParams(searchParams)

    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === 'all' || value === 'featured') {
        next.delete(key)
      } else {
        next.set(key, value)
      }
    })

    setSearchParams(next)
  }

  function handleSearchSubmit(event) {
    event.preventDefault()
    updateSearchParams({ q: searchInput.trim() })
  }

  function formatCategoryName(value) {
    return value
      .split('-')
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(' ')
  }

  if (loading) {
    return <p className="status-message">Loading products...</p>
  }

  if (error) {
    return <p className="status-message status-error">{error}</p>
  }

  return (
    <section className="shop-page">
      <div className="shop-toolbar">
        <h1 className="page-title">Shop Products</h1>
        <p className="shop-result-count">{filteredProducts.length} results</p>
      </div>

      <div className="shop-layout">
        <aside className="shop-filters">
          <h2>Filters</h2>

          <form className="inline-search" onSubmit={handleSearchSubmit}>
            <input
              type="search"
              placeholder="Search in results"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
            <button type="submit">Apply</button>
          </form>

          <label>
            Category
            <select
              value={category}
              onChange={(event) =>
                updateSearchParams({ category: event.target.value })
              }
            >
              <option value="all">All categories</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {formatCategoryName(item)}
                </option>
              ))}
            </select>
          </label>

          <label>
            Sort by
            <select
              value={sortBy}
              onChange={(event) => updateSearchParams({ sort: event.target.value })}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </label>

          {(query || category !== 'all' || sortBy !== 'featured') && (
            <button
              className="clear-filter-btn"
              type="button"
              onClick={() => {
                setSearchInput('')
                setSearchParams(new URLSearchParams())
              }}
            >
              Clear all
            </button>
          )}
        </aside>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <article className="product-card" key={product.id}>
              <Link to={`/product/${product.id}`}>
                <img
                  className="product-image"
                  src={product.thumbnail}
                  alt={product.title}
                />
              </Link>

              <div className="product-body">
                <p className="product-brand">{product.brand || 'Generic'}</p>
                <Link className="product-title" to={`/product/${product.id}`}>
                  {product.title}
                </Link>
                <p className="product-rating">Rating: {product.rating.toFixed(1)} / 5</p>
                <p className="product-price">Rs. {product.price}</p>
                <p className="product-discount">
                  Save {Math.round(product.discountPercentage)}% today
                </p>

                <div className="product-actions">
                  <button
                    className="btn-primary"
                    type="button"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                  <Link className="btn-link" to={`/product/${product.id}`}>
                    View details
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ShopPage
