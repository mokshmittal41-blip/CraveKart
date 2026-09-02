import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Login({ onLogin, onShowToast }) {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from?.pathname || '/';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email format.';
    }

    if (!formData.password) {
      errors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      if (onShowToast) onShowToast('Please fix the errors in the form.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const simulatedUser = {
        id: 'usr-' + Date.now(),
        name: formData.email.split('@')[0].replace('.', ' ').toUpperCase(),
        email: formData.email,
        token: 'fake-jwt-token-' + Math.random().toString(36).substring(2),
        joinedAt: new Date().toISOString(),
      };

      onLogin(simulatedUser);
      setIsSubmitting(false);
      if (onShowToast) onShowToast(`Welcome back, ${simulatedUser.name}! 🎉`, 'success');
      navigate(redirectPath, { replace: true });
    }, 600);
  };

  return (
    <main className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <span className="auth-logo-icon">🍔</span>
            <h1 className="auth-title">Welcome Back to CraveKart</h1>
            <p className="auth-subtitle">
              {location.state?.from ? (
                <span className="redirect-notice">
                  🔒 Please sign in to access your checkout and orders.
                </span>
              ) : (
                'Sign in to order your favorite gourmet treats'
              )}
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="login-email" className="form-label">Email Address</label>
              <input
                id="login-email"
                type="email"
                name="email"
                className={`form-input ${formErrors.email ? 'input-error' : ''}`}
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
              {formErrors.email && <span className="error-message" role="alert">{formErrors.email}</span>}
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label htmlFor="login-password" className="form-label">Password</label>
                <span className="form-helper-text">Min 6 characters</span>
              </div>
              <input
                id="login-password"
                type="password"
                name="password"
                className={`form-input ${formErrors.password ? 'input-error' : ''}`}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
              {formErrors.password && <span className="error-message" role="alert">{formErrors.password}</span>}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block auth-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Authenticating...' : 'Sign In ➔'}
            </button>
          </form>

          <div className="auth-footer-text">
            <p>
              Don't have an account yet?{' '}
              <Link to="/signup" className="auth-switch-link">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
