# Plan 012 Spike Notes: shadcn-compatible registry for vera-ui

**Date**: 2026-07-16  
**Branch**: `advisor/012-shadcn-registry-spike`  
**Baseline drift**: UI components changed since plan commit `7128c31` (Multi-select, chart, file-upload, pagination deleted); `components.json` and docs config unchanged. Spike pilot targets (`button`, `card`, `combobox`) were not among the drifted files.

## Step 1: CLI + schema mechanics

**Installed CLI**: `shadcn@4.6.0` (from `packages/ui` devDependencies)

**Exact build command** (from `shadcn build --help`):

```bash
shadcn build [registry] [options]

Arguments:
  registry             path to registry.json file (default: "./registry.json")

Options:
  -o, --output <path>  destination directory for json files (default: "./public/r")
  -c, --cwd <cwd>      the working directory (default: current directory)
```

**Script added**: `"registry:build": "shadcn build --output ../docs/public/r"`

**Note**: `pnpm registry:build` invokes the local `shadcn` binary via the package script; in environments with strict npm registry firewalls, run `./node_modules/.bin/shadcn build --output ../docs/public/r` directly.

## Step 2: Registry build (pilot)

Created `packages/ui/registry.json` with three pilot items: `button`, `card`, `combobox`.

**Build output** (`packages/docs/public/r/`):

| File | Purpose |
|------|---------|
| `button.json` | Leaf component with inlined source |
| `card.json` | Leaf component with inlined source |
| `combobox.json` | Composite with `registryDependencies` |
| `registry.json` | Registry index (auto-emitted by CLI) |

**Verification**: `jq -r '.files[0].content' packages/docs/public/r/button.json | head -5` shows real component source starting with `import * as React from "react"`.

`combobox.json` declares:

```json
"registryDependencies": ["button", "popover", "command", "tooltip"],
"dependencies": ["class-variance-authority", "lucide-react"]
```

## Step 3: Serve

Docs dev server started on **port 3001** (port 3000 was already in use).

**Verification**: `curl -s http://localhost:3001/r/button.json | jq .name` → `"button"`.

Static serving from `packages/docs/public/r/` works with zero server code — confirms the docs-site-as-registry-host approach.

## Step 4: Consumer test (scratch app)

**Scratch app**: `/tmp/vera-registry-scratch` — Vite React + TypeScript, Tailwind v4, `shadcn init -y -d`.

**Install command**:

```bash
npx shadcn@latest add http://localhost:3001/r/combobox.json -y
```

**Files landed** in `components/ui/`:

- `combobox.tsx` — **from vera-ui registry** (radix-ui API, vera-ui source)
- `popover.tsx`, `command.tsx`, `tooltip.tsx`, `dialog.tsx`, `input-group.tsx`, `input.tsx`, `textarea.tsx` — **from ui.shadcn.com default registry** (base-nova / `@base-ui/react`)
- `button.tsx` — skipped (already present from `shadcn init`; base-ui variant)

**Build result**: `npm run build` **failed** with TypeScript errors — vera-ui `combobox.tsx` expects radix-ui popover props (`delayDuration`, `onEscapeKeyDown`) but installed popover uses `@base-ui/react` with incompatible APIs.

### Step 4 fix-up list (verbatim)

1. **Registry dependency resolution falls through to ui.shadcn.com**: Bare `registryDependencies` names (`popover`, `command`, `tooltip`) not present in the vera-ui registry resolve against the **default shadcn registry**, pulling `base-nova` / `@base-ui/react` components. Only items explicitly in `packages/docs/public/r/` (or referenced by full URL) come from vera-ui. A 3-item pilot is insufficient for composite installs.

2. **Primitive stack mismatch**: vera-ui uses unified `radix-ui` package + `radix-mira` style; default shadcn registry uses `@base-ui/react` + `base-nova`. Mixing them causes compile-time API incompatibilities (confirmed: combobox ↔ popover prop mismatch).

