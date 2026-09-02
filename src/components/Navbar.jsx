import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

export default function Navbar({ totalItems, user, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogoutClick = () => {
    onLogout();
    closeMobileMenu();
    navigate('/');
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <Link to="/" className="brand-logo" onClick={closeMobileMenu} aria-label="CraveKart Home">
          <span className="logo-icon" aria-hidden="true">🍔</span>
          <span className="logo-text">Crave<span className="logo-highlight">Kart</span></span>
        </Link>

        <button
          type="button"
          className="mobile-nav-toggle"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>

        <nav className={`main-nav ${isMobileMenuOpen ? 'nav-open' : ''}`} aria-label="Main Navigation">
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink 
                to="/" 
                className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`} 
                onClick={closeMobileMenu}
                end
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/menu" 
                className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`} 
                onClick={closeMobileMenu}
              >
                Menu
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/about" 
                className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`} 
                onClick={closeMobileMenu}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/contact" 
                className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`} 
                onClick={closeMobileMenu}
              >
                Contact
              </NavLink>
            </li>
            {user && (
              <li className="nav-item">
                <NavLink 
                  to="/orders" 
                  className={({ isActive }) => `nav-link ${isActive ? 'active-link' : ''}`} 
                  onClick={closeMobileMenu}
                >
                  My Orders
                </NavLink>
              </li>
            )}
          </ul>

          <div className="nav-actions">
            <Link 
              to="/cart" 
              className="cart-btn" 
              onClick={closeMobileMenu} 
              aria-label={`Shopping cart with ${totalItems} items`}
            >
              <span className="cart-icon" aria-hidden="true">🛒</span>
              <span className="cart-text">Cart</span>
              {totalItems > 0 && (
                <span className="cart-badge" aria-label={`${totalItems} items in cart`}>
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="user-profile-menu">
                <span className="user-greeting" title={user.email}>
                  👋 Hi, <strong>{user.name.split(' ')[0]}</strong>
                </span>
                <button 
                  type="button" 
                  className="btn btn-outline-sm logout-btn" 
                  onClick={handleLogoutClick}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="btn btn-primary-sm" 
                onClick={closeMobileMenu}
              >
                Sign In
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
