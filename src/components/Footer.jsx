import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-col brand-col">
          <div className="footer-brand">
            <span className="logo-icon" aria-hidden="true">🍔</span>
            <span className="logo-text">Crave<span className="logo-highlight">Kart</span></span>
          </div>
          <p className="footer-desc">
            Crafting memorable dining experiences with farm-fresh ingredients, artisanal recipes, and lightning-fast delivery right to your doorstep.
          </p>
          <div className="footer-badges">
            <span className="pill-badge">⚡ 30 Min Delivery</span>
            <span className="pill-badge">🌱 100% Fresh</span>
          </div>
        </div>

        <div className="footer-col links-col">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-link-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/menu">Explore Menu</Link></li>
            <li><Link to="/cart">My Cart</Link></li>
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/contact">Contact Support</Link></li>
          </ul>
        </div>

        <div className="footer-col hours-col">
          <h3 className="footer-heading">Operating Hours</h3>
          <ul className="hours-list">
            <li><span>Mon - Fri:</span> <strong>10:00 AM - 11:30 PM</strong></li>
            <li><span>Sat - Sun:</span> <strong>09:00 AM - 12:00 AM</strong></li>
            <li><span>Delivery Hotline:</span> <strong>+91 (800) CRAVE-KART</strong></li>
            <li><span>Email:</span> <strong>support@cravekart.com</strong></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} CraveKart Inc. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <span>Privacy Policy</span>
            <span className="divider">•</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
