import { Eyebrow } from "@/components/ui/eyebrow";
import { Icon } from "@/components/ui/icon";
import { OpenShortlistButton } from "@/features/shortlist";

export function ClosingBanner() {
  return (
    <section className="border-y border-[#dfdfcb] bg-[#ecebdc]">
      <div className="page-wrap flex items-center gap-6.25 py-9 max-md:gap-4.5 max-sm:grid max-sm:grid-cols-[35px_1fr] max-sm:gap-x-3.5 max-sm:gap-y-5 max-sm:py-7.5">
        <span
          className="text-[65px] leading-none font-normal text-[#8b8962] max-md:text-[47px] max-sm:text-[38px]"
          aria-hidden="true"
        >
          ✳
        </span>
        <div>
          <Eyebrow className="max-sm:text-[7px]">
            SOMETHING CAUGHT YOUR EYE?
          </Eyebrow>
          <h2 className="mt-1.25 text-[40px] tracking-[-1px] text-wine max-md:text-[34px] max-sm:text-[33px] max-xs:text-[28px]">
            Start a lovely little list.
          </h2>
        </div>
        <OpenShortlistButton
          variant="primary"
          className="ml-auto max-md:gap-3.75 max-md:px-4 max-md:text-[10px] max-sm:col-span-full max-sm:ml-12.25 max-sm:w-max"
        >
          Open my shortlist <Icon name="diagonal" />
        </OpenShortlistButton>
      </div>
    </section>
  );
}
