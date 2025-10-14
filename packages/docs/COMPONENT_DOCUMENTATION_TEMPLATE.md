# Component Documentation Format Guide

This document outlines the standard format for documenting components in the Vera UI documentation site.

## File Structure

All component documentation files should be `.mdx` files located in:

- `packages/docs/content/docs/components/[category]/[component-name].mdx`

Categories include:

- `forms/` - Form components (Button, Input, Select, etc.)
- `data-display/` - Display components (Card, Table, Badge, etc.)
- `navigation/` - Navigation components (Sidebar, Tabs, etc.)
- `layout/` - Layout components
- `utilities/` - Utility components (Theme Provider, etc.)

## Documentation Template

````mdx
---
title: ComponentName
description: A concise one-sentence description of what the component does and its primary purpose. Should be clear, actionable, and highlight the main benefit or use case.
---

import {
  ComponentPreview,
  AutoExtractPreview,
} from "@/components/component-preview";
import { TypeTable } from "fumadocs-ui/components/type-table";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { Callout } from "fumadocs-ui/components/callout";
import {
  ExampleOneComponent,
  ExampleTwoComponent,
  ExampleThreeComponent,
} from "@/components/[category]-examples/[component]-examples";

{/\* Optional: Commented-out H1 for reference - frontmatter title is used instead

# ComponentName

[Same description as in frontmatter]
\*/}

## Features

- **Feature 1** - Brief description of key capability
- **Feature 2** - Brief description of another capability
- **Feature 3** - Brief description of third capability
- **Feature 4** - Brief description of fourth capability
- **Feature 5** - Brief description of fifth capability

## Installation

<Tabs groupId="package" items={["pnpm", "npm", "yarn"]}>
  <Tab value="pnpm">```bash pnpm add @helgadigitals/vera-ui ```</Tab>
  <Tab value="npm">```bash npm install @helgadigitals/vera-ui ```</Tab>
  <Tab value="yarn">```bash yarn add @helgadigitals/vera-ui ```</Tab>
</Tabs>

## Usage

### Basic Example

<AutoExtractPreview
  source="components/[category]-examples/[component]-examples.tsx"
  functionName="BasicExampleComponent"
>
  <BasicExampleComponent />
</AutoExtractPreview>

### Advanced Example

<AutoExtractPreview
  source="components/[category]-examples/[component]-examples.tsx"
  functionName="AdvancedExampleComponent"
>
  <AdvancedExampleComponent />
</AutoExtractPreview>

### With Variant

<AutoExtractPreview
  source="components/[category]-examples/[component]-examples.tsx"
  functionName="VariantExampleComponent"
>
  <VariantExampleComponent />
</AutoExtractPreview>

{/* Optional: Add callouts for important notes */}

<Callout type="info">
  Important information or tips about using this component.
</Callout>

<Callout type="warn">
  Warning about potential pitfalls or deprecated patterns.
</Callout>

## API Reference

### ComponentName

The main component description.

<TypeTable
  type={{
    variant: {
      type: '"default" | "outline" | "ghost"',
      default: '"default"',
      description: "Visual style variant",
    },
    size: {
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Size of the component",
    },
    disabled: {
      type: "boolean",
      default: "false",
      description: "Whether the component is disabled",
    },
    className: {
      type: "string",
      description: "Additional CSS classes",
    },
    children: {
      type: "ReactNode",
      description: "Component content",
    },
    onAction: {
      type: "() => void",
      description: "Callback function when action occurs",
    },
  }}
/>

### SubComponent (if applicable)

Description of the sub-component.

<TypeTable
  type={{
    prop1: {
      type: "string",
      description: "Description of prop1",
    },
    prop2: {
      type: "number",
      default: "0",
      description: "Description of prop2",
    },
  }}
/>

**Features:**

- Feature specific to this sub-component
- Another specific feature
- Third specific feature

## Use Cases

### Category 1

- **Use case 1** - Description of when to use this
- **Use case 2** - Description of another scenario
- **Use case 3** - Description of third scenario
- **Use case 4** - Description of fourth scenario

### Category 2

- **Use case 1** - Description for different category
- **Use case 2** - Another use case description
- **Use case 3** - Third use case description
- **Use case 4** - Fourth use case description

### Category 3

- **Use case 1** - Description
- **Use case 2** - Description
- **Use case 3** - Description
- **Use case 4** - Description

## Accessibility

