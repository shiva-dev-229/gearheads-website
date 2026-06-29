# UI Conventions & Patterns

## Technology Choices

- **Styling:** styled-components only. No inline styles except for minor one-offs (e.g. `style={{ marginTop: 8 }}`). No CSS modules, no Tailwind, no global class names.
- **Icons:** react-icons (`md` set — Material Design). Import from `react-icons/md`.
- **Theme access:** Always import from `../styles/theme`. Never hardcode color hex values inside component files.
- **No external component libraries.** All UI is hand-built.

---

## Breakpoints

Single breakpoint system. Use consistently:

| Breakpoint | Value | Meaning |
|---|---|---|
| Mobile (default) | `< 768px` | Single-column, stacked layout |
| Desktop | `>= 768px` | Multi-column, horizontal layout |
| Wide mobile | `>= 640px` | Used only for button rows |

---

## Styled-Component Conventions

### Transient props
Use `$` prefix for props that should not reach the DOM:
```tsx
const Card = styled.div<{ $wide?: boolean }>`
  grid-column: ${({ $wide }) => ($wide ? 'span 2' : 'span 1')};
`
// Usage: <Card $wide>
```

### Extending components
Use `styled(BaseComponent)` to extend an existing styled component rather than duplicating styles:
```tsx
const WideCard = styled(Card)`
  flex-direction: row;
`
```

### Shared CSS strings
For shared base styles (e.g., the `inputBase` string in ContactSection), use a template literal string and interpolate into multiple components:
```tsx
const inputBase = `
  background: transparent;
  box-shadow: ${theme.shadows.neoInsetSm};
  ...
`
const Input = styled.input`${inputBase}`
const Textarea = styled.textarea`${inputBase}`
```

---

## Animation Guidelines

- Animations are subtle and slow — mechanical, not playful.
- The hero rings animate at 40s–60s durations.
- Interactive transitions: `0.2s` for color/shadow, `0.3s` for transforms.
- Use `keyframes` from styled-components for self-contained animations.
- Do not use JS-based animation libraries. CSS transitions and keyframes only.
- Prefer `transform` and `opacity` for animated properties (GPU composited).

---

## Button Patterns

There are two button variants used site-wide:

**Primary (blue-tinted, main CTA):**
```tsx
background: ${theme.colors.background};
color: ${theme.colors.primary};
box-shadow: ${theme.shadows.neoButtonPrimary};
border-radius: 50px;
font-family: ${theme.fonts.label};  // JetBrains Mono
font-size: 12px;
text-transform: uppercase;
letter-spacing: 0.05em;

&:active { box-shadow: ${theme.shadows.neoButtonPrimaryActive}; }
```

**Secondary (neutral, ghost-style):**
```tsx
background: ${theme.colors.background};
color: ${theme.colors.onSurface};
box-shadow: ${theme.shadows.neoButtonSecondary};
border-radius: 50px;
// same font as primary

&:hover { color: ${theme.colors.primary}; }
&:active { box-shadow: ${theme.shadows.neoButtonSecondaryActive}; }
```

---

## Form Input Pattern

```tsx
background: transparent;
box-shadow: inset 4px 4px 8px #080808, inset -4px -4px 8px #1e1e1e;
border-radius: 12px;
border: none;
padding: 16px;
color: ${theme.colors.onSurface};
font-family: ${theme.fonts.body};
font-size: 16px;

&::placeholder { color: ${theme.colors.onSurfaceVariant}4d; }
&:focus {
  box-shadow: inset 4px 4px 8px #080808, inset -4px -4px 8px #1e1e1e,
    0 0 0 1px ${theme.colors.primary}80;
}
```
Form labels use JetBrains Mono, 12px, uppercase, `onSurfaceVariant`.

---

## Color Usage Rules

- **Blue (`primary`):** Interactive elements — links, active nav, CTA button text, accent icons, focus rings, section titles where color emphasis is wanted.
- **Green (`secondary`):** Positive/live signals — status dots, timeline dots, secondary accents.
- **Pink (`tertiary`):** Decorative accents — timeline dots (tertiary entries), code block text.
- **`onSurface`:** Headings, primary text.
- **`onSurfaceVariant`:** Secondary text, labels, placeholders, inactive states.
- Never use `primaryContainer` (`#4b8eff`) directly as a text color — it's used only in shadow calculations.

---

## Accessibility Reminders

- Buttons must have accessible labels (text or `aria-label`).
- Icon-only buttons (e.g. nav/carousel arrows) need `aria-label`.
- Color alone must not convey meaning — pair color with text or icon.
- Contrast: text on `#131313` should use `onSurface` (`#e5e2e1`) or `onSurfaceVariant` (`#c1c6d7`).

---

## "Not AI" Design Rules

These rules prevent the site from looking template-generic or AI-generated:

1. **Never use generic stock-photo cards.** Feature illustrations should be code, diagrams, or device mockups built from HTML/CSS — not placeholder images.
2. **Avoid symmetric grid uniformity.** Use the `$wide` bento pattern — mix card widths in a grid to create visual hierarchy.
3. **Purposeful whitespace.** Sections breathe — 48px+ vertical gap between sections, 32px within them.
4. **No rainbow gradients or neon glows.** Glows are subtle (8px blur, low opacity) and tied to a single brand color.
5. **Micro-interactions earn their place.** Every animation (ring spin, carousel 3D rotate, shadow on hover) is intentional. Do not add animation just to add motion.
6. **Typography does the heavy lifting.** Use letter-spacing, text-transform, and font-weight variation rather than decorative fonts or graphic elements.
