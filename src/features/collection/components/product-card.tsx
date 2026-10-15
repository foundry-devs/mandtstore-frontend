"use client";

import { Icon } from "@/components/ui/icon";
import { ProductPhoto, type Product } from "@/features/catalogue";
import { useShortlist } from "@/features/shortlist";
import { cn } from "@/lib/cn";
import { useModal } from "@/providers/modal-provider";

export function ProductCard({ product }: { product: Product }) {
  const { isFavourite, toggleFavourite, addItem } = useShortlist();
  const { openModal } = useModal();
  const saved = isFavourite(product.id);
  const view = () => openModal({ kind: "product", productId: product.id });
  return (
    <article className="group/card min-w-0">
      <div className="relative aspect-[0.815] overflow-hidden bg-[#e8e2d9] max-md:aspect-[0.97] max-sm:aspect-[0.84]">
        <button
          type="button"
          className="absolute inset-0 block size-full"
          onClick={view}
          aria-label={`View ${product.name}`}
        >
          <ProductPhoto product={product} />
        </button>
        <span className="pointer-events-none absolute top-3 left-3 bg-[#fffaf1d9] px-2 py-1.25 text-[7px] tracking-[1px] max-sm:top-2 max-sm:left-2 max-sm:px-1.25 max-sm:py-1 max-sm:text-[5.5px] max-sm:tracking-[0.7px]">
          SAMPLE STYLE
        </span>
        <button
          type="button"
          className="absolute top-2.25 right-2.5 grid size-8 place-items-center rounded-full bg-[#fffdf3ce] text-wine hover:bg-paper max-sm:top-1.5 max-sm:right-1.5 max-sm:size-6.75"
          onClick={() => toggleFavourite(product.id)}
          aria-label={`${saved ? "Unsave" : "Save"} ${product.name}`}
          aria-pressed={saved}
        >
          <Icon
            name="heart"
            className={cn("size-4 max-sm:size-3.25", saved && "fill-wine")}
          />
        </button>
      </div>
      <div className="relative mt-4.25 pr-10 max-lg:pr-8.25 max-sm:mt-3.25 max-sm:pr-6.25 max-xs:pr-5.75">
        <p className="mb-1.5 text-[9px] tracking-[1.5px] text-muted max-sm:mb-1.25 max-sm:text-[8px] max-sm:tracking-[1px]">
          {product.category.toUpperCase()}
        </p>
        {/* Matches the browser default h3 size the layout was designed with. */}
        <h3 className="text-[1.17em]">
          <button
            type="button"
            className="text-left font-serif text-[24px] leading-[1.1] tracking-[-0.5px] hover:text-wine max-lg:text-[22px] max-md:text-[26px] max-sm:text-[21px] max-sm:leading-[1.04] max-xs:text-[19px]"
            onClick={view}
          >
            {product.name}
          </button>
        </h3>
        <p className="mt-2 text-[11px] text-[#76655d] max-sm:text-[10px]">
          Price on enquiry
        </p>
        <button
          type="button"
          className="absolute right-0 bottom-0 grid size-8 place-items-center rounded-full border border-[#cebbb0] text-wine transition-[background-color] duration-200 hover:bg-wine hover:text-white max-sm:size-6.25"
          onClick={() => addItem(product.id)}
          aria-label={`Add ${product.name} to enquiry shortlist`}
        >
          <Icon name="plus" className="size-3.75 max-sm:size-3.25" />
        </button>
      </div>
    </article>
  );
}
