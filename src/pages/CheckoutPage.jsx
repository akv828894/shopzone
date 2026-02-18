import { useState } from 'react'
import { Link } from 'react-router-dom'
import useCart from '../context/useCart'

function CheckoutPage() {
  const { cartItems, cartCount, cartSubtotal, clearCart } = useCart()
  const [orderPlaced, setOrderPlaced] = useState(false)

  if (orderPlaced) {
    return (
      <section className="checkout-page">
        <h1 className="page-title">Order Confirmed</h1>
        <article className="checkout-card checkout-success">
          <p>Thank you for your order.</p>
          <p>Your order is being processed and will be dispatched soon.</p>
          <Link className="btn-primary" to="/shop">
            Continue Shopping
          </Link>
        </article>
      </section>
    )
  }

  if (cartItems.length === 0) {
    return (
      <section className="checkout-page">
        <h1 className="page-title">Checkout</h1>
        <p className="status-message">Your cart is empty. Add items before checkout.</p>
        <Link className="btn-primary" to="/shop">
          Continue Shopping
        </Link>
      </section>
    )
  }

  function handlePlaceOrder() {
    clearCart()
    setOrderPlaced(true)
  }

  return (
    <section className="checkout-page">
      <h1 className="page-title">Checkout</h1>
      <div className="checkout-layout">
        <article className="checkout-card">
          <h2>Delivery Address</h2>
          <p>Intern Name</p>
          <p>Prodesk IT Street</p>
          <p>Delhi, India</p>
        </article>

        <article className="checkout-card">
          <h2>Payment Method</h2>
          <p>Cash on Delivery</p>
          <p>UPI / Card integration can be added later.</p>
        </article>

        <article className="checkout-card">
          <h2>Order Review</h2>
          <p>Products: {cartCount}</p>
          <p className="summary-total">Payable: Rs. {cartSubtotal}</p>
          <button className="btn-primary" type="button" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </article>
      </div>
    </section>
  )
}

export default CheckoutPage
