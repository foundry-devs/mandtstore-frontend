import { expect, test } from "vitest";
import { products } from "@/features/catalogue/data/products";
import { buildEnquiry } from "./build-enquiry";

test("enquiries preserve quantities and plain-text notes without claiming an order", () => {
  const message = buildEnquiry(
    {
      bag: { "sage-kurta": 2, "chai-cups": 1 },
      notes: "Size M & delivery to Matara, please.",
    },
    products,
  );
  expect(message).toMatch(/The Sage Kurta — quantity 2/);
  expect(message).toMatch(/The Chai Cup Duo — quantity 1/);
  expect(message).toMatch(/Size M & delivery to Matara/);
  expect(message).toMatch(/prices in LKR/);
  expect(message).toMatch(/not an order/);
});
