import React from 'react';
import { Link } from 'react-router-dom';
import DishCard from '../components/DishCard';
import menuData from '../data/menu.json';

export default function Home({ onAddToCart }) {
  const featuredDishes = menuData.filter((dish) => dish.isFeatured);

  const categories = [
    { name: 'Burgers', icon: '🍔', count: 3 },
    { name: 'Pizzas', icon: '🍕', count: 3 },
    { name: 'Pastas & Bowls', icon: '🍝', count: 3 },
    { name: 'Starters', icon: '🍗', count: 3 },
    { name: 'Desserts', icon: '🍰', count: 3 },
    { name: 'Beverages', icon: '🍹', count: 3 },
  ];

  return (
    <main className="home-page">
      <section className="hero-section" aria-labelledby="hero-heading">
        <div className="hero-container">
          <div className="hero-content">
            <span className="hero-badge">✨ Craving something extraordinary?</span>
            <h1 id="hero-heading" className="hero-title">
              Fresh, Flavorful Gourmet Food <span className="text-gradient">Delivered Fast.</span>
            </h1>
            <p className="hero-subtitle">
              Indulge in handcrafted artisan burgers, wood-fired pizzas, authentic pastas, and decadent desserts made from locally sourced organic ingredients.
            </p>
            
            <div className="hero-cta-group">
              <Link to="/menu" className="btn btn-primary btn-lg">
                Explore Full Menu ➔
              </Link>
              <Link to="/about" className="btn btn-secondary btn-lg">
                Our Story
              </Link>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <strong className="stat-number">30 Min</strong>
                <span className="stat-label">Fast Delivery</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <strong className="stat-number">4.9 ★</strong>
                <span className="stat-label">Over 15k+ Reviews</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <strong className="stat-number">100%</strong>
                <span className="stat-label">Fresh & Hygienic</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-card">
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80" 
                alt="Appetizing spread of gourmet dishes" 
                className="hero-main-img"
              />
              <div className="floating-card card-top-right">
                <span className="floating-icon">🔥</span>
                <div>
                  <strong>Hot & Sizzling</strong>
                  <p>Chef's Daily Special</p>
                </div>
              </div>
              <div className="floating-card card-bottom-left">
                <span className="floating-icon">⚡</span>
                <div>
                  <strong>Superfast Delivery</strong>
                  <p>Average 24 mins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="categories-section" aria-labelledby="categories-heading">
        <div className="section-container">
          <div className="section-header text-center">
            <span className="section-tag">Taste Categories</span>
            <h2 id="categories-heading" className="section-title">Explore By Category</h2>
            <p className="section-desc">Find whatever your heart craves from our diverse artisan menu</p>
          </div>

          <div className="categories-grid">
            {categories.map((cat) => (
              <Link 
                key={cat.name} 
                to={`/menu?category=${encodeURIComponent(cat.name)}`} 
                className="category-card"
              >
                <span className="cat-icon" aria-hidden="true">{cat.icon}</span>
                <h3 className="cat-name">{cat.name}</h3>
                <span className="cat-count">{cat.count} Dishes</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="featured-section" aria-labelledby="featured-heading">
        <div className="section-container">
          <div className="section-header-flex">
            <div>
              <span className="section-tag">Chef's Recommendations</span>
              <h2 id="featured-heading" className="section-title">Featured Specialties</h2>
            </div>
            <Link to="/menu" className="view-all-link">
              View All Menu <span>→</span>
            </Link>
          </div>

          <div className="dishes-grid">
            {featuredDishes.map((dish) => (
              <DishCard 
                key={dish.id} 
                dish={dish} 
                onAddToCart={onAddToCart} 
              />
            ))}
          </div>
        </div>
      </section>

      <section className="features-section" aria-labelledby="features-heading">
        <div className="section-container">
          <div className="section-header text-center">
            <span className="section-tag">The CraveKart Promise</span>
            <h2 id="features-heading" className="section-title">Why Foodies Love Ordering From Us</h2>
            <p className="section-desc">We never compromise on ingredient quality, hygiene, or culinary passion</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-box">🥗</div>
              <h3 className="feature-title">Farm-To-Table Fresh</h3>
              <p className="feature-text">
                Every vegetable, herb, and protein is sourced daily from certified organic local farmers.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box">👨‍🍳</div>
              <h3 className="feature-title">Master Chef Recipes</h3>
              <p className="feature-text">
                Crafted by culinary artists with decades of fine dining experience and passion for flavors.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box">🚀</div>
              <h3 className="feature-title">Thermal-Shield Delivery</h3>
              <p className="feature-text">
                Packaged in insulated eco-friendly boxes ensuring your meal arrives piping hot and crispy.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-box">🛡️</div>
              <h3 className="feature-title">100% Contactless & Safe</h3>
              <p className="feature-text">
                Prepared in sanitized kitchens following rigorous WHO hygiene standards and temperature checks.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
