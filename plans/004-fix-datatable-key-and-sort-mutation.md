# Plan 004: Fix DataTable's unkeyed row fragment and in-place sort-state mutation

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 7128c31..HEAD -- packages/ui/src/components/DataTable.tsx`
> If the file changed since this plan was written, compare the "Current state"
> excerpts against the live code before proceeding; on a mismatch, treat it as
> a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none (plan 001 recommended first)
- **Category**: bug
- **Planned at**: commit `7128c31`, 2026-07-14

## Why this matters

Two confirmed defects in the library's largest component (`DataTable.tsx`, 1184 lines):

1. The row-render map returns a **shorthand fragment `<>` as the list element** with the `key` on the inner `<TableRow>`. React reconciles the list at the fragment level, so keys are effectively absent: sorting/filtering/expanding can reuse the wrong DOM rows (expanded content, focus, and checkbox state attach to the wrong logical row), plus the console key warning.
2. The sort handlers **mutate sort-rule objects in place** (`existing.direction = …`). `existing` is an element of `effectiveSortState`, which is `sortState ?? internalSortState` — when the consumer controls `sortState`, the component writes directly into the parent's prop array element, breaking referential-equality change detection and producing "stuck" sort toggles.

## Current state

- `packages/ui/src/components/DataTable.tsx` — sorting/pagination/selection composite around TanStack table.

Defect 1, `DataTable.tsx:1083-1102` (abridged):

```tsx
{processedRows.map(({ row, id }) => {
  const rowSelected = selectable && isRowSelected(id);
  const rowExpanded = expandable && isRowExpanded(id);

  return (
    <>
      {/* Main row */}
      <TableRow
        key={id}
        data-row-id={id}
        ...
```

Defect 2a, `DataTable.tsx:251-278` — `toggleSortForColumn`:

```tsx
const existing = effectiveSortState.find((r) => r.key === col);
let next: SortRule[] = [];
if (additive && multiSort) {
  next = [...effectiveSortState];
  if (!existing) {
    next.push({ key: col, direction: "asc" });
  } else if (existing.direction === "asc") {
    existing.direction = "desc";        // ← mutates prop/state object
    next = [...next];
  } else {
    next = next.filter((r) => r.key !== col);
  }
}
```

Defect 2b, `DataTable.tsx:280-306` — `setSortForColumn`, same pattern at line 299 (`existing.direction = direction;`).

- Context: `effectiveSortState = sortState ?? internalSortState` (line 241); `applySortChange` (243-249) calls `onSortChange` and, when uncontrolled, `setInternalSortState`.
- The file starts with an eslint disable for `no-explicit-any` and uses `useCallback` heavily — match existing style, don't "clean up" beyond the two defects.
- Test conventions: Vitest + Testing Library + jsdom; pattern file `packages/ui/src/components/theme-provider.test.tsx`.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Run this test file | `cd packages/ui && pnpm vitest run src/components/DataTable.test.tsx` | all pass |
| Full suite | `cd packages/ui && pnpm vitest run` | all pass |
| Build/typecheck | `pnpm build:ui` | exit 0 |
| Lint | `pnpm lint` | exit 0 |

## Scope

**In scope** (the only files you should modify):
- `packages/ui/src/components/DataTable.tsx` — only: the fragment at ~1088, `toggleSortForColumn` (~251-278), `setSortForColumn` (~280-306)
- `packages/ui/src/components/DataTable.test.tsx` (create)
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):
- Any other part of `DataTable.tsx` — the `any` casts, filtering, pagination, selection logic. A broader refactor is deliberately deferred until characterization tests (plan 006) exist.
- `packages/ui/src/components/ui/table.tsx` — the primitives are fine.

## Git workflow

- Branch: `advisor/004-fix-datatable-key-and-sort-mutation`
- Conventional commit, e.g. `fix(data-table): key row fragments and stop mutating controlled sort state`
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Failing tests first

Create `packages/ui/src/components/DataTable.test.tsx` (pattern: `theme-provider.test.tsx`). Before writing, read `DataTable.tsx`'s props section to get exact prop names for columns/data/sorting (`sortableColumns`, `sortState`, `onSortChange`, `defaultSortState`, `multiSort` appear in lines 235-306; confirm the data/columns prop shapes from the component's Props type). Cases:

1. **Controlled sort state is not mutated**: render with `sortState={[{ key: "name", direction: "asc" }]}` (keep a reference to the array), `onSortChange` spy, `sortableColumns={["name"]}`; click the `name` header sort control; assert `onSortChange` was called with a rule `{ key: "name", direction: "desc" }` **and** the original array's element still has `direction === "asc"` (`expect(original[0].direction).toBe("asc")`).
2. **Multi-sort additive toggle doesn't mutate**: same assertion pattern with `multiSort` and an additive interaction if the component exposes it via shift-click (read the header click handler to find how `additive` is derived; if additive interaction is impractical to simulate, call the same flow through two sequential clicks and keep the immutability assertion).
3. **Rows keyed correctly**: render ~3 rows with `expandable` if cheap, or simply assert no `Warning: Each child in a list` console error — mount with a `vi.spyOn(console, 'error')` and assert no call containing `unique "key" prop` after render + a sort toggle.

**Verify**: `cd packages/ui && pnpm vitest run src/components/DataTable.test.tsx` → case 1 and case 3 **fail** on the unfixed code (mutation observed / key warning fired); if either unexpectedly passes, see STOP conditions.

### Step 2: Fix the sort mutations

In `toggleSortForColumn`, replace the mutating branch:

```tsx
} else if (existing.direction === "asc") {
  next = next.map((r) => (r.key === col ? { ...r, direction: "desc" as const } : r));
} else {
```

In `setSortForColumn`, replace:

```tsx
} else {
  next = next.map((r) => (r.key === col ? { ...r, direction } : r));
}
```

(Adjust to the file's exact local variable names; the invariant: **never assign to a property of an object that came from `effectiveSortState`**.)

**Verify**: `cd packages/ui && pnpm vitest run src/components/DataTable.test.tsx` → mutation tests pass. `grep -n "existing.direction = " packages/ui/src/components/DataTable.tsx` → no matches.

### Step 3: Key the fragment

At ~line 1088, replace `<>` with `<React.Fragment key={id}>` (and the matching `</>` with `</React.Fragment>`); remove the now-redundant `key={id}` from the inner `<TableRow>`. Check the file's imports: if it imports React as a namespace (`import * as React` or `import React`), use that; if it only imports named hooks, add `Fragment` to the named imports and use `<Fragment key={id}>`.

**Verify**: `cd packages/ui && pnpm vitest run src/components/DataTable.test.tsx` → key-warning test passes; `pnpm build:ui` → exit 0.

### Step 4: Full regression

**Verify**: `cd packages/ui && pnpm vitest run` → all pass; `pnpm lint` → exit 0.

## Test plan

Cases in Step 1: controlled-sort immutability (the regression this plan fixes), additive multi-sort immutability, no key warning across render + reorder. Pattern: `theme-provider.test.tsx`. Final: `cd packages/ui && pnpm vitest run` → all pass including new tests.

## Done criteria

- [ ] `grep -n "existing.direction" packages/ui/src/components/DataTable.tsx` → no assignment matches
- [ ] The row map's list element is a keyed `Fragment`; no `<>` remains in the `processedRows.map` block
- [ ] `DataTable.test.tsx` exists; all cases pass
- [ ] `pnpm build:ui`, `pnpm lint`, full vitest run all exit 0
- [ ] No files outside the in-scope list modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The excerpts don't match the live code (drifted).
- You cannot trigger the sort interaction from the rendered DOM (e.g. header controls are rendered through a dropdown you can't reach in jsdom) after two attempts — report what the header renders instead of restructuring the component to make it testable.
- Case 1 passes before the fix — mutation not reproducible as described.
- Fixing requires changes outside the three code regions listed in scope.

## Maintenance notes

- Plan 006 adds broader DataTable characterization tests; these regression tests should be kept alongside them (same file is fine).
- Reviewer: check that the `next = [...next]` no-op copies left behind by the old pattern were either removed or are harmless; ensure no behavior change in the sort *sequence* (asc → desc → none).
- The deferred DataTable decomposition (audit finding DEBT-01) must not begin until plan 006 lands.
