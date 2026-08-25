---
name: GEarheads Website — Premium Redesign
description: Restrained, typography-led, dark-based product design for FTC Team #16460's public site — Apple-tier engineering-team aesthetic, not a neumorphic dashboard
colors:
  ink: "#0a0a0a"
  surface: "#131313"
  surface-raised: "#1a1a1a"
  hairline: "rgba(255,255,255,0.08)"
  hairline-strong: "rgba(255,255,255,0.14)"
  text-primary: "#e5e2e1"
  text-secondary: "#8f8f93"
  accent-blue: "#adc6ff"
  accent-green: "#4ae183"
typography:
  display:
    fontFamily: "Geist, sans-serif"
    fontSize: "clamp(2.75rem, 6vw + 1rem, 5.5rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Geist, sans-serif"
    fontSize: "clamp(2rem, 3.5vw + 1rem, 3rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Geist, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
  body-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.08em"
  eyebrow:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "10px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.14em"
rounded:
  sm: "8px"
  md: "14px"
  pill: "999px"
  circle: "50%"
spacing:
  base: "8px"
  gutter: "32px"
  marginMobile: "20px"
  marginDesktop: "80px"
  sectionPaddingMobile: "56px"
  sectionPaddingDesktop: "144px"
  containerMax: "1280px"
  proseMax: "680px"
---

# Design.md — Premium Redesign Spec

This is an implementation spec, not marketing copy. It replaces the neumorphic "Control Console" system (`ai_context/design-tokens-audit.md` has the full before/after token delta) with a restrained, typography-led product aesthetic — the direction a judge, sponsor, or engineering recruiter would read as a serious, expensive build rather than a template.

## Why the neumorphic system is going

Dual-tone embossed shadows on every surface (`neoRaised`/`neoInset` and their eight variants) were a distinctive choice in 2024, but neumorphism reads today as a dated UI trend, not as "premium" — the opposite of the goal here. Apple, Linear, and every serious engineering-product site of the last few years get depth from **typography scale, whitespace, and one earned shadow**, not from decorating every card with a light/dark shadow pair. This spec keeps the site's actual brand identity (console blue + telemetry green, near-black base, the Geist/Inter/JetBrains Mono type system, the Asimov wordmark) and throws out the shadow vocabulary, the pill-everything shape language, and the six-tier surface-color scale.

## Core brand — non-negotiable

Per `ai_context/design-tokens-audit.md`, these are the team's actual identity (present in the logo file itself), not decoration:

- **Console Blue `#adc6ff`** — the one interactive color. Links, active states, primary CTA, focus rings, and the rare title that wants emphasis. Nothing else is blue.
- **Telemetry Green `#4ae183`** — the outreach/positive-signal color, and the "GE" of the wordmark. Used more narrowly than before: outreach-section identity, status/live indicators, the GE Healthcare easter egg. Not a general-purpose second accent.
- **Near-black base `#0a0a0a`/`#131313`** — the site stays dark. This is a real identity choice (engineering console, not a generic SaaS light theme), not something to soften into a white template.
- **Asimov wordmark font** — kept exactly as-is on "GEarheads" in the header/footer only. Never used for body or heading type.
- **Indicator Magenta is retired.** It was a UI-invented third accent, absent from the logo and the easter-egg spec. If a design genuinely needs a third signal color, that's a sign to solve it with typography or spacing instead — don't reintroduce it.

## Color system

| Token | Value | Use |
|---|---|---|
| `ink` | `#0a0a0a` | Full-bleed hero/photography backgrounds, footer |
| `surface` | `#131313` | Base page background |
| `surface-raised` | `#1a1a1a` | The *only* elevated surface step — used for the rare panel that needs to read as inset (form fields, code blocks) |
| `hairline` | `rgba(255,255,255,0.08)` | Card/section dividers — a 1px line, not a shadow, does the separating |
| `hairline-strong` | `rgba(255,255,255,0.14)` | Input borders, active card outline |
| `text-primary` | `#e5e2e1` | Headings, body |
| `text-secondary` | `#8f8f93` | Captions, metadata, secondary copy — true neutral gray, not the old cool-blue-tinted secondary |
| `accent-blue` | `#adc6ff` | Interactive only |
| `accent-green` | `#4ae183` | Outreach identity + positive/live signals only |

Cards and sections are told apart by **spacing and a hairline border**, not by background-color steps or shadow. If two adjacent elements need visual separation and a hairline isn't enough, the fix is more whitespace between them — not a new surface tone.

## Typography

Same three families as today — Geist (display/headline/title), Inter (body), JetBrains Mono (label/eyebrow) — kept because they're already a deliberate, non-generic choice, not template defaults like Inter-everywhere or Poppins. What changes:

