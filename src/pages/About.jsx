import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  const team = [
    {
      name: 'Chef Antonio Rossi',
      role: 'Executive Head Chef',
      icon: '👨‍🍳',
      bio: 'Trained in Naples and Lyon, Antonio brings 18 years of Michelin-starred culinary expertise and artisanal cooking mastery to CraveKart.',
    },
    {
      name: 'Pooja Narang',
      role: 'Head Pastry & Dessert Specialist',
      icon: '👩‍🍳',
      bio: 'Master pastry artist renowned for handcrafted molten Belgian lava cakes, artisanal macarons, and authentic Parisian savoiardi creations.',
    },
    {
      name: 'Vikram Malhotra',
      role: 'Master Sourcing & Organic Farm Lead',
      icon: '👨‍🍳',
      bio: 'Works directly with certified regional organic farmers to ensure pesticide-free vegetables, heirloom tomatoes, and artisanal cheeses.',
    },
  ];

  return (
    <main className="about-page">
      <section className="about-hero-section">
        <div className="section-container text-center">
          <span className="section-tag">Our Culinary Journey</span>
          <h1 className="page-title">Born Out Of Pure Passion For Flavor</h1>
          <p className="page-subtitle">
            Founded in 2021, CraveKart started with a simple belief: gourmet food shouldn't be confined to five-star tables. It should be hot, fresh, and delivered directly to your doorstep in minutes.
          </p>
        </div>
      </section>

      <section className="about-story-section">
        <div className="section-container">
          <div className="story-grid">
            <div className="story-content">
              <span className="story-badge">The Philosophy</span>
              <h2 className="section-title">Fresh Ingredients. Zero Compromise.</h2>
              <p className="story-paragraph">
                Every recipe on the CraveKart menu is designed from scratch. We grind our burger smash blends in-house daily, cold-ferment our sourdough pizza dough for 48 hours, and slow-simmer our San Marzano tomato sauces with hand-picked basil.
              </p>
              <p className="story-paragraph">
                We believe that food should not just satisfy hunger — it should ignite joy, spark memories, and bring people together over unforgettable tastes.
              </p>
              
              <div className="story-highlights-list">
                <div className="highlight-item">
                  <span className="highlight-check">✓</span>
                  <span>100% Organic, locally sourced farm produce</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-check">✓</span>
                  <span>Zero artificial preservatives or trans fats</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-check">✓</span>
                  <span>100% biodegradable and recyclable packaging</span>
                </div>
              </div>
            </div>

            <div className="story-image-box">
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80" 
                alt="Chef preparing fresh artisan food in kitchen" 
                className="story-img"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="chefs-section">
        <div className="section-container">
          <div className="section-header text-center">
            <span className="section-tag">The Masters Behind The Taste</span>
            <h2 className="section-title">Meet Our Culinary Team</h2>
            <p className="section-desc">Passionate experts dedicated to perfecting every single bite</p>
          </div>

          <div className="chefs-grid">
            {team.map((member) => (
              <article key={member.name} className="chef-card text-card">
                <div className="chef-avatar-box">
                  <span className="chef-avatar-icon">{member.icon}</span>
                </div>
                <div className="chef-info">
                  <h3 className="chef-name">{member.name}</h3>
                  <span className="chef-role">{member.role}</span>
                  <p className="chef-bio">{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="standards-section">
        <div className="section-container">
          <div className="standards-banner">
            <h2 className="standards-title">Ready To Taste The Difference?</h2>
            <p className="standards-text">Explore our full menu and experience five-star dining in the comfort of your home.</p>
            <Link to="/menu" className="btn btn-primary btn-lg">
              Explore CraveKart Menu ➔
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
