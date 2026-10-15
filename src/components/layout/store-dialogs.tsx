"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  findProduct,
  products,
  searchProducts,
  type Product,
} from "@/lib/catalogue";
import { buildEnquiry } from "@/lib/shopping-state";
import { Icon } from "./icons";
import { ProductPhoto } from "./product-photo";
import { useStorefront } from "./storefront-provider";

function CloseButton({ label = "Close dialog" }: { label?: string }) {
  const { closeModal } = useStorefront();
  return (
    <button
      type="button"
      className="icon-button"
      onClick={closeModal}
      aria-label={label}
    >
      <Icon name="close" />
    </button>
  );
}

function Dialog({
  className,
  labelledBy,
  children,
}: {
  className: string;
  labelledBy: string;
  children: ReactNode;
}) {
  const reference = useRef<HTMLDialogElement>(null);
  const { closeModal } = useStorefront();
  useEffect(() => {
    const dialog = reference.current;
    if (!dialog) return;
    dialog.showModal();
    document.body.classList.add("modal-open");
    return () => {
      dialog.close();
      document.body.classList.remove("modal-open");
    };
  }, []);
  return (
    <dialog
      ref={reference}
      className={className}
      aria-labelledby={labelledBy}
      onCancel={(event) => {
        event.preventDefault();
        closeModal();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          closeModal();
      }}
    >
      {children}
    </dialog>
  );
}

function DialogHeading({ eyebrow }: { eyebrow: string }) {
  return (
    <div className="dialog-header">
      <p className="eyebrow">{eyebrow}</p>
      <CloseButton />
    </div>
  );
}

function SearchDialog() {
  const [query, setQuery] = useState("");
  const { openModal } = useStorefront();
  const results = searchProducts(query);
  return (
    <Dialog className="search-dialog" labelledBy="search-title">
      <DialogHeading eyebrow="FIND SOMETHING LOVELY" />
      <h2 id="search-title">What catches your eye?</h2>
      <label className="search-field">
        <Icon name="search" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try kurta, jewellery, home…"
          aria-label="Search products"
          autoComplete="off"
          autoFocus
        />
      </label>
      <p className="search-result-count" aria-live="polite">
        {results.length} {results.length === 1 ? "find" : "finds"}
        {query.trim() ? " matching your search" : " to explore"}
      </p>
      <div className="search-results">
        {results.length ? (
          results.map((product) => (
            <button
              type="button"
              key={product.id}
              className="search-result"
              onClick={() =>
                openModal({ kind: "product", productId: product.id })
              }
            >
              <ProductPhoto product={product} />
              <span>
                <span className="search-product-name">{product.name}</span>
                <span className="search-product-info">
                  {product.category} · Price on enquiry
                </span>
              </span>
              <Icon name="arrow" />
            </button>
          ))
        ) : (
          <div className="empty-state">
            <h3>No little finds just yet.</h3>
            <p>Try “kurta”, “bag”, “jewellery”, or “home”.</p>
          </div>
        )}
      </div>
    </Dialog>
  );
}

