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

### Tailwind CSS Support

**Critical**: This library supports v4:

- Primary CSS built with Tailwind v4 (`vera-ui.css`)
- Does not include the tailwind.config.ts or tailwind.config.js file

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

- **Fumadocs**: MDX-based docs with `meta.json` structure
- **Component previews**: Use `AutoExtractPreview` for automated code extraction from example files
- **Code examples**: Include both installation and usage patterns
- **Documentation standard**: Follow the format defined in `packages/docs/COMPONENT_DOCUMENTATION_TEMPLATE.md`

### Documentation File Structure

All component documentation follows this structure:

- **Location**: `packages/docs/content/docs/components/[category]/[component-name].mdx`
- **Categories**: `forms/`, `data-display/`, `navigation/`, `layout/`, `utilities/`
- **Examples**: Companion file at `packages/docs/components/[category]-examples/[component]-examples.tsx`

### AutoExtractPreview Usage

The preferred method for showing component examples:

```mdx
<AutoExtractPreview
  source="components/[category]-examples/[component]-examples.tsx"
  functionName="ExampleFunctionName"
>
  <ExampleFunctionName />
</AutoExtractPreview>
```

**Benefits:**

- Eliminates code duplication between MDX and example implementations
- Automatic code extraction at build time via `pnpm extract-code`
- Shows both live preview and source code in tabbed interface
- Maintains single source of truth for examples

### Required Documentation Sections

1. **Frontmatter** - `title` and `description` (concise, actionable)
2. **Features** - 4-6 key capabilities with bold labels
3. **Installation** - Package manager tabs (pnpm, npm, yarn)
4. **Usage** - Multiple examples from basic to advanced
5. **API Reference** - TypeTable for all props with types, defaults, descriptions
6. **Use Cases** - Organized by category (3-5 categories, 3-5 cases each)
7. **Accessibility** - Keyboard navigation, ARIA, screen reader support
8. **Best Practices** - Content, Design, Performance, Code Quality guidelines

### Optional Documentation Sections

- **Related Components** - Links with relationship descriptions
- **Troubleshooting** - Common issues and solutions
- **Migration Guide** - For breaking changes between versions
- **Examples in Context** - Real-world usage patterns

**Full template**: See `packages/docs/COMPONENT_DOCUMENTATION_TEMPLATE.md` for complete guidelines, examples, and quality checklist.

## Publishing & Versioning

- Published to NPM as `@helgadigitals/vera-ui`
- Semantic versioning with semantic-release
- Exports: ESM (`vera-ui.es.js`), CJS (`vera-ui.cjs.js`), and types (`index.d.ts`)
