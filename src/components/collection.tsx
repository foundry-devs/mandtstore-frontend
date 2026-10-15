"use client";

import { collectionFilters, filterProducts } from "@/lib/catalogue";
import { Icon } from "./icons";
import { ProductCard } from "./product-card";
import { useStorefront } from "./storefront-provider";

export function Collection() {
  const { state, filter, selectFilter } = useStorefront();
  const visibleProducts = filterProducts(filter, state.favourites);
  return (
    <section
      className="collection wrap"
      id="collection"
      aria-labelledby="collection-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">A FEW THINGS TO FALL FOR</p>
          <h2 id="collection-title">
            Your next little <em>favourite.</em>
          </h2>
        </div>
        <button
          type="button"
          className="text-link all-finds-button"
          onClick={() => selectFilter("all")}
        >
          View all finds <Icon name="arrow" />
        </button>
      </div>
      <div className="collection-controls">
        <div className="filter-tabs" aria-label="Filter collection">
          {collectionFilters.map((item) => (
            <button
              type="button"
              key={item.value}
              className={`filter${filter === item.value ? " active" : ""}`}
              aria-pressed={filter === item.value}
              onClick={() => selectFilter(item.value)}
            >
              {item.value === "saved" && <Icon name="heart" />}
              {item.label}
            </button>
          ))}
        </div>
        <span className="collection-count" aria-live="polite">
          {visibleProducts.length} little{" "}
          {visibleProducts.length === 1 ? "find" : "finds"}
        </span>
      </div>
      <div className="product-grid">
        {visibleProducts.length ? (
          visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="empty-state">
            <Icon name="heart" />
            <h3>A little room for your favourites.</h3>
            <p>Tap the heart on anything that catches your eye.</p>
            <button
              type="button"
              className="text-link"
              onClick={() => selectFilter("all")}
            >
              Explore all finds <Icon name="arrow" />
            </button>
          </div>
        )}
      </div>
      <div className="collection-disclaimer">
        <span className="status-dot" />
        <p>
          A first look at the M&T style. These are illustrative products; final
          stock and prices will be confirmed.
        </p>
      </div>
      <noscript>
        <p className="empty-state">
          The sample collection is shown above. Enable JavaScript to search,
          save favourites, and prepare an enquiry.
        </p>
      </noscript>
    </section>
  );
}
