// Global style tokens for the CMS Portal
// Using a refined, utilitarian design system suited for content management

export const theme = {
  colors: {
    // Primary palette - Deep navy with electric blue accent
    primary: '#1B2A4A',
    primaryLight: '#2D4A7A',
    primaryDark: '#0F1B33',
    accent: '#3B82F6',
    accentHover: '#2563EB',
    accentLight: '#DBEAFE',

    // Neutrals
    white: '#FFFFFF',
    background: '#F1F5F9',
    surface: '#FFFFFF',
    surfaceHover: '#F8FAFC',
    border: '#E2E8F0',
    borderLight: '#F1F5F9',

    // Text hierarchy
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
    textInverse: '#FFFFFF',

    // Semantic
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',

    // Sidebar specific
    sidebarBg: '#0F172A',
    sidebarText: '#CBD5E1',
    sidebarTextActive: '#FFFFFF',
    sidebarHover: '#1E293B',
    sidebarActive: 'rgba(59, 130, 246, 0.15)',
    sidebarAccent: '#3B82F6',
    sidebarDivider: '#1E293B',
  },

  typography: {
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    fontFamilyMono: "'JetBrains Mono', 'Fira Code', monospace",

    fontSize: {
      xs: '0.6875rem',   // 11px
      sm: '0.75rem',     // 12px
      base: '0.8125rem', // 13px
      md: '0.875rem',    // 14px
      lg: '1rem',        // 16px
      xl: '1.125rem',    // 18px
      '2xl': '1.5rem',   // 24px
    },

    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },

    lineHeight: {
      tight: 1.2,
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
    sidebarWidth: '256px',
    sidebarCollapsedWidth: '72px',
    topBarHeight: '56px',
    borderRadius: '8px',
    borderRadiusSm: '6px',
    borderRadiusLg: '12px',
  },

  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04)',
    topBar: '0 1px 3px rgba(0, 0, 0, 0.05)',
  },

  transitions: {
    fast: '150ms ease',
    normal: '200ms ease',
    slow: '300ms ease',
  },
} as const;

export type Theme = typeof theme;