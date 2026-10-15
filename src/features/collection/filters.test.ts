import { expect, test } from "vitest";
import { products } from "@/features/catalogue/data/products";
import { filterProducts } from "./filters";

test("filters return the intended sample styles", () => {
  const ids = (
    filter: Parameters<typeof filterProducts>[1],
    saved: string[] = [],
  ) => filterProducts(products, filter, saved).map((p) => p.id);
  expect(ids("all")).toHaveLength(4);
  expect(ids("Clothing")).toEqual(["sage-kurta"]);
  expect(ids("saved", ["chai-cups"])).toEqual(["chai-cups"]);
  expect(ids("saved")).toHaveLength(0);
  expect(ids("accessories-all")).toHaveLength(2);
});