- **Display scale goes bigger and heavier-cropped**: `clamp(2.75rem, 6vw + 1rem, 5.5rem)` at weight 600, line-height 1.05, tracking -0.03em. Hero headlines should feel oversized and confident — Apple's headline sizes (34–56px on real Apple.com breakpoints) plus the site's existing appetite for a large display step.
- **Two fewer steps.** `title-sm` and the separate `body`/`body-sm` split collapse where possible — use `body` (17px/1.65) as the default paragraph size everywhere; drop to `body-sm` (14px) only for genuinely secondary text (captions, metadata), not as a general "smaller card" size.
- **Eyebrow stays** — it's the site's most load-bearing small-text pattern (per `ai_context/design-system` history) and matches Apple's own micro-label pattern. Keep it uppercase, JetBrains Mono, ~10px, wide tracking.
- Weight 600 instead of 700 for display/headline/title — 700 reads slightly heavier/bolder than the restrained direction wants; 600 is enough weight to carry hierarchy without shouting.

## Layout

- **Container stays 1280px**, but prose-width content (long-form outreach/engineering copy) caps at a new `proseMax: 680px` — the current site sometimes runs body copy full-width in two-column layouts; cap it for readability, matching Apple's own text-column widths.
- **Macro-whitespace.** Section padding goes from 80px to **144px on desktop**, 56px on mobile. This is the single highest-leverage change for "premium" — cramped 48–80px spacing is what makes a site feel like a template; 120px+ is what makes it feel expensive. Don't fill the extra space with more content — it's supposed to be empty.
- **Bento/asymmetric grids stay**, but sparingly. The existing `$wide`/`$span-2` bento pattern (FeaturesGrid, Innovations bento) is genuinely good and not generic — keep it, but don't reach for a 3-up equal-width card grid as the default "features" layout anywhere it isn't already load-bearing. If a section doesn't have a natural asymmetry (one thing matters more than the others), a single column or a simple 2-up beats a forced bento.
- **One breakpoint stays the workhorse** (768px), consistent with today.

## Shape

Three radii, not six: `sm` (8px, inputs/tags/code blocks), `md` (14px, cards/panels/photo frames — the one size most things use), `pill` (999px, buttons and nav pills only), `circle` (avatars, icon wells). Dropping the 12/18/20/24px gradation — it added visual noise without adding meaning once shadows aren't doing the differentiating work anymore.

## Elevation

One shadow, used rarely: `0 1px 2px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.35)` — reserved for things that are genuinely floating above the page (sticky header on scroll, dropdown menus, modals, toasts). Cards, panels, and buttons at rest are **flat** — background + hairline border, nothing else. A card's hover state is a hairline-strong border and a barely-perceptible background lift (`surface` → `surface-raised`), not a shadow upgrade. This is the biggest single behavior change from the old system and it's deliberate: shadow-as-default-depth is exactly the neumorphic signature being retired.

## Imagery — explicit placeholders, not designed around absence

The site already has a `PhotoSlot`/`HeroImageWell` dashed-placeholder convention across the outreach/engineering pages (see `ai_context/outreach-pages.md`, `ai_context/engineering-pages.md`) — keep that convention, upgrade its look:

- Placeholder wells get a **flat `surface-raised` fill + a thin centered icon + one line of caption text describing the intended shot** — no dashed border (dashed borders read as "unfinished wireframe"; a solid fill with a caption reads as "reserved space," which is the actual intent).
- Every hero section gets an explicit large image well sized for a real photo (full-bleed or large 2-col), even on pages that don't have one yet — don't shrink the layout to avoid the empty space. The whitespace-first system means an empty photo well isn't visually broken; it's inert until Shivansh drops in a photo.
- When a real photo exists, it runs **full-bleed or near-full-bleed with minimal chrome** (no rounded-corner-in-a-card treatment for hero imagery) — photography-first, Apple's own pattern of letting the product/subject fill the frame with typography overlaid or adjacent, not boxed into a card.
- Never substitute a missing photo with a generic icon illustration, stock gradient, or AI-generated placeholder image. An empty, captioned well is more honest and more premium than a fake stand-in.

## Motion

Grounded in the installed `emil-design-eng`, `find-animation-opportunities`, and `apple-design` skills — consult them directly for edge cases; the summary that governs this site:

**The gate, before adding any animation:**
1. **Frequency** — if a user sees it 100+ times/day (nav clicks, repeated toggles), it gets no animation or none at all. Reserve real motion for occasional moments (page-load hero entrance, modal/drawer, form success) and rare/first-time moments (the GE Healthcare easter egg already fits this).
2. **Purpose** — must be feedback, spatial consistency, state indication, or preventing a jarring appear/disappear. "It looks cool" is not a purpose.
3. **Speed** — UI motion stays under 300ms (press feedback 100–160ms, dropdowns 150–250ms, modals/drawers 200–500ms). Only marketing/explanatory motion (a hero entrance) is allowed to run longer.
4. **Easing** — entrances/exits use a strong `ease-out` curve (`cubic-bezier(0.23, 1, 0.32, 1)`), on-screen movement uses `ease-in-out`, hover/color changes use plain `ease`. Never `ease-in` for UI — it delays exactly the moment users are watching.

