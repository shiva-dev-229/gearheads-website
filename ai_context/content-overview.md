# Content Overview

## What the Site Is

A multi-page marketing and showcase website for **GEarheads FTC Team #16460**, a student-led FIRST Tech Challenge team from Brookfield, Wisconsin. Targets judges, sponsors, prospective members, and the broader FIRST community. See `PRODUCT.md` for full positioning/audience detail.

**Current build state:** Home, About hub, Engineering (all sub-sections, consolidated into one scrolling page), Programming (all sub-sections, consolidated), all 12 Outreach detail pages + hub, and 6 tutorial course pages (`/resources/git`, `/resources/blocks`, `/resources/java`, `/resources/qualifier-prep`, `/resources/react`, `/resources/onshape-tutorials`) are built. Robot section, Seasons pages, `/team`, `/impact`, `/sponsors`, `/media`, `/join` remain `UnderConstruction` stubs — see `TODO.md` for the authoritative per-page checklist.

---

## Navigation Structure

Per the live `Header.tsx` mega-menu (desktop dropdowns / mobile `StaggeredMenu`):
- **About** — 4-group dropdown: Who We Are (Mission, Culture) · The Team · Season History · Seasons (DECODE 2025–26 through Hydro Dynamics 2017–18) — all anchor into `/about#...`
- **Design** — stacked 2-group dropdown: Software (Overview, Control Systems, Autonomous & Navigation, Software Innovations, Auto Paths) · Mechanical (Overview, Design Process, CAD & Mechanical, Manufacturing, Testing & Iteration) — anchors into `/programming#...` / `/engineering#...`, Auto Paths is the one standalone `/robot/auto-paths` route
- **Outreach** — 4-group dropdown matching the site's 4 categories: Community & Health · Growing FIRST · Access & Advocacy · Events & Demos
- **Resources** — 3-group dropdown: Software (Git/Blocks/Java/React tutorials) · Mechanical (Onshape Tutorials, Parts, Production Hub) · General (Qualifier Prep, Sponsorship Guide, Computer Outreach)
- **Contact Us** — primary CTA button, top-right

Engineering/Programming sub-routes redirect to `/engineering#<anchor>` / `/programming#<anchor>` — see `ai_context/page-consolidation.md`. Note: there is no separate "Robot" or "Seasons" top-level nav item and no "Join" CTA — both were superseded by this mega-menu structure; `component-map.md`'s older nav description predates it.

---

## Home Page Sections

`HeroSection` → `FeaturesGrid` ("What We Do", 4 bento cards) → `SponsorsSection` (13-logo marquee) → `Timeline` (9 FLL/FTC seasons, `src/data/timeline.json`) → `FAQSection` (9 entries, `src/data/faq.json`).

Real contact info: ftcgearheads@gmail.com, 16900 Gebhardt Rd, Brookfield WI, +1 (262) 408-9209 — lives on `/contact`, not the home page.

---

## Assets

- `src/assets/sponsor-logos/` — 13 sponsor/partner PNGs, resolved via `import.meta.glob` in `SponsorsSection`
- `src/assets/photos/outreach/<slug>/` — per-outreach-page photo folders; pages fall back to dashed `PhotoSlot` placeholders where a folder/file doesn't exist yet
- `src/assets/logos/`, `src/assets/fonts/Asimov.ttf` (brand font, not used in current theme typography — reserved)
- `src/data/timeline.json`, `faq.json`, plus one JSON/TS file per built page (see `ai_context/component-map.md`)
