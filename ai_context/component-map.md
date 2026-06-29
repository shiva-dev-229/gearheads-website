# Component Map

## App Shell

```
App (src/App.tsx)
├── ThemeProvider (styled-components theme)
├── GlobalStyles
├── BrowserRouter
│   ├── ScrollToTop            — resets scroll on every route change
│   ├── Suspense (lazy loading)
│   │   ├── Header             — sticky mega-menu nav (replaces legacy TopNav)
│   │   ├── <Route pages>      — 45 lazy-loaded page components
│   │   └── Footer             — site-wide footer (replaces legacy PageFooter)
│   └── Loader                 — full-screen loading fallback
```

---

## Home Page Components

Home (`/`) assembles these sections in order:

```
HomePage (inline in App.tsx)
├── HeroSection
├── FeaturesGrid
├── SponsorsSection
├── Timeline  (wrapped in TimelineWrapper)
└── FAQSection
```

---

## Component Reference

### `Header` (`src/components/Header.tsx`)
- Sticky, z-index 100, 80px height
- Brand: `MdPrecisionManufacturing` icon + **GE**arheads wordmark (GE in secondary/green)
- Desktop nav: mega-menu with grouped dropdowns for About, STEM, Outreach, Seasons; flat link for Home; "Join the Team" primary CTA
- Mobile: hamburger → `MobileDrawer` with accordion-style section toggles
- Dropdown state managed by `openLabel` + hover timers; closes on route change and Escape key
- Nav items with `to != null` use `TriggerNavLinkDropdown` (NavLink-based); items with `to: null` use `TriggerButton`

### `Footer` (`src/components/Footer.tsx`)
- 5-column grid desktop: Brand col + Team, Technical, Community, Connect nav cols
- Brand col: GEarheads icon + tagline + social icon links
- Nav sections route to real pages across the site
- Bottom bar: copyright © 2025 GEarheads FTC Team #16460

### `HeroSection` (`src/components/HeroSection.tsx`)
- Left: badge ("Student-Led FTC Robotics") + BlurText H1 headline + subtext + two buttons ("View us in Action" → Instagram, "Connect" → /contact)
- Right: robot image (`robot-removebg-preview.png`) inside two neumorphic spinning rings (outer 60s, inner 40s reverse)
- Layout: stacked on mobile, side-by-side on desktop at 768px

### `FeaturesGrid` (`src/components/FeaturesGrid.tsx`)
- Section header: "What We Do" + GEarheads identity subtitle
- Grid: 1 col mobile → 2 cols tablet → 3 cols desktop (1024px)
- 4 cards:
  1. **Competitive Robotics** — `$span={2}` (2 cols) — custom-CAD robots, FTC, Worlds appearances
  2. **Hands-On Outreach** — single col — Children's Wisconsin, Milwaukee VA, Rookie Qualifier, computer donations
  3. **Engineering & Strategy** — single col — DHF, Monte Carlo, FMEA
  4. **Growing FIRST** — `$span={2}` (2 cols) — Production Hub, mentoring, advocacy
- Hover: shadow upgrades `neoRaised` → `neoRaisedLg`

### `SponsorsSection` (`src/components/SponsorsSection.tsx`)
- Pitch-black card carousel — auto-advances every 3s, pauses on hover, seamless infinite loop
- 13 sponsor logos from `public/assets/sponsor-logos/` via `src/public/sponsors.json`
- Constrained to `containerMax` with edge fades

### `Timeline` (`src/components/Timeline.tsx`)
- Background: `surfaceContainerLow` (`#1c1b1b`), `border-radius: 24px`
- Data sourced from `src/public/timeline.json`
- 9 entries: FLL Hydro Dynamics (2017) → FTC DECODE (2025–26)
- Desktop: alternating left/right layout with vertical center line
- FLL entries: blue (`primary`) accent; FTC entries: green (`secondary`) accent — via CSS custom properties per entry
- Each entry links to its season page; scroll-reveal via IntersectionObserver + `rb-visible`

### `ContactSection` (`src/components/ContactSection.tsx`)
- Info card (email, address, phone — real GEarheads data) + contact form card
- Rendered at `/contact` route via `ContactPage`; removed from home page
- Animated submit button: idle → loading → success states

### `FAQSection` (`src/components/FAQSection.tsx`)
- Data sourced from `src/public/faq.json`
- 9 GEarheads FAQs, numbered `01`–`09`
- CSS grid accordion with alternating blue/green accent colors per item
- Open state: colored left border + elevated shadow; numbered label highlights in accent color

