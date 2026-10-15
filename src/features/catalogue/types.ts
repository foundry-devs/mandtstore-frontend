export type Category =
  "Clothing" | "Accessories" | "Jewellery" | "Home & living";

export interface Product {
  id: string;
  name: string;
  category: Category;
  keywords: string;
  description: string;
  image: { src: string; alt: string; quadrant?: 0 | 1 | 2 | 3 };
}
