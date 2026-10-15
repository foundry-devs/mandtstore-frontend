export type Category =
  "Clothing" | "Accessories" | "Jewellery" | "Home & living";
export type CollectionFilter = "all" | "saved" | "accessories-all" | Category;

export interface Product {
  id: string;
  name: string;
  category: Category;
  keywords: string;
  description: string;
  image: { src: string; alt: string; quadrant?: 0 | 1 | 2 | 3 };
}

// Illustrative catalogue only. Replace these entries with verified inventory.
// Omit image.quadrant when using an individual product photograph.
export const products: readonly Product[] = [
  {
    id: "sage-kurta",
    name: "The Sage Kurta",
    category: "Clothing",
    keywords: "cotton kurta dress green sage floral outfit clothing india",
    description:
      "Soft sage tones, delicate florals, and an easy everyday silhouette. A little inspiration for bringing Indian style into your wardrobe.",
    image: {
      src: "/assets/products.webp",
      quadrant: 0,
      alt: "Illustrative sage floral kurta and cream dupatta",
    },
  },
  {
    id: "everyday-tote",
    name: "The Everyday Tote",
    category: "Accessories",
    keywords: "bag tote handbag woven straw tan bamboo accessories",
    description:
      "Natural textures and a warm, neutral palette. A lovely finishing touch for slow mornings, market days, and everything in between.",
    image: {
      src: "/assets/products.webp",
      quadrant: 1,
      alt: "Illustrative woven tan tote with bamboo handles",
    },
  },
  {
    id: "golden-jhumkas",
    name: "Golden Hour Jhumkas",
    category: "Jewellery",
    keywords: "gold earrings jhumka jewellery jewelry pearl accessories",
    description:
      "A little golden sparkle with an Indian-inspired shape. The kind of finishing touch that gives an everyday outfit a new mood.",
    image: {
      src: "/assets/products.webp",
      quadrant: 2,
      alt: "Illustrative antique gold jhumka earrings with pearl details",
    },
  },
  {
    id: "chai-cups",
    name: "The Chai Cup Duo",
    category: "Home & living",
    keywords: "cup mugs mug chai tea ceramic home kitchen living decor",
    description:
      "Warm tones for your daily tea ritual. A simple home inspiration for making those quiet, everyday moments feel a little more lovely.",
    image: {
      src: "/assets/products.webp",
      quadrant: 3,
      alt: "Illustrative pair of ivory ceramic chai cups with terracotta details",
    },
  },
];

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

export function findProduct(id: string) {
  return products.find((product) => product.id === id);
}

export function filterProducts(
  filter: CollectionFilter,
  favourites: readonly string[],
) {
  return products.filter(
    (product) =>
      filter === "all" ||
      (filter === "saved"
        ? favourites.includes(product.id)
        : filter === "accessories-all"
          ? ["Accessories", "Jewellery"].includes(product.category)
          : product.category === filter),
  );
}

export function searchProducts(query: string) {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return products.filter((product) =>
    words.every((word) =>
      `${product.name} ${product.category} ${product.keywords}`
        .toLowerCase()
        .includes(word),
    ),
  );
}
