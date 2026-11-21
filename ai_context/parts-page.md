# Parts Page (`/resources/parts`) — Build Notes

Full interactive part gallery replacing the `UnderConstruction` stub. Route and nav entries
already existed before this build (desktop mega-menu + mobile menu both had "Parts" wired to
`/resources/parts`) — only `src/pages/resources/PartsPage.tsx` and its supporting files are new.

## What it does

- Responsive card grid, each tile a live Three.js STL preview (`PartViewer3D`), auto-scaled and
  centered, with search + category-pill filtering above it.
- Clicking a card opens `PartModal`: larger orbitable viewer, description, material/print notes,
  and three actions — Download (Drive link), Email us (mailto), Fabricate with Production Hub
  (internal link).
- A "Code" section below renders FTC-SDK Java snippets (`CodeSnippetBlock`) with copy-to-clipboard,
  collapse/expand, and per-file `.java` download.

## Files

```
src/data/parts.ts            — TEAM_EMAIL / PRODUCTION_HUB_URL / DEFAULT_DRIVE_FOLDER_URL
                                constants at top, then PARTS[]
src/data/code-snippets.ts    — CODE_SNIPPETS[], 3 seeded example Java files (marked isExample)
src/assets/parts/*.stl       — one STL per part, filename referenced by Part.stlFile
src/components/parts/
  PartViewer3D.tsx            — shared STL viewer (tile + modal, via `interactive` prop)
  stlWorker.ts                — parses STL + computes normals/centering/scale off-thread
  javaHighlight.ts            — ~50-line regex tokenizer (no Prism/highlight.js dependency)
  PartCard.tsx, PartModal.tsx, CodeSnippetBlock.tsx
```

To add a part: drop an STL into `src/assets/parts/`, add one entry to `PARTS` in `src/data/parts.ts`.
To add a snippet: add one entry to `CODE_SNIPPETS` in `src/data/code-snippets.ts`, optionally
reference its `id` from a part's `codeSnippetIds`.

## Decisions worth knowing before touching this page

- **No shared Modal component existed.** `TeamModal`/`ToolModal`/`FolderModal` are bespoke and
  still on the pre-flatten neumorphic style. `PartModal` is a new build on the current DESIGN.md
  flat/hairline system (flat `surface` fill, hairline borders, `ambient` shadow, `md` radius) —
  do not copy the old modals' shadow/radius values into new work.
- **Production Hub "form" is not a Google Form.** It's an on-page mailto-builder at
  `/outreach/production-hub#form` (`ProductionHubPage.tsx`) that doesn't read URL query params.
  Parts links there plainly rather than adding query-param handling to an unrelated page.
- **No highlight.js/Prism/JSZip added**, matching this repo's minimal-dependency convention.
  `javaHighlight.ts` is a small custom tokenizer; "Download all code" fires sequential `.java`
  blob downloads instead of zipping.
- **3D viewer is render-on-demand, not a continuous animation loop.** First version auto-rotated
  every visible tile every frame via `requestAnimationFrame`, which was laggy with several heavy
  meshes on screen — changed so each viewer renders once (on load/resize) and only re-renders
  while actually being interacted with: tiles spin only while hovered (rAF loop starts on
  `pointerenter`, cancels on `pointerleave`), the modal's `OrbitControls` has damping/autoRotate
  off and renders on its `change` event during drag. Don't reintroduce idle auto-rotation here.
- **WebGL context cleanup:** `renderer.dispose()` alone does not release the GPU context — call
  `renderer.forceContextLoss()` too, or scrolling many tiles in/out trips the browser's live-context
  cap ("Too many active WebGL contexts" warning, then `WebGLRenderer` constructor throwing on the
  next tile). `PartViewer3D` also wraps `new THREE.WebGLRenderer(...)` in try/catch → `'error'`
  status, since context creation can legitimately fail under this pressure and previously crashed
  the whole page (surfaced by React's error boundary) instead of showing the existing error state.
- **STL parsing runs in a Web Worker (`stlWorker.ts`), not the main thread.** The first version
  called `STLLoader.load()` directly in `PartViewer3D`, which parses, calls
  `computeVertexNormals()`, and does `translate()`/`scale()` — all synchronous full-buffer passes.
  For the multi-hundred-megabyte assembly STLs here that froze the tab while a tile loaded. The
  worker now does all of that (plus skipping `computeVertexNormals()` entirely when the STL's own
  facet normals are already valid — binary STL carries one per facet, so recomputing is usually
  redundant work) and transfers back ready-to-use `position`/`normal` `Float32Array`s as
  transferable objects (zero-copy). `PartViewer3D` just builds a `BufferGeometry` from them and
  renders. The project's `tsconfig.json` has no `"webworker"` lib (it'd conflict with the app's
  `"DOM"` lib in the same program), so `stlWorker.ts` narrows `self` to a small local interface
  instead of relying on webworker globals — keep that pattern for any future worker file here.
