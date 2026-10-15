"use client";

import { siteConfig } from "@/config/site";
import {
  useCollectionFilter,
  type CollectionFilter,
} from "@/features/collection";
import { Brand } from "./brand";

const heading =
  "mb-4.5 font-sans text-[10px] font-[550] text-[#ffefe4] max-sm:mb-3.5";
const link = "my-2.25 block text-[11px] text-[#cab5ae] hover:text-white";

const shopLinks: { filter: CollectionFilter; label: string }[] = [
  { filter: "Clothing", label: "Clothing" },
  { filter: "accessories-all", label: "Accessories & jewellery" },
  { filter: "Home & living", label: "Home & living" },
];

export function SiteFooter() {
  const { selectFilter } = useCollectionFilter();
  return (
    <footer className="bg-wine-dark pt-11.75 text-[#f3e9df] max-sm:pt-8.25">
      <div className="page-wrap grid grid-cols-[1.5fr_1fr_1.15fr_1fr] gap-8.75 pb-11 max-lg:gap-5 max-md:grid-cols-[1.3fr_1fr_1.2fr] max-sm:grid-cols-2 max-sm:gap-x-6.25 max-sm:gap-y-7.5 max-sm:pb-7.25">
        <div className="max-sm:col-span-full max-sm:flex max-sm:items-start max-sm:justify-between max-sm:gap-7.5 max-xs:gap-5">
          <Brand className="text-[62px]/[0.85] text-[#f2e8dd] max-md:text-[62px]/[0.85] max-sm:text-[56px]/[0.85]" />
          <p className="mt-6 text-[11px] leading-[1.8] text-[#cbb6ae] max-sm:mt-0 max-sm:text-[9px]">
            {siteConfig.tagline}
            <br />
            From India to Sri Lanka, with love.
          </p>
        </div>
        <div>
          <h3 className={heading}>Take a look</h3>
          {siteConfig.nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={link}>
              {item.label}
            </a>
          ))}
        </div>
        <div>
          <h3 className={heading}>Find your favourite</h3>
          {shopLinks.map((item) => (
            <a
              key={item.filter}
              href="#collection"
              className={link}
              onClick={() => selectFilter(item.filter)}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="max-md:col-span-full max-md:flex max-md:justify-between max-md:gap-7.5 max-md:border-t max-md:border-[#fff2] max-md:pt-5.5 max-sm:block">
          <h3 className={`${heading} max-md:mb-0 max-sm:mb-3.5`}>
            A little note
          </h3>
          <p className="text-[11px] leading-[1.85] text-[#cab5ae] max-md:max-w-62.5 max-sm:mt-2.5 max-sm:max-w-none">
            Our storefront is taking shape.
            <br className="max-md:hidden" />
            Ordering contact details
            <br className="max-md:hidden" />
            are coming soon.
          </p>
          <span className="mt-4.75 block text-[8px] tracking-[1.5px] text-[#dec8ba] max-md:mt-0 max-md:whitespace-nowrap max-sm:mt-4.5">
            INDIA <span className="mx-2.25">→</span> SRI LANKA
          </span>
        </div>
      </div>
      <div className="page-wrap flex justify-between gap-5 border-t border-[#ffffff20] pt-4.25 pb-5.5 text-[9px] text-[#c4a9a0] max-sm:flex-wrap max-sm:gap-3 max-sm:text-[8px]">
        <span>© 2026 M&T. All the little things.</span>
        <span className="max-sm:order-3 max-sm:basis-full">
          Catalogue preview · Illustrative products & photography
        </span>
        <a href="#" className="text-[#efdcd1]">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
