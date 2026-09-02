import React from 'react';
import { Link } from 'react-router-dom';

export default function Orders({ orders, user }) {
  if (!orders || orders.length === 0) {
    return (
      <main className="orders-empty-page">
        <div className="section-container text-center">
          <div className="empty-orders-graphic">📦</div>
          <h1 className="empty-orders-title">No Orders Placed Yet</h1>
          <p className="empty-orders-desc">
            Hi {user?.name?.split(' ')[0] || 'Foodie'}, you haven't placed any food orders with us yet.
            Your gourmet food journey is just a click away!
          </p>
          <Link to="/menu" className="btn btn-primary btn-lg">
            Explore Menu & Order Now ➔
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="orders-page">
      <section className="orders-header">
        <div className="section-container">
          <div className="orders-header-row">
            <div>
              <span className="section-tag">Account Dashboard</span>
              <h1 className="page-title">Your Order History</h1>
              <p className="page-subtitle">Track your recent food deliveries and past culinary delights.</p>
            </div>
            <Link to="/menu" className="btn btn-primary-sm">
              + New Order
            </Link>
          </div>
        </div>
      </section>

      <section className="orders-list-section">
        <div className="section-container">
          <div className="orders-timeline-container">
            {orders.map((order) => (
              <article key={order.orderId} className="order-history-card">
                <div className="order-card-header">
                  <div className="order-id-block">
                    <span className="order-id-label">ORDER ID</span>
                    <strong className="order-id-val">#{order.orderId}</strong>
                    <span className="order-date-text">• Placed on {order.placedAt}</span>
                  </div>

                  <div className="order-status-badge">
                    <span className="status-indicator-dot"></span>
                    <span className="status-text">{order.status || 'Delivered'}</span>
                  </div>
                </div>

                <div className="order-card-body">
                  <h3 className="order-items-heading">Ordered Items</h3>
                  <div className="order-items-grid">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="ordered-dish-item">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="ordered-dish-img"
                        />
                        <div className="ordered-dish-details">
                          <h4 className="ordered-dish-name">
                            <Link to={`/menu/${item.id}`}>{item.name}</Link>
                          </h4>
                          <p className="ordered-dish-meta">
                            Qty: <strong>{item.quantity}</strong> × ₹{item.price} = <strong>₹{item.price * item.quantity}</strong>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="order-card-footer">
                  <div className="order-delivery-info">
                    <span className="footer-label">Delivered To:</span>
                    <p className="footer-value">
                      {order.deliveryAddress.street}, {order.deliveryAddress.city} - {order.deliveryAddress.pincode}
                    </p>
                    {order.deliveryNotes && (
                      <small className="footer-notes">Note: "{order.deliveryNotes}"</small>
                    )}
                  </div>

                  <div className="order-payment-info">
                    <div className="order-paid-amount">
                      <span className="footer-label">Total Amount Paid</span>
                      <strong className="order-grand-price">₹{order.grandTotal}</strong>
                      <span className="payment-mode-tag">Paid via {order.paymentMode}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