The ComponentName includes:

- **Keyboard navigation** - Full keyboard support with Arrow keys, Enter, Space, etc.
- **Screen reader support** - Proper ARIA labels, roles, and announcements
- **Focus management** - Clear focus indicators and logical tab order
- **ARIA attributes** - Comprehensive ARIA implementation (aria-label, aria-describedby, etc.)
- **Semantic HTML** - Uses semantic HTML elements for better accessibility
- **Color contrast** - Meets WCAG AA standards for text and interactive elements
- **Reduced motion** - Respects prefers-reduced-motion settings

**Keyboard Shortcuts:**

- `Tab` - Navigate to/from component
- `Enter` / `Space` - Activate primary action
- `Escape` - Cancel or close (if applicable)
- `Arrow Keys` - Navigate options/items (if applicable)

## Best Practices

### Content Guidelines

- **Clear labels** - Use descriptive, actionable text
- **Consistent terminology** - Maintain consistent naming across similar components
- **Helpful descriptions** - Provide context when actions aren't obvious
- **Error messages** - Show clear, actionable error states

### Visual Design

- **Consistent spacing** - Follow design system spacing scales
- **Appropriate sizing** - Choose sizes that match content importance
- **Color usage** - Use semantic colors (success, error, warning, info)
- **Visual hierarchy** - Ensure proper emphasis and contrast

### Performance

- **Lazy loading** - Load heavy components on demand
- **Memoization** - Use React.memo for expensive renders
- **Event handlers** - Debounce/throttle high-frequency events
- **Bundle size** - Import only what you need

### Code Quality

- **TypeScript** - Use proper types for all props
- **Error boundaries** - Wrap in error boundaries for production
- **Testing** - Write unit and integration tests
- **Documentation** - Document complex patterns inline

## Examples in Context

### Example 1: Real-world scenario

```tsx
import { ComponentName } from "@helgadigitals/vera-ui";

export function RealWorldExample() {
  const [state, setState] = useState();

  return (
    <ComponentName
      variant="default"
      size="md"
      onAction={() => setState(newValue)}
    >
      Example content
    </ComponentName>
  );
}
```
````

### Example 2: Advanced pattern

```tsx
import { ComponentName, SubComponent } from "@helgadigitals/vera-ui";

export function AdvancedPattern() {
  return (
    <ComponentName>
      <SubComponent>Complex nested structure</SubComponent>
    </ComponentName>
  );
}
```

## Related Components

- **[RelatedComponent1](../path/to/component1)** - Brief description of how it relates
- **[RelatedComponent2](../path/to/component2)** - Brief description of relationship
- **[RelatedComponent3](../path/to/component3)** - Brief description of connection

## Troubleshooting

### Common Issue 1

**Problem:** Description of the issue users might encounter.

**Solution:** Step-by-step solution to resolve the problem.

```tsx
// Example of correct implementation
<ComponentName correctProp="value" />
```

### Common Issue 2

**Problem:** Another common issue description.

**Solution:** How to fix this issue.

## Migration Guide (if applicable)

### From version X to Y

**Breaking changes:**

- Change 1: What changed and why
- Change 2: What changed and why

**Before:**

```tsx
<OldComponent oldProp="value" />
```

**After:**

```tsx
<NewComponent newProp="value" />
```

## Resources

