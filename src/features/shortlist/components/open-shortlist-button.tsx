"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useModal } from "@/providers/modal-provider";

export function OpenShortlistButton({
  children,
  variant = "link",
  className,
}: {
  children: ReactNode;
  variant?: "primary" | "link";
  className?: string;
}) {
  const { openModal } = useModal();
  return (
    <Button
      variant={variant}
      className={className}
      onClick={() => openModal({ kind: "shortlist" })}
    >
      {children}
    </Button>
  );
}
