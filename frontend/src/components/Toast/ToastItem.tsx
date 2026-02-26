import React, { useState } from 'react';
import type { Toast } from './Toast.types';
import { toastStyles, getToastColors } from './Toast.styles';

const iconSymbol: Record<string, string> = {
  success: '✓',
  error: '!',
  warning: '!',
  info: 'i',
};

interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  const [isHoveredClose, setIsHoveredClose] = useState(false);
  const colors = getToastColors(toast.type);

  const handleAnimationEnd = () => {
    if (toast.dismissing) {
      onDismiss(toast.id);
    }
  };

  return (
    <div
      style={{
        ...toastStyles.item,
        backgroundColor: colors.bg,
        borderColor: colors.border,
        color: colors.text,
        animationName: toast.dismissing ? 'toastSlideOut' : 'toastSlideIn',
      }}
      onAnimationEnd={handleAnimationEnd}
    >
      <div
        style={{
          ...toastStyles.iconCircle,
          backgroundColor: colors.icon,
        }}
      >
        {iconSymbol[toast.type]}
      </div>

      <span style={toastStyles.message}>{toast.message}</span>

      <button
        onClick={() => onDismiss(toast.id)}
        style={{
          ...toastStyles.closeBtn,
          opacity: isHoveredClose ? 0.7 : 0.4,
        }}
        onMouseEnter={() => setIsHoveredClose(true)}
        onMouseLeave={() => setIsHoveredClose(false)}
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  );
};

export default ToastItem;
