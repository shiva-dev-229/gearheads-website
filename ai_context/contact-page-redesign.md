# Contact Page Redesign

## What changed

`ContactSection.tsx` (rendered at `/contact`) went from a thin header + info card + form to:

1. **Pathways row** — 3 bento cards (`FeaturesGrid`-style: mixed spans, mouse-follow glow, `FadeIn` scroll reveal): Production Hub and Request/Donate a Computer link out via `react-router` `Link` to their existing outreach pages; Become a Sponsor is an in-page anchor (`#sponsorship`) since `/sponsors` is still a stub.
2. **Sponsorship section** (`id="sponsorship"`) — short pitch + benefits list, factual copy sourced from `PRODUCT.md` (~$12K budget, ~95% sponsor/grant-funded) and the existing outreach JSON stats. Its CTA button sets the form's reason and scrolls to it.
3. **"Reason for Contact" select** added to the existing form (General / Sponsorship / Production Hub / Computer Program) — synced with the pathway cards via a `reason` state + `formRef.scrollIntoView`.

All new copy/content lives in `src/data/contact.json` per the static-data convention; icon components resolved via `iconKey` maps in the component.

## Why this shape

User wanted the Contact page to surface 3 specific asks (Production Hub, computer request/donate, sponsorship) without duplicating the full outreach pages. CTA cards + a smart form reason-selector was chosen over pure form-only routing or full dedicated mini-sections per user's explicit choice — keeps the page scannable while still letting a general inquiry get tagged correctly.

## Known gap

Visual QA in a live browser was not completed this session — the shared Playwright Chrome profile (`mcp-chrome-1a99df8`) was locked by another process/session. TypeScript compiles clean (`tsc --noEmit`) and the dev server serves `/contact` with a 200, but desktop/mobile screenshots have not been captured. Recommend a manual check at `localhost:5173/contact` before shipping.
