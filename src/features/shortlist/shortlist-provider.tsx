"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { useToast } from "@/components/ui/toast";
import { useCatalogue } from "@/features/catalogue";
import {
  countItems,
  createShortlistReducer,
  emptyShortlistState,
  maxQuantity,
  parseShortlistState,
  storageKey,
  type ShortlistAction,
  type ShortlistState,
} from "./state";

interface ShortlistContextValue {
  state: ShortlistState;
  bagCount: number;
  storageAvailable: boolean;
  isFavourite: (id: string) => boolean;
  toggleFavourite: (id: string) => void;
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  setNotes: (notes: string) => void;
}
const ShortlistContext = createContext<ShortlistContextValue | null>(null);

/** Shortlist plus the status of its browser storage. */
interface Store {
  shortlist: ShortlistState;
  hydrated: boolean;
  storageAvailable: boolean;
}
type StoreAction =
  | ShortlistAction
  /** shortlist is null when browser storage could not be read. */
  | { type: "hydrate"; shortlist: ShortlistState | null }
  | { type: "storage-failed" };
const initialStore: Store = {
  shortlist: emptyShortlistState,
  hydrated: false,
  storageAvailable: true,
};

/** Favourites, the enquiry bag and notes, saved in this browser. */
export function ShortlistProvider({ children }: { children: ReactNode }) {
  const { findProduct } = useCatalogue();
  const notify = useToast();
  const isKnownProduct = useCallback(
    (id: string) => !!findProduct(id),
    [findProduct],
  );
  const reducer = useMemo(() => {
    const shortlistReducer = createShortlistReducer(isKnownProduct);
    return (store: Store, action: StoreAction): Store => {
      switch (action.type) {
        case "hydrate":
          return {
            shortlist: action.shortlist ?? store.shortlist,
            hydrated: true,
            storageAvailable: action.shortlist !== null,
          };
        case "storage-failed":
          return { ...store, storageAvailable: false };
        default:
          return {
            ...store,
            shortlist: shortlistReducer(store.shortlist, action),
          };
      }
    };
  }, [isKnownProduct]);
  const [{ shortlist: state, hydrated, storageAvailable }, dispatch] =
    useReducer(reducer, initialStore);

  // The server and first client render both start empty, preventing hydration mismatches.
  useEffect(() => {
    let saved: ShortlistState | null;
    try {
      saved = parseShortlistState(
        window.localStorage.getItem(storageKey),
        isKnownProduct,
      );
    } catch {
      saved = null;
    }
    dispatch({ type: "hydrate", shortlist: saved });
  }, [isKnownProduct]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      dispatch({ type: "storage-failed" });
    }
  }, [state, hydrated]);

  const value: ShortlistContextValue = {
    state,
    bagCount: countItems(state.bag),
    storageAvailable,
    isFavourite: (id) => state.favourites.includes(id),
    toggleFavourite(id) {
      if (!isKnownProduct(id)) return;
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
      if ((state.bag[id] ?? 0) >= maxQuantity) {
        notify(`Maximum quantity is ${maxQuantity} per style`);
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
    <ShortlistContext.Provider value={value}>
      {children}
    </ShortlistContext.Provider>
  );
}

export function useShortlist() {
  const context = useContext(ShortlistContext);
  if (!context) throw new Error("useShortlist requires <ShortlistProvider>.");
  return context;
}
