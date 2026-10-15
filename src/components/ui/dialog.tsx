"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ComponentProps,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import { IconButton } from "./button";
import { Eyebrow } from "./eyebrow";
import { Icon } from "./icon";

const DialogCloseContext = createContext<() => void>(() => {});

/**
 * Modal built on the native <dialog>: focus trapping, Escape and the
 * backdrop come from the browser. Mount it to open, unmount it to close.
 */
export function Dialog({
  labelledBy,
  onClose,
  className,
  children,
}: {
  labelledBy: string;
  onClose: () => void;
  className?: string;
  children: ReactNode;
}) {
  const reference = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = reference.current;
    if (!dialog) return;
    dialog.showModal();
    document.body.classList.add("overflow-hidden");
    return () => {
      dialog.close();
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  return (
    <DialogCloseContext.Provider value={onClose}>
      <dialog
        ref={reference}
        aria-labelledby={labelledBy}
        className={cn(
          "m-auto max-h-[90dvh] max-w-[calc(100vw-30px)] border border-line bg-cream p-7.5 text-ink shadow-[0_20px_100px_#23170c30] backdrop:bg-[rgba(35,24,24,0.4)] backdrop:backdrop-blur-[3px]",
          className,
        )}
        onCancel={(event) => {
          event.preventDefault();
          onClose();
        }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            onClose();
        }}
      >
        {children}
      </dialog>
    </DialogCloseContext.Provider>
  );
}

export function DialogClose({
  label = "Close dialog",
  className,
}: {
  label?: string;
  className?: string;
}) {
  const close = useContext(DialogCloseContext);
  return (
    <IconButton onClick={close} aria-label={label} className={className}>
      <Icon name="close" />
    </IconButton>
  );
}

/** Eyebrow label plus close button along the top of a dialog. */
export function DialogHeader({ eyebrow }: { eyebrow: string }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-3.75">
      <Eyebrow className="text-[8px]/[1.6]">{eyebrow}</Eyebrow>
      <DialogClose className="-my-2.25 -mr-2.25" />
    </div>
  );
}

export function DialogTitle({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "mb-4.5 text-[41px] tracking-[-1px] max-sm:text-[35px]",
        className,
      )}
      {...props}
    />
  );
}
