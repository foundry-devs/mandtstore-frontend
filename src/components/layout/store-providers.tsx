"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { findProduct, type CollectionFilter } from "@/lib/catalogue";
import {
  emptyShoppingState,
  parseShoppingState,
  shoppingReducer,
  storageKey,
  type ShoppingState,
} from "@/lib/shopping-state";

export type StoreModal =
  | { kind: "search" | "shortlist" | "enquiry" }
  | { kind: "product"; productId: string };
interface StorefrontContextValue {
  state: ShoppingState;
  filter: CollectionFilter;
  modal: StoreModal | null;
  bagCount: number;
  storageAvailable: boolean;
  openModal: (modal: StoreModal) => void;
  closeModal: () => void;
  selectFilter: (filter: CollectionFilter, scroll?: boolean) => void;
  toggleFavourite: (id: string) => void;
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  setNotes: (notes: string) => void;
}
const StorefrontContext = createContext<StorefrontContextValue | null>(null);

export function StorefrontProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(shoppingReducer, emptyShoppingState);
  const [hydrated, setHydrated] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);
  const [filter, setFilter] = useState<CollectionFilter>("all");
  const [modal, setModal] = useState<StoreModal | null>(null);
  const [toast, setToast] = useState<{ message: string; key: number } | null>(
    null,
  );

  // The server and first client render both start empty, preventing hydration mismatches.
  useEffect(() => {
    try {
      dispatch({
        type: "restore",
        state: parseShoppingState(window.localStorage.getItem(storageKey)),
      });
    } catch {
      setStorageAvailable(false);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      setStorageAvailable(false);
    }
  }, [state, hydrated]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const notify = useCallback(
    (message: string) =>
      setToast((previous) => ({ message, key: (previous?.key ?? 0) + 1 })),
    [],
  );
  const openModal = useCallback((value: StoreModal) => setModal(value), []);
  const closeModal = useCallback(() => setModal(null), []);
  const selectFilter = useCallback(
    (value: CollectionFilter, scroll = false) => {
      setFilter(value);
      if (scroll)
        document.getElementById("collection")?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
        });
    },
    [],
  );

  const value: StorefrontContextValue = {
    state,
    filter,
    modal,
    storageAvailable,
    bagCount: Object.values(state.bag).reduce(
      (total, quantity) => total + quantity,
      0,
    ),
    openModal,
    closeModal,
    selectFilter,
    toggleFavourite(id) {
      if (!findProduct(id)) return;
      notify(
        state.favourites.includes(id)
          ? "Removed from your favourites"
          : "Saved to your favourites",
      );
      dispatch({ type: "toggle-favourite", id });
    },
    addItem(id) {
      const product = findProduct(id);
      if (!product) return;
      if ((state.bag[id] ?? 0) >= 99) {
        notify("Maximum quantity is 99 per style");
        return;
      }
      dispatch({ type: "add", id });
      notify(`${product.name} added to your list`);
    },
    removeItem(id) {
      dispatch({ type: "remove", id });
      notify("Removed from your shortlist");
    },
    setQuantity(id, quantity) {
      dispatch({ type: "quantity", id, quantity });
    },
    setNotes(notes) {
      dispatch({ type: "notes", notes });
    },
  };

  return (
    <StorefrontContext.Provider value={value}>
      {children}
      <div
        id="toast"
        className={`toast${toast ? " visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {toast?.message}
      </div>
    </StorefrontContext.Provider>
  );
}

export function useStorefront() {
  const context = useContext(StorefrontContext);
  if (!context)
    throw new Error("Storefront components require StorefrontProvider.");
  return context;
}
