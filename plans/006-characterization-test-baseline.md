# Plan 006: Establish a characterization-test baseline for the stateful composites

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 7128c31..HEAD -- packages/ui/src/components packages/ui/vite.config.ts`
> If in-scope component files changed since this plan was written, compare the
> "Current state" notes against the live code before proceeding; on a
> mismatch, treat it as a STOP condition. (New `*.test.tsx` files from plans
> 003/004 are expected, not drift.)

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: LOW (tests only — **characterization**: lock in current behavior, do not fix bugs found along the way)
- **Depends on**: plans/001-fix-ci-quality-gate.md (non-watch `test` script, CI that fails)
- **Category**: tests
- **Planned at**: commit `7128c31`, 2026-07-14

## Why this matters

The library publishes ~50 components to npm with exactly one test file (`theme-provider.test.tsx`). Every dependency bump and refactor ships unverified. This plan seeds tests where logic density and churn are highest, so future changes (including the deferred DataTable decomposition) have a safety net. The infra already exists — Vitest + jsdom + Testing Library + a setup file — only tests are missing.

## Current state

- Test infra: `packages/ui/vite.config.ts` `test:` block → `environment: 'jsdom'`, `setupFiles: ['./src/test/setup.ts']`. Pattern file: `packages/ui/src/components/theme-provider.test.tsx` (plain `render` from `@testing-library/react`, `describe/it/expect/beforeEach` from `vitest`). `@testing-library/jest-dom` is installed; check `src/test/setup.ts` to see whether its matchers are registered — if not, import `@testing-library/jest-dom/vitest` there (that edit is in scope).
- Targets (read each file before writing its tests):
  - `packages/ui/src/components/tabs-container.tsx` (198 lines) — **highest-churn file in the repo**. Renders `TabsContainer`; `persistInUrl` defaults to `true` and uses `useQueryState` from `nuqs` (line 58), so tests must wrap in nuqs' testing adapter (`import { NuqsTestingAdapter } from 'nuqs/adapters/testing'` — check the installed nuqs version's export path; `withNuqsTestingAdapter` also exists in v2). With `persistInUrl={false}` it uses plain local state.
  - `packages/ui/src/components/Pagination.tsx` (179 lines) — page-range math composite.
  - `packages/ui/src/components/DataTable.tsx` (1184 lines) — happy-path rendering, sorting, selection, pagination slice. Plans 003/004 may have already created `DataTable.test.tsx` / `Multi-select.test.tsx` — **extend those files, don't duplicate**.
  - `packages/ui/src/components/ui/file-upload.tsx` (498 lines) — validation logic at lines 297-320 (`validateFile`: max size in MB, allowed MIME types; `validateFiles`: max count) surfaces through `onError`.
- Coverage tooling installed but unwired: `@vitest/coverage-v8` in devDependencies; no `coverage` config in `vite.config.ts`.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Single file | `cd packages/ui && pnpm vitest run src/components/<file>.test.tsx` | pass |
| Full suite | `cd packages/ui && pnpm vitest run` | pass |
| Coverage | `cd packages/ui && pnpm vitest run --coverage` | report prints, exit 0 |
| Build | `pnpm build:ui` | exit 0 (tests are excluded from dts via vite.config `exclude`) |

## Scope

**In scope** (the only files you should create/modify):
- `packages/ui/src/components/tabs-container.test.tsx` (create)
- `packages/ui/src/components/Pagination.test.tsx` (create)
- `packages/ui/src/components/DataTable.test.tsx` (create or extend)
- `packages/ui/src/components/ui/file-upload.test.tsx` (create)
- `packages/ui/src/test/setup.ts` (only to register jest-dom matchers if absent)
- `packages/ui/vite.config.ts` (only to add a `coverage` block under `test`)
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):
- **Any component source file.** If a test reveals a bug, write the test to assert the *current* behavior with a `// BUG:` comment and list it in your report — characterization, not fixing. (Exception: none.)
- Thin Radix wrapper components (`ui/dialog.tsx`, `ui/select.tsx`, …) — low logic, low value.
- `Sidebar.tsx` / `ui/sidebar.tsx` — valuable but large; explicitly deferred to keep this plan a day-ish.

## Git workflow

- Branch: `advisor/006-characterization-tests`
- Conventional commits, `test: …` type (non-releasing), one commit per component is fine.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Wire coverage + jest-dom

Add to `vite.config.ts` `test` block:

