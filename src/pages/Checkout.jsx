import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Checkout({
  cart,
  subtotal,
  deliveryFee,
  tax,
  grandTotal,
  user,
  onPlaceOrder,
  onClearCart,
  onShowToast,
}) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: '',
    city: 'Mumbai',
    pincode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponStatus, setCouponStatus] = useState({ message: '', isSuccess: false });
  const [errorMessage, setErrorMessage] = useState('');
  const [placedOrder, setPlacedOrder] = useState(null);

  const finalTotal = Math.max(0, grandTotal - appliedDiscount);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorMessage('');
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();

    if (!cleanCode) {
      setCouponStatus({ message: 'Please enter a coupon code.', isSuccess: false });
      return;
    }

    if (cleanCode === 'CRAVE20') {
      if (subtotal < 399) {
        setCouponStatus({ message: 'CRAVE20 requires minimum order of ₹399.', isSuccess: false });
        setAppliedDiscount(0);
        return;
      }

      const discount = Math.round(subtotal * 0.2);
      setAppliedDiscount(discount);
      setCouponStatus({ message: `CRAVE20 applied! You saved ₹${discount} (20% OFF)`, isSuccess: true });
      if (onShowToast) {
        onShowToast(`Coupon CRAVE20 applied! Saved ₹${discount}`, 'success');
      }
    } else {
      setCouponStatus({ message: 'Invalid coupon code. Try CRAVE20', isSuccess: false });
      setAppliedDiscount(0);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode('');
    setAppliedDiscount(0);
    setCouponStatus({ message: '', isSuccess: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim() || !formData.city.trim() || !formData.pincode.trim()) {
      setErrorMessage('Please fill in all the required delivery fields.');
      return;
    }

    if (formData.phone.trim().length < 10) {
      setErrorMessage('Please enter a valid 10-digit phone number.');
      return;
    }

    if (formData.pincode.trim().length !== 6) {
      setErrorMessage('Please enter a valid 6-digit pincode.');
      return;
    }

    const newOrder = {
      orderId: 'CK-' + Math.floor(100000 + Math.random() * 900000),
      placedAt: new Date().toLocaleDateString('en-IN') + ' ' + new Date().toLocaleTimeString('en-IN'),
      customerName: formData.name,
      phone: formData.phone,
      address: `${formData.address}, ${formData.city} - ${formData.pincode}`,
      paymentMethod: paymentMethod,
      items: cart ? [...cart] : [],
      subtotal: subtotal,
      discount: appliedDiscount,
      totalAmount: finalTotal,
      status: 'Order Confirmed',
    };

    if (onPlaceOrder) {
      onPlaceOrder(newOrder);
    }

    if (onClearCart) {
      onClearCart();
    }

    if (onShowToast) {
      onShowToast('Order placed successfully! 🎉', 'success');
    }

    setPlacedOrder(newOrder);
  };

  if (placedOrder) {
    return (
      <main className="checkout-page">
        <div className="section-container">
          <div className="checkout-card text-center" style={{ maxWidth: '650px', margin: '3rem auto', padding: '2.5rem' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🎉</div>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Order Confirmed!</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Thank you for ordering with CraveKart. Your delicious food is being prepared!
            </p>

            <div style={{ backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', padding: '1.25rem', textAlign: 'left', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <strong>Order ID:</strong>
                <span style={{ color: 'var(--primary)', fontWeight: '700' }}>{placedOrder.orderId}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <strong>Delivering to:</strong>
                <span>{placedOrder.customerName} ({placedOrder.phone})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <strong>Address:</strong>
                <span>{placedOrder.address}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <strong>Payment Mode:</strong>
                <span>{placedOrder.paymentMethod}</span>
              </div>
              {placedOrder.discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--veg-green)' }}>
                  <strong>Coupon Discount (CRAVE20):</strong>
                  <strong>-₹{placedOrder.discount}</strong>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)', marginTop: '0.5rem' }}>
                <strong>Total Paid:</strong>
                <strong style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>₹{placedOrder.totalAmount}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/orders" className="btn btn-primary">
                View My Orders
              </Link>
              <Link to="/" className="btn btn-secondary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <main className="checkout-page">
        <div className="section-container text-center" style={{ padding: '4rem 1rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
          <h2>Your Cart is Empty</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Please add some delicious food to your cart before proceeding to checkout.
          </p>
          <Link to="/menu" className="btn btn-primary">
            Explore Menu Now
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="section-container">
        <div className="checkout-header" style={{ padding: '2.5rem 0 1.5rem 0' }}>
          <h1 className="page-title">Checkout</h1>
          <p className="page-subtitle">Enter your delivery address and choose your payment method.</p>
        </div>

        {errorMessage && (
          <div style={{ backgroundColor: 'var(--non-veg-bg)', color: 'var(--non-veg-red)', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid #fecaca' }}>
            ⚠️ {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="checkout-grid">
          <div className="checkout-left">
            <div className="checkout-card">
              <h2 className="card-heading" style={{ marginBottom: '1.25rem' }}>1. Delivery Address</h2>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">Full Name *</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">Phone Number *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="form-input"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="address">Street Address / Hostel / Flat *</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  className="form-input"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="e.g. Room 204, Boys Hostel 3 or Flat 4B, Green Avenue"
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="city">City *</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    className="form-input"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="pincode">Pincode *</label>
                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    className="form-input"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="6-digit pincode"
                  />
                </div>
              </div>
            </div>

            <div className="checkout-card">
              <h2 className="card-heading" style={{ marginBottom: '1.25rem' }}>2. Payment Method</h2>

              <div className="payment-options-list">
                <label className={`payment-option ${paymentMethod === 'Cash on Delivery' ? 'option-selected' : ''}`} style={{ cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash on Delivery"
                    checked={paymentMethod === 'Cash on Delivery'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div>
                    <strong>💵 Cash on Delivery (COD)</strong>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Pay with cash or UPI when your food arrives.</p>
                  </div>
                </label>

                <label className={`payment-option ${paymentMethod === 'UPI / GPay / PhonePe' ? 'option-selected' : ''}`} style={{ cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="UPI / GPay / PhonePe"
                    checked={paymentMethod === 'UPI / GPay / PhonePe'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div>
                    <strong>📱 UPI (Google Pay, PhonePe, Paytm)</strong>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Instant online payment via UPI app.</p>
                  </div>
                </label>

                <label className={`payment-option ${paymentMethod === 'Credit / Debit Card' ? 'option-selected' : ''}`} style={{ cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Credit / Debit Card"
                    checked={paymentMethod === 'Credit / Debit Card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div>
                    <strong>💳 Credit or Debit Card</strong>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Visa, Mastercard, RuPay cards accepted.</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="checkout-right">
            <div className="order-summary-card">
              <h2 className="summary-title">Order Summary</h2>

              <div style={{ marginBottom: '1rem', maxHeight: '180px', overflowY: 'auto' }}>
                {cart.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', fontSize: '0.9rem' }}>
                    <span>{item.name} × {item.quantity}</span>
                    <strong>₹{item.price * item.quantity}</strong>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                <label className="form-label" style={{ fontSize: '0.85rem' }}>Apply Coupon Code</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter code (e.g. CRAVE20)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={appliedDiscount > 0}
                    style={{ textTransform: 'uppercase', fontSize: '0.9rem', padding: '0.5rem 0.75rem' }}
                  />
                  {appliedDiscount > 0 ? (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleRemoveCoupon}
                      style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleApplyCoupon}
                      style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                    >
                      Apply
                    </button>
                  )}
                </div>
                {couponStatus.message && (
                  <div style={{ fontSize: '0.82rem', marginTop: '0.4rem', fontWeight: '600', color: couponStatus.isSuccess ? 'var(--veg-green)' : 'var(--error)' }}>
                    {couponStatus.message}
                  </div>
                )}
              </div>

              <div className="summary-breakdown">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Partner Fee</span>
                  <span>{deliveryFee === 0 ? <strong className="text-free-delivery">FREE</strong> : `₹${deliveryFee}`}</span>
                </div>
                <div className="summary-row">
                  <span>Taxes (GST 5%)</span>
                  <span>₹{tax}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="summary-row" style={{ color: 'var(--veg-green)', fontWeight: '600' }}>
                    <span>Coupon Discount (20%)</span>
                    <span>-₹{appliedDiscount}</span>
                  </div>
                )}
                <div className="summary-divider"></div>
                <div className="summary-row grand-total-row">
                  <strong>Total Amount</strong>
                  <strong className="grand-total-price">₹{finalTotal}</strong>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block btn-place-order">
                Place Order (₹{finalTotal}) ➔
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
