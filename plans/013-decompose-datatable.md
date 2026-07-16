# Plan 013: Decompose the 1184-line DataTable god component (behavior-preserving)

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 7128c31..HEAD -- packages/ui/src/components/DataTable.tsx packages/ui/src/index.ts`
> Changes from plans 004 (sort-mutation/key fixes) and 006 (tests) are
> **expected and required** — verify they are present, not absent. Any *other*
> change to `DataTable.tsx` since `7128c31`: compare the "Current state"
> structure map against the live file before proceeding; on a mismatch, treat
> it as a STOP condition.

## Status

- **Priority**: P3
- **Effort**: L
- **Risk**: MED — behavior-preserving extraction of the library's most-used composite; gated entirely by the characterization tests from plans 004/006
- **Depends on**: plans/004-fix-datatable-key-and-sort-mutation.md (DONE required), plans/006-characterization-test-baseline.md (DONE required)
- **Category**: tech-debt
- **Planned at**: commit `7128c31`, 2026-07-14

## Why this matters

`DataTable.tsx` is 1184 lines — over 5× the next-largest composite. Sorting, selection, filtering, expansion, and all rendering live in one function, making it the hardest file in the library to review, test in isolation, or change safely (the audit found two real bugs in it already — fixed in plan 004). Decomposing it into per-concern hooks plus a thin rendering shell makes each concern independently testable and future changes reviewable. **This is a pure refactor: zero behavior change, zero public-API change.** The tests from plans 004/006 are the safety net that makes it mechanical.

## Current state

- `packages/ui/src/components/DataTable.tsx` — no TanStack dependency (hand-rolled React state; imports only `react`, `@/lib/utils` (`cn`, `splitStringByUnderscore`), `@/components/ui/table`, `@/components/ui/button`, `./ui/dropdown-menu`, `lucide-react`). File opens with `/* eslint-disable @typescript-eslint/no-explicit-any */` and `'use client'`.
- Structure map (line numbers as of `7128c31`; plan 004's edits shift them slightly — re-map with the grep below before starting):

| Lines | Concern |
|---|---|
| 17–115 | Types: `StringKeys<T>`, `TableAction<T>` (exported), `DataTableProps<T>` (exported) |
| 117–159 | Local presentational helpers: `Input`, `DefaultLoadingComponent`, `DefaultEmptyStateComponent` |
| 161–224 | `DataTable` signature + prop destructuring |
| 225–232 | `visibleDataColumns` memo; internal filter state |
| 237–328 | **Sorting**: `internalSortState`, `applySortChange`, `toggleSortForColumn`, `setSortForColumn`, `compareValues` |
| 330–379 | `rowsWithId` memo; **Selection**: `isRowSelected`, `toggleRowSelection` |
| 380–560 | **Filtering**: `defaultGlobalFilterFn`, `defaultColumnFilterFn`, `processedRows` (filter+sort pipeline), `filteredRowIds`, `toggleSelectAllFiltered`, `handleGlobalFilterChange`, `handleColumnFilterChange` |
| ~560–698 | Header/sort-control rendering helpers (map exactly during Step 1) |
| 698–761 | **Expansion**: `internalExpandedRowIds`, `isRowExpanded`, `toggleRowExpansion`, `expandAll`, `collapseAll`, `allRowsExpanded`, `toggleExpandAll`, `handleRowClick` |
| 763–772 | `totalColumns` memo |
| ~774–1184 | Render: loading-state early return, global-filter input, table header + filter row, body rows (keyed fragments per plan 004), empty state |

  Re-map command: `grep -n "useState\|useCallback\|useMemo\|// -----" packages/ui/src/components/DataTable.tsx`
- Public surface: `packages/ui/src/index.ts:60` → `export * from './components/DataTable'`. Everything the module exports today (`DataTable`, `DataTableProps`, `TableAction`, and any other `export`ed symbols — enumerate in Step 1) must remain exported with identical signatures.
- Existing tests (prerequisites): `packages/ui/src/components/DataTable.test.tsx` — sort-immutability + key regression (plan 004) and rendering/sort/selection/filter/expansion characterization (plan 006). These must be green before you touch anything.
- Repo conventions: hooks live in `packages/ui/src/hooks/` (see `use-mobile`, `use-theme` naming: kebab-case `use-*.ts`), but component-private hooks may live beside the component — this plan uses a `data-table/` subdirectory to keep the concern grouped. `cn()` for class merging; match the file's existing style (including its `any` usage — do NOT attempt to fix the `any`s in this plan; moving code is the whole job).

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| DataTable tests | `cd packages/ui && pnpm vitest run src/components/DataTable.test.tsx` | all pass |
| Full suite | `cd packages/ui && pnpm vitest run` | all pass |
| Build + d.ts | `pnpm build:ui` | exit 0 |
| Public-API snapshot | `grep -o "declare [a-z]* [A-Za-z]*\|interface [A-Za-z]*" packages/ui/dist/index.d.ts \| sort > /tmp/api-{before,after}.txt` | diff empty (Step 6) |
| Lint | `pnpm lint` | exit 0 |

## Scope

**In scope** (the only files you should create/modify):
- `packages/ui/src/components/DataTable.tsx` (becomes a thin facade or moves; module path must keep working — see Step 2)
- `packages/ui/src/components/data-table/` (create: hooks + subcomponents + types listed in Steps 2–5)
- `packages/ui/src/components/DataTable.test.tsx` (import-path updates only if needed; test *assertions* unchanged)
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):
- `packages/ui/src/index.ts` — the `./components/DataTable` re-export line stays byte-identical.
- Any behavior change: no fixing the `any` casts, no renaming props, no altering filter/sort semantics, no memoization "improvements".
- `packages/ui/src/components/ui/table.tsx`, `Pagination.tsx`, docs pages.
- Adding pagination or TanStack — explicitly not this plan.

## Git workflow

- Branch: `advisor/013-decompose-datatable`
- Conventional commits, one per extraction step: `refactor(data-table): extract sorting hook`, etc. (`refactor:` triggers a patch release on merge — correct for a shipped refactor.)
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 0: Gate check

Confirm plans 004 and 006 are DONE in `plans/README.md` and `cd packages/ui && pnpm vitest run src/components/DataTable.test.tsx` passes. Snapshot the public API: `pnpm build:ui && cp packages/ui/dist/index.d.ts /tmp/index.d.ts.before`.

**Verify**: tests green; `/tmp/index.d.ts.before` exists.

### Step 1: Map and enumerate

Re-run the structure-map grep (line numbers have shifted since `7128c31`). List every `export`ed symbol in `DataTable.tsx`. Identify the exact boundaries of the four state concerns (sorting / selection / filtering / expansion) and which props feed each.

**Verify**: you can write down, for each concern, its state variables, callbacks, and consumed props. Record this list — it becomes the hook signatures.

### Step 2: Create the module layout (no logic moves yet)

Create `packages/ui/src/components/data-table/` with `types.ts` (move `StringKeys`, `TableAction`, `DataTableProps` — re-export from `DataTable.tsx` so the module's exports are unchanged) and an empty scaffold for the hooks. `DataTable.tsx` stays the component home (keeping the `./components/DataTable` path referenced by `index.ts` untouched is the simplest safe layout).

**Verify**: `pnpm build:ui` → exit 0; `diff /tmp/index.d.ts.before packages/ui/dist/index.d.ts` → **no semantic difference** (declaration ordering may shift; if the raw diff is nonempty, compare sorted symbol lists — the "Public-API snapshot" command — which must be identical). Tests pass.

### Step 3: Extract the state hooks, one concern per commit

In dependency order (each extraction = move code verbatim, parameterize over the props/state it consumed, return what the render uses):

1. `data-table/use-data-table-sort.ts` — `useDataTableSort({ sortState, defaultSortState, onSortChange, sortableColumns, multiSort })` → `{ effectiveSortState, toggleSortForColumn, setSortForColumn, compareValues }`.
2. `data-table/use-data-table-selection.ts` — selection state, `isRowSelected`, `toggleRowSelection`, `toggleSelectAllFiltered` (needs `filteredRowIds` passed in).
3. `data-table/use-data-table-filters.ts` — filter state, default filter fns, `handleGlobalFilterChange`, `handleColumnFilterChange`, and the `processedRows` pipeline (which consumes the sort hook's outputs — pass them as arguments).
4. `data-table/use-data-table-expansion.ts` — expansion state through `toggleExpandAll`, plus `handleRowClick`.

After EACH extraction: run the DataTable test file. The hooks are internal — do **not** export them from `src/index.ts`.

**Verify (after each)**: `pnpm vitest run src/components/DataTable.test.tsx` → all pass. **Verify (after all four)**: full suite + `pnpm build:ui` + API snapshot diff clean.

### Step 4: Extract presentational subcomponents

Conservative set, into `data-table/` (move verbatim, props = what they read):
- `data-table-loading.tsx` — the loading-state early-return block + `DefaultLoadingComponent`.
- `data-table-header.tsx` — header row + sort controls + filter row (the ~560–698 helpers plus the `<TableHeader>` JSX).
- `data-table-row.tsx` — the keyed main-row + expanded-row fragment from the body map.
- Keep `Input` and `DefaultEmptyStateComponent` wherever they cause least churn (moving them to `data-table/` is fine).

Stop extracting when `DataTable.tsx` is a composition shell; do not chase a line-count target at the cost of prop-drilling contortions — if a piece resists clean extraction, leave it and note it.

**Verify**: `pnpm vitest run src/components/DataTable.test.tsx` → all pass; full suite passes; `pnpm build:ui` exit 0.

### Step 5: Final shape check

`wc -l packages/ui/src/components/DataTable.tsx packages/ui/src/components/data-table/*` — expect the facade around 200–400 lines and no single new file over ~400. Run `pnpm lint` (the file-wide `eslint-disable no-explicit-any` must move with the code that needs it — put it per-file only where `any`s actually live).

**Verify**: `pnpm lint` → exit 0.

### Step 6: Public-API and behavior proof

- API: sorted-symbol diff of `dist/index.d.ts` before/after → identical.
- Behavior: full `pnpm vitest run` green, zero test-assertion edits in the diff: `git diff --stat -- packages/ui/src/components/DataTable.test.tsx` shows import-line changes at most.

**Verify**: both hold.

## Test plan

No new tests required — the whole point is that plans 004/006 already wrote the net. Optional (bonus, only if everything is green): per-hook unit tests for `use-data-table-sort` are now cheap; add asc→desc→none cycling if time allows.

## Done criteria

- [ ] Plans 004 and 006 were DONE before starting (gate check recorded)
- [ ] Four concern hooks + subcomponents exist under `src/components/data-table/`
- [ ] `DataTable.tsx` is a composition shell; no file in the group exceeds ~400 lines
- [ ] Sorted public-API symbol list from `dist/index.d.ts` identical before/after
- [ ] `src/index.ts` untouched (`git diff -- packages/ui/src/index.ts` → empty)
- [ ] Full vitest run, `pnpm build:ui`, `pnpm lint` all exit 0
- [ ] Test assertions unchanged (imports may move)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- Plans 004/006 are not DONE, or the DataTable tests fail before you change anything.
- Any extraction step turns a passing test red and a *mechanical* fix (missed parameter, wrong import) doesn't restore it — a red test here means behavior changed; revert the step and report.
- The public-API snapshot diff shows a symbol added/removed/retyped at any checkpoint.
- You find the ~560–698 region contains logic that is neither header rendering nor filter UI (the map above marks it approximate) and it doesn't fit any planned hook — report what it is before inventing a fifth extraction.

## Maintenance notes

- Future DataTable features (e.g. built-in pagination, virtualization) should land as new hooks/subcomponents in `data-table/`, not back into the facade.
- The `any`-typing debt is now localized per-file and is a good follow-up plan (typed column definitions) — deferred deliberately.
- Reviewer: review commit-by-commit (one extraction each); the only acceptable diff shape is moved code + plumbing. Anything that "improves" logic in the same commit should be rejected.
