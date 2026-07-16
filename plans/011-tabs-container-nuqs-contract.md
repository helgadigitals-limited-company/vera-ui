# Plan 011: Resolve tabs-container's half-wired nuqs contract and adjacent export debris

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 7128c31..HEAD -- packages/ui/src/components/tabs-container.tsx packages/ui/src/index.ts packages/docs/content/docs/components/data-display/tabs-container.mdx`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED — touches a shipped component's runtime behavior; mitigated by plan 006's tabs-container tests (hard dependency)
- **Depends on**: plans/006-characterization-test-baseline.md (tabs-container tests must exist first)
- **Category**: tech-debt
- **Planned at**: commit `7128c31`, 2026-07-14

## Why this matters

`TabsContainer` is actively exported behind a stale comment claiming it's disabled, and its URL-persistence feature (`persistInUrl`, which **defaults to `true`**) calls nuqs' `useQueryState` unconditionally — any consumer who renders `<TabsContainer tabs={...} />` without wrapping their app in a `NuqsAdapter` gets a **runtime throw** (nuqs v2 throws "nuqs requires an adapter to work with your framework"). That's an adoption trap in the library's highest-churn component. Nearby, `index.ts` carries a commented-out `ui/pagination` export and exports two near-identically named menubars — confusing public surface.

## Current state

- `packages/ui/src/index.ts:62`:

```ts
export * from './components/tabs-container' // Temporarily disabled due to nuqs dependency issues
```

(The export is **live**; only the comment claims otherwise.)

- `packages/ui/src/components/tabs-container.tsx:55-82` (the hook is unconditional; `persistInUrl` only gates *which value is used*):

```tsx
const [localTab, setLocalTab] = useState(defaultTab || tabs[0]?.value || "");

// Only use nuqs if persistInUrl is true
const [urlTab, setUrlTab] = useQueryState(urlParamName, {
  shallow,
  history: historyMode,
  clearOnDefault: true,
  parse: (value) => {
    return tabs.some((tab) => tab.value === value)
      ? value
      : defaultTab || tabs[0]?.value || "";
  },
});

const activeTab = persistInUrl
  ? urlTab ?? defaultTab ?? tabs[0]?.value ?? ""
  : localTab;

const handleTabChange = (value: string) => {
  if (persistInUrl) {
    setUrlTab(value).catch(console.error);
  } else {
    setLocalTab(value);
  }
  onTabChange?.(value);
};
```

- Props: `persistInUrl = true` default (`tabs-container.tsx:49`); full props interface at lines 17-38.
- `nuqs` is in `packages/ui` `dependencies` and externalized in the rollup build — consumers get it installed; the missing piece is the **adapter/provider requirement**, which is undocumented.
- `packages/ui/src/index.ts:35`: `// export * from './components/ui/pagination'` (dead toggle; `components/Pagination.tsx` at line 61 is the exported one).
- `packages/ui/src/index.ts:32` + `:64`: both `./components/ui/menubar` (Radix primitives) and `./components/menuBar` (config-driven `MenuBar` composite) are exported.
- Docs page: `packages/docs/content/docs/components/data-display/tabs-container.mdx`.
- React's rules forbid conditional hooks — the fix must move the `useQueryState` call into a child component rendered only when `persistInUrl` is true (component splitting), not an `if` around the hook.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| tabs tests | `cd packages/ui && pnpm vitest run src/components/tabs-container.test.tsx` | pass |
| Full suite | `cd packages/ui && pnpm vitest run` | pass |
| Build | `pnpm build:ui` | exit 0 |
| Docs build | `pnpm build:docs` | exit 0 |

## Scope

**In scope** (the only files you should modify):
- `packages/ui/src/components/tabs-container.tsx`
- `packages/ui/src/components/tabs-container.test.tsx` (extend)
- `packages/ui/src/index.ts` (comments only — see Steps 4–5; no export additions/removals)
- `packages/docs/content/docs/components/data-display/tabs-container.mdx` (document the adapter requirement)
- `packages/ui/src/components/ui/pagination.tsx` (delete ONLY if Step 5's grep proves it unused)
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):
- Renaming `menuBar.tsx`/`MenuBar` or `Multi-select.tsx` — breaking changes deferred to a future major (see plans/README.md).
- Changing the `persistInUrl` **default** — flipping to `false` silently changes behavior for existing consumers; keep `true`.
- Removing `nuqs` from dependencies.

## Git workflow

- Branch: `advisor/011-tabs-container-nuqs-contract`
- Conventional commits: `fix(tabs-container): split URL-state path so persistInUrl={false} needs no nuqs adapter`, `docs: …`, `chore: …` as appropriate.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Characterize the failure (test first)

