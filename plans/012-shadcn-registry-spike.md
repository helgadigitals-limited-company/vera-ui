# Plan 012: Spike a shadcn-compatible registry for vera-ui (design/spike, not full rollout)

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. This is a **spike**: the deliverable is a working
> pilot + a written recommendation, not a shipped feature. When done, update
> the status row for this plan in `plans/README.md` — unless a reviewer
> dispatched you and told you they maintain the index.
>
> **Drift check (run first)**: `git diff --stat 7128c31..HEAD -- packages/ui/components.json packages/ui/src/components/ui packages/docs/next.config.mjs`
> If these changed since this plan was written, compare the "Current state"
> facts against the live code before proceeding; on a mismatch, treat it as a
> STOP condition.

## Status

- **Priority**: P3
- **Effort**: M (spike; full rollout would be L and is out of scope)
- **Risk**: LOW for the spike (additive); the *decision* it informs is MED (long-term public-surface commitment)
- **Depends on**: none (plan 002 moves the `shadcn` package to devDependencies — compatible either order)
- **Category**: direction
- **Planned at**: commit `7128c31`, 2026-07-14

## Why this matters

vera-ui's components are shadcn-derived (git history: `chore: update shadcn components`), and its docs even carried leftover "add via CLI" copy — but the library ships only as a monolithic npm package. The dominant distribution model for Radix+Tailwind component libraries is a **registry**: consumers run `npx shadcn add <url-or-name>` and get the component *source* copied into their app (ownership, per-component adoption, no version lock). The infrastructure is unusually cheap here: `packages/ui` already has a valid `components.json` and the `shadcn` CLI in its dependency tree, and the docs site is a Next.js app that can serve the registry JSON statically. This spike builds a 3-component pilot end-to-end and produces a go/no-go recommendation with the real costs enumerated.

## Current state

- `packages/ui/components.json` exists and resolves (verified via `npx shadcn@latest info -c packages/ui`): style `radix-mira`, Tailwind **v4** (`tailwindCss: src/index.css`, no tailwind config file), aliases `@/components`, `@/lib/utils`, `@/components/ui`, `@/lib`, `@/hooks`; icon library `lucide`.
- Component sources live in `packages/ui/src/components/ui/*.tsx` and import via the `@` alias (e.g. `@/lib/utils` for `cn`) and the unified `radix-ui` package — exactly the shape `shadcn build` expects to package.
- `shadcn` v4.x is available (`packages/ui/package.json`; plan 002 relocates it to devDependencies — either location works for `pnpm exec shadcn`).
- The docs site (`packages/docs`, Next 15) serves static files from `packages/docs/public/` — a `public/r/*.json` layout gives registry URLs like `https://<docs-domain>/r/button.json` with zero server code.
- Registry mechanics (shadcn docs, current as of the CLI v4 era): a `registry.json` (schema `https://ui.shadcn.com/schema/registry.json`) lists items (`name`, `type: "registry:ui"`, `files: [{ path, type }]`, `dependencies`, `registryDependencies`); `shadcn build` resolves file contents into per-item JSON in an output dir; consumers install with `npx shadcn@latest add <base-url>/r/<name>.json`. Verify current flags with `pnpm exec shadcn build --help` before relying on them.
- Docs conventions for the write-up: keep vocabulary consistent with existing docs ("Vera UI", install via `@helgadigitals/vera-ui`).

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| CLI sanity | `cd packages/ui && pnpm exec shadcn --version` | prints version |
| Build registry | `cd packages/ui && pnpm registry:build` (created in Step 2) | JSON files emitted |
| JSON validity | `jq . packages/docs/public/r/button.json` | parses |
| Consumer test | see Step 4 | component source lands in scratch app |

## Scope

**In scope** (the only files you should create/modify):
- `packages/ui/registry.json` (create)
- `packages/ui/package.json` (add one script: `registry:build`)
- `packages/docs/public/r/` (generated output, committed)
- `plans/012-spike-notes.md` (create — the spike's written findings/recommendation)
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):
- Any component source in `packages/ui/src/` — the spike must work against unmodified components; needed changes get *listed*, not made.
- Docs MDX pages advertising the registry — only after a maintainer go decision.
- A bespoke `vera-ui` CLI — explicitly rejected for now; the spike rides the existing `shadcn` CLI.
- CI wiring for registry rebuilds — note it in the recommendation instead.

## Git workflow

