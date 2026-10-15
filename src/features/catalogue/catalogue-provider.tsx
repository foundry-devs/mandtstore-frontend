"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Product } from "./types";

interface CatalogueContextValue {
  products: readonly Product[];
  findProduct: (id: string) => Product | undefined;
}
const CatalogueContext = createContext<CatalogueContextValue | null>(null);

/** Makes server-loaded products available to client components. */
export function CatalogueProvider({
  products,
  children,
}: {
  products: readonly Product[];
  children: ReactNode;
}) {
  const value = useMemo(() => {
    const byId = new Map(products.map((product) => [product.id, product]));
    return { products, findProduct: (id: string) => byId.get(id) };
  }, [products]);
  return (
    <CatalogueContext.Provider value={value}>
      {children}
    </CatalogueContext.Provider>
  );
}

export function useCatalogue() {
  const context = useContext(CatalogueContext);
  if (!context) throw new Error("useCatalogue requires <CatalogueProvider>.");
  return context;
}
