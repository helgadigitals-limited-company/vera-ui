# Plan 010: Document the exported-but-undocumented components (first tranche)

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 7128c31..HEAD -- packages/ui/src/index.ts packages/docs/content packages/docs/components packages/docs/scripts`
> If the export list or docs harness changed since this plan was written,
> compare the "Current state" facts against the live code before proceeding;
> on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P3
- **Effort**: L (staged — this plan covers the first 8 pages; repeat the recipe for the rest)
- **Risk**: LOW (additive content)
- **Depends on**: plans/009-docs-accuracy-and-repo-hygiene.md (it removes dead bullets this plan re-adds with real pages)
- **Category**: docs
- **Planned at**: commit `7128c31`, 2026-07-14

## Why this matters

~18 of the library's exported components have no documentation page — including the highest-traffic primitives a consumer reaches for first: Dialog, Popover, Tooltip, Command, plus Navigation Menu and Breadcrumb (whose links existed on the navigation landing page but 404'd). For a component library, undocumented = nonexistent. The docs harness (example components + `AutoExtractPreview` extraction) makes each page mechanical once the pattern is followed.

## Current state

- Full undocumented list (from diffing `packages/ui/src/index.ts` exports against `packages/docs/content/docs/components/**` — re-verify with the check in Step 1): `alert-dialog`, `aspect-ratio`, `calendar`, `carousel`, `chart`, `command`, `context-menu`, `dialog`, `drawer`, `dropdown-menu`, `hover-card`, `popover`, `resizable`, `scroll-area`, `sheet`, `toggle`, `toggle-group`, `tooltip`. (Aliases already covered: `menubar`→`menu-bar.mdx`, `sonner`→`toast.mdx`, DataTable→`data-table.mdx`.)
- **This tranche (8 pages)**: `dialog`, `popover`, `tooltip`, `command`, `navigation-menu`, `breadcrumb`, `sheet`, `dropdown-menu`. Category mapping per existing `meta.json` conventions: dialog/popover/tooltip → a sensible existing category (check `content/docs/components/*/meta.json` — overlays typically fit `data-display` here unless a better category exists); command/navigation-menu/breadcrumb/sheet/dropdown-menu → `navigation` (matching the landing-page bullets from plan 009).
- Docs conventions (CLAUDE.md, verified in the tree):
  - Page: `packages/docs/content/docs/components/[category]/[component].mdx` with frontmatter `title` + `description`. **Exemplar to copy structurally: `packages/docs/content/docs/components/forms/select.mdx`** — frontmatter, fumadocs imports (`Callout`, `Tab`/`Tabs`, `TypeTable`), component imports from `@helgadigitals/vera-ui`, Installation tabs (pnpm/npm/yarn `add @helgadigitals/vera-ui`), Usage sections with previews, props reference via `TypeTable`.
  - Examples: `packages/docs/components/[category]-examples/[component]-examples.tsx` exporting named example functions (exemplar: `packages/docs/components/form-components-examples/select-examples.tsx`).
  - Preview embedding: prefer `AutoExtractPreview` (per CLAUDE.md) with `source="components/[category]-examples/[component]-examples.tsx"` and `functionName="..."`, child = the rendered example. Read `packages/docs/components/component-preview.tsx` and `packages/docs/scripts/extract-code.ts` first to see how sources are registered/discovered — if existing pages predominantly use inline `ComponentPreview code={...}` instead, match whichever pattern `select.mdx` and the extraction script actually support end-to-end.
  - New page must be added to the category's `meta.json` (see existing entries; note `layout/` and `utilities/` use `_meta.json` — match the category's existing file name).
- Component APIs: read each component source in `packages/ui/src/components/ui/<name>.tsx` for the real exported names/props before writing examples. They are Radix wrappers — usage mirrors shadcn/radix docs, but only document what this library actually exports.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| Build library first | `pnpm build:ui` | exit 0 |
| Extract + build docs | `pnpm build:docs` | exit 0 (fails on bad MDX or missing extraction) |
| Dev preview | `pnpm dev:docs` | new pages render with live previews |

## Scope

**In scope** (the only files you should create/modify):
- 8 new `.mdx` pages under `packages/docs/content/docs/components/{data-display,navigation}/` (per the category mapping above)
- 8 new example files under `packages/docs/components/[category]-examples/`
- The affected category `meta.json` files
- `packages/docs/content/docs/components/navigation/navigation-components.mdx` (re-add bullets for the now-real pages)
- `packages/docs/lib/extracted-code.json` (regenerated by the build — commit the regenerated file)
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):
- Any file in `packages/ui/` — docs only.
- The remaining 10 undocumented components — record them as the next tranche in your report.
- Restructuring categories or the extraction pipeline.

## Git workflow

- Branch: `advisor/010-component-docs-tranche-1`
- Conventional commits: `docs: add <component> documentation` (one commit per page or per category batch). Plain `docs:` does not trigger a release.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Re-verify the undocumented list

List exports: `grep -o "components/ui/[a-zA-Z-]*" packages/ui/src/index.ts`. List doc pages: `find packages/docs/content/docs/components -name "*.mdx"`. Confirm each of the 8 tranche targets truly lacks a page.

**Verify**: the 8 targets have no existing `.mdx` (any that do: skip it, note in report, continue).

### Step 2: Establish the recipe on ONE page (dialog)

1. Read `packages/ui/src/components/ui/dialog.tsx` — collect exported names.
2. Create `packages/docs/components/data-display-examples/dialog-examples.tsx` with 2–3 named example functions (basic, with form/footer, controlled open state), modeled on `select-examples.tsx`.
3. Create the `dialog.mdx` page modeled section-for-section on `forms/select.mdx` (frontmatter → Installation tabs → Usage previews → props `TypeTable` for the props that this wrapper actually adds — keep Radix pass-through props to a short note + link to radix-ui docs).
4. Register in the category `meta.json`.

**Verify**: `pnpm build:ui && pnpm build:docs` → exit 0; `pnpm dev:docs` → `/docs/components/<category>/dialog` renders with working previews (open the dialog in the preview).

### Step 3: Repeat for the remaining 7

Same recipe: popover, tooltip, command, navigation-menu, breadcrumb, sheet, dropdown-menu. For `command`, note it wraps `cmdk` — examples need a list of items and a search interaction. For `navigation-menu` and `breadcrumb`, re-add their bullets to `navigation-components.mdx` (plan 009 removed them).

**Verify after each page**: `pnpm build:docs` → exit 0. (Build early, build often — MDX errors are cheapest one page at a time.)

### Step 4: Final sweep

**Verify**: `pnpm build:docs` → exit 0. Every new page reachable from its category index/meta. `git status` — only in-scope files.

## Test plan

No unit tests — the docs build (extraction + MDX compile + Next build) is the gate, plus a manual render check per page in `pnpm dev:docs`.

## Done criteria

- [ ] 8 new pages build and render: dialog, popover, tooltip, command, navigation-menu, breadcrumb, sheet, dropdown-menu
- [ ] Each has ≥2 live example previews backed by an examples file
- [ ] Category `meta.json` files updated; navigation landing page bullets restored for navigation-menu/breadcrumb/command/sheet
- [ ] `pnpm build:docs` exits 0
- [ ] Report lists the remaining undocumented components (next tranche)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- `AutoExtractPreview` (or the extraction registration) doesn't work as CLAUDE.md describes after reading `component-preview.tsx` + `extract-code.ts` and trying once on the dialog page — fall back to the inline `ComponentPreview code={...}` pattern **only if that is what comparable existing pages use**, and say so in the report.
- A component's source exports diverge wildly from its shadcn namesake (e.g. custom props) making the example approach unclear — write what the source supports, or skip the page and report.
- The docs build breaks on something unrelated to your pages.

## Maintenance notes

- Next tranche (10 pages): alert-dialog, aspect-ratio, calendar, carousel, chart, context-menu, drawer, hover-card, resizable, scroll-area, toggle, toggle-group — same recipe, this plan is the template.
- The direction finding "auto-generated props tables" (react-docgen-typescript feeding a `<PropsTable>`) would make future pages cheaper — if the maintainer picks it up, the hand-written `TypeTable` sections in these pages become generated.
- Reviewer: check the Installation section matches the real install story (plain npm package — no CLI claims).
