# GE HealthCare Easter Egg — Design Spec

**Date:** 2026-06-29  
**Status:** Approved

## Summary

When a user hovers over the GE HealthCare sponsor card in the sponsors carousel, the "GE" prefix in the "GEarheads" navbar wordmark smoothly transitions from green to accent blue (`#0088ff`). It reverts to green on mouse leave. No user-visible affordance — it is an intentional secret easter egg.

## Trigger Condition

- **Activate:** `mouseenter` on any carousel card whose `sponsor.name === 'GE HealthCare'`
- **Deactivate:** `mouseleave` from the same card
- Applies to all three copies of the GE HealthCare card in the tripled array (indices 2, 15, 28)

## Communication Mechanism

Custom DOM event on `window`:

```ts
// Activate
window.dispatchEvent(new CustomEvent('ge-hover', { detail: { active: true } }))

// Deactivate
window.dispatchEvent(new CustomEvent('ge-hover', { detail: { active: false } }))
```

No shared state, no context, no prop drilling. The connection is invisible in the component tree — appropriate for a secret feature.

## Files Changed

### `src/components/SponsorsSection.tsx`
- Add `onMouseEnter` / `onMouseLeave` handlers to the card element
- Handler checks `sponsor.name === 'GE HealthCare'` before dispatching
- No changes to existing state, animation, or carousel logic

### `src/components/Header.tsx`
- Add `geActive: boolean` state (default `false`)
- Add `useEffect` that attaches a `window` listener for `'ge-hover'`, sets state from `event.detail.active`, and removes listener on unmount
- "GE" span: add `transition: color 250ms ease`, conditionally apply `#0088ff` when `geActive`, otherwise `theme.colors.secondary`

## Behavior

| State | "GE" color |
|---|---|
| Default | `theme.colors.secondary` (green) |
| Hovering GE HealthCare card | `#0088ff` (accent blue) |
| Transition duration | 250ms ease |

## Out of Scope

- No tooltip, animation, or visual feedback beyond the color change
- Does not trigger on auto-scroll — hover only
- No persistence across page loads
