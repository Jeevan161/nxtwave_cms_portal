import type { CSSProperties } from 'react';
import { theme } from '../../styles/GlobalStyles';

const { colors, typography, spacing, layout, transitions } = theme;

type StyleMap = Record<string, CSSProperties>;

export const getSidebarStyles = (isCollapsed: boolean): StyleMap => ({
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: isCollapsed ? layout.sidebarCollapsedWidth : layout.sidebarWidth,
    backgroundColor: colors.sidebarBg,
    display: 'flex',
    flexDirection: 'column',
    transition: `width ${transitions.slow}`,
    zIndex: 100,
    overflow: 'hidden',
    boxSizing: 'border-box',
  },

  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    padding: `${spacing.lg} ${spacing.xl}`,
    height: layout.topBarHeight,
    borderBottom: `1px solid ${colors.sidebarDivider}`,
    flexShrink: 0,
    cursor: 'pointer',
  },

  logoIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: `linear-gradient(135deg, ${colors.accent}, #818CF8)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: colors.white,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
  },

  logoText: {
    display: 'flex',
    flexDirection: 'column' as const,
    opacity: isCollapsed ? 0 : 1,
    transition: `opacity ${transitions.normal}`,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
  },

  logoTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.textInverse,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: '-0.01em',
  },

  logoSubtitle: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
    fontWeight: typography.fontWeight.normal,
    letterSpacing: '0.04em',
    textTransform: 'uppercase' as const,
  },

  nav: {
    flex: 1,
    overflowY: 'auto' as const,
    overflowX: 'hidden' as const,
    padding: `${spacing.sm} 0`,
  },

  sectionTitle: {
    padding: isCollapsed
      ? `${spacing.xl} ${spacing.md} ${spacing.sm}`
      : `${spacing.xl} ${spacing.xl} ${spacing.sm}`,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textMuted,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    opacity: isCollapsed ? 0 : 1,
    transition: `opacity ${transitions.normal}`,
    whiteSpace: 'nowrap' as const,
  },

  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    padding: isCollapsed
      ? `${spacing.md} 0`
      : `${spacing.md} ${spacing.xl}`,
    margin: isCollapsed
      ? `2px ${spacing.sm}`
      : `2px ${spacing.md}`,
    borderRadius: layout.borderRadiusSm,
    color: colors.sidebarText,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    cursor: 'pointer',
    transition: `all ${transitions.fast}`,
    textDecoration: 'none',
    border: 'none',
    background: 'none',
    width: isCollapsed ? 'auto' : `calc(100% - ${spacing.lg})`,
    justifyContent: isCollapsed ? 'center' : 'flex-start',
    position: 'relative' as const,
  },

  menuItemActive: {
    backgroundColor: colors.sidebarActive,
    color: colors.sidebarTextActive,
  },

menuItemHover: {
  backgroundColor: colors.sidebarHover,  // #1E293B
  color: colors.sidebarText,             // keep same muted color, don't jump to white
},

  menuItemIcon: {
    width: '20px',
    height: '20px',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  menuItemLabel: {
    opacity: isCollapsed ? 0 : 1,
    transition: `opacity ${transitions.normal}`,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    flex: 1,
  },

  badge: {
    backgroundColor: colors.accent,
    color: colors.white,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    padding: `2px ${spacing.sm}`,
    borderRadius: '10px',
    lineHeight: '1',
    minWidth: '20px',
    textAlign: 'center' as const,
    opacity: isCollapsed ? 0 : 1,
    transition: `opacity ${transitions.normal}`,
  },

  activeIndicator: {
    position: 'absolute' as const,
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: '3px',
    height: '20px',
    backgroundColor: colors.accent,
    borderRadius: '0 3px 3px 0',
  },

  childItem: {
    paddingLeft: isCollapsed ? '0' : '52px',
    fontSize: typography.fontSize.sm,
  },

  chevron: {
    width: '16px',
    height: '16px',
    flexShrink: 0,
    transition: `transform ${transitions.fast}`,
    opacity: isCollapsed ? 0 : 1,
  },

  chevronOpen: {
    transform: 'rotate(90deg)',
  },

  collapseButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: `${spacing.lg} ${spacing.xl}`,
    color: colors.textMuted,
    cursor: 'pointer',
    transition: `color ${transitions.fast}`,
    background: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: 'none',
    borderTop: `1px solid ${colors.sidebarDivider}`,
    width: '100%',
    fontSize: typography.fontSize.sm,
    flexShrink: 0,
  },

  tooltip: {
    position: 'absolute' as const,
    left: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    marginLeft: spacing.sm,
    backgroundColor: colors.primaryDark,
    color: colors.textInverse,
    padding: `${spacing.xs} ${spacing.md}`,
    borderRadius: layout.borderRadiusSm,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    whiteSpace: 'nowrap' as const,
    zIndex: 200,
    pointerEvents: 'none' as const,
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  },
});