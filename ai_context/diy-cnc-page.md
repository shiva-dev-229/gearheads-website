# DIY-CNC Page — Revision 2 Notes

**Files:** `src/pages/outreach/DiyCncPage.tsx` + `src/data/diy-cnc.json`

## What was done (Revision 2)

### Bug fixed
- Removed unused `const team = TEAMS[activeTeam]` (TS6133) — the variable was declared but
  never consumed in the render. Fix: deleted the binding entirely. The accordion uses
  `TEAMS[activeTeam]` inline where needed (it actually doesn't — the accordion maps over all
  teams directly, so no local binding was required).

### New sections added to the page (8 sections total)
1. **Hero** — upgraded to `HeroLayout` 2-col (copy + `HeroImageWell`). Resolves `heroImage.src`
   from the `hapa bots` folder via `resolve()`; falls back to `HeroImagePlaceholder` with
   `MdImage` icon if no photo exists.
2. **Impact callout** — unchanged.
3. **MPCNC concept** — now uses `ConceptLayout` 2-col: prose on the left, `ConceptImageWell`
   dashed placeholder on the right (sticky on desktop). Photo caption: "MPCNC frame mid-build —
   conduit rails and printed corner blocks before the first squaring check".
4. **Why teach teams to build their own machines** — new `whyItWorks` narrative block (4 long
   paragraphs). Covers: dependency fragility, learning by building, rookie asymmetry, scalability
   vision. Data from `data.whyItWorks.body[]`.
5. **Pilot teams accordion** — preserved exactly. `ContentDesc` changed from `<p>` to `<div>`
   so multi-paragraph descriptions (split on `\n\n`) render correctly.
6. **Pilot Teams & Partners** — new `PartnersGrid` of `PartnerCard`s with dashed `LogoSlot`
   (72×72, border-radius 16px, `MdHandshake` icon). Data from `data.partners[]`.
7. **From The Field** — original 3-photo strip, now using `PhotoGallery` layout (3-col on ≥960px).
8. **Gallery** — new 6-slot closing `PhotoGallery` with specific captions from
   `data.closingGallery[]`. Uses `MdImage` icon in placeholders.

### JSON additions to `diy-cnc.json`
- `hero.heroImage` — `{ src, caption }` for the 2-col hero well.
- `concept.inlinePhoto` — `{ src, caption }` for the concept section well.
- `whyItWorks` — `{ label, heading, body[] }` — 4-paragraph narrative.
- `partners[]` — 4 entries (V1 Engineering, RedCat, C-Gull, Hapa Bots) with `id/name/note`.
- `closingGallery[]` — 6 dashed photo placeholder entries with specific captions.
- Team `description` fields for RedCat, C-Gull, NC, Hapa Bots expanded with `\n\n` paragraph
  breaks so the accordion renders them multi-paragraph.

### TS strict compliance
- `noUnusedLocals` clean: removed `MdCheckCircle` import (was imported but not used — only
  `MdCheckCircleOutline` is used in the accordion highlights).
- `_FadeUpAnchor` styled-component retained to keep `fadeUp` keyframe referenced.
- All data accessed via typed `data.*` paths — JSON shape matches what the component reads.

## Photo folder
Only `src/assets/photos/outreach/hapa bots/` exists for this page. The one real image
(`IMG_2174.JPEG`) is used as the hero image. All other slots are dashed placeholders.

## What remains
- All `PhotoSlot` captions describe the intended shot — user drops photos in when available.
- Partner logo slots are ready for team/org logos.
- `diy-cnc-lead` photo slot is the hero `HeroImageWell` — already wired.
