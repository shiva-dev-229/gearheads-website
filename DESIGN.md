---
name: GEarheads Website
description: Dark neumorphic instrument-panel UI for FTC Team #16460's public site
colors:
  console-blue: "#adc6ff"
  console-blue-deep: "#0088ff"
  telemetry-green: "#4ae183"
  indicator-magenta: "#ffabef"
  chassis-black: "#131313"
  raised-panel: "#1c1b1b"
  elevated-panel: "#2a2a2a"
  panel-text: "#e5e2e1"
  secondary-readout: "#c1c6d7"
  panel-seam: "#414755"
typography:
  display:
    fontFamily: "Geist, sans-serif"
    fontSize: "clamp(2.5rem, 5vw + 1rem, 4rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Geist, sans-serif"
    fontSize: "clamp(2rem, 3vw + 1rem, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Geist, sans-serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  title-sm:
    fontFamily: "Geist, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "11px"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.1em"
  eyebrow:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "9px"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.14em"
rounded:
  input: "12px"
  sm: "14px"
  card: "18px"
  card-lg: "20px"
  section: "24px"
  pill: "50px"
  circle: "50%"
spacing:
  base: "8px"
  gutter: "24px"
  marginMobile: "20px"
  marginDesktop: "64px"
  sectionPaddingLg: "80px"
  containerMax: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.chassis-black}"
    textColor: "{colors.console-blue}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "16px 32px"
  button-primary-active:
    backgroundColor: "{colors.chassis-black}"
    textColor: "{colors.console-blue}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "16px 32px"
  button-secondary:
    backgroundColor: "{colors.chassis-black}"
    textColor: "{colors.panel-text}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "16px 32px"
  button-secondary-hover:
    backgroundColor: "{colors.chassis-black}"
    textColor: "{colors.console-blue}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "16px 32px"
  input-field:
    backgroundColor: "transparent"
    textColor: "{colors.panel-text}"
    typography: "{typography.body}"
    rounded: "{rounded.input}"
    padding: "16px"
  card-large:
    backgroundColor: "{colors.chassis-black}"
    rounded: "{rounded.section}"
    padding: "32px"
  card-medium:
    backgroundColor: "{colors.chassis-black}"
    rounded: "{rounded.card}"
    padding: "28px 24px"
---

# Design System: GEarheads Website

## Overview

**Creative North Star: "The Control Console"**

Every surface reads as a single instrument panel milled from one piece of dark material — never a set of separate colored cards. Depth comes entirely from how light falls across that one material: raised elements catch light on their upper-left edge and cast shadow to the lower-right, recessed elements do the reverse. Three signal colors — blue, green, magenta — behave like indicator lights on that panel: rare, purposeful, and legible at a glance, never decorative for their own sake. Motion is mechanical and unhurried (spinning rings run on 40–60s cycles, transitions land in 0.2–0.3s) — nothing bounces, nothing plays. The result should feel like an engineering team's own dashboard: precise, tactile, built by people who fabricate their own hardware, not a template borrowed from a generic "dark mode SaaS" aesthetic.

**Key Characteristics:**
- One base surface color everywhere; zero flat colored panels, zero border-drawn cards
- Depth exclusively via neumorphic box-shadow pairs (dark shadow + light shadow off the same base)
- Three-color signal system used sparingly, each color carrying one specific meaning
- Typography carries hierarchy and personality — no decorative fonts, no illustrated iconography beyond simple line icons
- Motion is slow, precise, and functional; never playful or bouncy

## Colors

A single near-black base runs under the entire site; the palette's job is signal color and text legibility, not surface variety.

