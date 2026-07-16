# Plan 007: Fix file-upload's leaked object URLs and preview churn

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 7128c31..HEAD -- packages/ui/src/components/ui/file-upload.tsx`
> If the file changed since this plan was written, compare the "Current state"
> excerpt against the live code before proceeding; on a mismatch, treat it as
> a STOP condition.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED — preview lifecycle touches mount/unmount/remove paths; the new tests plus manual dev-playground check gate it
- **Depends on**: plans/006-characterization-test-baseline.md (file-upload validation tests + `URL.createObjectURL` stubbing pattern)
- **Category**: bug
- **Planned at**: commit `7128c31`, 2026-07-14

## Why this matters

Every image a user selects leaks one `blob:` object URL: `processFiles` creates a preview URL, calls `onChange`, and when the parent round-trips `value` back, the sync effect calls `createFileWithPreview` **again** on the same `File` objects — `Object.assign` overwrites `.preview` with a fresh URL before anything revokes the first one. The cleanup paths only ever revoke the *previous state's* URLs. Long multi-file image sessions accumulate leaked blobs for the lifetime of the document. The re-creation also assigns a fresh `id` each pass, remounting the preview `<img>` (flicker).

## Current state

- `packages/ui/src/components/ui/file-upload.tsx` (498 lines). Key excerpt (`file-upload.tsx:244-331`, abridged):

```tsx
// Convert File to FileWithPreview
const createFileWithPreview = (file: File): FileWithPreview => {
  const fileWithPreview = Object.assign(file, {
    id: generateFileId(),
    preview: undefined,
  }) as FileWithPreview;

  if (isImage(file)) {
    fileWithPreview.preview = URL.createObjectURL(file);   // line 252
  }
  return fileWithPreview;
};

// Update files with preview when value changes
useEffect(() => {
  if (value) {
    const files = Array.isArray(value) ? value : [value];
    const newFilesWithPreview = files.map(createFileWithPreview);  // ← re-creates; old .preview overwritten by Object.assign above
    setFilesWithPreview((prev) => {
      prev.forEach((file) => { if (file.preview) URL.revokeObjectURL(file.preview); });
      return newFilesWithPreview;
    });
  } else { /* same revoke-prev + set [] */ }
}, [value]);

// Cleanup on unmount (lines 286-294): revokes filesRef.current previews

