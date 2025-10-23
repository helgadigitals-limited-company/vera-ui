import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { ThemeToggle } from "@/components/theme-toggle";
import { MenuBar, type MenuItemConfig } from "@/components/menuBar";
import { TabsContainer, type TabItem } from "@/components/tabs-container";
import { FileText, Users, Package, Sparkles } from "lucide-react";

// Layout component with MenuBar
function Layout() {
  const menuItems: MenuItemConfig[] = [
    {
      trigger: "Home",
      type: "link",
      href: "/",
    },
    {
      trigger: "Getting Started",
      type: "featured",
      featured: {
        href: "/docs",
        title: "Documentation",
        description: "Learn how to use Vera UI components in your project.",
      },
      items: [
        {
          title: "Introduction",
          href: "/docs/intro",
          description: "Get started with Vera UI",
        },
        {
          title: "Installation",
          href: "/docs/installation",
          description: "How to install and set up",
        },
        {
          title: "Theming",
          href: "/docs/theming",
          description: "Customize the look and feel",
        },
      ],
    },
    {
      trigger: "Components",
      type: "grid",
      gridClassName: "md:grid-cols-3",
      items: [
        {
          title: "Buttons",
          href: "/components/buttons",
          description: "Interactive button components",
          icon: <Sparkles className="h-5 w-5" />,
        },
        {
          title: "Forms",
          href: "/components/forms",
          description: "Form inputs and validation",
          icon: <FileText className="h-5 w-5" />,
        },
        {
          title: "Navigation",
          href: "/components/navigation",
          description: "Menus, tabs, and breadcrumbs",
          icon: <Package className="h-5 w-5" />,
        },
        {
          title: "Data Display",
          href: "/components/data-display",
          description: "Tables, cards, and lists",
          icon: <Users className="h-5 w-5" />,
        },
        {
          title: "Feedback",
          href: "/components/feedback",
          description: "Alerts, toasts, and modals",
          icon: <Sparkles className="h-5 w-5" />,
        },
        {
          title: "Layout",
          href: "/components/layout",
          description: "Grid, flex, and containers",
          icon: <Package className="h-5 w-5" />,
        },
      ],
    },
    {
      trigger: "Examples",
      type: "dropdown",
      items: [
        {
          title: "Dashboard",
          href: "/examples/dashboard",
          description: "A complete dashboard example",
        },
        {
          title: "E-commerce",
          href: "/examples/ecommerce",
          description: "Product listing and cart",
        },
        {
          title: "Authentication",
          href: "/examples/auth",
          description: "Login and signup forms",
        },
        {
          title: "Settings",
          href: "/examples/settings",
          description: "User settings page",
        },
      ],
    },
    {
      trigger: "About",
      type: "link",
      href: "/about",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 bg-background z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link to="/" className="text-2xl font-bold">
                Vera UI
              </Link>
              <MenuBar items={menuItems} LinkComponent={Link} />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

// Page Components
function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-5xl font-bold">Welcome to Vera UI</h1>
        <p className="text-xl text-muted-foreground">
          A modern, accessible React component library with beautiful components
        </p>
        <div className="flex gap-4 justify-center pt-8">
          <Link
            to="/docs/intro"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
          <Link
            to="/components/buttons"
            className="px-6 py-3 border rounded-md font-medium hover:bg-accent transition-colors"
          >
            Browse Components
          </Link>
        </div>
      </div>
    </div>
  );
}

function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Documentation</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg">
          Comprehensive documentation for Vera UI component library.
        </p>
        <h2>Quick Start</h2>
        <p>Get started with Vera UI in minutes.</p>
      </div>
    </div>
  );
}

