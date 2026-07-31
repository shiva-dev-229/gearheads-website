import { css, keyframes } from 'styled-components'
import { theme } from './theme'

export const chipWiggle = keyframes`
  0%   { transform: rotate(0deg); }
  30%  { transform: rotate(-12deg); }
  70%  { transform: rotate(12deg); }
  100% { transform: rotate(0deg); }
`

// For chips that start at neoRaisedSm — lifts to neoRaised on hover
export const chipHover = css`
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.neoRaised};

    svg {
      @media (prefers-reduced-motion: no-preference) {
        animation: ${chipWiggle} 350ms ease forwards;
      }
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${theme.shadows.neoInsetSm};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: box-shadow 0.2s ease;
    &:hover { transform: none; }
    &:active { transform: none; }
  }
`

// For chips with no base shadow (transparent/border-only) — appears as neoRaisedSm on hover
export const chipHoverSubtle = css`
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${theme.shadows.neoRaisedSm};

    svg {
      @media (prefers-reduced-motion: no-preference) {
        animation: ${chipWiggle} 350ms ease forwards;
      }
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${theme.shadows.neoInsetSm};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: box-shadow 0.2s ease;
    &:hover { transform: none; }
    &:active { transform: none; }
  }
`
