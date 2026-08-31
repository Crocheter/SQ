# Sign Quest

Learn Nigerian Sign Language the game way — a React + Tailwind CSS v4 starter.

## Run it

```bash
npm install
npm run dev
```

Then open the printed localhost URL. Resize the window past `sm` (640px) to see the desktop word-cycle animation kick in.

## What's here

- `src/pages/Home.jsx` — the home page (hero, headline, CTA)
- `src/pages/ComingSoon.jsx` — generic placeholder every button currently routes to, at `/soon/:feature`
- `src/components/Header.jsx` — hamburger menu + slide-in drawer with the 5 menu items
- `src/components/WordCycle.jsx` — the desktop-only word-cycling animation ("simplest way", "fastest way", etc.)
- `src/components/SignHand.jsx` — the original hero illustration (a self-drawing signing hand, no external image assets)
- `src/index.css` — theme tokens (colors, fonts) and custom keyframe animations, using Tailwind v4's CSS-first `@theme`

## Stack

- React 19 + Vite
- Tailwind CSS v4 (via `@tailwindcss/vite` — no `tailwind.config.js` needed, theme lives in `index.css`)
- React Router v7 for page routing

## Next steps

Every clickable element currently routes to a "soon to come" placeholder page. As you build out the real Test Game, Sign In, and Dashboard pages, replace the corresponding `<Link to="/soon/...">` with the real route.
