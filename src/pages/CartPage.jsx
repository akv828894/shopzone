import { Link } from 'react-router-dom'
import useCart from '../context/useCart'

function CartPage() {
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart()

  const shippingCharge = cartSubtotal > 999 || cartSubtotal === 0 ? 0 : 70
  const finalTotal = cartSubtotal + shippingCharge

  if (cartItems.length === 0) {
    return (
      <section className="cart-page">
        <h1 className="page-title">Your ShopZone Cart is empty</h1>
        <p className="status-message">Add products from the shop to continue.</p>
        <Link className="btn-primary" to="/shop">
          Go to Shop
        </Link>
      </section>
    )
  }

  return (
    <section className="cart-page">
      <h1 className="page-title">Shopping Cart</h1>
      <div className="cart-layout">
        <div className="cart-list">
          {cartItems.map((item) => (
            <article className="cart-item" key={item.id}>
              <img className="cart-item-image" src={item.thumbnail} alt={item.title} />

              <div className="cart-item-content">
                <h2>{item.title}</h2>
                <p className="cart-brand">Brand: {item.brand}</p>
                <p className="cart-price">Rs. {item.price}</p>

                <div className="qty-controls">
                  <button type="button" onClick={() => decreaseQuantity(item.id)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => increaseQuantity(item.id)}>
                    +
                  </button>
                </div>

                <button
                  className="remove-link"
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>

              <p className="cart-item-total">Rs. {item.price * item.quantity}</p>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Order Summary</h2>
          <p>Items ({cartCount}): Rs. {cartSubtotal}</p>
          <p>Shipping: {shippingCharge === 0 ? 'FREE' : `Rs. ${shippingCharge}`}</p>
          <p className="summary-total">Order Total: Rs. {finalTotal}</p>
          <Link className="btn-primary" to="/checkout">
            Proceed to Checkout
          </Link>
        </aside>
      </div>
    </section>
  )
}

export default CartPage
