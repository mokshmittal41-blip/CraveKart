import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup({ onLogin, onShowToast }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: true,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[-()\s]/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (!formData.password) {
      errors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.agreeTerms) {
      errors.agreeTerms = 'You must agree to the Terms of Service.';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      if (onShowToast) onShowToast('Please fill out all required fields correctly.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newUser = {
        id: 'usr-' + Date.now(),
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        token: 'fake-jwt-token-' + Math.random().toString(36).substring(2),
        joinedAt: new Date().toISOString(),
      };

      onLogin(newUser);
      setIsSubmitting(false);
      if (onShowToast) onShowToast(`Welcome to CraveKart, ${newUser.name}! 🚀`, 'success');
      navigate('/menu', { replace: true });
    }, 600);
  };

  return (
    <main className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <span className="auth-logo-icon">✨</span>
            <h1 className="auth-title">Create CraveKart Account</h1>
            <p className="auth-subtitle">Join thousands of food lovers enjoying gourmet delights</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="signup-name" className="form-label">Full Name</label>
              <input
                id="signup-name"
                type="text"
                name="fullName"
                className={`form-input ${formErrors.fullName ? 'input-error' : ''}`}
                placeholder="e.g. Maya Sharma"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              {formErrors.fullName && <span className="error-message" role="alert">{formErrors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="signup-email" className="form-label">Email Address</label>
              <input
                id="signup-email"
                type="email"
                name="email"
                className={`form-input ${formErrors.email ? 'input-error' : ''}`}
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {formErrors.email && <span className="error-message" role="alert">{formErrors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="signup-phone" className="form-label">Phone Number</label>
              <input
                id="signup-phone"
                type="tel"
                name="phone"
                className={`form-input ${formErrors.phone ? 'input-error' : ''}`}
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              {formErrors.phone && <span className="error-message" role="alert">{formErrors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="signup-password" className="form-label">Password</label>
              <input
                id="signup-password"
                type="password"
                name="password"
                className={`form-input ${formErrors.password ? 'input-error' : ''}`}
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {formErrors.password && <span className="error-message" role="alert">{formErrors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="signup-confirm-pwd" className="form-label">Confirm Password</label>
              <input
                id="signup-confirm-pwd"
                type="password"
                name="confirmPassword"
                className={`form-input ${formErrors.confirmPassword ? 'input-error' : ''}`}
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              {formErrors.confirmPassword && <span className="error-message" role="alert">{formErrors.confirmPassword}</span>}
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label" htmlFor="signup-terms">
                <input
                  id="signup-terms"
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                />
                <span>I agree to the CraveKart Terms of Service & Privacy Policy</span>
              </label>
              {formErrors.agreeTerms && <span className="error-message" role="alert">{formErrors.agreeTerms}</span>}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block auth-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Complete Registration ➔'}
            </button>
          </form>

          <div className="auth-footer-text">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-switch-link">
                Sign In here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
