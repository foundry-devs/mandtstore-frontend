"use client";

import type { ReactNode } from "react";
import { useStorefront } from "./storefront-provider";

export function ShortlistButton({
  children,
  className = "text-link",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { openModal } = useStorefront();
  return (
    <button
      type="button"
      className={className}
      onClick={() => openModal({ kind: "shortlist" })}
    >
      {children}
    </button>
  );
}
