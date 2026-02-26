import type { CSSProperties } from 'react';
import { theme } from '../../styles/GlobalStyles';

const { colors, typography, spacing, layout, shadows, transitions } = theme;

type StyleMap = Record<string, CSSProperties>;

export const getTopBarStyles = (sidebarWidth: string): StyleMap => ({
  container: {
    position: 'fixed',
    top: 0,
    left: sidebarWidth,
    right: 0,
    height: layout.topBarHeight,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(16px)',
    borderBottom: `1px solid ${colors.border}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: `0 ${spacing['2xl']}`,
    zIndex: 90,
    transition: `left ${transitions.slow}`,
    boxShadow: shadows.topBar,
  },

  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
    minWidth: 0,
  },

  hamburgerButton: {
    width: '38px',
    height: '38px',
    borderRadius: layout.borderRadiusSm,
    border: 'none',
    backgroundColor: 'transparent',
    color: colors.textSecondary,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: `all ${transitions.fast}`,
    flexShrink: 0,
  },

  titleBlock: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2px',
  },

  pageTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: '-0.02em',
  },

  breadcrumbs: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
    fontSize: typography.fontSize.sm,
    color: colors.textMuted,
  },

  breadcrumbLink: {
    color: colors.textMuted,
    textDecoration: 'none',
    cursor: 'pointer',
    transition: `color ${transitions.fast}`,
  },

  breadcrumbSeparator: {
    color: colors.textMuted,
    fontSize: typography.fontSize.xs,
    userSelect: 'none' as const,
  },

  breadcrumbCurrent: {
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },

  centerSection: {
    flex: 2,
    maxWidth: '480px',
    margin: '0 auto',
  },

  searchWrapper: {
    position: 'relative' as const,
    width: '100%',
  },

  searchInput: {
    width: '100%',
    height: '38px',
    padding: `0 ${spacing.lg} 0 40px`,
    backgroundColor: colors.background,
    border: `1px solid ${colors.border}`,
    borderRadius: layout.borderRadius,
    fontSize: typography.fontSize.md,
    color: colors.textPrimary,
    outline: 'none',
    transition: `all ${transitions.fast}`,
    fontFamily: typography.fontFamily,
    boxShadow: shadows.input,
  },

  searchInputFocused: {
    backgroundColor: colors.white,
    borderColor: colors.accent,
    boxShadow: shadows.inputFocus,
  },

  searchIcon: {
    position: 'absolute' as const,
    left: spacing.md,
    top: '50%',
    transform: 'translateY(-50%)',
    color: colors.textMuted,
    pointerEvents: 'none' as const,
    display: 'flex',
    alignItems: 'center',
  },

  searchShortcut: {
    position: 'absolute' as const,
    right: spacing.md,
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: colors.surfaceHover,
    border: `1px solid ${colors.border}`,
    borderRadius: '6px',
    padding: `2px ${spacing.sm}`,
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
    fontFamily: typography.fontFamilyMono,
    lineHeight: '1.4',
    pointerEvents: 'none' as const,
  },

  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.xs,
    flex: 1,
    justifyContent: 'flex-end',
  },

  iconButton: {
    width: '38px',
    height: '38px',
    borderRadius: layout.borderRadiusSm,
    border: 'none',
    backgroundColor: 'transparent',
    color: colors.textMuted,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: `all ${transitions.fast}`,
    position: 'relative' as const,
  },

  iconButtonHover: {
    backgroundColor: colors.background,
    color: colors.textPrimary,
  },

  notificationDot: {
    position: 'absolute' as const,
    top: '7px',
    right: '7px',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: colors.error,
    border: `2px solid ${colors.surface}`,
  },

  divider: {
    width: '1px',
    height: '24px',
    backgroundColor: colors.border,
    margin: `0 ${spacing.sm}`,
  },

  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    padding: `${spacing.xs} ${spacing.sm} ${spacing.xs} ${spacing.xs}`,
    borderRadius: layout.borderRadius,
    cursor: 'pointer',
    transition: `background-color ${transitions.fast}`,
  },

  userProfileHover: {
    backgroundColor: colors.background,
  },

  avatar: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    backgroundColor: colors.accentLight,
    color: colors.accent,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    flexShrink: 0,
  },

  userInfo: {
    display: 'flex',
    flexDirection: 'column' as const,
    lineHeight: typography.lineHeight.tight,
  },

  userName: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    color: colors.textPrimary,
    whiteSpace: 'nowrap' as const,
  },

  userRole: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
    whiteSpace: 'nowrap' as const,
  },
});
