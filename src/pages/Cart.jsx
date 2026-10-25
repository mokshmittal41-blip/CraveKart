import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';

export default function Cart({
  cart,
  totalItems,
  subtotal,
  deliveryFee,
  tax,
  grandTotal,
  amountNeededForFreeDelivery,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onShowToast,
}) {
  if (!cart || cart.length === 0) {
    return (
      <main className="cart-page-empty">
        <div className="section-container text-center">
          <div className="empty-cart-graphic">🛒</div>
          <h1 className="empty-cart-title">Your CraveKart is Empty</h1>
          <p className="empty-cart-desc">
            Looks like you haven't added any mouth-watering dishes to your cart yet. Explore our chef's specialties and satisfy your cravings!
          </p>
          <Link to="/menu" className="btn btn-primary btn-lg">
            Explore Menu Now ➔
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <section className="cart-header-section">
        <div className="section-container">
          <h1 className="page-title">Your Food Cart</h1>
          <p className="page-subtitle">Review your selected gourmet dishes before proceeding to checkout.</p>
        </div>
      </section>

      <section className="cart-content-section">
        <div className="section-container">
          {amountNeededForFreeDelivery > 0 ? (
            <div className="free-delivery-tracker">
              <span className="tracker-icon">🚚</span>
              <span className="tracker-text">
                Add <strong>₹{amountNeededForFreeDelivery}</strong> more of delicious food to unlock <strong>FREE Delivery</strong>!
              </span>
            </div>
          ) : (
            <div className="free-delivery-tracker free-delivery-unlocked">
              <span className="tracker-icon">🎉</span>
              <span className="tracker-text">
                <strong>Congratulations!</strong> You have unlocked <strong>FREE Delivery</strong> on this order!
              </span>
            </div>
          )}

          <div className="cart-grid-layout">
            <div className="cart-items-container">
              <div className="cart-items-header">
                <h2>Cart Items ({totalItems})</h2>
                <button
                  type="button"
                  className="btn-clear-cart"
                  onClick={onClearCart}
                >
                  Clear Cart 🗑️
                </button>
              </div>

              <div className="cart-items-list">
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemoveItem={onRemoveItem}
                  />
                ))}
              </div>

              <div className="continue-shopping-row">
                <Link to="/menu" className="btn-link-back">
                  ← Add More Dishes from Menu
                </Link>
              </div>
            </div>

            <div className="cart-summary-container">
              <aside className="order-summary-card" aria-label="Order Summary">
                <h3 className="summary-title">Order Summary</h3>

                <div className="summary-breakdown">
                  <div className="summary-row">
                    <span>Items Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>

                  <div className="summary-row">
                    <span>GST & Restaurant Tax (5%)</span>
                    <span>₹{tax}</span>
                  </div>

                  <div className="summary-row">
                    <span>Delivery Partner Fee</span>
                    <span>
                      {deliveryFee === 0 ? (
                        <strong className="text-free-delivery">FREE</strong>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>

                  <div className="summary-divider"></div>

                  <div className="summary-row grand-total-row">
                    <strong>Total Amount</strong>
                    <strong className="grand-total-price">₹{grandTotal}</strong>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="btn btn-primary btn-block btn-checkout"
                >
                  Proceed to Checkout ➔
                </Link>

                <div className="security-badge-row">
                  <span>🔒 Safe & Secure Checkout</span>
                  <span>⚡ Instant Confirmation</span>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
