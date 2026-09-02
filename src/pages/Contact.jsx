import React, { useState, useRef } from 'react';

export default function Contact({ onShowToast }) {
  const nameInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Your name is required.';
    if (!formData.email.trim()) {
      errors.email = 'Your email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim()) {
      errors.message = 'Please type your message or feedback.';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long.';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      if (onShowToast) onShowToast('Please complete all required fields.', 'error');
      if (nameInputRef.current && errors.name) {
        nameInputRef.current.focus();
      }
      return;
    }

    setIsSent(true);
    if (onShowToast) {
      onShowToast('Thank you! Your message has been sent to our culinary support team.', 'success');
    }

    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'General Inquiry',
      message: '',
    });
  };

  return (
    <main className="contact-page">
      <section className="contact-hero-section">
        <div className="section-container text-center">
          <span className="section-tag">Get in Touch</span>
          <h1 className="page-title">We'd Love To Hear From You</h1>
          <p className="page-subtitle">
            Have a question about our menu, need custom catering, or have feedback about your order? Reach out anytime!
          </p>
        </div>
      </section>

      <section className="contact-content-section">
        <div className="section-container">
          <div className="contact-grid">
            <div className="contact-info-column">
              <div className="info-card">
                <div className="info-icon-box">📞</div>
                <div className="info-text">
                  <h3>Customer Helpline</h3>
                  <p>Speak directly with our concierge team</p>
                  <strong>+91 (800) CRAVE-KART</strong>
                  <small>Available 10:00 AM - 11:30 PM Daily</small>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon-box">✉️</div>
                <div className="info-text">
                  <h3>Email Support</h3>
                  <p>For inquiries, feedback & partnerships</p>
                  <strong>support@cravekart.com</strong>
                  <small>Average response time: &lt; 2 hours</small>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon-box">📍</div>
                <div className="info-text">
                  <h3>Central Kitchen & Studio</h3>
                  <p>Plot 42, Gourmet Boulevard, Bandra Kurla Complex</p>
                  <strong>Mumbai, Maharashtra 400051</strong>
                  <small>Open for takeaway & delivery</small>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon-box">⏰</div>
                <div className="info-text">
                  <h3>Service Timings</h3>
                  <p>Monday – Friday: 10:00 AM – 11:30 PM</p>
                  <p>Saturday – Sunday: 09:00 AM – 12:00 AM</p>
                </div>
              </div>
            </div>

            <div className="contact-form-column">
              <div className="contact-form-card">
                <h2 className="form-card-title">Send Us A Direct Message</h2>
                <p className="form-card-subtitle">Fill in the details below and we will get back to you promptly.</p>

                {isSent && (
                  <div className="alert-success-box" role="status">
                    ✓ Message received! We'll reach back within 24 hours.
                  </div>
                )}

                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label htmlFor="contact-name" className="form-label">Full Name *</label>
                      <input
                        ref={nameInputRef}
                        id="contact-name"
                        type="text"
                        name="name"
                        className={`form-input ${formErrors.name ? 'input-error' : ''}`}
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                      {formErrors.name && <span className="error-message">{formErrors.name}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-email" className="form-label">Email Address *</label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        className={`form-input ${formErrors.email ? 'input-error' : ''}`}
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label htmlFor="contact-phone" className="form-label">Phone Number (Optional)</label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        className="form-input"
                        placeholder="10-digit number"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="contact-subject" className="form-label">Subject</label>
                      <select
                        id="contact-subject"
                        name="subject"
                        className="form-select"
                        value={formData.subject}
                        onChange={handleChange}
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Order Feedback">Order Feedback</option>
                        <option value="Catering & Events">Catering & Events</option>
                        <option value="Dietary Questions">Dietary & Nutrition Questions</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message" className="form-label">Your Message / Question *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      className={`form-textarea ${formErrors.message ? 'input-error' : ''}`}
                      placeholder="Tell us what's on your mind..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.message && <span className="error-message">{formErrors.message}</span>}
                  </div>

                  <button type="submit" className="btn btn-primary btn-block">
                    Send Message ➔
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
