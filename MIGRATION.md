# Migration Guide: Vera UI Tailwind Compatibility

This guide helps you migrate between Tailwind CSS versions when using Vera UI.

## Quick Reference

| Tailwind Version | CSS Import                                              | Config Required |
| ---------------- | ------------------------------------------------------- | --------------- |
| v4 (Recommended) | `@import "@helgadigitals/vera-ui/dist/vera-ui.css";`    | No              |
| v3               | `@import "@helgadigitals/vera-ui/dist/vera-ui-v3.css";` | Yes             |

## New Project Setup

### For Tailwind v4 Projects

```bash
npm install @helgadigitals/vera-ui
```

```css
/* src/styles.css */
@import "tailwindcss";
@import "@helgadigitals/vera-ui/dist/vera-ui.css";
```

### For Tailwind v3 Projects

```bash
npm install @helgadigitals/vera-ui tailwindcss@^3 postcss autoprefixer
```

Copy the Tailwind config:

```bash
cp node_modules/@helgadigitals/vera-ui/tailwind.config.cjs ./tailwind.config.js
```

```css
/* src/styles.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
@import "@helgadigitals/vera-ui/dist/vera-ui-v3.css";
```

## Framework-Specific Examples

### Next.js

#### Tailwind v4 (Next.js 15+)

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your config
};

module.exports = nextConfig;
```

```css
/* app/globals.css */
@import "tailwindcss";
@import "@helgadigitals/vera-ui/dist/vera-ui.css";
```

#### Tailwind v3 (Next.js 13-14)

```js
// tailwind.config.js
const veraConfig = require("@helgadigitals/vera-ui/tailwind.config.cjs");

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

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
@import "@helgadigitals/vera-ui/dist/vera-ui-v3.css";
```

### Vite + React

#### Tailwind v4

```js
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
```

```css
/* src/index.css */
@import "tailwindcss";
@import "@helgadigitals/vera-ui/dist/vera-ui.css";
```

#### Tailwind v3

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

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
@import "@helgadigitals/vera-ui/dist/vera-ui-v3.css";
```

### Astro

#### Tailwind v4

```js
// astro.config.mjs
import { defineConfig } from "astro/config";

export default defineConfig({
  // Your config
});
```

```css
/* src/styles/global.css */
@import "tailwindcss";
@import "@helgadigitals/vera-ui/dist/vera-ui.css";
```

#### Tailwind v3

```js
// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [tailwind()],
});
```

Copy the Tailwind config and modify:

```js
// tailwind.config.mjs
import veraConfig from "@helgadigitals/vera-ui/tailwind.config.cjs";

/** @type {import('tailwindcss').Config} */
export default {
  ...veraConfig,
  content: [
    ...veraConfig.content,
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
};
```

## Component Usage Examples

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
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Get Started</Button>
      </CardContent>
    </Card>
  );
}
```

### Form Example

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

function SignupForm() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>

        <div className="space-y-2">
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

## Migration Checklist

### Migrating from v3 to v4

- [ ] Update Tailwind CSS to v4: `npm install tailwindcss@^4`
- [ ] Change CSS import from `vera-ui-v3.css` to `vera-ui.css`
- [ ] Update CSS structure:
  ```diff
  - @tailwind base;
  - @tailwind components;
  - @tailwind utilities;
  + @import "tailwindcss";
  ```
- [ ] Remove `tailwind.config.js` (optional in v4)
- [ ] Remove `postcss.config.js` (not needed in v4)
- [ ] Test your application

### Migrating from v4 to v3

- [ ] Install Tailwind v3: `npm install tailwindcss@^3 postcss autoprefixer`
- [ ] Copy Tailwind config: `cp node_modules/@helgadigitals/vera-ui/tailwind.config.cjs ./tailwind.config.js`
- [ ] Change CSS import from `vera-ui.css` to `vera-ui-v3.css`
- [ ] Update CSS structure:
  ```diff
  - @import "tailwindcss";
  + @tailwind base;
  + @tailwind components;
  + @tailwind utilities;
  ```
- [ ] Add `postcss.config.js`
- [ ] Test your application

## Troubleshooting

### Common Issues

**Issue: Styles not loading**

- Ensure you're importing the correct CSS file for your Tailwind version
- Check that your bundler is processing CSS imports correctly

**Issue: Components not styled**

- Make sure your Tailwind config includes Vera UI in the content array
- Verify that CSS variables are being loaded

**Issue: Dark mode not working**

- Ensure you have the `dark` class on your root element
- Check that your theme provider is set up correctly

**Issue: Build errors**

- Verify all required dependencies are installed
- Check for version conflicts between Tailwind v3 and v4

### Getting Help

If you encounter issues:

1. Check the [GitHub Issues](https://github.com/helgadigitals-limited-company/vera-ui/issues)
2. Review the [Storybook documentation](https://helgadigitals-limited-company.github.io/vera-ui)
3. Ensure you're following the correct setup guide for your Tailwind version
