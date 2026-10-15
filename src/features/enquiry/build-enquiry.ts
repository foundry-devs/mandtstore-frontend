import type { Product } from "@/features/catalogue";
import type { ShortlistState } from "@/features/shortlist";

/** Plain-text enquiry message listing the shortlist in catalogue order. */
export function buildEnquiry(
  state: Pick<ShortlistState, "bag" | "notes">,
  products: readonly Product[],
) {
  const lines = products
    .filter((product) => state.bag[product.id])
    .map((product) => `• ${product.name} — quantity ${state.bag[product.id]}`);
  const notes = state.notes.trim();
  return `Hi M&T! I’m interested in these styles from your sample collection:\n\n${lines.join("\n")}\n\nPlease confirm the actual products, available options, prices in LKR, delivery charges and timing, payment methods, and returns policy.${notes ? "\n\nMy notes: " + notes : ""}\n\nThis is an enquiry, not an order. Thank you!`;
}
