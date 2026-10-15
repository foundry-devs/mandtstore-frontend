import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** Shared button styles; also apply them to links with buttonVariants(). */
export const buttonVariants = cva("[&_svg]:size-4.25", {
  variants: {
    variant: {
      primary:
        "inline-flex min-h-12.25 items-center justify-center gap-6 border border-transparent bg-wine px-5.75 py-3.5 text-[11px] font-medium text-[#fffaf4] transition-[background-color,translate] duration-200 hover:-translate-y-px hover:bg-wine-dark",
      link: "inline-flex items-center gap-3 border-b border-[#94777a] py-1.75 text-[11px] leading-[1.5] font-[550] text-wine hover:text-[#a1565f]",
    },
  },
  defaultVariants: { variant: "primary" },
});

export function Button({
  variant,
  className,
  type = "button",
  ...props
}: ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  );
}

export function IconButton({
  className,
  type = "button",
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      type={type}
      className={cn(
        "relative inline-flex h-10 w-9.5 shrink-0 items-center justify-center rounded-full text-ink hover:bg-[#ece4db] max-md:w-8.25 [&_svg]:size-5.25",
        className,
      )}
      {...props}
    />
  );
}
