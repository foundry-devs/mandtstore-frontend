"use client";

import type { Product } from "@/lib/catalogue";
import { Icon } from "./icons";
import { ProductPhoto } from "./product-photo";
import { useStorefront } from "./storefront-provider";

export function ProductCard({ product }: { product: Product }) {
  const { state, openModal, toggleFavourite, addItem } = useStorefront();
  const saved = state.favourites.includes(product.id);
  const view = () => openModal({ kind: "product", productId: product.id });
  return (
    <article className="product-card">
      <div className="product-image">
        <button
          type="button"
          className="product-image-link"
          onClick={view}
          aria-label={`View ${product.name}`}
        >
          <ProductPhoto product={product} />
        </button>
        <span className="product-label">SAMPLE STYLE</span>
        <button
          type="button"
          className={`favorite-button${saved ? " selected" : ""}`}
          onClick={() => toggleFavourite(product.id)}
          aria-label={`${saved ? "Unsave" : "Save"} ${product.name}`}
          aria-pressed={saved}
        >
          <Icon name="heart" />
        </button>
      </div>
      <div className="product-meta">
        <p className="product-category">{product.category.toUpperCase()}</p>
        <h3>
          <button type="button" className="product-name" onClick={view}>
            {product.name}
          </button>
        </h3>
        <p className="product-price">Price on enquiry</p>
        <button
          type="button"
          className="quick-add"
          onClick={() => addItem(product.id)}
          aria-label={`Add ${product.name} to enquiry shortlist`}
        >
          <Icon name="plus" />
        </button>
      </div>
    </article>
  );
}
