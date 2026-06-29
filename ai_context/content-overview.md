# Content Overview

## What the Site Is

A multi-page marketing and showcase website for **GEarheads FTC Team #16460**, a student-led FIRST Tech Challenge team from Brookfield, Wisconsin.

The site targets judges, sponsors, prospective members, and the broader FIRST community. It communicates:
- Industry-grade engineering and competitive results (multiple Worlds appearances, 2025 Worlds 1st CONNECT)
- Identity-defining outreach (Children's Wisconsin, Milwaukee VA, Rookie Qualifier, computer donations)
- Team culture, sustainability, and the student-mentorship pipeline

**Current state:** Home page is built out. All other ~44 pages are stubs using the `UnderConstruction` placeholder.

---

## Navigation Structure

Primary nav (desktop mega-menu / mobile drawer):
- **Home** — flat link to `/`
- **About** — dropdown: Our Story / History, Mission & Values, Team Culture, Awards, Meet the Team
- **STEM** — grouped dropdown: Robot (Overview, Gearboticus, Subsystems, Evolution) · Engineering (Overview, Design Process, CAD & Mechanical, Manufacturing, Testing & Iteration) · Software (Overview, Control Systems, Autonomous & Navigation, Software Innovations)
- **Outreach** — grouped dropdown: Community & Health · Growing FIRST · Access & Advocacy · Events & Demos
- **Seasons** — dropdown: DECODE (2025–26) through Skystone (2019–20)
- **Join the Team** — primary CTA button

---

## Home Page Sections & Current Copy

### Hero
- **Badge:** "FTC Team #16460 · Brookfield, WI"
- **Headline:** "Building the Future of Engineering" (or similar — see HeroSection.tsx for current text)
- **Subtext:** GEarheads identity — student-led, competitive robotics, STEM outreach
- **CTAs:** "View us in Action" → Instagram, "Connect" → /contact
- **Visual:** Robot image (`robot-removebg-preview.png`) inside neumorphic spinning rings

### What We Do (FeaturesGrid)
- **Section title:** "What We Do"
- **Subtitle:** GEarheads identity sentence (Team #16460, student-led FTC, Brookfield WI)
- **Cards:**
  1. **Competitive Robotics** (wide) — custom-CAD robots, FTC, Worlds appearances
  2. **Hands-On Outreach** — Children's Wisconsin, Milwaukee VA, Rookie Qualifier, computer donations
  3. **Engineering & Strategy** — DHF, Monte Carlo simulation, FMEA
  4. **Growing FIRST** (wide) — Production Hub, FLL mentoring, FIRST advocacy

### Sponsors Carousel (SponsorsSection)
- Auto-rotating card carousel of 13 sponsor/partner logos, pitch-black cards, pauses on hover
- Images from `public/assets/sponsor-logos/`

### Season Timeline (Timeline)
- **Title:** present in Timeline component
- **9 entries:** Hydro Dynamics (FLL, 2017–18) → DECODE (FTC, 2025–26)
- Data from `src/public/timeline.json`

### FAQ (FAQSection)
- **9 items:** GEarheads-specific FAQs from `src/public/faq.json`
- **TODO: Confirm FAQ #9 (GE origin story) wording with team**

### Contact
- Removed from home page. Full contact form lives at `/contact` (ContactSection component).
- Real GEarheads contact info: ftcgearheads@gmail.com, 16900 Gebhardt Rd. Brookfield WI, +1 (262)-408-9209

---

## Sub-Pages (all stubs)

All pages below `/` render `<UnderConstruction />`. See `TODO.md` for the full content checklist per page.

| Route | Status |
|---|---|
| `/about`, `/about/history`, `/about/mission`, `/about/culture`, `/about/awards` | Stub |
| `/team` | Stub |
| `/robot`, `/robot/gearboticus`, `/robot/subsystems`, `/robot/evolution` | Stub |
| `/engineering`, `/engineering/design-process`, `/engineering/cad`, `/engineering/manufacturing`, `/engineering/testing` | Stub |
| `/programming`, `/programming/control`, `/programming/autonomous`, `/programming/innovations` | Stub |
| `/seasons/2025-26` through `/seasons/2019-20` | Stub |
| `/outreach` + 12 outreach detail pages | Stub |
| `/impact`, `/sponsors`, `/media`, `/join`, `/contact` | Stub |

---

## Assets

Located in `public/assets/` (accessible at `/assets/` in the browser):
- `sponsor-logos/` — 13 sponsor/partner PNGs (Elmbrook Education Foundation, Elmbrook Schools, GE Healthcare, Johnson Controls, MC Squared Computing, MelonBotics, Milliman, Milwaukee, MPC Advisers, Northwestern Mutual, PRSG, Reserve Advisors, Wisconsin DPI)
- `photos/outreach/` — outreach photography (contents TBD)

Located in `assets/` (bundled via Vite):
- `logos/` — `logo-black.png`, `logo-blue-green.png`
- `fonts/` — `Asimov.ttf` (not used in theme)

Located in `src/public/`:
- `timeline.json` — 9-entry season timeline data for `Timeline` component
- `faq.json` — 9 FAQ entries for `FAQSection` component

---

## Known Gaps / TODOs

- Add impact stats strip to home page
- Populate all 44 stub pages (full checklist in `TODO.md`)
- Collect team photos, member bios, sponsor logos, video links
- Update favicon to GEarheads branding
