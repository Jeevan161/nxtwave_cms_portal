import React from 'react';
import type { Toast } from './Toast.types';
import { toastStyles } from './Toast.styles';
import ToastItem from './ToastItem';

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
  onStartDismiss: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove, onStartDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div style={toastStyles.container}>
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={(id) => {
            if (toast.dismissing) {
              onRemove(id);
            } else {
              onStartDismiss(id);
            }
          }}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
