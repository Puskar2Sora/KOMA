import React from "react";
import { Link } from "react-router-dom";
import "../styles/landingPage.css";

function LandingPage() {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Perfect Stay with KOMA</h1>
          <p className="hero-subtitle">
            Discover affordable rooms, cozy apartments, and luxury stays tailored just for you.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn-primary">Get Started</Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🏠</div>
            <h3>Verified Listings</h3>
            <p>Every room is manually checked to ensure quality and safety.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Best Prices</h3>
            <p>No hidden fees. We offer the most competitive rental rates in the city.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Booking</h3>
            <p>Connect with owners directly and book your room in minutes.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-bottom">
        <h2>Ready to find your next home?</h2>
        <p>Join thousands of users who have found their perfect living space.</p>
        <Link to="/signup" className="btn-cta">Sign Up for Free</Link>
      </section>

      <footer className="landing-footer">
        <p>&copy; 2026 KOMA Property Rental. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;