function ComponentsPage() {
  const componentTabs: TabItem[] = [
    {
      value: "buttons",
      label: "Buttons",
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Button Components</h2>
          <p className="text-muted-foreground">
            Interactive button components with various styles and states.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Primary Button</h3>
              <p className="text-sm text-muted-foreground">
                Default button style for primary actions
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Secondary Button</h3>
              <p className="text-sm text-muted-foreground">
                Alternative style for secondary actions
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Outline Button</h3>
              <p className="text-sm text-muted-foreground">
                Minimal button with outline
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Ghost Button</h3>
              <p className="text-sm text-muted-foreground">
                Subtle button with no border
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      value: "forms",
      label: "Forms",
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Form Components</h2>
          <p className="text-muted-foreground">
            Form inputs, selects, textareas, and validation components.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Input</h3>
              <p className="text-sm text-muted-foreground">
                Text input with validation
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Select</h3>
              <p className="text-sm text-muted-foreground">
                Dropdown selection component
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Textarea</h3>
              <p className="text-sm text-muted-foreground">
                Multi-line text input
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Checkbox</h3>
              <p className="text-sm text-muted-foreground">
                Toggle selection component
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      value: "navigation",
      label: "Navigation",
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Navigation Components</h2>
          <p className="text-muted-foreground">
            Menus, tabs, breadcrumbs, and navigation bars.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Menu Bar</h3>
              <p className="text-sm text-muted-foreground">
                Horizontal navigation menu
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Sidebar</h3>
              <p className="text-sm text-muted-foreground">
                Vertical navigation panel
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Tabs</h3>
              <p className="text-sm text-muted-foreground">
                Tabbed content container
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Breadcrumb</h3>
              <p className="text-sm text-muted-foreground">
                Page hierarchy navigation
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      value: "data-display",
      label: "Data Display",
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Data Display Components</h2>
          <p className="text-muted-foreground">
            Tables, cards, lists, and data visualization components.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Table</h3>
              <p className="text-sm text-muted-foreground">
                Data table with sorting and filtering
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Card</h3>
              <p className="text-sm text-muted-foreground">
                Container for related content
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Badge</h3>
              <p className="text-sm text-muted-foreground">
                Small status indicator
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Avatar</h3>
              <p className="text-sm text-muted-foreground">
                User profile image
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      value: "feedback",
      label: "Feedback",
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Feedback Components</h2>
          <p className="text-muted-foreground">
            Alerts, toasts, modals, and progress indicators.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Alert</h3>
              <p className="text-sm text-muted-foreground">
                Important notification message
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Toast</h3>
              <p className="text-sm text-muted-foreground">
                Brief notification popup
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Dialog</h3>
              <p className="text-sm text-muted-foreground">
                Modal dialog window
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Progress</h3>
              <p className="text-sm text-muted-foreground">
                Loading progress indicator
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      value: "layout",
      label: "Layout",
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Layout Components</h2>
          <p className="text-muted-foreground">
            Grid, flex, containers, and spacing utilities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Container</h3>
              <p className="text-sm text-muted-foreground">
                Responsive content wrapper
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Grid</h3>
              <p className="text-sm text-muted-foreground">
                CSS Grid layout system
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Flex</h3>
              <p className="text-sm text-muted-foreground">
                Flexbox layout utilities
              </p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Separator</h3>
              <p className="text-sm text-muted-foreground">
                Visual content divider
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Components</h1>
      <p className="text-muted-foreground mb-8">
        Explore our comprehensive collection of UI components organized by
        category.
      </p>
      <TabsContainer
        tabs={componentTabs}
        defaultTab="buttons"
        persistInUrl={true}
        urlParamName="category"
        containerHeight="600px"
      />
    </div>
  );
}

function ExamplesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Examples</h1>
      <div className="space-y-4">
        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Dashboard Example</h3>
          <p className="text-muted-foreground">
            A full-featured dashboard with charts and tables
          </p>
        </div>
        <div className="p-6 border rounded-lg">
          <h3 className="text-xl font-semibold mb-2">E-commerce Example</h3>
          <p className="text-muted-foreground">
            Product catalog with shopping cart
          </p>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold">About Vera UI</h1>
        <p className="text-lg text-muted-foreground">
          Vera UI is a modern React component library built with accessibility
          and developer experience in mind.
        </p>
        <div className="prose dark:prose-invert">
          <h2>Our Mission</h2>
          <p>
            To provide developers with beautiful, accessible, and customizable
            components that make building web applications a joy.
          </p>
          <h2>Features</h2>
          <ul>
            <li>Fully accessible components</li>
            <li>Dark mode support</li>
            <li>Customizable with Tailwind CSS</li>
            <li>TypeScript support</li>
            <li>Comprehensive documentation</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vera-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="docs/*" element={<DocsPage />} />
            <Route path="components/*" element={<ComponentsPage />} />
            <Route path="examples/*" element={<ExamplesPage />} />
            <Route path="about" element={<AboutPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
