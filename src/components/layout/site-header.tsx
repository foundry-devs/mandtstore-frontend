"use client";

import { useEffect, useState } from "react";
import { Icon } from "./icons";
import { useStorefront } from "./storefront-provider";

export function SiteHeader() {
  const { state, bagCount, openModal, selectFilter } = useStorefront();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("collection");
  useEffect(() => {
    if (!menuOpen) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [menuOpen]);
  return (
    <>
      <div className="announcement">
        <span>Thoughtful finds, from India to Sri Lanka</span>
        <span className="announcement-mark">
          A little closer to lovely <span aria-hidden="true">✧</span>
        </span>
      </div>
      <header className="site-header">
        <div className="header-inner wrap">
          <a className="brand" href="#" aria-label="M and T home">
            M<span>&</span>T
            <span className="brand-caption">THE LITTLE FINDS STORE</span>
          </a>
          <nav
            className={`main-nav${menuOpen ? " open" : ""}`}
            id="main-nav"
            aria-label="Main navigation"
          >
            {[
              { id: "collection", label: "The collection" },
              { id: "story", label: "Our story" },
              { id: "how-to-order", label: "How to order" },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={active === link.id ? "active" : ""}
                onClick={() => {
                  setActive(link.id);
                  setMenuOpen(false);
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button
              type="button"
              className="icon-button"
              onClick={() => openModal({ kind: "search" })}
              aria-label="Search the collection"
            >
              <Icon name="search" />
            </button>
            <button
              type="button"
              className="icon-button saved-header"
              onClick={() => selectFilter("saved", true)}
              aria-label={`Show saved favourites, ${state.favourites.length} saved`}
            >
              <Icon name="heart" />
              <span
                className="saved-count count"
                hidden={!state.favourites.length}
              >
                {state.favourites.length}
              </span>
            </button>
            <button
              type="button"
              className="icon-button bag-button"
              onClick={() => openModal({ kind: "shortlist" })}
              aria-label={`Open enquiry shortlist, ${bagCount} items`}
            >
              <Icon name="bag" />
              <span className="bag-count count">{bagCount}</span>
            </button>
            <button
              type="button"
              className="icon-button menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="main-nav"
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
