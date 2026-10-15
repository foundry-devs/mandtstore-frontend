import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";

export function Hero() {
  return (
    <section
      className="page-wrap grid grid-cols-[1fr_1.04fr] items-center gap-13.25 pt-13.25 pb-11.5 max-lg:gap-8.75 max-md:gap-6.25 max-md:pt-10.75 max-sm:grid-cols-1 max-sm:gap-7.25 max-sm:pt-9 max-sm:pb-7 xl:gap-20 xl:pt-16 xl:pb-13.75"
      aria-labelledby="hero-title"
    >
      <div>
        <Eyebrow className="flex items-center gap-2.5 max-md:text-[7px] max-md:tracking-[1.5px] max-sm:text-[8px] max-sm:tracking-[1.6px]">
          <span className="h-px w-6.5 bg-[#a57a64]" /> FROM INDIA, WITH LOVE
        </Eyebrow>
        <h1
          id="hero-title"
          className="my-6.5 text-[clamp(64px,6.6vw,94px)] leading-[0.99] font-medium tracking-[-3.7px] text-wine max-lg:text-[74px] max-md:text-[clamp(51px,7.7vw,63px)] max-md:tracking-[-2.7px] max-sm:my-5 max-sm:text-[73px] max-sm:tracking-[-3px] max-xs:text-[63px] xl:text-[101px]"
        >
          Little finds.
          <br />
          <em>Lovely</em> living.
        </h1>
        <p className="max-w-92 text-[13px] leading-[1.9] text-muted max-lg:text-[12px] max-sm:max-w-80">
          A touch of colour. A little everyday joy.
          <br className="max-md:hidden" /> Discover lovely finds from India,
          brought closer to home in Sri Lanka.
        </p>
        <div className="mt-7.75 flex flex-wrap items-center gap-6 max-lg:gap-4.5 max-md:mt-6 max-md:gap-3.25 max-sm:gap-6 max-xs:gap-4.5">
          <a
            href="#collection"
            className={cn(
              buttonVariants(),
              "max-lg:px-4.5 max-lg:text-[10px] max-sm:min-h-12 max-sm:px-5.25 max-sm:py-3.25 max-xs:px-4 max-xs:text-[9px]",
            )}
          >
            Explore the collection <Icon name="diagonal" />
          </a>
          <a
            href="#story"
            className={cn(
              buttonVariants({ variant: "link" }),
              "max-md:text-[10px] max-sm:text-[11px]",
            )}
          >
            Meet M&T <span aria-hidden="true">→</span>
          </a>
        </div>
        <div className="mt-10.25 flex items-center gap-3 text-[10px] leading-[1.6] text-muted max-md:mt-7 max-md:text-[9px] max-sm:hidden">
          <span
            className="text-[33px] leading-none text-[#ac7669]"
            aria-hidden="true"
          >
            ✳
          </span>
          <span>
            For your wardrobe, your home,
            <br />
            and all the little moments in between.
          </span>
        </div>
      </div>
      <div className="relative min-w-0 pt-2 max-sm:mx-auto max-sm:w-[calc(100%-10px)] max-sm:pt-1">
        <div
          className="pointer-events-none absolute inset-[-3px_10px_28px_-12px] -rotate-2 rounded-[190px_190px_4px_4px] border border-[#d2beb0] max-sm:inset-[-5px_8px_24px_-8px] max-sm:rounded-[160px_160px_3px_3px]"
          aria-hidden="true"
        />
        <div className="group/photo relative aspect-[1.055] overflow-hidden rounded-[180px_180px_4px_4px] bg-[#e6c6ab] after:pointer-events-none after:absolute after:inset-[55%_0_0] after:bg-[linear-gradient(transparent,rgba(30,20,13,0.6))] max-lg:aspect-[0.92] max-md:aspect-[0.78] max-md:rounded-[150px_150px_3px_3px] max-sm:aspect-[1.12] max-sm:rounded-[140px_140px_3px_3px] xl:aspect-[1.08]">
          <Image
            src="/assets/hero.webp"
            alt="Illustrative boutique campaign: a woman wearing a sage floral kurta in a sunlit Indian courtyard"
            width={1536}
            height={1024}
            preload
            sizes="(max-width: 600px) 100vw, 50vw"
            className="object-[60%_50%] transition-transform duration-1000 group-hover/photo:scale-[1.025] max-sm:object-[60%_46%]"
          />
          <div className="absolute right-6.5 bottom-6.25 left-7.25 z-1 flex items-end justify-between text-white max-md:right-4.5 max-md:bottom-5 max-md:left-5 max-sm:inset-x-5.75 max-sm:bottom-5.75">
            <div>
              <span className="text-[8px] tracking-[2px] max-md:text-[7px]">
                THE EVERYDAY EDIT
              </span>
              <p className="mt-1.75 font-serif text-[29px] leading-[1.06] max-md:text-[25px] max-sm:text-[26px]">
                A little colour.
                <br />A lot of character.
              </p>
            </div>
            <a
              href="#collection"
              className="flex size-9.75 items-center justify-center rounded-full border border-[#fff8] text-white hover:bg-[#fff3] max-md:size-7.75"
              aria-label="Discover the everyday edit"
            >
              <Icon name="diagonal" className="size-4.75" />
            </a>
          </div>
        </div>
        <div
          className="absolute top-5 -right-6.25 flex size-26.5 rotate-[11deg] flex-col items-center justify-center gap-1.5 rounded-full bg-[#ece8d9] text-wine shadow-[0_0_0_5px_var(--color-cream)] after:absolute after:inset-1.5 after:rounded-full after:border after:border-dashed after:border-[#a8987f] max-lg:-right-3.75 max-lg:size-22.5 max-md:top-4 max-md:-right-2.5 max-md:size-19.75 max-md:gap-0.75 max-sm:top-2.5 max-sm:-right-2.25 max-sm:size-20.5 max-xs:size-18.5"
          aria-label="The M and T edit"
        >
          <span className="text-[7px] tracking-[1.6px] max-lg:text-[6px] max-md:text-[5px] max-sm:text-[5.5px]">
            THE M&T EDIT
          </span>
          <Icon name="flower" className="size-6.75 stroke-1 max-md:size-5.5" />
          <em className="font-serif text-[12px] max-md:text-[10px]">
            lovely little finds
          </em>
        </div>
        <div className="mt-4.25 flex justify-between gap-3.75 font-serif text-[11px] text-muted italic max-sm:mt-3.25 max-sm:text-[10px]">
          A mood, a moment, a little inspiration.{" "}
          <span className="pt-0.75 font-sans text-[7px] tracking-[1px] not-italic max-lg:hidden max-sm:block max-sm:text-[5.5px] max-xs:hidden">
            01 / THE EVERYDAY EDIT
          </span>
        </div>
      </div>
    </section>
  );
}
