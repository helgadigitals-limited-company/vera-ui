# Vera UI

A modern, accessible React component library built with Radix UI primitives and styled with Tailwind CSS.

## ⚡ Quick Start

```bash
npm install @helgadigitals/vera-ui
```

### Tailwind CSS Compatibility

Vera UI supports Only **Tailwind CSS v4**.

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

- **[Documentation Site](https://veraui.helgadigitals.com/)** - Complete component documentation
- **[Documentation Code](./packages/docs)** - Codebase of the document

## ✨ Features

- 🎯 **Accessible** - Built with Radix UI primitives for excellent accessibility
- 🎨 **Customizable** - Easy to customize with CSS variables and Tailwind classes
- 🌙 **Dark Mode** - Built-in support for light and dark themes
- 📱 **Responsive** - Mobile-first design approach
- 🔧 **Developer Friendly** - TypeScript support with excellent IntelliSense
- 🚀 **Modern** - Uses the latest React patterns and best practices
- 🎭 **Tailwind support** - Compatible with  Tailwind CSS v4

## 🛠 Tech Stack

- **React** - UI library
- **Tailwind CSS** - Utility-first CSS compatible with Tailwind v4
- **Radix UI** - Headless UI primitives
- **TypeScript** - Type safety
- **Vite** - Build tool

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

We welcome contributions! Please see our [Contributing Guide](./Contributing.mdx) for details.

## 📄 License

MIT © [HelgaDigitals](https://github.com/helgadigitals-limited-company)

## 🔗 Links

- [GitHub](https://github.com/helgadigitals-limited-company/vera-ui)
- [NPM](https://www.npmjs.com/package/@helgadigitals/vera-ui)
- [Issues](https://github.com/helgadigitals-limited-company/vera-ui/issues)
