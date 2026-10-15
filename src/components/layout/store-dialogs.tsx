"use client";

import { useCatalogue } from "@/features/catalogue";
import { ProductDialog, useCollectionFilter } from "@/features/collection";
import { EnquiryDialog } from "@/features/enquiry";
import { SearchDialog } from "@/features/search";
import { ShortlistDialog } from "@/features/shortlist";
import { useModal } from "@/providers/modal-provider";

/** Renders whichever storefront dialog is open. */
export function StoreDialogs() {
  const { modal } = useModal();
  const { findProduct } = useCatalogue();
  const { selectFilter } = useCollectionFilter();
  if (!modal) return null;
  switch (modal.kind) {
    case "search":
      return <SearchDialog />;
    case "shortlist":
      return <ShortlistDialog onExplore={() => selectFilter("all", true)} />;
    case "enquiry":
      return <EnquiryDialog />;
    case "product": {
      const product = findProduct(modal.productId);
      return product ? (
        <ProductDialog key={product.id} product={product} />
      ) : null;
    }
  }
}