- Branch: `advisor/012-shadcn-registry-spike`
- Conventional commits: `chore(registry): …` (non-releasing).
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Confirm CLI + schema mechanics

`cd packages/ui && pnpm exec shadcn build --help` and read the current options (output dir flag, registry file argument). If `build` doesn't exist in the installed version, check `pnpm exec shadcn@latest --help` availability and record the exact supported workflow.

**Verify**: you can state the exact build command and flags from the help output (record them in the spike notes).

### Step 2: Author the pilot `registry.json` (3 components)

Pilot items: `button` (leaf, cva variants), `card` (leaf, plain), `combobox` (composite — imports `popover` + `command`, exercising `registryDependencies`). For each: `type: "registry:ui"`, `files: [{ "path": "src/components/ui/<name>.tsx", "type": "registry:ui" }]`, npm `dependencies` copied from what the file imports (e.g. `radix-ui`, `class-variance-authority`, `lucide-react`), `registryDependencies` for cross-component imports. Top-level: `name: "vera-ui"`, `homepage`, schema `$schema`.

Add script to `packages/ui/package.json`: `"registry:build": "shadcn build --output ../docs/public/r"` (adjust to Step 1's real flags).

**Verify**: `cd packages/ui && pnpm registry:build` → exit 0; `ls packages/docs/public/r/` shows `button.json`, `card.json`, `combobox.json` (+ registry index if the CLI emits one); `jq -r .files[0].content packages/docs/public/r/button.json | head -5` shows the actual component source.

### Step 3: Serve it

`pnpm build:ui && cd packages/docs && pnpm dev` (or `next start` after a build) and fetch `http://localhost:3000/r/button.json`.

**Verify**: `curl -s http://localhost:3000/r/button.json | jq .name` → `"button"`.

### Step 4: Consume it in a scratch app

In a temp dir (outside the repo): scaffold a minimal Vite React + Tailwind v4 app (or `npx shadcn@latest init` flow), then `npx shadcn@latest add http://localhost:3000/r/combobox.json`.

**Verify**: the combobox (and its registryDependencies: popover, command) source files land in the scratch app's `components/ui/`; the app compiles (`npm run build` in the scratch app). Record every manual fix-up needed (import rewrites, missing CSS variables, `cn` util, Tailwind v4 tokens from `src/index.css`) — these are the spike's key findings.

### Step 5: Write the recommendation

Create `plans/012-spike-notes.md` covering: what worked; the exact per-component cost of registry-izing all ~47 ui components (deps mapping, registryDependencies graph, theme/CSS-variable distribution — does the registry need a `registry:style`/theme item carrying the `src/index.css` custom properties?); maintenance cost (registry rebuild on every component change — CI step); and a clear **go / no-go / go-with-scope** recommendation. If no-go: state that the docs must stop implying a CLI (plan 009 already removed the stray copy) and the decision should be recorded.

**Verify**: file exists, contains the Step 4 fix-up list verbatim and a single unambiguous recommendation line.

## Test plan

The spike's tests are its verification gates: registry builds (Step 2), serves (Step 3), and installs into a real consumer (Step 4). No unit tests.

## Done criteria

- [ ] `registry.json` + `pnpm registry:build` produce valid per-component JSON in `packages/docs/public/r/`
- [ ] `shadcn add` of the combobox URL into a scratch app succeeds (with fix-ups documented)
- [ ] `plans/012-spike-notes.md` exists with findings + go/no-go recommendation
- [ ] No `packages/ui/src` files modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The installed `shadcn` CLI has no registry-build capability and `shadcn@latest` differs so much that the workflow can't be established from `--help` output — capture what you see; do not hand-roll the registry JSON format from memory.
- Step 4 requires modifying vera-ui component sources to be installable (e.g. imports that can't resolve in a consumer app) — that's a *finding* for the notes, not a change to make.
- Anything requires publishing/deploying — the spike stays on localhost.

## Maintenance notes

- If the recommendation is "go": the follow-up plan should cover all components, a theme/style registry item for the Tailwind v4 CSS variables, CI rebuild wiring, and docs pages ("Install with the shadcn CLI") — at that point the alert.mdx-style CLI copy becomes *true*.
- The registry and the npm package are complementary, not exclusive — the recommendation should address positioning (npm for app-wide adoption + updates; registry for source ownership).
- Reviewer of the spike notes: pressure-test the maintenance-cost section hardest; registries rot when component changes don't rebuild them.
