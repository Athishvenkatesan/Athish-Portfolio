# Conventions — Athish V Portfolio

## Architecture

- **Vue 3 `<script setup>` + TypeScript strict.** No `any`. Props/emits typed.
- **Data-driven content.** All copy lives in `src/data/*.ts`. Components render data; they don't hardcode resume facts. To change content, edit data files only.
- **Single source of truth** for identity/contact is `src/data/profile.ts` (including the WhatsApp number + prefilled message via `whatsappLink()`).

## File layout

```
src/
├── main.ts, App.vue
├── router/            # routes + scroll behavior
├── styles/            # tokens.css (theme vars), base.css (reset + utilities)
├── data/              # profile, skills, projects, experience  ← edit content here
├── chatbot/           # knowledge.ts (intents) + engine.ts (askBot seam)
├── composables/       # useTheme, useScrollReveal (v-reveal directive)
├── utils/             # miniMarkdown (safe inline md for chat)
├── views/             # HomeView, ProjectDetailView (route-level)
└── components/
    ├── ui/            # AppIcon (icon set)
    ├── layout/        # MenuBar, AppDock, ThemeToggle, BgBlobs, GlassWindow
    ├── sections/      # one component per home-page section
    └── widgets/       # ChatBot, WhatsAppButton, CommandPalette, ProjectCard
```

## Styling

- **Glass surfaces** use the `.glass` / `.glass-strong` utility classes (defined in `base.css`).
- **Theme** via `[data-theme]` on `<html>`; all colors come from CSS variables in `tokens.css`. Never hardcode hex in components — add a token.
- **Accents:** violet `--accent` + teal `--accent-2`. Use the gradient sparingly (CTAs, highlights).
- No pure black/white surfaces; warm/neutral glass only. Respect `prefers-reduced-motion`.

## Patterns

- **Add a project:** append one object to `projects` in `src/data/projects.ts`. The card, filter and `/projects/:id` page pick it up automatically.
- **Add a chatbot answer:** append an `Intent` to `intents` in `src/chatbot/knowledge.ts` (keywords + an `answer()` builder).
- **Add an icon:** add a path to the `paths` map in `components/ui/AppIcon.vue`.
- **Scroll reveal:** add `v-reveal` (optional ms delay: `v-reveal="120"`) to any element; pairs with the `.reveal` class.

## File size caps (DAK)

Vue SFC ≤ 250 lines · composable/util ≤ 200 · keep components single-responsibility. Split before exceeding.

## AI upgrade seam

The chatbot is scripted today. To switch to a real Claude model, replace the body of `askBot()` in `src/chatbot/engine.ts` with a `fetch` to a serverless function (e.g. a Vercel function holding the API key). Nothing else changes — the UI already awaits `askBot()`.

## Quality gate (before "done")

`npm run type-check` clean · `npm run build` passes · checked in browser at mobile + desktop widths · PROJECT.md "Current State" updated.
