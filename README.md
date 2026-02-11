# Portfolio React

Premium single-page portfolio built with React, Framer Motion, and React Three Fiber.

## Stack

- React 19 + Create React App
- Framer Motion for section reveals and UI transitions
- React Three Fiber + Drei for lightweight hero 3D
- SCSS with design tokens (`src/styles/tokens.css`)

## Scripts

- `npm start` - run development server
- `npm run build` - production build
- `npm test -- --watchAll=false` - run tests once

## Content Runbook

### Edit portfolio copy/content

All content is centralized in:

- `src/data/portfolioData.js`

Update these exports:

- `heroData` for hero text
- `aboutData` for about copy and quick facts
- `toolSkills` for skill names and percentages
- `portfolioEntries` for projects and certifications
- `experienceCards` for experience cards
- `timelineEvents` and `stageNarratives` for journey timeline
- `socialLinks` for links section

### Add a project or certification

1. Add a new object in `portfolioEntries`.
2. Keep existing shape: `name`, `summary`, `story`, `media`, `cta`, `tags`.
3. Reuse existing tags or add a new key to `tagLabels`.

### Change theme / typography

Design tokens live in:

- `src/styles/tokens.css`

Primary styling system:

- `src/styles/portfolio.scss`

Update color, radius, spacing, font variables in `tokens.css` first.

### Motion tuning

Shared motion presets are in:

- `src/utils/motion.js`

Use reduced-motion-safe variants from this file.

### 3D hero tuning

3D scene component:

- `src/components/Portfolio/HeroScene.js`

Behavior and lazy-loading controls:

- `src/sections/PortfolioPage.js`

The app auto-disables 3D for reduced-motion users and low-end devices.

## SEO + Deploy Runbook

### Metadata

- Update meta tags in `public/index.html`.
- Replace `%PUBLIC_URL%` values with production URL where needed.

### Sitemap and robots

- `public/sitemap.xml`
- `public/robots.txt`

Replace `https://example.com` with your real domain before deploying.

### Deploy

1. Run `npm run build`.
2. Deploy the `build/` folder to your host (Cloudflare Pages, Netlify, Vercel, etc.).
3. Confirm routing serves `index.html` for SPA behavior.

## Notes

Legacy route-based components remain in `src/components/*` but are no longer in the runtime path.
