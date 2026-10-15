import { ClosingBanner } from "@/components/sections/closing-banner";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { HowToOrder } from "@/components/sections/how-to-order";
import { Story } from "@/components/sections/story";
import { ValuesBand } from "@/components/sections/values-band";
import { Collection } from "@/features/collection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValuesBand />
      <Collection />
      <Story />
      <HowToOrder />
      <Faq />
      <ClosingBanner />
    </>
  );
}
