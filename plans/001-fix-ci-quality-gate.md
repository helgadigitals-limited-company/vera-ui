# Plan 001: Make the CI quality gate actually fail on lint/test/type errors

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 7128c31..HEAD -- .github/workflows/release.yml packages/ui/package.json packages/docs/package.json package.json`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW (the change itself; MED that it surfaces pre-existing failures that were hidden — that is the point)
- **Depends on**: none
- **Category**: dx
- **Planned at**: commit `7128c31`, 2026-07-14

## Why this matters

The GitHub Actions "Quality Checks" job (`.github/workflows/release.yml`) wraps every check in an `if …; then echo ✅ else echo ⚠️ fi` block with `2>/dev/null`, so **all three matrix legs exit 0 no matter what**. A PR with failing lint, failing tests, or type errors shows a green check, and merging to `main` triggers semantic-release, which **publishes the package to npm**. Additionally, the "typecheck" leg actually runs `pnpm run build:ui` (a full build, redundant with the separate `build` job), and no `typecheck` script exists in any package. Finally, `packages/ui`'s `"test": "vitest"` runs in watch mode locally, so `pnpm test` never exits for a developer or agent.

## Current state

- `.github/workflows/release.yml:44-71` — the quality step. Exact current content:

```yaml
      - name: Run ${{ matrix.check }}
        run: |
          case "${{ matrix.check }}" in
            lint)
              echo "Running linting checks..."
              if pnpm run lint 2>/dev/null; then
                echo "✅ Lint check passed"
              else
                echo "⚠️ Lint check skipped (no lint script found)"
              fi
              ;;
            test)
              echo "Running tests..."
              if pnpm run test 2>/dev/null; then
                echo "✅ Tests passed"
              else
                echo "⚠️ Tests skipped (no test script found)"
              fi
              ;;
            typecheck)
              echo "Running TypeScript checks..."
              if pnpm run build:ui 2>/dev/null; then
                echo "✅ TypeScript check passed"
              else
                echo "⚠️ TypeScript check completed with warnings"
              fi
              ;;
          esac
```

- `packages/ui/package.json:23-32` — scripts include `"test": "vitest"` (watch mode), `"build:lib": "tsc && vite build"`. No `typecheck` script.
- `packages/docs/package.json` scripts — `build`, `dev`, `start`, `postinstall`, `lint`, `extract-code`. No `typecheck`, no `test`.
- Root `package.json:6-15` — `"lint": "pnpm --recursive lint"`, `"test": "pnpm --recursive test"`. No `typecheck`. `engines` says `node >=18, pnpm >=8` while CI pins Node 22 / pnpm 10 (`release.yml:12-14`) — no `packageManager` field.
- `packages/ui/vite.config.ts` references `./tsconfig.app.json` — the ui package uses a split tsconfig (`tsconfig.json` referencing `tsconfig.app.json`/`tsconfig.node.json`, standard Vite layout). Confirm the exact file names before Step 1.
- Conventions: `pnpm --recursive run <script>` skips packages that don't define the script — that is fine and expected.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Install | `pnpm install` | exit 0 |
| Lint all | `pnpm lint` | exit 0 |
| UI tests (after Step 2) | `pnpm --filter @helgadigitals/vera-ui test` | runs once, exits 0 |
| Typecheck (after Step 1) | `pnpm typecheck` | exit 0 |
| Build lib | `pnpm build:ui` | exit 0, files in `packages/ui/dist/` |

## Scope

**In scope** (the only files you should modify):
- `.github/workflows/release.yml`
- `packages/ui/package.json` (scripts + engines-related fields only)
- `packages/docs/package.json` (scripts only)
- `package.json` (root — scripts, `engines`, `packageManager`)
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):
- `.github/workflows/docs-deploy.yml` — covered by plan 005.
- Any dependency additions/removals in `packages/ui/package.json` — covered by plan 002.
- Fixing pre-existing lint or test failures in source code — report them instead (see STOP conditions).
- The `release` and `build` jobs in `release.yml` — they work; only the `quality` job changes.

## Git workflow

- Branch: `advisor/001-fix-ci-quality-gate` (branch off `main`; the repo merges via PRs from `dev`/feature branches).
- Conventional commits (enforced by semantic-release), e.g. `ci: make quality checks fail on errors`. Use `ci:`/`chore:` types — **do not** use `fix:`/`feat:` (they trigger releases).
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Add typecheck scripts

- `packages/ui/package.json`: add `"typecheck": "tsc -p tsconfig.app.json --noEmit"`. First run `ls packages/ui/tsconfig*.json`; if `tsconfig.app.json` does not exist, use `"typecheck": "tsc --noEmit"` against the config that includes `src/`.
- `packages/docs/package.json`: add `"typecheck": "tsc --noEmit"` (a `tsconfig.json` exists in `packages/docs`).
- Root `package.json`: add `"typecheck": "pnpm --recursive typecheck"`.

**Verify**: `pnpm typecheck` → exit 0 for both packages. If either package fails with pre-existing type errors, see STOP conditions.

### Step 2: Make the test script non-interactive

In `packages/ui/package.json`, change `"test": "vitest"` to `"test": "vitest run"` and add `"test:watch": "vitest"` and `"test:coverage": "vitest run --coverage"`.

**Verify**: `pnpm --filter @helgadigitals/vera-ui test` → runs the existing `theme-provider.test.tsx` suite once (3 tests pass) and **exits** (does not watch).

### Step 3: Rewrite the quality step so failures fail

Replace the entire `Run ${{ matrix.check }}` step body in `.github/workflows/release.yml` with direct commands (no `if/else`, no `2>/dev/null`):

```yaml
      - name: Run ${{ matrix.check }}
        run: |
          case "${{ matrix.check }}" in
            lint)      pnpm run lint ;;
            test)      pnpm run test ;;
            typecheck) pnpm run typecheck ;;
          esac
