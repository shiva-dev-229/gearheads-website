# About Page — Hero Card (merged Hero + Mission)

## What

The About hero is a single large neumorphic card (`HeroCard`, 28px radius, `neoRaisedLg`,
min-height ~88vh) inset from the viewport edges, replacing the earlier full-bleed hero AND the
standalone "Mission & Values" section — both were merged in the 2026-07-04 redesign (reference:
photo-card hero layouts; translated into dark neumorphism, no light surfaces).

Layer stack inside the card:

| Layer (z) | Element | Role |
|---|---|---|
| 0 | `CardPhotoBg` | Photo slot `about-hero-bg` (no real photo yet — renders #0d0d0d fill with a subtle hint; **needs a landscape full-team/competition shot before launch**). No dashed border — user rejected visible borders. |
| 1 | `CardOverlay` | `linear-gradient(160deg, rgba(13,13,13,.82), rgba(13,13,13,.65) 55%, rgba(13,13,13,.88))` |
| 2 | `CardSpotlightLayer` | Mouse-tracking radial glow (HeroSpotlight's rAF-lerp logic inlined, wired to the card ref) |
| 3 | `CardContent` | Chip → `HoverTitle` headline → condensed mission subtitle (2 lines) → 4 `CountUpChip`s → pillar chips + value pills row |

`FloatingMiniCard` ("3× World Championships") overlaps the card's bottom-right edge at
`bottom: -20px` on desktop (parent section has ≥40px bottom padding to absorb it); static
below content at ≤768px. Decorative only — no click action, no cursor pointer.

## Mission merge — icon-first, click-to-reveal

- Mission statement condensed to one 2-line subtitle; the old `MissionQuote`, section heading,
  `PillarCard` grid, and standalone `PrinciplesList` are gone (~78% less at-rest text).
- 4 pillars → `ExpandingPillarChip` (`src/components/reactbits/ExpandingPillarChip.tsx`):
  real `<button>` with `aria-expanded`, collapsed ~40px pill (icon well + mono title), expands
  in place on click (height-only, max-height + opacity, 300ms ease-out), one open at a time.
  Expanded content = description + 1–2 related operating principles (dot-prefixed lines).
- Pillar→principle mapping lives in `src/public/about.json` (each pillar has a `principles`
  array; the top-level principles array was removed).
- 5 `ValueTag` pills follow the pillar chips in the same wrap row.

## Interactive components still in use

| Component | Interaction |
|---|---|
| `HoverTitle` | Per-letter blur-in entrance; hovered letter springs up −10px, neighbors −5px |
| `CountUpChip` | Counts up on viewport entry; chip hover via shared `chipHover` mixin |
| `StaggerReveal` | Scroll-reveal wrapper (`rise`/`pop`/`slide` variants, per-child stagger) — used across Mission content and Team Culture points |

`TiltCard` and `HeroSpotlight` are no longer used on this page (files kept; spotlight logic
was inlined into the card). `GearParallax` was deleted entirely.

> **Do not reintroduce gear imagery as decoration anywhere** — Shivansh: "looks corny and ai."

## Constraints discovered

- **Border seam bug (fixed):** transparent wrappers over the page background + a fixed-width
  clipped radial gradient produced a visible vertical seam at some viewport widths. Rule: any
  wrapper that could read as a surface gets explicit `background: ${theme.colors.background}`;
  full-bleed gradients must never clip to a hard edge (size in vw, no centered fixed widths).
- **motion + CSS transform conflict** (still applies to HoverTitle): motion writes an inline
  `transform` after entrance; use nested spans — outer owns entrance, inner owns hover.
- All animation guarded by `prefers-reduced-motion: no-preference`; reduced mode renders
  final state (shadow-only feedback allowed).
- Site-wide chip hover standard lives in `src/styles/mixins.ts` (`chipHover`/`chipHoverSubtle`):
  hover translateY(-2px) + one shadow tier up + icon wiggle; active inset; 200ms ease-out.
