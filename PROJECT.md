---
name: Athish V Portfolio
goal: A premium, Apple-inspired personal portfolio for Athish V with AI chatbot, WhatsApp click-to-chat, and a React-forward project showcase.
domain: Personal / portfolio
audience: Recruiters, hiring managers, collaborators
status: building
---

# Athish V — Portfolio Website

## Current State (2026-08-05)

Full site rebuilt onto a flat, spacious, Apple-marketing-page-inspired visual language (moved off "macOS glassmorphism"); project cards support one in-page "Run in Browser" live preview button plus a "View Source Code" GitHub link; new `/analysis` page visualizes skill strength + a project timeline; profile photo + GitHub freelance projects in place.

### Update 22 (2026-08-06) — Hero copy rewrite
- Replaced the Hero's role/sub/tagline copy in `src/data/profile.ts` with the owner's updated positioning: `title` now reads "Power Platform & Automation Engineer | React & TypeScript Front-End Developer" (previously just the first half — the new combined line replaces what would otherwise have been a literal duplicate if only `subtitle`/`tagline` had changed), `subtitle` is the new concise intro sentence, `tagline` is the new detailed expertise paragraph (Dataverse/SharePoint/REST APIs integration, Copilot Studio agents, etc.).
- Verified the longer copy wraps cleanly with no overlap/truncation at desktop, tablet, and mobile widths, in both themes. Clean type-check + production build.

