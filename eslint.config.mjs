import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

// Architecture boundaries (see README):
//   app, components/layout, components/sections -> may import anything
//   features/*  -> shared code + other features through their public index
//   components/ui, lib, config, providers -> shared code only
const featureInternals = {
  group: ["@/features/*/*"],
  message:
    "Import features through their public API (e.g. '@/features/catalogue').",
};
const compositionLayers = {
  group: [
    "@/features",
    "@/features/*",
    "@/components/layout/*",
    "@/components/sections/*",
  ],
  message: "Shared code must not depend on features or page composition.",
};

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    rules: {
      "no-restricted-imports": ["error", { patterns: [featureInternals] }],
    },
  },
  {
    files: [
      "src/components/ui/**",
      "src/lib/**",
      "src/config/**",
      "src/providers/**",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        { patterns: [featureInternals, compositionLayers] },
      ],
    },
  },
  {
    // Tests may reach into feature internals for fixtures.
    files: ["**/*.test.ts"],
    rules: { "no-restricted-imports": "off" },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
