import type { CSSProperties } from 'react';
import { theme } from '../../styles/GlobalStyles';
import type { ToastType } from './Toast.types';

const { typography, spacing, layout } = theme;

const colorMap: Record<ToastType, { bg: string; border: string; icon: string; text: string }> = {
  success: {
    bg: '#F0FDF4',
    border: '#BBF7D0',
    icon: '#10B981',
    text: '#166534',
  },
  error: {
    bg: '#FEF2F2',
    border: '#FECACA',
    icon: '#EF4444',
    text: '#991B1B',
  },
  warning: {
    bg: '#FFFBEB',
    border: '#FDE68A',
    icon: '#F59E0B',
    text: '#92400E',
  },
  info: {
    bg: '#EEF2FF',
    border: '#C7D2FE',
    icon: '#6366F1',
    text: '#3730A3',
  },
};

export const getToastColors = (type: ToastType) => colorMap[type];

export const toastStyles: Record<string, CSSProperties> = {
  container: {
    position: 'fixed',
    top: spacing.xl,
    right: spacing.xl,
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
    pointerEvents: 'none',
  },

  item: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    padding: `${spacing.md} ${spacing.lg}`,
    borderRadius: layout.borderRadius,
    border: '1px solid',
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.medium,
    fontFamily: typography.fontFamily,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06)',
    pointerEvents: 'auto',
    minWidth: '300px',
    maxWidth: '440px',
    animationDuration: '300ms',
    animationFillMode: 'forwards',
    animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },

  iconCircle: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: '#FFFFFF',
    fontSize: '12px',
    fontWeight: 700,
  },

  message: {
    flex: 1,
    lineHeight: typography.lineHeight.normal,
  },

  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    fontSize: '16px',
    lineHeight: 1,
    color: 'inherit',
    opacity: 0.4,
    transition: 'opacity 150ms ease',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
