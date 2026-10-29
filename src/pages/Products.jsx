import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const PRODUCTS_DATA = [
  {
    id: 'KI / 01',
    category: 'Systems',
    title: 'Laptop & Desktop Full Setup',
    badge: 'Complete setup',
    desc: 'A ready-to-work computer package configured around home, study, office or business requirements.',
    image: '/assets/images/products/product-systems.webp',
    cardType: 'feature-card',
    revealDir: 'left',
    icon: (
      <svg className="ki-icon" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m12 2 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
      </svg>
    )
  },
  {
    id: 'KI / 02',
    category: 'Components',
    title: 'Intel Core i5 10th Gen Processor',
    badge: 'Core performance',
    desc: 'A dependable processor option for productive everyday desktops and practical performance builds.',
    image: '/assets/images/products/product-components.webp',
    cardType: 'portrait-card',
    revealDir: 'right',
    icon: (
      <svg className="ki-icon" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="6" y="6" width="12" height="12" rx="2" />
        <rect x="9" y="9" width="6" height="6" rx="1" />
        <path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4" />
      </svg>
    )
  },
  {
    id: 'KI / 03',
    category: 'Power',
    title: 'Remax RP-W10 Fast Charger',
    badge: 'Fast charging',
    desc: 'A compact fast-charging solution for compatible devices and everyday desks.',
    image: '/assets/images/products/product-accessories.webp',
    cardType: 'standard-card',
    revealDir: 'left',
    icon: (
      <svg className="ki-icon" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
      </svg>
    )
  },
  {
    id: 'KI / 04',
    category: 'Peripherals',
    title: 'Apacer AH353 Multimedia Keyboard',
    badge: 'Everyday input',
    desc: 'A full-size multimedia keyboard made for comfortable, dependable daily use.',
    image: '/assets/images/products/product-peripherals.webp',
    cardType: 'standard-card',
    revealDir: 'right',
    icon: (
      <svg className="ki-icon" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M10 14h8" />
      </svg>
    )
  },
  {
    id: 'KI / 05',
    category: 'Peripherals',
    title: 'BenQ GR876 Multifunction Mouse',
    badge: 'Precise control',
    desc: 'A versatile mouse for smooth navigation across work, study and home setups.',
    image: '/assets/images/products/product-peripherals.webp',
    cardType: 'standard-card',
    revealDir: 'left',
    icon: (
      <svg className="ki-icon" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="7" y="2" width="10" height="20" rx="5" />
        <path d="M12 2v6m-5 2h10" />
      </svg>
    )
  },
  {
    id: 'KI / 06',
    category: 'Networking',
    title: 'TP-Link Dual-Antenna Home Router',
    badge: 'Stable Wi-Fi',
    desc: 'Dual-antenna wireless coverage designed for reliable home and small-office connectivity.',
    image: '/assets/images/products/product-networking.webp',
    cardType: 'feature-card',
    revealDir: 'right',
    icon: (
      <svg className="ki-icon" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 8.8a14 14 0 0 1 18 0M6 12.3a9.5 9.5 0 0 1 12 0M9.5 16a4 4 0 0 1 5 0" />
        <circle cx="12" cy="20" r=".7" fill="currentColor" stroke="none" />
      </svg>
    )
  },
  {
    id: 'KI / 07',
    category: 'Storage',
    title: 'Apacer AH353 Hard Drive',
    badge: 'More capacity',
    desc: 'An external storage option for expanding capacity, organising files and practical backups.',
    image: '/assets/images/products/product-storage.webp',
    cardType: 'portrait-card',
    revealDir: 'left',
    icon: (
      <svg className="ki-icon" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
      </svg>
    )
  },
  {
    id: 'KI / 08',
    category: 'Power',
    title: 'BenQ GX750M Power Supply',
    badge: 'Steady power',
    desc: 'A desktop power-supply option for compatible system builds and replacement requirements.',
    image: '/assets/images/products/product-components.webp',
    cardType: 'standard-card',
    revealDir: 'right',
    icon: (
      <svg className="ki-icon" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
      </svg>
    )
  },
  {
    id: 'KI / 09',
    category: 'Storage',
    title: 'SanDisk AH353 Pen Drive',
    badge: 'Portable files',
    desc: 'Compact portable storage for carrying documents, media and everyday files.',
    image: '/assets/images/products/product-storage.webp',
    cardType: 'standard-card',
    revealDir: 'left',
    icon: (
      <svg className="ki-icon" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
      </svg>
    )
  },
  {
    id: 'KI / 10',
    category: 'Systems',
    title: 'New & Pre-Owned Laptops',
    badge: 'Mobile computing',
    desc: 'New and quality-checked second-hand laptop choices matched to your workload and budget.',
    image: '/assets/images/products/product-systems.webp',
    cardType: 'standard-card',
    revealDir: 'right',
    icon: (
      <svg className="ki-icon" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="4" width="16" height="11" rx="1.5" />
        <path d="m2 19 2-4h16l2 4H2Z" />
      </svg>
    )
  },
  {
    id: 'KI / 11',
    category: 'Systems',
    title: 'Custom & Branded Desktops',
    badge: 'Built to fit',
    desc: 'Custom-built, branded and certified pre-owned desktops for homes, shops and offices.',
    image: '/assets/images/products/product-systems.webp',
    cardType: 'feature-card',
    revealDir: 'left',
    icon: (
      <svg className="ki-icon" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="13" rx="2" />
        <path d="M8 21h8M12 16v5" />
      </svg>
    )
  },
  {
    id: 'KI / 12',
    category: 'Accessories',
    title: 'Laptop Bags & Adapters',
    badge: 'Carry & connect',
    desc: 'Practical laptop bags, compatible adapters and desk-ready connectivity essentials.',
    image: '/assets/images/products/product-accessories.webp',
    cardType: 'portrait-card',
    revealDir: 'right',
    icon: (
      <svg className="ki-icon" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 8V6a6 6 0 0 1 12 0v2" />
        <rect x="3" y="8" width="18" height="13" rx="2" />
        <path d="M8 12v1m8-1v1" />
      </svg>
    )
  }
];

