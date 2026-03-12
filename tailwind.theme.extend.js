/**
 * Tailwind theme extension — in sync with design-tokens.json.
 * Use in tailwind.config.js: theme: { extend: require('./tailwind.theme.extend.js') }
 */

module.exports = {
  colors: {
    page: '#fafaf9',
    pageAlt: '#f5f5f4',
    card: '#ffffff',
    cardHover: '#fafaf9',
    primary: '#1c1917',
    secondary: '#57534e',
    tertiary: '#78716c',
    inverse: '#ffffff',
    highlight: '#c2410c',
    highlightMuted: '#ea580c',
    low: '#16a34a',
    moderate: '#f97316',
    high: '#ef4444',
    veryHigh: '#b91c1c',
    inactive: '#9ca3af',
    border: '#e7e5e4',
    borderFocus: '#c2410c',
    ctaBg: '#e7e5e4',
    ctaText: '#1c1917',
  },
  fontFamily: {
    sans: [
      'var(--font-geist-sans)',
      'ui-sans-serif',
      'system-ui',
      '-apple-system',
      'Segoe UI',
      'sans-serif',
    ],
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1.5' }],
    sm: ['0.875rem', { lineHeight: '1.5' }],
    base: ['1rem', { lineHeight: '1.5' }],
    lg: ['1.25rem', { lineHeight: '1.375' }],
    xl: ['1.5625rem', { lineHeight: '1.375' }],
    '2xl': ['1.9375rem', { lineHeight: '1.2' }],
    '3xl': ['2.4375rem', { lineHeight: '1.2' }],
    '4xl': ['3.0625rem', { lineHeight: '1.2' }],
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  borderRadius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
  },
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.04)',
    card: '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.08)',
  },
  maxWidth: {
    page: '72rem',
    content: '64rem',
  },
};
