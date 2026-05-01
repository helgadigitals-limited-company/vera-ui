# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Monorepo Structure

pnpm workspace with two packages:

- **`packages/ui/`** — Component library (`@helgadigitals/vera-ui`), built with Vite + Radix UI + Tailwind CSS v4, published to NPM
- **`packages/docs/`** — Next.js documentation site using Fumadocs MDX, consumes the library as a workspace dependency

## Commands

```bash
# Dev: run both packages in parallel
pnpm dev

# Dev: library only (Vite dev server)
pnpm dev:ui

# Dev: docs only (requires library built first)
pnpm dev:docs

# Build library (TypeScript + Vite; outputs to packages/ui/dist/)
pnpm build:ui

# Build docs (extract-code script runs first, then next build)
pnpm build:docs

# Lint all packages
pnpm lint

# Run tests (Vitest in packages/ui)
pnpm test

# Run a single test file
cd packages/ui && pnpm vitest run src/path/to/file.test.ts

# Extract component source code for docs (run before building docs)
cd packages/docs && pnpm extract-code
```

## Key Architecture

### Component Library (`packages/ui`)

- All base UI components live in `src/components/ui/` and wrap Radix UI primitives
- Higher-level composite components (`Sidebar`, `DataTable`, `Pagination`, `MenuBar`, `TabsContainer`, `SidebarLayout`, `SidebarProvider`) live directly in `src/components/`
- Every component and utility must be exported from `src/index.ts` in alphabetical order
- Path alias: `@` → `packages/ui/src/`

### Styling Conventions

- **Always** use `cn()` from `@/lib/utils` (wraps `clsx` + `tailwind-merge`) for conditional classes
- Use `class-variance-authority` (cva) for variant-based styling — `button.tsx` is the canonical example
- Tailwind CSS v4 only — no `tailwind.config.ts/js` file
- Theming via CSS variables; never hardcode colors
- Both light and dark mode must work via the CSS variable system

### Sidebar Component

Supports three item shapes — always check which type is needed before passing props:
- `SidebarItem` — flat link with `title`, `path`, `icon`
- `Group` — grouped items with `key`, `label`, `items: SidebarItem[]`
- `MixedSidebarItem` — union of both; use `isGroup()` / `isSidebarItem()` / `isMixedArray()` utilities from `@/lib/utils`

Sidebar uses `react-router-dom` for active state detection — it requires a router context.

### Documentation (`packages/docs`)

- **Fumadocs** powers MDX routing; file-based structure under `content/docs/`
- Component doc categories: `forms/`, `data-display/`, `navigation/`, `layout/`, `utilities/`
- Each component doc has a companion example file at `components/[category]-examples/[component]-examples.tsx`
- Use `AutoExtractPreview` in MDX to show live previews with auto-extracted source code:
  ```mdx
  <AutoExtractPreview
    source="components/[category]-examples/[component]-examples.tsx"
    functionName="ExampleFunctionName"
  >
    <ExampleFunctionName />
  </AutoExtractPreview>
  ```
- `pnpm extract-code` must run before `next build` (it's a `prebuild` step in docs `package.json`)

### Build Output

The library produces three artifacts in `packages/ui/dist/`:
- `vera-ui.es.js` — ESM bundle
- `vera-ui.cjs.js` — CJS bundle
- `index.d.ts` — rolled-up type declarations (via `vite-plugin-dts`)
- `vera-ui.css` — single bundled stylesheet (CSS code split disabled)

All peer dependencies (`react`, `react-dom`, `react-router-dom`, `zod`, `react-hook-form`, etc.) are externalized from the bundle.

### Versioning & Publishing

Semantic versioning via `semantic-release`. Published to NPM as `@helgadigitals/vera-ui` with public access.
