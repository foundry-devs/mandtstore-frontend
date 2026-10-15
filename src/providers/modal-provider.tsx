"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type StoreModal =
  | { kind: "search" | "shortlist" | "enquiry" }
  | { kind: "product"; productId: string };

interface ModalContextValue {
  modal: StoreModal | null;
  openModal: (modal: StoreModal) => void;
  closeModal: () => void;
}
const ModalContext = createContext<ModalContextValue | null>(null);

/** Which storefront dialog is open. One at a time. */
export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<StoreModal | null>(null);
  const value = useMemo(
    () => ({ modal, openModal: setModal, closeModal: () => setModal(null) }),
    [modal],
  );
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal requires <ModalProvider>.");
  return context;
}
