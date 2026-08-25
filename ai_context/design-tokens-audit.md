# Design Token Audit — Current State → Compressed Target

Evidence-based audit of `src/styles/theme.ts` (usage counts via grep across `src/`), done ahead of the premium redesign. Full current system is documented in `DESIGN.md`; this file is the delta analysis that produced the compressed token set `Design.md` and the redesign build on.

## Core brand colors — KEEP

These are the team's actual identity, not just UI accents — evidenced by the logo file itself (`src/assets/logos/logo-blue-green.png`) and the GE-Healthcare easter egg spec, which treats blue/green as the two meaningful brand signals.

| Color | Hex | Evidence |
|---|---|---|
| **Console Blue** | `#adc6ff` | In logo; 31 files reference `colors.primary` |
| **Telemetry Green** | `#4ae183` | In logo; "GE" prefix of wordmark; 36 files reference `colors.secondary` |
| **Near-black base** | `#131313` | Every surface on the site; structural, not optional |
| **Asimov brand font** | — | Wordmark-only typeface (`fonts.brand`), used in `Header.tsx` + `Footer.tsx` |

## Non-core — optional, not brand-defining

| Color | Hex | Evidence |
|---|---|---|
| Indicator Magenta (`tertiary`) | `#ffabef` | UI-only accent invented for a "third signal color" — absent from the logo and the easter-egg spec. Used in 9 files as a decorative accent. Safe to drop or keep as a minor accent; not load-bearing to brand identity. |

## Dead scaffold — safe to delete entirely

`theme.ts` carries a full Material Design 3 color-role scaffold (~40 tokens: `*Fixed`, `*FixedDim`, `on*Fixed*`, `*Container` variants, `inverseSurface`, `surfaceDim`, `surfaceBright`, `outline`, `error*`, etc.) left over from the original template. Grep confirms 0 usages for the large majority; a handful (`primaryContainer`, `secondaryContainer`, `tertiaryContainer`, `onPrimaryContainer`, `error`, `surfaceContainerLowest/Container/Highest`) are used in only 1–2 files each, mostly for shadow-tint math that has a simpler direct equivalent. None of this scaffold should carry into the compressed system — a minimal site needs background, 1–2 surface steps, 2 text tones, and the 2 brand accents, not a 40-token Material role system.

## Typography, spacing, shape — current inventory

Full detail in `DESIGN.md`. Summary: 3 real font families (Geist display/headline, Inter body, JetBrains Mono label — all three are genuinely used, not scaffold), an 8-step type scale (display → eyebrow), an 8px base spacing unit with a 1280px container cap, and a 6-step radius scale (12/14/18/20/24/50px + circle). This scale is already reasonably tight — the compression target keeps it, not the colors.

## Compressed target (feeds `Design.md`)

- **Color tokens: ~40 → 8.** `background`, `surface` (one elevated step), `border` (single hairline/divider tone), `text-primary`, `text-secondary`, `accent-blue` (`#adc6ff`), `accent-green` (`#4ae183`), plus white/near-white for a light-mode-capable neutral if the redesign moves off pure dark (open decision — see `Design.md`).
- **Shadow vocabulary:** the neumorphic dual-shadow system (`neoRaised`/`neoInset` + variants) is the single biggest departure point for a "premium minimal" direction — a restrained redesign typically replaces heavy dual-tone neumorphism with flat surfaces + a single soft ambient shadow or a hairline border. Decision made in `Design.md`.
- **Typography, spacing, radius scale:** carried forward largely as-is — already minimal and purpose-built, not template cruft.
