import React from 'react';
import { Link } from 'react-router-dom';

export default function CartItem({ item, onUpdateQuantity, onRemoveItem }) {
  const lineTotal = item.price * item.quantity;

  return (
    <div className="cart-item-row" id={`cart-item-${item.id}`}>
      <div className="cart-item-image-box">
        <Link to={`/menu/${item.id}`}>
          <img src={item.image} alt={item.name} className="cart-item-img" />
        </Link>
      </div>

      <div className="cart-item-info">
        <div className="cart-item-title-row">
          <span 
            className={`diet-badge-sm ${item.isVeg ? 'veg' : 'non-veg'}`}
            title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
          >
            <span className="diet-dot-sm"></span>
          </span>
          <h4 className="cart-item-name">
            <Link to={`/menu/${item.id}`}>{item.name}</Link>
          </h4>
        </div>
        <p className="cart-item-unit-price">₹{item.price} each</p>
      </div>

      <div className="cart-item-controls">
        <div className="quantity-stepper" role="group" aria-label="Quantity adjustment">
          <button
            type="button"
            className="stepper-btn btn-decrease"
            onClick={() => onUpdateQuantity(item.id, -1)}
            aria-label={`Decrease quantity of ${item.name}`}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="stepper-count" aria-live="polite">{item.quantity}</span>
          <button
            type="button"
            className="stepper-btn btn-increase"
            onClick={() => onUpdateQuantity(item.id, 1)}
            aria-label={`Increase quantity of ${item.name}`}
          >
            +
          </button>
        </div>
      </div>

      <div className="cart-item-subtotal">
        <span className="line-total-price">₹{lineTotal}</span>
      </div>

      <div className="cart-item-action">
        <button
          type="button"
          className="btn-remove-item"
          onClick={() => onRemoveItem(item.id)}
          aria-label={`Remove ${item.name} from cart`}
          title="Remove item"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
