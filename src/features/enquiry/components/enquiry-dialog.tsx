"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Icon } from "@/components/ui/icon";
import { useCatalogue } from "@/features/catalogue";
import { useShortlist } from "@/features/shortlist";
import { useModal } from "@/providers/modal-provider";
import { buildEnquiry } from "../build-enquiry";

export function EnquiryDialog() {
  const { products } = useCatalogue();
  const { state } = useShortlist();
  const { openModal, closeModal } = useModal();
  const [copyStatus, setCopyStatus] = useState("");
  const reference = useRef<HTMLTextAreaElement>(null);
  const message = buildEnquiry(state, products);
  async function copy() {
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(message);
      setCopyStatus(
        "Copied. Your message is ready to share; nothing has been sent.",
      );
    } catch {
      reference.current?.focus();
      reference.current?.select();
      setCopyStatus(
        "The message is selected. Use your device’s Copy option (Ctrl+C or ⌘C).",
      );
    }
  }
  return (
    <Dialog
      labelledBy="enquiry-title"
      onClose={closeModal}
      className="w-135 max-sm:p-6"
    >
      <DialogHeader eyebrow="ONE LITTLE STEP CLOSER" />
      <DialogTitle id="enquiry-title">Your message is ready.</DialogTitle>
      <p className="mb-4.5 text-[12px] leading-[1.8] text-muted max-sm:text-[11px]">
        Copy this list to share with M&T once their ordering contact is
        available. Nothing has been sent.
      </p>
      <label className="sr-only" htmlFor="enquiry-message">
        Enquiry message
      </label>
      <textarea
        id="enquiry-message"
        rows={11}
        readOnly
        ref={reference}
        value={message}
        className="mb-4 w-full border border-[#d7cbbd] bg-paper p-4 text-[11px] leading-[1.8]"
      />
      <Button className="w-full" onClick={copy}>
        <Icon name="copy" />
        Copy enquiry
      </Button>
      <p className="mt-3 text-[10px] leading-[1.8] text-wine" role="status">
        {copyStatus}
      </p>
      <Button variant="link" onClick={() => openModal({ kind: "shortlist" })}>
        ← Back to my list
      </Button>
    </Dialog>
  );
}
