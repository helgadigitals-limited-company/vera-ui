# Plan 008: Harden chart.tsx against style-tag injection from config values

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 7128c31..HEAD -- packages/ui/src/components/ui/chart.tsx`
> If the file changed since this plan was written, compare the "Current state"
> excerpt against the live code before proceeding; on a mismatch, treat it as
> a STOP condition.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED — an over-strict filter breaks legitimate CSS color values; the test matrix below defines exactly what must keep working
- **Depends on**: none
- **Category**: security
- **Planned at**: commit `7128c31`, 2026-07-14

## Why this matters

`ChartStyle` interpolates the chart `id` and every `ChartConfig` color value directly into a `<style>` element via `dangerouslySetInnerHTML` with no validation. This is inherited shadcn code, but vera-ui ships it as a library: a consumer that builds `ChartConfig` from remote data (series colors from an API, user-configured dashboards — a realistic pattern) lets a value like `</style><img onerror=…>` break out of the style element (XSS), and any hostile value achieves CSS injection. Defensive hardening: validate/strip at the sink, keep every legitimate CSS color working.

## Current state

- `packages/ui/src/components/ui/chart.tsx:84-115`:

```tsx
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme ?? config.color
  )

  if (!colorConfig.length) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ??
      itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}
`
          )
          .join("\n"),
      }}
    />
  )
}
```

- The `id` reaching `ChartStyle` is built at `chart.tsx:59-73`: `const chartId = \`chart-${id ?? uniqueId.replace(/:/g, "")}\`` — when the consumer passes an `id` prop it is interpolated **raw** (only the auto-generated `useId` path is safe). Both the `data-chart` attribute and the selector use it.
- `key` (the config object key) is also interpolated into the custom-property name (`--color-${key}`).
- `THEMES` is a module constant (`{ light: "", dark: ".dark" }` shape — check the top of the file); it is trusted.
- Legitimate values that MUST keep working (used across the docs/examples and standard shadcn usage): `hsl(var(--chart-1))`, `var(--chart-2)`, `#8884d8`, `oklch(0.5 0.2 150)`, `rgb(255 0 0 / 0.5)`, `red`, `color-mix(in oklab, red 50%, blue)`.

## Commands you will need

| Purpose | Command | Expected on success |
|---|---|---|
| This test file | `cd packages/ui && pnpm vitest run src/components/ui/chart.test.tsx` | pass |
| Full suite | `cd packages/ui && pnpm vitest run` | pass |
| Build | `pnpm build:ui` | exit 0 |

## Scope

**In scope** (the only files you should modify):
- `packages/ui/src/components/ui/chart.tsx` (ChartStyle + the `chartId` construction only)
- `packages/ui/src/components/ui/chart.test.tsx` (create)
- `plans/README.md` (status row)

**Out of scope** (do NOT touch, even though they look related):
- Tooltip/legend/recharts wiring elsewhere in `chart.tsx`.
- Escaping in other components — this plan is the one HTML-sink the audit found.
- Changing the public `ChartConfig` type.

## Git workflow

- Branch: `advisor/008-harden-chart-style-injection`
- Conventional commit: `fix(chart): sanitize id and color values before style injection`
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Failing tests first

Create `chart.test.tsx` (pattern: `theme-provider.test.tsx`). Render `ChartContainer` (exported — confirm via `packages/ui/src/index.ts` re-export of `./components/ui/chart`) with minimal recharts children (an empty `<RechartsPrimitive.LineChart data={[]} />` equivalent via the public API; if recharts rendering is heavy in jsdom, render `ChartStyle` directly if it is exported — check; if not exported, test through `ChartContainer`).

Attack cases (must NOT appear verbatim in the emitted `<style>` textContent after the fix):
1. color value `red;} </style><img src=x onerror=alert(1)>` — assert `document.querySelector('style')!.textContent` does not contain `</style` or `onerror`.
2. `id` prop `x] { } body { background: red } [data-chart=x` — assert the style textContent contains only a sanitized id (no `{`/`}`/`]` from the payload) .
3. config key `foo;}body{color:red` (cast via `as unknown as ChartConfig` if the type resists) — assert no breakout.

Legitimate cases (must render EXACTLY as given): each value from the "MUST keep working" list above appears verbatim in the style textContent.

**Verify**: `cd packages/ui && pnpm vitest run src/components/ui/chart.test.tsx` → attack cases fail (payloads present), legitimate cases pass.

### Step 2: Sanitize at the sink

In `chart.tsx`:

1. Constrain the id where `chartId` is built: `const chartId = \`chart-${(id ?? uniqueId).replace(/[^a-zA-Z0-9-_]/g, "")}\`` (covers both the `useId` colons and hostile props; `data-chart={chartId}` and the selector then always agree).
2. In `ChartStyle`, sanitize the property name and validate the value:

```tsx
const SAFE_CSS_VALUE = /^[a-zA-Z0-9#%(),.\s\/*+_'"-]*$/   // no { } < > ; @ \ or control chars

const sanitizeKey = (key: string) => key.replace(/[^a-zA-Z0-9-_]/g, "")

// in the map:
const color = itemConfig.theme?.[...] ?? itemConfig.color
return color && SAFE_CSS_VALUE.test(color)
  ? `  --color-${sanitizeKey(key)}: ${color};`
  : null
```

Check the regex against every legitimate value in the test before settling: `hsl(var(--chart-1))` needs `(`, `)`, `-`; `rgb(255 0 0 / 0.5)` needs `/` and spaces; `color-mix(in oklab, red 50%, blue)` needs `,` and `%`. The character class above covers them; it excludes `{ } < > ; @ \` and backticks, which is what blocks both element breakout and rule breakout. Silently dropping an invalid value (emit nothing) is the correct failure mode for a style sink.

**Verify**: `cd packages/ui && pnpm vitest run src/components/ui/chart.test.tsx` → ALL cases pass (attack + legitimate).

### Step 3: Regression

**Verify**: `cd packages/ui && pnpm vitest run` → full suite passes; `pnpm build:ui` → exit 0; `pnpm lint` → exit 0. If the docs dev server is cheap to run (`pnpm dev:docs` after `pnpm build:ui`), spot-check a chart docs page renders with colors intact; otherwise state in the report that this manual check was skipped.

## Test plan

Step 1's matrix: 3 attack cases + ~7 legitimate-value cases + a default-render case (no `id` prop → sanitized `useId`). Pattern: `theme-provider.test.tsx`. Final: full vitest run passes.

## Done criteria

- [ ] Attack payloads do not survive into the injected style (tests prove it)
- [ ] All legitimate CSS color forms render verbatim (tests prove it)
- [ ] `chartId` construction strips non-`[a-zA-Z0-9-_]` characters
- [ ] `pnpm build:ui`, `pnpm lint`, full vitest run exit 0
- [ ] No files outside the in-scope list modified (`git status`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The excerpt doesn't match the live code (e.g. upstream shadcn sync already changed `ChartStyle`).
- A legitimate value in the matrix fails the regex and you cannot extend the character class without re-admitting `{ } < > ;` — report the conflict rather than weakening the filter.
- `ChartContainer` cannot render in jsdom at all (recharts incompatibility) after two attempts — report; do not export `ChartStyle` just for testing without noting it as an API addition.

## Maintenance notes

- If the team later syncs `chart.tsx` from upstream shadcn, this hardening will be silently reverted — the tests in `chart.test.tsx` are the tripwire; never delete them during a sync.
- Reviewer: eyeball the final regex character class char-by-char; every admitted character should have a named legitimate use.
