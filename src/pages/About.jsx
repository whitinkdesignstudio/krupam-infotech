import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const REVIEWS = [
  {
    quote: "Huge display center with perfect knowledgeable staff. I purchased a Lenovo laptop from here and I am very much satisfied with the honest guidance and after-sales support.",
    author: "Dr. Vivek Mehta",
    role: "Verified Google Review",
    rating: 5,
    id: "01"
  },
  {
    quote: "Professional service is being served here. They will also provide you a quick suggestion to your problem. The place is very easily accessible as it is right near the Mahalaxmi crossroad junction.",
    author: "Shaurav Bhattacharyya",
    role: "Verified Customer",
    rating: 5,
    id: "02"
  },
  {
    quote: "Great customer service, highly recommended buying items from here. Rajesh Shrimali is very helpful and has great patience, explaining technical details with absolute clarity.",
    author: "NM3",
    role: "Google Local Guide",
    rating: 5,
    id: "03"
  },
  {
    quote: "Amazing experience. Good demo and transparent hardware support by Rajesh Shrimali. Best IT service experience in Paldi.",
    author: "Anokhi Gandhi",
    role: "Verified Customer",
    rating: 5,
    id: "04"
  },
  {
    quote: "Good demo and great service. I am very happy to purchase from Krupam Infotech Lenovo store. Honest advice and prompt turnaround.",
    author: "Ajit Kulkarni",
    role: "Verified Customer",
    rating: 5,
    id: "05"
  }
];

const MILESTONES = [
  {
    year: "2014",
    title: "Established in Paldi",
    desc: "Founded at Pentagon, Mahalaxmi Five Roads, providing specialized desktop and laptop hardware repair."
  },
  {
    year: "2017",
    title: "Chip-Level Diagnostics Lab",
    desc: "Equipped our center with high-magnification optical microscopes, BGA rework stations, and digital oscilloscopes for component-level board repair."
  },
  {
    year: "2021",
    title: "Authorized Multi-Brand Solutions",
    desc: "Expanded into commercial IT supply, becoming an authorized partner for Lenovo, HP, Dell, and Apple hardware."
  },
  {
    year: "2026",
    title: "Enterprise IT & Security Services",
    desc: "Supporting 5,000+ businesses, clinics, and offices across Gujarat with comprehensive AMC contracts, smart CCTV networks, and server support."
  }
];

