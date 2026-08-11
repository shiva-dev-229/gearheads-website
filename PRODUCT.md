# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Judges** (FTC event/state/Worlds judging panels) — evaluate the team against award criteria (Connect, Reach, Design, Innovate, Sustain, Think, Control, Inspire) during a compressed pit-visit/interview window. Need fast access to evidence: engineering process (DHF), outreach scale and depth, technical innovation.
- **Sponsors & prospective sponsors** — companies/organizations deciding whether to fund or continue funding the team (~$12K/yr budget, ~95% donations/grants). Need proof of impact, professionalism, and return on sponsorship (visibility, community impact).
- **Prospective members & their families** (grades 6–12, Brookfield/Elmbrook area) — deciding whether to join. Need to understand culture, time commitment, subteams (Strategy & Docs, Mechanical, Software, Outreach), and the new-member pipeline.
- **Broader FIRST community** — other teams, mentors, alumni, partner organizations (e.g. Team 13201 Hazmat, rookie teams mentored via Production Hub/DIY-CNC) referencing the team's programs or history.

No single audience takes priority; the site segments by section — About/Robot/Engineering/Programming/Outreach pages serve judges and sponsors, `/join` and culture pages serve prospective members and families.

## Product Purpose

The public website for **FTC Team #16460, the GEarheads** — a student-led FIRST Tech Challenge robotics team based in Brookfield, Wisconsin (rookie year 2019, competing since). It is the team's primary showcase: a portfolio of competitive results and engineering process for judges/sponsors, a recruitment and culture piece for prospective members, and a public record of the team's outreach work. Success is judges and sponsors finding credible evidence quickly, and prospective members understanding what joining means.

## Positioning

Three things held together, none subordinate to the others, and the combination is what a neighboring FTC team could not truthfully copy:

