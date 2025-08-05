# Vera UI - Tailwind CSS Integration Guide

Vera UI is compatible with both Tailwind CSS v3 and v4. This guide will help you set up the library in your project regardless of which version you're using.

## Table of Contents

- [Tailwind CSS v4 Setup (Recommended)](#tailwind-css-v4-setup-recommended)
- [Tailwind CSS v3 Setup](#tailwind-css-v3-setup)
- [Component Usage](#component-usage)
- [Customization](#customization)
- [Migration Guide](#migration-guide)

## Tailwind CSS v4 Setup (Recommended)

If you're using Tailwind CSS v4, you can use the modern CSS import approach:

### Installation

```bash
npm install @helgadigitals/vera-ui
# or
yarn add @helgadigitals/vera-ui
# or
pnpm add @helgadigitals/vera-ui
```

### Setup

1. **Import the CSS styles** in your main CSS file:

```css
/* In your main CSS file (e.g., src/index.css or src/app.css) */
@import "@helgadigitals/vera-ui/dist/vera-ui.css";
```

2. **Configure your CSS** with Tailwind v4:

```css
/* Your main CSS file */
@import "tailwindcss";
@import "@helgadigitals/vera-ui/dist/vera-ui.css";

/* Your custom styles here */
```

3. **Use the components** in your React application:

```tsx
import { Button, Card, Input } from "@helgadigitals/vera-ui";

function App() {
  return (
    <div className="p-8">
      <Card>
        <Button>Click me</Button>
        <Input placeholder="Enter text..." />
      </Card>
    </div>
  );
}
```

## Tailwind CSS v3 Setup

If you need to use Tailwind CSS v3, follow these steps:

### Installation

```bash
npm install @helgadigitals/vera-ui tailwindcss@^3 postcss autoprefixer tailwindcss-animate
```

### Setup

1. **Import the v3 compatible CSS** in your main CSS file:

```css
/* In your main CSS file (e.g., src/index.css) */
@import "@helgadigitals/vera-ui/dist/vera-ui-v3.css";
```

2. **Copy or extend the Tailwind config**:

Option A: Copy the provided config (recommended):

```bash
# Copy the tailwind config from the package
cp node_modules/@helgadigitals/vera-ui/tailwind.config.js ./tailwind.config.js
```

Option B: Extend your existing config:

```js
// tailwind.config.js
const veraConfig = require("@helgadigitals/vera-ui/tailwind.config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...veraConfig,
  content: [
    ...veraConfig.content,
    // Add your own content paths
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  // You can override or extend theme, plugins, etc.
  theme: {
    ...veraConfig.theme,
    extend: {
      ...veraConfig.theme.extend,
      // Your custom theme extensions
    },
  },
};
```

3. **Set up PostCSS** (create `postcss.config.js`):

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

4. **Import Tailwind directives** in your CSS:

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@import "@helgadigitals/vera-ui/dist/vera-ui-v3.css";
```

### Next.js Setup (v3)

For Next.js projects using Tailwind v3:

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config
};

module.exports = nextConfig;
```

```js
// tailwind.config.js
const veraConfig = require("@helgadigitals/vera-ui/tailwind.config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...veraConfig,
  content: [
    ...veraConfig.content,
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};
```

### Vite Setup (v3)

For Vite projects using Tailwind v3:

```js
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
});
```

## Component Usage

Once set up, you can use Vera UI components in your React application:

```tsx
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@helgadigitals/vera-ui";

function MyComponent() {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>

        <div>
          <Label htmlFor="role">Role</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full">Create Account</Button>
      </CardContent>
    </Card>
  );
}
```

## Customization

### CSS Variables

Vera UI uses CSS variables for theming. You can customize colors by overriding these variables:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 224 71.4% 4.1%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  /* ... other variables */
}

.dark {
  --background: 224 71.4% 4.1%;
  --foreground: 210 40% 98%;
  /* ... other dark mode variables */
}
```

### Extending Components

You can extend components using the `cn` utility and class variants:

```tsx
import { Button } from "@helgadigitals/vera-ui";
import { cn } from "@helgadigitals/vera-ui/lib/utils"; // If exported

const CustomButton = ({ className, ...props }) => {
  return (
    <Button
      className={cn("bg-gradient-to-r from-purple-500 to-pink-500", className)}
      {...props}
    />
  );
};
```

## Dark Mode Support

Vera UI supports dark mode out of the box. You can toggle dark mode by adding/removing the `dark` class from your root element:

```tsx
// Using next-themes (recommended)
import { ThemeProvider } from "next-themes";

function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

// Manual toggle
function toggleDarkMode() {
  document.documentElement.classList.toggle("dark");
}
```

## Migration Guide

### From Tailwind v3 to v4

If you're migrating from Tailwind v3 to v4:

1. **Update imports**:

   ```css
   /* Change from */
   @import "@helgadigitals/vera-ui/dist/vera-ui-v3.css";

   /* To */
   @import "@helgadigitals/vera-ui/dist/vera-ui.css";
   ```

2. **Update CSS structure**:

   ```css
   /* Change from */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   /* To */
   @import "tailwindcss";
   ```

3. **Remove config files** (optional in v4):
   - `tailwind.config.js` (can be removed if using defaults)
   - `postcss.config.js` (not needed with v4)

### From v4 to v3 (Downgrade)

If you need to downgrade to v3:

1. **Install v3 dependencies**:

   ```bash
   npm install tailwindcss@^3 postcss autoprefixer tailwindcss-animate
   ```

2. **Update imports**:

   ```css
   /* Change from */
   @import "tailwindcss";
   @import "@helgadigitals/vera-ui/dist/vera-ui.css";

   /* To */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   @import "@helgadigitals/vera-ui/dist/vera-ui-v3.css";
   ```

3. **Add configuration files** following the v3 setup guide above.

## Troubleshooting

### Common Issues

1. **Styles not loading**: Make sure you're importing the correct CSS file for your Tailwind version.

2. **Components not styled**: Ensure your Tailwind config includes the Vera UI package in the content array.

3. **CSS variable errors**: Make sure you're using the correct CSS variable format for your Tailwind version.

4. **Build errors**: Check that all required dependencies are installed and versions are compatible.

### Getting Help

If you encounter issues:

1. Check the [GitHub Issues](https://github.com/helgadigitals-limited-company/vera-ui/issues)
2. Review the [Storybook documentation](https://helgadigitals-limited-company.github.io/vera-ui)
3. Ensure you're following the correct setup guide for your Tailwind version

## Version Compatibility

| Vera UI | Tailwind CSS | Node.js | React  |
| ------- | ------------ | ------- | ------ |
| 2.x     | 3.x, 4.x     | >=16    | >=16.8 |
| 1.x     | 3.x          | >=16    | >=16.8 |
