import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

const SERVICES_LIST = [
  { code: '01', title: 'Computer & Laptop Repair', hash: 'service-01' },
  { code: '02', title: 'Computers & Workstations', hash: 'service-02' },
  { code: '03', title: 'CCTV Repair & Service', hash: 'service-03' },
  { code: '04', title: 'Software Development', hash: 'service-04' },
  { code: '05', title: 'Hardware & Peripherals', hash: 'service-05' },
  { code: '06', title: 'Monitor & Display Repair', hash: 'service-06' },
  { code: '07', title: 'Printers, Parts & Software', hash: 'service-07' },
  { code: '08', title: 'Office Equipment Care', hash: 'service-08' },
  { code: '09', title: 'User Interface Design', hash: 'service-09' }
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setIsServicesOpen(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsServicesOpen(false);
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  };

  const getNavLinkClass = (targetPath) => {
    const current = location.pathname;
    const isMatch = targetPath === '/' ? current === '/' : current === targetPath;
    return isMatch ? 'active' : '';
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav">
        <Link to="/" className="brand" aria-label="Krupam Infotech" onClick={closeMenu}>
          <img
            src="/assets/images/krupam_logo__1_-removebg-preview.png"
            alt="Krupam Infotech Logo"
            className="brand-logo-img"
          />
        </Link>

        <nav className={isMenuOpen ? 'open' : ''}>
          <NavLink
            to="/"
            end
            className={() => getNavLinkClass('/')}
            onClick={closeMenu}
          >
            Home
          </NavLink>

          {/* Services Dropdown */}
          <div
            className={`nav-dropdown ${isServicesOpen ? 'open' : ''}`}
            onMouseEnter={() => {
              if (window.innerWidth > 1024) setIsServicesOpen(true);
            }}
            onMouseLeave={() => {
              if (window.innerWidth > 1024) setIsServicesOpen(false);
            }}
          >
            <div className="nav-dropdown-header">
              <NavLink
                to="/services"
                className={() => `${getNavLinkClass('/services')} nav-dropdown-link`}
                onClick={(e) => {
                  if (window.innerWidth <= 1024) {
                    e.preventDefault();
                    setIsServicesOpen((prev) => !prev);
                  } else {
                    closeMenu();
                  }
                }}
              >
                <span>Services</span>
                <span
                  className={`nav-dropdown-toggle-icon ${isServicesOpen ? 'rotated' : ''}`}
                  aria-hidden="true"
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </NavLink>
            </div>

            <div className={`nav-dropdown-menu ${isServicesOpen ? 'show' : ''}`}>
              <div className="dropdown-menu-inner">
                <Link
                  to="/services"
                  className="dropdown-item dropdown-item-all"
                  onClick={closeMenu}
                >
                  <span className="dropdown-all-text">All Services Overview</span>
                  <span className="dropdown-arrow">→</span>
                </Link>

                <div className="dropdown-divider" />

                <div className="dropdown-items-grid">
                  {SERVICES_LIST.map((srv) => (
                    <Link
                      key={srv.code}
                      to={`/services#${srv.hash}`}
                      className="dropdown-item"
                      onClick={closeMenu}
                    >
                      <span className="dropdown-item-code">{srv.code}</span>
                      <span className="dropdown-item-title">{srv.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <NavLink
            to="/products"
            className={() => getNavLinkClass('/products')}
            onClick={closeMenu}
          >
            Products
          </NavLink>
          <NavLink
            to="/about"
            className={() => getNavLinkClass('/about')}
            onClick={closeMenu}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={() => getNavLinkClass('/contact')}
            onClick={closeMenu}
          >
            Contact
          </NavLink>
        </nav>

        <div className="nav-actions">
          <a className="phone" href="tel:+919825291017">
            <svg
              className="ki-icon"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <b>+91 98252 91017</b>
          </a>

          <Link to="/contact" className="button maroon compact" onClick={closeMenu}>
            GET SUPPORT
            <svg
              className="ki-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </svg>
          </Link>

          <button
            className={`menu ${isMenuOpen ? 'open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <i></i>
            <i></i>
            <i></i>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div
          className="mobile-nav-backdrop"
          aria-hidden="true"
          onClick={closeMenu}
        />
      )}
    </header>
  );
}

