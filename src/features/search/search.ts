import type { Product } from "@/features/catalogue";

/** Every word must appear in the product's name, category or keywords. */
export function searchProducts(products: readonly Product[], query: string) {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return products.filter((product) => {
    const haystack =
      `${product.name} ${product.category} ${product.keywords}`.toLowerCase();
    return words.every((word) => haystack.includes(word));
  });
}
