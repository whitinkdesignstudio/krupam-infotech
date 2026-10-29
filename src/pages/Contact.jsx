import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Contact() {
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    details: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const serviceParam = searchParams.get('service');
    const productParam = searchParams.get('product');

    if (serviceParam) {
      setFormData((prev) => ({
        ...prev,
        service: 'Computer or laptop repair',
        details: `I am interested in requesting service for: ${serviceParam}`
      }));
    } else if (productParam) {
      setFormData((prev) => ({
        ...prev,
        service: 'Product availability',
        details: `I am inquiring about availability, pricing and configuration for: ${productParam}`
      }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent('New Enquiry: ' + (formData.service || 'General Support'));
    const body = encodeURIComponent(
      'Name: ' + formData.name + '\n' +
      'Phone: ' + formData.phone + '\n' +
      'Email: ' + (formData.email || 'Not provided') + '\n\n' +
      'Service/Enquiry: ' + formData.service + '\n\n' +
      'Details:\n' + formData.details
    );

    setIsSubmitted(true);
    window.location.href = 'mailto:nirdesh_shah@yahoo.com?subject=' + subject + '&body=' + body;
  };

  return (
    <>
      {/* Contact Choice */}
      <section className="contact-choice section-large contact-choice-top">
        <div className="container">
          <div className="choice-head reveal">
            <div>
              <h2>
                Visit. Call. Write. <em>Whatever works.</em>
              </h2>
            </div>
            <p>
              For the fastest confirmation on urgent repairs or product availability, call the team during opening hours.
            </p>
          </div>
          <div className="choice-grid" data-stagger="true">
            {/* Card 01 - Call */}
            <a className="choice-card reveal" href="tel:+919825291017">
              <div className="choice-card-header">
                <div className="choice-icon">
                  <svg className="ki-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M8.2 3.7 10.4 8 8.8 9.6a15 15 0 0 0 5.6 5.6l1.6-1.6 4.3 2.2c.5.3.8.8.7 1.4l-.5 3c-.1.5-.6.9-1.1.9C10.3 21.1 2.9 13.7 2.9 4.6c0-.5.4-1 .9-1.1l3-.5c.6-.1 1.1.2 1.4.7Z" />
                  </svg>
                </div>
                <span className="choice-card-index">01</span>
              </div>
              
              <div className="choice-card-body">
                <span className="choice-card-label">DIRECT PHONE</span>
                <h3 className="choice-card-value">+91 98252 91017</h3>
                <p className="choice-card-desc">Call technician directly · Mon–Sat 9AM–7PM</p>
              </div>

              <div className="choice-card-action">
                <span className="choice-action-text">Call Now</span>
                <span className="choice-action-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </span>
              </div>
            </a>

            {/* Card 02 - Landline */}
            <a className="choice-card reveal" href="tel:07926639621">
              <div className="choice-card-header">
                <div className="choice-icon">
                  <svg className="ki-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
                    <path d="M4 14h3v6H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 1-2Zm16 0h-3v6h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-1-2ZM17 20c0 1-2.2 2-5 2" />
                  </svg>
                </div>
                <span className="choice-card-index">02</span>
              </div>
              
              <div className="choice-card-body">
                <span className="choice-card-label">PALDI STORE LANDLINE</span>
                <h3 className="choice-card-value">079-26639621</h3>
                <p className="choice-card-desc">Reach our front desk service reception</p>
              </div>

              <div className="choice-card-action">
                <span className="choice-action-text">Call Landline</span>
                <span className="choice-action-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </span>
              </div>
            </a>

            {/* Card 03 - Email */}
            <a className="choice-card reveal" href="mailto:nirdesh_shah@yahoo.com">
              <div className="choice-card-header">
                <div className="choice-icon">
                  <svg className="ki-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </div>
                <span className="choice-card-index">03</span>
              </div>
              
              <div className="choice-card-body">
                <span className="choice-card-label">EMAIL ENQUIRY</span>
                <h3 className="choice-card-value">nirdesh_shah@yahoo.com</h3>
                <p className="choice-card-desc">Send part photos, specs, or repair lists</p>
              </div>

              <div className="choice-card-action">
                <span className="choice-action-text">Send Email</span>
                <span className="choice-action-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section section-large">
        <div className="container contact-form-layout">
          {/* Left Luxury Consultation Card */}
          <div className="form-intro reveal from-left">
            <h2>
              Get your device diagnosed. <br />
              <em>Serviced with precision.</em>
            </h2>
            <p>
              Share your hardware issue, CCTV requirement, or upgrade need. Our chip-level certified engineers in Ahmedabad will examine your request and advise the most cost-effective path forward.
            </p>

            <div className="desk-highlights">
              <div className="desk-item">
                <div className="desk-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                </div>
                <div>
                  <strong>Genuine Components &amp; 90-Day Warranty</strong>
                  <small>Original factory-grade replacement spares</small>
                </div>
              </div>

              <div className="desk-item">
                <div className="desk-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <strong>Quick Turnaround Time</strong>
                  <small>Same-day diagnostics for laptops &amp; PCs</small>
                </div>
              </div>
            </div>

            <div className="response-note">
              <i>
                <svg className="ki-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M8.2 3.7 10.4 8 8.8 9.6a15 15 0 0 0 5.6 5.6l1.6-1.6 4.3 2.2c.5.3.8.8.7 1.4l-.5 3c-.1.5-.6.9-1.1.9C10.3 21.1 2.9 13.7 2.9 4.6c0-.5.4-1 .9-1.1l3-.5c.6-.1 1.1.2 1.4.7Z" />
                </svg>
              </i>
              <div>
                <b>Need immediate assistance?</b>
                <span>Direct line: <a href="tel:+919825291017">+91 98252 91017</a> · Open 9 AM – 7 PM</span>
              </div>
            </div>
          </div>

          {/* Right Luxury Form Card */}
          {isSubmitted ? (
            <div className="premium-form reveal from-right">
              <div className="success">
                <b>✓</b>
                <h2>Enquiry Received.</h2>
                <p>Thank you. Your service ticket has been prepared. Our engineering desk at Paldi will contact you promptly.</p>
                <button
                  type="button"
                  className="button gold"
                  style={{ marginTop: '20px' }}
                  onClick={() => setIsSubmitted(false)}
                >
                  Send another request →
                </button>
              </div>
            </div>
          ) : (
            <form className="premium-form reveal from-right" onSubmit={handleSubmit}>
              <div className="form-heading">
                <div>
                  <span>SERVICE ENQUIRY</span>
                  <p>Tell us what needs attention</p>
                </div>
              </div>

              <div className="field-pair">
                <label>
                  <span>Full Name *</span>
                  <input
                    id="name"
                    required
                    placeholder="e.g. Rajesh Shah"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <span>Phone Number *</span>
                  <input
                    id="phone"
                    required
                    type="tel"
                    placeholder="e.g. +91 98250 XXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className="field-pair">
                <label>
                  <span>Email Address</span>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@domain.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  <span>What can we help with? *</span>
                  <select
                    id="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select service requirement
                    </option>
                    <option value="Computer or laptop repair">Laptop &amp; Desktop Hardware Repair</option>
                    <option value="Chip-level motherboard repair">Motherboard &amp; Chip-Level Diagnostics</option>
                    <option value="CCTV service">CCTV &amp; Smart Security Surveillance</option>
                    <option value="SSD & RAM Upgrade">SSD &amp; High-Speed RAM Upgrade</option>
                    <option value="Data Recovery & OS">Data Recovery &amp; OS Re-installation</option>
                    <option value="Printer or monitor repair">Printer or Monitor Servicing</option>
                    <option value="Annual Maintenance Contract (AMC)">Annual Maintenance Contract (AMC)</option>
                    <option value="Product availability">Product / Hardware Purchase Inquiry</option>
                    <option value="Other">Other Custom Requirement</option>
                  </select>
                </label>
              </div>

              <label>
                <span>Describe Device Issue or Requirement *</span>
                <textarea
                  id="details"
                  required
                  rows="4"
                  placeholder="Mention brand, model (e.g. Dell XPS, Lenovo ThinkPad), symptoms (no display, overheating, slow performance) or specific products needed..."
                  value={formData.details}
                  onChange={handleChange}
                />
              </label>

              <button className="button gold form-submit-btn" type="submit">
                Submit Service Enquiry <b>↗</b>
              </button>
              
              <div className="form-footer-note">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span>Direct service consultation · No automated AI bot · Paldi, Ahmedabad workshop</span>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Visit Section */}
      <section className="visit-section section-large">
        <div className="container visit-grid">
          {/* Google Map on Left */}
          <div className="visit-map reveal from-left">
            <iframe
              src="https://maps.google.com/maps?q=Krupam%20Infotech,%20Paldi,%20Ahmedabad&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Krupam Infotech Location"
            />
          </div>

          {/* Luxury Visit Copy on Right */}
          <div className="visit-copy reveal from-right">
            <h2>
              <span className="visit-line visit-line-1">Visit our Paldi workshop.</span>{' '}
              <span className="visit-line visit-line-2"><em>Ready to help</em></span>{' '}
              <span className="visit-line visit-line-3"><em>in person.</em></span>
            </h2>

            {/* Address Box */}
            <div className="visit-address-card">
              <div className="visit-pin-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className="visit-address-details">
                <strong>Workshop &amp; Retail Store</strong>
                <p>GF-6, Pentagon, Opp. Pratiksha Complex, Mahalaxmi Five Roads, Paldi, Ahmedabad, Gujarat 380007</p>
                <span className="landmark-tag">Near Mahalaxmi Cross Road · Ground Floor Easy Access</span>
              </div>
            </div>

            {/* Operating Hours Table */}
            <div className="hours-table">
              <div className="hours-row open-day">
                <div className="hours-day">
                  <span className="live-dot"></span>
                  <span>MONDAY — SATURDAY</span>
                </div>
                <b className="hours-time">09:00 AM — 07:00 PM</b>
              </div>
              <div className="hours-row close-day">
                <div className="hours-day">
                  <span className="closed-dot"></span>
                  <span>SUNDAY</span>
                </div>
                <b className="hours-time">CLOSED</b>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="visit-actions">
              <a
                className="button gold"
                target="_blank"
                rel="noreferrer"
                href="https://share.google/x90lcQ0M2yRfjsxp7"
              >
                Open Google Maps <b>↗</b>
              </a>
              <a
                className="button outline visit-call-btn"
                href="tel:+919825291017"
              >
                Call: +91 98252 91017
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact FAQ */}
      <section className="contact-faq section-large">
        <div className="container faq-layout">
          <div className="faq-title reveal from-left">
            <h2>
              Useful answers.<br />
              <em>Less waiting.</em>
            </h2>
          </div>
          <div className="faq-list" data-stagger="true">
            <details className="faq-item reveal" name="faq" open>
              <summary>
                <span>01</span>Should I call before visiting?<i>+</i>
              </summary>
              <p>
                Calling first is recommended for product availability, urgent
                repairs and the quickest service confirmation.
              </p>
            </details>
            <details className="faq-item reveal" name="faq">
              <summary>
                <span>02</span>Can I ask about an unlisted issue?<i>+</i>
              </summary>
              <p>
                Yes. Describe the symptoms or requirement and the team will
                guide you to the relevant service.
              </p>
            </details>
            <details className="faq-item reveal" name="faq">
              <summary>
                <span>03</span>Do you sell second-hand computers?<i>+</i>
              </summary>
              <p>
                The company lists second-hand computers and quality-checked
                pre-owned options. Confirm current stock directly.
              </p>
            </details>
            <details className="faq-item reveal" name="faq">
              <summary>
                <span>04</span>Are product specifications always the same?<i>+</i>
              </summary>
              <p>
                Models and availability can change. The team will confirm exact
                specifications and compatibility before purchase.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container cta reveal">
          <div>
            <h2>
              Your technology deserves<br />
              <em>expert attention.</em>
            </h2>
          </div>
          <div>
            <p>
              Begin with a call, a visit or a clear message. The next step can
              be simple.
            </p>
            <a href="tel:+919825291017" className="button gold">
              Call Krupam <b>↗</b>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

