# Outreach Pages — Build Plan

_Plan for turning all 12 outreach detail pages + the `/outreach` hub from `UnderConstruction`
stubs into full, responsive, interactive pages. `VeteransPage.tsx` is the built **reference
implementation** — every page follows its patterns._

## Reference implementation

`src/pages/outreach/VeteransPage.tsx` + `src/data/veterans.json` are the canonical model.
Study them before building any other page. They establish every shared convention below.

## Shared conventions (apply to every outreach page)

- **Shell:** `PageRoot` (width:100%, overflow-x:hidden) → `HeroSection` → `Section`/`Inner`
  content blocks separated by `Divider` (1px gradient). Copy these styled-components from
  VeteransPage.
- **Accent = GREEN** (`theme.colors.secondary`, `theme.shadows.glowGreen`). Chip dot, section
  labels, stat values, active stepper/accordion glow, connector fills, highlight icons — all green.
  This is the outreach identity (vs. blue for engineering/software).
- **Hero:** `Chip` (green `ChipDot` + category label) → `BlurText` `HeroHeading` → `HeroSubtitle`.
  Optional lead image beside the copy (`HeroLayout` 2-col) when a real photo exists; otherwise
  keep the hero single-column (no empty image well).
- **Section headers:** inline `SectionLabel` (green, uppercase) + `SectionHeading` (H2) +
  `SectionSubtext`. There is NO shared `SectionHeader` component — do not import one.
- **Entrance:** wrap each major section in `FadeIn`. Hover micro-interactions on cards
  (raise to `neoRaisedLg`, `translateY(-2px)`). Respect `prefers-reduced-motion` on steppers.
- **Stats:** `StatsRow` of `StatChip`s; numeric values run through `CountUpChip`
  (`src/components/reactbits/CountUpChip.tsx`) using the `parseStatValue` helper (leading number
  + suffix). Include a stats section only where real numbers exist in TODO.md.
- **Photos:** resolve via `import.meta.glob('../../assets/photos/outreach/<folder>/*', {eager,query:'?url',import:'default'})`.
  Use real photos where a matching folder exists; otherwise render dashed captioned `PhotoSlot`
  placeholders (copy from VeteransPage) so photos can be dropped in later.
- **NO back-navigation card.** Pages do not end with a "Back to Outreach" card. The last section
  is real content (photo strip or a closing section). Navigation is via the top navbar only.
- **Content depth:** GO LONG. Each activity/program/service gets a substantial, specific
  description (see VeteransPage `programs[].detail` — ~4-6 sentences each) plus a highlights list.
  These pages should read as rich, in-depth stories, not thin summaries. Never invent statistics
  or names beyond what TODO.md provides; elaborate truthfully on what an activity involves.
- **Data:** all copy lives in `src/data/<slug>.json`, imported by the page. No inline content arrays.
- **Strict TS build** (`noUnusedLocals`): zero unused imports/styled-components. Theme tokens only.
- **Facts source:** `TODO.md` section 7 (Outreach) holds the vetted facts for every page — the
  builder reads its page's bullets there and expands them into long-form copy.

## Interactive component assignment (for variety across pages)

Reuse these existing implementations:
- **Node stepper** — `VeteransPage.tsx` / `DesignProcessPage.tsx` (glow-safe `NodesRow padding:18px`,
  `width`-animated connectors).
- **Horizontal accordion** — `AutonomousPage.tsx` (`StagePanel` expand/collapse).
- **Bento grid** — `InnovationsPage.tsx` (`$wide` cards, cursor-glow).
- **DHF-style vertical accordion** — `DesignProcessPage.tsx` (`DhfItem` grid-rows transition).

| # | Slug / route | Title (working) | Chip category | Featured interaction | Stats (from TODO) |
|---|---|---|---|---|---|
| 1 | `childrens-hospital` | Play, powered by robotics | Community & Health | Horizontal accordion of activities (paper circuits, catapults, pneumatics, robotics kits, live demo) | 40 patients this season · 4 sessions · 90 team hrs · 140+ kids / 21 sessions all-time |
| 2 | `veterans` ✅ built | Robotics that serves those who served | Community & Health | Node stepper (3 programs) | 12 vets · 12 sessions · 130+ hrs · 3 programs |
| 3 | `computer-project` | Computers, wiped clean and sent far | Community & Health | Node stepper of the pipeline (collect → inventory → wipe+OS → distribute) + recipients grid | 56 laptops this season · 156 all-time · 1,000+ students · 5-yr growth 9→16→35–44→56 |
| 4 | `rookie-qualifier` | Running the event that grows the region | Growing FIRST | Node stepper of the 5-week webinar series | 26 rookie teams · 80+ volunteers · 3 new judges · 2nd year |
| 5 | `production-hub` | A fabrication shop for the whole region | Growing FIRST | Bento grid of services (CNC, 3D print, laser, plotter) + teams-coached cards | 41 parts made · 14+ distributed · 7 teams · 70+ hrs |
| 6 | `diy-cnc` | Teaching teams to build their own machines | Growing FIRST | Horizontal accordion of pilot teams + MPCNC concept | (few hard numbers — keep stats minimal or omit) |
| 7 | `maker-faire` | Robotics on the biggest stage in the state | Events & Demos | Bento grid of highlights + recruiting story | 6,000+ at venue · 500+ engaged · 5th year · Nov 8–9 |
| 8 | `first-advocacy` | Taking FIRST to the capitol | Access & Advocacy | Node stepper / timeline of advocacy milestones + legislators grid | $500K annual funding secured · 75+ legislators · 3 yrs advocacy day |
| 9 | `ge-elfuns` | Bringing robotics to GE retirees | Access & Advocacy | Horizontal accordion (partnership facets) | (minimal/none) |
| 10 | `fll-mentoring` | Guiding the next generation of FIRST | Growing FIRST | Horizontal accordion of activities (judging, showcase, keynote, parent guidance) | (minimal — keep qualitative) |
| 11 | `community-demos` | Meeting the community where it is | Events & Demos | Bento grid of venues (Brookfield Library, Elm Grove, BC Club Fair, Elmbrook STEM fairs) | (counts if available) |
| 12 | `school-support` | Backed by our district | Access & Advocacy | DHF-style vertical accordion of partnership facets | (~$100 club fee context) |

