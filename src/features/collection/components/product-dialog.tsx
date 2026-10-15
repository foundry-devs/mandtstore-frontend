"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogTitle } from "@/components/ui/dialog";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon } from "@/components/ui/icon";
import { ProductPhoto, type Product } from "@/features/catalogue";
import { maxQuantity, useShortlist } from "@/features/shortlist";
import { useModal } from "@/providers/modal-provider";

export function ProductDialog({ product }: { product: Product }) {
  const { state, isFavourite, addItem, toggleFavourite } = useShortlist();
  const { openModal, closeModal } = useModal();
  const saved = isFavourite(product.id);
  const quantity = state.bag[product.id] ?? 0;
  return (
    <Dialog
      labelledBy="product-detail-title"
      onClose={closeModal}
      className="w-212.5 overflow-auto p-0 max-sm:w-100"
    >
      <DialogClose
        label="Close product details"
        className="absolute top-3 right-3 z-2 bg-[#fffdf6df]"
      />
      <div className="grid grid-cols-2 max-sm:grid-cols-1">
        <div className="min-h-112.5 max-sm:aspect-[1.15] max-sm:min-h-0">
          <ProductPhoto product={product} />
        </div>
        <div className="px-7.5 pt-12.5 pb-7.5 max-sm:p-6.5">
          <Eyebrow>{product.category.toUpperCase()} · SAMPLE STYLE</Eyebrow>
          <DialogTitle
            id="product-detail-title"
            className="my-3.5 text-[43px] max-sm:text-[36px]"
          >
            {product.name}
          </DialogTitle>
          <p className="mb-5.25 text-[12px] text-wine max-sm:mb-3">
            Price on enquiry · LKR
          </p>
          <p className="mb-6.25 text-[12px] leading-[1.9] text-muted max-sm:mb-4.75">
            {product.description}
          </p>
          <Button
            className="w-full"
            onClick={() => addItem(product.id)}
            disabled={quantity >= maxQuantity}
          >
            {quantity ? "Add another to my list" : "Add to my shortlist"}
            <Icon name="plus" />
          </Button>
          <Button
            variant="link"
            className="mx-auto mt-4 flex"
            onClick={() => openModal({ kind: "shortlist" })}
          >
            View my shortlist{" "}
            <span aria-live="polite">
              {quantity > 0 && `(${quantity} of this style)`}
            </span>
            <Icon name="arrow" />
          </Button>
          <Button
            variant="link"
            className="mx-auto mt-4 flex"
            onClick={() => toggleFavourite(product.id)}
            aria-pressed={saved}
          >
            <Icon name="heart" />
            {saved ? "Saved to favourites" : "Save for later"}
          </Button>
          <p className="mt-5.5 border-t border-line pt-5 text-[10px] text-muted max-sm:mt-4.25">
            <strong className="font-medium text-wine">A little note</strong>
            <br />
            This is an illustrative style and image. Ask M&T to confirm the
            actual product, materials, sizes, price, and availability. Adding it
            to your list does not place an order.
          </p>
        </div>
      </div>
    </Dialog>
  );
}
