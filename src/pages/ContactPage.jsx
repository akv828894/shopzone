function ContactPage() {
  return (
    <section className="support-page">
      <h1 className="page-title">Customer Support</h1>
      <p className="page-subtitle">Have a blocker? We usually reply within 24 hours.</p>

      <form className="contact-form">
        <label>
          Full Name
          <input type="text" placeholder="Enter your full name" />
        </label>

        <label>
          Email
          <input type="email" placeholder="Enter your email" />
        </label>

        <label>
          Order / Query Type
          <select defaultValue="general">
            <option value="general">General question</option>
            <option value="order">Order update</option>
            <option value="refund">Refund / return</option>
            <option value="technical">Technical issue</option>
          </select>
        </label>

        <label>
          Message
          <textarea rows="5" placeholder="Type your message" />
        </label>

        <button type="button" className="btn-primary">
          Submit Request
        </button>
      </form>
    </section>
  )
}

export default ContactPage
