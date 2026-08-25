# Gearheads Website — Claude Code Guide

## Project Overview

React + TypeScript + Vite multi-page website for **FTC Team #16460 — GEarheads**, a student-led FIRST Tech Challenge robotics team from Brookfield, Wisconsin.

## Stack

- **Framework:** React 18 + TypeScript, Vite, react-router-dom v7
- **Styling:** styled-components only (no Tailwind, no CSS modules, no inline style objects except true one-offs)
- **Icons:** react-icons (`md` set only)
- **Animation:** CSS keyframes/transitions is the default; `motion` (v12, imported as `motion/react`) is used sparingly for entrance effects (`BlurText`, `FadeIn`); `gsap` is a dependency but not yet used in any shipped component — check before assuming it's wired up anywhere.

## Key Commands

```bash
npm run dev       # Start dev server
npm run build     # Type-check (tsc) + build to dist/
npm run preview   # Preview production build
```

Dev server often runs in a separate session at `localhost:5173` — use the existing one instead of starting a new one.

## Project Structure

```
src/
  assets/         # Static assets (Vite-processed): fonts/, logos/, photos/, sponsor-logos/
  components/     # Shared components (Header, Footer, Loader, reactbits/ entrance-animation helpers, tutorial/)
  data/           # Static JSON/TS data files — every page's copy lives here, not inline
  pages/          # Page-level components, one subfolder per site section (about/, robot/, engineering/, programming/, outreach/, seasons/, resources/)
  styles/         # theme.ts (tokens), GlobalStyles.ts, mixins.ts (shared hover/animation css)
  App.tsx         # Routes (React.lazy per page) + ThemeProvider + GlobalStyles
public/           # Vite static root — only favicon.png
ai_context/       # Accumulated session context — see table below
docs/superpowers/specs/  # Approved design specs for specific features
```

## Orientation — Read Before Acting

| File | Read when |
|---|---|
| `DESIGN.md` (root) | Any UI/styling work — canonical colors, typography, spacing, shadow, and component tokens |
| `PRODUCT.md` (root) | Understanding audience, positioning, or which facts are confirmed vs. open questions |
| `ai_context/component-map.md` | Adding/modifying/understanding any component or the page tree |
| `ai_context/ui-conventions.md` | Writing new components — styled-components patterns, animation rules, "not AI" design rules |
| `TODO.md` | The authoritative per-page build checklist — what's built vs. stub, current as of its "Last updated" date |
| `ai_context/*-page.md`, `ai_context/*-redesign.md`, etc. | Page-specific build history — load-bearing constraints/decisions/gotchas for that page's already-shipped implementation |

If a task is significant — a new section, a major refactor, an important design decision — **add a file to `ai_context/`** documenting the decision, rationale, and any constraints discovered. This is how context accumulates across sessions. Don't duplicate what's already canonical in `DESIGN.md`/`PRODUCT.md`/`TODO.md`.

## UI Work Requires the `impeccable` Skill

**Every time a UI component is created or significantly modified, invoke the `impeccable` skill before writing code.** This repo's design system (`DESIGN.md`) is schema-managed by that skill — invoke it rather than freehanding styling from memory, so new work stays consistent with the current tokens and doesn't drift into template-generic patterns.

## Session Habits

- **Start every response with the user's name: Shivansh.**
- **After finishing a task**, check `TODO.md` for matching items and mark them `[x]` inline — don't batch this for later.
- **Before ending a session:** delete any screenshots created during the session (root-level PNGs, `.playwright-mcp/*.png` — never commit these), and update `.gitignore` if new build/tool artifacts appeared.

## Static Data Convention

All static site content (team members, seasons, tools, FAQs, sponsors, timeline entries, page copy, etc.) is stored as JSON/TS files in `src/data/`, imported directly by components — never inline arrays/objects in a component file. Icon components and theme color references can't go in JSON — use `iconKey`/`colorKey` string maps and resolve them in the component (see `SponsorsSection.tsx`, outreach pages).

## Coding Conventions

- No unnecessary comments — only add one when the "why" is non-obvious
- Prefer editing existing files over creating new ones; no abstractions beyond what the task needs
- All color values, shadows, fonts, and spacing come from `src/styles/theme.ts` — never hardcode them in components
- `$`-prefix transient props on styled-components (e.g. `$wide`) so they don't leak to the DOM
- Strict TS: `npx tsc --noEmit` must stay clean (`noUnusedLocals` is on) before calling a page done
