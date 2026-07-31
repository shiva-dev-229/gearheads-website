# Engineering Section Pages

Built July 2026. All five engineering pages went from UnderConstruction stubs to full interactive pages.

## Pages & Signature Interactions

| Route | File | Data | Signature interaction |
|---|---|---|---|
| `/engineering` | `pages/EngineeringPage.tsx` | `data/engineering.json` | Three-phase build process explorer (tablist, panel swap) |
| `/engineering/design-process` | `pages/engineering/DesignProcessPage.tsx` | `data/design-process.json` | 6-step process stepper — filling progress rail, arrow-key navigation, prev/next |
| `/engineering/cad` | `pages/engineering/CadPage.tsx` | `data/cad.json` | Subsystem explorer — vertical tab rail (Drivetrain/Intake/Spindexer/Launcher) + detail panel |
| `/engineering/manufacturing` | `pages/engineering/ManufacturingPage.tsx` | `data/manufacturing.json` | Machine shop selector — 5 machines/stations with spec panels |
| `/engineering/testing` | `pages/engineering/TestingPage.tsx` | `data/testing.json` | Iteration loop (Test→Analyze→Fix→Validate) + live flywheel KE slider (½mv², 55 g ball, design point 18.8 m/s marked) |

Reading order is chained: each page ends with a "Continue" card → next page; Testing loops back to `/engineering`.

## Shared Patterns Used

- Hero: Chip + BlurText H1 + FadeIn intro (copied from AboutPage)
- PhotoSlot placeholders (dashed border + `neoInsetSm` + label + hint) for every image/diagram — **Shivansh will fill these with real photos; do not source images**
- Scroll reveals via IntersectionObserver (SeasonTimeline pattern)
- All content in `src/data/*.json` with `iconKey`/`colorKey` string maps resolved in components

## Content Provenance (important)

All facts sourced from `ai_context/FTC_GEarheads_Complete_Archive.md` and TODO.md — nothing invented. Known caveats reported by the build agents:

- "90% custom-fabricated" is from a prior season's portfolio; 100% claimed from POWERPLAY (2022–23) onward. Pages present the range with season context.
- Third CNC mill only referenced in passing as "Bantam Tools" — pages describe the 3 mills as MPCNC / 6×6 industrial / PrintNC per the archive.
- Flywheel: archive gives ~7.5 J required and ~18.8 m/s exit; computed KE at 18.8 m/s is 9.72 J (losses account for the gap) — the slider computes pure ½mv² and labels the 7.5 J target separately.
- No named cost/benefit trade-off examples found in archive; the design-process page describes the method without invented specifics.

## Post-Review Revisions (Shivansh feedback, July 2026)

- **Design Process**: DHF section rebuilt as a full-width FAQ-style accordion (5 numbered items, visual parity with home FAQSection) — no more two-column paragraphs with dead right space. Stepper rail bug fixed (nodes now `space-between` across full width; labels wrap instead of truncating).
- **Manufacturing**: sheet metal station removed everywhere (roster, process steps, hub copy, design-process copy). Machine data corrected: MPCNC (links https://docs.v1e.com/, does acrylic + outreach demos, no carbon-fiber sheets/mounting brackets), 6"×6" mill (units in name; gears + acrylic; no delrin/brass/bearing housings/flanges), PrintNC (carbon fibre added, "aluminum" not "aluminum extrusion"), 3D printing = Bambu Lab X1C (linked) + resin printers. "From file to field" strip rebuilt as clean separated grid cards — no gradient seams/arrows (read as AI-generated). "In the shop" photo section deleted.
- **Testing**: flywheel energy explorer, DOE section, Fast-Release-vs-Sorting section, and testing-session photo slot all REMOVED (user request — do not re-add). Iteration loop kept and upgraded: connectors are colored progress bars filled up to the active stage; per-stage accent colors. FMEA table labeled "DECODE 2025–26" — examples are specific to that season's mark iterations.

## Constraints Honored

- No gear icons/motifs (MdSettings was swapped for MdTune in ManufacturingPage during review)
- Zero hardcoded hex — all from `theme.ts`
- Page roots have `width: 100%` (App Main centering quirk)
