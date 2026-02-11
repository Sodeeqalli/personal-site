# Monochrome Personal Landing

## Stack

- React 19 + Create React App
- Sass (`.scss`)
- Framer Motion (section reveals + reduced-motion handling)
- Custom Canvas 2D flow field (no WebGL)

## Run

- `npm start`
- `npm test -- --watchAll=false`
- `npm run build`

## Content Editing Guide

All site content is centralized here:

- `src/data/siteContent.js`

Update these exports:

- `heroContent`: hero name, role, subtitle, email
- `linkItems`: social/contact links

## Flow-Field Background Notes

Component:

- `src/components/Background/FlowFieldBackground.js`

Performance controls implemented:

- DPR cap: `Math.min(devicePixelRatio, 1.6)`
- Particle targets:
  - mobile (`<768px`): `500`
  - desktop: `1200`
- Low-end devices: reduced particle count and mouse forces disabled
- Rendering pauses when `document.hidden === true`
- Reduced motion (`prefers-reduced-motion: reduce`): no animation, static gradient + grain only
- Scroll mapping:
  - `speedMultiplier = 0.9 + 0.25 * progress`
  - `fieldOffsetY = progress * 120`

## Accessibility Notes

- Visible keyboard focus styles
- Skip link in layout (`Skip to content`)
- Semantic heading order (`h1 -> h2 -> h3`)
- Motion-reduced fallback for reveals/background/cursor follower
- Images use lazy loading and async decoding where applicable