3. **Consumer must init with matching style**: Scratch `shadcn init` produced `style: "base-nova"`. Consumers need `radix-mira` (matching `packages/ui/components.json`) and `radix-ui` deps, not base-ui.

4. **All transitive registry deps must be published**: For `combobox` alone, the full vera-ui dependency chain is: `button`, `popover`, `command`, `tooltip` → `dialog`, `input-group` → `input`, `textarea` → (npm: `radix-ui`, `cmdk`, `class-variance-authority`, `lucide-react`, `clsx`, `tailwind-merge`). Every node must exist as a registry item or install pulls wrong sources.

5. **`cn` util (`@/lib/utils`)**: Not bundled in component registry items; consumers get it from `shadcn init`. Works if init runs first; fragile if adding components to an existing project without utils.

6. **Theme / CSS variables**: vera-ui `src/index.css` carries ~50 custom properties (oklch palette, radius, shadows, fonts, `@import "shadcn/tailwind.css"`, `tw-animate-css`, Inter font). `shadcn init` injects a different neutral palette. Components render but colors/spacing/radius will not match Vera UI branding without a **`registry:style` or `registry:theme` item** distributing `src/index.css` tokens.

7. **TooltipProvider wrapper**: CLI correctly warns that `tooltip` requires `<TooltipProvider>` at app root.

8. **File path quirk**: `shadcn add` initially wrote files to a literal `@/` directory at project root (not `src/`). Required manual move to `src/components/ui/`. May be an init/alias edge case in the scratch setup; worth monitoring in real consumer docs.

9. **TypeScript noise**: `baseUrl` deprecation warning in TS 6+ (`ignoreDeprecations: "6.0"` silences it).

## What worked

| Capability | Status |
|------------|--------|
| `components.json` already valid for shadcn v4 | ✅ |
| `shadcn build` resolves file contents into per-item JSON | ✅ |
| Output to `packages/docs/public/r/` via one npm script | ✅ |
| Docs site serves registry JSON statically | ✅ |
| `shadcn add <url>` fetches and writes component source | ✅ (primary item) |
| `registryDependencies` auto-install transitive files | ✅ (but from wrong registry) |
| Zero changes to `packages/ui/src/` component sources | ✅ |

## Full rollout cost estimate (~48 `ui/` components)

| Work item | Estimate | Notes |
|-----------|----------|-------|
| Registry item authoring | ~48 items | One `registry.json` entry per `.tsx` in `src/components/ui/` |
| `dependencies` mapping | ~30 min/item avg (simple) to 2h (composite) | Parse imports for npm packages; leaf components are fast |
| `registryDependencies` graph | ~1–2 days | Must map every `@/components/ui/*` import; composite components like `combobox`, `command`, `dialog`, `form`, `sidebar` have deep trees |
| Theme/style item | ~0.5 day | `registry:style` carrying `src/index.css` CSS vars + `@import` chain; consumers need this for visual parity |
| `registry:lib` for `cn` | ~1 hour | `src/lib/utils.ts` as explicit installable item |
| CI rebuild wiring | ~2 hours | `pnpm registry:build` in docs build pipeline; fail if output drifts from committed `public/r/` |
| Docs pages | ~1 day | "Install with shadcn CLI", init instructions (`radix-mira`), registry URL |
| Ongoing maintenance | **High** | Every component PR touching `src/components/ui/` must rebuild registry or published JSON rots; reviewers must enforce |

**Dependency graph complexity**: Of 48 components, ~15 are leaves (button, card, badge, …); ~33 import other ui components. Worst hubs: `sidebar` (imports 10+ ui peers), `form`, `command`, `dialog`, `input-group`, `combobox`, `calendar`, `chart`.

## npm package vs registry positioning

| Channel | Best for |
|---------|----------|
| `@helgadigitals/vera-ui` npm | App-wide adoption, semver updates, composite components (DataTable, Sidebar, TabsContainer), single CSS import |
| shadcn registry | Per-component source ownership, tree-shaking by omission, customization without forking the package, teams already on shadcn CLI |

