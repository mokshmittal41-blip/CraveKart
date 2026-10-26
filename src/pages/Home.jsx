import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DishCard from '../components/DishCard';
import menuData from '../data/menu.json';

/**
 * Home Page Component
 * -------------------------------------------------------------
 * Concepts covered from Syllabus:
 * - HTML5 Semantic elements (<main>, <section>, <h2>, <p>) (Topics 1-6)
 * - CSS Flexbox & CSS Grid for responsive layouts (Topics 1-6)
 * - React useState hook for interactive UI state (Topics 31-36)
 * - Array methods: filter() and map() for dynamic rendering (Topics 7-18 & 25-30)
 * - Event handling (onClick) & conditional styling (Topics 19-24 & 25-30)
 * - Passing props to reusable components (DishCard) (Topics 25-30)
 * - React Router navigation (<Link>) (Topics 37-42)
 */
export default function Home({ onAddToCart, onOpenSurprise }) {
  const navigate = useNavigate();
  // 1. React State: Category filter tab (Syllabus Topics 31-36)
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 2. React State: Track coupon copy status
  const [isCopied, setIsCopied] = useState(false);

  // Categories list for quick filtering
  const categories = [
    'All',
    'Burgers',
    'Pizzas',
    'Pastas & Bowls',
    'Starters',
    'Desserts',
    'Beverages',
  ];

  // 3. Filter dishes based on selected category (Syllabus Topics 13-18 & 25-30)
  // If 'All' is chosen, show featured items; otherwise show dishes of the chosen category
  const displayedDishes = selectedCategory === 'All'
    ? menuData.filter((dish) => dish.isFeatured)
    : menuData.filter((dish) => dish.category === selectedCategory);

  // 4. Event Handler: Copy promo coupon to clipboard (Syllabus Topics 19-24)
  const handleCopyCoupon = () => {
    navigator.clipboard.writeText('CRAVE50');
    setIsCopied(true);
    // Reset back after 2 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <main className="home-page">
      {/* ========================================================= */}
      {/* SECTION 1: HERO SECTION                                   */}
      {/* ========================================================= */}
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-container">
          {/* Left Column: Heading, description, and primary CTA */}
          <div className="hero-content">
            <span className="hero-badge">🍽️ Fast & Fresh Food Delivery</span>
            
            <h1 id="hero-title" className="hero-title">
              Delicious Food Delivered Straight To Your Door
            </h1>
            
            <p className="hero-subtitle">
              Craving something good? Choose from our freshly prepared artisan burgers, 
              wood-fired pizzas, authentic pastas, and desserts — delivered hot to your doorstep in 30 minutes.
            </p>

            <div className="hero-cta-group">
              <Link to="/menu" className="btn btn-primary btn-lg">
                Explore Full Menu →
              </Link>
              <button
                type="button"
                onClick={onOpenSurprise}
                className="btn btn-surprise btn-lg"
              >
                Surprise Me 🎲
              </button>
              <Link to="/about" className="btn btn-secondary btn-lg">
                About Our Kitchen
              </Link>
            </div>

            {/* Quick trust metrics */}
            <div className="hero-stats">
              <div className="stat-item">
                <strong className="stat-number">30 Mins</strong>
                <span className="stat-label">Average Delivery</span>
              </div>
              <div className="stat-divider" aria-hidden="true"></div>
              <div className="stat-item">
                <strong className="stat-number">4.8 / 5</strong>
                <span className="stat-label">Customer Rating</span>
              </div>
              <div className="stat-divider" aria-hidden="true"></div>
              <div className="stat-item">
                <strong className="stat-number">100%</strong>
                <span className="stat-label">Fresh & Hygienic</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean food visual */}
          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80"
                alt="Appetizing meal spread with burgers, pasta, and pizza"
                className="hero-main-img"
              />
              <div className="hero-image-note">
                <span className="note-dot" aria-hidden="true"></span>
                <span>Chef's Choice • Cooked Fresh Daily to Order</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 2: INTERACTIVE CATEGORY FILTER & DISHES            */}
      {/* ========================================================= */}
      <section className="featured-section" aria-labelledby="dishes-heading">
        <div className="section-container">
          <div className="section-header text-center">
            <span className="section-tag">Explore Menu</span>
            <h2 id="dishes-heading" className="section-title">Popular Dishes & Specialties</h2>
            <p className="section-desc">
              Filter by your favorite food category or view our chef's top recommendations.
            </p>
          </div>

          {/* Category Filter Tabs (Syllabus Topics 61-66: Tabs & filter patterns) */}
          <div className="category-tabs" role="tablist" aria-label="Food category filter">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={selectedCategory === category}
                className={`category-tab-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Dishes Grid: Rendered using map() (Syllabus Topics 25-30) */}
          <div className="dishes-grid">
            {displayedDishes.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>

          {/* View Full Menu Button */}
          <div className="home-view-all-box text-center">
            <p>Looking for our complete selection with sorting, dietary filters, and reviews?</p>
            <Link to="/menu" className="btn btn-secondary">
              View All {menuData.length} Dishes →
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 3: HOW TO ORDER (3 SIMPLE STEPS)                   */}
      {/* ========================================================= */}
      <section className="how-it-works-section" aria-labelledby="how-it-works-heading">
        <div className="section-container">
          <div className="section-header text-center">
            <span className="section-tag">Easy Ordering</span>
            <h2 id="how-it-works-heading" className="section-title">How CraveKart Works</h2>
            <p className="section-desc">Order your favorite meals in three simple steps.</p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number" aria-hidden="true">1</div>
              <div className="step-icon" aria-hidden="true">📋</div>
              <h3 className="step-title">Choose Your Food</h3>
              <p className="step-desc">
                Browse our easy-to-read menu, check ingredients and ratings, and pick the meals you love.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number" aria-hidden="true">2</div>
              <div className="step-icon" aria-hidden="true">🛒</div>
              <h3 className="step-title">Add to Cart & Order</h3>
              <p className="step-desc">
                Review your items in the cart, fill in your delivery address, and place your order in seconds.
              </p>
            </div>

            <div className="step-card">
              <div className="step-number" aria-hidden="true">3</div>
              <div className="step-icon" aria-hidden="true">🛵</div>
              <h3 className="step-title">Fast Delivery</h3>
              <p className="step-desc">
                Our kitchen prepares your order fresh, and our delivery rider brings it hot to your door within 30 minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 4: STUDENT & NEW USER PROMO BANNER                 */}
      {/* ========================================================= */}
      <section className="promo-banner-section" aria-label="First order discount">
        <div className="section-container">
          <div className="promo-banner-card">
            <div className="promo-content">
              <span className="promo-tag">Special Offer</span>
              <h2 className="promo-title">Get ₹50 OFF Your Order!</h2>
              <p className="promo-text">
                Enjoy fresh and delicious meals at budget-friendly prices. Apply the coupon code 
                during checkout on any order above ₹199.
              </p>
              
              <div className="promo-code-box">
                <span className="promo-code-label">Coupon Code:</span>
                <strong className="promo-code">CRAVE50</strong>
                <button
                  type="button"
                  className="btn btn-primary-sm copy-btn"
                  onClick={handleCopyCoupon}
                  aria-label="Copy discount code CRAVE50 to clipboard"
                >
                  {isCopied ? '✓ Copied!' : 'Copy Code'}
                </button>
              </div>
            </div>

            <div className="promo-image-box">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
                alt="Chef preparing fresh artisan pizzas"
                className="promo-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 5: WHY CHOOSE US                                  */}
      {/* ========================================================= */}
      <section className="features-section" aria-labelledby="why-us-heading">
        <div className="section-container">
          <div className="section-header text-center">
            <span className="section-tag">Our Promise</span>
            <h2 id="why-us-heading" className="section-title">Why Foodies Love CraveKart</h2>
            <p className="section-desc">
              We focus on fresh taste, hygienic prep, and fast delivery so you can order with peace of mind.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-box" aria-hidden="true">🥦</div>
              <h3 className="feature-title">Fresh Daily Ingredients</h3>
              <p className="feature-text">
                Vegetables and ingredients sourced every morning from trusted local markets for maximum freshness.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box" aria-hidden="true">👨‍🍳</div>
              <h3 className="feature-title">Cooked to Order</h3>
              <p className="feature-text">
                Every dish is prepared fresh upon receiving your order by passionate, experienced cooks.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box" aria-hidden="true">⚡</div>
              <h3 className="feature-title">30-Minute Fast Delivery</h3>
              <p className="feature-text">
                Efficient kitchen turnaround and direct delivery to make sure your food arrives steaming hot.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box" aria-hidden="true">🧼</div>
              <h3 className="feature-title">Hygienic & Safe</h3>
              <p className="feature-text">
                Prepared in clean, inspected kitchens with secure tamper-proof packaging for safety.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
