import { Collection } from "@/components/collection";
import {
  Hero,
  ValuesBand,
  Story,
  HowToOrder,
  FrequentlyAskedQuestions,
  ClosingBanner,
} from "@/components/content-sections";
import { IconSprite } from "@/components/icons";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StorefrontDialogs } from "@/components/storefront-dialogs";
import { StorefrontProvider } from "@/components/storefront-provider";

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <IconSprite />
      <StorefrontProvider>
        <SiteHeader />
        <main id="main">
          <Hero />
          <ValuesBand />
          <Collection />
          <Story />
          <HowToOrder />
          <FrequentlyAskedQuestions />
          <ClosingBanner />
        </main>
        <SiteFooter />
        <StorefrontDialogs />
      </StorefrontProvider>
    </>
  );
}
