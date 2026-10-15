"use client";

import type { ReactNode } from "react";
import { ToastProvider } from "@/components/ui/toast";
import { CatalogueProvider, type Product } from "@/features/catalogue";
import { CollectionFilterProvider } from "@/features/collection";
import { ShortlistProvider } from "@/features/shortlist";
import { ModalProvider } from "@/providers/modal-provider";

/** All client-side state for the storefront, outermost first. */
export function StoreProviders({
  products,
  children,
}: {
  products: readonly Product[];
  children: ReactNode;
}) {
  return (
    <CatalogueProvider products={products}>
      <ToastProvider>
        <ShortlistProvider>
          <CollectionFilterProvider>
            <ModalProvider>{children}</ModalProvider>
          </CollectionFilterProvider>
        </ShortlistProvider>
      </ToastProvider>
    </CatalogueProvider>
  );
}
