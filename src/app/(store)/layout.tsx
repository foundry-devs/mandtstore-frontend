import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { StoreDialogs } from "@/components/layout/store-dialogs";
import { StoreProviders } from "@/components/layout/store-providers";
import { IconSprite } from "@/components/ui/icon";
import { getProducts } from "@/features/catalogue";

export default async function StoreLayout({
  children,
}: {
  children: ReactNode;
}) {
  const products = await getProducts();
  return (
    <>
      <a
        href="#main"
        className="fixed -top-17.5 left-5 z-99 bg-wine px-5 py-3 text-white focus:top-2.5"
      >
        Skip to content
      </a>
      <IconSprite />
      <StoreProviders products={products}>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <StoreDialogs />
      </StoreProviders>
    </>
  );
}