const CATEGORIES = [
  'All',
  'Systems',
  'Components',
  'Peripherals',
  'Networking',
  'Storage',
  'Power',
  'Accessories'
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      const matchesCategory =
        activeCategory === 'All' || product.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch =
        searchQuery.trim() === '' ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <>
      {/* Catalog Intro */}
      <section className="catalog-intro section-large products-top-spacing">
        <div className="container catalog-intro-grid">
          <div className="catalog-statement reveal from-left">
            <h2>
              <span className="catalog-heading-line">Not a crowded shelf.</span>
              <em className="catalog-heading-line">A considered choice.</em>
            </h2>
          </div>
          <div className="catalog-copy reveal from-right">
            <p>
              Tell us the job, the environment and your budget. We help narrow
              down compatible options, explain the trade-offs and prepare a
              setup that makes sense.
            </p>
            <div className="catalog-metrics">
              <span><b>12</b> product lines</span>
              <span><b>08</b> clear categories</span>
              <span><b>01</b> local support team</span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <section className="product-catalog section-large">
        <div className="container">
          <div className="catalog-toolbar-luxury reveal">
            <div
              className="catalog-toolbar-top"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '20px',
                flexWrap: 'wrap'
              }}
            >
              <div className="catalog-meta-info" style={{ display: 'flex', alignItems: 'center' }}>
                <h3
                  className="catalog-count"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '22px',
                    fontWeight: 700,
                    color: '#68142c',
                    margin: 0,
                    lineHeight: 1,
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: '8px'
                  }}
                >
                  {filteredProducts.length}{' '}
                  <span
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#6a5a60'
                    }}
                  >
                    {filteredProducts.length === 1 ? 'Product Available' : 'Products Available'}
                  </span>
                </h3>
              </div>
              <div
                className="catalog-search-luxury"
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  width: '340px',
                  maxWidth: '100%'
                }}
              >
                <span
                  className="search-icon"
                  style={{
                    position: 'absolute',
                    left: '16px',
                    color: '#d4af37',
                    display: 'flex',
                    alignItems: 'center',
                    pointerEvents: 'none'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Search by brand, category or model..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search products"
                  style={{
                    width: '100%',
                    height: '44px',
                    padding: '0 20px 0 46px',
                    background: '#fdfbf8',
                    border: '1.5px solid rgba(212, 175, 55, 0.35)',
                    borderRadius: '999px',
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '13.5px',
                    color: '#1a1a1a',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div className="filter-pills-luxury" role="group" aria-label="Filter products by category">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`filter-pill-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="catalog-grid" data-stagger="true">
            {filteredProducts.map((p) => (
              <article
                key={p.id}
                className={`catalog-card reveal ${p.cardType || ''}`}
                data-reveal={p.revealDir}
              >
                <div className="catalog-visual">
                  <img src={p.image} alt={p.title} loading="lazy" />
                </div>
                <div className="catalog-info">
                  <div>
                    <div
                      className="catalog-meta"
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '8px 12px',
                        width: '100%',
                        marginBottom: '14px',
                        flexWrap: 'wrap'
                      }}
                    >
                      <span style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
                        {p.category}
                      </span>
                      <i
                        style={{
                          textAlign: 'right',
                          fontStyle: 'normal'
                        }}
                      >
                        Available on enquiry
                      </i>
                    </div>
                    <h2>{p.title}</h2>
                    <p>{p.desc}</p>
                  </div>
                  <Link to={`/contact?product=${encodeURIComponent(p.title)}`}>
                    Ask about this product <b>↗</b>
                  </Link>
                </div>
              </article>
            ))}
            {filteredProducts.length === 0 && (
              <div className="catalog-empty-luxury">
                <div className="empty-icon-badge">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                </div>
                <h2>No matching products found</h2>
                <p>
                  We couldn't find any items matching &ldquo;{searchQuery || activeCategory}&rdquo;. Try another search keyword or reset to view the complete collection.
                </p>
                <div className="empty-actions">
                  <button
                    type="button"
                    className="button gold"
                    onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                  >
                    Reset collection <b>↺</b>
                  </button>
                  <Link to="/contact" className="button outline">
                    Custom Enquiry <b>→</b>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Brand Ticker */}
      <section className="brand-ticker" aria-label="Supported technology brands">
        <div className="brand-track">
          <div className="brand-item"><img src="/assets/images/brands/apple.svg" alt="Apple" loading="lazy" decoding="async" /></div>
          <div className="brand-item"><img src="/assets/images/brands/lenovo.svg" alt="Lenovo" loading="lazy" decoding="async" /></div>
          <div className="brand-item"><img src="/assets/images/brands/hp.svg" alt="HP" loading="lazy" decoding="async" /></div>
          <div className="brand-item"><img src="/assets/images/brands/dell.svg" alt="Dell" loading="lazy" decoding="async" /></div>
          <div className="brand-item"><img src="/assets/images/brands/asus.svg" alt="ASUS" loading="lazy" decoding="async" /></div>
          <div className="brand-item"><img src="/assets/images/brands/acer.svg" alt="Acer" loading="lazy" decoding="async" /></div>
          <div className="brand-item"><img src="/assets/images/brands/msi.svg" alt="MSI" loading="lazy" decoding="async" /></div>
          <div className="brand-item"><img src="/assets/images/brands/samsung.svg" alt="Samsung" loading="lazy" decoding="async" /></div>
          <div className="brand-item"><img src="/assets/images/brands/lg.svg" alt="LG" loading="lazy" decoding="async" /></div>
          <div className="brand-item"><img src="/assets/images/brands/toshiba.svg" alt="Toshiba" loading="lazy" decoding="async" /></div>
          <div className="brand-item"><img src="/assets/images/brands/vaio.svg" alt="VAIO" loading="lazy" decoding="async" /></div>
          {/* Continuous loop duplicates */}
          <div className="brand-item"><img src="/assets/images/brands/apple.svg" alt="Apple" loading="lazy" decoding="async" /></div>
          <div className="brand-item"><img src="/assets/images/brands/lenovo.svg" alt="Lenovo" loading="lazy" decoding="async" /></div>
          <div className="brand-item"><img src="/assets/images/brands/hp.svg" alt="HP" loading="lazy" decoding="async" /></div>
          <div className="brand-item"><img src="/assets/images/brands/dell.svg" alt="Dell" loading="lazy" decoding="async" /></div>
          <div className="brand-item"><img src="/assets/images/brands/asus.svg" alt="ASUS" loading="lazy" decoding="async" /></div>
          <div className="brand-item"><img src="/assets/images/brands/acer.svg" alt="Acer" loading="lazy" decoding="async" /></div>
          <div className="brand-item"><img src="/assets/images/brands/msi.svg" alt="MSI" loading="lazy" decoding="async" /></div>
          <div className="brand-item"><img src="/assets/images/brands/samsung.svg" alt="Samsung" loading="lazy" decoding="async" /></div>
          <div className="brand-item"><img src="/assets/images/brands/lg.svg" alt="LG" loading="lazy" decoding="async" /></div>
          <div className="brand-item"><img src="/assets/images/brands/toshiba.svg" alt="Toshiba" loading="lazy" decoding="async" /></div>
          <div className="brand-item"><img src="/assets/images/brands/vaio.svg" alt="VAIO" loading="lazy" decoding="async" /></div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="cta-section"
        style={{
          padding: '80px 0',
          background: 'linear-gradient(135deg, #5c1024 0%, #3a0718 50%, #20040d 100%)',
          width: '100%',
          display: 'block',
          boxSizing: 'border-box'
        }}
      >
        <div
          className="container cta reveal"
          style={{
            maxWidth: '1060px',
            width: '86%',
            margin: '0 auto',
            padding: '0 24px',
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '50px',
            boxSizing: 'border-box'
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(2rem, 3.2vw, 2.9rem)',
                lineHeight: 1.2,
                margin: 0,
                color: '#ffffff'
              }}
            >
              Tell us the requirement.<br />
              <em
                style={{
                  color: '#f4d785',
                  fontStyle: 'italic',
                  fontWeight: 600
                }}
              >
                We'll find the fit.
              </em>
            </h2>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '16px'
            }}
          >
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '15px',
                lineHeight: 1.65,
                color: 'rgba(255, 255, 255, 0.92)',
                margin: 0
              }}
            >
              Call, visit or send your product enquiry. We'll confirm
              current options and availability.
            </p>
            <Link
              to="/contact"
              className="button gold"
              style={{
                margin: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              Start an enquiry <b>↗</b>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

