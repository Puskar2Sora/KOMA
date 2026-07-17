import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

const POPULAR_CITIES = [
  "Kolkata", "Bengaluru", "Mumbai", "Pune", "Delhi",
  "Hyderabad", "Chennai", "Ahmedabad", "Jaipur", "Kochi",
];

const STATS = [
  { label: "Verified Listings", value: 12400, suffix: "+" },
  { label: "Happy Tenants", value: 8600, suffix: "+" },
  { label: "Cities Covered", value: 42, suffix: "" },
  { label: "Avg. Rating", value: 4.8, suffix: "/5" },
];

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(node);
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function CountUpStat({ value, suffix, label, delay }) {
  const [ref, inView] = useInView(0.4);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const isDecimal = !Number.isInteger(value);
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = value * eased;
      setDisplay(isDecimal ? current.toFixed(1) : Math.floor(current));
      if (progress < 1) requestAnimationFrame(tick);
    }
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <div
      className="stat-card"
      ref={ref}
      style={{ "--delay": `${delay}ms` }}
    >
      <span className="stat-value">
        {display}
        {suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function Footer() {
  const footerRef = useRef(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const sections = footerRef.current.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            entry.target.style.setProperty("--delay", `${i * 100}ms`);
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleSubscribe(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3500);
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="main-footer" ref={footerRef}>
      <div className="footer-glow footer-glow-a" aria-hidden="true"></div>
      <div className="footer-glow footer-glow-b" aria-hidden="true"></div>
      <span className="leaf leaf-1" aria-hidden="true">🍃</span>
      <span className="leaf leaf-2" aria-hidden="true">🍃</span>
      <span className="leaf leaf-3" aria-hidden="true">🍃</span>
<br/>
<br/>
      {/* Newsletter band */}
      <div className="newsletter-band reveal">
        <div className="newsletter-inner">
          <div className="newsletter-copy">
            <h3>Never miss a new listing</h3>
            <p>Get fresh rooms and rent-drop alerts in your city, weekly.</p>
          </div>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">
              <span>{subscribed ? "Subscribed ✓" : "Subscribe"}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-row reveal">
        {STATS.map((s, i) => (
          <CountUpStat key={s.label} {...s} delay={i * 120} />
        ))}
      </div>

      <div className="footer-content">
        {/* Brand Section */}
        <div className="footer-section brand-info reveal">
          <h2 className="footer-logo">
            KOMA<span className="logo-dot">.</span>
          </h2>
          <p className="footer-description">
            The most trusted platform for finding your next home. Simple,
            secure, and sophisticated.
          </p>
          <div className="social-icons">
            <a href="#" className="icon" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.5 21v-8.2h2.75l.41-3.2h-3.16V7.6c0-.93.26-1.56 1.6-1.56h1.7V3.14C15.98 3.1 14.98 3 13.8 3c-2.44 0-4.11 1.49-4.11 4.22v2.36H6.94v3.2h2.75V21h3.81z"/>
              </svg>
            </a>
            <a href="#" className="icon" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.2c2.7 0 3 .01 4.13.06 1.12.05 1.88.23 2.55.49.69.27 1.28.63 1.86 1.21.58.58.94 1.17 1.21 1.86.26.67.44 1.43.49 2.55.05 1.13.06 1.43.06 4.13s-.01 3-.06 4.13c-.05 1.12-.23 1.88-.49 2.55-.27.69-.63 1.28-1.21 1.86-.58.58-1.17.94-1.86 1.21-.67.26-1.43.44-2.55.49-1.13.05-1.43.06-4.13.06s-3-.01-4.13-.06c-1.12-.05-1.88-.23-2.55-.49-.69-.27-1.28-.63-1.86-1.21-.58-.58-.94-1.17-1.21-1.86-.26-.67-.44-1.43-.49-2.55C2.21 15 2.2 14.7 2.2 12s.01-3 .06-4.13c.05-1.12.23-1.88.49-2.55.27-.69.63-1.28 1.21-1.86.58-.58 1.17-.94 1.86-1.21.67-.26 1.43-.44 2.55-.49C9 2.21 9.3 2.2 12 2.2zm0 1.98c-2.65 0-2.96.01-4.01.06-.97.04-1.5.21-1.85.35-.46.18-.8.4-1.15.75-.35.35-.57.69-.75 1.15-.14.35-.31.88-.35 1.85-.05 1.05-.06 1.36-.06 4.01s.01 2.96.06 4.01c.04.97.21 1.5.35 1.85.18.46.4.8.75 1.15.35.35.69.57 1.15.75.35.14.88.31 1.85.35 1.05.05 1.36.06 4.01.06s2.96-.01 4.01-.06c.97-.04 1.5-.21 1.85-.35.46-.18.8-.4 1.15-.75.35-.35.57-.69.75-1.15.14-.35.31-.88.35-1.85.05-1.05.06-1.36.06-4.01s-.01-2.96-.06-4.01c-.04-.97-.21-1.5-.35-1.85-.18-.46-.4-.8-.75-1.15-.35-.35-.69-.57-1.15-.75-.35-.14-.88-.31-1.85-.35-1.05-.05-1.36-.06-4.01-.06zm0 3.37a4.45 4.45 0 110 8.9 4.45 4.45 0 010-8.9zm0 1.98a2.47 2.47 0 100 4.94 2.47 2.47 0 000-4.94zm5.66-2.2a1.04 1.04 0 11-2.08 0 1.04 1.04 0 012.08 0z"/>
              </svg>
            </a>
            <a href="#" className="icon" aria-label="X (Twitter)">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.9 3H22l-7.19 8.22L23.3 21h-6.6l-5.17-6.4L5.4 21H2.27l7.7-8.8L1.7 3h6.77l4.67 5.85L18.9 3zm-1.16 16.2h1.83L7.35 4.7H5.39l12.35 14.5z"/>
              </svg>
            </a>
            <a href="#" className="icon" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3V9zm7 0h3.83v1.64h.05c.53-1 1.84-2.06 3.79-2.06 4.06 0 4.81 2.67 4.81 6.14V21H19v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21H10.7V9z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section reveal">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Browse Rooms</Link></li>
            <li><Link to="/add-room">List a Property</Link></li>
            <li><Link to="/signup">Join KOMA</Link></li>
            <li><Link to="/how-it-works">How It Works</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="footer-section reveal">
          <h4 className="footer-heading">Support</h4>
          <ul className="footer-links">
            <li><Link to="#">Help Center</Link></li>
            <li><Link to="#">Terms of Service</Link></li>
            <li><Link to="#">Privacy Policy</Link></li>
            <li><Link to="#">Safety Guidelines</Link></li>
            <li><Link to="#">Report an Issue</Link></li>
          </ul>
        </div>

        {/* Company Section */}
        <div className="footer-section reveal">
          <h4 className="footer-heading">Company</h4>
          <ul className="footer-links">
            <li><Link to="#">About KOMA</Link></li>
            <li><Link to="#">Careers</Link></li>
            <li><Link to="#">Press</Link></li>
            <li><Link to="#">Blog</Link></li>
            <li><Link to="#">Partner With Us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section reveal">
          <h4 className="footer-heading">Contact Us</h4>
          <p className="contact-item">
            <span className="contact-icon">✉</span> koma@gmail.com
          </p>
          <p className="contact-item">
            <span className="contact-icon">☎</span> +91 98765 43210
          </p>
          <p className="contact-item">
            <span className="contact-icon">📍</span> West Bengal, India
          </p>

          <div className="app-badges">
            <a href="#" className="badge">
              <span className="badge-label">Get it on</span>
              <span className="badge-store">Google Play</span>
            </a>
            <a href="#" className="badge">
              <span className="badge-label">Download on the</span>
              <span className="badge-store">App Store</span>
            </a>
          </div>
        </div>
      </div>

      {/* City marquee */}
      <div className="marquee-wrap reveal" aria-hidden="true">
        <div className="marquee-track">
          {[...POPULAR_CITIES, ...POPULAR_CITIES].map((city, i) => (
            <span className="marquee-item" key={`${city}-${i}`}>
              {city}
              <span className="marquee-dot">•</span>
            </span>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 KOMA Property Rental. All rights reserved.</p>
        <div className="payment-icons" aria-label="Accepted payment methods">
          <span className="pay-chip">UPI</span>
          <span className="pay-chip">Visa</span>
          <span className="pay-chip">Mastercard</span>
          <span className="pay-chip">Net Banking</span>
        </div>
      </div>

      <button
        className={`back-to-top ${showTop ? "visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        ↑
      </button>
    </footer>
  );
}

export default Footer;