In `tabs-container.test.tsx`, add a case: render `<TabsContainer tabs={...} persistInUrl={false} />` **without** any nuqs adapter. On current code this throws (the unconditional `useQueryState`). Write the test asserting it renders fine — it should fail now.

**Verify**: `pnpm vitest run src/components/tabs-container.test.tsx` → new case fails with the nuqs adapter error; all pre-existing cases pass.

### Step 2: Split the component so the hook is conditional-by-structure

Refactor `tabs-container.tsx`:

1. Extract everything from the current function body **except** the `useQueryState` call into an internal presentational component, e.g. `TabsContainerInner`, taking `activeTab: string` and `onTabValueChange: (v: string) => void` plus the existing visual props.
2. Create internal `UrlPersistedTabs` — contains the `useQueryState` call and the `urlTab`-based `activeTab`/`handleTabChange` logic, renders `TabsContainerInner`.
3. Create internal `LocalTabs` — the `localTab` `useState` path, renders `TabsContainerInner`.
4. Exported `TabsContainer` becomes a thin switch: `return persistInUrl ? <UrlPersistedTabs {...props}/> : <LocalTabs {...props}/>`.

No prop or behavior changes for either mode; `onTabChange` fires in both, exactly as today. Keep all styling/scroll-arrow logic in `TabsContainerInner` untouched.

**Verify**: `pnpm vitest run src/components/tabs-container.test.tsx` → ALL cases pass, including Step 1's no-adapter case and plan 006's URL-mode cases (which use the testing adapter).

### Step 3: Document the contract

In `tabs-container.mdx`: add a prominent Callout — "URL persistence (`persistInUrl`, on by default) requires wrapping your app in a nuqs adapter (`NuqsAdapter` from `nuqs/adapters/react` / `nuqs/adapters/next/app` etc.); without one, either add the adapter or pass `persistInUrl={false}`" — with a minimal adapter code block. Match the page's existing Callout/MDX style.

**Verify**: `pnpm build:ui && pnpm build:docs` → exit 0.

### Step 4: Remove the stale export comment

`index.ts:62`: delete the trailing `// Temporarily disabled due to nuqs dependency issues`.

**Verify**: `grep -n "Temporarily disabled" packages/ui/src/index.ts` → empty.

### Step 5: Resolve the dead `ui/pagination` toggle

Check internal usage: `grep -rn "ui/pagination" packages/ui/src --include="*.tsx" --include="*.ts"`.
- If nothing imports it besides the commented `index.ts:35` line: delete `packages/ui/src/components/ui/pagination.tsx` and the commented line.
- If something imports it internally (e.g. DataTable): keep the file, delete only the commented export line, and note the internal consumer in your report.

**Verify**: `pnpm build:ui` → exit 0; `grep -n "ui/pagination" packages/ui/src/index.ts` → empty.

### Step 6: Full regression

**Verify**: `cd packages/ui && pnpm vitest run` → all pass; `pnpm lint` → exit 0; `pnpm build:ui && pnpm build:docs` → exit 0.

## Test plan

Step 1's no-adapter case (the regression this plan fixes), plus plan 006's existing tabs cases re-passing after the split (they are the characterization net for the refactor). Final: full vitest run passes.

## Done criteria

- [ ] `persistInUrl={false}` renders without any nuqs adapter (test proves it)
- [ ] URL mode behaves identically to before (plan 006 cases pass unchanged)
- [ ] Stale comment gone from `index.ts`
- [ ] `ui/pagination` toggle resolved per Step 5
- [ ] docs page documents the adapter requirement
- [ ] `pnpm build:ui`, `pnpm build:docs`, `pnpm lint`, full vitest run exit 0
- [ ] No files outside the in-scope list modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- Plan 006's tabs-container tests don't exist yet (dependency not met) — do not proceed without the characterization net.
- Step 1's no-adapter render does **not** throw on current code (the assumption about nuqs v2 throwing is wrong for the installed version) — re-scope: the split may still be right, but report first.
- The split forces changes to the exported props interface.
- Step 5's grep shows `ui/pagination` used by a component in a way that deleting the commented export would break consumers who deep-import (they shouldn't be able to — only `dist` ships — but report anything surprising).

## Maintenance notes

- If a future major release flips `persistInUrl` to default `false` (arguably the safer default), the switch structure from Step 2 makes that a one-line change.
- The `menuBar`/`menubar` naming collision and `Multi-select.tsx` casing remain — bundle them into the next major-version plan.
- Reviewer: diff `TabsContainerInner` against the old render body — it should be a pure move, zero logic edits.