### `Loader` (`src/components/Loader.tsx`)
- Full-screen loading spinner shown during React.lazy suspense
- Dual counter-rotating rings (neumorphic style)

### `UnderConstruction` (`src/components/UnderConstruction.tsx`)
- Shared placeholder for all unbuilt pages
- Used by all 45 page stubs that aren't yet implemented

### `ScrollToTop` (`src/components/ScrollToTop.tsx`)
- Utility component — scrolls `window` to top on every route change

---

## Legacy (Unused) Components

These files exist but are not imported anywhere and are superseded:
- `TopNav.tsx` — replaced by `Header.tsx`
- `PageFooter.tsx` — replaced by `Footer.tsx`

---

## Pages Structure (`src/pages/`)

```
pages/
├── HomePage.tsx               — / (Home, fully built)
├── AboutPage.tsx              — /about (stub)
├── TeamPage.tsx               — /team (stub)
├── RobotPage.tsx              — /robot (stub)
├── EngineeringPage.tsx        — /engineering (stub)
├── ProgrammingPage.tsx        — /programming (stub)
├── OutreachPage.tsx           — /outreach (stub)
├── ImpactPage.tsx             — /impact (stub)
├── SponsorsPage.tsx           — /sponsors (stub)
├── MediaPage.tsx              — /media (stub)
├── JoinPage.tsx               — /join (stub)
├── ContactPage.tsx            — /contact (stub)
├── NotFoundPage.tsx           — 404 catch-all
├── about/
│   ├── HistoryPage.tsx        — /about/history (stub)
│   ├── MissionPage.tsx        — /about/mission (stub)
│   ├── CulturePage.tsx        — /about/culture (stub)
│   └── AwardsPage.tsx         — /about/awards (stub)
├── robot/
│   ├── GearbotPage.tsx        — /robot/gearboticus (stub)
│   ├── SubsystemsPage.tsx     — /robot/subsystems (stub)
│   └── EvolutionPage.tsx      — /robot/evolution (stub)
├── engineering/
│   ├── DesignProcessPage.tsx  — /engineering/design-process (stub)
│   ├── CadPage.tsx            — /engineering/cad (stub)
│   ├── ManufacturingPage.tsx  — /engineering/manufacturing (stub)
│   └── TestingPage.tsx        — /engineering/testing (stub)
├── programming/
│   ├── ControlPage.tsx        — /programming/control (stub)
│   ├── AutonomousPage.tsx     — /programming/autonomous (stub)
│   └── InnovationsPage.tsx    — /programming/innovations (stub)
├── seasons/
│   └── [2019-20 through 2025-26 season pages] (stubs)
└── outreach/
    ├── ChildrensHospitalPage.tsx
    ├── VeteransPage.tsx
    ├── ComputerProjectPage.tsx
    ├── RookiePage.tsx
    ├── ProductionHubPage.tsx
    ├── DiyCncPage.tsx
    ├── MakerFairePage.tsx
    ├── FirstAdvocacyPage.tsx
    ├── GeElfunsPage.tsx
    ├── FllMentoringPage.tsx
    ├── CommunityDemosPage.tsx
    └── SchoolSupportPage.tsx
```

---

## Shared Patterns

### Section Wrapper Pattern
```tsx
const Section = styled.section`
  width: 100%;
  max-width: ${theme.spacing.containerMax};  // 1280px
  margin: 0 auto;
  padding: 48px ${theme.spacing.marginMobile};
  display: flex;
  flex-direction: column;
  gap: 48px;

  @media (min-width: 768px) {
    padding: 64px ${theme.spacing.marginDesktop};
  }
`
```

### Section Header Pattern
```tsx
// SectionHeader — centered container, max-width 640px
// SectionTitle — H2 styled heading
// SectionSubtitle — secondary text description
```

### Card Pattern
```tsx
// background: ${theme.colors.background}
// box-shadow: ${theme.shadows.neoRaised}
// border-radius: 24px  (large) or 16px (medium)
// padding: 32px
```

### Icon Well Pattern
```tsx
// 64px circle (or 48px/40px for smaller)
// background: ${theme.colors.background}
// box-shadow: ${theme.shadows.neoInset} or neoInsetSm
// border-radius: 50%
// icon color: primary, secondary, or tertiary
```