export default function About() {
  const voicesGridRef = useRef(null);

  const scrollVoices = (direction) => {
    if (voicesGridRef.current) {
      const card = voicesGridRef.current.querySelector('.voice-card-luxury');
      const amount = card ? card.offsetWidth + 24 : 380;
      voicesGridRef.current.scrollBy({ left: direction === 'next' ? amount : -amount, behavior: 'smooth' });
    }
  };

  // Automated continuous auto-slide with hover pause
  useEffect(() => {
    const el = voicesGridRef.current;
    if (!el) return;

    let isHovered = false;
    const handleMouseEnter = () => { isHovered = true; };
    const handleMouseLeave = () => { isHovered = false; };

    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);

    const autoSlideTimer = setInterval(() => {
      if (isHovered) return;
      const card = el.querySelector('.voice-card-luxury');
      const amount = card ? card.offsetWidth + 24 : 380;
      const maxScroll = el.scrollWidth - el.clientWidth;

      if (el.scrollLeft >= maxScroll - 15) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: amount, behavior: 'smooth' });
      }
    }, 3200);

    return () => {
      clearInterval(autoSlideTimer);
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="about-page-wrap">
      {/* Executive Hero Section */}
      <section className="about-hero-clean">
        <div className="container about-hero-container">
          <div className="about-hero-content reveal">
            <h1 className="about-hero-title two-line-heading">
              <span className="heading-line">Precision Computer Repairs,</span>
              <em className="highlight-text heading-line">Infrastructure &amp; IT Solutions.</em>
            </h1>
            <p className="about-hero-sub">
              Established in 2014 at Pentagon, Mahalaxmi Five Roads. We combine certified chip-level diagnostics with genuine OEM replacement parts, serving over 12,000 corporate clients, professionals, and home users across Ahmedabad.
            </p>
            <div className="about-hero-pills">
              <span className="pill-tag">Certified Multi-Brand Lab</span>
              <span className="pill-tag">Component-Level Board Repair</span>
              <span className="pill-tag">Upfront Estimates Before Work</span>
            </div>
          </div>
          <div className="about-hero-image-wrap reveal from-right">
            <img
              src="/assets/images/about_real_workshop.jpg?v=2"
              alt="Krupam Infotech computer repair workshop and diagnostics workstation in Paldi Ahmedabad"
              className="about-hero-img"
            />
          </div>
        </div>
      </section>

      {/* Operational Metrics */}
      <section className="about-stats-band">
        <div className="container about-stats-grid">
          <div className="about-stat-box reveal">
            <div className="stat-num-row">
              <strong className="stat-val">12K</strong>
              <span className="stat-plus">+</span>
            </div>
            <span className="stat-title">Computers &amp; Laptops Repaired</span>
            <p className="stat-desc">Component-level motherboard repair, liquid damage recovery, and display replacements.</p>
          </div>
          <div className="about-stat-box reveal">
            <div className="stat-num-row">
              <strong className="stat-val">35</strong>
              <span className="stat-plus">+</span>
            </div>
            <span className="stat-title">Years Technical Experience</span>
            <p className="stat-desc">Senior engineers with hands-on expertise across legacy and modern architectures.</p>
          </div>
          <div className="about-stat-box reveal">
            <div className="stat-num-row">
              <strong className="stat-val">50</strong>
              <span className="stat-plus">+</span>
            </div>
            <span className="stat-title">Hardware &amp; Network Specialists</span>
            <p className="stat-desc">Lab technicians and on-site field engineers supporting businesses and homes.</p>
          </div>
          <div className="about-stat-box reveal">
            <div className="stat-num-row">
              <strong className="stat-val">99.4</strong>
              <span className="stat-plus">%</span>
            </div>
            <span className="stat-title">Repair Resolution Rate</span>
            <p className="stat-desc">Every serviced device undergoes multi-hour continuous thermal and diagnostic testing.</p>
          </div>
        </div>
      </section>

      {/* Workshop & Service Standards */}
      <section className="about-story-section section-large">
        <div className="container story-split-grid">
          <div className="story-left reveal from-left">
            <h2 className="two-line-heading">
              <span className="heading-line">Straightforward technical advice,</span>
              <em className="heading-line">honest estimates, and lasting fixes.</em>
            </h2>
            <p>
              When a laptop fails or an office server encounters hardware errors, customers need practical answers without confusing jargon or inflated replacement costs.
            </p>
            <p>
              At our Paldi diagnostic center, we inspect faulty motherboards under high-magnification optical microscopes to identify the exact short-circuit or failed SMD component. We explain your repair options clearly and provide a firm written estimate before starting work. If a device cannot be reliably fixed, you are advised honestly with no diagnostic charges.
            </p>
            <div className="story-cta-row">
              <Link to="/contact" className="button gold">
                Visit Service Center <b>→</b>
              </Link>
              <a href="tel:+919825291017" className="story-phone-link">
                Direct Line: <b>+91 98252 91017</b>
              </a>
            </div>
          </div>

          <div className="story-right-cards reveal from-right">
            <div className="heritage-card">
              <div className="card-glyph">01</div>
              <div>
                <h3>Component-Level Board Diagnostics</h3>
                <p>We trace faulty power rails, rebuild broken PCB traces, and replace individual ICs and capacitors, saving customers up to 70% compared to full board replacement.</p>
              </div>
            </div>
            <div className="heritage-card">
              <div className="card-glyph">02</div>
              <div>
                <h3>Genuine OEM Replacement Parts</h3>
                <p>Authentic displays, batteries, cooling fans, and certified storage modules sourced directly through authorized manufacturer distributor networks.</p>
              </div>
            </div>
            <div className="heritage-card">
              <div className="card-glyph">03</div>
              <div>
                <h3>Written Service Warranty</h3>
                <p>All hardware repairs are backed by our 30 to 90-day comprehensive written service warranty, covering replacement parts and workmanship.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Milestones */}
      <section className="about-milestones-section">
        <div className="container">
          <div className="milestones-head reveal">
            <h2>
              <span className="milestone-line">Consistent technical</span>{' '}
              <span className="milestone-line">reliability</span>
              <span className="desktop-break"><br /></span>
              <em className="milestone-line">in Ahmedabad since 2014.</em>
            </h2>
          </div>
          <div className="milestones-grid">
            {MILESTONES.map((item, index) => (
              <div key={item.year} className="milestone-card reveal" style={{ animationDelay: `${index * 0.12}s` }}>
                <div className="milestone-header">
                  <span className="milestone-year">{item.year}</span>
                  <span className="milestone-dot"></span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Feedback */}
      <section className="about-reviews-section section-large">
        <div className="container">
          <div className="voices-head reveal">
            <div>
              <div className="google-badge-pill">
                <span className="stars-gold">★★★★★</span>
                <span className="badge-text">4.9 / 5.0 Google Customer Reviews</span>
              </div>
              <h2 className="voices-one-line-title">
                Verified feedback from <em>clients across Ahmedabad.</em>
              </h2>
            </div>
            <div className="carousel-controls desktop-carousel-controls">
              <button
                type="button"
                className="carousel-btn prev-btn"
                aria-label="Previous review"
                onClick={() => scrollVoices('prev')}
              >
                ❮
              </button>
              <button
                type="button"
                className="carousel-btn next-btn"
                aria-label="Next review"
                onClick={() => scrollVoices('next')}
              >
                ❯
              </button>
            </div>
          </div>

          <div className="voices-grid" ref={voicesGridRef}>
            {REVIEWS.map((rev) => (
              <blockquote key={rev.id} className="voice-card-luxury reveal">
                <div className="voice-card-top">
                  <span className="voice-stars">★★★★★</span>
                  <span className="verified-tag">✓ {rev.role}</span>
                </div>
                <p className="voice-quote">&ldquo;{rev.quote}&rdquo;</p>
                <div className="voice-author-luxury">
                  <div className="author-avatar">{rev.author.charAt(0)}</div>
                  <div>
                    <h4>{rev.author}</h4>
                    <small>Ahmedabad, Gujarat</small>
                  </div>
                </div>
              </blockquote>
            ))}
          </div>

          {/* Mobile carousel controls centered below the reviews slider */}
          <div className="carousel-controls mobile-carousel-controls">
            <button
              type="button"
              className="carousel-btn prev-btn"
              aria-label="Previous review"
              onClick={() => scrollVoices('prev')}
            >
              ❮
            </button>
            <button
              type="button"
              className="carousel-btn next-btn"
              aria-label="Next review"
              onClick={() => scrollVoices('next')}
            >
              ❯
            </button>
          </div>
        </div>
      </section>

      {/* Direct Contact CTA */}
      <section className="about-final-cta section-large">
        <div className="container about-cta-box reveal">
          <div className="about-cta-grid">
            {/* Left Column: Heading & Clear Actions */}
            <div className="about-cta-left">
              <h2>
                Speak directly with an engineer <br />
                <em>about your hardware or IT requirement.</em>
              </h2>
              <p>
                Whether you need urgent chip-level laptop diagnostics, genuine spare parts, or corporate IT maintenance, our technical specialists in Paldi are ready to help.
              </p>
              <div className="about-cta-buttons">
                <a href="tel:+919825291017" className="cta-btn-gold">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  Call +91 98252 91017
                </a>
                <Link to="/contact" className="cta-btn-outline">
                  Send Service Enquiry <span>→</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Workshop Direct Info Card (Fills Void) */}
            <div className="about-cta-card-info">
              <div className="cta-info-item">
                <span className="info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div>
                  <strong>Paldi Service Center</strong>
                  <p>GF-6, Pentagon, Opp. Pratiksha Complex, Mahalaxmi Five Roads, Paldi, Ahmedabad 380007</p>
                </div>
              </div>

              <div className="cta-info-item">
                <span className="info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <div>
                  <strong>Direct Email</strong>
                  <a href="mailto:nirdesh_shah@yahoo.com">nirdesh_shah@yahoo.com</a>
                </div>
              </div>

              <div className="cta-status-badge">
                <span className="live-pulse-dot"></span>
                <span>Open Mon–Sat · 9:00 AM – 7:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