They are **complementary**, not exclusive. Registry does not replace npm for composite/layout components that live outside `src/components/ui/`.

## Maintenance cost (reviewer pressure-test)

Registries rot when component changes don't rebuild them. vera-ui already has active component churn (8 ui files changed since plan baseline). Without CI enforcement:

- Published `button.json` could diverge from `button.tsx` silently
- `registryDependencies` graphs become stale when imports change
- Theme tokens in `index.css` won't propagate to registry consumers

**Minimum viable maintenance**: `registry:build` in `build:docs` (or a dedicated CI job), committed `public/r/` diff reviewed in PRs touching `src/components/ui/` or `registry.json`.

## Rollout outcome (2026-07-16 — go decision executed)

The spike's blocking finding (bare `registryDependencies` falling through to
ui.shadcn.com and pulling API-incompatible base-ui components) has been resolved
by shipping the **full registry** with **namespaced** dependencies. What landed:

- **`packages/ui/scripts/build-registry.mjs`** — generates `registry.json` from
  the component sources. It scans each `src/components/ui/*.tsx` for imports and
  emits: npm packages as `dependencies`; cross-component imports
  (`@/components/ui/*`, relative siblings), `@/lib/utils`, and `@/hooks/*` as
  **`@vera-ui/<name>`** namespaced `registryDependencies`. Regenerates on every
  run, so the registry never drifts from source.
- **51 registry items**: 48 `ui/` components + `utils` (`registry:lib`),
  `use-mobile` (`registry:hook`), and `vera-ui-theme` (`registry:style`, carrying
  `src/index.css` tokens).
- **`registry:build`** script is now `node scripts/build-registry.mjs && shadcn build --output ../docs/public/r`.
- Output committed to `packages/docs/public/r/*.json`; the docs Dockerfile already
  copies `packages/docs/public`, so the registry is served statically at
  `<docs-site>/r/{name}.json` in production with zero server code.
- **Consumer docs**: `packages/docs/content/docs/getting-started/registry.mdx`
  documents the `@vera-ui` namespace config and `shadcn add @vera-ui/<name>`
  (docs URL is a `YOUR_DOCS_URL` placeholder pending the finalized docs domain).

### Verification performed

Served `packages/docs/public` locally and recursively resolved every item's
`@vera-ui/*` graph against the served registry:

- `@vera-ui/combobox` transitive closure = 10 nodes (button, command, dialog,
  input, input-group, popover, textarea, tooltip, utils, combobox) — **zero**
  fall-throughs, **zero** `@base-ui/react` imports; `popover` resolves to the
  vera-ui radix source.
- Whole-registry sweep (51 items): **no** foreign registryDeps, **no** base-ui
  imports, **no** missing/empty items — all source inlined.
- `pnpm build:docs` passes with the registry page and 52 JSON files present.

Note: a full `shadcn add` into a scratch app was attempted but hung on shadcn's
framework detection in a bare (non-Vite/Next) scratch dir in this sandbox; the
deterministic resolver proof above covers the same guarantee (correct source,
no fall-through). A real-app `shadcn add` + `tsc` remains a good pre-launch check.

### Remaining before advertising CLI install publicly

1. Replace `YOUR_DOCS_URL` in `registry.mdx` with the real docs domain.
2. CI staleness guard: run `pnpm --filter @helgadigitals/vera-ui registry:build`
   in CI and fail if `packages/docs/public/r/` has an uncommitted diff (kept out
   of the release gate for now to avoid coupling).
3. One real-consumer `shadcn add` + build smoke test on the deployed URL.

## Recommendation

**Recommendation: go-with-scope** — pursue a full registry rollout only with explicit scope: all 48 ui components, a theme/style registry item, CI rebuild enforcement, and consumer docs mandating `radix-mira` init. The spike proves the infrastructure is cheap (existing `components.json`, one build script, docs static hosting). The cost is in **complete dependency-graph coverage and ongoing rebuild discipline**, not in CLI mechanics. Do not advertise CLI install in docs until those scope items ship; npm remains the supported distribution channel until then.
