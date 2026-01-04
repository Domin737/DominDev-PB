# PATRYK.BARABACH — Precision Roof Systems

<div align="center">

![Version](https://img.shields.io/badge/version-2.5-blue)
![HTML5](https://img.shields.io/badge/HTML5-semantic-orange)
![CSS3](https://img.shields.io/badge/CSS3-BEM-blue)
![JavaScript](https://img.shields.io/badge/JS-Vanilla_ES6+-yellow)
![Accessibility](https://img.shields.io/badge/WCAG-AA-green)
![Languages](https://img.shields.io/badge/i18n-PL_EN_NL-purple)

**Professional roofing contractor website with CAD-inspired design**

[Live Demo](https://patryk-barabach.pl) · [Documentation](_docs/)

</div>

---

## Overview

A high-performance, multilingual portfolio website for a professional roofing contractor based in Wrocław, Poland. Built with pure HTML, CSS, and JavaScript — no frameworks, no dependencies in production.

### Design Concept: "The Living Blueprint"

The website mimics an interactive CAD drafting table — technical grid overlays, engineering typography, precision coordinates, and a color palette inspired by architectural blueprints. Every element reinforces the brand message: **precision, engineering excellence, and craftsmanship**.

---

## Key Features

### Performance & Technology
- **Zero runtime dependencies** — Pure vanilla JavaScript (~22KB minified)
- **Responsive images** — WebP with PNG fallback, srcset for 400/800/1200w
- **Lazy loading** — Images load on demand for faster initial paint
- **Smooth animations** — 60fps via `requestAnimationFrame` and CSS transforms
- **SEO optimized** — Schema.org structured data, OpenGraph, Twitter Cards

### User Experience
- **Technical preloader** — Blueprint visualization with animated roof truss SVG
- **Hero carousel** — 4 project images rotating every 8 seconds
- **Count-up statistics** — Numbers animate on scroll intersection
- **Accordion navigation** — Service offerings with smooth expand/collapse
- **Process timeline** — 4-step visual guide from inquiry to warranty
- **X-Ray gallery** — Grayscale images reveal color on hover with crosshair overlays
- **Magnetic CTA buttons** — Subtle cursor-following effect
- **Scroll progress** — Red center line grows as user scrolls

### Accessibility (WCAG AA)
- Semantic HTML5 structure with proper heading hierarchy
- Keyboard navigation support (Tab, Enter, Space, ESC)
- ARIA attributes on interactive elements
- High contrast ratios (14.5:1 for main text)
- Respects `prefers-reduced-motion` preference
- Form validation with inline error messages

### Internationalization (i18n)
- **3 languages**: Polish (default), English, Dutch
- Seamless language switching without page reload
- URL-based language persistence (`?lang=en`)
- Meta tags update dynamically (title, description, OpenGraph)

---

## Project Structure

```
DominDev-PB/
├── index.html                 # Main landing page (1,178 lines)
├── 404.html                   # Custom error page
├── favicon.svg                # Vector brand icon
├── robots.txt                 # SEO crawling rules
├── sitemap.xml                # XML sitemap with priorities
│
├── css/
│   ├── style.css              # Main styles (2,688 lines, BEM)
│   ├── preloader.css          # Loading screen styles
│   └── 404.css                # Error page styles
│
├── js/
│   ├── main.js                # Core interactions (584 lines)
│   ├── i18n.js                # Internationalization module
│   ├── preloader.js           # Loading sequence logic
│   └── 404.js                 # Error page interactions
│
├── i18n/
│   ├── pl.json                # Polish translations
│   ├── en.json                # English translations
│   └── nl.json                # Dutch translations
│
├── assets/images/             # Responsive images (WebP + PNG)
│
├── _docs/                     # Documentation
│   ├── guide-implementation.md
│   └── report-code-review.md
│
├── _scripts/                  # Development helpers
│   └── generate-srcset.js     # Image optimization (Sharp)
│
├── CLAUDE.md                  # AI assistant workflow
└── README.md                  # This file
```

---

## Design System

### Color Palette

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Paper | Off-white | `#F2F0E9` | Main background |
| Paper Dark | Warm gray | `#E6E4DD` | Section alternates |
| Ink | Near black | `#111111` | Primary text |
| Accent | Safety red | `#D33F2F` | CTAs, highlights |
| Line | Transparent black | `rgba(0,0,0,0.1)` | Grid overlays |

### Typography

| Font | Weight | Usage |
|------|--------|-------|
| Space Grotesk | 300–700 | Headlines, body |
| Space Mono | 400, 700 | Codes, metadata, labels |

### Breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| Desktop | >1024px | Full 4-column grid |
| Tablet | 768–1024px | 2-column, adjusted spacing |
| Mobile | <768px | Single column, hamburger menu |
| Small Mobile | <480px | Compact typography |

---

## Page Sections

| # | Section | Description |
|---|---------|-------------|
| 00 | Preloader | Technical blueprint initialization sequence |
| 01 | Navigation | Fixed header with CAD-style CTA button |
| 02 | Hero | Animated title, GPS coordinates, image carousel |
| 03 | Marquee | Continuous scrolling keywords |
| 04 | Trust | Client/partner logos grid |
| 05 | Statistics | 4 animated counters (experience, warranty, projects, response) |
| 06 | Offer | 3-item accordion (A-01, A-02, A-03) |
| 07 | Process | 4-step timeline (P-01 to P-04) |
| 08 | Specializations | X-Ray tech gallery with hover effects |
| 09 | Contact | Form with inline validation + contact details |
| 10 | Footer | Copyright, language switcher, credits |

---

## Development

### Requirements

- Modern browser (Chrome 90+, Firefox 90+, Safari 14+, Edge 90+)
- Node.js 18+ (only for image optimization script)

### Local Development

No build step required — open `index.html` directly in a browser.

For live reload during development:

```bash
npx serve .
```

### Image Optimization

Generate responsive image variants:

```bash
npm install
node _scripts/generate-srcset.js <input-image>
```

This creates 400w, 800w, and 1200w versions in both WebP and PNG formats.

---

## Code Quality

### Architecture Principles

- **Progressive enhancement** — Core content works without JavaScript
- **BEM methodology** — `.block__element--modifier` class naming
- **CSS custom properties** — Centralized design tokens in `:root`
- **Event delegation** — Efficient DOM event handling
- **Passive listeners** — Non-blocking scroll/resize events

### Performance Optimizations

- Preconnect to Google Fonts
- Lazy loading for below-fold images
- RequestAnimationFrame for animations
- IntersectionObserver for scroll-triggered effects
- Minimal JavaScript footprint (~22KB)

### SEO Implementation

- Schema.org RoofingContractor structured data
- Complete OpenGraph and Twitter Card meta tags
- Hreflang tags for language alternatives
- Canonical URLs
- Semantic HTML5 landmarks

---

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 90+ |
| Firefox | 90+ |
| Safari | 14+ |
| Edge | 90+ |

---

## License

All rights reserved. © 2026 PATRYK.BARABACH

---

<div align="center">

**Crafted with precision in Wrocław, Poland**

Built by [DominDev](https://domindev.com)

</div>
