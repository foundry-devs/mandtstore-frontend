"use client";

import { useEffect, useState } from "react";
import { IconButton } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { siteConfig } from "@/config/site";
import { useCollectionFilter } from "@/features/collection";
import { useShortlist } from "@/features/shortlist";
import { cn } from "@/lib/cn";
import { useModal } from "@/providers/modal-provider";
import { Brand } from "./brand";

const headerIconButton = "max-sm:h-9 max-sm:w-8.25 max-sm:[&_svg]:size-4.75";
const countBadge =
  "absolute top-0 -right-1 grid h-4 min-w-4 place-items-center rounded-full bg-wine px-0.75 text-[9px] leading-none text-white";

export function SiteHeader() {
  const { state, bagCount } = useShortlist();
  const { openModal } = useModal();
  const { selectFilter } = useCollectionFilter();
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
      <div className="flex h-8.75 items-center justify-between bg-wine px-14 text-[10px] tracking-[0.75px] text-[#f4ebe2] max-lg:px-8.75 max-md:px-5.5 max-md:text-[9px] max-sm:h-7.5 max-sm:justify-center max-sm:text-[8px] max-sm:tracking-[0.5px]">
        <span>Thoughtful finds, from India to Sri Lanka</span>
        <span className="flex items-center gap-3 max-sm:hidden">
          A little closer to lovely{" "}
          <span className="text-[18px]" aria-hidden="true">
            ✧
          </span>
        </span>
      </div>
      <header className="sticky top-0 z-20 border-b border-line bg-[rgba(250,247,241,0.97)]">
        <div className="page-wrap flex h-23.5 items-center justify-between max-md:h-20 max-sm:h-18.5">
          <Brand withCaption />
          <nav
            id="main-nav"
            aria-label="Main navigation"
            className={cn(
              "flex gap-8.5 pt-1 max-lg:gap-6.25 max-md:gap-5.25 max-sm:absolute max-sm:inset-x-0 max-sm:top-18.5 max-sm:flex-col max-sm:gap-0 max-sm:border-b max-sm:border-line max-sm:bg-cream max-sm:px-6.25 max-sm:pt-3.5 max-sm:pb-5.75 max-sm:shadow-[0_8px_15px_#32291b09]",
              !menuOpen && "max-sm:hidden",
            )}
          >
            {siteConfig.nav.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={cn(
                  "relative py-3.25 text-[12px] after:absolute after:inset-x-0 after:bottom-1.75 after:h-px after:origin-left after:scale-x-0 after:bg-wine after:transition-transform after:duration-200 hover:after:scale-x-100 max-md:text-[10px] max-sm:text-[13px] max-sm:after:hidden",
                  active === link.id && "after:scale-x-100",
                )}
                onClick={() => {
                  setActive(link.id);
                  setMenuOpen(false);
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex w-43.75 items-center justify-end gap-4 max-lg:gap-2 max-md:w-30 max-md:gap-0.75 max-sm:w-auto max-sm:gap-1.25 max-xs:gap-0.5">
            <IconButton
              className={headerIconButton}
              onClick={() => openModal({ kind: "search" })}
              aria-label="Search the collection"
            >
              <Icon name="search" />
            </IconButton>
            <IconButton
              className={cn(headerIconButton, "max-xs:hidden")}
              onClick={() => selectFilter("saved", true)}
              aria-label={`Show saved favourites, ${state.favourites.length} saved`}
            >
              <Icon name="heart" />
              <span className={countBadge} hidden={!state.favourites.length}>
                {state.favourites.length}
              </span>
            </IconButton>
            <IconButton
              className={headerIconButton}
              onClick={() => openModal({ kind: "shortlist" })}
              aria-label={`Open enquiry shortlist, ${bagCount} items`}
            >
              <Icon name="bag" />
              <span className={countBadge}>{bagCount}</span>
            </IconButton>
            <IconButton
              className={cn(headerIconButton, "hidden max-sm:inline-flex")}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="main-nav"
            >
              <Icon name="menu" />
            </IconButton>
          </div>
        </div>
      </header>
    </>
  );
}
