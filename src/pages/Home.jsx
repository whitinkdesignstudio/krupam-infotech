import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

function AnimatedStat({ target, suffix = '', label }) {
  const [displayValue, setDisplayValue] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const duration = 1800;
            const startTime = performance.now();

            const step = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
              const currentVal = Math.round(easeProgress * target);

              setDisplayValue(currentVal);

              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                setDisplayValue(target);
              }
            };

            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div className="stat" ref={elementRef}>
      <strong className="stat-number">
        {displayValue}{suffix}
      </strong>
      <span className="stat-label">{label}</span>
    </div>
  );
}

export default function Home() {
  const reviewsGridRef = useRef(null);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const experienceStepsRef = useRef(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  // Experience section sticky scroll active card observer
  useEffect(() => {
    const container = experienceStepsRef.current;
    if (!container) return;

    const steps = container.querySelectorAll('.experience-step');
    if (!steps.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(steps).indexOf(entry.target);
            if (index !== -1) {
              setActiveStepIndex(index);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -35% 0px',
        threshold: 0.15
      }
    );

    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  const scrollToReview = (index) => {
    const el = reviewsGridRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('.review-card');
    if (cards[index]) {
      const cardLeft = cards[index].offsetLeft - el.offsetLeft;
      el.scrollTo({ left: cardLeft, behavior: 'smooth' });
      setActiveReviewIndex(index);
    }
  };

  // Mobile Reviews Auto-Move Slider
  useEffect(() => {
    const el = reviewsGridRef.current;
    if (!el) return;

    let isInteracting = false;
    let resumeTimer = null;

    const pause = () => {
      isInteracting = true;
      clearTimeout(resumeTimer);
    };

    const resume = () => {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        isInteracting = false;
      }, 3500);
    };

    const handleScroll = () => {
      const cards = el.querySelectorAll('.review-card');
      if (!cards.length) return;
      const scrollCenter = el.scrollLeft + el.clientWidth / 2;
      let closestIdx = 0;
      let minDiff = Infinity;
      cards.forEach((card, idx) => {
        const cardCenter = card.offsetLeft - el.offsetLeft + card.offsetWidth / 2;
        const diff = Math.abs(scrollCenter - cardCenter);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });
      setActiveReviewIndex(closestIdx);
    };

    el.addEventListener('pointerdown', pause, { passive: true });
    el.addEventListener('touchstart', pause, { passive: true });
    window.addEventListener('pointerup', resume, { passive: true });
    window.addEventListener('touchend', resume, { passive: true });
    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', resume);
    el.addEventListener('scroll', handleScroll, { passive: true });

    const autoMoveInterval = setInterval(() => {
      if (isInteracting) return;
      // Only auto-slide if horizontally scrollable (i.e. on mobile/tablet slider mode)
      if (el.scrollWidth <= el.clientWidth + 15) return;

      const cards = el.querySelectorAll('.review-card');
      if (!cards.length) return;

      setActiveReviewIndex((prev) => {
        const next = (prev + 1) % cards.length;
        const nextCard = cards[next];
        if (nextCard) {
          const targetLeft = nextCard.offsetLeft - el.offsetLeft;
          el.scrollTo({ left: targetLeft, behavior: 'smooth' });
        }
        return next;
      });
    }, 3600);

    return () => {
      clearInterval(autoMoveInterval);
      clearTimeout(resumeTimer);
      el.removeEventListener('pointerdown', pause);
      el.removeEventListener('touchstart', pause);
      window.removeEventListener('pointerup', resume);
      window.removeEventListener('touchend', resume);
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('mouseleave', resume);
      el.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const model = document.getElementById('laptop3D');
    const scene = document.getElementById('laptopScene');
    const section = document.getElementById('repair360');
    const cursorLight = document.getElementById('cursorLight');
    const progressBar = document.getElementById('rotationProgress');

    if (!model || !scene || !section) return;

    const CAMERA_DISTANCE = '11m';
    const BASE_VERTICAL_ANGLE = 72;

    let scrollRotation = 0;
    let autoRotation = 0;
    let targetMouseX = 0;
    let targetMouseY = BASE_VERTICAL_ANGLE;
    let currentMouseX = 0;
    let currentMouseY = BASE_VERTICAL_ANGLE;
    let userDragging = false;
    let dragReleaseTimer = null;
    let animationFrameId = null;

    const handleMouseMove = (event) => {
      if (userDragging) return;
      const rect = scene.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      targetMouseX = (x - 0.5) * 32;
      targetMouseY = BASE_VERTICAL_ANGLE + (y - 0.5) * 10;

      if (cursorLight) {
        cursorLight.style.left = event.clientX - rect.left + 'px';
        cursorLight.style.top = event.clientY - rect.top + 'px';
        cursorLight.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      targetMouseX = 0;
      targetMouseY = BASE_VERTICAL_ANGLE;
      if (cursorLight) {
        cursorLight.style.opacity = '0';
      }
    };

    const handlePointerDown = () => {
      userDragging = true;
      clearTimeout(dragReleaseTimer);
    };

    const handlePointerUp = () => {
      dragReleaseTimer = setTimeout(() => {
        userDragging = false;
      }, 500);
    };

    scene.addEventListener('mousemove', handleMouseMove);
    scene.addEventListener('mouseleave', handleMouseLeave);
    model.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    let isLoaded = !!model.loaded;
    const handleModelLoad = () => {
      isLoaded = true;
    };
    model.addEventListener('load', handleModelLoad);
    if (model.loaded) {
      isLoaded = true;
    }

    function animateModel() {
      if (!userDragging && (isLoaded || model.loaded)) {
        currentMouseX += (targetMouseX - currentMouseX) * 0.055;
        currentMouseY += (targetMouseY - currentMouseY) * 0.055;

        autoRotation += 0.35;
        const finalHorizontal = autoRotation + scrollRotation + currentMouseX;

        model.setAttribute(
          'camera-orbit',
          `${finalHorizontal}deg ${currentMouseY}deg ${CAMERA_DISTANCE}`
        );
      }
      animationFrameId = requestAnimationFrame(animateModel);
    }
    animateModel();

    function updateScrollRotation() {
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const journey = viewportHeight + rect.height;
      const travelled = viewportHeight - rect.top;

      let progress = Math.max(0, Math.min(1, travelled / journey));
      scrollRotation = progress * 360;

      if (progressBar) {
        progressBar.style.height = `${progress * 100}%`;
      }
    }

    let scrollTicking = false;
    const handleScroll = () => {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          updateScrollRotation();
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollRotation();

    return () => {
      scene.removeEventListener('mousemove', handleMouseMove);
      scene.removeEventListener('mouseleave', handleMouseLeave);
      model.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('scroll', handleScroll);
      model.removeEventListener('load', handleModelLoad);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      clearTimeout(dragReleaseTimer);
    };
  }, []);

  return (
    <>
      {/* iVenus Box-Style Hero Banner */}
      <section className="ivenus-hero">
        <div className="container">
          <div className="ih-box dark-banner">
            <div className="ih-left reveal">
              <h1 className="ih-headline">
                Ahmedabad's Trusted Tech Clinic. <br />
                <em className="ih-highlight">Laptops, PCs &amp; CCTV.</em>
              </h1>
              <p className="ih-sub">
                Certified chip-level hardware repairs, genuine spare parts, and dependable digital security. Serving homes, students, and businesses at Paldi since 2014.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <section className="stats-band">
        <div className="container stats">
          <AnimatedStat
            target={12}
            suffix="+"
            label={<>Years Serving<br />Ahmedabad</>}
          />
          <div className="stat-divider"></div>
          <AnimatedStat
            target={12}
            suffix="K+"
            label={<>Laptops &amp; PCs<br />Restored</>}
          />
          <div className="stat-divider"></div>
          <AnimatedStat
            target={100}
            suffix="%"
            label={<>Genuine<br />Spare Parts</>}
          />
          <div className="stat-divider"></div>
          <AnimatedStat
            target={99}
            suffix="%"
            label={<>Customer<br />Satisfaction</>}
          />
        </div>
      </section>

      {/* Brand Section Intro */}
      <div className="brand-intro">
        <div className="container">
          <h2 className="brand-ticker-title reveal">
            Brands We Service &amp; <em>Support.</em>
          </h2>
          <p className="brand-ticker-sub">
            Genuine replacement parts and certified diagnostics for every major brand.
          </p>
        </div>
      </div>

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

      {/* Services Preview */}
      <section className="section services-preview">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <h2>Expertise that keeps you <em>moving forward.</em></h2>
            </div>
            <p>
              From a slow laptop to a complete office setup, our specialists
              solve technology challenges with clarity, care and lasting
              results.
            </p>
          </div>
          <div className="service-grid">
            {/* Card 1: Laptop & Desktop Repair */}
            <Link
              to="/services"
              className="service-card service-card-split reveal"
            >
              <div className="service-card-media">
                <img
                  src="/assets/images/service_laptop_repair.jpg?v=4"
                  alt="Laptop & Desktop Repair"
                  loading="lazy"
                />
              </div>
              <div className="service-card-body">
                <h3 style={{ color: '#1a080e', textShadow: 'none' }}>Laptop &amp; Desktop Repair</h3>
                <p style={{ color: '#4a3e43', textShadow: 'none' }}>
                  Broken screens, liquid spills, overheating fans, and dead motherboards repaired with microscope precision.
                </p>
                <div className="service-card-action">
                  <span className="action-label" style={{ textShadow: 'none' }}>Explore Service</span>
                  <span className="round-arrow">
                    <svg className="ki-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>

            {/* Card 2: CCTV & Smart Security */}
            <Link
              to="/services"
              className="service-card service-card-split reveal"
            >
              <div className="service-card-media">
                <img
                  src="/assets/images/service_cctv_security.jpg?v=4"
                  alt="CCTV & Smart Security"
                  loading="lazy"
                />
              </div>
              <div className="service-card-body">
                <h3 style={{ color: '#1a080e', textShadow: 'none' }}>CCTV &amp; Smart Security</h3>
                <p style={{ color: '#4a3e43', textShadow: 'none' }}>
                  HD surveillance setups, DVR/NVR network configuration, and same-day maintenance for homes, retail shops, and offices.
                </p>
                <div className="service-card-action">
                  <span className="action-label" style={{ textShadow: 'none' }}>Explore Service</span>
                  <span className="round-arrow">
                    <svg className="ki-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>

            {/* Card 3: SSD Upgrades & Software */}
            <Link
              to="/services"
              className="service-card service-card-split reveal"
            >
              <div className="service-card-media">
                <img
                  src="/assets/images/service_software_digital.jpg?v=4"
                  alt="SSD Upgrades & Software"
                  loading="lazy"
                />
              </div>
              <div className="service-card-body">
                <h3 style={{ color: '#1a080e', textShadow: 'none' }}>SSD Upgrades &amp; Software</h3>
                <p style={{ color: '#4a3e43', textShadow: 'none' }}>
                  Supercharge slow computers with high-speed SSDs, clean OS installation, virus removal, and secure data recovery.
                </p>
                <div className="service-card-action">
                  <span className="action-label" style={{ textShadow: 'none' }}>Explore Service</span>
                  <span className="round-arrow">
                    <svg className="ki-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <div className="center">
            <Link to="/services" className="button outline">
              View all services <b>→</b>
            </Link>
          </div>
        </div>
      </section>

      {/* Motion Products Marquee Section */}
      <section className="motion-products">
        <div className="container motion-heading reveal">
          <div>
            <h2>
              <span className="motion-line">Genuine hardware</span>{' '}
              <span className="motion-line">&amp; quality tech.</span>{' '}
              <em className="motion-line">Tested by engineers.</em>
            </h2>
          </div>
          <p>
            From high-speed business laptops to custom workstation PCs and surveillance gear. Every item is inspected by our bench technicians before reaching your desk.
          </p>
        </div>
        <div className="marquee-window" aria-label="Featured product categories">
          {/* Row Left */}
          <div className="marquee-row row-left">
            <div className="marquee-track">
              <Link to="/products" className="motion-card ruby" aria-hidden="false">
                <span className="motion-tag">COMPUTING</span>
                <span className="motion-icon">
                  <svg className="ki-icon" width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="13" rx="2" />
                    <path d="M8 21h8M12 16v5" />
                  </svg>
                </span>
                <div>
                  <h3>Custom Performance PC</h3>
                  <p>Built for work, creativity and speed.</p>
                </div>
                <b>↗</b>
              </Link>
              <Link to="/products" className="motion-card champagne" aria-hidden="false">
                <span className="motion-tag">MOBILITY</span>
                <span className="motion-icon">
                  <svg className="ki-icon" width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="4" y="4" width="16" height="11" rx="1.5" />
                    <path d="m2 19 2-4h16l2 4H2Z" />
                  </svg>
                </span>
                <div>
                  <h3>Business Laptops</h3>
                  <p>Dependable power, ready to move.</p>
                </div>
                <b>↗</b>
              </Link>
              <Link to="/products" className="motion-card rose" aria-hidden="false">
                <span className="motion-tag">SECURITY</span>
                <span className="motion-icon">
                  <svg className="ki-icon" width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 2 20 5v6c0 5.2-3.5 9-8 11-4.5-2-8-5.8-8-11V5l8-3Z" />
                    <path d="m8.5 12 2.2 2.2 4.8-5" />
                  </svg>
                </span>
                <div>
                  <h3>Smart CCTV Systems</h3>
                  <p>Clearer vision for every space.</p>
                </div>
                <b>↗</b>
              </Link>
              <Link to="/products" className="motion-card sand" aria-hidden="false">
                <span className="motion-tag">NETWORK</span>
                <span className="motion-icon">
                  <svg className="ki-icon" width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 8.8a14 14 0 0 1 18 0M6 12.3a9.5 9.5 0 0 1 12 0M9.5 16a4 4 0 0 1 5 0" />
                    <circle cx="12" cy="20" r=".7" fill="currentColor" stroke="none" />
                  </svg>
                </span>
                <div>
                  <h3>Wi-Fi &amp; Routers</h3>
                  <p>Stable coverage without the guesswork.</p>
                </div>
                <b>↗</b>
              </Link>
              <Link to="/products" className="motion-card ruby" aria-hidden="false">
                <span className="motion-tag">ESSENTIALS</span>
                <span className="motion-icon">
                  <svg className="ki-icon" width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M10 14h8" />
                  </svg>
                </span>
                <div>
                  <h3>Premium Accessories</h3>
                  <p>Keyboards, mice, hubs and more.</p>
                </div>
                <b>↗</b>
              </Link>
              <Link to="/products" className="motion-card champagne" aria-hidden="false">
                <span className="motion-tag">STORAGE</span>
                <span className="motion-icon">
                  <svg className="ki-icon" width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <ellipse cx="12" cy="5" rx="8" ry="3" />
                    <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
                  </svg>
                </span>
                <div>
                  <h3>SSD &amp; Data Upgrades</h3>
                  <p>More speed, space and confidence.</p>
                </div>
                <b>↗</b>
              </Link>
              {/* Duplicate set for seamless continuous marquee loop */}
              <Link to="/products" className="motion-card ruby" aria-hidden="true" tabIndex="-1">
                <span className="motion-tag">COMPUTING</span>
                <span className="motion-icon">
                  <svg className="ki-icon" width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="3" width="18" height="13" rx="2" />
                    <path d="M8 21h8M12 16v5" />
                  </svg>
                </span>
                <div>
                  <h3>Custom Performance PC</h3>
                  <p>Built for work, creativity and speed.</p>
                </div>
                <b>↗</b>
              </Link>
              <Link to="/products" className="motion-card champagne" aria-hidden="true" tabIndex="-1">
                <span className="motion-tag">MOBILITY</span>
                <span className="motion-icon">
                  <svg className="ki-icon" width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="4" y="4" width="16" height="11" rx="1.5" />
                    <path d="m2 19 2-4h16l2 4H2Z" />
                  </svg>
                </span>
                <div>
                  <h3>Business Laptops</h3>
                  <p>Dependable power, ready to move.</p>
                </div>
                <b>↗</b>
              </Link>
              <Link to="/products" className="motion-card rose" aria-hidden="true" tabIndex="-1">
                <span className="motion-tag">SECURITY</span>
                <span className="motion-icon">
                  <svg className="ki-icon" width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 2 20 5v6c0 5.2-3.5 9-8 11-4.5-2-8-5.8-8-11V5l8-3Z" />
                    <path d="m8.5 12 2.2 2.2 4.8-5" />
                  </svg>
                </span>
                <div>
                  <h3>Smart CCTV Systems</h3>
                  <p>Clearer vision for every space.</p>
                </div>
                <b>↗</b>
              </Link>
              <Link to="/products" className="motion-card sand" aria-hidden="true" tabIndex="-1">
                <span className="motion-tag">NETWORK</span>
                <span className="motion-icon">
                  <svg className="ki-icon" width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 8.8a14 14 0 0 1 18 0M6 12.3a9.5 9.5 0 0 1 12 0M9.5 16a4 4 0 0 1 5 0" />
                    <circle cx="12" cy="20" r=".7" fill="currentColor" stroke="none" />
                  </svg>
                </span>
                <div>
                  <h3>Wi-Fi &amp; Routers</h3>
                  <p>Stable coverage without the guesswork.</p>
                </div>
                <b>↗</b>
              </Link>
              <Link to="/products" className="motion-card ruby" aria-hidden="true" tabIndex="-1">
                <span className="motion-tag">ESSENTIALS</span>
                <span className="motion-icon">
                  <svg className="ki-icon" width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h.01M10 14h8" />
                  </svg>
                </span>
                <div>
                  <h3>Premium Accessories</h3>
                  <p>Keyboards, mice, hubs and more.</p>
                </div>
                <b>↗</b>
              </Link>
              <Link to="/products" className="motion-card champagne" aria-hidden="true" tabIndex="-1">
                <span className="motion-tag">STORAGE</span>
                <span className="motion-icon">
                  <svg className="ki-icon" width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <ellipse cx="12" cy="5" rx="8" ry="3" />
                    <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
                  </svg>
                </span>
                <div>
                  <h3>SSD &amp; Data Upgrades</h3>
                  <p>More speed, space and confidence.</p>
                </div>
                <b>↗</b>
              </Link>
            </div>
          </div>

          {/* Row Right */}
          <div className="marquee-row row-right">
            <div className="marquee-track">
              <Link to="/products" className="motion-card compact-motion champagne" aria-hidden="false">
                <span className="motion-tag">SERVICES</span>
                <span className="motion-icon">
                  <svg className="ki-icon" width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
                    <path d="M12 18v-9" />
                    <path d="M9 12l3-3 3 3" />
                  </svg>
                </span>
                <div>
                  <h3>Data Recovery</h3>
                  <p>Lost files &amp; drive rescue.</p>
                </div>
                <b>↗</b>
              </Link>
              <Link to="/products" className="motion-card compact-motion ruby" aria-hidden="false">
                <span className="motion-tag">PROTECTION</span>
                <span className="motion-icon">
                  <svg className="ki-icon" width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </span>
                <div>
                  <h3>Virus Removal</h3>
                  <p>Clean, protect and secure.</p>
                </div>
                <b>↗</b>
              </Link>
              <Link to="/products" className="motion-card compact-motion sand" aria-hidden="false">
                <span className="motion-tag">SOFTWARE</span>
                <span className="motion-icon">
                  <svg className="ki-icon" width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8" />
                    <path d="M12 17v4" />
                  </svg>
                </span>
                <div>
                  <h3>OS Installation</h3>
                  <p>Windows, apps and tools.</p>
                </div>
                <b>↗</b>
              </Link>
              <Link to="/products" className="motion-card compact-motion rose" aria-hidden="false">
                <span className="motion-tag">CARE</span>
                <span className="motion-icon">
                  <svg className="ki-icon" width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                    <path d="M12 15c-5 0-9-1.34-9-3s4-3 9-3 9 1.34 9 3-4 3-9 3z" />
                    <path d="M12 9V2" />
                    <path d="M12 2l-3 3" />
                    <path d="M12 2l3 3" />
                  </svg>
                </span>
                <div>
                  <h3>Deep Cleaning</h3>
                  <p>Thermal paste &amp; dust removal.</p>
                </div>
                <b>↗</b>
              </Link>
              <Link to="/products" className="motion-card compact-motion champagne" aria-hidden="false">
                <span className="motion-tag">PERFORMANCE</span>
                <span className="motion-icon">
                  <svg className="ki-icon" width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </span>
                <div>
                  <h3>RAM Upgrades</h3>
                  <p>Multitask with absolute ease.</p>
                </div>
                <b>↗</b>
              </Link>
              <Link to="/products" className="motion-card compact-motion ruby" aria-hidden="false">
                <span className="motion-tag">SUPPORT</span>
                <span className="motion-icon">
                  <svg className="ki-icon" width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                  </svg>
                </span>
                <div>
                  <h3>IT Helpdesk</h3>
                  <p>Remote &amp; on-site assistance.</p>
                </div>
                <b>↗</b>
              </Link>
              {/* Duplicate set for seamless continuous marquee loop */}
              <Link to="/products" className="motion-card compact-motion champagne" aria-hidden="true" tabIndex="-1">
                <span className="motion-tag">SERVICES</span>
                <span className="motion-icon">
                  <svg className="ki-icon" width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
                    <path d="M12 18v-9" />
                    <path d="M9 12l3-3 3 3" />
                  </svg>
                </span>
                <div>
                  <h3>Data Recovery</h3>
                  <p>Lost files &amp; drive rescue.</p>
                </div>
                <b>↗</b>
              </Link>
              <Link to="/products" className="motion-card compact-motion ruby" aria-hidden="true" tabIndex="-1">
                <span className="motion-tag">PROTECTION</span>
                <span className="motion-icon">
                  <svg className="ki-icon" width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </span>
                <div>
                  <h3>Virus Removal</h3>
                  <p>Clean, protect and secure.</p>
                </div>
                <b>↗</b>
              </Link>
              <Link to="/products" className="motion-card compact-motion sand" aria-hidden="true" tabIndex="-1">
                <span className="motion-tag">SOFTWARE</span>
                <span className="motion-icon">
                  <svg className="ki-icon" width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8" />
                    <path d="M12 17v4" />
                  </svg>
                </span>
                <div>
                  <h3>OS Installation</h3>
                  <p>Windows, apps and tools.</p>
                </div>
                <b>↗</b>
              </Link>
              <Link to="/products" className="motion-card compact-motion rose" aria-hidden="true" tabIndex="-1">
                <span className="motion-tag">CARE</span>
                <span className="motion-icon">
                  <svg className="ki-icon" width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                    <path d="M12 15c-5 0-9-1.34-9-3s4-3 9-3 9 1.34 9 3-4 3-9 3z" />
                    <path d="M12 9V2" />
                    <path d="M12 2l-3 3" />
                    <path d="M12 2l3 3" />
                  </svg>
                </span>
                <div>
                  <h3>Deep Cleaning</h3>
                  <p>Thermal paste &amp; dust removal.</p>
                </div>
                <b>↗</b>
              </Link>
              <Link to="/products" className="motion-card compact-motion champagne" aria-hidden="true" tabIndex="-1">
                <span className="motion-tag">PERFORMANCE</span>
                <span className="motion-icon">
                  <svg className="ki-icon" width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </span>
                <div>
                  <h3>RAM Upgrades</h3>
                  <p>Multitask with absolute ease.</p>
                </div>
                <b>↗</b>
              </Link>
              <Link to="/products" className="motion-card compact-motion ruby" aria-hidden="true" tabIndex="-1">
                <span className="motion-tag">SUPPORT</span>
                <span className="motion-icon">
                  <svg className="ki-icon" width="29" height="29" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                  </svg>
                </span>
                <div>
                  <h3>IT Helpdesk</h3>
                  <p>Remote &amp; on-site assistance.</p>
                </div>
                <b>↗</b>
              </Link>
            </div>
          </div>
        </div>
        <div className="container motion-footer">
          <Link to="/products" className="button gold">
            View full collection <b>→</b>
          </Link>
        </div>
      </section>

      {/* Experience Process Section */}
      <section className="experience-section">
        <div className="container experience-grid">
          <div className="experience-intro reveal from-left">
            <h2>Honest diagnosis. <em>Zero unnecessary parts.</em></h2>
            <p>
              We explain what went wrong in plain Gujarati or English. You receive an upfront estimate before we touch a single screw, and we never push work you don't need.
            </p>
            <Link to="/contact" className="text-link maroon">
              Book a bench inspection <span>↗</span>
            </Link>
          </div>
          <div className="experience-steps" ref={experienceStepsRef}>
            <article className={`experience-step reveal from-right ${activeStepIndex === 0 ? 'active-step' : ''}`}>
              <span>01</span>
              <div>
                <h3>Free Bench Inspection</h3>
                <p>
                  Bring your device to Paldi. We inspect power rails, chips, and thermals to pinpoint the exact root cause.
                </p>
              </div>
            </article>
            <article className={`experience-step reveal from-right ${activeStepIndex === 1 ? 'active-step' : ''}`}>
              <span>02</span>
              <div>
                <h3>Upfront Price Approval</h3>
                <p>
                  You get a fixed quote for parts and labor. Work only starts after you give the green light.
                </p>
              </div>
            </article>
            <article className={`experience-step reveal from-right ${activeStepIndex === 2 ? 'active-step' : ''}`}>
              <span>03</span>
              <div>
                <h3>Chip-Level Precision Repair</h3>
                <p>
                  Our technicians solder micro-components, fit genuine screens, or install high-speed SSDs on anti-static ESD mats.
                </p>
              </div>
            </article>
            <article className={`experience-step reveal from-right ${activeStepIndex === 3 ? 'active-step' : ''}`}>
              <span>04</span>
              <div>
                <h3>Full Testing &amp; 90-Day Warranty</h3>
                <p>
                  Every repaired unit undergoes thermal and benchmark testing. Handed back with our warranty certificate.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Products Preview Rows */}
      <section className="section products-preview">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <h2>
                <span className="heading-line-2">Find the right machine</span>{' '}
                <span className="heading-line-2">for <em>your world.</em></span>
              </h2>
            </div>
            <Link to="/products" className="text-link maroon">
              Browse all products <span>→</span>
            </Link>
          </div>
          <div className="product-row-list">
            {/* 01 LAPTOP */}
            <div className="showcase-row reveal">
              <div className="s-visual">
                <span className="tag-chip">Laptops</span>
                <img src="/assets/images/showcase-laptop.png" alt="Laptop - Surface & Premium Notebooks" loading="lazy" />
              </div>
              <div className="s-text">
                <span className="s-num">01</span>
                <h3>Laptops</h3>
                <p>For work, study, creation and everything between — chosen for what you actually do with it, not what's easiest to sell.</p>
                <Link to="/products" className="btn-text">Explore Laptops <span className="ar">→</span></Link>
              </div>
            </div>

            {/* 02 DESKTOP */}
            <div className="showcase-row rev reveal">
              <div className="s-text">
                <span className="s-num">02</span>
                <h3>Desktops</h3>
                <p>Full systems built for power, reliability and easy upgrades — configured for home, office or studio use.</p>
                <Link to="/products" className="btn-text">Explore Desktops <span className="ar">→</span></Link>
              </div>
              <div className="s-visual">
                <span className="tag-chip">Desktops</span>
                <img src="/assets/images/showcase-desktop.png" alt="Desktop Monitor - High Performance Systems" loading="lazy" />
              </div>
            </div>

            {/* 03 ACCESSORIES */}
            <div className="showcase-row reveal">
              <div className="s-visual">
                <span className="tag-chip">Accessories</span>
                <img src="/assets/images/showcase-headphones.png" alt="Accessories - Premium Audio & Peripherals" loading="lazy" />
              </div>
              <div className="s-text">
                <span className="s-num">03</span>
                <h3>Accessories</h3>
                <p>Headphones, keyboards, mice, drives and bags — the small things that make everyday work smoother.</p>
                <Link to="/products" className="btn-text">Explore Accessories <span className="ar">→</span></Link>
              </div>
            </div>

            {/* 04 BUSINESS SYSTEM */}
            <div className="showcase-row rev reveal">
              <div className="s-text">
                <span className="s-num">04</span>
                <h3>Business Systems</h3>
                <p>Bulk laptops, tablets and desktops — sourced, configured and delivered for growing teams.</p>
                <Link to="/contact" className="btn-text">Talk Business <span className="ar">→</span></Link>
              </div>
              <div className="s-visual">
                <span className="tag-chip">Business Systems</span>
                <img src="/assets/images/showcase-tablet.png" alt="Business Systems - Corporate Tablets & Workstations" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Maroon Brand Care Section */}
      <section className="maroon-section">
        <div className="container why-grid">
          <div className="why-copy reveal">
            <h2>Real engineering expertise. <em>Personal human care.</em></h2>
            <p>
              Founded by Nirdesh Shah in 2014, Krupam Infotech has built its reputation on honest guidance. If a simple ₹500 thermal paste cleanup can fix your laptop, we will never advise a ₹5,000 motherboard replacement.
            </p>
            <Link to="/about" className="button gold">Visit our Paldi workshop <b>→</b></Link>
          </div>
          <div className="feature-list">
            <div className="feature reveal">
              <span>01</span>
              <div>
                <h3>Transparent Diagnosis</h3>
                <p>We test power lines, chip signals, and thermal paste right in front of you.</p>
              </div>
            </div>
            <div className="feature reveal">
              <span>02</span>
              <div>
                <h3>Genuine Spare Parts</h3>
                <p>Factory-original displays, high-drain batteries, and authentic cooling fans.</p>
              </div>
            </div>
            <div className="feature reveal">
              <span>03</span>
              <div>
                <h3>90-Day Repair Warranty</h3>
                <p>Every hardware repair is backed by our direct workshop replacement warranty.</p>
              </div>
            </div>
            <div className="feature reveal">
              <span>04</span>
              <div>
                <h3>Direct Phone Support</h3>
                <p>Call Nirdesh Shah and the team anytime for honest post-repair follow-up.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 3D Laptop Repair Section */}
      <section className="repair360 visible" id="repair360">
        <div className="repair-container">
          {/* Left Content */}
          <div className="repair-content">
            <h2 className="repair-title">Laptop Not Turning On?</h2>
            <p className="repair-description">
              Cracked screen, keyboard failure, or liquid spill? Drop by our workshop at Mahalaxmi Five Roads, Paldi for quick same-day diagnostics.
            </p>

            {/* Service Chips */}
            <div className="repair-services">
              <span className="repair-service">Laptop Repair</span>
              <span className="repair-service">Desktop Repair</span>
              <span className="repair-service">Screens</span>
              <span className="repair-service">Keyboard</span>
              <span className="repair-service">Motherboard</span>
              <span className="repair-service">Software</span>
              <span className="repair-service">Data Recovery</span>
              <span className="repair-service">Maintenance</span>
            </div>

            {/* Button */}
            <Link to="/contact" className="repair-btn">
              Book a Repair <span>→</span>
            </Link>
          </div>

          {/* Right Side 3D Laptop */}
          <div className="laptop-scene" id="laptopScene">
            <div className="cursor-light" id="cursorLight"></div>
            <div className="product-glow"></div>
            <div className="floor-shadow"></div>

            <model-viewer
              id="laptop3D"
              src="/assets/images/laptop.glb"
              alt="Interactive 360 degree laptop"
              auto-rotate
              auto-rotate-delay="0"
              rotation-per-second="28deg"
              camera-controls
              disable-zoom
              disable-pan
              touch-action="pan-y"
              interaction-prompt="none"
              shadow-intensity="1.3"
              shadow-softness="1"
              exposure="1.15"
              environment-image="neutral"
              camera-orbit="0deg 72deg 11m"
              min-camera-orbit="auto 30deg 11m"
              max-camera-orbit="auto 88deg 11m"
              field-of-view="24deg"
              loading="eager"
            />

            <div className="drag-label">Move Cursor • Drag • Scroll 360°</div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="client-reviews-section">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <h2>Trusted by customers who <em>demand the best.</em></h2>
            </div>
          </div>
          <div className="reviews-grid" ref={reviewsGridRef}>
            {/* Meenal Seth */}
            <div className="review-card luxury-review-card reveal">
              <div className="review-card-top">
                <div className="review-author">
                  <span className="author-avatar">MS</span>
                  <div className="author-info">
                    <h3>Meenal Seth</h3>
                    <span className="verified-badge">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Verified Customer
                    </span>
                  </div>
                </div>
                <div className="google-review-badge" title="Verified Google Review" aria-label="Google Review">
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24Z" />
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15Z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z" />
                  </svg>
                </div>
              </div>
              <div className="review-stars-row">
                <div className="review-stars-svg" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span className="review-date">Google Review</span>
              </div>
              <p className="review-body">
                "They provide round the clock services for all your computer peripherals. Prompt response and very dependable team."
              </p>
              <div className="review-service-tag">
                <span>Peripherals &amp; IT Support</span>
              </div>
            </div>

            {/* Atish Banerjee */}
            <div className="review-card luxury-review-card reveal">
              <div className="review-card-top">
                <div className="review-author">
                  <span className="author-avatar">AB</span>
                  <div className="author-info">
                    <h3>Atish Banerjee</h3>
                    <span className="verified-badge">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Verified Customer
                    </span>
                  </div>
                </div>
                <div className="google-review-badge" title="Verified Google Review" aria-label="Google Review">
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24Z" />
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15Z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z" />
                  </svg>
                </div>
              </div>
              <div className="review-stars-row">
                <div className="review-stars-svg" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span className="review-date">Google Review</span>
              </div>
              <p className="review-body">
                "Bought two laptops from them. They are excellent in handling their customers. Genuine advice and fast setup."
              </p>
              <div className="review-service-tag">
                <span>Laptop Purchase &amp; Setup</span>
              </div>
            </div>

            {/* Arun Shah */}
            <div className="review-card luxury-review-card reveal">
              <div className="review-card-top">
                <div className="review-author">
                  <span className="author-avatar">AS</span>
                  <div className="author-info">
                    <h3>Arun Shah</h3>
                    <span className="verified-badge">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Verified Customer
                    </span>
                  </div>
                </div>
                <div className="google-review-badge" title="Verified Google Review" aria-label="Google Review">
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24Z" />
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15Z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z" />
                  </svg>
                </div>
              </div>
              <div className="review-stars-row">
                <div className="review-stars-svg" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span className="review-date">Google Review</span>
              </div>
              <p className="review-body">
                "They provide the best laptop and computer repairing service in Ahmedabad. They truly value their customers and repair with honesty."
              </p>
              <div className="review-service-tag">
                <span>Computer &amp; Laptop Repair</span>
              </div>
            </div>
          </div>

          {/* Mobile Reviews Slider Dots */}
          <div className="reviews-slider-dots" role="tablist" aria-label="Customer review pagination">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                type="button"
                className={`slider-dot ${activeReviewIndex === idx ? 'active' : ''}`}
                onClick={() => scrollToReview(idx)}
                aria-label={`Go to customer review ${idx + 1}`}
                aria-selected={activeReviewIndex === idx}
              />
            ))}
          </div>
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
                margin: 0,
                padding: 0,
                fontFamily: 'var(--font-poppins)',
                fontSize: 'clamp(1.9rem, 2.7vw, 2.7rem)',
                fontWeight: 700,
                lineHeight: 1.25,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)'
              }}
            >
              Have a computer or CCTV issue?
              <em
                style={{
                  display: 'block',
                  color: '#f4d785',
                  fontStyle: 'italic',
                  fontWeight: 600,
                  marginTop: '6px'
                }}
              >
                We are here to help.
              </em>
            </h2>
          </div>
          <div>
            <p
              style={{
                margin: '0 0 20px 0',
                padding: 0,
                fontFamily: 'var(--font-poppins)',
                fontSize: '15px',
                lineHeight: 1.65,
                color: 'rgba(255, 255, 255, 0.92)',
                maxWidth: '440px'
              }}
            >
              Call our Paldi workshop directly or bring your device in for a fast, honest bench inspection.
            </p>
            <Link
              to="/contact"
              className="button gold"
              style={{
                margin: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '13px 28px',
                fontSize: '13px',
                fontWeight: 600
              }}
            >
              Contact our team <b>↗</b>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
