# Plan 009: Fix wrong docs content and clean the repo root

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 7128c31..HEAD -- packages/docs/content packages/docs/package.json CLAUDE.md .gitignore`
> If in-scope files changed since this plan was written, compare the "Current
> state" excerpts against the live code before proceeding; on a mismatch,
> treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: docs
- **Planned at**: commit `7128c31`, 2026-07-14

## Why this matters

Actively-wrong docs are worse than missing ones: the navigation category landing page has ~8 links pointing at pages that don't exist at those paths, alert examples display leftover shadcn placeholder text referencing a CLI this project doesn't ship, and `CLAUDE.md` claims an extract-code `prebuild` step that doesn't exist (the docs dev server never regenerates extracted code, so contributors see stale previews). Meanwhile the repo root carries a committed code-graph tool cache (`graphify-out/`, hundreds of JSON blobs), a 0-byte markdown file, and duplicated sidebar/contributing docs that drift from the site.

## Current state

- `packages/docs/content/docs/components/navigation/navigation-components.mdx:13-26` links (verbatim targets) vs reality — the `navigation/` directory contains only `menu-bar.mdx`, `navigation-components.mdx`, `reusable-sidebar.mdx`, `meta.json`:

| Link target on the page | Reality | Correct action |
|---|---|---|
| `/docs/components/navigation/sidebar` | no such page | point to `/docs/components/navigation/reusable-sidebar` |
| `/docs/components/navigation/navigation-menu` | no such page | remove the bullet (page creation is plan 010) |
| `/docs/components/navigation/breadcrumb` | no such page | remove the bullet (plan 010) |
| `/docs/components/navigation/tabs` | no such page | point to `/docs/components/data-display/tabs-container` |
| `/docs/components/navigation/pagination` | page lives in data-display | point to `/docs/components/data-display/pagination` |
| `/docs/components/navigation/command` | no such page | remove the bullet (plan 010) |
| `/docs/components/navigation/sheet` | no such page | remove the bullet (plan 010) |
| `/docs/components/navigation/collapsible` | page lives in data-display | point to `/docs/components/data-display/collapsible` |

  (`/docs/components/navigation/reusable-sidebar` and `/docs/components/navigation/menu-bar` are correct already.)
- `packages/docs/content/docs/components/data-display/alert.mdx:79` and `:89` — demo text inside the Basic Alert example (both the `code={...}` string and the live JSX): "You can add components to your app using the cli." No CLI exists (`packages/ui/package.json` has no `bin`). Replace the sentence in both places with neutral demo copy, e.g. "This is a default alert with a title and description." Check whether the same string exists elsewhere: `grep -rn "using the cli" packages/docs/content packages/docs/components` and fix every hit the same way (keep `code={}` string and JSX in sync per hit).
- `CLAUDE.md` (repo root) — states extract-code "is a `prebuild` step in docs `package.json`". Reality (`packages/docs/package.json`): `"build": "pnpm extract-code && next build"`, no `prebuild`, and `"dev": "next dev --turbo"` never extracts.
- Repo root, all git-tracked: `graphify-out/` (code-graph tool output: `graph.json`, `graph.html`, `cache/ast/*.json`, …), `MIXED_SIDEBAR_EXAMPLE.md` (**0 bytes**), `ComponentPreview-Enhancement-Summary.md` (internal dev changelog), `SIDEBAR_USAGE.md` (~16KB, overlaps `navigation/reusable-sidebar.mdx` + `layout/sidebar-layout.mdx`). `.gitignore` does not cover `graphify-out/`.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Build docs (validates MDX + links compile) | `pnpm build:ui && pnpm build:docs` | exit 0 |
| Docs dev (spot check) | `pnpm dev:docs` | pages render |
| Stray-string check | `grep -rn "using the cli" packages/docs` | no matches (after fix) |

## Scope

**In scope** (the only files you should modify/delete):
- `packages/docs/content/docs/components/navigation/navigation-components.mdx`
- `packages/docs/content/docs/components/data-display/alert.mdx` (+ any other `grep` hits for the CLI string, docs content/examples only)
- `packages/docs/package.json` (add `"predev": "pnpm extract-code"` only)
- `CLAUDE.md` (the one sentence about extract-code/prebuild)
- `.gitignore` (add `graphify-out/`)
- Delete: `graphify-out/` (git rm -r), `MIXED_SIDEBAR_EXAMPLE.md`, `ComponentPreview-Enhancement-Summary.md`, `SIDEBAR_USAGE.md` (conditional — see Step 4)
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):
- Creating the missing component pages (navigation-menu, breadcrumb, command, sheet…) — that is plan 010.
- `Contributing.mdx`, `DOCKER.md`, `DOCKER_DEPLOYMENT.md`, `README.md` at root — each has plausible standalone value; consolidation needs a maintainer call.
- `packages/docs/lib/extracted-code.json` gitignore decision — `predev` fixes the staleness trap; untracking the artifact changes the Docker build's assumptions, defer it.

## Git workflow

- Branch: `advisor/009-docs-accuracy-and-hygiene`
- Conventional commits: `docs: …` for content, `chore: …` for hygiene/gitignore. (Note: `docs:` only triggers a release when scoped `README` per `.releaserc.json` — plain `docs:` is safe.)
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Fix the navigation landing page links

Apply the table above to `navigation-components.mdx`. For "remove the bullet" rows, delete the whole bullet line (plan 010 re-adds them with real pages).

**Verify**: for every remaining `/docs/components/...` link in the file, the target `.mdx` exists: extract targets with `grep -o "/docs/components/[a-z/-]*" packages/docs/content/docs/components/navigation/navigation-components.mdx | sort -u` and check each maps to a file under `packages/docs/content/docs/components/` (path + `.mdx`).

### Step 2: Replace the phantom-CLI demo copy

Fix `alert.mdx:79` and `:89` (and all other grep hits) as described in Current state — the `code={...}` string and the rendered JSX must stay identical to each other within each preview.

**Verify**: `grep -rn "using the cli" packages/docs` → no matches.

### Step 3: Un-stale the docs dev loop + fix CLAUDE.md

- `packages/docs/package.json`: add `"predev": "pnpm extract-code"` to scripts (pnpm runs pre-scripts automatically).
- `CLAUDE.md`: replace the claim that extract-code "is a `prebuild` step" with the accurate statement: it runs chained inside the docs `build` script and via `predev` before `dev`.

**Verify**: `cd packages/docs && pnpm dev` → the extract-code output appears before Next starts (Ctrl-C after it boots). `grep -n "prebuild" CLAUDE.md` → no stale claim.

### Step 4: Root hygiene

- `git rm -r graphify-out/` and add `graphify-out/` to `.gitignore`.
- `git rm MIXED_SIDEBAR_EXAMPLE.md ComponentPreview-Enhancement-Summary.md`.
- `SIDEBAR_USAGE.md`: first compare against the site docs — `diff <(cat SIDEBAR_USAGE.md) <(cat packages/docs/content/docs/components/navigation/reusable-sidebar.mdx)` is not meaningful line-wise, so instead scan for headings/features present in the root file but absent from `reusable-sidebar.mdx` and `layout/sidebar-layout.mdx` (grep the site pages for each `##` topic in `SIDEBAR_USAGE.md`). If every topic is covered on the site, `git rm SIDEBAR_USAGE.md`. If unique content exists (the audit noted a "Mixed Content Support" section), move that content into `reusable-sidebar.mdx` first, then delete.

**Verify**: `git status` shows the deletions; `git ls-files | grep -i "graphify\|MIXED_SIDEBAR\|ComponentPreview-Enhancement"` → empty.

### Step 5: Full docs build

**Verify**: `pnpm build:ui && pnpm build:docs` → exit 0 (proves MDX still compiles and extract-code runs).

## Test plan

No unit tests (content/config). Verification = link-target check (Step 1), greps, and the full docs build.

## Done criteria

- [ ] Every `/docs/components/...` link on the navigation landing page resolves to an existing `.mdx`
- [ ] `grep -rn "using the cli" packages/docs` → empty
- [ ] `predev` script present; CLAUDE.md claim corrected
- [ ] `graphify-out/`, `MIXED_SIDEBAR_EXAMPLE.md`, `ComponentPreview-Enhancement-Summary.md` untracked; `SIDEBAR_USAGE.md` resolved per Step 4
- [ ] `pnpm build:docs` exits 0
- [ ] No files outside the in-scope list modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- `SIDEBAR_USAGE.md` contains substantial unique content whose right home is ambiguous — list the unique sections and stop rather than guessing placement.
- The docs build fails for reasons unrelated to your edits (pre-existing breakage) — report the error verbatim.
- Anything under `graphify-out/` appears to be referenced by code or config (`grep -rn "graphify" --include="*.{ts,tsx,json,mjs}" packages/ .github/ | grep -v graphify-out/`) — investigate before deleting.

## Maintenance notes

- Plan 010 re-adds the removed navigation bullets alongside the new pages — coordinate ordering (009 before 010 is the intended sequence).
- Reviewer: check the alert demo copy reads naturally in both the code string and the preview.
- Deferred: consolidating root `Contributing.mdx` vs the site's contributing pages; untracking `extracted-code.json`.
