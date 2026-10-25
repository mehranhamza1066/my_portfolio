# Mehran Hamza — Portfolio

Personal portfolio website, built with React + Vite. Live at [mehranhamza.vercel.app](https://mehranhamza.vercel.app).

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production build goes to `dist/`. On Vercel, the Vite preset picks this up automatically.

## Structure

- `src/data.jsx` — all site content (apps, engineering cards, skills, links)
- `src/components/` — one component per page section
- `src/hooks/useReveal.js` — scroll reveal animation
- `public/images/` — app screenshots and portrait
