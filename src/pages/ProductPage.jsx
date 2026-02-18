import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useCart from '../context/useCart'

function ProductPage() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedImage, setSelectedImage] = useState('')
  const [addedNotice, setAddedNotice] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchProductById() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(`https://dummyjson.com/products/${id}`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Product details load nahi hue.')
        }

        const data = await response.json()
        setProduct(data)
        setSelectedImage(data.images?.[0] || data.thumbnail)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unexpected error')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProductById()
    return () => controller.abort()
  }, [id])

  useEffect(() => {
    if (!addedNotice) {
      return undefined
    }

    const timeoutId = setTimeout(() => {
      setAddedNotice('')
    }, 1600)

    return () => clearTimeout(timeoutId)
  }, [addedNotice])

  const imageList = useMemo(() => {
    if (!product) {
      return []
    }

    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images
    }

    return [product.thumbnail]
  }, [product])

  function handleAddToCart() {
    if (!product) {
      return
    }

    addToCart(product)
    setAddedNotice('Added to cart')
  }

  if (loading) {
    return <p className="status-message">Loading product details...</p>
  }

  if (error) {
    return <p className="status-message status-error">{error}</p>
  }

  if (!product) {
    return <p className="status-message status-error">Product not found.</p>
  }

  return (
    <section className="product-page">
      <Link className="btn-link" to="/shop">
        Back to results
      </Link>

      <div className="product-page-grid">
        <div className="detail-media">
          <img className="detail-main-image" src={selectedImage} alt={product.title} />

          <div className="thumbnail-row">
            {imageList.map((image) => (
              <button
                className={
                  image === selectedImage ? 'thumb-btn thumb-btn-active' : 'thumb-btn'
                }
                key={image}
                type="button"
                onClick={() => setSelectedImage(image)}
              >
                <img src={image} alt={product.title} />
              </button>
            ))}
          </div>
        </div>

        <article className="detail-main">
          <h1>{product.title}</h1>
          <p className="detail-rating">Rating: {product.rating.toFixed(1)} / 5</p>
          <p className="detail-brand">Brand: {product.brand || 'Generic'}</p>
          <p className="detail-description">{product.description}</p>
        </article>

        <aside className="detail-buybox">
          <p className="detail-price">Rs. {product.price}</p>
          <p className="detail-discount">
            You save {Math.round(product.discountPercentage)}% on this item.
          </p>
          <p className="detail-stock">
            {product.stock > 0 ? `In stock (${product.stock} left)` : 'Out of stock'}
          </p>

          <button className="btn-primary" type="button" onClick={handleAddToCart}>
            Add to Cart
          </button>

          <Link className="btn-secondary" to="/cart">
            Buy Now
          </Link>

          {addedNotice ? <p className="added-notice">{addedNotice}</p> : null}
        </aside>
      </div>
    </section>
  )
}

export default ProductPage
