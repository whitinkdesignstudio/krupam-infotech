import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="luxury-footer">
      {/* Main Footer Grid */}
      <div className="container footer-grid-luxury">
        {/* Col 1: Brand & Trust */}
        <div className="footer-col brand-col">
          <Link to="/" className="footer-brand" aria-label="Krupam Infotech" onClick={scrollToTop}>
            <img
              src="/assets/images/krupam_logo__1_-removebg-preview.png"
              alt="Krupam Infotech Logo"
              className="footer-logo-img"
              loading="lazy"
              decoding="async"
            />
          </Link>
          <p className="footer-bio">
            Dependable technology care for homes and businesses in Ahmedabad since 2014. Certified chip-level repairs, smart CCTV security, and genuine enterprise upgrades.
          </p>
          <div className="footer-trust-badge">
            <span>35+ Years Combined Expertise · 12K+ Repairs</span>
          </div>
        </div>

        {/* Col 2: Services */}
        <div className="footer-col">
          <h4 className="footer-heading">
            <Link to="/services" onClick={scrollToTop}>Services</Link>
          </h4>
          <ul className="footer-nav-list">
            <li><Link to="/services" onClick={scrollToTop}>Laptop &amp; Desktop Repair</Link></li>
            <li><Link to="/services" onClick={scrollToTop}>Chip-Level Motherboard Diagnostics</Link></li>
            <li><Link to="/services" onClick={scrollToTop}>CCTV &amp; Smart Security Setup</Link></li>
            <li><Link to="/services" onClick={scrollToTop}>SSD &amp; High-Speed RAM Upgrades</Link></li>
            <li><Link to="/services" onClick={scrollToTop}>Data Recovery &amp; OS Installation</Link></li>
            <li><Link to="/services" onClick={scrollToTop}>Annual Maintenance Contracts (AMC)</Link></li>
          </ul>
        </div>

        {/* Col 3: Company */}
        <div className="footer-col">
          <h4 className="footer-heading">Explore</h4>
          <ul className="footer-nav-list">
            <li><Link to="/" onClick={scrollToTop}>Home</Link></li>
            <li><Link to="/services" onClick={scrollToTop}>All Services</Link></li>
            <li><Link to="/products" onClick={scrollToTop}>Curated Products</Link></li>
            <li><Link to="/about" onClick={scrollToTop}>About Us &amp; Heritage</Link></li>
            <li><Link to="/contact" onClick={scrollToTop}>Contact &amp; Location</Link></li>
          </ul>
        </div>

        {/* Col 4: Visit & Direct Contact */}
        <div className="footer-col contact-col">
          <h4 className="footer-heading">Visit &amp; Connect</h4>
          <div className="footer-contact-item">
            <span className="contact-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </span>
            <p>GF-6, Pentagon, Opp. Pratiksha Complex, Mahalaxmi Five Roads, Paldi, Ahmedabad 380007</p>
          </div>
          <div className="footer-contact-item">
            <span className="contact-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </span>
            <a href="mailto:nirdesh_shah@yahoo.com">nirdesh_shah@yahoo.com</a>
          </div>
          <div className="footer-hours-badge">
            <span className="live-dot"></span>
            <span>Mon–Sat · 9:00 AM – 7:00 PM</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container footer-bottom-luxury">
        <span>© 2026 Krupam Infotech. All rights reserved.</span>
        <span className="footer-tagline">Engineered for Performance · Serviced with Care</span>
        <span>Ahmedabad, Gujarat, India</span>
      </div>
    </footer>
  );
}
