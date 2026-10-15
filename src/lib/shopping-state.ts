import { findProduct, products } from "./catalogue.ts";

// Preserve the original key so existing visitors keep their saved lists.
export const storageKey = "mt-boutique-v1";
export interface ShoppingState {
  favourites: string[];
  bag: Record<string, number>;
  notes: string;
}
export const emptyShoppingState: ShoppingState = {
  favourites: [],
  bag: {},
  notes: "",
};
export type ShoppingAction =
  | { type: "restore"; state: ShoppingState }
  | { type: "toggle-favourite"; id: string }
  | { type: "add"; id: string }
  | { type: "quantity"; id: string; quantity: number }
  | { type: "remove"; id: string }
  | { type: "notes"; notes: string };

export function parseShoppingState(raw: string | null): ShoppingState {
  try {
    const value: unknown = JSON.parse(raw ?? "{}");
    if (!value || typeof value !== "object" || Array.isArray(value))
      return emptyShoppingState;
    const saved = value as Record<string, unknown>;
    const favourites = Array.isArray(saved.favourites)
      ? [
          ...new Set(
            saved.favourites.filter(
              (id): id is string => typeof id === "string" && !!findProduct(id),
            ),
          ),
        ]
      : [];
    const bag: Record<string, number> = {};
    if (
      saved.bag &&
      typeof saved.bag === "object" &&
      !Array.isArray(saved.bag)
    ) {
      const input = saved.bag as Record<string, unknown>;
      for (const product of products) {
        const quantity = input[product.id];
        if (
          typeof quantity === "number" &&
          Number.isInteger(quantity) &&
          quantity > 0
        ) {
          bag[product.id] = Math.min(quantity, 99);
        }
      }
    }
    return {
      favourites,
      bag,
      notes: typeof saved.notes === "string" ? saved.notes.slice(0, 1000) : "",
    };
  } catch {
    return emptyShoppingState;
  }
}

export function shoppingReducer(
  state: ShoppingState,
  action: ShoppingAction,
): ShoppingState {
  if (action.type === "restore") return action.state;
  if (action.type === "notes")
    return { ...state, notes: action.notes.slice(0, 1000) };
  if (!findProduct(action.id)) return state;
  switch (action.type) {
    case "toggle-favourite":
      return {
        ...state,
        favourites: state.favourites.includes(action.id)
          ? state.favourites.filter((id) => id !== action.id)
          : [...state.favourites, action.id],
      };
    case "add":
      return {
        ...state,
        bag: {
          ...state.bag,
          [action.id]: Math.min((state.bag[action.id] ?? 0) + 1, 99),
        },
      };
    case "quantity": {
      if (!state.bag[action.id] || !Number.isInteger(action.quantity))
        return state;
      return {
        ...state,
        bag: {
          ...state.bag,
          [action.id]: Math.max(1, Math.min(action.quantity, 99)),
        },
      };
    }
    case "remove": {
      const bag = { ...state.bag };
      delete bag[action.id];
      return { ...state, bag };
    }
  }
}

export function buildEnquiry(state: ShoppingState) {
  const lines = products
    .filter((product) => state.bag[product.id])
    .map((product) => `• ${product.name} — quantity ${state.bag[product.id]}`);
  return `Hi M&T! I’m interested in these styles from your sample collection:\n\n${lines.join("\n")}\n\nPlease confirm the actual products, available options, prices in LKR, delivery charges and timing, payment methods, and returns policy.${state.notes.trim() ? "\n\nMy notes: " + state.notes.trim() : ""}\n\nThis is an enquiry, not an order. Thank you!`;
}
