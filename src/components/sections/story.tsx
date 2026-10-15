import { buttonVariants } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";

export function Story() {
  return (
    <section
      className="relative overflow-hidden border-y border-[#e1d5ce] bg-rose"
      id="story"
      aria-labelledby="story-title"
    >
      <div className="page-wrap grid grid-cols-2 items-center gap-25 pt-16.5 pb-16.25 max-lg:gap-16.25 max-md:gap-11.25 max-md:py-12.5 max-sm:grid-cols-1 max-sm:gap-7.25 max-sm:py-10.75">
        <div>
          <Eyebrow>TWO PLACES. ONE LITTLE STORE.</Eyebrow>
          <h2
            id="story-title"
            className="relative mt-5.75 inline-block text-[70px] leading-[0.99] tracking-[-2px] text-wine max-lg:text-[63px] max-md:text-[58px] max-sm:mt-4.75 max-sm:text-[64px]"
          >
            From India,
            <br />
            <em>with love.</em>
            <span
              className="absolute top-3.75 -right-21 font-sans text-[53px] font-normal text-[#bd8e7d] max-lg:-right-14.75 max-lg:text-[44px] max-md:top-0.5 max-md:-right-11 max-md:text-[33px] max-sm:top-1.5 max-sm:-right-20.25 max-sm:text-[49px] max-xs:-right-15.75 max-xs:text-[39px]"
              aria-hidden="true"
            >
              ✳
            </span>
          </h2>
          <div className="mt-7.75 flex items-center gap-3.75 text-[9px] tracking-[2px] text-wine max-sm:mt-6 max-sm:text-[8px]">
            <span>INDIA</span>
            <span
              className="flex items-center gap-1.75 text-[15px] text-[#a87869]"
              aria-hidden="true"
            >
              ✧{" "}
              <i className="h-px w-16.5 bg-[repeating-linear-gradient(to_right,#b59688_0px,#b59688_3px,transparent_3px,transparent_6px)]" />{" "}
              →
            </span>
            <span>SRI LANKA</span>
          </div>
        </div>
        <div className="max-w-101.25 max-sm:max-w-full">
          <h3 className="mb-4.75 font-serif text-[31px] leading-[1.15] tracking-[-0.3px] max-md:text-[27px] max-sm:text-[30px]">
            Good finds have a way
            <br />
            of making a day feel better.
          </h3>
          <div className="text-[12px] leading-[1.9] text-[#77665d] max-md:text-[11px] [&>p]:mb-3.25">
            <p>
              A favourite outfit. A finishing touch. Something lovely for your
              home. We believe the little things deserve a little attention.
            </p>
            <p>
              M&T brings goods sourced in India to shoppers in Sri Lanka. A
              small store with a simple idea: bring the things you love a little
              closer.
            </p>
          </div>
          <a
            href="#how-to-order"
            className={cn(
              buttonVariants({ variant: "link" }),
              "mt-1.5 max-sm:text-[10px]",
            )}
          >
            A little about how we work <Icon name="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