function ProductDialog({ product }: { product: Product }) {
  const { state, openModal, closeModal, addItem, toggleFavourite } =
    useStorefront();
  const saved = state.favourites.includes(product.id);
  const quantity = state.bag[product.id] ?? 0;
  return (
    <Dialog className="product-dialog" labelledBy="product-detail-title">
      <button
        type="button"
        className="icon-button product-close"
        onClick={closeModal}
        aria-label="Close product details"
      >
        <Icon name="close" />
      </button>
      <div className="product-detail-inner">
        <div className="product-detail-image">
          <ProductPhoto product={product} />
        </div>
        <div className="product-detail-copy">
          <p className="eyebrow">
            {product.category.toUpperCase()} · SAMPLE STYLE
          </p>
          <h2 id="product-detail-title">{product.name}</h2>
          <p className="detail-price">Price on enquiry · LKR</p>
          <p className="detail-description">{product.description}</p>
          <button
            type="button"
            className="button button-primary full-width"
            onClick={() => addItem(product.id)}
            disabled={quantity >= 99}
          >
            {quantity ? "Add another to my list" : "Add to my shortlist"}
            <Icon name="plus" />
          </button>
          <button
            type="button"
            className="text-link"
            onClick={() => openModal({ kind: "shortlist" })}
          >
            View my shortlist{" "}
            <span aria-live="polite">
              {quantity > 0 && `(${quantity} of this style)`}
            </span>
            <Icon name="arrow" />
          </button>
          <button
            type="button"
            className="text-link"
            onClick={() => toggleFavourite(product.id)}
            aria-pressed={saved}
          >
            <Icon name="heart" />
            {saved ? "Saved to favourites" : "Save for later"}
          </button>
          <p className="detail-note">
            <strong>A little note</strong>
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

function ShortlistDialog() {
  const {
    state,
    storageAvailable,
    openModal,
    closeModal,
    selectFilter,
    setQuantity,
    removeItem,
    setNotes,
  } = useStorefront();
  const selected = products.filter((product) => state.bag[product.id]);
  return (
    <Dialog className="bag-dialog" labelledBy="bag-title">
      <DialogHeading eyebrow="YOUR ENQUIRY SHORTLIST" />
      <h2 id="bag-title">
        Your lovely
        <br />
        <em>little list.</em>
      </h2>
      <p className="bag-intro">A few things you’d like to know more about.</p>
      {!storageAvailable && (
        <p className="storage-notice" role="status">
          Your browser has blocked saved storage. This list will last only while
          this page stays open.
        </p>
      )}
      <div className="bag-items">
        {selected.length ? (
          selected.map((product) => (
            <article key={product.id} className="bag-item">
              <ProductPhoto product={product} />
              <div className="bag-item-content">
                <h3>{product.name}</h3>
                <p>Sample style · Price to be confirmed</p>
                <div className="item-controls">
                  <div
                    className="quantity-control"
                    role="group"
                    aria-label={`Quantity for ${product.name}`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity(product.id, state.bag[product.id] - 1)
                      }
                      disabled={state.bag[product.id] <= 1}
                      aria-label={`Reduce quantity of ${product.name}`}
                    >
                      −
                    </button>
                    <span
                      aria-live="polite"
                      aria-label={`Quantity ${state.bag[product.id]}`}
                    >
                      {state.bag[product.id]}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity(product.id, state.bag[product.id] + 1)
                      }
                      disabled={state.bag[product.id] >= 99}
                      aria-label={`Increase quantity of ${product.name}`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => removeItem(product.id)}
                    aria-label={`Remove ${product.name}`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="bag-empty">
            <Icon name="bag" />
            <h3>Room for a little lovely.</h3>
            <p>
              See something you like? Tap the + on a product to start your
              enquiry list.
            </p>
            <button
              type="button"
              className="button button-primary"
              onClick={() => {
                closeModal();
                selectFilter("all", true);
              }}
            >
              Explore the collection <Icon name="arrow" />
            </button>
          </div>
        )}
      </div>
      {selected.length > 0 && (
        <div>
          <label className="note-label" htmlFor="enquiry-notes">
            Anything else on your mind? <span>Optional</span>
          </label>
          <textarea
            id="enquiry-notes"
            maxLength={1000}
            rows={3}
            placeholder="Preferred colours, sizes, or a question…"
            value={state.notes}
            onChange={(event) => setNotes(event.target.value)}
          />
          <button
            type="button"
            className="button button-primary full-width"
            onClick={() => openModal({ kind: "enquiry" })}
          >
            Prepare my enquiry <Icon name="arrow" />
          </button>
          <p className="bag-disclaimer">
            This is a saved list, not an order. Prices and availability need
            confirmation. No message is sent from this site.
          </p>
        </div>
      )}
    </Dialog>
  );
}

function EnquiryDialog() {
  const { state, openModal } = useStorefront();
  const [copyStatus, setCopyStatus] = useState("");
  const reference = useRef<HTMLTextAreaElement>(null);
  const message = buildEnquiry(state);
  async function copy() {
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(message);
      setCopyStatus(
        "Copied. Your message is ready to share; nothing has been sent.",
      );
    } catch {
      reference.current?.focus();
      reference.current?.select();
      setCopyStatus(
        "The message is selected. Use your device’s Copy option (Ctrl+C or ⌘C).",
      );
    }
  }
  return (
    <Dialog className="enquiry-dialog" labelledBy="enquiry-title">
      <DialogHeading eyebrow="ONE LITTLE STEP CLOSER" />
      <h2 id="enquiry-title">Your message is ready.</h2>
      <p>
        Copy this list to share with M&T once their ordering contact is
        available. Nothing has been sent.
      </p>
      <label className="sr-only" htmlFor="enquiry-message">
        Enquiry message
      </label>
      <textarea
        id="enquiry-message"
        rows={11}
        readOnly
        ref={reference}
        value={message}
      />
      <button
        type="button"
        className="button button-primary full-width"
        onClick={copy}
      >
        <Icon name="copy" />
        Copy enquiry
      </button>
      <p className="copy-status" role="status">
        {copyStatus}
      </p>
      <button
        type="button"
        className="text-link"
        onClick={() => openModal({ kind: "shortlist" })}
      >
        ← Back to my list
      </button>
    </Dialog>
  );
}

export function StorefrontDialogs() {
  const { modal } = useStorefront();
  if (!modal) return null;
  switch (modal.kind) {
    case "search":
      return <SearchDialog />;
    case "shortlist":
      return <ShortlistDialog />;
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