- [Design Guidelines](../design/component-name) - Design principles and patterns
- [Figma Component](https://figma.com/...) - Visual design specs
- [Storybook](https://storybook.com/...) - Interactive examples
- [GitHub Source](https://github.com/...) - View source code

````

## Section Breakdown

### 1. Frontmatter (Required)
```yaml
---
title: ComponentName
description: Clear, concise description of the component
---
````

### 2. Imports (Required)

Import all necessary dependencies at the top:

- Preview components (ComponentPreview, AutoExtractPreview)
- UI framework components (TypeTable, Tabs, Callout)
- Example components from your examples directory

### 3. Features Section (Required)

- List 4-6 key features
- Use bold text followed by description
- Focus on benefits and capabilities

### 4. Installation (Required)

- Always include pnpm, npm, and yarn options
- Use the groupId="package" for consistent tabs

### 5. Usage Section (Required)

- Start with basic example
- Progress to more complex examples
- Use AutoExtractPreview for automated code extraction
- Each example should have a descriptive heading

### 6. API Reference (Required)

- Document all props using TypeTable
- Include type, default value (if any), and description
- Group related sub-components together
- Add **Features:** bullets for complex components

### 7. Use Cases (Recommended)

- Organize by category (3-5 categories)
- Provide 3-5 specific use cases per category
- Use bold for use case name, followed by description

### 8. Accessibility (Recommended)

- List all accessibility features
- Include keyboard shortcuts
- Mention ARIA attributes
- Note screen reader support

### 9. Best Practices (Recommended)

- Group by Content, Design, Performance, Code Quality
- Provide actionable guidance
- 3-5 items per category

### 10. Related Components (Optional)

- Link to similar or complementary components
- Explain the relationship

### 11. Troubleshooting (Optional)

- Document common issues
- Provide solutions with code examples

## Component Examples File Structure

Create a companion examples file at:
`packages/docs/components/[category]-examples/[component]-examples.tsx`

```tsx
"use client";

import { ComponentName, SubComponent } from "@helgadigitals/vera-ui";

export function BasicExampleComponent() {
  return <ComponentName>Basic example implementation</ComponentName>;
}

export function AdvancedExampleComponent() {
  const [state, setState] = useState();

  return (
    <ComponentName variant="advanced" onAction={() => setState(value)}>
      Advanced example implementation
    </ComponentName>
  );
}

export function VariantExampleComponent() {
  return (
    <div className="flex gap-4">
      <ComponentName variant="default">Default</ComponentName>
      <ComponentName variant="outline">Outline</ComponentName>
      <ComponentName variant="ghost">Ghost</ComponentName>
    </div>
  );
}
```

## AutoExtractPreview Usage

The AutoExtractPreview component automatically extracts code from your example files:

```mdx
<AutoExtractPreview
  source="components/[category]-examples/[component]-examples.tsx"
  functionName="ExampleFunctionName"
>
  <ExampleFunctionName />
</AutoExtractPreview>
```

**Props:**

- `source` - Relative path to the examples file
- `functionName` - Name of the exported function to extract
- `children` - The actual component to render in the preview

## ComponentPreview Usage (Legacy/Simple Cases)

For simpler cases or inline code, use ComponentPreview:

```mdx
<ComponentPreview
  code={`import { Component } from "@helgadigitals/vera-ui"

export default function Example() {
  return <Component>Content</Component>
}`}
>
  <Component>Content</Component>
</ComponentPreview

>
```

## Writing Guidelines

### Tone and Voice

- **Clear and concise** - Get to the point quickly
- **Action-oriented** - Focus on what users can do
- **Helpful** - Anticipate questions and provide answers
- **Professional but friendly** - Approachable expert tone

### Description Best Practices

- Start with what the component does
- Include the primary benefit or use case
- Keep it to 1-2 sentences in frontmatter
- Expand in the body if needed

### Code Examples

- **Show, don't tell** - Provide working code
- **Start simple** - Begin with basic examples
- **Build complexity** - Progress to advanced patterns
- **Real-world context** - Use realistic scenarios

### Visual Examples

- Use descriptive variable names
- Include necessary state management
- Show common patterns and variations
- Demonstrate responsive behavior

## Quality Checklist

Before publishing documentation, ensure:

- [ ] Frontmatter includes title and description
- [ ] All imports are present and correct
- [ ] Installation section includes all package managers
- [ ] At least 3 usage examples are provided
- [ ] API Reference documents all props
- [ ] TypeTable includes types, defaults, and descriptions
- [ ] Accessibility section is comprehensive
- [ ] Examples are tested and working
- [ ] Code is properly formatted and linted
- [ ] Links to related components work
- [ ] Images (if any) are optimized and accessible

## Maintenance

### When to Update Documentation

- Component API changes
- New features added
- Bugs fixed that affect usage
- New use cases discovered
- User feedback indicates confusion
- Dependencies updated
- Accessibility improvements

### Version Indicators

If documenting version-specific features:

```mdx
<Callout type="info">
  This feature is available from version 2.0.0 onwards.
</Callout>
```

## Examples by Category

### Form Components

Focus on: validation, error states, user input, accessibility

### Data Display Components

Focus on: data formatting, responsive layouts, loading states

### Navigation Components

Focus on: routing, active states, nested structures

### Layout Components

Focus on: responsive behavior, composition patterns, spacing

---

**Last Updated:** October 2025  
**Maintained By:** Vera UI Documentation Team

For questions or suggestions about this format, please create an issue in the repository.
