export const siteConfig = {
  name: "M&T",
  title: "M&T — From India, with love.",
  description:
    "Meet M&T — lovely finds sourced in India for everyday life in Sri Lanka. Explore our sample collection of clothing, accessories, jewellery and home goods.",
  tagline: "Little finds. Lovely living.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://mt-india-sri-lanka.ppathukorala.chatgpt.site",
  themeColor: "#612936",
  nav: [
    { id: "collection", label: "The collection" },
    { id: "story", label: "Our story" },
    { id: "how-to-order", label: "How to order" },
  ],
} as const;