const processFiles = (newFiles: File[]) => {
  const validationError = validateFiles(newFiles);
  if (validationError) { onError?.(validationError); return; }
  const processedFiles = newFiles.map(createFileWithPreview);      // line 329 ← first URL created here
  onChange(multiple ? processedFiles : processedFiles[0] || null);
};
```

The leak sequence: `processFiles` → `createFileWithPreview` mutates the `File` with preview URL **A** → parent sets `value` → effect maps `createFileWithPreview` again → `Object.assign` sets `preview: undefined` then URL **B** on the *same object* → the revoke loop runs over `prev` (which doesn't contain these files) → URL **A** is orphaned. Note `prev.forEach` revoking can also revoke a URL still referenced when `value` keeps the same `File` objects across renders — the whole lifecycle needs one owner.

- Conventions: `cn()` for classes, existing code style (function components, hooks). Tests: Vitest/jsdom, `URL.createObjectURL` must be stubbed (see plan 006 Step 4 pattern).

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| This test file | `cd packages/ui && pnpm vitest run src/components/ui/file-upload.test.tsx` | pass |
| Full suite | `cd packages/ui && pnpm vitest run` | pass |
| Build | `pnpm build:ui` | exit 0 |
| Manual check | `pnpm dev:ui` then exercise the dev playground if it has a file-upload demo | previews render, no flicker |

## Scope

**In scope** (the only files you should modify):
- `packages/ui/src/components/ui/file-upload.tsx`
- `packages/ui/src/components/ui/file-upload.test.tsx` (extend from plan 006)
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):
- The validation logic (`validateFile`/`validateFiles`) — already correct and tested by plan 006.
- The component's public props/API — no signature changes.
- Mutating-a-`File`-object design (`Object.assign` on `File`) — a deeper redesign (wrapper objects instead of mutated Files) is out; fix within the current design.

## Git workflow

- Branch: `advisor/007-file-upload-preview-lifecycle`
- Conventional commit: `fix(file-upload): stop leaking object URLs and preserve preview identity`
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Failing test — count created vs revoked URLs

In `file-upload.test.tsx`, with `createObjectURL`/`revokeObjectURL` spies returning unique strings (`blob:mock-${n}`): render controlled (parent state holding `value`, `onChange` writes back to it — use a small wrapper component in the test), select one image file, let the round-trip settle. Assert **every created URL is either the currently displayed preview or has been revoked** (i.e. `created.filter(u => !revoked.includes(u))` has length ≤ 1 per image). Also assert the preview `<img src>` is stable across the round-trip (no flicker: same URL before/after value sync) — this documents the intended post-fix behavior.

**Verify**: `pnpm vitest run src/components/ui/file-upload.test.tsx` → the new leak test **fails** on current code (2 URLs created, ≤0 revoked).

### Step 2: Make the value-sync effect idempotent

In the `useEffect` on `value`, don't re-create previews for files that already have them. Replace the mapping with a reuse-or-create:

```tsx
const newFilesWithPreview = files.map((file) => {
  const existing = file as Partial<FileWithPreview>;
  if (existing.id && (!isImage(file) || existing.preview)) {
    return file as FileWithPreview;   // already processed by processFiles — keep id + preview
  }
  return createFileWithPreview(file);
});
```

And revoke only URLs that are actually being dropped:

```tsx
setFilesWithPreview((prev) => {
  const kept = new Set(newFilesWithPreview.map((f) => f.preview));
  prev.forEach((f) => {
    if (f.preview && !kept.has(f.preview)) URL.revokeObjectURL(f.preview);
  });
  return newFilesWithPreview;
});
```

Apply the same kept-set guard to the `else` (value cleared) branch — there `kept` is empty, so it reduces to the current behavior; keeping the shape symmetric is fine.

**Verify**: `pnpm vitest run src/components/ui/file-upload.test.tsx` → leak test and stability test pass.

### Step 3: Regression sweep on remove/clear/unmount

Add/confirm test cases: removing a file revokes its URL; clearing `value` (null) revokes all; unmount revokes all current previews (the `filesRef` cleanup at lines 286-294 — assert the spy calls). Uploading a *non-image* file creates no URL.

**Verify**: `pnpm vitest run src/components/ui/file-upload.test.tsx` → all pass; `cd packages/ui && pnpm vitest run` → full suite passes; `pnpm build:ui` → exit 0.

## Test plan

Step 1 (leak + preview stability), Step 3 (remove/clear/unmount revocation, non-image). Pattern: plan 006's file-upload tests with URL stubs. Final: full vitest run passes.

## Done criteria

- [ ] Leak test passes: created-but-unrevoked URLs ≤ number of currently displayed image previews
- [ ] Preview URL stable across a controlled round-trip (no re-creation)
- [ ] Remove/clear/unmount revocation tests pass
- [ ] `pnpm build:ui`, `pnpm lint`, full vitest run exit 0
- [ ] No files outside the in-scope list modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The excerpt doesn't match the live code (drifted — especially if plan 006 landed changes here beyond adding tests, which it must not have).
- The leak test cannot be made to fail on unfixed code (the round-trip doesn't reproduce in jsdom) — report the observed URL counts instead of asserting something else.
- Fixing requires changing the component's public props or the `FileWithPreview` type in `index.ts`-visible ways.

## Maintenance notes

- The underlying design (mutating `File` objects via `Object.assign`) remains; if this component is ever reworked, previews should live in a wrapper object keyed by file identity, and these tests transfer directly.
- Reviewer: scrutinize the `kept`-set logic against the "parent passes the same File objects every render" case and the "parent constructs new File objects" case — both must neither leak nor revoke-in-use.
