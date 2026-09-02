import React, { useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import DishCard from '../components/DishCard';
import menuData from '../data/menu.json';

export default function DishDetail({ onAddToCart }) {
  const { dishId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const dish = menuData.find((item) => item.id === dishId);

  const handleAddToCart = useCallback(() => {
    if (!dish) return;
    if (onAddToCart) {
      onAddToCart(dish, quantity);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1500);
    }
  }, [dish, quantity, onAddToCart]);

  if (!dish) {
    return (
      <main className="dish-not-found-page">
        <div className="section-container text-center">
          <span className="not-found-icon">🍲</span>
          <h2>Dish Not Found</h2>
          <p>We couldn't locate the dish you're searching for.</p>
          <Link to="/menu" className="btn btn-primary">
            ← Back to Menu
          </Link>
        </div>
      </main>
    );
  }

  const relatedDishes = menuData
    .filter((item) => item.category === dish.category && item.id !== dish.id)
    .slice(0, 3);

  return (
    <main className="dish-detail-page">
      <nav className="breadcrumb-nav" aria-label="Breadcrumb">
        <div className="section-container">
          <ul className="breadcrumb-list">
            <li><Link to="/">Home</Link></li>
            <li><span className="breadcrumb-separator">/</span></li>
            <li><Link to="/menu">Menu</Link></li>
            <li><span className="breadcrumb-separator">/</span></li>
            <li><Link to={`/menu?category=${encodeURIComponent(dish.category)}`}>{dish.category}</Link></li>
            <li><span className="breadcrumb-separator">/</span></li>
            <li aria-current="page" className="breadcrumb-active">{dish.name}</li>
          </ul>
        </div>
      </nav>

      <section className="dish-detail-hero">
        <div className="section-container">
          <div className="dish-detail-layout">
            <div className="dish-detail-image-box">
              <img 
                src={dish.image} 
                alt={dish.name} 
                className="dish-detail-img"
              />
              <div className="dish-detail-floating-tags">
                <span className={`diet-badge-lg ${dish.isVeg ? 'veg' : 'non-veg'}`}>
                  <span className="diet-dot-lg"></span>
                  {dish.isVeg ? 'Vegetarian' : 'Non-Veg'}
                </span>
                <span className="spice-tag">🌶️ {dish.spicyLevel} Spice</span>
              </div>
            </div>

            <div className="dish-detail-info-box">
              <div className="dish-detail-header">
                <span className="dish-category-label">{dish.category}</span>
                <h1 className="dish-detail-title">{dish.name}</h1>
                
                <div className="dish-detail-ratings">
                  <span className="rating-pill">⭐ {dish.rating} / 5.0</span>
                  <span className="reviews-text">({dish.reviewsCount} customer reviews)</span>
                  <span className="bullet-sep">•</span>
                  <span className="preptime-text">⏱️ {dish.prepTime}</span>
                </div>
              </div>

              <div className="dish-detail-price-box">
                <span className="dish-detail-currency">₹</span>
                <span className="dish-detail-price">{dish.price}</span>
                <span className="tax-inclusive-tag">Inclusive of all taxes</span>
              </div>

              <p className="dish-detail-description">{dish.description}</p>

              <div className="nutrition-cards-grid">
                <div className="nutrition-card">
                  <span className="nutrition-label">Calories</span>
                  <strong className="nutrition-value">{dish.calories} kcal</strong>
                </div>
                <div className="nutrition-card">
                  <span className="nutrition-label">Spice Level</span>
                  <strong className="nutrition-value">{dish.spicyLevel}</strong>
                </div>
                <div className="nutrition-card">
                  <span className="nutrition-label">Prep Time</span>
                  <strong className="nutrition-value">{dish.prepTime}</strong>
                </div>
                <div className="nutrition-card">
                  <span className="nutrition-label">Food Type</span>
                  <strong className="nutrition-value">{dish.isVeg ? 'Pure Veg' : 'Non-Veg'}</strong>
                </div>
              </div>

              <div className="ingredients-section">
                <h3 className="section-subheading">Key Ingredients</h3>
                <div className="ingredients-pills">
                  {dish.ingredients.map((ingredient, idx) => (
                    <span key={idx} className="ingredient-pill">
                      🌿 {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              <div className="dish-detail-actions">
                <div className="detail-quantity-box">
                  <label htmlFor="dish-qty" className="qty-label">Quantity:</label>
                  <div className="quantity-stepper" id="dish-qty">
                    <button
                      type="button"
                      className="stepper-btn"
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="stepper-count">{quantity}</span>
                    <button
                      type="button"
                      className="stepper-btn"
                      onClick={() => setQuantity((prev) => prev + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className={`btn btn-primary btn-lg btn-add-cart-detail ${isAdded ? 'btn-success-active' : ''}`}
                  onClick={handleAddToCart}
                >
                  {isAdded ? '✓ Added to Cart!' : `Add to Cart • ₹${dish.price * quantity}`}
                </button>
              </div>

              <div className="delivery-guarantee-note">
                <span>🛡️ Safe packaging & 100% contactless delivery guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedDishes.length > 0 && (
        <section className="related-dishes-section">
          <div className="section-container">
            <h2 className="section-title">You Might Also Crave</h2>
            <div className="dishes-grid">
              {relatedDishes.map((item) => (
                <DishCard 
                  key={item.id} 
                  dish={item} 
                  onAddToCart={onAddToCart} 
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
