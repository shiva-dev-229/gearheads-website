# Gearheads Website — Claude Code Guide

## Project Overview

React + TypeScript + Vite multi-page website for **FTC Team #16460 — GEarheads**, a student-led FIRST Tech Challenge robotics team from Brookfield, Wisconsin.

**Current state: intentionally bare-bones.** The site was fully stripped of styling (no CSS, no styled-components, no animation) down to plain semantic HTML rendering real content only, ahead of a from-scratch visual redesign. Do not reintroduce the old dark-neumorphic look, styled-components, or any of the previous design system from memory or by inference — the whole point of the strip-down was a clean slate. When restyling begins, treat it as a new design decision, not a restoration.

## Stack

- **Framework:** React 18 with TypeScript
- **Build tool:** Vite
- **Styling:** none yet — plain HTML elements, no CSS/styled-components/Tailwind. A styling approach will be chosen when the redesign starts.
- **Icons:** react-icons (`md` set only)

## Key Commands

```bash
npm run dev       # Start dev server
npm run build     # Type-check + build to dist/
npm run preview   # Preview production build
```

**Note:** Dev server often runs in a separate session at `localhost:5173`. Always use the existing running server instead of starting a new one.

## Project Structure

```
src/
  assets/         # All static assets (Vite-processed)
    fonts/        # Asimov.ttf
    logos/        # Brand logos
    photos/       # Photography (home/, outreach/, about-hero-bg.jpg)
    sponsor-logos/  # 13 sponsor PNGs (resolved via import.meta.glob in SponsorsSection)
  components/     # React components
  data/           # Static JSON data files (imported directly in components)
  pages/          # Page-level components
  App.tsx         # Root component
  main.tsx        # Entry point
public/           # Vite static root — only favicon.png lives here
ai_context/       # AI session context — team/content archives only (see below)
```

---

## AI Context — START HERE

**Before acting on any instruction, read the relevant files in `ai_context/`.**

The old per-feature design-decision docs and design-system doc were deleted along with the visual design itself — don't recreate them from memory. What remains in `ai_context/` is source material about the team (competition history, engineering portfolios, outreach documentation), not the old UI.

If a task is significant — a new section, a major refactor, an important design decision, a new feature — **create a file in `ai_context/`** documenting the decision, rationale, and any constraints discovered. Name it clearly (e.g. `sponsors-section.md`, `mobile-menu-redesign.md`). This is how context accumulates across sessions.

---

## UI Component Rule — /ui-ux Skill Required

**Every time a UI component is created or significantly modified, invoke the `/ui-ux` skill before writing code.**

This ensures new components are the product of a deliberate design decision and don't look AI-generated or template-generic. The skill must be invoked, not just recalled from memory. There is no established visual design to match right now — the site is bare-bones pending a from-scratch redesign — so don't default to the old neumorphic look; treat each styling decision as new.

Apply this to: new components, new sections, redesigned sections, new interactive elements (modals, drawers, tooltips, carousels, tabs, etc.).

---

## Session Instructions

### Session Start — Read ai_context First

**At the start of every session**, before taking any action, read the relevant files in `ai_context/`. This ensures context from prior sessions is loaded before any work begins.

---

### Response Format

Every response must begin with the user's name: **Shivansh**.

---

### TODO.md — Check Off Completed Items

**After completing any task**, scan `TODO.md` for items that match what was just done and mark them `[x]`. Do this inline — don't batch it for the end of the session. If multiple items are covered by one change, check them all off.

---

### .gitignore — End-of-Session Update

**At the end of every session**, review the working directory for any new files, folders, or tool artifacts that should not be committed and update `.gitignore` accordingly before finishing. Common things to watch for:

- New build output directories
- New tool cache folders (e.g. `.playwright-mcp/`, `.vite/`)
- New environment or secret files
- OS-generated files (`.DS_Store`, `Thumbs.db`)
- Editor config or workspace files

---

### Screenshot Cleanup

**Delete all screenshots before ending any session.** Screenshots accumulate quickly from Playwright and manual verification steps.

- Root-level PNGs (e.g. `hero-check.png`, `after-1280.png`) — delete after verification is done
- `.playwright-mcp/*.png` — delete the entire contents of this folder at session end
- Never commit screenshots to git

---

## Static Data Convention

**All static site content (team members, seasons, tools, FAQs, sponsors, timeline entries, etc.) must be stored as JSON files in `src/data/`.** Components import these files directly — no inline data arrays or objects in component files.

- Existing files: `faq.json`, `sponsors.json`, `timeline.json`, `team.json`, `about.json`
- When adding new static content, create or extend a JSON file in `src/data/` rather than hardcoding it in the component
- Icon components cannot go in JSON — use `iconKey` string maps and resolve them in the component
- Sponsor logo images in `sponsors.json` use bare filenames (e.g. `"sponsors-ge-healthcare.png"`); resolved to imported URLs via `import.meta.glob` in SponsorsSection

---

## Coding Conventions

- No unnecessary comments — only add one when the "why" is non-obvious
- Prefer editing existing files over creating new ones
- Do not add abstractions beyond what the task requires
- Keep components focused and minimal
- No styling framework is chosen yet — don't reach for styled-components, Tailwind, or CSS modules without it being a deliberate decision for the redesign
