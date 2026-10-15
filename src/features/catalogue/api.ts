import { products } from "./data/products";
import type { Product } from "./types";

/**
 * Single entry point for catalogue data. Today it reads the static sample
 * list; swap the body for a backend request without touching any component.
 */
export async function getProducts(): Promise<readonly Product[]> {
  return products;
}