## `/outreach` hub

Replace the `OutreachPage` stub with a real hub:
- Hero (Chip "Outreach", BlurText headline, subtitle: outreach-is-who-we-are statement) +
  top-line metrics stats row (1,000+ students · 31+ teams · 28+ events · 500+ hours).
- A card grid of all 12 detail pages, grouped under the 4 categories used in the navbar:
  **Community & Health · Growing FIRST · Access & Advocacy · Events & Demos**. Each card links to
  its `/outreach/<slug>` route (green accent, hover raise). This makes every detail page reachable
  from the UI (the navbar mega-menu also links them).
- No back-nav.

## Revision 2 — depth, photos, and officials spots (applies to every page)

After the first build pass, three enhancements apply to ALL outreach detail pages:

1. **More depth.** Expand every activity/program/service/milestone into a genuinely in-depth
   explanation of the project — what it is, how it runs, who it serves, why it matters, and
   concrete detail. Aim well beyond a paragraph per item; these should be rich, long-read pages.
   Add supporting prose sections (e.g. an "Our approach" / "Why it works" narrative block) where
   it helps tell the story. Never fabricate numbers/names beyond TODO.md — elaborate truthfully.

2. **More photos.** Do not rely on a single photo strip. Distribute multiple photo slots through
   the page: a hero image slot, inline section images (e.g. beside a narrative block), and a
   larger closing gallery. Real photos where a matching `src/assets/photos/outreach/<folder>`
   exists; dashed captioned `PhotoSlot` placeholders everywhere else, each with a specific caption
   describing the intended shot so they're easy to fill later.

3. **Officials & Partners spots.** Wherever a page names specific officials, dignitaries, mentors,
   or partner organizations, add a dedicated **"People & Partners"** section of person cards. Each
   card = a portrait photo placeholder (dashed `PhotoSlot`, or real image if available) + name +
   title/role + an optional one-line note — an explicit **spot for the user to drop in a headshot
   and details later**. Store as a `people[]` array in the page JSON. Named people/partners by page:
   - **first-advocacy:** Gov. Tony Evers, Sen. Tammy Baldwin, Rep. Adam Neylon, Sen. Rob Hutton
   - **childrens-hospital:** Dr. Jeffrey Karst (PhD Pediatrician), Leslie Scott (RN)
   - **veterans:** Sam Doughty (CTRS), Sean Clarke (Program Director), Kali Dancisak, Erinn Brulla
     (upgrade existing mentor cards to include a portrait photo slot)
   - **school-support:** Elmbrook Superintendent, Principal, Athletic Director (role-only until named)
   - **ge-elfuns:** GE Elfuns group contact (partner spot)
   - **rookie-qualifier:** Team 13201 Hazmat (collaborating team) + judges
   - **computer-project:** partner orgs (Milliman, Reserve Advisors, Soerens Ford, Tech Lit Africa)
   Person cards default to a placeholder portrait; the user will supply photos.

Keep everything else (green accent, no back-nav, reuse of patterns, theme tokens, strict TS).

## Revision 2 status — maker-faire ✅

`/outreach/maker-faire` completed Revision 2 (2026-07-07):
- Highlights bento cards expanded to multi-paragraph long-form copy (preserved `wide` layout).
- Added **"Our Approach"** prose section (4 paragraphs + inline dashed `PhotoSlot`) between Stats and Bento.
- Hero image well upgraded to real-or-placeholder pattern (matches VeteransPage).
- Added `partners[]` array to JSON → **"Venue & Partners"** section with dashed logo `PhotoSlot` cards.
- Closing photo strip replaced with 6-slot `PhotoGallery` (2/3-col responsive) with specific captions.
- `CardDesc` uses `white-space: pre-line` so multi-paragraph strings in JSON render correctly.
- `tsc --noEmit` clean in both edited files; 4 pre-existing errors in other pages are unrelated.

## Build order (subagent waves)

All detail pages are independent files (page + its own JSON) → build in parallel waves. The
`/outreach` hub is built last (or in parallel; it only needs the slugs/titles, which are fixed above).
Each builder: (1) reads TODO.md section 7 for its page + VeteransPage/its featured-component
reference, (2) writes `src/data/<slug>.json` with long-form copy, (3) rewrites
`src/pages/outreach/<Name>Page.tsx` (route already wired in App.tsx). Verify with
`npx tsc --noEmit` + `npm run build` after each wave.
