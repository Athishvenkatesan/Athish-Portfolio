# Athish V — Portfolio

A premium, **macOS-glassmorphism** personal portfolio built with **Vue 3 + Vite + TypeScript**.

Live features:

- 🪟 macOS-style glass UI — menu bar, floating dock, traffic-light windows, ⌘K command palette
- 🌗 Light / dark theme toggle (persisted)
- 🤖 Built-in chatbot assistant (answers from the resume; upgrade-ready for real Claude AI)
- 💬 WhatsApp click-to-chat with a prefilled message
- 📱 Fully responsive — phone, tablet, laptop, desktop
- 🧩 Data-driven content + filterable projects with detail pages
- ⭐ Featured **React** case study: Demand to Delivery System (D2D)

## Quick start

```bash
npm install
npm run dev
```

Open the printed local URL.

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run type-check` | `vue-tsc --noEmit` |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the production build |

## Edit content

All content is data-driven — edit files in `src/data/`:

- `profile.ts` — name, title, contact, WhatsApp number + message
- `skills.ts` — skill groups + proficiency levels
- `projects.ts` — projects (add one object to add a project)
- `experience.ts` — experience, education, certs, achievements

See [CONVENTIONS.md](CONVENTIONS.md) for architecture and patterns.

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import it in [Vercel](https://vercel.com/new) — it auto-detects Vite.
3. Deploy. Every push auto-redeploys. SPA routing is handled by `vercel.json`.

## Personalize

- Replace `public/AthishV-Resume.pdf` to update the downloadable résumé.
- Add `public/profile.jpg` and set `profile.photo = '/profile.jpg'` to show a photo instead of the "AV" monogram.

---

Built with Vue 3 · Vite · TypeScript.
