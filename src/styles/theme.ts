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
    primaryContainer: '#4b8eff',
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
  },

  shadows: {
    neoRaised: '8px 8px 16px #080808, -8px -8px 16px #1e1e1e',
    neoInset: 'inset 8px 8px 16px #080808, inset -8px -8px 16px #1e1e1e',
    neoRaisedSm: '4px 4px 8px #080808, -4px -4px 8px #1e1e1e',
    neoInsetSm: 'inset 4px 4px 8px #080808, inset -4px -4px 8px #1e1e1e',
    neoButtonPrimary:
      '4px 4px 10px rgba(75, 142, 255, 0.15), -4px -4px 10px rgba(75, 142, 255, 0.05), inset 2px 2px 5px rgba(75, 142, 255, 0.2)',
    neoButtonSecondary: '4px 4px 10px #080808, -4px -4px 10px #1e1e1e',
    neoButtonPrimaryActive:
      'inset 4px 4px 10px rgba(75, 142, 255, 0.2), inset -4px -4px 10px rgba(75, 142, 255, 0.05)',
    neoButtonSecondaryActive: 'inset 4px 4px 10px #080808, inset -4px -4px 10px #1e1e1e',
    neoRaisedLg: '12px 12px 24px #080808, -12px -12px 24px #1e1e1e',
    glowBlue: '0 0 8px rgba(173, 198, 255, 0.8)',
    glowGreen: '0 0 8px rgba(74, 225, 131, 0.8)',
    glowPink: '0 0 8px rgba(255, 171, 239, 0.8)',
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
    sectionPaddingMd: '80px',
    sectionPaddingLg: '120px',
    gutter: '24px',
    base: '8px',
  },
} as const

export type Theme = typeof theme
