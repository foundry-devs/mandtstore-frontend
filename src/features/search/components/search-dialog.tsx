"use client";

import { useState } from "react";
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Icon } from "@/components/ui/icon";
import { ProductPhoto, useCatalogue } from "@/features/catalogue";
import { useModal } from "@/providers/modal-provider";
import { searchProducts } from "../search";

export function SearchDialog() {
  const [query, setQuery] = useState("");
  const { products } = useCatalogue();
  const { openModal, closeModal } = useModal();
  const results = searchProducts(products, query);
  return (
    <Dialog
      labelledBy="search-title"
      onClose={closeModal}
      className="w-160 max-sm:p-6"
    >
      <DialogHeader eyebrow="FIND SOMETHING LOVELY" />
      <DialogTitle id="search-title">What catches your eye?</DialogTitle>
      <label className="flex items-center gap-3 border-b border-[#baa398] py-3">
        <Icon name="search" className="size-4.75 text-muted" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try kurta, jewellery, home…"
          aria-label="Search products"
          autoComplete="off"
          autoFocus
          className="w-full min-w-0 bg-transparent p-1.25 text-[15px] text-ink max-sm:text-[13px]"
        />
      </label>
      <p className="my-3.75 text-[10px] text-muted" aria-live="polite">
        {results.length} {results.length === 1 ? "find" : "finds"}
        {query.trim() ? " matching your search" : " to explore"}
      </p>
      <div className="grid max-h-[46dvh] gap-2 overflow-auto">
        {results.length ? (
          results.map((product) => (
            <button
              type="button"
              key={product.id}
              className="flex w-full items-center gap-4.5 bg-[#f0eae1] p-2 text-left hover:bg-[#e9e0d5]"
              onClick={() =>
                openModal({ kind: "product", productId: product.id })
              }
            >
              <ProductPhoto
                product={product}
                className="size-17 shrink-0 max-sm:size-15"
              />
              <span>
                <span className="block font-serif text-[23px] leading-[1.1] max-sm:text-[21px]">
                  {product.name}
                </span>
                <span className="mt-1.25 block text-[10px] text-muted">
                  {product.category} · Price on enquiry
                </span>
              </span>
              <Icon name="arrow" className="mr-1.75 ml-auto size-4.5" />
            </button>
          ))
        ) : (
          <EmptyState title="No little finds just yet.">
            <p>Try “kurta”, “bag”, “jewellery”, or “home”.</p>
          </EmptyState>
        )}
      </div>
    </Dialog>
  );
}
