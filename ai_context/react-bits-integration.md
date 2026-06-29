# React Bits Integration

## What Was Done

Added polish animations using hand-ported React Bits components. No GSAP, no WebGL — only `motion` (framer-motion v11+) was added as a new dependency.

GooeyNav was tried and then reverted — the trigger-based nav is back. See "GooeyNav Attempt" below.

## Current Files

```
src/components/reactbits/
  BlurText.tsx    — Word/character blur-in using motion/react + IntersectionObserver
  FadeIn.tsx      — IntersectionObserver fade+slide-up; zero deps, styled-components wrapper
  LogoLoop.tsx    — Infinite sponsor logo marquee; CSS keyframe scroll; pause-on-hover via CSS
  LogoLoop.css    — CSS for the marquee animation + mask-image edge fade

components.json   — shadcn registry config pointing @react-bits to reactbits.dev/r/{name}.json
```

## Components Modified

| File | What changed |
|---|---|
| `Header.tsx` | Trigger nav restored (TriggerNavLinkFlat, TriggerNavLinkDropdown, TriggerButton, triggerBase); DesktopNav is `styled.nav` |
| `Loader.tsx` | 3rd ring (pink), center gear icon, optional `showText` prop (BlurText "GEARHEADS") |
| `HeroSection.tsx` | Headline uses `BlurText` for word-by-word blur-in on page load |
| `FeaturesGrid.tsx` | IntersectionObserver scroll-reveal + staggered `--fade-delay` + cursor-tracking `::before` green glow (desktop only) |
| `Timeline.tsx` | IntersectionObserver scroll-reveal + staggered `--entry-delay` + DotCore scale animation + FLL/FTC type chip via `entry.year.includes('FLL')` |
| `ContactSection.tsx` | Input green focus glow; animated submit button (idle → loading Loader → success MdCheckCircle); ambient `::before` gradient on FormCard |
| `FAQSection.tsx` | IntersectionObserver scroll-reveal + `--faq-delay` stagger + `cubic-bezier(0.4,0,0.2,1)` collapse easing + left border accent on hover |
| `App.tsx` | FeaturesCarousel replaced with SponsorsSection |

## New Components

| File | Purpose |
|---|---|
| `src/components/SponsorsSection.tsx` | Renders sponsor marquee using LogoLoop; reads sponsors.json |
| `src/components/reactbits/LogoLoop.tsx` | Infinite marquee; duplicates logo strip for seamless CSS scroll; pause-on-hover via CSS |
| `src/components/reactbits/LogoLoop.css` | Keyframe `logo-scroll` (translateX 0 → -50%); mask-image edge fade; hover effects |

## Deleted Files

| File | Reason |
|---|---|
| `src/components/reactbits/GooeyNav.tsx` | Reverted — trigger nav preferred |
| `src/components/reactbits/GooeyNav.css` | Reverted |
| `src/components/FeaturesCarousel.tsx` | Replaced by SponsorsSection + LogoLoop |

## Architecture Decisions

**FeaturesGrid cursor glow**: `::before` pseudo on `Card` with `radial-gradient` at `var(--mouse-x), var(--mouse-y)`. Mouse coordinates set via `onMouseMove` handler updating CSS custom properties directly on the element (no state, no re-render). Desktop-only via `@media (min-width: 1024px)`. Content (`IconWrap`, `CardTitle`, `CardText`) gets `position: relative; z-index: 1` to sit above the pseudo.

**Timeline type chip**: `entry.year` from timeline.json includes the type in parentheses (e.g. `"2017–2018 (FLL)"`). Check with `entry.year.includes('FLL')` — FLL gets `MdSportsScore`, FTC gets `MdPrecisionManufacturing`. Chip has `backdrop-filter: blur(8px)` + semi-transparent border in entry color.

**ContactSection submit animation**: `status: 'idle' | 'loading' | 'success'` state. On submit: → loading (shows `<Loader size={16} />`) → after 1.2s success (shows `MdCheckCircle`) → after 2s reset to idle. Button is `disabled` during non-idle. FormCard has a static `::before` ambient gradient (green top-right, blue bottom-left, ~4% opacity).

**FeaturesGrid fade-in**: done directly on the `Card` styled-component (no extra wrapper divs) using CSS custom property `--fade-delay` and the `rb-visible` class. This preserves the responsive `grid-column: span N` layout.

**LogoLoop**: Two identical tracks side by side (first `aria-hidden="false"`, second `aria-hidden="true"`). Animation translates the container by `-50%`, which scrolls exactly one strip width seamlessly. Duration computed as `(logos.length * logoHeight * 2) / speed`.

**BlurText**: uses `motion/react` (not `framer-motion` — the package is `motion` v12). Uses `as any` casts on `initial` and `animate` because the library's `AnimationStep` type has optional keys (`undefined`) which motion's `TargetAndTransition` doesn't allow.

## GooeyNav Attempt (Reverted)

GooeyNav was integrated for one session but reverted at user's request. It used CSS `filter: blur(7px) contrast(100) blur(0)` + `mix-blend-mode: lighten` for the gooey blob. Active state was controlled via `externalActiveIndex` + `navIndexFromPath(pathname)`. Reverted because the trigger nav feels more precise for a site with deep dropdown menus.

## Components NOT Used

- **Aurora** — requires `ogl` WebGL library, too heavy
- **FadeContent / ScrollReveal** — both depend on GSAP, rejected
- **MagicRings / Rings** — WebGL, rejected

## Dependencies Added

```
motion: ^12.42.0   (framer-motion v11+ rebranded; used only in BlurText.tsx)
```
