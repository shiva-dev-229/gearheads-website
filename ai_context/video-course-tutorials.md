# Video Course Tutorials (Blocks, Java, Qualifier Prep, React & Onshape)

## What this is

Five tutorial series now share one pattern: `/resources/blocks/:slug`, `/resources/java/:slug`, `/resources/qualifier-prep/:slug`, `/resources/react/:slug`, `/resources/onshape-tutorials/:slug`. All follow the same per-module sidebar + content shell as the original Git Tutorial (`/resources/git/:slug`), but built around a recorded (or future) video lesson instead of terminal walkthroughs.

**"Onshape Basics" no longer exists** — it was a separate near-empty stub page/nav entry; removed per explicit request in favor of one consolidated "Onshape Tutorials" series. `/resources/onshape-basics` now redirects straight into lesson 1 of the tutorial rather than 404ing, in case anything still links to the old URL.

## Architecture

Unlike Git Tutorial (self-contained in `GitTutorialPage.tsx`), all five video courses share one generic component:

- `src/components/tutorial/VideoCourseTutorial.tsx` — the full page shell (sidebar, hero, chips, body/video/resources area, prev/next nav). Takes `modules`, `basePath`, brand strings, and icons as props.
- `src/pages/resources/BlocksTutorialPage.tsx` / `JavaTutorialPage.tsx` / `QualifierPrepPage.tsx` / `ReactTutorialPage.tsx` / `OnshapeTutorialsPage.tsx` — thin wrappers that just supply data.
- `src/data/tutorial-types.ts` — shared `CourseModule` / `Resource` types.
- `src/data/blocks-tutorial.ts` (9 episodes), `java-tutorial.ts` (27 lessons), `qualifier-prep.ts` (5 webinars), `react-tutorial.ts` (18 lessons), `onshape-tutorial.ts` (15 lessons) — all grouped by `section` except Blocks/Qualifier Prep, which are flat.

This was extracted as a shared component (rather than copy-pasting GitTutorialPage) because the five courses together are ~75 modules of near-identical layout — the Git page itself was intentionally left untouched to avoid regressions on working code.

Sidebar section labels are spaced via a `SidebarGroup` wrapper (`& + &` sibling margin) — an earlier version relied on `:first-child` on the label itself, which never actually fired (the label is always the first child of its own wrapper div) and silently produced no spacing between groups.

### Layout: two-column vs. solo video

Content renders one of two ways depending on `CourseModule.body.length > 0 || tip`:
- **Has body/tip** (Blocks, Java, React, Onshape): a `TwoColumnGrid` — body paragraphs + Important callout on the left, video + Resources on the right (stacks to one column below 1024px). This exists so the video isn't artificially full-width while text stays capped at 680px, wasting the right side of the page.
- **No body/tip** (Qualifier Prep): just the video (capped at `SoloVideoWrap`'s 920px) + Resources below it, no two-column split. Qualifier Prep intentionally carries no body/tip content — the videos already exist and are the primary content, so the page doesn't add prose commentary on top.

`VideoFrame` carries a `neoRaisedLg` elevation shadow plus a hover glow (border tint + soft ambient glow) — the same hover-glow pattern already used on Git Tutorial's `TerminalOuter` — so the embed reads as a deliberate, elevated media card rather than a bare bordered rectangle.

### No hover spotlight

`HeroSpotlight` (a cursor-tracking radial-gradient layer, `src/components/reactbits/HeroSpotlight.tsx`) used to wrap the content in Git/Blocks/Java. It was removed from all tutorial pages per explicit feedback — it read as an unwanted "AI slop" hover effect. It's still a valid component for other uses; just not on tutorial pages.

## Content source, draft status, and a data-integrity catch

Blocks/Java module content was transcribed from `temp/BLOCKS-LESSON-PLAN.md` / `JAVA-LESSON-PLAN.md`, which summarize **existing** course material. `temp/` is gitignored — it's working notes, not site content.

**React and Onshape are different — they're drafts, not summaries.** `REACT-LESSON-PLAN.md` and `ONSHAPE-LESSON-PLAN.md` are both explicitly marked as proposed curricula authored from scratch (no existing material to summarize), each with open questions the source docs themselves flag as unresolved:
- React: plain JS vs. TypeScript, standalone web-dev track vs. FTC-tied companion project, episode pacing. Built using the docs' own stated defaults (plain JS, standalone, Blocks/Java-style pacing).
- Onshape: vendor-neutral vs. REV/goBILDA-specific, whether 3D-printing design is in scope, whether the capstone is assigned or open-ended, episode pacing. Built vendor-neutral per the doc's stated default, referencing "your team's parts library" generically (with REV/goBILDA linked as generic resources on the hardware-import lesson, not assumed as the standard).

Both should be treated as an editable first draft, not locked content — flag this if the team reviews them and wants the open questions resolved differently.

**Qualifier Prep had a real data bug worth remembering:** `temp/QUALIFIER-PREP-LESSON-PLAN.md` paired session titles with YouTube links, but the pairing was an exact reversal (row 1's URL was actually Webinar #5, etc.), a byproduct of the source playlist displaying newest-first. Caught by checking each video ID's real title via `https://www.youtube.com/oembed?url=...&format=json` before publishing — **always verify third-party video IDs against their actual titles before wiring them into a data file; don't trust a lesson-plan doc's stated mapping at face value.**

Qualifier Prep carries no body/tip content at all (see Layout note above) — it's video + resources only, by request.

## Video embeds

`CourseModule.youtubeId` is optional. Blocks/Java/React/Onshape have it unset everywhere (videos not recorded yet) — the video block renders a neumorphic placeholder ("Video in production — check back soon"). Qualifier Prep has real IDs for all 5 sessions since those webinars are already recorded and public. Add an ID to any other course's entry once its video is recorded — the `youtube-nocookie.com` iframe embed activates automatically, no component changes needed.

## Resources

Two levels, merged in the UI:
- `courseResources` (exported from each data file) — links shown on every module of that course (FTC Docs/SDK repo/Android Studio for Blocks & Java; the webinar playlist for Qualifier Prep; react.dev/MDN for React; Onshape Learning Center/Education for Onshape).
- `CourseModule.resources` — optional per-module links, e.g. Java Lesson 25 and Onshape Lesson 13 both link back to `/resources/git/repository-basics` (both are teaching the same "parallel work without overwriting" problem Git solves, just via different mechanisms); Onshape Lesson 10 links REV Robotics/goBILDA; React Lesson 1/11/16 link Vite/React Router/Testing Library docs.
- Resource links auto-detect internal vs. external URLs (`url.startsWith('/')`) — internal links use React Router's `Link` for same-tab SPA navigation, external links open in a new tab.

## Design system note

The shared component reuses several literal px values (9px icon-well radius, 10–11px label font sizes, 2px progress-bar radius) copied verbatim from the already-shipped `GitTutorialPage.tsx` sidebar/chip chrome. These sit slightly outside the newer scale documented in `DESIGN.md` (12/14/18/20/24/50 radius steps), but changing them would break visual parity across all six tutorial pages — left as-is deliberately.
