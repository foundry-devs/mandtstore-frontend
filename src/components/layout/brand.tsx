import { cn } from "@/lib/cn";

/** The M&T wordmark, linking back to the top of the page. */
export function Brand({
  withCaption = false,
  className,
}: {
  withCaption?: boolean;
  className?: string;
}) {
  return (
    <a
      href="#"
      aria-label="M and T home"
      className={cn(
        "block w-43.75 font-serif text-[48px] leading-[0.85] font-semibold tracking-[-3px] text-wine max-md:w-31.25 max-md:text-[41px] max-sm:w-auto max-sm:text-[39px]",
        className,
      )}
    >
      M
      <span className="mr-1 ml-0.5 text-[0.85em] font-normal tracking-[-5px] italic">
        &
      </span>
      T
      {withCaption && (
        <span className="mt-3 block font-sans text-[7px] leading-none font-[550] tracking-[1.8px] max-md:text-[6px] max-md:tracking-[1.1px] max-sm:mt-2.25 max-sm:text-[5.5px] max-sm:tracking-[1.25px]">
          THE LITTLE FINDS STORE
        </span>
      )}
    </a>
  );
}
