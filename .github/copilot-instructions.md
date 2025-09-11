# Vera UI - AI Coding Agent Instructions

## Architecture Overview

This is a **monorepo** with a React component library (`packages/ui`) and documentation site (`packages/docs`):

- **`packages/ui/`** - Main component library built with Radix UI + Tailwind CSS, published as `@helgadigitals/vera-ui`
- **`packages/docs/`** - Next.js documentation site using Fumadocs MDX
- **Workspace tool**: pnpm with workspace configuration in `pnpm-workspace.yaml`

## Key Development Patterns

### Component Architecture
- **Base pattern**: All UI components in `packages/ui/src/components/ui/` extend Radix UI primitives
- **Styling**: Uses `class-variance-authority` (cva) for variant-based styling - see `button.tsx` as the canonical example
- **Utils**: Always use `cn()` from `@/lib/utils` for conditional classes (combines clsx + tailwind-merge)
- **Exports**: All components must be exported from `packages/ui/src/index.ts` in alphabetical order

### Tailwind CSS Dual Support
**Critical**: This library supports BOTH Tailwind v3 and v4:
- Primary CSS built with Tailwind v4 (`vera-ui.css`)
- v3 compatibility via `scripts/build-v3-css.js` (`vera-ui-v3.css`)
- Never assume v3-only or v4-only syntax - use compatible patterns

### Build & Development Workflow
```bash
# Start both packages in dev mode
pnpm dev

# Component library only
pnpm dev:ui

# Documentation only  
pnpm dev:docs

# Build library (includes TypeScript types via vite-plugin-dts)
pnpm build:ui
```

### Component Development Standards
1. **TypeScript**: Full type safety with proper prop interfaces
2. **Accessibility**: Built on Radix UI - maintain ARIA patterns
3. **Theming**: Use CSS variables from theme system, not hardcoded colors
4. **Responsive**: Mobile-first approach with responsive utilities
5. **Dark mode**: Support via CSS variables, test both themes

### Special Components
- **Sidebar**: Complex component with grouped/ungrouped item support (`SidebarItem | Group | MixedSidebarItem`)
- **Theme Provider**: Uses React Context in `src/lib/theme-context.ts`
- **Form Components**: Follow React Hook Form patterns where applicable

## Integration Points
- **Radix UI**: Core accessibility primitives - don't reinvent these
- **React Router**: Sidebar component expects router context for active states
- **Lucide React**: Primary icon library - use consistently
- **Vite**: Build tool with alias `@` → `./src`

## Documentation Patterns
- **Fumadocs**: MDX-based docs with `_meta.json` structure
- **Component previews**: Use `component-preview.tsx` wrapper
- **Code examples**: Include both installation and usage patterns

## Publishing & Versioning
- Published to NPM as `@helgadigitals/vera-ui`
- Semantic versioning with semantic-release
- Exports: ESM (`vera-ui.es.js`), CJS (`vera-ui.cjs.js`), and types (`index.d.ts`)