import type { Product } from "../types";

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
