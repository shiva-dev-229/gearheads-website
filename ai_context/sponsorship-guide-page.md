# Sponsorship Guide Page

## What changed

`/resources/sponsorship` used to be a 6th consumer of the shared `VideoCourseTutorial` component (sidebar + per-module routes at `/resources/sponsorship/:slug`, video-in-production placeholders) — see `video-course-tutorials.md`, which only documents the other 5 courses. Per explicit request, it's now a standalone single-page article (`SponsorshipGuidePage.tsx`, no longer imports `VideoCourseTutorial`), because this guide's content is written prose, not a video series, and the sidebar/video chrome no longer fit it.

The other 5 tutorial pages (Blocks, Java, Qualifier Prep, React, Onshape) are untouched and still use `VideoCourseTutorial`.

## Routing

`/resources/sponsorship` now renders the page directly (no redirect-to-first-lesson). `/resources/sponsorship/:slug` redirects to the base path, in case anything still links to an old module URL — same pattern already used for the retired `/resources/onshape-basics`.

## Content structure

- `src/data/sponsorship-guide.ts` exports `sections` (the 5 original guide topics: Why Sponsors Say Yes, Building Your List, Getting Your Pitch Ready, Writing the Email, Following Up — without the `slug`/`concepts`/`youtubeId` fields `CourseModule` required), `courseResources` (unchanged), and a new `emailTemplate` export.
- **First pass wrapped each section in its own `neoRaised` card with alternating blue/green accent borders — cut after explicit feedback that it "looked too AI" and had way too much text.** Body copy was cut roughly in half per section (each section is now 1 short paragraph, not 2-3), and the layout was flattened to a single editorial column: no per-section card/shadow/accent-color theatrics, just a number + heading + prose + `TipCallout`, separated by hairline dividers (`border-top`). Tip callouts are a single consistent secondary-green style now, not accent-parameterized per section — matches `GitTutorialPage`'s tip box exactly rather than inventing a variant.
- Also cut in that pass: a placeholder-legend chip row above the email template that duplicated info already visible inline (the highlighted `[BRACKET]` tokens in the email body itself) — redundant labeling is exactly the kind of over-explanation that reads as AI-generated. Don't re-add a legend; the inline highlighting is the whole affordance.

## Email template

The new "Copy-Paste Sponsorship Email" section is a fully-written boilerplate email with exactly 4 bracketed blanks a student fills in per sponsor: `[COMPANY NAME]`, `[WHAT YOU NEED]`, `[WHAT THEY DO IN THE COMMUNITY]` (the personalization hook — why this specific business, not a form letter), and `[WHAT YOU PROVIDE]` (what the sponsor gets back). `[YOUR NAME]` and `[CONTACT NAME]` are also left as blanks but aren't called out in the legend since they're self-explanatory.

Styling reuses `GitTutorialPage`'s terminal-block chrome (dark header bar, monospace label, hover glow, `navigator.clipboard.writeText` + "COPIED" button state) but adapted to read as an email client (Subject row, prose paragraphs in body font rather than code font) rather than a shell. Placeholders are highlighted inline via a regex split (`PLACEHOLDER_RE = /(\[[A-Z ]+\])/g`) rather than stored as separate template slots, so the template stays one editable block of prose in the data file.

Structure and content approach (a static copy-paste template, not an interactive form with input fields) were modeled after `https://ftcwires.vercel.app/sponsorship`'s sample-email section, per explicit request.
