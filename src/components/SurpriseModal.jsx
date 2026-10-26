import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import menuData from '../data/menu.json';

export default function SurpriseModal({ isOpen, onClose, onAddToCart }) {
  const [preference, setPreference] = useState(null);
  const [dishes, setDishes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      setPreference(null);
      setDishes([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePickPreference = (type) => {
    setPreference(type);
    generateOptions(type);
  };

  const generateOptions = (type) => {
    let pool = menuData;
    if (type === 'veg') {
      pool = menuData.filter((item) => item.isVeg);
    } else if (type === 'non-veg') {
      pool = menuData.filter((item) => !item.isVeg);
    }
    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, 3);
    setDishes(shuffled);
  };

  const handleSelectDish = (dishId) => {
    onClose();
    navigate(`/menu/${dishId}`);
  };

  return (
    <div className="surprise-modal-backdrop" onClick={onClose}>
      <div className="surprise-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="surprise-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <div className="surprise-modal-header">
          <span className="surprise-modal-badge">🎲 CraveKart Surprise</span>
          <h2 className="surprise-modal-title">
            {preference ? 'Here Are Your Options! 🍽️' : 'What Are You Craving?'}
          </h2>
          <p className="surprise-modal-desc">
            {preference
              ? 'Select any dish to view its details or add it straight to your cart!'
              : 'Choose Veg or Non-Veg, and we will roll our best chef options for you.'}
          </p>
        </div>

        {!preference ? (
          <div className="surprise-preference-grid">
            <button
              type="button"
              className="preference-choice-btn veg-choice"
              onClick={() => handlePickPreference('veg')}
            >
              <span className="choice-icon">🌱</span>
              <strong className="choice-title">Pure Veg</strong>
              <span className="choice-subtitle">Crispy paneer, bowls & pizzas</span>
            </button>

            <button
              type="button"
              className="preference-choice-btn nonveg-choice"
              onClick={() => handlePickPreference('non-veg')}
            >
              <span className="choice-icon">🍗</span>
              <strong className="choice-title">Non-Veg</strong>
              <span className="choice-subtitle">Gourmet burgers & chicken wings</span>
            </button>

            <button
              type="button"
              className="preference-choice-btn any-choice"
              onClick={() => handlePickPreference('any')}
            >
              <span className="choice-icon">✨</span>
              <strong className="choice-title">Surprise Anything</strong>
              <span className="choice-subtitle">Best of both worlds</span>
            </button>
          </div>
        ) : (
          <div className="surprise-results-wrapper">
            <div className="surprise-dishes-list">
              {dishes.map((dish) => (
                <div key={dish.id} className="surprise-dish-card">
                  <img src={dish.image} alt={dish.name} className="surprise-dish-img" />
                  
                  <div className="surprise-dish-info">
                    <div className="surprise-dish-title-row">
                      <span className={`diet-badge-sm ${dish.isVeg ? 'veg' : 'non-veg'}`}>
                        <span className="diet-dot-sm"></span>
                      </span>
                      <h4 className="surprise-dish-name">{dish.name}</h4>
                    </div>
                    <span className="surprise-dish-meta">
                      {dish.category} • ⭐ {dish.rating}
                    </span>
                    <strong className="surprise-dish-price">₹{dish.price}</strong>
                  </div>

                  <div className="surprise-dish-actions">
                    <button
                      type="button"
                      className="btn btn-primary-sm"
                      onClick={() => handleSelectDish(dish.id)}
                    >
                      View Dish
                    </button>
                    {onAddToCart && (
                      <button
                        type="button"
                        className="btn btn-outline-sm"
                        onClick={() => {
                          onAddToCart(dish, 1);
                          onClose();
                        }}
                      >
                        + Cart
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="surprise-modal-footer">
              <button
                type="button"
                className="btn btn-secondary-sm"
                onClick={() => generateOptions(preference)}
              >
                🔄 Roll New Options
              </button>
              <button
                type="button"
                className="btn-link-reset"
                onClick={() => {
                  setPreference(null);
                  setDishes([]);
                }}
              >
                ← Change Preference
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
