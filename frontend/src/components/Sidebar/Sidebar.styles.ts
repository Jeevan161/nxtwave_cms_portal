import type { CSSProperties } from 'react';
import { theme } from '../../styles/GlobalStyles';

const { colors, typography, spacing, layout, transitions, shadows } = theme;

type StyleMap = Record<string, CSSProperties>;

export const getSidebarStyles = (isCollapsed: boolean): StyleMap => ({
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: isCollapsed ? layout.sidebarCollapsedWidth : layout.sidebarWidth,
    background: `linear-gradient(175deg, #110E2B 0%, #1A1145 50%, #1E1452 100%)`,
    display: 'flex',
    flexDirection: 'column',
    transition: `width ${transitions.slow}`,
    zIndex: 100,
    overflow: 'hidden',
    boxSizing: 'border-box',
    boxShadow: shadows.sidebar,
  },

  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    padding: isCollapsed ? `${spacing.lg} ${spacing.md}` : `${spacing.lg} ${spacing.xl}`,
    height: layout.topBarHeight,
    borderBottom: `1px solid ${colors.sidebarDivider}`,
    flexShrink: 0,
    cursor: 'pointer',
    justifyContent: isCollapsed ? 'center' : 'flex-start',
  },

  logoIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    background: `linear-gradient(135deg, #818CF8, ${colors.accent}, #A78BFA)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: colors.white,
    fontSize: '15px',
    fontWeight: typography.fontWeight.bold,
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.45), 0 0 20px rgba(99, 102, 241, 0.15)',
  },

  logoText: {
    display: 'flex',
    flexDirection: 'column' as const,
    opacity: isCollapsed ? 0 : 1,
    width: isCollapsed ? 0 : 'auto',
    transition: `opacity ${transitions.normal}, width ${transitions.normal}`,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
  },

  logoTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textInverse,
    lineHeight: typography.lineHeight.tight,
    letterSpacing: '-0.02em',
  },

  logoSubtitle: {
    fontSize: typography.fontSize.xs,
    color: '#8B84BF',
    fontWeight: typography.fontWeight.medium,
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
  },

  nav: {
    flex: 1,
    overflowY: 'auto' as const,
    overflowX: 'hidden' as const,
    padding: isCollapsed ? `${spacing.lg} 0` : `${spacing.md} 0`,
  },

  sectionTitle: {
    padding: isCollapsed
      ? `${spacing.lg} ${spacing.md} ${spacing.xs}`
      : `${spacing.xl} ${spacing.xl} ${spacing.sm}`,
    fontSize: '10px',
    fontWeight: typography.fontWeight.bold,
    color: '#6E67A0',
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    opacity: isCollapsed ? 0 : 1,
    height: isCollapsed ? 0 : 'auto',
    overflow: 'hidden' as const,
    transition: `opacity ${transitions.normal}, height ${transitions.normal}`,
    whiteSpace: 'nowrap' as const,
  },

  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: isCollapsed ? '0' : '14px',
    padding: isCollapsed
      ? '0'
      : `10px ${spacing.lg}`,
    margin: isCollapsed
      ? '4px auto'
      : `3px ${spacing.md}`,
    borderRadius: isCollapsed ? layout.borderRadius : layout.borderRadiusSm,
    color: colors.sidebarText,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    cursor: 'pointer',
    transition: `all ${transitions.fast}`,
    textDecoration: 'none',
    border: 'none',
    background: 'none',
    width: isCollapsed ? '44px' : `calc(100% - ${spacing['2xl']})`,
    height: isCollapsed ? '44px' : 'auto',
    justifyContent: isCollapsed ? 'center' : 'flex-start',
    textAlign: 'left' as const,
    position: 'relative' as const,
    lineHeight: typography.lineHeight.normal,
    flexShrink: 0,
  },

  menuItemActive: {
    backgroundColor: colors.sidebarActive,
    color: colors.sidebarTextActive,
  },

  menuItemHover: {
    backgroundColor: colors.sidebarHover,
    color: colors.sidebarTextHover,
  },

  // Icon wrapper — gets a vibrant background when active
  menuItemIcon: {
    width: '32px',
    height: '32px',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    transition: `all ${transitions.fast}`,
  },

  menuItemLabel: {
    opacity: isCollapsed ? 0 : 1,
    width: isCollapsed ? 0 : 'auto',
    transition: `opacity ${transitions.normal}`,
    whiteSpace: 'nowrap' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis' as const,
    flex: isCollapsed ? 0 : 1,
    textAlign: 'left' as const,
  },

  badge: {
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(167, 139, 250, 0.3))',
    color: '#C4B5FD',
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    padding: `3px ${spacing.sm}`,
    borderRadius: '10px',
    lineHeight: '1',
    minWidth: '22px',
    textAlign: 'center' as const,
    opacity: isCollapsed ? 0 : 1,
    width: isCollapsed ? 0 : 'auto',
    overflow: 'hidden' as const,
    transition: `opacity ${transitions.normal}`,
    border: '1px solid rgba(99, 102, 241, 0.15)',
  },

  activeIndicator: {
    position: 'absolute' as const,
    left: isCollapsed ? '50%' : '0',
    top: isCollapsed ? 'auto' : '50%',
    bottom: isCollapsed ? '-2px' : 'auto',
    transform: isCollapsed ? 'translateX(-50%)' : 'translateY(-50%)',
    width: isCollapsed ? '16px' : '3px',
    height: isCollapsed ? '3px' : '22px',
    background: `linear-gradient(180deg, #818CF8, ${colors.accent})`,
    borderRadius: isCollapsed ? '3px' : '0 4px 4px 0',
    boxShadow: '0 0 8px rgba(99, 102, 241, 0.5)',
  },

  // Children in expanded sidebar: indented via margin so highlight is narrower
  childItem: {
    marginLeft: isCollapsed ? '4px' : '40px',
    width: isCollapsed ? '44px' : `calc(100% - 52px)`,
    fontSize: typography.fontSize.base,
    padding: isCollapsed ? '0' : `8px ${spacing.md}`,
    borderRadius: '7px',
  },

  // Children in collapsed sidebar: smaller icon-only squares, offset right for indentation
  childItemCollapsed: {
    width: '36px',
    height: '36px',
    margin: '3px auto 3px auto',
    marginLeft: '24px',
    borderRadius: layout.borderRadiusSm,
  },

  // Thin divider line under children group in collapsed mode
  childrenDivider: {
    width: '28px',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.2), transparent)',
    margin: `${spacing.sm} auto`,
  },

  chevron: {
    width: '16px',
    height: '16px',
    flexShrink: 0,
    transition: `transform ${transitions.fast}`,
    opacity: isCollapsed ? 0 : 0.5,
  },

  chevronOpen: {
    transform: 'rotate(90deg)',
  },

  collapseButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: isCollapsed ? 'center' : 'flex-start',
    gap: spacing.md,
    padding: `${spacing.lg} ${spacing.xl}`,
    color: '#6E67A0',
    cursor: 'pointer',
    transition: `all ${transitions.fast}`,
    background: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: 'none',
    borderTop: `1px solid ${colors.sidebarDivider}`,
    width: '100%',
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    flexShrink: 0,
    textAlign: 'left' as const,
  },

  // Modern tooltip with arrow
  tooltip: {
    position: 'absolute' as const,
    left: 'calc(100% + 14px)',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'linear-gradient(135deg, #1E1B4B, #2E2A5E)',
    color: '#E0E7FF',
    padding: `8px 14px`,
    borderRadius: '10px',
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    whiteSpace: 'nowrap' as const,
    zIndex: 200,
    pointerEvents: 'none' as const,
    boxShadow: '0 8px 24px rgba(17, 14, 43, 0.4), 0 0 0 1px rgba(99, 102, 241, 0.1)',
    letterSpacing: '-0.01em',
    lineHeight: '1.4',
    border: '1px solid rgba(99, 102, 241, 0.15)',
  },

  tooltipArrow: {
    position: 'absolute' as const,
    left: 'calc(100% + 6px)',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 0,
    height: 0,
    borderTop: '6px solid transparent',
    borderBottom: '6px solid transparent',
    borderRight: '8px solid #1E1B4B',
    zIndex: 201,
    pointerEvents: 'none' as const,
  },
});