### Primary
- **Console Blue** (`#adc6ff`): the main interactive signal — links, active nav state, primary CTA button text, accent icons, focus rings, and any section title where color emphasis is wanted.
- **Console Blue Deep** (`#0088ff`): a more saturated companion used only inside shadow/selection calculations (the primary button's tinted neumorphic shadow, the text-selection background) — never used directly as a text or icon color.

### Secondary
- **Telemetry Green** (`#4ae183`): positive/live signals — status dots, "FTC" timeline entries, secondary accents that read as active or confirmed.

### Tertiary
- **Indicator Magenta** (`#ffabef`): a rare decorative accent — used for the occasional timeline dot or code-block highlight where a third signal color is needed. Reach for this last.

### Neutral
- **Chassis Black** (`#131313`): the single base surface for the entire site — body background, every card, every panel. Sections are never differentiated by background color.
- **Raised Panel** (`#1c1b1b`): a very slightly lighter surface used for the rare component that needs to read as a distinct tray inset into the page (e.g. the Timeline's background block).
- **Elevated Panel** (`#2a2a2a`): a further step up, used sparingly for the most elevated surface state.
- **Panel Text** (`#e5e2e1`): primary text and headings on the dark base.
- **Secondary Readout** (`#c1c6d7`): secondary text, subtitles, placeholders, inactive/label text.
- **Panel Seam** (`#414755`): dividers — always used at reduced opacity (e.g. `1a` hex alpha), never as a full-strength line.

### Named Rules
**The One-Base Rule.** Every surface on the site is Chassis Black. Sections, cards, and panels never switch to a different background color to differentiate themselves — shadow depth and spacing are the only tools for that job.

**The Signal Rarity Rule.** Console Blue, Telemetry Green, and Indicator Magenta each carry exactly one meaning (interactive / live-positive / rare-decorative) and appear on a small fraction of any given screen. If a design wants a fourth color, it's using one of these three wrong, not missing a token.

## Typography

**Display Font:** Geist (fallback: sans-serif)
**Body Font:** Inter (fallback: sans-serif)
**Label/Mono Font:** JetBrains Mono (fallback: monospace)

**Character:** Geist carries all heading weight with tight negative letter-spacing for a precise, engineered feel; Inter stays neutral and highly legible for body copy; JetBrains Mono signals "control" and "label" contexts (buttons, nav, badges, form labels) the way a physical panel would use stenciled monospace text.

### Hierarchy
- **Display** (700, `clamp(2.5rem, 5vw + 1rem, 4rem)`, line-height 1.1, letter-spacing -0.04em): hero H1 only. Individual pages clamp to their own range (as low as 28px on mobile) — the token is the clamp formula, not a fixed pixel.
- **Headline** (700, `clamp(2rem, 3vw + 1rem, 2.5rem)`, line-height 1.2, letter-spacing -0.02em): section H2 titles.
- **Title** (700, 18–28px, line-height 1.3, letter-spacing -0.02em): card/panel H3 titles — 20px is the common default; scales up for feature panels, down for dense grids.
- **Title-sm** (700, 15px, line-height 1.3, letter-spacing -0.02em): compact card titles inside dense grids (delivery cards, run cards) where a full Title would overpower the layout.
- **Body** (400, 13–16px, line-height 1.6–1.85): paragraphs and descriptions; 15px is the common default, 16px for a page's primary lead paragraph, 13px for tight card copy.
- **Body-sm** (400, 12–13px, line-height 1.5–1.65): secondary/supporting text — hints, captions, italic taglines.
- **Label** (700, 10–12px, letter-spacing 0.05–0.1em, uppercase): buttons, nav links, stat labels, form labels, code.
- **Eyebrow** (700, 8–11px, letter-spacing 0.12–0.16em, uppercase, reduced opacity ~0.6–0.8): the smallest tier — section labels, chip text, badge micro-copy, stat hints. This is the site's most-used text style; treat 9px as a legitimate, deliberate size, not a typo of Label.

### Named Rules
**The Weight-Not-Decoration Rule.** Hierarchy comes from letter-spacing, weight, and case changes within these font families — never from a fourth decorative typeface or graphic flourish.
**The Eyebrow-Is-Real Rule.** The 8–11px uppercase eyebrow tier is a deliberate, heavily-reused step in the scale (it appears more than any other text size on outreach pages) — it is not a rounding error against Label and should not be normalized up to 12px.

## Layout

Single content column capped at `containerMax` (1280px), centered. Horizontal page padding is 20px on mobile (`marginMobile`), stepping up to 64px on desktop (`marginDesktop`) at the 768px breakpoint. Vertical section padding is commonly 36px on mobile, stepping up to `sectionPaddingLg` (80px) on desktop — `sectionPaddingMd` (56px) is defined in `theme.ts` but not currently consumed by any component; treat it as reserved, not as evidence of an unused pattern to remove. Grids favor an asymmetric "bento" mix of `span-2` and `span-1` cards over uniform grids (see FeaturesGrid) to avoid template-generic symmetry. There is one responsive breakpoint used consistently at 768px (mobile stacked → desktop multi-column), with 640px appearing only for button-row wrapping. Gap between grid/flex siblings is `gutter` (24px); the base spacing unit is 8px.

## Elevation & Depth

Purely neumorphic: there are no borders and no flat colored card backgrounds. Every raised or recessed surface is Chassis Black with a paired box-shadow — one dark shadow (`#080808`), one light shadow (`#1e1e1e`), both offset from the same base. Raised elements cast outward in both directions; recessed elements (inputs, icon wells) invert the same pair as an `inset` shadow. This is the entire depth vocabulary — there is no separate tonal-layering system.

### Shadow Vocabulary
- **neoRaised** (`8px 8px 16px #080808, -8px -8px 16px #1e1e1e`): cards, nav, footer at rest.
- **neoRaisedSm** (`4px 4px 8px #080808, -4px -4px 8px #1e1e1e`): small raised elements.
- **neoRaisedLg** (`12px 12px 24px #080808, -12px -12px 24px #1e1e1e`): hover state on cards (upgrade from neoRaised).
- **neoInset** (`inset 8px 8px 16px #080808, inset -8px -8px 16px #1e1e1e`): icon wells, large recessed areas.
- **neoInsetSm** (`inset 4px 4px 8px #080808, inset -4px -4px 8px #1e1e1e`): form inputs, badge backgrounds, small recesses.
- **neoButtonPrimary** (blue-tinted outward shadow, `rgba(0,136,255,…)`): primary CTA buttons at rest.
- **neoButtonPrimaryActive** (blue-tinted inward shadow): primary button press state.
- **neoButtonSecondary** / **neoButtonSecondaryActive**: neutral outward/inward equivalents for secondary/ghost buttons.
- **glowBlue / glowGreen / glowPink** (`0 0 8px rgba(…, 0.8)`): subtle single-color glow on hover for icon-only elements (social icons, live indicators, tertiary accents) — never combined into a multi-color glow.

### Named Rules
**The Shadow-Only-Depth Rule.** If a component needs to look elevated or recessed, the answer is always a shadow-pair swap on the same Chassis Black base — never a background color change, never a border.

## Shapes

Corner radius scales with a component's role, not its size class alone: `input` (12px) for form fields, `sm` (14px) for compact/dense cards, `card` (18px) for the most common card/panel/photo-frame radius (the single most-used radius on the site), `card-lg` (20px) for stat chips and larger feature cards, `section` (24px) for hero image wells and section-level containers, `pill` (50px) for every button/nav-link/badge, and `circle` (50%) for icon wells and portrait slots. There are no hard corners anywhere in the UI and no borders — all edges are either a full pill, a soft rounded rectangle, or a circle.

## Components

### Buttons
- **Shape:** full pill (`rounded.pill`, 50px), label typography (JetBrains Mono, 11px, uppercase, 0.1em tracking).
- **Primary:** Chassis Black background, Console Blue text, `neoButtonPrimary` shadow at rest; `:active` swaps to `neoButtonPrimaryActive` (raised → inset). No separate hover-color state.
- **Secondary/ghost:** Chassis Black background, Panel Text color at rest, shifts to Console Blue on `:hover`; `neoButtonSecondary` at rest, `neoButtonSecondaryActive` on `:active`.
- Padding: `16px 32px` on the hero-scale CTAs; smaller contexts (badges, chips) scale padding down while keeping the pill shape and label typography.

### Cards / Containers
- **Corner style:** `rounded.section` (24px) for large/hero-scale cards, `rounded.card` (16px) for medium cards and code blocks.
- **Background:** always Chassis Black — no exceptions.
- **Shadow strategy:** `neoRaised` at rest, upgrading to `neoRaisedLg` on hover (see FeaturesGrid card hover behavior).
- **Border:** none, ever.
- **Internal padding:** 32px (large cards), 28px/24px (medium cards).

### Inputs / Fields
- **Style:** transparent background, `neoInsetSm` shadow, `rounded.input` (12px), no border, 16px padding, body typography.
- **Focus:** adds a `0 0 0 1px {console-blue}80` ring layered on top of the existing inset shadow (never replaces the inset).
- **Placeholder:** Secondary Readout color at reduced opacity (`4d` hex alpha).
- **Labels:** JetBrains Mono, 12px, uppercase, Secondary Readout color.

### Navigation
- Sticky header, 80px height. Flat links for single destinations; grouped items open mega-menu dropdowns on hover (desktop) or an accordion drawer (mobile), closing on route change or Escape. Active/hover states shift text to Console Blue; the primary "Join the Team" nav item is styled as a pill CTA, not a plain link.

### Signature Component: Counter-Rotating Neumorphic Rings
The dual ring motif (used in the Hero's robot frame and in the full-page `Loader`) is the site's most distinctive custom widget: two concentric circles in raised neumorphic shadow, rotating in opposite directions at slow, offset durations (hero rings run 40s/60s; keep this "mechanical, not playful" pacing whenever the motif is reused elsewhere).

## Do's and Don'ts

### Do:
- **Do** keep every surface on Chassis Black (`#131313`) and express all hierarchy through shadow, not color or borders.
- **Do** use the single 768px breakpoint for mobile↔desktop layout changes; treat 640px as a minor exception reserved for button-row wrapping only.
- **Do** keep interactive transitions to 0.2s (color/shadow) and 0.3s (transform/expand-collapse) — this pacing is load-bearing for the "precise instrument, not playful app" feel.
- **Do** mix `span-2`/`span-1` card widths in grids (the bento pattern) rather than uniform equal-width grids.
- **Do** pair color with text or an icon for any meaningful state; color alone must never carry meaning (accessibility).

### Don't:
- **Don't** introduce a flat colored background for any card or section — every surface must be Chassis Black with shadow-based depth.
- **Don't** use border-drawn card outlines anywhere; depth is shadow-only.
- **Don't** use a white or light background anywhere on the site, including inside modals or overlays.
- **Don't** use `console-blue-deep` (`#0088ff`) as a direct text or icon color — it exists only for shadow tinting and the selection highlight.
- **Don't** add a fourth accent color; if Console Blue, Telemetry Green, and Indicator Magenta don't cover the need, the need is probably better solved with typography or spacing.
- **Don't** use bouncy, playful, or decorative motion (spring overshoot, elastic easing) — motion here reads as mechanical and deliberate, never delightful-for-its-own-sake.
