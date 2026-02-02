import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        {/* Brand Section */}
        <div className="footer-section brand-info">
          <h2 className="footer-logo">KOMA</h2>
          <p className="footer-description">
            The most trusted platform for finding your next home. Simple, secure, and sophisticated.
          </p>
          <div className="social-icons">
            <span className="icon">🌐</span>
            <span className="icon">📸</span>
            <span className="icon">🐦</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Browse Rooms</Link></li>
            <li><Link to="/add-room">List a Property</Link></li>
            <li><Link to="/signup">Join KOMA</Link></li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="footer-section">
          <h4 className="footer-heading">Support</h4>
          <ul className="footer-links">
            <li><Link to="#">Help Center</Link></li>
            <li><Link to="#">Terms of Service</Link></li>
            <li><Link to="#">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4 className="footer-heading">Contact Us</h4>
          <p className="contact-item">📧 support@koma.com</p>
          <p className="contact-item">📞 +91 98765 43210</p>
          <p className="contact-item">📍 West Bengal, India</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 KOMA Property Rental. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;