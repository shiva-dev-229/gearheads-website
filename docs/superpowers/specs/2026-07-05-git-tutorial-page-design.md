# Git Tutorial Page — Design Spec
**Date:** 2026-07-05
**Route:** `/resources/git`
**File:** `src/pages/resources/GitTutorialPage.tsx`
**Data:** `src/data/git-tutorial.ts`

---

## Goal

Replace the current `<UnderConstruction />` stub with a full interactive course page teaching GitHub fundamentals in the context of FTC robotics. The page reads like a well-formatted document — no accordion, no modal overlays. A sticky sidebar lets users jump to any module; scroll-spy keeps the sidebar in sync as the user reads.

---

## Layout

### Hero (full-width, above two-column layout)
- `BlurText` for the title: **"GitHub for FTC Robotics"**
- Subtitle (FadeIn): short one-liner describing the course
- No background image, no decorative element — typography only

### Course Layout (below hero)
- **Desktop (≥768px):** Two-column flex row
  - Left: `240px` sticky sidebar, `top: 80px`
  - Right: flex-grow content area
- **Mobile (<768px):** Sidebar becomes a horizontal scrollable pill strip pinned above the content. Content is single-column below it.

---

## Sidebar

- Lists all 7 modules as clickable items
- Each item: `01` number chip (JetBrains Mono, small) + module title (Inter)
- **Active state:** `primary` (#adc6ff) text color + 2px left border in `primary`
- Clicking an item: `element.scrollIntoView({ behavior: 'smooth', block: 'start' })`
- Scroll-spy: `IntersectionObserver` on each `<section>` with `rootMargin: '-25% 0px -65% 0px'` fires when the section occupies the middle viewport band. Sidebar active index updated via direct DOM class toggle — no React state, no re-render.
- Sidebar itself uses `neoRaised` shadow, `16px` radius

---

## Content Area — Module Section Structure

Each of the 7 modules is a `<section id="module-N">` wrapped in `FadeIn direction="up"`:

```
ModuleSection
  ├── ModuleChip   — "MODULE 01" label (JetBrains Mono, secondary/green)
  ├── h2 title     — Geist, 32px, onSurface
  ├── one-line desc — Inter, onSurfaceVariant
  ├── body text    — Inter 16px, 2–3 sentences, onSurface
  ├── TerminalBlock(s) — one or more per module
  └── ScenarioCallout  — FTC scenario box (blue-tinted inset)
```

Sections separated by a subtle horizontal rule at ~10% opacity of `outlineVariant`.

---

## TerminalBlock Component

Reusable styled component (internal to the page file for now).

**Visual:**
- Background: `surfaceContainerLowest` (#0e0e0e)
- Shadow: `neoInset`
- Border-radius: 16px
- Header bar: three dot indicators (●●●) + `bash` label in `onSurfaceVariant`, `JetBrains Mono 11px`
- Copy button (top-right of header): copies `command`, `output`, and `comment` lines as plain text joined by newlines (no prompt prefix included). Shows ✓ for 1.5s then resets.

**Text coloring inside terminal:**
| Element | Color token |
|---|---|
| Prompt `gearheads@ftc:~/FtcRobotController$` | `onSurfaceVariant` |
| Command text (after `$`) | `primary` (#adc6ff) |
| Output lines | `onSurface` |
| `# comment` lines | `secondary` (#4ae183) |
| Error/warning lines | `error` (#ffb4ab) |

Font: `JetBrains Mono`, 13px, line-height 1.7

---

## ScenarioCallout Component

- Blue-tinted inset box (`neoInsetSm` shadow + 1px `primary` at 20% opacity border)
- Small label: `▶ FTC SCENARIO` (JetBrains Mono, primary, uppercase)
- Body text: Inter, `onSurface`
- Radius: 12px

---

## React Bits Usage

| Component | Where |
|---|---|
| `BlurText` | Page hero title "GitHub for FTC Robotics" |
| `FadeIn direction="up"` | Each `<section>` wrapping for scroll-reveal |
| `StaggerReveal variant="rise"` | Concept-chip rows within a module where multiple items appear together |

---

## Data File: `src/data/git-tutorial.ts`

TypeScript (not JSON) because terminal code blocks need template literals and coloring metadata.

```ts
export interface TerminalLine {
  type: 'prompt' | 'command' | 'output' | 'comment' | 'error' | 'blank'
  text: string
}

export interface TerminalBlock {
  lines: TerminalLine[]
}

export interface Module {
  id: string           // "module-1"
  number: string       // "01"
  title: string
  description: string  // one-line
  body: string[]       // 2–3 sentences, each a separate paragraph
  terminals: TerminalBlock[]
  scenario: string     // FTC scenario text
}

export const modules: Module[] = [ ... ]
```

---

## 7 Modules — Content Summary

### Module 1 — Repository Basics
**Scenario:** Setting up FtcRobotController as a team repository.
**Key commands:** `gh repo create`, `git clone`, `git remote -v`, `git status`
**Concepts:** git vs GitHub, local vs remote, `.gitignore` for Android build artifacts

### Module 2 — Branching & Collaboration
**Scenario:** Two programmers — one on drivetrain, one on autonomous — working simultaneously without blocking each other.
**Key commands:** `git checkout -b feat/drivetrain`, `git push -u origin feat/drivetrain`, `git branch -a`
**Concepts:** feature branches, branch naming conventions for FTC (`feat/`, `fix/`, `comp/`)

### Module 3 — Commits & History
**Scenario:** Writing a commit message that explains why dead-reckoning was replaced with odometry, so next year's team understands the decision.
**Key commands:** `git add -p`, `git commit -m`, `git log --oneline --graph`, `git diff HEAD~1`
**Concepts:** atomic commits, conventional commit format (`feat:`, `fix:`, `chore:`), reading git log

### Module 4 — Conflict Resolution
**Scenario:** Both developers modified `TeleopDrive.java` on different branches. Merge produces conflict markers.
**Key commands:** `git merge feat/autonomous`, (conflict markers shown), `git add TeleopDrive.java`, `git commit`
**Concepts:** conflict markers `<<<<<<<` / `=======` / `>>>>>>>`, manual resolution, abort with `git merge --abort`

### Module 5 — Pull Requests & Review
**Scenario:** A student finishes the autonomous routine but a mentor must approve before it goes into the `competition` branch.
**Key commands:** `gh pr create --base competition --title "..."`, `gh pr review`, `gh pr merge`
**Concepts:** PR description, review comments, branch protection rules, CODEOWNERS

### Module 6 — CI/CD & Automation
**Scenario:** GitHub Action that runs on every push to `main` and verifies the Android Gradle build compiles — catching Java errors before they reach the field.
**Key commands:** GitHub Actions YAML shown, `gh workflow run`, `gh run list`
**Concepts:** `.github/workflows/`, triggers (`on: push`), Gradle build step, reading Action logs

### Module 7 — Documentation
**Scenario:** Writing a README that FTC judges can skim in 90 seconds, and JavaDoc in OpMode files so next season's rookies know what `RightDrive.setMode(DcMotor.RunMode.RUN_USING_ENCODER)` actually does.
**Key commands:** README structure shown as a terminal tree, `gh repo edit --description`, git blame for tracing decisions
**Concepts:** README sections (Team, Robot, Build, Autonomous, Controls), JavaDoc `@param` / `@author`, wiki vs repo docs

---

## Accessibility

- `<section>` elements with `aria-labelledby` pointing to the `<h2>` inside
- Sidebar items are `<button>` elements with `aria-current="true"` on the active one
- Copy button has `aria-label="Copy to clipboard"`
- `prefers-reduced-motion`: FadeIn and StaggerReveal already respect this via their CSS

---

## Mobile Behavior

- Sidebar → horizontal scrollable strip of numbered pills (40px × 40px), no text labels on mobile
- Each pill is a button that scrolls to the section
- Active pill gets `primary` background
- Strip is `position: sticky; top: 0; z-index: 10`

---

## Files Changed / Created

| File | Action |
|---|---|
| `src/pages/resources/GitTutorialPage.tsx` | Replace UnderConstruction stub |
| `src/data/git-tutorial.ts` | New — all module content |

No new routes needed — `/resources/git` already exists in App.tsx.

---

## What This Is Not

- No accordion expand/collapse — all content is always visible, sidebar is pure navigation
- No external links or embedded videos
- No state persistence — scroll position is not saved between visits
- No quiz/completion tracking
