# Krupam Infotech - React Application

A modern, high-performance React application converted directly from the official Krupam Infotech website, preserving 100% pixel-perfect styling, animations, interactive 3D model viewer, responsive mobile drawers, and client-side routing.

## 🚀 Key Features & Highlights

- **100% Identical Design & Animations**: All colors (rich maroon `#340813`, champagne gold `#c99b24`), typography (Geist variable font), shadows, card hover physics, and transitions are preserved.
- **Client-Side Routing (`react-router-dom` v6)**:
  - `/` (Home): Executive banner, live rolling stats counter (`10+`, `12K+`, `50+`, `99%`), 360° interactive 3D laptop viewer with cursor spotlight, multi-brand infinite marquee ticker, service preview, and contact teaser.
  - `/services` (Services): Full 9-point service catalog with instant enquiry links, 4-step diagnostic sequence, and home/business split cards.
  - `/products` (Products): Live category filtering (`All`, `Systems`, `Components`, `Peripherals`, `Networking`, `Storage`, `Power`, `Accessories`), real-time search bar, and item count indicator.
  - `/about` (About): History & manifesto, animated trust metrics, 3 core principles, 4-stage client journey, and interactive testimonials carousel with next/prev controls.
  - `/contact` (Contact): 3 quick-connect channels (Call, Landline, Email), dynamic smart enquiry form (auto-populates service or product from other pages), interactive Google Map embed, and interactive FAQ accordions.
- **Navbar Enhancements**:
  - Centered navigation pill tabs with balanced spacing.
  - "CALL US" label removed, showing direct phone number with icon.
  - Elevated maroon "GET SUPPORT" button with customer support headset icon (`🎧`).
  - Active tab soft pill styling without gold underline bars.
- **Scroll Restoration**: Automatically scrolls smoothly to the top of the window on every route transition (`ScrollToTop.jsx`).

---

## 🛠️ Quick Start Guide

### 1. Requirements
Ensure you have [Node.js](https://nodejs.org/) (v18 or higher) installed on your system.

### 2. Install Dependencies
Open your terminal in this directory and run:
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory, ready to deploy to Vercel, Netlify, Cloudflare Pages, or any web server.

### 5. Preview Production Build
```bash
npm run preview
```

---

## 📁 Project Structure

```text
krupam-infotech-react/
├── public/
│   ├── assets/
│   │   ├── fonts/           # Geist font files
│   │   └── images/          # All logos, brand SVGs, hero WebP images
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header.jsx       # Centered navbar, maroon support button, mobile drawer
│   │   ├── Footer.jsx       # Global footer with navigation links and contact info
│   │   └── ScrollToTop.jsx  # Automatic route scroll restoration
│   ├── pages/
│   │   ├── Home.jsx         # Hero, stats counter, 3D viewer, brand ticker
│   │   ├── Services.jsx     # Service catalog & diagnostic sequence
│   │   ├── Products.jsx     # Interactive product catalog with search & filter
│   │   ├── About.jsx        # Company background, metrics & client reviews
│   │   └── Contact.jsx      # Multi-channel contact, smart form & Google map
│   ├── styles/
│   │   └── styles.css       # Full brand stylesheet with keyframes & responsive design
│   ├── App.jsx              # Main router and page layout
│   └── main.jsx             # React DOM entry point
├── dist/                    # Pre-built production bundle
├── index.html               # HTML5 shell & 3D model-viewer script
├── package.json             # NPM dependencies & build scripts
└── vite.config.js           # Vite configuration
```

