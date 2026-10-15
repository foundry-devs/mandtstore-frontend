import { expect, test } from "vitest";
import { products } from "@/features/catalogue/data/products";
import { searchProducts } from "./search";

test("multiword search is case-insensitive and ignores extra spaces", () => {
  expect(searchProducts(products, "  GOLD Earrings ").map((p) => p.id)).toEqual(
    ["golden-jhumkas"],
  );
});

test("an empty query lists everything and markup matches nothing", () => {
  expect(searchProducts(products, "")).toHaveLength(products.length);
  expect(searchProducts(products, "<script>alert(1)</script>")).toHaveLength(0);
});