```

**Verify**: `grep -n "2>/dev/null\|skipped\|warnings" .github/workflows/release.yml` → no matches in the quality job. Validate YAML: `python3 -c "import yaml,sys; yaml.safe_load(open('.github/workflows/release.yml'))"` → no error (or `pnpm dlx yaml-lint` equivalent).

### Step 4: Align engine pins

In root `package.json`: set `"engines": { "node": ">=22", "pnpm": ">=10" }` and add `"packageManager": "pnpm@10.12.1"` (use the operator's installed pnpm 10.x version: `pnpm --version`).

**Verify**: `pnpm install` → exit 0 (no engine errors), `git diff package.json` shows only engines/packageManager changes.

### Step 5: Run the full gate locally as CI will

**Verify**: `pnpm lint && pnpm --filter @helgadigitals/vera-ui test && pnpm typecheck` → all exit 0.

## Test plan

No new test files. The verification is the gate itself: after Step 3, introduce a deliberate type error in a scratch check (e.g. `echo "const x: number = 'a'" >> packages/ui/src/lib/utils.ts`), run `pnpm typecheck`, confirm non-zero exit, then **revert that change** (`git checkout packages/ui/src/lib/utils.ts`) and confirm `git status` is clean of it.

## Done criteria

- [ ] `pnpm typecheck` exists at root and exits 0
- [ ] `pnpm --filter @helgadigitals/vera-ui test` exits (non-watch) with all tests passing
- [ ] `release.yml` quality job contains no `2>/dev/null` and no unconditional-success `if/else`
- [ ] Deliberate-error probe (Test plan) produced a non-zero exit and was reverted
- [ ] No files outside the in-scope list are modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- `pnpm lint`, `pnpm typecheck`, or the test run fails due to **pre-existing** problems in source files. List every failure verbatim in your report; do not fix source code under this plan.
- The quality step in `release.yml` does not match the excerpt above (workflow drifted).
- `packages/ui` has no `tsconfig.app.json` **and** plain `tsc --noEmit` errors on config grounds (e.g. composite/project-reference errors) — report the tsconfig layout instead of restructuring it.

## Maintenance notes

- Plans 002–011 assume this gate works; land this first.
- Reviewer should scrutinize: that `ci:` commit types were used (no accidental release trigger), and that the matrix still has `fail-fast: false` so all three legs report.
- Deferred: pre-commit hooks / Prettier / commitlint (audit finding DX-03) — worthwhile but intentionally not bundled here.
