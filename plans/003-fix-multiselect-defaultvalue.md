# Plan 003: Fix MultiSelect discarding `defaultValue` on mount

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 7128c31..HEAD -- packages/ui/src/components/ui/Multi-select.tsx`
> If the file changed since this plan was written, compare the "Current state"
> excerpt against the live code before proceeding; on a mismatch, treat it as
> a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none (plan 001 recommended first so `pnpm test` is non-watch)
- **Category**: bug
- **Planned at**: commit `7128c31`, 2026-07-14

## Why this matters

`MultiSelect` documents an uncontrolled API via `defaultValue`, but a sync effect fires immediately after mount with `formValue === undefined` and resets the selection to `[]`. Every consumer using `defaultValue` (e.g. an edit form pre-populating selections outside react-hook-form) silently gets an empty component. This is a confirmed, user-visible bug in a published library.

## Current state

- `packages/ui/src/components/ui/Multi-select.tsx` — the whole component (388 lines). The bug:

```tsx
// Multi-select.tsx:146-153
const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue);
const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
const [isAnimating, setIsAnimating] = React.useState(false);

// Update selectedValues when formValue changes
React.useEffect(() => {
  setSelectedValues(formValue || []);
}, [formValue]);
```

- `formValue?: string[]` is declared at `Multi-select.tsx:120-123` ("The value of the multi-select component, controlled by the form") — it is the controlled-mode prop used by form integration; `defaultValue` (default `[]`, line 135) is the uncontrolled initial value.
- Repo conventions: tests use Vitest + Testing Library with jsdom (configured in `packages/ui/vite.config.ts` `test` block, setup file `packages/ui/src/test/setup.ts`). The one existing test, `packages/ui/src/components/theme-provider.test.tsx`, is the structural pattern to match (plain `render`, `describe`/`it`/`expect` imports from `vitest`).

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Run this test file | `cd packages/ui && pnpm vitest run src/components/ui/Multi-select.test.tsx` | all pass |
| Full suite | `cd packages/ui && pnpm vitest run` | all pass |
| Typecheck/build | `pnpm build:ui` | exit 0 |
| Lint | `pnpm lint` | exit 0 |

## Scope

**In scope** (the only files you should modify):
- `packages/ui/src/components/ui/Multi-select.tsx` (the effect at lines 150–153 only)
- `packages/ui/src/components/ui/Multi-select.test.tsx` (create)
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):
- Renaming the file to kebab-case (deliberately deferred — see plans/README.md rejected items).
- Refactoring `formValue` into a proper `value` controlled prop — behavior-compatible fix only; an API redesign is a breaking change.
- `packages/docs/**` — docs examples still work with the fixed behavior.

## Git workflow

- Branch: `advisor/003-fix-multiselect-defaultvalue`
- Conventional commit, e.g. `fix(multi-select): preserve defaultValue when uncontrolled` (a `fix:` commit correctly triggers a patch release once merged).
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Write the failing test first

Create `packages/ui/src/components/ui/Multi-select.test.tsx` modeled on `theme-provider.test.tsx`. Cases:

1. **defaultValue preserved (the bug)**: render `<MultiSelect options={[{label:"Apple",value:"apple"},{label:"Banana",value:"banana"}]} defaultValue={["apple"]} onValueChange={() => {}} />`; assert the trigger shows the selected badge — `expect(screen.getByText("Apple")).toBeInTheDocument()`.
2. **controlled formValue applied**: render with `formValue={["banana"]}` and no `defaultValue`; assert `Banana` is shown.
3. **formValue updates propagate**: rerender with `formValue={["apple"]}`, assert the badge changed.

Note: selected values render as badges containing the option label inside the trigger button (read `Multi-select.tsx` render section to confirm the exact text node before finalizing assertions; adjust selectors accordingly, e.g. `getByText`).

**Verify**: `cd packages/ui && pnpm vitest run src/components/ui/Multi-select.test.tsx` → case 1 **fails** (proving the bug), cases 2–3 pass.

### Step 2: Guard the sync effect

Change lines 150–153 to sync only when the controlled prop is actually provided:

```tsx
// Sync with the form-controlled value only when one is provided,
// so uncontrolled usage keeps its defaultValue.
React.useEffect(() => {
  if (formValue !== undefined) {
    setSelectedValues(formValue);
  }
}, [formValue]);
```

**Verify**: `cd packages/ui && pnpm vitest run src/components/ui/Multi-select.test.tsx` → all 3 pass.

### Step 3: Full-suite regression pass

**Verify**: `cd packages/ui && pnpm vitest run` → all pass; `pnpm build:ui` → exit 0; `pnpm lint` → exit 0.

## Test plan

Covered by Step 1 (three cases: uncontrolled default preserved, controlled initial, controlled update). Pattern: `theme-provider.test.tsx`. Final check: `cd packages/ui && pnpm vitest run` → all pass including 3 new tests.

## Done criteria

- [ ] `Multi-select.test.tsx` exists with the 3 cases and passes
- [ ] The unguarded `setSelectedValues(formValue || [])` no longer exists: `grep -n "formValue || \[\]" packages/ui/src/components/ui/Multi-select.tsx` → no match
- [ ] `pnpm build:ui` and `pnpm lint` exit 0
- [ ] No files outside the in-scope list modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The code at `Multi-select.tsx:146-153` doesn't match the excerpt (drifted).
- Case 1 of the new test **passes before the fix** — the bug isn't reproducible; report instead of "fixing" blind.
- The fix requires touching how badges render or any other part of the component.

## Maintenance notes

- If `formValue` is ever promoted to a real `value` prop with `onValueChange` as the setter (proper controlled component), this effect should be deleted entirely — leave a pointer in that future PR to these tests.
- Reviewer: confirm the guard uses `!== undefined` (not truthiness — an empty array `[]` is a legitimate controlled value and must still sync).
