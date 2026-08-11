# Style reset — 2026-08-10

## What happened

A prior uncommitted session had already stripped the old styled-components/neumorphic design, but then started a *second* visual system on top of it: a dark, true-black, blue/teal CSS-modules design (tokens in `src/styles/tokens.css` + `global.css`, one `*.module.css` per component), plus four new home-page sections built for that look (`ImpactStats`, `RobotShowcase`, `GetInvolved`, `ImagePlaceholder`).

The user asked to clear all styling and restart from scratch. That second CSS-modules layer directly contradicted CLAUDE.md's own "intentionally bare-bones, no CSS" description of the current state — it had never been committed, so nothing was lost from git history, but the working tree had drifted from what the docs claimed.

## What was done

- Deleted `src/styles/tokens.css`, `src/styles/global.css`, and every `src/components/*.module.css` file.
- Removed the `import './styles/global.css'` from `main.tsx`.
- Stripped every `className={styles.xxx}` / `styles` import from the 10 components that had them (Header, HeroSection, FeaturesGrid, FAQSection, Footer, SponsorsSection, Timeline, ImpactStats, RobotShowcase, GetInvolved) — converted to plain semantic HTML with no `className` at all, matching the existing convention in `ContactSection.tsx`.
- Deleted `ImagePlaceholder.tsx` — it was unused anywhere except its own definition and existed purely as CSS-styling infrastructure (a placeholder box) for the abandoned design.
- Kept `ImpactStats`, `RobotShowcase`, and `GetInvolved` as components — their content (impact stats, engineering facts, get-involved paths) is real, not placeholder, and fits the existing site IA, so only their styling was removed, not the sections themselves. Their data is still hardcoded inline (not yet moved to `src/data/*.json`) — that's pre-existing from when they were created, not something this pass changed; worth fixing if these sections are kept when redesign starts.
- Updated `PRODUCT.md`'s "Visual system" brand-commitments bullet — it had described the dark/blue-teal system as "built out" on the home page, which is now false. Replaced with a note that no visual system exists, and that the blue/teal direction was one discarded attempt, not a locked decision — confirm with the user before assuming it still applies.
- `npm run build` passes (typecheck + Vite build) after the strip.

## Constraint for future sessions

Same as CLAUDE.md's existing rule: don't reintroduce any prior look (old neumorphic *or* the dark/blue-teal CSS-modules attempt) from memory. When restyling starts again, treat every choice — including whether blue/teal survives — as a fresh decision requiring the `/ui-ux` skill, not a restoration.
