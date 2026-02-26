export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
  dismissing: boolean;
}

export interface ToastOptions {
  type: ToastType;
  message: string;
  /** Auto-dismiss duration in ms. Default 5000. Set 0 to disable. */
  duration?: number;
}

export interface ToastContextValue {
  addToast: (options: ToastOptions) => void;
}
