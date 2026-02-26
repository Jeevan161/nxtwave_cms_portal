// Global style tokens for the CMS Portal
// Modern, vibrant design system with depth and polish

export const theme = {
  colors: {
    // Primary palette — rich indigo/violet
    primary: '#1E1B4B',
    primaryLight: '#3730A3',
    primaryDark: '#0F0A2E',
    accent: '#6366F1',
    accentHover: '#4F46E5',
    accentLight: '#E0E7FF',
    accentSubtle: '#EEF2FF',

    // Neutrals — warm-tinted grays
    white: '#FFFFFF',
    background: '#F5F3FF',
    surface: '#FFFFFF',
    surfaceHover: '#FAFAFF',
    surfaceRaised: '#FFFFFF',
    border: '#E0E0EE',
    borderLight: '#F0EEFA',

    // Text hierarchy
    textPrimary: '#1A1642',
    textSecondary: '#5B5675',
    textMuted: '#9490AD',
    textInverse: '#FFFFFF',

    // Semantic
    success: '#10B981',
    successLight: '#D1FAE5',
    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    error: '#EF4444',
    errorLight: '#FEE2E2',
    info: '#6366F1',
    infoLight: '#E0E7FF',

    // Sidebar specific — deep gradient-ready
    sidebarBg: '#110E2B',
    sidebarText: '#A5A0C8',
    sidebarTextHover: '#D4D0F0',
    sidebarTextActive: '#FFFFFF',
    sidebarHover: 'rgba(255, 255, 255, 0.07)',
    sidebarActive: 'rgba(99, 102, 241, 0.15)',
    sidebarAccent: '#6366F1',
    sidebarDivider: 'rgba(255, 255, 255, 0.06)',
  },

  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontFamilyMono: "'JetBrains Mono', 'Fira Code', monospace",

    fontSize: {
      xs: '0.6875rem',   // 11px
      sm: '0.75rem',     // 12px
      base: '0.8125rem', // 13px
      md: '0.875rem',    // 14px
      lg: '1rem',        // 16px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
    },

    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },

    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '32px',
    '4xl': '40px',
  },

  layout: {
    sidebarWidth: '260px',
    sidebarCollapsedWidth: '72px',
    topBarHeight: '60px',
    borderRadius: '10px',
    borderRadiusSm: '8px',
    borderRadiusLg: '14px',
    borderRadiusXl: '16px',
  },

  shadows: {
    sm: '0 1px 3px rgba(99, 102, 241, 0.04)',
    md: '0 4px 12px -2px rgba(99, 102, 241, 0.08), 0 2px 4px -2px rgba(99, 102, 241, 0.04)',
    lg: '0 12px 28px -6px rgba(99, 102, 241, 0.12), 0 6px 12px -4px rgba(99, 102, 241, 0.05)',
    xl: '0 24px 50px -12px rgba(99, 102, 241, 0.18)',
    topBar: '0 1px 3px rgba(99, 102, 241, 0.05), 0 1px 2px rgba(0, 0, 0, 0.02)',
    card: '0 1px 4px rgba(99, 102, 241, 0.06), 0 0 0 1px rgba(99, 102, 241, 0.02)',
    cardHover: '0 12px 32px -6px rgba(99, 102, 241, 0.16), 0 4px 12px -4px rgba(99, 102, 241, 0.06)',
    sidebar: '2px 0 12px rgba(17, 14, 43, 0.2)',
    input: '0 1px 2px rgba(99, 102, 241, 0.04)',
    inputFocus: '0 0 0 3px rgba(99, 102, 241, 0.15)',
  },

  transitions: {
    fast: '150ms ease',
    normal: '200ms ease',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

export type Theme = typeof theme;