**What this site keeps:** the counter-rotating ring motif (Hero, Loader) — it's slow (40–60s), mechanical, and already passes the "purpose" gate as a signature brand moment, not decoration. Scroll-reveal entrances (`FadeIn`, `BlurText`) stay, but tune them toward the Apple/emil defaults — `translateY(12–16px) + opacity` over ~500–600ms with the strong ease-out curve above, not a slow 800ms+ blur-heavy reveal on every section.

**What this site drops:** cursor-tracking glow effects on every card (`FeaturesGrid`'s `::before` mouse-glow, wherever else it was copied) — it's a "tens of times/day" frequency interaction with no purpose beyond decoration, which fails the gate outright. Keep spring/glow-style interaction only where a gesture actually drives it (a real drag, not a passive hover).

## Actively avoid — AI slop patterns

Reference `find-animation-opportunities` and `emil-design-eng` directly when in doubt; the concrete list for this site:

- **No cursor-glow-on-every-card.** Already flagged above under Motion — it's the single most common "AI SaaS template" tell.
- **No double-bezel/nested-shell card chrome, no magnetic buttons, no glassmorphism.** These are the *current* generation of AI-generated "premium" template patterns (they show up verbatim in some of the newly installed taste skills, e.g. `high-end-visual-design`) — they read as trend-chasing today the same way neumorphism did two years ago. Depth here comes from typography and whitespace, full stop.
- **No generic 3-up icon-in-a-circle feature grids.** The existing bento asymmetry (`$wide` cards) already avoids this; don't regress to uniform equal-width cards when extending to new pages.
- **No stock-photo energy.** Real photography or an honest empty well (see Imagery above) — never a generic stock image standing in for the team's actual work.
- **No AI copywriting clichés** ("elevate," "seamless," "unleash," "game-changer," "delve," "revolutionize"). The site's existing outreach copy voice (per `ai_context/outreach-pages.md` Revision 3 — conversational, specific, cut of brochure phrasing) is already the right register; new copy matches it.
- **No emoji anywhere in the UI.** Icons come from `react-icons/md` per existing convention.
- **No rainbow/multi-color gradients**, no neon glow stacking multiple colors at once. If a glow is used at all, it's one color, low opacity, tied to the one relevant accent — same rule the old system already had right.

## Component direction (maps to existing components)

- **Header/Footer** (`Header.tsx`, `Footer.tsx`): flat background (no shadow at rest), gains the single ambient shadow only once scrolled/sticky. Nav links lose any glow-on-hover; underline or color-shift only.
- **Buttons**: pill shape kept (it's a genuine brand signature, not generic) — primary is solid `accent-blue` text on flat `surface`, no shadow; active state is a subtle `scale(0.97)` + background shift, not an inset-shadow swap.
- **Cards** (`FeaturesGrid`, outreach program cards, engineering explorer panels): flat `surface` fill, `hairline` border, `md` radius. Hover = `hairline-strong` border + `surface-raised` background, optionally `translateY(-2px)`. No shadow upgrade.
- **Inputs** (`ContactSection` form): flat `surface-raised` fill, `hairline-strong` border, no inset shadow. Focus = border shifts to `accent-blue` + a 1px outer ring — clean and simple over the current inset-shadow-plus-ring stack.
- **Accordions/steppers** (DHF accordion, control-loop node walk, iteration loop — see `ai_context/engineering-pages.md`, `ai_context/software-pages.md`): keep the interaction patterns (they're genuinely good, not generic), restyle chrome to flat + hairline instead of neumorphic panels.
- **Timeline/SeasonTimeline**: keep the left-rail sticky-year layout (`ai_context/season-timeline-redesign.md`) — it's a good information-density solution, independent of the shadow system. Restyle the entry card chrome only.
- **Photo galleries and PhotoSlot placeholders**: see Imagery section above.

## Rollout order

1. **Tokens + primitives** — `theme.ts`, `GlobalStyles.ts`, `mixins.ts` (shared hover mixin loses the shadow-upgrade behavior).
2. **Header, Footer, Loader** — every page inherits these; highest leverage first.
3. **Home page** — highest-visibility flagship; validates the whole system end to end (Hero, FeaturesGrid, SponsorsSection, Timeline, FAQSection).
4. **Contact + About** — next-highest-traffic, already fully built.
5. **Engineering, Programming, Outreach** — largest surface area (12 outreach pages + 2 consolidated section pages); apply the restyle to shared patterns once (the accordion/stepper/card chrome), which cascades across all of them since they reuse the same component patterns per `ai_context/outreach-pages.md`.
6. **Tutorial pages** (`VideoCourseTutorial.tsx`, Git tutorial) — shared shell, one restyle covers 6 routes.
7. **Remaining stubs** (Robot, Seasons, Team, Impact, Sponsors, Media, Join) — apply the system when those pages get built; not part of this redesign pass since there's no existing visual design to migrate.