```ts
coverage: {
  provider: 'v8',
  include: ['src/components/**', 'src/lib/**', 'src/hooks/**'],
  reporter: ['text', 'html'],
},
```

Register jest-dom in `src/test/setup.ts` if not already there.

**Verify**: `cd packages/ui && pnpm vitest run --coverage` → existing tests pass, coverage table prints.

### Step 2: Pagination tests

Read `Pagination.tsx` fully first (props, how page buttons render, boundary handling). Cases: first page (prev disabled), last page (next disabled), middle page renders expected page numbers/ellipsis, page-change callback fires with the right number, single-page and empty datasets don't crash.

**Verify**: `pnpm vitest run src/components/Pagination.test.tsx` → all pass.

### Step 3: tabs-container tests

Wrap renders in the nuqs testing adapter when `persistInUrl` is on. Cases:
1. `persistInUrl={false}`: first tab active by default; clicking another trigger switches content; `onTabChange` fires.
2. `defaultTab` respected.
3. `persistInUrl` (default): with the testing adapter's initial search params `?tab=b`, tab `b` is active; clicking `a` calls the adapter's `onUrlUpdate` with `tab=a`.
4. Hidden tabs (`hidden: true`) are not rendered; all-hidden renders the "No tabs available" empty state (`tabs-container.tsx:113-119`).
5. Invalid URL value falls back to `defaultTab`/first tab (the `parse` validator at `tabs-container.tsx:62-67`).

**Verify**: `pnpm vitest run src/components/tabs-container.test.tsx` → all pass.

### Step 4: file-upload validation tests

Drive through the public API: render `FileUpload` (read the component for the exact export name and required props), fire a change event on the hidden input with `new File([...], name, { type })` objects, assert `onError` messages for: oversize file (`maxSize`), disallowed type (`allowedTypes`), too many files (`maxFiles`), and that a valid file reaches `onChange`. jsdom lacks `URL.createObjectURL` — stub it in the test file: `vi.stubGlobal('URL', { ...URL, createObjectURL: vi.fn(() => 'blob:mock'), revokeObjectURL: vi.fn() })` (or assign the two methods directly).

**Verify**: `pnpm vitest run src/components/ui/file-upload.test.tsx` → all pass.

### Step 5: DataTable happy paths

Extend `DataTable.test.tsx` (from plan 004, or create). With a fixed 10-row dataset: renders all column headers and rows; uncontrolled sort click reorders first-column cell text; selection checkbox toggles a row and fires the selection callback; global filter narrows visible rows; row expansion toggles expanded content (`expandable`). Note: DataTable has **no built-in pagination** (that's the separate `Pagination` composite) and does **not** use TanStack Table — it is hand-rolled state. Read the props type first; keep to behaviors reachable through public props.

**Verify**: `pnpm vitest run src/components/DataTable.test.tsx` → all pass.

### Step 6: Full suite + coverage snapshot

**Verify**: `cd packages/ui && pnpm vitest run --coverage` → all pass; record the coverage summary lines for the four target files in your report. `pnpm build:ui` → exit 0 (confirms tests don't leak into the build).

## Test plan

This plan *is* the test plan; per-step cases above. Pattern: `theme-provider.test.tsx`. Expected new files: 4 (or 3 + one extended).

## Done criteria

- [ ] Test files exist for tabs-container, Pagination, DataTable, file-upload with the listed cases
- [ ] `cd packages/ui && pnpm vitest run` → all pass (≥ ~15 new tests)
- [ ] Coverage runs and reports on the four target files
- [ ] Zero component source files modified: `git diff --name-only | grep -v test | grep src/components` → empty (setup.ts and vite.config.ts allowed)
- [ ] `pnpm build:ui` exits 0
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The nuqs testing adapter import path doesn't exist in the installed version after checking both `nuqs/adapters/testing` and the package's exports map — report the available adapters instead of mocking nuqs internals by hand.
- A component cannot be driven through its public props in jsdom after two approaches (e.g. requires real layout/scroll measurements) — write the cases you can, list the blocked ones.
- You find yourself wanting to edit a component to make it testable — that's a report item, not a change.

## Maintenance notes

- This baseline is the explicit prerequisite for decomposing `DataTable.tsx` (audit finding DEBT-01) — do not start that refactor until this plan is DONE.
- Any `// BUG:` characterization assertions in these tests are an inventory for future fix plans — reviewer should read them.
- Deferred: Sidebar system tests, browser-mode/Playwright adoption or removal of those unused devDependencies.
