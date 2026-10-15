import { Icon, type IconName } from "@/components/ui/icon";

const values: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "box",
    title: "Sourced in India",
    text: "Brought closer to Sri Lanka",
  },
  {
    icon: "flower",
    title: "Little things, lovely living",
    text: "Style for you and your space",
  },
  {
    icon: "heart",
    title: "A personal way to shop",
    text: "Find it. Save it. Ask us about it.",
  },
];

export function ValuesBand() {
  return (
    <section
      className="border-y border-line bg-[#f4f0e8]"
      aria-label="The M and T approach"
    >
      <div className="page-wrap grid grid-cols-3 py-6.5 max-md:py-5.75 max-sm:grid-cols-1 max-sm:py-2.25">
        {values.map((value) => (
          <div
            key={value.title}
            className="flex items-center justify-center gap-4 border-r border-[#d9d1c6] first:justify-start first:pl-3 last:border-0 max-lg:gap-3 max-md:gap-2.5 max-md:first:pl-0 max-sm:justify-start max-sm:gap-4.25 max-sm:border-r-0 max-sm:border-b max-sm:border-b-[#ded8cd] max-sm:px-2.5 max-sm:py-3.5 max-sm:first:pl-2.5 max-xs:py-3"
          >
            <Icon
              name={value.icon}
              className="size-7.25 stroke-[1.1] text-[#835749] max-md:size-5.75 max-sm:size-6.25"
            />
            <p className="flex flex-col max-sm:flex-row max-sm:flex-wrap max-sm:items-baseline max-sm:gap-2.25 max-xs:flex-col max-xs:gap-0.75">
              <strong className="text-[11px] font-[550] tracking-[0.15px] max-md:text-[9px] max-sm:text-[11px]">
                {value.title}
              </strong>
              <span className="mt-0.75 text-[10px] text-muted max-md:text-[8px] max-sm:m-0 max-sm:text-[9px]">
                {value.text}
              </span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
