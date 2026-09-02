import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="section-container text-center">
        <div className="not-found-graphic">
          <span className="not-found-emoji">🍕</span>
          <span className="not-found-code">404</span>
        </div>
        <h1 className="not-found-title">Oops! Looks Like This Page Was Eaten!</h1>
        <p className="not-found-description">
          The page or recipe you are searching for does not exist or may have been moved.
          Let's get you back to delicious gourmet treats!
        </p>

        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary btn-lg">
            🏠 Back to Home
          </Link>
          <Link to="/menu" className="btn btn-secondary btn-lg">
            🍔 Explore Menu
          </Link>
        </div>
      </div>
    </main>
  );
}
