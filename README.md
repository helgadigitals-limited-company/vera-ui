# Vera UI

A modern, accessible React component library built with Radix UI primitives and styled with Tailwind CSS.

## ⚡ Quick Start

```bash
npm install @helgadigitals/vera-ui
```

### Tailwind CSS Compatibility

Vera UI supports both **Tailwind CSS v3** and **v4**.

**For detailed setup instructions, see [TAILWIND_SETUP.md](./TAILWIND_SETUP.md)**

#### Quick Setup for Tailwind v4 (Recommended)

```css
/* In your main CSS file */
@import "tailwindcss";
@import "@helgadigitals/vera-ui/dist/vera-ui.css";
```

#### Quick Setup for Tailwind v3

```bash
# Install dependencies
npm install tailwindcss@^3 postcss autoprefixer tailwindcss-animate

# Copy Tailwind config
cp node_modules/@helgadigitals/vera-ui/tailwind.config.js ./
```

```css
/* In your main CSS file */
@tailwind base;
@tailwind components;
@tailwind utilities;
@import "@helgadigitals/vera-ui/dist/vera-ui-v3.css";
```

## 🚀 Usage

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

## 📚 Documentation

- **[Storybook](https://helgadigitals-limited-company.github.io/vera-ui)** - Interactive component documentation
- **[Tailwind Setup Guide](./TAILWIND_SETUP.md)** - Detailed setup instructions for both v3 and v4
- **[Migration Guide](./MIGRATION.md)** - Step-by-step migration between Tailwind versions
- **[Examples](./EXAMPLES.md)** - Complete examples for different frameworks
- **[Component Stories](./src/components/ui/)** - Individual component documentation

## ✨ Features

- 🎯 **Accessible** - Built with Radix UI primitives for excellent accessibility
- 🎨 **Customizable** - Easy to customize with CSS variables and Tailwind classes
- 🌙 **Dark Mode** - Built-in support for light and dark themes
- 📱 **Responsive** - Mobile-first design approach
- 🔧 **Developer Friendly** - TypeScript support with excellent IntelliSense
- 🚀 **Modern** - Uses the latest React patterns and best practices
- 🎭 **Tailwind Flexible** - Compatible with both Tailwind CSS v3 and v4

## 🛠 Tech Stack

- **React** - UI library
- **Tailwind CSS** - Utility-first CSS framework (v3 & v4 compatible)
- **Radix UI** - Headless UI primitives
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Storybook** - Component documentation

## 📦 Available Components

- Accordion
- Alert & Alert Dialog
- Avatar
- Badge
- Button
- Card
- Checkbox
- Combobox
- Dialog
- Drawer
- Dropdown Menu
- Form
- Input
- Label
- Multi-select
- Progress
- Select
- Separator
- Sheet
- Skeleton
- Switch
- Table
- Tabs
- And many more...

## 🎨 Theming

Vera UI uses CSS variables for theming, making it easy to customize:

```css
:root {
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --background: 0 0% 100%;
  --foreground: 224 71.4% 4.1%;
  /* ... */
}
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./stories/Contributing.mdx) for details.

## 📄 License

MIT © [HelgaDigitals](https://github.com/helgadigitals-limited-company)

## 🔗 Links

- [GitHub](https://github.com/helgadigitals-limited-company/vera-ui)
- [NPM](https://www.npmjs.com/package/@helgadigitals/vera-ui)
- [Storybook](https://helgadigitals-limited-company.github.io/vera-ui)
- [Issues](https://github.com/helgadigitals-limited-company/vera-ui/issues)
