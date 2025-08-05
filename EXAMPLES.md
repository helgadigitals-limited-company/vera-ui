# Vera UI Examples

This directory contains example implementations of Vera UI with different Tailwind CSS versions and frameworks.

## Available Examples

### Tailwind v4 Examples

- [Next.js 15 with Tailwind v4](./tailwind-v4/nextjs/)
- [Vite + React with Tailwind v4](./tailwind-v4/vite-react/)
- [Astro with Tailwind v4](./tailwind-v4/astro/)

### Tailwind v3 Examples

- [Next.js 14 with Tailwind v3](./tailwind-v3/nextjs/)
- [Vite + React with Tailwind v3](./tailwind-v3/vite-react/)
- [Create React App with Tailwind v3](./tailwind-v3/cra/)

## Quick Start

Choose the example that matches your setup:

### For Tailwind v4 (Recommended)

```bash
# Copy example
cp -r examples/tailwind-v4/vite-react my-project
cd my-project

# Install dependencies
npm install

# Start development server
npm run dev
```

### For Tailwind v3

```bash
# Copy example
cp -r examples/tailwind-v3/vite-react my-project
cd my-project

# Install dependencies
npm install

# Start development server
npm run dev
```

## Example Component

Here's a complete example of a dashboard component using Vera UI:

```tsx
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@helgadigitals/vera-ui";

export default function Dashboard() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button>Create New</Button>
      </div>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>View your site analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-muted-foreground">Total visits this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Manage your preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select>
                <SelectTrigger id="theme">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full">Save Settings</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-2">
                <Button variant="outline" className="w-full">
                  View Reports
                </Button>
                <Button variant="outline" className="w-full">
                  Export Data
                </Button>
              </TabsContent>
              <TabsContent value="details" className="space-y-2">
                <Input placeholder="Search..." />
                <Button className="w-full">Advanced Search</Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

## Theme Integration

### Using with next-themes

```tsx
// app/providers.tsx
"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}

// app/layout.tsx
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### Theme Toggle Component

```tsx
"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@helgadigitals/vera-ui";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
```

## Custom Styling

### Extending Components

```tsx
import { Button } from "@helgadigitals/vera-ui";
import { cn } from "@/lib/utils";

interface GradientButtonProps extends React.ComponentProps<typeof Button> {
  gradient?: "purple" | "blue" | "green";
}

export function GradientButton({
  className,
  gradient = "purple",
  ...props
}: GradientButtonProps) {
  return (
    <Button
      className={cn(
        {
          "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600":
            gradient === "purple",
          "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600":
            gradient === "blue",
          "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600":
            gradient === "green",
        },
        className
      )}
      {...props}
    />
  );
}
```

### Custom CSS Variables

```css
/* Custom theme colors */
:root {
  --primary: 271 81% 56%; /* Custom purple */
  --primary-foreground: 0 0% 98%;

  /* Custom accent colors */
  --accent-blue: 217 91% 60%;
  --accent-green: 142 71% 45%;
  --accent-orange: 25 95% 53%;
}

.dark {
  --primary: 271 81% 65%; /* Lighter purple for dark mode */
}

/* Custom component styles */
.custom-card {
  @apply bg-gradient-to-br from-background to-muted border-2 border-primary/20 shadow-lg;
}
```

## Performance Tips

1. **Tree Shaking**: Import only the components you need

   ```tsx
   // ✅ Good - tree shaking works
   import { Button } from "@helgadigitals/vera-ui";

   // ❌ Avoid - imports entire library
   import * as VeraUI from "@helgadigitals/vera-ui";
   ```

2. **CSS Loading**: Import CSS only once in your app entry point

   ```tsx
   // main.tsx or _app.tsx - only import once
   import "@helgadigitals/vera-ui/dist/vera-ui.css";
   ```

3. **Bundle Size**: Use dynamic imports for heavy components
   ```tsx
   const DataTable = lazy(() =>
     import("@helgadigitals/vera-ui").then((module) => ({
       default: module.DataTable,
     }))
   );
   ```

For more examples and detailed documentation, visit our [Storybook](https://helgadigitals-limited-company.github.io/vera-ui).
