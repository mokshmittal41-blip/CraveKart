import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function DishCard({ dish, onAddToCart }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onAddToCart) {
      onAddToCart(dish, 1);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1200);
    }
  };

  return (
    <article className="dish-card" id={`dish-${dish.id}`}>
      <div className="dish-card-image-wrapper">
        <Link to={`/menu/${dish.id}`} aria-label={`View details of ${dish.name}`}>
          <img 
            src={dish.image} 
            alt={dish.name} 
            className="dish-card-image"
            loading="lazy"
          />
        </Link>
        
        <div 
          className={`diet-badge ${dish.isVeg ? 'veg' : 'non-veg'}`}
          title={dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
        >
          <span className="diet-dot"></span>
        </div>

        <span className="dish-category-tag">{dish.category}</span>
      </div>

      <div className="dish-card-content">
        <div className="dish-meta-bar">
          <span className="dish-rating" title={`${dish.rating} out of 5 stars`}>
            ⭐ {dish.rating} <small>({dish.reviewsCount})</small>
          </span>
          <span className="dish-preptime">⏱️ {dish.prepTime}</span>
        </div>

        <h3 className="dish-title">
          <Link to={`/menu/${dish.id}`} className="dish-title-link">
            {dish.name}
          </Link>
        </h3>

        <p className="dish-description">{dish.description}</p>

        <div className="dish-card-footer">
          <div className="dish-price-wrap">
            <span className="currency-symbol">₹</span>
            <span className="dish-price">{dish.price}</span>
          </div>

          <button
            type="button"
            className={`btn-add-cart ${isAdded ? 'btn-added' : ''}`}
            onClick={handleAddClick}
            aria-label={`Add ${dish.name} to cart`}
          >
            {isAdded ? 'Added ✓' : '+ Add'}
          </button>
        </div>
      </div>
    </article>
  );
}
