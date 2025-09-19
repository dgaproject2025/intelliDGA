import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

const ToastCtx = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const push = useCallback(
    (message, opts = {}) => {
      const id =
        (globalThis.crypto && crypto.randomUUID && crypto.randomUUID()) ||
        String(Date.now() + Math.random());
      const toast = {
        id,
        message,
        type: opts.type || 'info', // "success" | "error" | "info" | "warning"
        duration: opts.duration ?? 3000, // ms
      };
      setToasts((t) => [...t, toast]);
      if (toast.duration > 0) {
        setTimeout(() => remove(id), toast.duration);
      }
      return id;
    },
    [remove]
  );

  const api = useMemo(
    () => ({
      show: (msg, o) => push(msg, o),
      success: (msg, o) => push(msg, { ...o, type: 'success' }),
      error: (msg, o) => push(msg, { ...o, type: 'error' }),
      info: (msg, o) => push(msg, { ...o, type: 'info' }),
      warn: (msg, o) => push(msg, { ...o, type: 'warning' }),
      close: remove,
    }),
    [push, remove]
  );

  return (
    <ToastCtx.Provider value={api}>
      {children}
      {createPortal(
        <div className="fixed bottom-4 left-4 z-[9999] space-y-2">
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onClose={() => remove(t.id)} />
          ))}
        </div>,
        document.body
      )}
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider/>');
  return ctx;
}

function ToastItem({ toast, onClose }) {
  const base =
    'px-4 py-2 rounded-lg shadow-lg text-white animate-fade-in flex items-start gap-3';
  const badge = 'mt-0.5 inline-block h-2.5 w-2.5 rounded-full';
  const styles = {
    success: { box: 'bg-green-600', dot: 'bg-green-300' },
    error: { box: 'bg-red-600', dot: 'bg-red-300' },
    info: { box: 'bg-sky-600', dot: 'bg-sky-300' },
    warning: { box: 'bg-amber-600', dot: 'bg-amber-300' },
  };
  const s = styles[toast.type] || styles.info;

  return (
    <div className={`${base} ${s.box}`}>
      <span className={`${badge} ${s.dot}`} />
      <span className="whitespace-pre-wrap">{toast.message}</span>
      <button
        onClick={onClose}
        className="ml-2 opacity-75 hover:opacity-100"
        aria-label="Close"
        title="Close"
      >
        ×
      </button>
    </div>
  );
}
