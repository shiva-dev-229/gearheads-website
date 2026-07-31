# Page Consolidation — Software & Engineering as Single Scrolling Pages

_Built 2026-07-06. Reflects the final state after a same-day revision pass._

## What changed

The Software (`/programming`) and Engineering (`/engineering`) sections were each collapsed
from an overview page + a chain of sub-pages (with prev/next "bottom nav" cards) into **one
long scrolling page**. Navigation between sub-sections is now handled entirely by the top
navbar (anchor links) — there is no in-page jump nav and no per-section intro header.

**Auto Paths (`/robot/auto-paths`) intentionally stays a separate standalone page.**

## Architecture: section components, not inlined pages

Each former sub-page was converted **in place** into a self-contained **section component**
(same file path, default export renamed) rather than inlining all its markup into the overview.
This avoids styled-component name collisions and keeps diffs small.

Each section component:
- Renders a `<div id="<slug>">` wrapper — the anchor scroll target — instead of `PageRoot`/`PageWrapper`.
- Starts **directly with its content** (no hero, no chip/title/subtitle intro block).
- Has no bottom prev/next nav card.
- Keeps all interior sections, data (`src/data/*.json`), hooks, and keyframes.

| Slug (`id=`) | File | Export |
|---|---|---|
| `control` | `src/pages/programming/ControlPage.tsx` | `ControlSection` |
| `autonomous` | `src/pages/programming/AutonomousPage.tsx` | `AutonomousSection` |
| `innovations` | `src/pages/programming/InnovationsPage.tsx` | `InnovationsSection` |
| `design-process` | `src/pages/engineering/DesignProcessPage.tsx` | `DesignProcessSection` |
| `cad` | `src/pages/engineering/CadPage.tsx` | `CadSection` |
| `manufacturing` | `src/pages/engineering/ManufacturingPage.tsx` | `ManufacturingSection` |
| `testing` | `src/pages/engineering/TestingPage.tsx` | `TestingSection` |

> Filenames still say `...Page.tsx` though they export sections — kept to minimize churn.

The overview pages (`ProgrammingPage.tsx`, `EngineeringPage.tsx`) import these and render them
at the bottom, separated by the existing `Divider`, after the hero + explorer + stats. The
overviews **no longer** render a subpage-card jump-nav grid, and `EngineeringPage` no longer
renders the `ENGINEERING-SHOP` photo placeholder (both removed per user request).

> There is no longer a shared `SectionHeader` component — it was created for the compact
> section headers and then deleted when those headers were removed. (Note: several unrelated
> components define their own module-local `SectionHeader` styled-component — that's a different thing.)

## Anchor scrolling

Relies on the existing `src/components/ScrollToTop.tsx`, which reacts to `location.hash`
changes with a retry loop and a **96px** header offset. All navbar links therefore use
react-router `<Link to="/programming#control">` (NOT `<a href="#...">`), so the offset +
smooth scroll + async-DOM retry apply — including cold navigations from a redirect.

## Routing (`src/App.tsx`)

The seven sub-page routes were removed (and their `React.lazy` imports deleted). Old URLs now
`<Navigate replace>` to anchors: `/programming/control` → `/programming#control`,
`/engineering/cad` → `/engineering#cad`, etc. Legacy `/engineering/cad-mechanical` → `/engineering#cad`.

## Navbar (`src/components/Header.tsx`)

Software and Mechanical groups (desktop `navItems` + `mobileNavItems`) point at the anchors;
"Overview" links stay `/programming` / `/engineering`; "Auto Paths" stays `/robot/auto-paths`.
In the Software group the order is: Overview, Control Systems, Autonomous & Navigation,
**Software Innovations, Auto Paths** (Auto Paths intentionally last).

## Stepper / node-loop components (control loop, iteration loop, season workflow)

Three interactive node-loop UIs share the same visual language (a horizontal `NodesRow` of
`NodeCircle`s connected by `ConnectorBar`s, click-any-node, with a `DetailPanel` below):
- Control Loop — `ControlPage.tsx`
- Iteration Loop — `TestingPage.tsx`
- Season Workflow — `DesignProcessPage.tsx` — **restyled** from its old progress-rail +
  prev/next + rich-panel design to match the iteration-loop node style (per-step colored glow
  from `colorKey`, per-segment connectors, simple detail panel, no prev/next).

Two gotchas that were fixed and must be preserved:
1. **Glow clip-off.** `NodesRow` uses `overflow-x: auto`, which coerces `overflow-y` to clip.
   The active node's glow ring (`0 0 0 2px` ring + `0 0 8px` glow) needs ~18px of vertical
   bleed, so the row **must** carry vertical padding (`padding: 18px …`) or the glow is clipped
   at the top. Do not set top padding back to 0.
2. **Connector fill glow.** The `ConnectorBar::after` fill animates via a `width` transition
   (0%↔100%), NOT `transform: scaleX`. `scaleX` distorts the fill's `box-shadow` glow during
   the transition — keep it as a `width` animation.

## AutoPaths detail panel (unchanged from initial merge)

`DetailPanel` has no `overflow: hidden` (its `border-radius` + `neoRaised` shadow were fighting
the clip); corner clipping lives on the inner `ImageArea` (`border-radius: 16px`). Path switching
uses a subtle `panelEnter` opacity/translate keyframe (with `prefers-reduced-motion` guard)
instead of an abrupt `key`-remount snap.

## Constraints preserved

Theme tokens only; static content stays in `src/data/*.json`; strict TS build
(`noUnusedLocals`) stays green; production build succeeds.
