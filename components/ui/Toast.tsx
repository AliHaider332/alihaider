// components/ui/Toast.tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi';

export type ToastKind = 'success' | 'error';
export interface ToastData {
  id: number;
  kind: ToastKind;
  message: string;
}

interface ToastProps {
  toast: ToastData | null;
  onClose: () => void;
  duration?: number;
}

const Toast = ({ toast, onClose, duration = 4000 }: ToastProps) => {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [toast, duration, onClose]);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 top-6 z-[100] flex justify-center px-4 sm:justify-end sm:pr-6"
    >
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className={`pointer-events-auto flex items-center gap-3 rounded-xl border
                       px-4 py-3 shadow-lg backdrop-blur-md
                       ${
                         toast.kind === 'success'
                           ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                           : 'border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400'
                       }`}
          >
            {toast.kind === 'success' ? (
              <FiCheckCircle aria-hidden size={18} />
            ) : (
              <FiAlertCircle aria-hidden size={18} />
            )}
            <span className="font-roboto-slab text-sm font-medium">
              {toast.message}
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Dismiss notification"
              className="ml-1 rounded p-0.5 opacity-70 transition-opacity hover:opacity-100
                         focus-visible:outline-none focus-visible:ring-2
                         focus-visible:ring-current/40"
            >
              <FiX size={14} aria-hidden />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Toast;