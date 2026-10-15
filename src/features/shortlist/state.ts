// Preserve the original key so existing visitors keep their saved lists.
export const storageKey = "mt-boutique-v1";
export const maxQuantity = 99;
export const maxNotesLength = 1000;

export interface ShortlistState {
  favourites: string[];
  bag: Record<string, number>;
  notes: string;
}
export const emptyShortlistState: ShortlistState = {
  favourites: [],
  bag: {},
  notes: "",
};
export type ShortlistAction =
  | { type: "toggle-favourite"; id: string }
  | { type: "add"; id: string }
  | { type: "quantity"; id: string; quantity: number }
  | { type: "remove"; id: string }
  | { type: "notes"; notes: string };

type IsKnownProduct = (id: string) => boolean;

/** Reads a saved list defensively: unknown products and bad values are dropped. */
export function parseShortlistState(
  raw: string | null,
  isKnownProduct: IsKnownProduct,
): ShortlistState {
  try {
    const value: unknown = JSON.parse(raw ?? "{}");
    if (!value || typeof value !== "object" || Array.isArray(value))
      return emptyShortlistState;
    const saved = value as Record<string, unknown>;
    const favourites = Array.isArray(saved.favourites)
      ? [
          ...new Set(
            saved.favourites.filter(
              (id): id is string =>
                typeof id === "string" && isKnownProduct(id),
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
      for (const [id, quantity] of Object.entries(saved.bag)) {
        if (
          isKnownProduct(id) &&
          typeof quantity === "number" &&
          Number.isInteger(quantity) &&
          quantity > 0
        )
          bag[id] = Math.min(quantity, maxQuantity);
      }
    }
    return {
      favourites,
      bag,
      notes:
        typeof saved.notes === "string"
          ? saved.notes.slice(0, maxNotesLength)
          : "",
    };
  } catch {
    return emptyShortlistState;
  }
}

export function createShortlistReducer(isKnownProduct: IsKnownProduct) {
  return function shortlistReducer(
    state: ShortlistState,
    action: ShortlistAction,
  ): ShortlistState {
    if (action.type === "notes")
      return { ...state, notes: action.notes.slice(0, maxNotesLength) };
    if (!isKnownProduct(action.id)) return state;
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
            [action.id]: Math.min((state.bag[action.id] ?? 0) + 1, maxQuantity),
          },
        };
      case "quantity": {
        if (!state.bag[action.id] || !Number.isInteger(action.quantity))
          return state;
        return {
          ...state,
          bag: {
            ...state.bag,
            [action.id]: Math.max(1, Math.min(action.quantity, maxQuantity)),
          },
        };
      }
      case "remove": {
        const bag = { ...state.bag };
        delete bag[action.id];
        return { ...state, bag };
      }
    }
  };
}

export function countItems(bag: ShortlistState["bag"]) {
  return Object.values(bag).reduce((total, quantity) => total + quantity, 0);
}
