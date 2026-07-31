# SeasonTimeline Redesign — Left Rail Layout

July 2026. Replaced the alternating center-spine layout in `src/components/SeasonTimeline.tsx` (About page `#history` section).

## Why

The old layout put cards on alternating sides of a centered spine: each card got ~46% of the width while a decorative outline year filled the other half. Cards stacked description → photos → awards vertically, making each season very tall — impossible to see a full season at once.

## New Layout (≥1150px)

- `Entry` is a grid: `140px` rail column + `minmax(0, 1fr)` card
- Left rail: dashed vertical line at `left: 70px` of `TimelineRoot`, per-entry `RailSticky` (`position: sticky; top: 96px`) holding SpineNode + year + season name + ordinal — the year stays visible while scrolling a tall card
- Card interior `CardBody` is a two-column grid: description + photo slots (1.2fr) | awards list (1fr, `border-left` divider)
- Highlights expand panel is a 2-column grid at desktop
- Below 1150px everything stacks single-column as before (mobile unchanged)

## Removed

`YearSide` / `BigYearDisplay` (decorative outline year), alternating `$right` logic, `ExpandHint`, the spine node's horizontal connector line.

## Result

A full season (header, description, photos, 6-7 awards) fits roughly one 900px viewport instead of ~2.5.
