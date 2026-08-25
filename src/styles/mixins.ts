import { css, keyframes } from 'styled-components'
import { theme } from './theme'

export const chipWiggle = keyframes`
  0%   { transform: rotate(0deg); }
  30%  { transform: rotate(-12deg); }
  70%  { transform: rotate(12deg); }
  100% { transform: rotate(0deg); }
`

// Flat-system hover (DESIGN.md): border + background step, no shadow upgrade.
export const chipHover = css`
  transition: transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
  border: 1px solid ${theme.colors.hairline};

  &:hover {
    transform: translateY(-2px);
    border-color: ${theme.colors.hairlineStrong};
    background-color: ${theme.colors.surfaceRaised};

    svg {
      @media (prefers-reduced-motion: no-preference) {
        animation: ${chipWiggle} 350ms ease forwards;
      }
    }
  }

  &:active {
    transform: translateY(0) scale(0.97);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: border-color 0.2s ease, background-color 0.2s ease;
    &:hover { transform: none; }
    &:active { transform: none; }
  }
`

// Subtler variant for chips that shouldn't gain a background on hover — border only.
export const chipHoverSubtle = css`
  transition: transform 0.2s ease, border-color 0.2s ease;
  border: 1px solid ${theme.colors.hairline};

  &:hover {
    transform: translateY(-2px);
    border-color: ${theme.colors.hairlineStrong};

    svg {
      @media (prefers-reduced-motion: no-preference) {
        animation: ${chipWiggle} 350ms ease forwards;
      }
    }
  }

  &:active {
    transform: translateY(0) scale(0.97);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: border-color 0.2s ease;
    &:hover { transform: none; }
    &:active { transform: none; }
  }
`
