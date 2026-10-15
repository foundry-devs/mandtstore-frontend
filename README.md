# M and T Store - Nextjs Frontend

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Vitest · ESLint · Prettier

## Scripts

| Command                | What it does                                        |
| ---------------------- | --------------------------------------------------- |
| `npm run dev`          | Start the dev server                                |
| `npm run build`        | Production build (server)                           |
| `npm run build:static` | Static export to `out/`                             |
| `npm run lint`         | ESLint, including architecture import rules         |
| `npm run format`       | Format with Prettier (also sorts Tailwind classes)  |
| `npm run typecheck`    | Generate route types and run `tsc`                  |
| `npm test`             | Run unit tests once (`npm run test:watch` to watch) |

## Project structure

```
src/
├── app/                    Routing only: layouts, pages, globals.css (Tailwind theme)
│   └── (store)/            Storefront route group: header, footer, providers, dialogs
├── features/               One folder per business area, each with a public index.ts
│   ├── catalogue/          Product types, data, getProducts(), ProductPhoto
│   ├── shortlist/          Favourites, enquiry bag and notes (saved in the browser)
│   ├── collection/         Filters, product grid, product card and detail dialog
│   ├── search/             Product search and the search dialog
│   └── enquiry/            Builds the enquiry message and its dialog
├── components/
│   ├── ui/                 Shared building blocks: Button, Dialog, Icon, Toast…
│   ├── layout/             Site header, footer, providers, dialog host
│   └── sections/           Home page sections (hero, story, FAQ…)
├── providers/              Cross-feature UI state (which dialog is open)
├── config/site.ts          Site name, URL, navigation
└── lib/                    Generic helpers such as cn()
```

### Import rules (enforced by ESLint)

- Import a feature only through its public API: `@/features/catalogue`, never
  `@/features/catalogue/components/...`. Inside a feature, use relative imports.
- `components/ui`, `lib`, `config` and `providers` are shared code and must not
  import features, layout or sections.
- `app`, `components/layout` and `components/sections` put everything together and
  may import anything.

### Data

Components never read product data directly. `getProducts()` in
`features/catalogue/api.ts` is the single source; replace its body with a backend
request when the API is ready.

### Styling

Tailwind CSS v4. Design tokens (colours, fonts, breakpoints) live in the `@theme`
block of `src/app/globals.css`. Breakpoints are desktop-first: `max-lg:` is
≤1100px, `max-md:` ≤800px, `max-sm:` ≤600px, `max-xs:` ≤365px, `xl:` ≥1600px.
Combine classes with `cn()` and define reusable variants with `cva`
(see `components/ui/button.tsx`). Fonts are self-hosted with `next/font`.

Tests sit next to the code they cover (`*.test.ts`).
