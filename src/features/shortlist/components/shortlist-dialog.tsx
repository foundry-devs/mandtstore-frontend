"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Icon } from "@/components/ui/icon";
import { ProductPhoto, useCatalogue, type Product } from "@/features/catalogue";
import { useModal } from "@/providers/modal-provider";
import { maxNotesLength, maxQuantity } from "../state";
import { useShortlist } from "../shortlist-provider";

/** Slide-in panel listing the enquiry shortlist. */
export function ShortlistDialog({ onExplore }: { onExplore: () => void }) {
  const { products } = useCatalogue();
  const { state, storageAvailable, setNotes } = useShortlist();
  const { openModal, closeModal } = useModal();
  const selected = products.filter((product) => state.bag[product.id]);
  return (
    <Dialog
      labelledBy="bag-title"
      onClose={closeModal}
      className="m-0 ml-auto h-dvh max-h-dvh w-113.75 max-w-[100vw] overflow-y-auto border-0 border-l border-line max-sm:w-screen max-sm:p-6.25"
    >
      <DialogHeader eyebrow="YOUR ENQUIRY SHORTLIST" />
      <DialogTitle
        id="bag-title"
        className="mb-3.5 text-[48px] leading-[1.02] max-sm:text-[45px]"
      >
        Your lovely
        <br />
        <em>little list.</em>
      </DialogTitle>
      <p className="text-[11px] text-muted">
        A few things you’d like to know more about.
      </p>
      {!storageAvailable && (
        <p
          className="mt-4 bg-rose p-3 text-[11px] leading-[1.7] text-wine"
          role="status"
        >
          Your browser has blocked saved storage. This list will last only while
          this page stays open.
        </p>
      )}
      <div className="my-6.5">
        {selected.length ? (
          selected.map((product) => (
            <ShortlistItem key={product.id} product={product} />
          ))
        ) : (
          <div className="bg-[#f0e9df] px-3.5 py-9.5 text-center">
            <Icon name="bag" className="mb-3 size-9.25 text-[#b2907b]" />
            <h3 className="mb-3 font-serif text-[29px]">
              Room for a little lovely.
            </h3>
            <p className="mb-5.5 text-[11px] text-muted">
              See something you like? Tap the + on a product to start your
              enquiry list.
            </p>
            <Button
              onClick={() => {
                closeModal();
                onExplore();
              }}
            >
              Explore the collection <Icon name="arrow" />
            </Button>
          </div>
        )}
      </div>
      {selected.length > 0 && (
        <div>
          <label
            className="my-2.5 flex justify-between gap-2.5 text-[10px]"
            htmlFor="enquiry-notes"
          >
            Anything else on your mind?{" "}
            <span className="text-[9px] text-muted">Optional</span>
          </label>
          <textarea
            id="enquiry-notes"
            maxLength={maxNotesLength}
            rows={3}
            placeholder="Preferred colours, sizes, or a question…"
            value={state.notes}
            onChange={(event) => setNotes(event.target.value)}
            className="mb-4 w-full border border-[#d7cbbd] bg-paper p-3 text-[11px] leading-[1.7]"
          />
          <Button
            className="w-full"
            onClick={() => openModal({ kind: "enquiry" })}
          >
            Prepare my enquiry <Icon name="arrow" />
          </Button>
          <p className="mt-3.25 text-center text-[9px] leading-[1.8] text-muted">
            This is a saved list, not an order. Prices and availability need
            confirmation. No message is sent from this site.
          </p>
        </div>
      )}
    </Dialog>
  );
}

function ShortlistItem({ product }: { product: Product }) {
  const { state, setQuantity, removeItem } = useShortlist();
  const quantity = state.bag[product.id];
  return (
    <article className="flex gap-3.75 border-b border-line py-5 first:pt-0">
      <ProductPhoto product={product} className="h-25 w-21.25 shrink-0" />
      <div className="min-w-0 flex-1">
        <h3 className="mt-1 font-serif text-[22px] leading-[1.1]">
          {product.name}
        </h3>
        <p className="mt-1.25 text-[9px] text-muted">
          Sample style · Price to be confirmed
        </p>
        <div className="mt-3 flex items-center justify-between gap-2.5">
          <div
            className="flex items-center border border-[#d4c8ba] [&_button]:size-6.75 [&_button]:text-[15px]"
            role="group"
            aria-label={`Quantity for ${product.name}`}
          >
            <button
              type="button"
              onClick={() => setQuantity(product.id, quantity - 1)}
              disabled={quantity <= 1}
              aria-label={`Reduce quantity of ${product.name}`}
            >
              −
            </button>
            <span
              className="min-w-6.75 text-center text-[10px]"
              aria-live="polite"
              aria-label={`Quantity ${quantity}`}
            >
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(product.id, quantity + 1)}
              disabled={quantity >= maxQuantity}
              aria-label={`Increase quantity of ${product.name}`}
            >
              +
            </button>
          </div>
          <button
            type="button"
            className="py-1.5 text-[9px] text-muted underline"
            onClick={() => removeItem(product.id)}
            aria-label={`Remove ${product.name}`}
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}
