# Design System

## Visual Language: Dark Neumorphism

The site uses a dark neumorphic design language. Every surface is the same near-black base color (`#131313`), with light and shadow applied to create the illusion of depth — raised elements cast outward shadows, inset elements cast inward shadows. There are no border-based cards; depth is entirely through `box-shadow`.

This creates a sophisticated, tactile feel. Do not introduce flat-color cards, colored backgrounds for sections, or borders. Keep all surfaces on the same dark base and use shadow variation only.

---

## Color Palette (from `src/styles/theme.ts`)

### Background & Surface
All surface colors are near-black variants of `#131313`. Sections do not use different background colors to differentiate themselves — shadow and spacing do that.

| Token | Value | Use |
|---|---|---|
| `background` | `#131313` | Base for all surfaces |
| `surfaceContainerLow` | `#1c1b1b` | Slightly elevated surface (e.g. Timeline bg) |
| `surfaceContainerHigh` | `#2a2a2a` | More elevated |
| `outlineVariant` | `#414755` | Dividers (use at low opacity, e.g. `1a` hex alpha) |

### Brand Colors (used for accents, icons, labels, glows)
| Token | Value | Character |
|---|---|---|
| `primary` | `#adc6ff` | Soft blue — main accent, links, active states |
| `primaryContainer` | `#4b8eff` | Saturated blue — used in button/primary shadows |
| `secondary` | `#4ae183` | Bright green — second accent, positive signals |
| `tertiary` | `#ffabef` | Pink/magenta — third accent, decorative |

### Text
| Token | Value | Use |
|---|---|---|
| `onSurface` | `#e5e2e1` | Primary text |
| `onSurfaceVariant` | `#c1c6d7` | Secondary text, subtitles, placeholders |
| `onBackground` | `#e5e2e1` | Body text |

---

## Typography

All fonts must be sourced from the existing theme. Do not introduce new font families.

| Role | Font | Typical Use |
|---|---|---|
| Display / Headline | `"Geist", sans-serif` | H1, H2, H3 titles |
| Body | `"Inter", sans-serif` | Paragraphs, descriptions |
| Label / Code | `"JetBrains Mono", monospace` | Buttons, nav links, badges, form labels, code |

### Common type styles
- **H1 (hero):** Geist, 48px mobile / 64px desktop, `font-weight: 700`, `letter-spacing: -0.04em`, `line-height: 1.1`
- **H2 (section title):** Geist, 32px mobile / 40px desktop, `font-weight: 700`, `letter-spacing: -0.02em`, `line-height: 1.2`
- **H3 (card title):** Geist, 24px, `font-weight: 600`, `line-height: 1.4`
- **Body:** Inter, 16px, `line-height: 1.6`
- **Label/Button:** JetBrains Mono, 12px, `font-weight: 500`, `letter-spacing: 0.05em`, `text-transform: uppercase`

---

## Shadows (Neumorphic System)

The entire depth system comes from two base values: `#080808` (dark shadow) and `#1e1e1e` (light shadow). Both are offsets from the `#131313` base.

| Token | Effect | Common use |
|---|---|---|
| `neoRaised` | `8px 8px 16px #080808, -8px -8px 16px #1e1e1e` | Cards, nav, footer |
| `neoRaisedSm` | `4px 4px 8px #080808, -4px -4px 8px #1e1e1e` | Small raised elements, keys |
| `neoRaisedLg` | `12px 12px 24px #080808, -12px -12px 24px #1e1e1e` | Hover state on cards |
| `neoInset` | `inset 8px 8px 16px #080808, inset -8px -8px 16px #1e1e1e` | Icon wells, large recessed areas |
| `neoInsetSm` | `inset 4px 4px 8px #080808, inset -4px -4px 8px #1e1e1e` | Inputs, badge backgrounds, small recesses |
| `neoButtonPrimary` | Blue-tinted outward shadow | Primary CTA buttons |
| `neoButtonPrimaryActive` | Blue-tinted inward shadow | Primary button press state |
| `neoButtonSecondary` | Neutral outward shadow | Secondary/ghost buttons |
| `neoButtonSecondaryActive` | Neutral inward shadow | Secondary button press state |
| `glowBlue` | `0 0 8px rgba(173, 198, 255, 0.8)` | Hover on social icons |
| `glowGreen` | `0 0 8px rgba(74, 225, 131, 0.8)` | Active/live indicators |
| `glowPink` | `0 0 8px rgba(255, 171, 239, 0.8)` | Tertiary glow accents |

---

## Spacing & Layout

| Token | Value | Use |
|---|---|---|
| `containerMax` | `1280px` | Max content width for all sections |
| `marginMobile` | `20px` | Horizontal padding on mobile |
| `marginDesktop` | `64px` | Horizontal padding on desktop |
| `sectionPaddingMd` | `80px` | Medium vertical section padding |
| `sectionPaddingLg` | `120px` | Large vertical section padding |
| `gutter` | `24px` | Gap between grid/flex items |
| `base` | `8px` | Base spacing unit |

### Responsive breakpoints
- `768px` — primary mobile → desktop breakpoint (used consistently across all components)
- `640px` — secondary breakpoint (button row, some nav items)

---

## Border Radius Conventions

| Use | Radius |
|---|---|
| Large cards, sections | `24px` |
| Medium cards, code blocks | `16px` |
| Input fields | `12px` |
| Pill buttons, nav links, badges | `50px` |
| Icon circles | `50%` |

---

## Interactive States

- **Hover:** Color shift toward `primary`, or scale-up transform (`scale(1.1)`) for icon buttons
- **Active/Press:** Box-shadow transitions from raised → inset (using the `Active` shadow tokens)
- **Focus (inputs):** Add a `0 0 0 1px ${primary}80` ring on top of the inset shadow
- **Transitions:** `0.2s` for color/shadow, `0.3s` for transforms and expand/collapse

---

## Anti-Patterns to Avoid

- Do not use flat colored backgrounds for cards or sections
- Do not use border-based card outlines
- Do not use white or light backgrounds anywhere
- Do not use font sizes smaller than 10px or larger than 64px without design rationale
- Do not introduce colors outside the theme palette
- Do not use heavy animation — motion should feel mechanical and precise, not playful
