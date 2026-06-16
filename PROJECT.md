---
name: Athish V Portfolio
goal: A premium, macOS-glassmorphism personal portfolio for Athish V with AI chatbot, WhatsApp click-to-chat, and a React-forward project showcase.
domain: Personal / portfolio
audience: Recruiters, hiring managers, collaborators
status: building
---

# Athish V — Portfolio Website

## Current State (2026-06-16)

Full site built; profile photo + GitHub freelance projects added; dark theme refined.

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
