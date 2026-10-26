import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import DishCard from '../components/DishCard';
import menuData from '../data/menu.json';

export default function Menu({ onAddToCart, onOpenSurprise }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  const searchInputRef = useRef(null);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const categories = [
    'All',
    'Burgers',
    'Pizzas',
    'Pastas & Bowls',
    'Starters',
    'Desserts',
    'Beverages',
  ];

  const handleFocusSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchTerm('');
    setVegOnly(false);
    setSortBy('default');
    setSearchParams({});
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const filteredDishes = useMemo(() => {
    let result = [...menuData];

    if (selectedCategory !== 'All') {
      result = result.filter((dish) => dish.category === selectedCategory);
    }

    if (searchTerm.trim() !== '') {
      const lowerQuery = searchTerm.toLowerCase();
      result = result.filter(
        (dish) =>
          dish.name.toLowerCase().includes(lowerQuery) ||
          dish.description.toLowerCase().includes(lowerQuery) ||
          dish.ingredients.some((ing) => ing.toLowerCase().includes(lowerQuery))
      );
    }

    if (vegOnly) {
      result = result.filter((dish) => dish.isVeg === true);
    }

    if (sortBy === 'price-low-to-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high-to-low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'highest-rated') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, searchTerm, vegOnly, sortBy]);

  return (
    <main className="menu-page">
      <section className="menu-hero-section">
        <div className="section-container text-center">
          <span className="section-tag">Explore & Order</span>
          <h1 className="page-title">Our Gourmet Menu</h1>
          <p className="page-subtitle">
            Freshly prepared dishes crafted to perfection. Filter by category, dietary preferences, or search your favorite ingredients.
          </p>
        </div>
      </section>

      <section className="menu-content-section">
        <div className="section-container">
          <div className="menu-controls-wrapper">
            <div className="search-bar-container">
              <span className="search-icon" aria-hidden="true">🔍</span>
              <input
                ref={searchInputRef}
                type="search"
                className="search-input"
                placeholder="Search burgers, pizzas, truffle, desserts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search menu items"
              />
              {searchTerm && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchTerm('')}
                  aria-label="Clear search text"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="filter-options-group">
              <label className="toggle-label" htmlFor="veg-only-checkbox">
                <input
                  id="veg-only-checkbox"
                  type="checkbox"
                  checked={vegOnly}
                  onChange={(e) => setVegOnly(e.target.checked)}
                  className="toggle-checkbox"
                />
                <span className="toggle-custom"></span>
                <span className="toggle-text">🌱 Veg Only</span>
              </label>

              <div className="sort-dropdown-wrap">
                <label htmlFor="sort-select" className="sr-only">Sort dishes</label>
                <select
                  id="sort-select"
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="default">Sort by: Recommended</option>
                  <option value="price-low-to-high">Price: Low to High</option>
                  <option value="price-high-to-low">Price: High to Low</option>
                  <option value="highest-rated">Highest Rated ★</option>
                </select>
              </div>

              <button 
                type="button" 
                className="btn-surprise-menu"
                onClick={onOpenSurprise}
              >
                🎲 Surprise Me
              </button>

              <button 
                type="button" 
                className="btn btn-outline-sm btn-focus-search"
                onClick={handleFocusSearch}
                title="Focus search bar"
              >
                ⌨️ Focus Search
              </button>
            </div>
          </div>

          <div className="category-pills-bar" role="tablist" aria-label="Menu Categories">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={selectedCategory === category}
                className={`category-pill ${selectedCategory === category ? 'active-pill' : ''}`}
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="results-status-bar">
            <p className="results-count">
              Showing <strong>{filteredDishes.length}</strong> {filteredDishes.length === 1 ? 'dish' : 'dishes'}
              {selectedCategory !== 'All' && <span> in <em>{selectedCategory}</em></span>}
              {vegOnly && <span> (Vegetarian)</span>}
              {searchTerm && <span> matching "<strong>{searchTerm}</strong>"</span>}
            </p>
            
            {(selectedCategory !== 'All' || searchTerm || vegOnly || sortBy !== 'default') && (
              <button
                type="button"
                className="btn-clear-all"
                onClick={handleResetFilters}
              >
                Reset All Filters ✕
              </button>
            )}
          </div>

          {filteredDishes.length > 0 ? (
            <div className="dishes-grid">
              {filteredDishes.map((dish) => (
                <DishCard 
                  key={dish.id} 
                  dish={dish} 
                  onAddToCart={onAddToCart} 
                />
              ))}
            </div>
          ) : (
            <div className="empty-results-box">
              <div className="empty-results-icon">🍽️</div>
              <h3 className="empty-results-title">No matching dishes found</h3>
              <p className="empty-results-text">
                We couldn't find any dishes matching your current filter criteria. Try adjusting your search keyword or resetting filters.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleResetFilters}
              >
                View All Dishes
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
