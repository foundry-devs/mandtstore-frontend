import assert from "node:assert/strict";
import test from "node:test";
import { filterProducts, searchProducts } from "../src/lib/catalogue.ts";
import {
  buildEnquiry,
  emptyShoppingState,
  parseShoppingState,
  shoppingReducer,
} from "../src/lib/shopping-state.ts";

test("existing browser lists survive the migration", () => {
  const state = parseShoppingState(
    JSON.stringify({
      favourites: ["sage-kurta"],
      bag: { "chai-cups": 2 },
      notes: "Delivery to Matara",
    }),
  );
  assert.deepEqual(state, {
    favourites: ["sage-kurta"],
    bag: { "chai-cups": 2 },
    notes: "Delivery to Matara",
  });
});

test("damaged browser storage starts with a usable empty list", () => {
  for (const raw of [null, "{broken", "null", "42", "[]"])
    assert.deepEqual(parseShoppingState(raw), emptyShoppingState);
});

test("restoration drops unknown products and unsafe quantities", () => {
  const state = parseShoppingState(
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
  );
  assert.deepEqual(state.favourites, ["sage-kurta"]);
  assert.deepEqual(state.bag, { "sage-kurta": 99 });
  assert.equal(state.notes.length, 1000);
});

test("a favourite can be saved and unsaved without changing the previous state", () => {
  const saved = shoppingReducer(emptyShoppingState, {
    type: "toggle-favourite",
    id: "sage-kurta",
  });
  assert.deepEqual(saved.favourites, ["sage-kurta"]);
  assert.deepEqual(emptyShoppingState.favourites, []);
  assert.deepEqual(
    shoppingReducer(saved, { type: "toggle-favourite", id: "sage-kurta" })
      .favourites,
    [],
  );
});

test("shortlist supports add, bounded quantity changes and removal", () => {
  let state = shoppingReducer(emptyShoppingState, {
    type: "add",
    id: "chai-cups",
  });
  state = shoppingReducer(state, { type: "add", id: "chai-cups" });
  assert.equal(state.bag["chai-cups"], 2);
  state = shoppingReducer(state, {
    type: "quantity",
    id: "chai-cups",
    quantity: 1000,
  });
  state = shoppingReducer(state, { type: "add", id: "chai-cups" });
  assert.equal(state.bag["chai-cups"], 99);
  state = shoppingReducer(state, {
    type: "quantity",
    id: "chai-cups",
    quantity: -5,
  });
  assert.equal(state.bag["chai-cups"], 1);
  assert.equal(
    shoppingReducer(state, {
      type: "quantity",
      id: "chai-cups",
      quantity: NaN,
    }),
    state,
  );
  assert.deepEqual(
    shoppingReducer(state, { type: "remove", id: "chai-cups" }).bag,
    {},
  );
});

test("unknown product IDs cannot enter the shortlist", () => {
  assert.equal(
    shoppingReducer(emptyShoppingState, { type: "add", id: "unknown" }),
    emptyShoppingState,
  );
});

test("filters and multiword search return the intended sample styles", () => {
  assert.equal(filterProducts("all", []).length, 4);
  assert.deepEqual(
    filterProducts("Clothing", []).map((p) => p.id),
    ["sage-kurta"],
  );
  assert.deepEqual(
    filterProducts("saved", ["chai-cups"]).map((p) => p.id),
    ["chai-cups"],
  );
  assert.equal(filterProducts("saved", []).length, 0);
  assert.equal(filterProducts("accessories-all", []).length, 2);
  assert.deepEqual(
    searchProducts("  GOLD Earrings ").map((p) => p.id),
    ["golden-jhumkas"],
  );
  assert.equal(searchProducts("<script>alert(1)</script>").length, 0);
});

test("enquiries preserve quantities and plain-text notes without claiming an order", () => {
  const message = buildEnquiry({
    favourites: [],
    bag: { "sage-kurta": 2, "chai-cups": 1 },
    notes: "Size M & delivery to Matara, please.",
  });
  assert.match(message, /The Sage Kurta — quantity 2/);
  assert.match(message, /The Chai Cup Duo — quantity 1/);
  assert.match(message, /Size M & delivery to Matara/);
  assert.match(message, /prices in LKR/);
  assert.match(message, /not an order/);
});
