import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function EmptyState({
  icon,
  title,
  children,
  className,
}: {
  icon?: ReactNode;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "col-span-full border border-line px-6.25 py-11.25 text-center text-[13px] text-muted",
        className,
      )}
    >
      {icon}
      {title && (
        <h3 className="my-2.5 font-serif text-[29px] leading-normal font-normal text-wine">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