- **Real STL files are large and mostly full-assembly exports, not simplified single parts:**
  `dt.stl` 145MB, `claw.stl` 81MB, `hub_prot.stl` 36MB, `mizumi-slide-assembly.stl`
  18MB (battery holders are a reasonable 3.6–5.2MB each). Shivansh explicitly chose to ship them
  as-is rather than stub/wait/LFS — this means `dist/` is ~314MB for this one page. If that becomes
  a real problem later, the fix is re-exporting coarser-tessellation STLs from CAD, not code.
- **Part names/categories/descriptions for `dt`, `claw`, and `mizumi-slide-assembly` are
  best-effort reads of ambiguous filenames**, flagged with inline `TODO(Shivansh)` in
  `src/data/parts.ts` — confirm the real name/function before treating that copy as final.
  `materials`/`printNotes` are TODO placeholders for all 8 real parts (no real spec was available
  anywhere in the repo) — don't invent plausible-sounding values there without checking with him.

## Update 2026-10-10 — single curated listing (Misumi Slides)

- All 8 placeholder listings removed. `PARTS` now holds one entry built from
  `src/assets/parts/final/mizumi slides/info.json` (owner, name, description, materials[], print notes)
  via `fromSubmission()` in `src/data/parts.ts`. New parts = new folder under `assets/parts/final/<folder>/`
  with `mizumi.json` + `.stl` + `.png`.
- Cards show the static PNG (`imageFile`); only the modal loads the STL (`PartViewer3D`). The page glob
  is now `assets/parts/final/*/*.{stl,png}`, so the old root-level STLs (dt, claw, etc.) are no longer
  bundled — they're still on disk, untracked.
- Modal shows "Designed by <owner>" and a materials list. Category type is now just `'Linear Slides'`.
- `mizumi.json` text from the submission form is truncated at ~24 chars (e.g. "Linear slide c",
  "6x 3D Printed Pully Brac") and is rendered verbatim — fix the JSON, not the code.

## Update 2026-10-10 (b) — per-part code tab

- Bottom-of-page "Code" section and `src/data/code-snippets.ts` removed; `codeSnippetIds` is gone.
- Code now lives in each part's JSON: `code: [{ file_type, name, code }]` (see
  `final/mizumi slides/mizumi.json`). Entries with empty `name`/`code` are filtered out; a part with no
  code hides the tab bar entirely.
- `PartModal` has Details | `</>` Code tabs. Code tab shows a `<select>` file picker only when there is
  more than one file. Highlighting reuses `javaHighlight.ts` for every language.
- Modal grid uses `minmax(0, 1fr)` columns + `min-width: 0` on the info pane — without it, long code
  lines widen the info column and squash the 3D viewer.
- Mizumi's code is SAMPLE placeholder Java (3 files) for demo — replace with the real code.

## Update 2026-10-12 — Hub Protection Plates

- Second curated listing, built from `final/hub protection plates/hub_prot.json` + `hub_prot.stl` + `hub_prot.png`
  (the STL was renamed from `hub-protection-plates.stl`; `stlFile` must match `hub_prot.stl`).
- New category `'Protection'` added to `PartCategory` / `CATEGORIES`.
- Its fab notes are a numbered multi-line string, so `MetaValue` in `PartModal` now has
  `white-space: pre-line`. Part is cut from polycarbonate rather than printed; the modal label
  "Print / fab notes" still fits. `code` is empty, so the Code tab is hidden.
- `hub_prot.stl` is ~37MB and only loads when the modal opens.

## Update 2026-11-05 — Battery Holders (multi-variant part)

- Third listing from `final/battery holders/battery.json`. One card, 4 variants (slim/wide × vertical/horizontal),
  each with its own `.stl` + `.jpg`. New optional `Part.variants[]` (`{id,label,stlFile,imageFile}`); top-level
  `stlFile`/`imageFile` = first variant (card preview). New category `'Battery Holders'`.
- `PartModal` now takes `resolveFile(filename)` instead of `stlUrl`, and shows a radio-pill variant picker
  (only when `variants.length > 1`) that swaps the 3D viewer's STL. Page glob now includes `.jpg`.
- Renamed typo'd `wide-battery-holder-vetrical.jpg` → `...-vertical.jpg`.
- TODO(Shivansh): JSON says 2 holders are GoBilda and 2 are REV, but doesn't say which of slim/wide is which.
  Labels use Slim/Wide until confirmed. Card image is `battery.png`, a white-backdrop 16:9 render of the
  wide-vertical STL (the supplied dark `.jpg` screenshots clashed with the white CAD tiles and are now unused;
  `PartVariant` no longer has `imageFile`).
- Gotcha: `PartViewer3D` calls `renderer.forceContextLoss()` on cleanup, which kills the canvas's GL context for good.
  Changing `stlUrl` re-ran the effect on the same `<canvas>` → "Preview failed to load". `PartModal` therefore passes
  `key={stlUrl}` so each variant gets a fresh canvas. Any future prop-driven STL swap needs the same key.
- Viewer camera: default is now a three-quarter view at (-3.6, 2.4, 3.4) instead of face-on (0,0,5), and `resize()`
  sets the camera distance from the pane's aspect ratio so tall/narrow panes don't clip long parts. Applies to every
  interactive viewer.
