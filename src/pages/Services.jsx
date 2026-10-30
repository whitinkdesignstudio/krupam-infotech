import React from 'react';
import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <>
      {/* Page Hero - 400px Height */}
      <section
        className="page-hero page-hero-graphic services-hero-compact"
        style={{
          height: '400px',
          minHeight: '400px',
          maxHeight: '400px',
          padding: '95px 0 35px',
          boxSizing: 'border-box',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div className="page-hero-media" data-parallax="-0.035">
          <img src="/assets/images/services-hero.webp" alt="Technical solutions with a human approach." />
          <div className="page-hero-vignette"></div>
        </div>
        <div className="page-hero-gridlines"></div>
        <div className="hero-orb orb-one" data-parallax="-0.08"></div>
        <div className="page-hero-ring" data-parallax="0.12"></div>
        <div className="container page-hero-content reveal is-visible">
          <h1 style={{ margin: '0 0 10px 0', fontSize: 'clamp(2.1rem, 3.2vw, 2.9rem)', lineHeight: 1.22, color: '#ffffff' }}>
            Expert <em>IT solutions.</em>
          </h1>
          <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.92)', maxWidth: '640px' }}>
            Expert IT &amp; repair solutions, from quick device fixes to full network setups.
          </p>
        </div>
      </section>

      {/* Service Manifesto */}
      <section className="service-manifesto section-large">
        <div className="container manifesto-grid">
          <div className="manifesto-title reveal from-left">
            <div className="eyebrow dark"></div>
            <h2>
              Hardware. Software.<br />
              <em>Security. Support.</em>
            </h2>
            <div className="editorial-media">
              <img src="/assets/images/services-hero.webp" alt="Krupam technology repair workspace" />
            </div>
          </div>
          <div className="manifesto-copy reveal from-right">
            <p>
              Technology problems rarely stay in one category. A slow system can
              involve storage, software, networking or an ageing component.
              Krupam brings those skills together so you can start with the
              problem—not the technical label.
            </p>
            <div className="manifesto-note">
              <b>01</b>
              <span>
                Explain the issue in your words.<br />We'll identify the right expertise.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Catalog */}
      <section className="services-catalog section-large">
        <div className="container service-layout">
          <aside className="service-aside reveal from-left">
            <h2>
              Everything we<br />
              <em>can help with.</em>
            </h2>
            <p>
              Explore the complete service range. If your exact issue is not
              listed, speak with the team and we'll guide you.
            </p>
            <Link to="/contact" className="button outline">
              Describe my issue <b>↗</b>
            </Link>
          </aside>

          <div className="service-index" id="services-catalog" data-stagger="true">
            {/* Service 01 */}
            <article className="service-index-card reveal" id="service-01" data-reveal="left">
              <span className="service-code">01</span>
              <div>
                <h3>Computer &amp; laptop repair</h3>
                <p>
                  Diagnostics, component replacement, operating-system support,
                  performance upgrades and preventive care.
                </p>
                <Link to="/contact?service=Computer%20%26%20laptop%20repair">
                  Request service
                  <svg className="ki-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </Link>
              </div>
              <i>
                <svg className="ki-icon" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14.7 6.3a4 4 0 0 0-5-5l2.1 2.1-2.4 2.4-2.1-2.1a4 4 0 0 0 5 5L21 17.4 17.4 21l-8.7-8.7" />
                </svg>
              </i>
            </article>

            {/* Service 02 */}
            <article className="service-index-card reveal" id="service-02" data-reveal="right">
              <span className="service-code">02</span>
              <div>
                <h3>Computers, laptops &amp; workstations</h3>
                <p>
                  Guidance, supply and setup for home computers, business
                  laptops, PCs, mainframes and complete workstations.
                </p>
                <Link to="/contact?service=Computers%2C%20laptops%20%26%20workstations">
                  Request service
                  <svg className="ki-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </Link>
              </div>
              <i>
                <svg className="ki-icon" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="13" rx="2" />
                  <path d="M8 21h8M12 16v5" />
                </svg>
              </i>
            </article>

            {/* Service 03 */}
            <article className="service-index-card reveal" id="service-03" data-reveal="left">
              <span className="service-code">03</span>
              <div>
                <h3>CCTV repair &amp; service</h3>
                <p>
                  Camera fault-finding, recorder configuration, installation
                  support and maintenance for clearer security coverage.
                </p>
                <Link to="/contact?service=CCTV%20repair%20%26%20service">
                  Request service
                  <svg className="ki-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </Link>
              </div>
              <i>
                <svg className="ki-icon" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2 20 5v6c0 5.2-3.5 9-8 11-4.5-2-8-5.8-8-11V5l8-3Z" />
                  <path d="m8.5 12 2.2 2.2 4.8-5" />
                </svg>
              </i>
            </article>

            {/* Service 04 */}
            <article className="service-index-card reveal" id="service-04" data-reveal="right">
              <span className="service-code">04</span>
              <div>
                <h3>Software development</h3>
                <p>
                  Purpose-built computer and mobile applications shaped around
                  practical business workflows.
                </p>
                <Link to="/contact?service=Software%20development">
                  Request service
                  <svg className="ki-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </Link>
              </div>
              <i>
                <svg className="ki-icon" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m8 9-4 3 4 3m8-6 4 3-4 3m-2-9-4 12" />
                </svg>
              </i>
            </article>

            {/* Service 05 */}
            <article className="service-index-card reveal" id="service-05" data-reveal="left">
              <span className="service-code">05</span>
              <div>
                <h3>Hardware &amp; peripherals</h3>
                <p>
                  Support for internal components, external devices, upgrades
                  and the accessories that connect a complete setup.
                </p>
                <Link to="/contact?service=Hardware%20%26%20peripherals">
                  Request service
                  <svg className="ki-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </Link>
              </div>
              <i>
                <svg className="ki-icon" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                  <rect x="9" y="9" width="6" height="6" rx="1" />
                  <path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4" />
                </svg>
              </i>
            </article>

            {/* Service 06 */}
            <article className="service-index-card reveal" id="service-06" data-reveal="right">
              <span className="service-code">06</span>
              <div>
                <h3>Monitor &amp; display repair</h3>
                <p>
                  Assessment and practical repair support for LG and other
                  compatible computer monitors and display issues.
                </p>
                <Link to="/contact?service=Monitor%20%26%20display%20repair">
                  Request service
                  <svg className="ki-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </Link>
              </div>
              <i>
                <svg className="ki-icon" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="14" rx="2" />
                  <path d="M8 21h8m-4-4v4" />
                </svg>
              </i>
            </article>

            {/* Service 07 */}
            <article className="service-index-card reveal" id="service-07" data-reveal="left">
              <span className="service-code">07</span>
              <div>
                <h3>Printers, parts &amp; software</h3>
                <p>
                  Printer servicing, peripheral support, compatible parts,
                  software guidance and selected equipment hire.
                </p>
                <Link to="/contact?service=Printers%2C%20parts%20%26%20software">
                  Request service
                  <svg className="ki-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </Link>
              </div>
              <i>
                <svg className="ki-icon" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                  <rect x="6" y="14" width="12" height="7" />
                  <path d="M18 12h.01" />
                </svg>
              </i>
            </article>

            {/* Service 08 */}
            <article className="service-index-card reveal" id="service-08" data-reveal="right">
              <span className="service-code">08</span>
              <div>
                <h3>Office equipment care</h3>
                <p>
                  Repair, servicing and practical upkeep for everyday office
                  technology and electrical supplies.
                </p>
                <Link to="/contact?service=Office%20equipment%20care">
                  Request service
                  <svg className="ki-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </Link>
              </div>
              <i>
                <svg className="ki-icon" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="7" width="18" height="13" rx="2" />
                  <path d="M8 7V4h8v3m-4 5v3M3 12a20 20 0 0 0 18 0" />
                </svg>
              </i>
            </article>

            {/* Service 09 */}
            <article className="service-index-card reveal" id="service-09" data-reveal="left">
              <span className="service-code">09</span>
              <div>
                <h3>User interface design</h3>
                <p>
                  Clear, modern interface design that makes websites,
                  applications and digital tools easier to use.
                </p>
                <Link to="/contact?service=User%20interface%20design">
                  Request service
                  <svg className="ki-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </Link>
              </div>
              <i>
                <svg className="ki-icon" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m4 20 4.5-1 10.8-10.8a2.1 2.1 0 0 0-3-3L5.5 16 4 20Z" />
                  <path d="m14.8 6.7 3 3" />
                </svg>
              </i>
            </article>
          </div>
        </div>
      </section>

      {/* Diagnostic Sequence */}
      <section className="diagnostic-section section-large">
        <div className="container">
          <div className="diagnostic-head reveal">
            <div>
              <h2>
                Careful at every <em>decision point.</em>
              </h2>
            </div>
            <p>
              A professional repair is more than replacing a part. It is a
              sequence of checks that protects your time, information and
              budget.
            </p>
          </div>
          <div className="diagnostic-grid" data-stagger="true">
            <article className="diagnostic-card diag-pill-card reveal">
              <div className="diag-pill-icon">
                <svg className="ki-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.5-4A7.5 7.5 0 0 1 3 13V8a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v7Z" />
                </svg>
              </div>
              <div className="diag-pill-content">
                <h4>01. Listen</h4>
                <p>Understand symptoms &amp; history</p>
              </div>
            </article>

            <article className="diagnostic-card diag-pill-card reveal">
              <div className="diag-pill-icon">
                <svg className="ki-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-4-4" />
                </svg>
              </div>
              <div className="diag-pill-content">
                <h4>02. Inspect</h4>
                <p>Test causes &amp; components</p>
              </div>
            </article>

            <article className="diagnostic-card diag-pill-card reveal">
              <div className="diag-pill-icon">
                <svg className="ki-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m12 2 9 5-9 5-9-5 9-5Z" />
                  <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
                </svg>
              </div>
              <div className="diag-pill-content">
                <h4>03. Explain</h4>
                <p>Clear options &amp; pricing</p>
              </div>
            </article>

            <article className="diagnostic-card diag-pill-card reveal">
              <div className="diag-pill-icon">
                <svg className="ki-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div className="diag-pill-content">
                <h4>04. Restore</h4>
                <p>Repair, verify &amp; handover</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Support Split - Compact Cards */}
      <section className="support-split" style={{ padding: '45px 0' }}>
        <div
          className="container support-split-grid"
          style={{
            maxWidth: '1060px',
            width: '88%',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
            alignItems: 'stretch'
          }}
        >
          {/* Card 1: Home / Personal */}
          <div
            className="support-panel reveal from-left"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              minHeight: '320px',
              padding: '34px 32px',
              borderRadius: '16px',
              boxSizing: 'border-box'
            }}
          >
            <h2 style={{ margin: '0 0 14px 0', fontSize: 'clamp(1.4rem, 2vw, 1.75rem)', lineHeight: 1.25 }}>
              Personal technology,<br />
              <em>properly supported.</em>
            </h2>
            <p style={{ margin: '0 0 20px 0', flex: 1, fontSize: '13.5px', lineHeight: 1.6 }}>
              Laptops, desktops, Wi-Fi, storage, displays and everyday
              accessories—explained without unnecessary jargon.
            </p>
            <Link to="/contact" style={{ marginTop: 'auto', fontSize: '11px' }}>Get home support →</Link>
          </div>

          {/* Card 2: Business / Workplace */}
          <div
            className="support-panel business reveal from-right"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              minHeight: '320px',
              padding: '34px 32px',
              borderRadius: '16px',
              boxSizing: 'border-box'
            }}
          >
            <h2 style={{ margin: '0 0 14px 0', fontSize: 'clamp(1.4rem, 2vw, 1.75rem)', lineHeight: 1.25 }}>
              Keep the workplace<br />
              <em>ready to move.</em>
            </h2>
            <p style={{ margin: '0 0 20px 0', flex: 1, fontSize: '13.5px', lineHeight: 1.6 }}>
              Workstations, networking, security, printers, office equipment and
              ongoing technical guidance under one roof.
            </p>
            <Link to="/contact" style={{ marginTop: 'auto', fontSize: '11px' }}>Plan business support →</Link>
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
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(2rem, 3.2vw, 2.9rem)',
                lineHeight: 1.2,
                margin: 0,
                color: '#ffffff'
              }}
            >
              Not sure what<br />
              <em
                style={{
                  color: '#f4d785',
                  fontStyle: 'italic',
                  fontWeight: 600
                }}
              >
                service you need?
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
              Describe what is happening. Our team will help identify the best
              next step.
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
              Get expert guidance <b>↗</b>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

