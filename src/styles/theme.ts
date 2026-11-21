export const theme = {
  colors: {
    background: '#131313',
    surface: '#131313',
    surfaceDim: '#131313',
    surfaceContainerLowest: '#0e0e0e',
    surfaceContainerLow: '#1c1b1b',
    surfaceContainer: '#201f1f',
    surfaceContainerHigh: '#2a2a2a',
    surfaceContainerHighest: '#353534',
    surfaceVariant: '#353534',
    surfaceBright: '#3a3939',

    primary: '#adc6ff',
    primaryFixed: '#d8e2ff',
    primaryFixedDim: '#adc6ff',
    primaryContainer: '#0088ff',
    onPrimary: '#002e69',
    onPrimaryFixed: '#001a41',
    onPrimaryFixedVariant: '#004493',
    onPrimaryContainer: '#00285c',
    inversePrimary: '#005bc1',
    surfaceTint: '#adc6ff',

    secondary: '#4ae183',
    secondaryFixed: '#6bfe9c',
    secondaryFixedDim: '#4ae183',
    secondaryContainer: '#06bb63',
    onSecondary: '#003919',
    onSecondaryFixed: '#00210c',
    onSecondaryFixedVariant: '#005228',
    onSecondaryContainer: '#00431f',

    tertiary: '#ffabef',
    tertiaryFixed: '#ffd7f3',
    tertiaryFixedDim: '#ffabef',
    tertiaryContainer: '#f538ea',
    onTertiary: '#5c0058',
    onTertiaryFixed: '#390036',
    onTertiaryFixedVariant: '#82007d',
    onTertiaryContainer: '#51004d',

    error: '#ffb4ab',
    errorContainer: '#93000a',
    onError: '#690005',
    onErrorContainer: '#ffdad6',

    onBackground: '#e5e2e1',
    onSurface: '#e5e2e1',
    onSurfaceVariant: '#c1c6d7',
    outline: '#8b90a0',
    outlineVariant: '#414755',
    inverseSurface: '#e5e2e1',
    inverseOnSurface: '#313030',

    // Premium redesign tokens (DESIGN.md) — flat system, additive so
    // unmigrated pages keep working on the tokens above during rollout.
    ink: '#0a0a0a',
    surfaceRaised: '#1a1a1a',
    // Matches the opaque white backdrop of exported CAD preview PNGs.
    cadBackdrop: '#ffffff',
    hairline: 'rgba(255, 255, 255, 0.08)',
    hairlineStrong: 'rgba(255, 255, 255, 0.14)',
    textSecondary: '#8f8f93',
  },

  shadows: {
    // Flat system (DESIGN.md): every "neo*" token now renders a crisp hairline
    // ring via box-shadow instead of a dual-tone embossed shadow. Same token
    // names/call sites across ~30 unmigrated page files, new flat look — this
    // is the single highest-leverage edit in the rollout, so page files don't
    // each need a bespoke shadow-removal pass to stop looking neumorphic.
    neoRaised: '0 0 0 1px rgba(255, 255, 255, 0.08)',
    neoRaisedSm: '0 0 0 1px rgba(255, 255, 255, 0.08)',
    neoRaisedLg: '0 0 0 1px rgba(255, 255, 255, 0.14)',
    neoInset: 'inset 0 0 0 1px rgba(255, 255, 255, 0.14)',
    neoInsetSm: 'inset 0 0 0 1px rgba(255, 255, 255, 0.14)',
    neoButtonPrimary: '0 0 0 1px rgba(173, 198, 255, 0.4)',
    neoButtonPrimaryActive: 'inset 0 0 0 1px rgba(173, 198, 255, 0.5)',
    neoButtonSecondary: '0 0 0 1px rgba(255, 255, 255, 0.14)',
    neoButtonSecondaryActive: 'inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
    glowBlue: '0 0 8px rgba(173, 198, 255, 0.8)',
    glowGreen: '0 0 8px rgba(74, 225, 131, 0.8)',
    glowPink: '0 0 8px rgba(255, 171, 239, 0.8)',

    // Single earned shadow for the flat system — sticky header, dropdowns, modals only.
    ambient: '0 1px 2px rgba(0, 0, 0, 0.4), 0 8px 24px rgba(0, 0, 0, 0.35)',
  },

  fonts: {
    display: '"Geist", sans-serif',
    headline: '"Geist", sans-serif',
    body: '"Inter", sans-serif',
    label: '"JetBrains Mono", monospace',
    code: '"JetBrains Mono", monospace',
    brand: '"Asimov", "Geist", sans-serif',
  },

  spacing: {
    marginMobile: '20px',
    marginDesktop: '64px',
    containerMax: '1280px',
    sectionPaddingMd: '56px',
    sectionPaddingLg: '80px',
    gutter: '24px',
    base: '8px',

    // Premium redesign tokens (DESIGN.md)
    marginDesktopLg: '80px',
    sectionPaddingXl: '144px',
    gutterLg: '32px',
    proseMax: '680px',
  },

  rounded: {
    sm: '8px',
    md: '14px',
    pill: '999px',
    circle: '50%',
  },
} as const

export type Theme = typeof theme
