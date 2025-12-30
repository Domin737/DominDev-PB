# PRECISION ROOFING — Website

Professional website for PRECISION ROOFING, a roofing company based in Wrocław, Poland.

## Concept

**"The Living Blueprint"** — A digital engineering tool rather than a standard business card website. The design mimics an interactive drafting table or CAD documentation.

## Tech Stack

- **HTML5** — Semantic markup, accessibility-first
- **CSS3** — BEM methodology, CSS variables, Grid/Flexbox
- **Vanilla JS** — No frameworks, performance-focused
- **Fonts** — Space Grotesk + Space Mono (Google Fonts)

## Project Structure

```
DominDev-PB/
├── index.html          # Main page
├── css/
│   └── style.css       # Styles (BEM, :root variables, RWD)
├── js/
│   └── main.js         # Interactions (accordion, counters, parallax)
├── assets/
│   └── images/         # Images (Unsplash placeholders)
├── _docs/              # Documentation
├── _scripts/           # Helper scripts
├── CLAUDE.md           # AI assistant instructions
└── README.md           # This file
```

## Features

- **Responsive design** — Mobile-first, breakpoints: 1024px / 768px / 480px
- **Hamburger menu** — Mobile navigation with animated icon
- **Scroll progress** — Red line indicating page position
- **Count-up animation** — Statistics section
- **Accordion** — Expandable offer sections
- **X-Ray gallery** — Project images with technical overlays
- **Parallax effect** — Hero image depth
- **Magnetic button** — Form submit button follows cursor
- **Reduced motion** — Respects `prefers-reduced-motion`

## Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Paper (background) | Off-white | `#F2F0E9` |
| Paper Dark | Darker variant | `#E6E4DD` |
| Ink (text) | Almost black | `#111111` |
| Accent (CTA) | Safety Red | `#D33F2F` |

## Sections

1. Navigation (fixed, with CAD-style CTA button)
2. Hero (animated title, blueprint overlay)
3. Marquee (scrolling keywords)
4. Statistics (count-up counters)
5. Offer (accordion with service codes A-01, A-02, A-03)
6. Process (4 steps: P-01 to P-04)
7. Projects (gallery with X-Ray reveal effect)
8. Contact (form + contact details)
9. Footer

## Development

No build tools required. Open `index.html` in a browser.

For local development with live reload:
```bash
npx serve .
```

## Browser Support

- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

## License

All rights reserved. PRECISION ROOFING © 2025
