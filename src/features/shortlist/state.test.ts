import { describe, expect, test } from "vitest";
import { products } from "@/features/catalogue/data/products";
import {
  createShortlistReducer,
  emptyShortlistState,
  parseShortlistState,
} from "./state";

const isKnownProduct = (id: string) => products.some((p) => p.id === id);
const reducer = createShortlistReducer(isKnownProduct);

describe("parseShortlistState", () => {
  test("existing browser lists survive the migration", () => {
    const state = parseShortlistState(
      JSON.stringify({
        favourites: ["sage-kurta"],
        bag: { "chai-cups": 2 },
        notes: "Delivery to Matara",
      }),
      isKnownProduct,
    );
    expect(state).toEqual({
      favourites: ["sage-kurta"],
      bag: { "chai-cups": 2 },
      notes: "Delivery to Matara",
    });
  });

  test("damaged browser storage starts with a usable empty list", () => {
    for (const raw of [null, "{broken", "null", "42", "[]"])
      expect(parseShortlistState(raw, isKnownProduct)).toEqual(
        emptyShortlistState,
      );
  });

  test("restoration drops unknown products and unsafe quantities", () => {
    const state = parseShortlistState(
      JSON.stringify({
        favourites: ["sage-kurta", "unknown", "sage-kurta", 42],
        bag: {
          "sage-kurta": 1000,
          "chai-cups": -1,
          "everyday-tote": "3",
          unknown: 5,
        },
        notes: "a".repeat(2000),
      }),
      isKnownProduct,
    );
    expect(state.favourites).toEqual(["sage-kurta"]);
    expect(state.bag).toEqual({ "sage-kurta": 99 });
    expect(state.notes).toHaveLength(1000);
  });
});

describe("shortlistReducer", () => {
  test("a favourite can be saved and unsaved without changing the previous state", () => {
    const saved = reducer(emptyShortlistState, {
      type: "toggle-favourite",
      id: "sage-kurta",
    });
    expect(saved.favourites).toEqual(["sage-kurta"]);
    expect(emptyShortlistState.favourites).toEqual([]);
    expect(
      reducer(saved, { type: "toggle-favourite", id: "sage-kurta" }).favourites,
    ).toEqual([]);
  });

  test("supports add, bounded quantity changes and removal", () => {
    let state = reducer(emptyShortlistState, { type: "add", id: "chai-cups" });
    state = reducer(state, { type: "add", id: "chai-cups" });
    expect(state.bag["chai-cups"]).toBe(2);
    state = reducer(state, {
      type: "quantity",
      id: "chai-cups",
      quantity: 1000,
    });
    state = reducer(state, { type: "add", id: "chai-cups" });
    expect(state.bag["chai-cups"]).toBe(99);
    state = reducer(state, { type: "quantity", id: "chai-cups", quantity: -5 });
    expect(state.bag["chai-cups"]).toBe(1);
    expect(
      reducer(state, { type: "quantity", id: "chai-cups", quantity: NaN }),
    ).toBe(state);
    expect(reducer(state, { type: "remove", id: "chai-cups" }).bag).toEqual({});
  });

  test("unknown product IDs cannot enter the shortlist", () => {
    expect(reducer(emptyShortlistState, { type: "add", id: "unknown" })).toBe(
      emptyShortlistState,
    );
  });
});
