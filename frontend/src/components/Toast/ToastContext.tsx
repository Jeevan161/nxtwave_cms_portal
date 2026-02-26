import React, { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react';
import type { Toast, ToastOptions, ToastContextValue } from './Toast.types';
import ToastContainer from './ToastContainer';

const ToastContext = createContext<ToastContextValue | null>(null);

let idCounter = 0;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const removeToast = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const startDismiss = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, dismissing: true } : t))
    );
  }, []);

  const addToast = useCallback((options: ToastOptions) => {
    const id = `toast-${++idCounter}`;
    const duration = options.duration ?? 5000;

    const toast: Toast = {
      id,
      type: options.type,
      message: options.message,
      duration,
      dismissing: false,
    };

    setToasts((prev) => [...prev, toast]);

    if (duration > 0) {
      const timer = setTimeout(() => {
        startDismiss(id);
      }, duration);
      timersRef.current.set(id, timer);
    }
  }, [startDismiss]);

  // Cleanup all timers on unmount
  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    };
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer
        toasts={toasts}
        onRemove={removeToast}
        onStartDismiss={startDismiss}
      />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
