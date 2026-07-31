# School Support Page

Route: `/outreach/school-support`

## Files

- `src/data/school-support.json` — all copy, stats, facets, photo slots
- `src/pages/outreach/SchoolSupportPage.tsx` — full page component

## Structure

1. Hero — chip "Access & Advocacy" / BlurText title / HeroImageWell placeholder
2. Impact callout — green left-border ImpactNote (district partnership overview)
3. Stats row — 4 StatChips: 3 Admin Partners, 2 Programs Subsidized, ~$100 Club Fee, 1 District
4. Partnership Facets accordion — DHF-style vertical accordion (4 rows, green accent, grid-template-rows 0fr→1fr collapse, first item open by default)
5. Photo strip — 3 PhotoSlot placeholders

## Accordion rows

1. How does the district partnership actually work?
2. What do FLL and FTC registration and field costs actually cover?
3. How has school support increased physical robotics space over time?
4. What is the ~$100 BCHS club fee model?

## Design decisions

- Uses `useRevealRefs` scroll-reveal (same hook pattern as DesignProcessPage) for sections 3–5, `FadeIn` for hero + impact
- No stepper — the DHF accordion is the sole featured interaction per outreach-pages.md assignment
- Stats row uses plain `StatValue` text (no CountUpChip) because two values (~$100, 1) do not parse cleanly as countable integers
- First accordion item opens by default (`useState<number | null>(0)`) so the interaction is immediately visible
- `import.meta.glob` targets `assets/photos/outreach/school-support/*` — folder does not exist yet; all three photo slots render as placeholders
- Photo slot photo-lead item left unchecked in TODO.md pending actual photos

## TypeScript

`npx tsc --noEmit` passes with zero errors.