### Update 21 (2026-08-06) — Mobile: floating WhatsApp/chat FABs covering content
- Reported on a real Android phone: the stacked floating WhatsApp + chat-launcher buttons (bottom-right) sat directly on top of page text/data mid-scroll (e.g. the Analysis page's "Top individual skills" bars, the Contact footer) — small mobile screens have proportionally much less room, so these fixed overlays cover a meaningful chunk of content.
- Added `useScrollDirection` composable (`src/composables/`) — tracks scroll and exposes `hidden`, true while actively scrolling down, false on scroll-up or ~500ms after scrolling settles. Wired into `WhatsAppButton.vue` and the `ChatBot.vue` launcher (not the open chat panel) as a `scroll-hidden` class, fade+slide out, effective only under the existing `max-width: 680px` mobile breakpoint — desktop is untouched (verified: opacity stays 1 while scrolling on desktop).
- Also gave `ContactSection.vue`'s `.footer` extra `margin-bottom` on mobile so the page's final resting scroll position always clears the fixed dock (previously the footer text/link sat under it with no way to scroll further away).
- Verified: FABs disappear during active scroll (so they never cover transient content), reappear on scroll-up/settle; footer now has ~58px clearance above the dock at full scroll. Clean type-check + production build.

### Update 20 (2026-08-06) — Hero gap + hero-vs-dock overlap on short viewports
- Task 1 (gap): `HeroSection.vue`'s `.hero` had its own `padding-bottom: var(--sp-10)` (128px fixed) instead of the shared `.section` rhythm reduced in Update 19 — Hero→About was still the old, larger gap. Changed to `clamp(40px, 6vw, 68px)`, matching every other section boundary (now ~140px, same as About→Skills etc.).
- Task 2 (responsive): shrinking the browser window's height (not just width) pushed the Hero's CTA/social-links row down far enough to sit directly under the always-fixed floating dock (`AppDock.vue`, `position: fixed; bottom: 18px`) — at ~960×620 and smaller the dock fully covered the WhatsApp/Resume links, the caption, and part of the social icons, right on initial load (no scrolling needed to hit it). The dock has no responsive/height-aware behavior of its own, so the fix is on the Hero: added `@media (max-height: 780px)` and a further `@media (max-height: 620px)` step to `HeroSection.vue` that compact `padding-top`, heading size, and the CTA/social margins (the second step also hides the `.tagline` line) so total hero height clears the dock.
- Verified by measuring actual DOM clearance between the dock and the socials/caption/badge across 10 viewport sizes from 1440×900 down to 600×500 — all two-column (desktop) sizes now have 70px+ positive clearance (previously as low as -477px overlap at some sizes); single-column mobile sizes have the dock harmlessly over the decorative portrait image only, never over interactive elements. Clean type-check + production build.

### Update 19 (2026-08-06) — Tightened vertical gap between sections
- Feedback: the whitespace between About's info cards and the Skills heading felt too long.
- The gap is each section's own top/bottom `padding-block` stacking (About's bottom padding + Skills' top padding) — shared by every section via the single `.section` class in `base.css`, so this is a sitewide rhythm, not a one-off.
- Reduced `.section { padding-block: clamp(48px, 9vw, 96px) }` to `clamp(40px, 6vw, 68px)` — cuts the max stacked gap between two sections from ~192px to ~140px (desktop) / ~110px (mobile), applied consistently everywhere (About↔Skills↔Experience↔Projects↔Credentials↔Contact). Verified other section boundaries still have comfortable breathing room, not cramped. Clean type-check + production build.

### Update 18 (2026-08-06) — SkillColumnChart: invisible track border in light theme
- Bug: `.col-track` (the empty column background above each bar) had no border, only `--chip-bg` — in light theme that's a near-white fill with nothing to distinguish it from the white card, so the unfilled part of every column was invisible.
- Fix: added `border: 1px solid var(--chip-border)` to `.col-track` in `SkillColumnChart.vue`. Verified in both themes — light now shows a clear hairline outline per column; dark unaffected (already had enough contrast).

### Update 17 (2026-08-06) — Skills section: 3 more chart forms (6 total, all distinct)
- Feedback: the 2nd row (Integration & APIs, Microsoft Power Platform, Data Science & ML) reused the same 3 chart types as row 1 (radial/meter/bars), just diagonally offset — still read as "the same charts repeated" once seen together.
- Kept row 1 exactly as-is (bars, radial, meter) per explicit request and added 3 brand-new forms for row 2, each its own component in `src/components/charts/`, all following the same `v-reveal`-gated, explicit-base/target reveal pattern as the existing ones:
  - `SkillDotPlot.vue` — bare track + single marker dot (no fill) → Integration & APIs.
  - `SkillTagCloud.vue` — badge cloud, tier-tinted by level (solid/strong/expert) instead of an axis chart → Microsoft Power Platform.
  - `SkillColumnChart.vue` — vertical bars (columns) instead of horizontal → Data Science & ML.
- `SkillVariant` in `skills.ts` extended to `'bars' | 'radial' | 'meter' | 'dots' | 'tags' | 'columns'`; all 6 cards now render a unique form, no repeats anywhere on the page.
- Verified visually in both themes; clean type-check + production build.

### Update 16 (2026-08-06) — Skills section: 3 distinct chart forms instead of 1 repeated
- Feedback: all 6 skill-category cards rendered the identical horizontal progress-bar chart — visually monotonous when all 6 are on screen together.
- Added two new self-contained chart components (`src/components/charts/`), matching the existing `v-reveal`-gated reveal pattern used by `TopSkillsBars`/`SkillHistogram`: `SkillRadialGrid.vue` (2×2 grid of circular progress rings) and `SkillMeterList.vue` (segmented 10-pip level meter instead of a continuous bar).
- `SkillGroup` in `skills.ts` now carries a `variant: 'bars' | 'radial' | 'meter'`, assigned so no two adjacent cards (same row or column in the 3-col desktop grid) share a form: bars → Front-End Engineering, Data Science & ML; radial → UI & Component Systems, Integration & APIs; meter → Animation & Data, Microsoft Power Platform. `SkillsSection.vue` branches on it.
- Verified all three forms render and reveal correctly in both themes and on mobile (scroll-triggered reveal confirmed per-card, not just first-in-viewport). Clean type-check + production build.

### Update 15 (2026-08-06) — Analysis page: equal-height chart card pairs
- Bug: in the `/analysis` page's two-column sections (histogram/tornado, donut/treemap), each chart card sized to its own content, so a short chart (e.g. donut) sat in a visibly shorter card than its taller sibling (e.g. treemap) even though both live in the same `.split` row.
- Fix: `.split` grid now explicitly `align-items: stretch`; each `.block.split-col` section is a flex column, and `.chart-card` is `flex: 1` inside it — so both cards in a row stretch to the taller sibling's natural height, with the shorter chart's content centered inside (via the existing `justify-content: center`) rather than left top-aligned in a short box.
- Verified via Playwright: both card pairs measured to exactly equal heights (347px and 436px respectively at desktop width); confirmed the taller card's content (treemap + tech legend) sits fully inside its border, just with more centering padding; mobile single-column stacking unaffected. Clean type-check + production build.

### Update 14 (2026-08-06) — Light theme: invisible border fix
- Bug: in light theme, hairline borders (chat panel/composer, social icon circles, form inputs, credential dividers, command palette, theme toggle, window titlebars, buttons) were invisible — `--glass-border` in `tokens.css`'s light block was still `rgba(255, 255, 255, 0.7)` (white-on-white), a leftover from when it only ever framed glass panels sitting over colorful background blobs. Every one of ~15 consumers reads this single token, so the fix is centralized.
- Fix: changed `--glass-border` in the light theme block to `rgba(15, 18, 30, 0.14)` — a dark hairline, consistent with the already-correct `--chip-border`/`--surface-border` tokens in the same block. Dark theme's `--glass-border` was untouched and verified unchanged.
- Verified visually (Playwright) across Hero, ChatBot, Contact form, and dark-theme regression check; clean type-check + production build.

### Update 13 (2026-08-06) — Site-wide animation audit + test pass
- Removed the "M.Sc CGPA" stat badge from the Hero per owner's request; rebalanced the remaining 2 badges (Experience top-left, Projects bottom-right) and their mobile row.
- **3 real animation bugs found and fixed** (not style preferences — each one's own code contradicted its own visible behavior):
  1. `SkillsSection.vue` skill bars and `TopSkillsBars.vue` (Analysis page + chatbot) — the "grow" fill animation played at component mount, finishing before the user ever scrolled the section into view; the effect was invisible in practice. Gated behind `.is-visible` (added by `v-reveal`) instead, with an explicit keyframe `to` state (the implicit-`to` version silently resolved to the same value as the new gated base state, which would've made the "fix" a no-op).
  2. `SkillHistogram.vue` bars had a `transition: height` that could never fire — CSS transitions don't animate a property's very first applied value, and `height` was only ever set once via inline style. Replaced with a `scaleY` transform gated the same way as above.
  3. `TopSkillsBars.vue` had no visibility awareness of its own (relied on being wrapped in a reveal `<div>` by whichever parent used it) — broke silently when used bare inside the chatbot. Made it self-contained (`v-reveal` on its own root) so it works correctly in both places.
- Added an entrance transition to ChatBot messages (`<transition-group>`) — they previously just snapped into existence with no animation at all.
- **Test pass**: ran a structured test plan (navigation from every route including cross-route header-nav, theme persistence, Hero tilt/parallax/badges, all 9 Analysis charts post-fix, 4 chatbot intents, full-site console-error sweep across 4 routes × 2 themes) via Playwright. Zero console/page errors found; all functional checks passed. Full test case list delivered to the owner in-conversation.
- Clean type-check and production build after all fixes.

### Update 12 (2026-08-06) — Hero-only: 3D tilt portrait + floating stat badges
- Scoped strictly to `HeroSection.vue` per owner's request — no other section touched.
- **3D mouse-tilt on the portrait**: `.portrait-frame` rotates toward the cursor (`perspective` + `rotateX`/`rotateY`, computed in `handleTilt()` from pointer position relative to the frame's bounding box), resets smoothly on `mouseleave`. Skipped entirely when `prefers-reduced-motion` is set.
- **Experience/Projects/CGPA redesigned as floating badge chips** instead of a plain 3-column stat row: each is an icon + `CountUp` value in its own small `.surface` card, scattered at different corners of the portrait (`badge-0/1/2`, each with a fixed `rotate:` for a scattered/dynamic look) with a continuous subtle idle float (`translate` keyframe, staggered per badge, disabled under reduced motion).
- **Parallax layering**: the badge layer drifts slightly further than the portrait's own tilt on mouse move (`badgeTransform`, computed alongside `frameTransform` in the same handler) — a second depth plane, not just one rotating card, for a more convincing 3D feel.
- Mobile-first CSS: badges are a plain wrapped flex row by default; the floating/absolute positioning only activates at `min-width: 881px` (skipped on touch devices, where hover-tilt doesn't apply anyway).
- Verified in both themes, with an actual mouse-move to confirm the tilt + parallax visibly engage, and on mobile for the row fallback. Zero console errors; clean type-check and production build.

### Update 11 (2026-08-06) — Hero portrait: AI banner photo, background removed
- Owner supplied `Athish_AI_Image_Banner.jpeg` (via `public/` — Downloads folder wasn't accessible to this session at the OS permission level). Background removed with `rembg` (u2net model, run via a throwaway Python venv, not a project dependency) and the transparent cutout trimmed to its bounding box.
- Exported as **WebP** (`public/profile-ai-portrait.webp`, ~92KB) with a **PNG fallback** (`profile-ai-portrait.png`) for browsers without WebP support, wired through a `<picture>` element in `HeroSection.vue`. The old `linear-gradient` "AI" monogram/PNG-only single-`<img>` path is unchanged for the no-portrait fallback case.
- Redesigned the portrait frame for a transparent cutout instead of a full photo: `object-fit: contain` (nothing crops now that there's no background to crop into), a soft radial-gradient backdrop (`--accent-soft`) behind the figure so the floating cutout reads as deliberate, and the name/location caption moved from a dark absolutely-positioned scrim *on* the photo to a plain caption line *below* the frame (the scrim only made sense against full photo content).
- `profile.ts` gained `portraitFallback`; `portrait` now points at the WebP. The original `profile-full.jpg`/`profile-face.jpg` and the uploaded source JPEG are left in `public/` untouched — orphaned now that Hero no longer references `profile-full.jpg`, but they're the owner's own photo assets, not deleted without being asked.
- Verified in both themes and at mobile width via Playwright; zero console errors; clean type-check and production build.

### Update 10 (2026-08-05) — Analysis page: 6 new chart types
- **Owner supplied a 22-chart-type list** ("Treemap, Sunburst, Packed Bubbles, Funnel, Sankey, Scatter, Histogram, Box Plot, Marimekko, Gauges, Pie, Slope, Tornado, Ribbon, Multi-Axes, Parallel Plot, Bubble, Pyramid, Polar…") and asked which are useful for the report. Evaluated each against the data actually available (skills, projects, timeline) rather than building all 22:
  - **Built (real data backs each, no redundancy with existing charts):** Pie/Donut (`ProjectCategoryDonut.vue` — projects by category), Treemap (`TechStackTreemap.vue` — tech-stack usage frequency), Histogram (`SkillHistogram.vue` — individual skill-level distribution), Box Plot (`SkillBoxPlot.vue` — skill-level spread *within* each category, complementing the radar's averages), Tornado/diverging bar (`CategoryTornado.vue` — category average vs. overall average), Bubble (`ProjectComplexityBubble.vue` — stack size over time, sized by highlights documented).
  - **Skipped, with reasons given to the owner:** Sunburst/Packed Bubbles/Pyramid/Polar (harder-to-read duplicates of a chart already built on the same data), Funnel/Sankey/Ribbon/Slope Graph (no genuine sequential/flow/before-after data — would mean fabricating numbers), Scatter/Parallel Plot/Marimekko (no clean multi-continuous-variable relationship beyond what the Bubble chart already covers), Gauges (would just re-display a number already shown as a KPI tile), **Multi-Axes/dual-axis explicitly flagged as a known anti-pattern** (invents a false correlation between two independent scales) and not built regardless of data fit.
  - `categoryColors.ts` added — one fixed, non-cycled category→hue mapping shared by the Donut and Bubble charts.
  - Fixed a real anti-pattern hit during testing: treemap tiles too small for their label were clipping/overflowing text on mobile — now hides the inline label below a size threshold (title-attribute + a always-present text legend keep the data reachable either way, per "every chart needs a table-view twin").
  - `/analysis` reorganized into two labeled groups, "Skills analysis" and "Project analysis", now 9 charts total. Verified in both themes and at mobile width; zero console errors; clean type-check and production build.

### Update 9 (2026-08-05) — Chatbot: inline charts + contextual follow-ups
- **Scope decision (owner-confirmed):** kept the chatbot 100% client-side/free — no backend, no API cost, no real web search. "Understand the user" + "interactive" delivered via broader local keyword coverage and conversational flow, not a real LLM call. `askBot()` remains the single seam documented for a future real-AI upgrade.
- **Extracted `SkillRadarChart.vue` and `TopSkillsBars.vue`** out of `AnalysisView.vue` into `src/components/charts/` — both now take a `compact`/`showLabels`/`size` prop and are shared between the full `/analysis` page and the chatbot, so the two never drift out of sync.
- **`chatbot/knowledge.ts`**: each `Intent` can now declare a `chart` (`'skills-radar' | 'top-skills'`) and `followUps` (contextual next-question suggestions). Broadened keyword coverage on every existing intent (more synonyms/phrasings) and added four new intents: `top-skills`, `report` (the "give me a report" ask — short stat summary + radar + link to `/analysis`), `location`, `languages`.
- **`ChatBot.vue`**: messages can now carry a chart, rendered as a compact card under the bubble with an "Open full Analysis →" link; the suggestion-chip row is no longer static — it swaps to that reply's `followUps` after every turn, so the conversation has an obvious next step instead of resetting to the same 5 prompts.
- Verified in both themes and at mobile width via Playwright; zero console errors.

### Update 8 (2026-08-05) — Light/dark theme contrast audit
- **Found and fixed a real contrast bug**, not a style preference: the ADNHC project's accent color (`#febc2e`, a pale yellow used for its category label, timeline chip border/text, etc.) measured **1.48:1 contrast against the light theme's background** — computed via the WCAG relative-luminance formula, not eyeballed. The other three accent colors (violet/teal/pink) all measure ~2–3.8:1 in light mode, which is why only this one visibly washed out. Replaced it with `#d97706` (a deeper amber): 2.80:1 in light, 6.01:1 in dark — legible and still reads as a distinct "gold" hue in both themes.
- Audited the rest of the site (every home section, both project-detail layouts, the Analysis page, command palette, chatbot) in both themes via Playwright screenshots — no other color failures found; hardcoded `#fff`/status colors elsewhere are all white-text-on-colored-badge patterns that are theme-independent by design.
- Also: `REST integration` → `Postman integration` in the Integration & APIs skill group (`src/data/skills.ts`).

### Update 7 (2026-08-05) — Analysis page: radar chart + KPI row
- **Two genuinely different chart forms**, not two bar charts: "Skill strength by category" is now a hand-rolled SVG **radar/hexagon chart** (single skill dimension per axis, accent-hue fill wash + stroke + labeled vertices) — a holistic "self-report" shape at a glance. "Top individual skills" stays a horizontal bar chart, which is the correct default form for a ranked list per the dataviz skill's guidance.
- **KPI stat row** added above both charts (Experience, Projects Shipped, Avg Skill Level, M.Sc CGPA) — stat tiles are the dataviz skill's own recommended form for "a handful of headline numbers," giving the page a real report-dashboard opening instead of jumping straight into charts.

### Update 6 (2026-08-05) — Analysis page + wide-screen layout fix
- **New `/analysis` page** (`AnalysisView.vue`): two skill bar charts (average proficiency per category, and top 10 individual skills — both single-accent-hue horizontal bars per the dataviz skill's magnitude-encoding rule) plus a project timeline reusing the Experience section's node/line visual language, grouping all 11 projects by role/era with clickable project chips.
  - Added `period`/`periodStart` to every `Project` in `projects.ts` — inferred from context (which client/role each project's stack/description points to) per owner's request, since projects had no dates before; owner may want to double check the mapping.
  - Nav wiring: "Analysis" added to `MenuBar.vue`'s header nav (as a real route link, distinct from the other items which scroll to home-page sections — `navItems` now supports both `id` and `to` shapes), the home-page footer in `ContactSection.vue`, and the `CommandPalette.vue` quick-jump list. Not added to the floating `AppDock` (out of the requested scope: header + footer only).
  - Extracted the project-detail page's back-button logic (restore previous scroll position via `router.back()`, fall back to home top if there's no in-app history) into a shared `useBackNav.ts` composable, reused by both `ProjectDetailView.vue` and the new `AnalysisView.vue`.
- **Two project buttons, not one:** reverted the earlier one-button-only logic per owner's follow-up — cards/detail pages now show "Run in Browser" (if `demo` set) **and** "View Source Code" (if `repo` set) together whenever both exist.
- **Two project buttons, not one:** reverted the earlier one-button-only logic per owner's follow-up — cards/detail pages now show "Run in Browser" (if `demo` set) **and** "View Source Code" (if `repo` set) together whenever both exist.
- **ADNHC Key IT Assessment:** replaced the placeholder project with the owner's full write-up — a Power Apps assessment workflow (Initiator/Responder/Reviewer roles) across UAE/KSA/Qatar, SharePoint + Power Automate backed, tiered reminder emails.
- **Visual redesign, two passes**, modeled on apple.com's product pages (huge typography, generous whitespace, flat surfaces, one restrained accent color, solid CTAs):
  - **Pass 1 (foundation + nav + hero):** additive type-scale/spacing/flat-surface tokens in `tokens.css`/`base.css` (nothing existing removed, so unmigrated sections kept working); `MenuBar.vue` flattened (no role subtitle, solid scrolled-state background, no shadow); `HeroSection.vue` rebuilt — huge headline, one solid primary CTA + two secondary arrow-links, full-bleed rounded portrait replacing the fake browser-window chrome.
  - **Pass 2 (everything else):** every remaining section (About/Skills/Experience/Projects/Credentials/Contact) and every floating/overlay widget (Dock, ChatBot, WhatsApp, CommandPalette, LivePreviewPanel, GlassWindow) migrated from the `.glass` blur utility to a new flat `.surface` utility; every two-tone `accent`→`accent-2` gradient (buttons, bars, timeline, badges) replaced with a single solid accent color; `BgBlobs.vue` (the animated gradient wallpaper) removed entirely and deleted, along with its now-unused `--blob-*` tokens.
  - Verified with Playwright: full-page + per-section screenshots in dark and light themes, mobile width, command palette, chatbot — zero console errors, `vue-tsc --noEmit` and `vite build` both clean. Note: a naive `fullPage` screenshot without real scroll events shows most sections blank because the `v-reveal` scroll-in animation never triggers — confirmed this is a screenshot-methodology artifact only (a real/simulated scroll renders everything correctly), not a site bug.
- Still open: certifications data, blocked on the owner sharing a PDF/screenshot (LinkedIn blocks automated fetches).

### Update 4 (2026-08-05)
- **One button per project, not two:** each card/detail page now shows exactly one external action — "Run in Browser" (embedded live preview) if `project.demo` is set, else "View Source" (GitHub) if `project.repo` is set, else nothing. Never both at once.
- **Real hosted demos wired in:** confirmed via HTTP check that 3 of the freelance repos are actually live on GitHub Pages (no X-Frame-Options blocking), so `demo` is now set for `campus-requirement-system`, `restaurant-billing-system`, and `furniture-management-system` — their "Run in Browser" buttons load the real deployed app. D2D has no public hosting (enterprise/Dataverse-backed) so it still only shows "View Source".
- **Traffic-light dots removed everywhere** (`GlassWindow.vue` titlebars, the `LivePreviewPanel.vue` panel header, and the `MenuBar.vue` brand) per owner's call — plain text headers instead. The shared `TrafficLights.vue` component that had briefly existed was deleted since nothing uses it anymore.
- **Renamed fake filenames:** `GlassWindow` titles on the detail page changed from `overview.md` / `highlights` to plain `Overview` / `Highlights`.
- **Fixed empty-space layout bug:** the detail-page two-column layout (`.layout`) left a blank column for any project without `ownership`/`outcomes` data. It now collapses to a single, width-capped column (`.layout.no-side`) when there's no sidebar content.
- **Header/dock navigation bug fixed:** `MenuBar.vue`'s nav links, the brand logo, and `AppDock.vue`'s dock items were plain `<a href="#id">` — this only works while already on `/`; from a project detail page it silently did nothing. Extracted the fix `CommandPalette.vue` already had into a shared `useSectionNav.ts` composable and applied it everywhere.
- **DEWA project context added (text only, no new badge):** D2D's copy now states it's an onsite DEWA (Dubai Electricity & Water Authority) engagement; Transmission Power's copy now states it's an off-site DEWA engagement.
- **New placeholder project:** `adnh-catering-key-it` ("ADNH Catering — Key IT") added to `projects.ts` as a stub — title only, tagline/summary/description all say "coming soon", empty `stack`/`highlights`. Needs real details from the owner before it's presentable.
- Verified end-to-end with Playwright against the local dev server (zero console errors) each round; `vue-tsc --noEmit` clean throughout.

### Update 3 (2026-08-04)
- **Play mode:** new `LivePreviewPanel.vue` — a slide-in glass panel (not a modal) that embeds a project's live app in an iframe, with an "Open in a new tab" fallback (shown automatically if the frame stalls, since embedding blocks like X-Frame-Options can't be detected directly). Wired into both `ProjectCard.vue` (a "▶ Play" pill next to "Source") and `ProjectDetailView.vue` ("▶ Play live app" button). Triggered by `project.demo` in `src/data/projects.ts` — set that field to a public URL to enable it for any project; leave it unset to show no Play button.
- **Source button** was already in place (opens `project.repo` on GitHub in a new tab) — unchanged. Projects with no public repo (Power Platform apps, Copilot Studio agents) intentionally show no Source button.
- Verified with Playwright against the local dev server: Play button opens the panel and loads the iframe, Close/backdrop/Escape all dismiss it, and projects without `repo`/`demo` correctly show no extra buttons. `vue-tsc --noEmit` passes.
- LinkedIn cross-check: experience/profile data re-verified against the last LinkedIn sync (commit `14328d4`) — no changes since.

### Update 2 (2026-06-16)
- **Profile photo:** added from a real photo (rotated upright via EXIF, enhanced, two crops — `public/profile-face.jpg` square head-shot, `public/profile-full.jpg` full portrait). Hero now shows the portrait; `profile.photo` / `profile.portrait` in `src/data/profile.ts`.
- **GitHub freelance projects:** pulled from github.com/Athishvenkatesan — added **Restaurant Billing System** and **Furniture Management System**, enriched **Campus Requirement System**, and added repo links (incl. D2D → WebApp-D2D). Projects show a "Freelance" badge and a "View source" link.
- **Dark theme:** refined palette (warmer base, calmer toned-down background blobs, higher text contrast) for better legibility.
- Added GitHub to socials + chatbot contact answer.

- **Stack:** Vue 3 (`<script setup>` + TypeScript strict) · Vite · Vue Router.
- **Design:** macOS-style glassmorphism, light + dark theme toggle (persisted), animated gradient background, floating dock, ⌘K command palette.
- **Content:** fully data-driven from `src/data/*` (profile, skills, projects, experience).
- **AI / interactive:** scripted chatbot (`src/chatbot/`) architected for a one-function upgrade to a real Claude serverless call; WhatsApp click-to-chat with a prefilled message.
- **Sections:** Hero · About · Skills · Experience · Projects (filterable) · Education/Certs/Awards · Contact.
- **Project detail pages:** `/projects/:id` with an "end-to-end ownership" breakdown.

## Positioning decision

- Hero title kept as **"Power Platform Developer"** (resume title) per owner's choice.
- Skills and Projects reposition Athish as a **React + TypeScript front-end engineer** underneath.
- **D2D (Demand to Delivery System)** is the featured **React engineering** case study (React 19, TypeScript strict, Vite, Fluent UI v9, React Router, Dataverse Web API, GSAP, jsPDF, SheetJS) — reframed from Power Platform to front-end engineering, sourced from the real repo at `../demandtodeliverysystem`.

## Stack deviation (noted)

DAK default backend is FastAPI + Postgres. This is a **static front-end portfolio** — no backend is needed. The AI chatbot is intentionally scripted/client-side (owner chose the free option), with a documented seam (`askBot()`) to add a serverless Claude function later if desired.

## How to update content

Everything is data-driven — no component edits needed:
- Identity / contact / WhatsApp → `src/data/profile.ts`
- Skills + proficiency bars → `src/data/skills.ts`
- Projects (add one object to add a project) → `src/data/projects.ts`
- Experience / education / certs / awards → `src/data/experience.ts`
- Chatbot answers → `src/chatbot/knowledge.ts`

## Run / build

```bash
npm install
npm run dev        # local dev
npm run type-check # vue-tsc --noEmit
npm run build      # production build -> dist/
npm run preview    # preview the build
```

## Deploy

Vercel (framework: Vite). Push to GitHub → import in Vercel → auto-deploy on every push. SPA rewrites configured in `vercel.json`.

## Lessons / notes

- Resume PDF served from `public/AthishV-Resume.pdf`.
- Profile photo is optional: drop `public/profile.jpg` and set `profile.photo` to use it; otherwise an "AV" monogram renders.
