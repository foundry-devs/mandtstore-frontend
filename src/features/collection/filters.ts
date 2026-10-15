import type { Category, Product } from "@/features/catalogue";

export type CollectionFilter = "all" | "saved" | "accessories-all" | Category;

export const collectionFilters: readonly {
  value: CollectionFilter;
  label: string;
}[] = [
  { value: "all", label: "All finds" },
  { value: "Clothing", label: "Clothing" },
  { value: "Accessories", label: "Accessories" },
  { value: "Jewellery", label: "Jewellery" },
  { value: "Home & living", label: "Home & living" },
  { value: "saved", label: "Saved" },
];

export function filterProducts(
  products: readonly Product[],
  filter: CollectionFilter,
  favourites: readonly string[],
) {
  return products.filter((product) => {
    switch (filter) {
      case "all":
        return true;
      case "saved":
        return favourites.includes(product.id);
      case "accessories-all":
        return ["Accessories", "Jewellery"].includes(product.category);
      default:
        return product.category === filter;
    }
  });
}
