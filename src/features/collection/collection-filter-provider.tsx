"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { scrollBehavior } from "@/lib/motion";
import type { CollectionFilter } from "./filters";

export const collectionSectionId = "collection";

interface CollectionFilterContextValue {
  filter: CollectionFilter;
  /** Changes the filter; optionally scrolls the collection into view. */
  selectFilter: (filter: CollectionFilter, scroll?: boolean) => void;
}
const CollectionFilterContext =
  createContext<CollectionFilterContextValue | null>(null);

export function CollectionFilterProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [filter, setFilter] = useState<CollectionFilter>("all");
  const selectFilter = useCallback(
    (value: CollectionFilter, scroll = false) => {
      setFilter(value);
      if (scroll)
        document
          .getElementById(collectionSectionId)
          ?.scrollIntoView({ behavior: scrollBehavior() });
    },
    [],
  );
  const value = useMemo(
    () => ({ filter, selectFilter }),
    [filter, selectFilter],
  );
  return (
    <CollectionFilterContext.Provider value={value}>
      {children}
    </CollectionFilterContext.Provider>
  );
}

export function useCollectionFilter() {
  const context = useContext(CollectionFilterContext);
  if (!context)
    throw new Error("useCollectionFilter requires <CollectionFilterProvider>.");
  return context;
}