1. **Competitive results** — 6 seasons, 39 official events since 2019; multiple Worlds appearances (2023–25); 2025 Worlds 1st CONNECT + 2nd Alliance Captain (Jemison); 2024 Worlds 2nd INSPIRE + 4th Alliance Captain (Franklin); DHF ("Design History File" / team's "Define, Hypothesize, Fabricate") engineering process with Monte Carlo simulation and FMEA.
2. **Outreach depth** — described in the codebase as "identity-defining," not auxiliary: Children's Wisconsin hospital program (140+ children, 21 sessions over 4 seasons), Milwaukee VA veterans program, computer refurbishment (156 laptops all-time, recipients on 3 continents), Rookie Qualifier event (26 teams, 80+ volunteers), Production Hub (fabrication support for other FTC teams), FIRST legislative advocacy (WI DPI Robotics League Bill, $500K secured).
3. **Sustainability / student-mentorship culture** — student-led model, 2-week sprint structure, student-mentor pipeline, and an explicit 2025–26 leadership transition as founding members graduate.

## Operating Context

- Season structure: 8-month FTC season (typically September–April) organized into 2-week sprints, one new game per year (current: DECODE, 2025–26; history includes CENTERSTAGE, Into the Deep, POWER PLAY, Freight Frenzy, Ultimate Goal, Skystone).
- Subteams: Strategy & Docs, Mechanical, Software, Outreach.
- Tools referenced in team culture: Slack, Google Workspace, Onshape (CAD, Chromebook-friendly, real-time collaboration), Microsoft Office.
- Fabrication: 3 in-house CNC mills (custom MPCNC, 6×6 industrial mill, large PrintNC), 3D printing, sheet metal — ~90–99% of the robot is custom-fabricated.
- Software/hardware stack referenced in content: Java, Git, Gradle, Android, UML; Pedro Pathing, optical odometry, Limelight/AprilTags, HuskyLens, OpenCV; custom PIDF control, field-oriented drive, active-vision goal tracking.
- Judging cadence: pit visits and interviews at qualifiers, state championship, and (when qualified) Worlds — judges review the site alongside in-person materials (engineering portfolio, pit posters).

## Capabilities and Constraints

- **Confirmed stack:** React 18 + TypeScript + Vite, react-icons (`md` set), react-router-dom v7. No styling library is chosen — the site was deliberately stripped of styled-components, GSAP, and Motion (and all associated theme/animation code) to clear the way for a from-scratch visual rebuild; the next styling approach is an open decision. See `CLAUDE.md` for enforced conventions (static content in `src/data/*.json`).
- **Deployment:** currently `ftcgearheads.netlify.app`; deployment target migration is an open decision (TODO.md §1).
- **Build status (as of this writing):** All page routes render their real content (copy, data, links, forms, nav) as plain unstyled semantic HTML — content/IA work from prior sessions is intact. No page has a finished visual design right now; the previous neumorphic dark UI was intentionally removed rather than iterated on. See `TODO.md` for the authoritative per-page content checklist (note: some checklist items describe removed visual/animation details and are stale on styling, current on content).
- **Explicitly undecided / open data conflicts** (do not silently resolve — flag to the user): computers-this-season is recorded as both 54 and 56 in source materials; computers-all-time as both 150 and 156; new-member count as "9 new members" vs. 6 new + 2 student mentors; Worlds appearance years conflict between portfolio text ("2022 & 2024") and posters (2024 & 2025); Maker Faire year-invited-back as both 4th and 5th; Children's Hospital cumulative sessions as both 14 and 21; advocacy-day streak as both 2 and 3 years. Full list in `TODO.md` §10.
- **Missing/uncollected evidence:** formal sponsor tiers and benefits, downloadable sponsorship packet, tax-status/donation instructions, curated high-res photo library for `/media`, full team roster and member bios, confirmed public contact email (currently `ftcgearheads@gmail.com` pending confirmation), hospital/VA photo-publication permissions.
- **Accessibility:** no formal standard was specified as a product requirement in source docs, but the team's own pre-deploy checklist (`TODO.md` §11) targets WCAG AA contrast and full keyboard-navigation audit — treat as the working bar.

## Brand Commitments

- Name: **GEarheads**, Team #16460, Brookfield, Wisconsin.
- Voice: identity built around student-led ownership of both engineering and outreach; outreach described in-repo as "not optional — it's who we are."
- Visual system: **none currently — cleared again, by explicit user request, on 2026-08-10.** A CSS-modules-based dark/blue-teal direction had been built out on the home page (true-black ground, blue = competitive thread, teal = outreach thread, Archivo/Inter/JetBrains Mono, Apple-scale whitespace, Notion-style cards) before the user asked to strip it and restart from scratch; all of that CSS and the tokens file were deleted, components reverted to plain unstyled semantic HTML. Do not treat the blue/teal direction as a settled decision going forward — it was one attempt, now discarded, not a locked brand system. If useful as a data point: the user had previously pinned a dark theme with blue/teal team-color accents and an "Apple.com meets Notion.so" reference, and explicitly rejected a "structural diagram" motif and any light theme — but confirm appetite for that direction again before assuming it still holds after this reset.
- Contact: ftcgearheads@gmail.com (pending confirmation), 16900 Gebhardt Rd, Brookfield WI, +1 (262) 408-9209. Social: Instagram @ftcgearheads16460, YouTube @ftcgearheads.
- GE Healthcare origin: the team's DHF (Design History File) engineering framework and GE Elfuns retiree-mentorship partnership both trace to a GE Healthcare connection; exact origin story (FAQ #9 on the home page) is flagged in-repo as unconfirmed with the team.

## Evidence on Hand

- `TODO.md` — authoritative, actively maintained per-page content checklist with `[x]`/`[ ]` status; treat as the current source of truth for what's built vs. outstanding.
- `ai_context/FTC_GEarheads_Complete_Archive.md` (8,273 lines) — verbatim extracted text from the team's real judging materials: engineering portfolios, award summaries, pit posters, judging presentations, new-member process docs, spanning 2022-23 through 2025-26 seasons. Primary source for real stats, award history, and program descriptions — consult before inventing any number or claim.
- `ai_context/GEarheads_Website_Architecture_Blueprint.md` — site architecture reference.
- Official FIRST events record (reconstructed in the archive from ftc-events.firstinspires.org/team/16460): full award/event history 2019–2025.
- `src/data/*.json` — structured content already extracted for built pages (outreach programs, team, sponsors, timeline, etc.).
- Photography: partial — see `TODO.md` §10 for the specific gallery/lead-photo slots still needing team-sourced images (many outreach pages already have photos; some, e.g. hospital/VA, require explicit publication permission).

## Product Principles

1. **Outreach is not a footnote.** It gets the same structural weight as competitive/engineering content, per the team's own stated identity — never downgrade it to a sidebar or single page.
2. **Numbers must trace to source.** Where the archive or TODO.md flags a data conflict, do not silently pick one; carry it forward as an open question rather than inventing a resolution.
3. **Judges and sponsors read fast.** Content for About/Robot/Engineering/Programming/Outreach should front-load evidence (results, scale, process) since judging-panel time is compressed.
4. **The site is a recruitment tool, not just a trophy case.** `/join` and culture-facing pages need to make the student-mentor pipeline and time commitment legible to a prospective member's family.
5. **Respect the student-led voice.** This is built and owned by students; content and tone should read as the team's own account, not a generic corporate robotics-team template.

## Accessibility & Inclusion

No formal external standard was mandated, but the team's own pre-deploy plan targets WCAG AA color contrast and full keyboard-navigation support (`TODO.md` §11) — treat this as the working accessibility bar for all new UI work.
