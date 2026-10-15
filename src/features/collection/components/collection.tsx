"use client";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon } from "@/components/ui/icon";
import { useCatalogue } from "@/features/catalogue";
import { useShortlist } from "@/features/shortlist";
import { cn } from "@/lib/cn";
import {
  collectionSectionId,
  useCollectionFilter,
} from "../collection-filter-provider";
import { collectionFilters, filterProducts } from "../filters";
import { ProductCard } from "./product-card";

export function Collection() {
  const { products } = useCatalogue();
  const { state } = useShortlist();
  const { filter, selectFilter } = useCollectionFilter();
  const visibleProducts = filterProducts(products, filter, state.favourites);
  return (
    <section
      className="page-wrap pt-18 pb-17.5 max-md:py-13 max-sm:py-10.75"
      id={collectionSectionId}
      aria-labelledby="collection-title"
    >
      <div className="mb-6.5 flex items-end justify-between gap-5 max-sm:mb-5.75">
        <div>
          <Eyebrow>A FEW THINGS TO FALL FOR</Eyebrow>
          <h2
            id="collection-title"
            className="mt-2.5 max-md:text-[43px] max-sm:max-w-72.5 max-sm:text-[39px] max-sm:leading-[1.03]"
          >
            Your next little <em>favourite.</em>
          </h2>
        </div>
        <Button
          variant="link"
          className="mb-1.5 whitespace-nowrap max-sm:hidden"
          onClick={() => selectFilter("all")}
        >
          View all finds <Icon name="arrow" />
        </Button>
      </div>
      <div className="mb-7 flex items-center justify-between gap-5 max-md:items-start max-md:gap-2 max-sm:mb-5.5">
        <div
          className="flex flex-wrap gap-2 max-sm:gap-1.5"
          aria-label="Filter collection"
        >
          {collectionFilters.map((item) => (
            <button
              type="button"
              key={item.value}
              className={cn(
                "rounded-[30px] border border-[#ddd5cb] px-3.75 py-2 text-[11px] whitespace-nowrap transition-all duration-200 hover:border-wine max-md:px-3.25 max-sm:px-2.75 max-sm:py-1.75 max-sm:text-[10px]",
                filter === item.value && "border-wine bg-wine text-white",
              )}
              aria-pressed={filter === item.value}
              onClick={() => selectFilter(item.value)}
            >
              {item.value === "saved" && (
                <Icon name="heart" className="mr-1.25 size-3 align-[-2px]" />
              )}
              {item.label}
            </button>
          ))}
        </div>
        <span
          className="text-[9px] whitespace-nowrap text-muted max-md:hidden"
          aria-live="polite"
        >
          {visibleProducts.length} little{" "}
          {visibleProducts.length === 1 ? "find" : "finds"}
        </span>
      </div>
      <div className="grid grid-cols-4 gap-5.25 max-lg:gap-3.75 max-md:grid-cols-2 max-md:gap-x-4.5 max-md:gap-y-8 max-sm:gap-x-3.25 max-sm:gap-y-6.25">
        {visibleProducts.length ? (
          visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <EmptyState
            icon={<Icon name="heart" className="size-8 text-[#ac8779]" />}
            title="A little room for your favourites."
          >
            <p>Tap the heart on anything that catches your eye.</p>
            <Button
              variant="link"
              className="mt-3.75"
              onClick={() => selectFilter("all")}
            >
              Explore all finds <Icon name="arrow" />
            </Button>
          </EmptyState>
        )}
      </div>
      <div className="mt-8 flex items-center justify-center gap-2 text-[10px] text-muted max-sm:mt-6.75 max-sm:items-start max-sm:justify-start max-sm:text-[9px]">
        <span className="inline-block size-1.25 shrink-0 rounded-full bg-[#a18d72] max-sm:mt-1.25" />
        <p>
          A first look at the M&T style. These are illustrative products; final
          stock and prices will be confirmed.
        </p>
      </div>
      <noscript>
        <EmptyState>
          The sample collection is shown above. Enable JavaScript to search,
          save favourites, and prepare an enquiry.
        </EmptyState>
      </noscript>
    </section>
  );
}
