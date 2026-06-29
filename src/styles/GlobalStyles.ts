import { createGlobalStyle } from 'styled-components'
import { theme } from './theme'

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Asimov';
    src: url('/fonts/Asimov.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: ${theme.colors.background};
    color: ${theme.colors.onBackground};
    font-family: ${theme.fonts.body};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100vh;
  }

  ::selection {
    background-color: ${theme.colors.primaryContainer};
    color: ${theme.colors.onPrimaryContainer};
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
    font-family: inherit;
  }

  input, textarea {
    font-family: inherit;
    outline: none;
    border: none;
  }

  ul {
    list-style: none;
  }

  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  @keyframes spin-slow-reverse {
    from { transform: rotate(360deg); }
    to   { transform: rotate(0deg); }
  }
`
