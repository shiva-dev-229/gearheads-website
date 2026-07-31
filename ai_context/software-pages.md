# Software / Programming Pages

Five interactive pages under the **Design → Software** nav column, built to match the
engineering-page patterns. All content is **season-agnostic** — it describes the team's general
software approach and applies to any game, not a specific season.

## Pages & interaction patterns

| Page | Route | Interaction | Data file |
|---|---|---|---|
| Programming (Overview) | `/programming` | Layer explorer — 4-tab rail + swappable panel (mirrors `EngineeringPage` phase explorer), stats row, deep-dive cards, continue nav | `programming.json` |
| Control Systems | `/programming/control` | Control-loop node walk — 6 clickable nodes + connector bars + detail panel (mirrors `TestingPage` iteration loop), plus technique cards | `control.json` |
| Autonomous & Navigation | `/programming/autonomous` | Horizontal expanding accordion — 4 pipeline stages (mirrors `ManufacturingPage` machine accordion) | `autonomous.json` |
| Software Innovations | `/programming/innovations` | Bento cards grid — wide/narrow mix with scroll-reveal | `innovations.json` |
| Auto Paths | `/robot/auto-paths` | Path browser — selectable list + detail panel with image/name/location/description/tags | `auto-paths.json` |

Each deep-dive page ends with prev/next nav cards; the overview uses the single "continue" card.

## Auto Paths — the special one

Built as a **fillable structure**, not finished content. It's a shared reference for alliance
partners: each path has a **name, starting location, description, tags, and a route-diagram image**.

- Data lives in `src/data/auto-paths.json` → `{ intro, paths: [...] }`. Currently seeded with 3
  clearly-labeled placeholder entries ("Example Path One/Two/Three") so the layout is demonstrable.
  **Replace these with real routines.**
- Images resolve via `import.meta.glob('../../assets/photos/auto-paths/*.{png,jpg,jpeg,webp,svg}')`.
  To add a diagram: drop the file into `src/assets/photos/auto-paths/` and set its bare filename in
  the path's `image` field. If `image` is empty or unresolved, a placeholder tile is shown instead.
- If `paths` is emptied entirely, the page shows a friendly empty state.

## Conventions followed

- All static copy is in `src/data/*.json`; icons resolved via `iconKey` string → `react-icons/md` maps
  in each component (JSON can't hold components). Colors via `colorKey` in `autonomous.json`.
- Reduced-scale spacing/type matches the site-wide pass (hero `clamp(28px,4.5vw,46px)`, section
  headings `clamp(20px,2.8vw,30px)`, body 14–15px, section padding `36px/48px`).
- Neumorphic shadows only; accents: primary=blue (control/software), secondary=green (labels),
  tertiary=pink (used as an accordion stage accent).

## Nav note

The Design dropdown (see `Header.tsx`) is a **2-row stacked layout** — Software row on top,
Mechanical row below. "Auto Paths" is listed in the Software row but its route is still
`/robot/auto-paths` (the only surviving page from the removed Robot section).
