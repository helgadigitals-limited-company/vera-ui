# Plan 005: Fix the semantic-release version write-back and the docs image tag source

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 7128c31..HEAD -- packages/ui/.releaserc.json packages/ui/package.json .github/workflows/docs-deploy.yml`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW–MED (release config; a mistake shows up only on the next real release — do a `--dry-run` verification)
- **Depends on**: none
- **Category**: dx
- **Planned at**: commit `7128c31`, 2026-07-14

## Why this matters

`packages/ui/package.json` says `"version": "1.0.0"` while the changelog and git history show releases up to **1.4.1** (`chore(release): 1.4.1 [skip ci]`). Root cause (verify in Step 1): semantic-release runs with `cwd = packages/ui` (`release.yml:155` → `cd packages/ui && pnpm release`), but `.releaserc.json` uses **repo-root-relative paths**. The `@semantic-release/git` asset `"packages/ui/package.json"` resolves to the nonexistent `packages/ui/packages/ui/package.json`, so the version bump is never committed back (while `"CHANGELOG.md"` resolves correctly to `packages/ui/CHANGELOG.md` — which *is* committed, matching observed history). The same path bug affects `@semantic-release/npm`'s `tarballDir` and the GitHub release `assets` globs (release assets likely silently missing). Downstream, `.github/workflows/docs-deploy.yml` derives its Docker image tag from the stale `package.json` version, so docs images tag as `1.0.0-<sha>`, colliding across releases and defeating rollback-by-tag.

## Current state

- `packages/ui/.releaserc.json:44-67` (excerpts, exactly as written today):

```json
    [
      "@semantic-release/npm",
      { "npmPublish": true, "tarballDir": "packages/ui/dist" }
    ],
    [
      "@semantic-release/github",
      {
        "assets": [
          { "path": "packages/ui/dist/*.js", "label": "Distribution files" },
          { "path": "packages/ui/dist/*.css", "label": "Stylesheet" },
          { "path": "CHANGELOG.md", "label": "Changelog" }
        ]
      }
    ],
    [
      "@semantic-release/git",
      {
        "assets": ["CHANGELOG.md", "packages/ui/package.json"],
        "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ]
```

- `.github/workflows/release.yml:149-155` — release step: `run: cd packages/ui && pnpm release` (so semantic-release's cwd is `packages/ui`; plugin paths resolve relative to it).
- `packages/ui/package.json:3` — `"version": "1.0.0"`.
- `packages/ui/CHANGELOG.md:1` — top entry is `## [1.4.1] … (2026-05-02)`.
- `.github/workflows/docs-deploy.yml:32-39`:

```yaml
      - name: Extract UI version
        id: version
        run: |
          UI_VERSION=$(jq -r '.version' packages/ui/package.json)
          echo "UI_VERSION=$UI_VERSION" >> $GITHUB_OUTPUT
          echo "IMAGE_TAG=${UI_VERSION}-${GITHUB_SHA:0:7}" >> $GITHUB_OUTPUT
```

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Latest release tag | `git tag --sort=-v:refname \| head -5` | shows `v1.4.1` (or newer) at top |
| Dry-run release (no publish) | `cd packages/ui && pnpm release:dry-run` | runs; requires `GITHUB_TOKEN`/CI env — if it errors on auth locally, that specific failure is acceptable (see Step 4) |
| JSON validity | `jq . packages/ui/.releaserc.json` | parses |
| Workflow YAML validity | `python3 -c "import yaml; yaml.safe_load(open('.github/workflows/docs-deploy.yml'))"` | no error |

## Scope

**In scope** (the only files you should modify):
- `packages/ui/.releaserc.json`
- `packages/ui/package.json` (the `version` field only)
- `.github/workflows/docs-deploy.yml` (the `Extract UI version` step only)
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):
- `.github/workflows/release.yml` — plan 001 owns it; the `cd packages/ui` invocation stays as-is.
- Docker/deploy steps in `docs-deploy.yml` beyond the version extraction.
- Any dependency or script changes in `package.json`.

## Git workflow

- Branch: `advisor/005-fix-release-version-writeback`
- Conventional commits with non-releasing types: `ci: …` / `chore(release-config): …`. **Do not use `fix:`** — this must not itself trigger a release.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Confirm the root cause

Confirm the released version really is ahead of the manifest: `git tag --sort=-v:refname | head -5` (expect `v1.4.1` or newer) and `npm view @helgadigitals/vera-ui version` (network permitting). Confirm no commit ever changed `version` in `packages/ui/package.json` post-1.0.0: `git log --oneline -p -- packages/ui/package.json | grep -n '"version"' | head`.

**Verify**: latest tag > 1.0.0 and no `"version"` bump commits found. If the npm version and git tags disagree wildly with 1.4.1, STOP and report.

### Step 2: Fix the plugin paths to be cwd-relative

In `packages/ui/.releaserc.json`:
- `@semantic-release/npm` → `"tarballDir": "dist"`
- `@semantic-release/github` assets → `"dist/*.js"`, `"dist/*.css"`, `"CHANGELOG.md"` (unchanged)
- `@semantic-release/git` assets → `["CHANGELOG.md", "package.json"]`

**Verify**: `jq . packages/ui/.releaserc.json` parses; `jq -r '.plugins[] | select(type=="array" and .[0]=="@semantic-release/git") | .[1].assets[]' packages/ui/.releaserc.json` prints `CHANGELOG.md` and `package.json`.

### Step 3: Sync the manifest version to the last release

Set `packages/ui/package.json` `"version"` to the latest released version found in Step 1 (e.g. `1.4.1` — use the actual latest tag, stripped of `v`).

**Verify**: `jq -r .version packages/ui/package.json` matches the latest tag.

### Step 4: Dry-run

`cd packages/ui && pnpm release:dry-run`. In a local environment without CI tokens this may fail at the auth/verify-conditions stage — that specific failure is acceptable; what must NOT appear is any path error mentioning `packages/ui/packages/ui` or a config parse error.

**Verify**: output shows plugins loaded and (if auth allows) the computed next version; no `ENOENT`/path errors.

### Step 5: Make the docs image tag resilient

In `.github/workflows/docs-deploy.yml`, change the extraction to prefer the latest git tag and fall back to the manifest:

```yaml
      - name: Extract UI version
        id: version
        run: |
          UI_VERSION=$(git describe --tags --abbrev=0 2>/dev/null | sed 's/^v//')
          if [ -z "$UI_VERSION" ]; then
            UI_VERSION=$(jq -r '.version' packages/ui/package.json)
          fi
          echo "UI_VERSION=$UI_VERSION" >> $GITHUB_OUTPUT
          echo "IMAGE_TAG=${UI_VERSION}-${GITHUB_SHA:0:7}" >> $GITHUB_OUTPUT
          echo "📦 UI Version: $UI_VERSION"
          echo "🏷️  Image Tag: ${UI_VERSION}-${GITHUB_SHA:0:7}"
```

(The workflow already checks out with `fetch-depth: 0`, so tags are available.)

**Verify**: YAML parses (command above). Simulate locally: run the same shell block in the repo root and confirm it prints the latest tag's version.

## Test plan

No unit tests (CI/release config). Verification = Step 1 evidence, Step 4 dry-run, Step 5 local simulation. The true end-to-end proof is the next real release commit updating `packages/ui/package.json` — note that in your report as a post-merge check for the maintainer.

## Done criteria

- [ ] `.releaserc.json` contains no `packages/ui/` path prefixes: `grep -c "packages/ui" packages/ui/.releaserc.json` → `0`
- [ ] `jq -r .version packages/ui/package.json` equals the latest release tag (sans `v`)
- [ ] `docs-deploy.yml` derives `UI_VERSION` from `git describe --tags` with a manifest fallback
- [ ] Dry-run shows no path/config errors
- [ ] No files outside the in-scope list modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- Step 1 shows the version write-back HAS been landing (a commit bumps `version` post-1.0.0) — the root-cause hypothesis is wrong; report what you find.
- Git tags, npm, and CHANGELOG disagree with each other about the latest version.
- The dry-run fails with a config error *other than* auth/token verification.

## Maintenance notes

- After the next real release, confirm the release commit now includes `packages/ui/package.json` and GitHub release assets include the dist files.
- If the repo ever moves semantic-release invocation to the repo root (removing `cd packages/ui`), all these paths must flip back to root-relative — the invariant is "plugin paths are relative to semantic-release's cwd".
- Reviewer: double-check no `fix:`/`feat:` commit type slipped into this branch.
