import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** Small uppercase label shown above headings. */
export function Eyebrow({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "text-[9px] leading-[1.6] font-semibold tracking-[2px] text-wine max-sm:text-[8px] max-sm:tracking-[1.5px]",
        className,
      )}
      {...props}
    />
  );
}
