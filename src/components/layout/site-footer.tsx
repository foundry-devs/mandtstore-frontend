"use client";

import { useStorefront } from "./storefront-provider";

export function SiteFooter() {
  const { selectFilter } = useStorefront();
  return (
    <footer className="site-footer">
      <div className="footer-main wrap">
        <div className="footer-brand">
          <a className="brand" href="#" aria-label="M and T home">
            M<span>&</span>T
          </a>
          <p>
            Little finds. Lovely living.
            <br />
            From India to Sri Lanka, with love.
          </p>
        </div>
        <div>
          <h3>Take a look</h3>
          <a href="#collection">The collection</a>
          <a href="#story">Our story</a>
          <a href="#how-to-order">How to order</a>
        </div>
        <div>
          <h3>Find your favourite</h3>
          <a href="#collection" onClick={() => selectFilter("Clothing")}>
            Clothing
          </a>
          <a href="#collection" onClick={() => selectFilter("accessories-all")}>
            Accessories & jewellery
          </a>
          <a href="#collection" onClick={() => selectFilter("Home & living")}>
            Home & living
          </a>
        </div>
        <div className="footer-contact">
          <h3>A little note</h3>
          <p>
            Our storefront is taking shape.
            <br />
            Ordering contact details
            <br />
            are coming soon.
          </p>
          <span className="footer-tag">
            INDIA <span>→</span> SRI LANKA
          </span>
        </div>
      </div>
      <div className="footer-bottom wrap">
        <span>© 2026 M&T. All the little things.</span>
        <span>Catalogue preview · Illustrative products & photography</span>
        <a href="#">Back to top ↑</a>
      </div>
    </footer>
  );
}
