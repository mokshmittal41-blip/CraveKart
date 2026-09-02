import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const [addressData, setAddressData] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '9876543210',
    street: '',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '',
    deliveryNotes: '',
  });

  const [paymentMode, setPaymentMode] = useState('cod');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '4532 •••• •••• 8890',
    cardExpiry: '12/28',
    cardCvv: '321',
  });
  const [upiId, setUpiId] = useState('student@okaxis');

  const [formErrors, setFormErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!addressData.fullName.trim()) errors.fullName = 'Full name is required.';
    if (!addressData.phone.trim()) errors.phone = 'Phone number is required.';
    if (!addressData.street.trim()) errors.street = 'Street address / Flat number is required.';
    if (!addressData.city.trim()) errors.city = 'City is required.';
    if (!addressData.pincode.trim() || !/^\d{6}$/.test(addressData.pincode)) {
      errors.pincode = 'Valid 6-digit PIN code is required.';
    }

    if (paymentMode === 'upi' && !upiId.includes('@')) {
      errors.upiId = 'Please enter a valid UPI ID.';
    }

    return errors;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!cart || cart.length === 0) {
      if (onShowToast) onShowToast('Your cart is empty!', 'warning');
      navigate('/menu');
      return;
    }

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      if (onShowToast) onShowToast('Please fill all mandatory delivery fields.', 'error');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const newOrder = {
        orderId: 'CK-' + Math.floor(100000 + Math.random() * 900000),
        placedAt: new Date().toLocaleString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
        userEmail: user?.email || 'guest@cravekart.com',
        userName: addressData.fullName,
        items: [...cart],
        subtotal,
        deliveryFee,
        tax,
        grandTotal,
        paymentMode: paymentMode.toUpperCase(),
        deliveryAddress: {
          street: addressData.street,
          city: addressData.city,
          state: addressData.state,
          pincode: addressData.pincode,
          phone: addressData.phone,
        },
        deliveryNotes: addressData.deliveryNotes,
        status: 'Preparing in Kitchen',
        estimatedDelivery: '30-35 mins',
      };

      if (onPlaceOrder) {
        onPlaceOrder(newOrder);
      }

      if (onClearCart) {
        onClearCart();
      }

      setIsProcessing(false);
      setPlacedOrder(newOrder);
      if (onShowToast) onShowToast('Order placed successfully! 🎉', 'success');
    }, 1000);
  };

  const handleQuickFillAddress = () => {
    setAddressData({
      fullName: user?.name || 'Guest User',
      phone: '9820198201',
      street: 'Flat 402, Sunshine Gourmet Apartments, Orchard Lane',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      deliveryNotes: 'Please ring the bell twice and leave near doorstep.',
    });
    setFormErrors({});
  };

  if (placedOrder) {
    return (
      <main className="order-success-page">
        <div className="section-container">
          <div className="order-success-card">
            <div className="success-icon-animation">🎉</div>
            <span className="success-badge">Order Confirmed!</span>
            <h1 className="success-title">Thank You For Your Order!</h1>
            <p className="success-subtitle">
              Your order <strong className="order-id-highlight">#{placedOrder.orderId}</strong> has been received by our kitchen and is now being prepared fresh.
            </p>

            <div className="order-quick-summary">
              <div className="summary-item">
                <span>Estimated Time:</span>
                <strong>⏱️ {placedOrder.estimatedDelivery}</strong>
              </div>
              <div className="summary-item">
                <span>Total Paid / Payable:</span>
                <strong>₹{placedOrder.grandTotal}</strong>
              </div>
              <div className="summary-item">
                <span>Payment Mode:</span>
                <strong>{placedOrder.paymentMode}</strong>
              </div>
              <div className="summary-item">
                <span>Delivering To:</span>
                <strong>{placedOrder.deliveryAddress.street}, {placedOrder.deliveryAddress.city}</strong>
              </div>
            </div>

            <div className="success-actions">
              <Link to="/orders" className="btn btn-primary btn-lg">
                Track in Order History ➔
              </Link>
              <Link to="/menu" className="btn btn-secondary btn-lg">
                Order More Food
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <main className="checkout-empty-page">
        <div className="section-container text-center">
          <h2>Your Cart is Empty</h2>
          <p>You cannot proceed to checkout with an empty cart.</p>
          <Link to="/menu" className="btn btn-primary">
            Browse Menu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <section className="checkout-header">
        <div className="section-container">
          <h1 className="page-title">Finalize Your Order</h1>
          <p className="page-subtitle">Provide delivery details and choose your preferred payment method.</p>
        </div>
      </section>

      <section className="checkout-content">
        <div className="section-container">
          <div className="checkout-grid">
            <div className="checkout-forms-column">
              <div className="checkout-card">
                <div className="card-header-flex">
                  <h2 className="card-heading">📍 1. Delivery Address</h2>
                  <button
                    type="button"
                    className="btn-demo-autofill"
                    onClick={handleQuickFillAddress}
                  >
                    Quick Fill Address
                  </button>
                </div>

                <form id="checkout-form" onSubmit={handlePlaceOrder} noValidate>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label htmlFor="addr-name" className="form-label">Recipient Full Name *</label>
                      <input
                        id="addr-name"
                        type="text"
                        name="fullName"
                        className={`form-input ${formErrors.fullName ? 'input-error' : ''}`}
                        value={addressData.fullName}
                        onChange={handleAddressChange}
                        required
                      />
                      {formErrors.fullName && <span className="error-message">{formErrors.fullName}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="addr-phone" className="form-label">Phone Number *</label>
                      <input
                        id="addr-phone"
                        type="tel"
                        name="phone"
                        className={`form-input ${formErrors.phone ? 'input-error' : ''}`}
                        value={addressData.phone}
                        onChange={handleAddressChange}
                        required
                      />
                      {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="addr-street" className="form-label">Street Address / House / Flat No. *</label>
                    <input
                      id="addr-street"
                      type="text"
                      name="street"
                      placeholder="e.g. Flat 302, Green Valley Towers, Main Rd"
                      className={`form-input ${formErrors.street ? 'input-error' : ''}`}
                      value={addressData.street}
                      onChange={handleAddressChange}
                      required
                    />
                    {formErrors.street && <span className="error-message">{formErrors.street}</span>}
                  </div>

                  <div className="form-grid-3">
                    <div className="form-group">
                      <label htmlFor="addr-city" className="form-label">City *</label>
                      <input
                        id="addr-city"
                        type="text"
                        name="city"
                        className={`form-input ${formErrors.city ? 'input-error' : ''}`}
                        value={addressData.city}
                        onChange={handleAddressChange}
                        required
                      />
                      {formErrors.city && <span className="error-message">{formErrors.city}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="addr-state" className="form-label">State</label>
                      <input
                        id="addr-state"
                        type="text"
                        name="state"
                        className="form-input"
                        value={addressData.state}
                        onChange={handleAddressChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="addr-pin" className="form-label">PIN Code *</label>
                      <input
                        id="addr-pin"
                        type="text"
                        name="pincode"
                        placeholder="6 digits"
                        className={`form-input ${formErrors.pincode ? 'input-error' : ''}`}
                        value={addressData.pincode}
                        onChange={handleAddressChange}
                        maxLength={6}
                        required
                      />
                      {formErrors.pincode && <span className="error-message">{formErrors.pincode}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="addr-notes" className="form-label">Delivery Instructions (Optional)</label>
                    <textarea
                      id="addr-notes"
                      name="deliveryNotes"
                      rows={2}
                      placeholder="e.g. Leave with security guard, don't ring bell"
                      className="form-textarea"
                      value={addressData.deliveryNotes}
                      onChange={handleAddressChange}
                    />
                  </div>
                </form>
              </div>

              <div className="checkout-card">
                <h2 className="card-heading">💳 2. Payment Method</h2>
                
                <div className="payment-options-list">
                  <label className={`payment-option ${paymentMode === 'cod' ? 'option-selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMode"
                      value="cod"
                      checked={paymentMode === 'cod'}
                      onChange={(e) => setPaymentMode(e.target.value)}
                    />
                    <div className="option-info">
                      <div className="option-title-row">
                        <span className="option-icon">💵</span>
                        <strong>Cash / Pay on Delivery</strong>
                      </div>
                      <p className="option-desc">Pay via cash or UPI to the delivery rider when food arrives.</p>
                    </div>
                  </label>

                  <label className={`payment-option ${paymentMode === 'upi' ? 'option-selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMode"
                      value="upi"
                      checked={paymentMode === 'upi'}
                      onChange={(e) => setPaymentMode(e.target.value)}
                    />
                    <div className="option-info">
                      <div className="option-title-row">
                        <span className="option-icon">📱</span>
                        <strong>UPI (Google Pay, PhonePe, Paytm)</strong>
                      </div>
                      <p className="option-desc">Instant payment via your preferred UPI application.</p>
                    </div>
                  </label>

                  {paymentMode === 'upi' && (
                    <div className="payment-extra-inputs">
                      <label htmlFor="upi-id" className="form-label">Your UPI ID</label>
                      <input
                        id="upi-id"
                        type="text"
                        className="form-input"
                        placeholder="e.g. user@okhdfcbank"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                      />
                    </div>
                  )}

                  <label className={`payment-option ${paymentMode === 'card' ? 'option-selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMode"
                      value="card"
                      checked={paymentMode === 'card'}
                      onChange={(e) => setPaymentMode(e.target.value)}
                    />
                    <div className="option-info">
                      <div className="option-title-row">
                        <span className="option-icon">💳</span>
                        <strong>Credit / Debit Card</strong>
                      </div>
                      <p className="option-desc">Visa, Mastercard, RuPay & Amex accepted.</p>
                    </div>
                  </label>

                  {paymentMode === 'card' && (
                    <div className="payment-extra-inputs card-inputs-grid">
                      <div className="form-group">
                        <label className="form-label">Card Number</label>
                        <input
                          type="text"
                          className="form-input"
                          value={cardDetails.cardNumber}
                          onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                        />
                      </div>
                      <div className="form-grid-2">
                        <div className="form-group">
                          <label className="form-label">Expiry (MM/YY)</label>
                          <input
                            type="text"
                            className="form-input"
                            value={cardDetails.cardExpiry}
                            onChange={(e) => setCardDetails({ ...cardDetails, cardExpiry: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">CVV</label>
                          <input
                            type="password"
                            maxLength={3}
                            className="form-input"
                            value={cardDetails.cardCvv}
                            onChange={(e) => setCardDetails({ ...cardDetails, cardCvv: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="checkout-summary-column">
              <aside className="checkout-review-card">
                <h3 className="review-title">Items in Order ({cart.length})</h3>
                
                <div className="review-items-list">
                  {cart.map((item) => (
                    <div key={item.id} className="review-item-row">
                      <div className="review-item-main">
                        <span className="review-item-qty">{item.quantity}x</span>
                        <span className="review-item-name">{item.name}</span>
                      </div>
                      <span className="review-item-price">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="summary-divider"></div>

                <div className="summary-breakdown">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="summary-row">
                    <span>GST (5%)</span>
                    <span>₹{tax}</span>
                  </div>
                  <div className="summary-row">
                    <span>Delivery</span>
                    <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                  </div>
                  <div className="summary-divider"></div>
                  <div className="summary-row grand-total-row">
                    <strong>Total Payable</strong>
                    <strong className="grand-total-price">₹{grandTotal}</strong>
                  </div>
                </div>

                <button
                  type="submit"
                  form="checkout-form"
                  className="btn btn-primary btn-block btn-place-order"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing Order...' : `Place Order • ₹${grandTotal}`}
                </button>

                <p className="order-terms-note">
                  By placing order, you agree to CraveKart's hygiene and delivery guidelines.
                </p>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
