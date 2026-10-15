"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type Notify = (message: string) => void;
const ToastContext = createContext<Notify | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ message: string; key: number } | null>(
    null,
  );
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);
  const notify = useCallback<Notify>(
    (message) =>
      setToast((previous) => ({ message, key: (previous?.key ?? 0) + 1 })),
    [],
  );
  return (
    <ToastContext.Provider value={notify}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "pointer-events-none fixed bottom-6.25 left-1/2 z-100 max-w-[calc(100vw-32px)] -translate-x-1/2 translate-y-3.75 bg-wine px-5.5 py-3.25 text-center text-[11px] text-[#fff9ef] opacity-0 shadow-[0_5px_25px_#38152025] transition-[opacity,translate] duration-200 max-sm:bottom-3.75 max-sm:w-max max-sm:px-4.5 max-sm:py-3 max-sm:text-[10px]",
          toast && "translate-y-0 opacity-100",
        )}
      >
        {toast?.message}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const notify = useContext(ToastContext);
  if (!notify) throw new Error("useToast requires <ToastProvider>.");
  return notify;
}
