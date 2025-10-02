# @helgadigitals/vera-ui

A modern, accessible React component library built with Radix UI primitives and styled with Tailwind CSS. Part of the Vera UI design system.

[![npm version](https://badge.fury.io/js/%40helgadigitals%2Fvera-ui.svg)](https://badge.fury.io/js/%40helgadigitals%2Fvera-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ⚡ Quick Start

```bash
npm install @helgadigitals/vera-ui
```

### Basic Usage

```tsx
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@helgadigitals/vera-ui";

function App() {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Welcome to Vera UI</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Get Started</Button>
      </CardContent>
    </Card>
  );
}
```

## 🎨 Tailwind CSS Setup

Vera UI supports both **Tailwind CSS v3** and **v4**.

### Tailwind v4 (Recommended)

```css
/* In your main CSS file */
@import "tailwindcss";
@import "@helgadigitals/vera-ui/dist/vera-ui.css";
```

### Tailwind v3

```bash
# Install dependencies
npm install tailwindcss@^3 postcss autoprefixer tailwindcss-animate

# Copy Tailwind config (if needed)
cp node_modules/@helgadigitals/vera-ui/tailwind.config.cjs ./tailwind.config.js
```

```css
/* In your main CSS file */
@tailwind base;
@tailwind components;  
@tailwind utilities;
@import "@helgadigitals/vera-ui/dist/vera-ui.css";
```

## 🧩 Components

### Form Components
- [`Button`](src/components/ui/button.tsx) - Primary actions and interactions
- [`Input`](src/components/ui/input.tsx) - Text input with validation states
- [`Textarea`](src/components/ui/textarea.tsx) - Multi-line text input
- [`Select`](src/components/ui/select.tsx) - Dropdown selection
- [`Checkbox`](src/components/ui/checkbox.tsx) - Binary selection input
- [`RadioGroup`](src/components/ui/radio-group.tsx) - Single selection from options
- [`Switch`](src/components/ui/switch.tsx) - Toggle control
- [`Label`](src/components/ui/label.tsx) - Form field labels
- [`Form`](src/components/ui/form.tsx) - Form management with validation

### Data Display
- [`Card`](src/components/ui/card.tsx) - Content container with sections
- [`Badge`](src/components/ui/badge.tsx) - Status indicators and tags
- [`Avatar`](src/components/ui/avatar.tsx) - User profile images
- [`Separator`](src/components/ui/separator.tsx) - Visual content dividers
- [`Skeleton`](src/components/ui/skeleton.tsx) - Loading placeholders
- [`DataTable`](src/components/ui/data-table.tsx) - Advanced table with sorting/filtering
- [`Pagination`](src/components/ui/pagination.tsx) - Page navigation control
- [`Accordion`](src/components/ui/accordion.tsx) - Collapsible content sections

### Navigation
- [`Sidebar`](src/components/ui/sidebar.tsx) - Reusable navigation sidebar
- [`SidebarLayout`](src/components/ui/sidebar-layout.tsx) - Complete layout with sidebar
- [`Breadcrumb`](src/components/ui/breadcrumb.tsx) - Navigation hierarchy
- [`Tabs`](src/components/ui/tabs.tsx) - Tabbed content navigation

### Overlays
- [`Dialog`](src/components/ui/dialog.tsx) - Modal dialogs
- [`Sheet`](src/components/ui/sheet.tsx) - Slide-out panels
- [`Drawer`](src/components/ui/drawer.tsx) - Mobile-friendly bottom drawer
- [`Popover`](src/components/ui/popover.tsx) - Floating content containers
- [`Tooltip`](src/components/ui/tooltip.tsx) - Contextual help text
- [`DropdownMenu`](src/components/ui/dropdown-menu.tsx) - Action menus
- [`AlertDialog`](src/components/ui/alert-dialog.tsx) - Confirmation dialogs

### Feedback
- [`Alert`](src/components/ui/alert.tsx) - Status messages
- [`Progress`](src/components/ui/progress.tsx) - Loading indicators
- [`Toast`](src/components/ui/toast.tsx) - Temporary notifications

### Utilities
- [`Command`](src/components/ui/command.tsx) - Command palette interface
- [`Combobox`](src/components/ui/combobox.tsx) - Searchable select
- [`Calendar`](src/components/ui/calendar.tsx) - Date picker
- [`FileUpload`](src/components/ui/file-upload.tsx) - File upload with drag & drop
- [`ThemeProvider`](src/lib/theme-context.ts) - Theme management

## ✨ Features

- 🎯 **Accessible** - Built with Radix UI primitives for excellent accessibility
- 🎨 **Customizable** - Easy to customize with CSS variables and Tailwind classes  
- 🌙 **Dark Mode** - Built-in support for light and dark themes
- 📱 **Responsive** - Mobile-first design approach
- 🔧 **Developer Friendly** - Full TypeScript support with excellent IntelliSense
- 🚀 **Modern** - Uses latest React patterns and best practices
- 🎭 **Tailwind Flexible** - Compatible with both Tailwind CSS v3 and v4
- 🧩 **Composable** - Build complex UIs with simple, reusable components
- ⚡ **Performant** - Optimized for production with tree-shaking support

## 🛠 Development

### Architecture

This component library follows these key patterns:

- **Radix UI Foundation**: All components extend Radix UI primitives for accessibility
- **CVA Styling**: Uses `class-variance-authority` for variant-based styling
- **Utility-First CSS**: Built with Tailwind CSS for rapid customization
- **TypeScript**: Full type safety with comprehensive prop interfaces

### Key Components

The [`Button`](src/components/ui/button.tsx) component serves as the canonical example of our architecture:

```tsx
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

### Utilities

- [`cn()`](src/lib/utils.ts) - Combines `clsx` and `tailwind-merge` for conditional classes
- [`Theme Context`](src/lib/theme-context.ts) - React Context for theme management

## 🎨 Theming

Vera UI uses CSS variables for theming, making it easy to customize:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --background: 0 0% 100%;
  --foreground: 224 71.4% 4.1%;
  --muted: 220 14.3% 95.9%;
  --muted-foreground: 220 8.9% 46.1%;
  /* ... */
}

.dark {
  --background: 224 71.4% 4.1%;
  --foreground: 210 40% 98%;
  /* ... */
}
```

## 📚 Documentation

- **[Documentation Site](https://veraui.helgadigitals.com/)** - Complete component documentation

## 🔧 TypeScript Support

All components are fully typed with TypeScript:

```tsx
import type { ButtonProps } from "@helgadigitals/vera-ui"

interface CustomButtonProps extends ButtonProps {
  loading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ 
  loading, 
  children, 
  disabled,
  ...props 
}) => {
  return (
    <Button disabled={disabled || loading} {...props}>
      {loading ? "Loading..." : children}
    </Button>
  );
};
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/helgadigitals-limited-company/vera-ui/blob/main/packages/docs/content/docs/contributing/guidelines.mdx) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/helgadigitals-limited-company/vera-ui.git
cd vera-ui

# Install dependencies
pnpm install

# Start development
pnpm dev:ui
```

## 📦 Build Information

- **Bundle**: ESM and CJS builds
- **Styles**: Separate CSS file for both Tailwind v3 and v4
- **Types**: Full TypeScript definitions included
- **Tree Shaking**: All components are tree-shakeable

## 🔗 Links

- [GitHub Repository](https://github.com/helgadigitals-limited-company/vera-ui)
- [NPM Package](https://www.npmjs.com/package/@helgadigitals/vera-ui)
- [Documentation](https://veraui.helgadigitals.com/)
- [Issue Tracker](https://github.com/helgadigitals-limited-company/vera-ui/issues)

## 📄 License

MIT © [HelgaDigitals](https://github.com/helgadigitals-limited-company)

---

Built with ❤️ by the Vera UI team