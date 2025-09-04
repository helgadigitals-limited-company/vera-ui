# Sidebar & SidebarLayout Usage Guide

The Vera UI library provides a powerful and flexible sidebar system with two main components: `ReusableSidebar` and `SidebarLayout`. This guide covers all functionalities and usage patterns.

## Table of Contents

1. [Installation & Basic Setup](#installation--basic-setup)
2. [Data Types](#data-types)
3. [Basic Usage](#basic-usage)
4. [Auto-Detection Logic](#auto-detection-logic)
5. [Advanced Styling](#advanced-styling)
6. [Complete Examples](#complete-examples)
7. [Props Reference](#props-reference)

## Installation & Basic Setup

```tsx
import {
  SidebarLayout,
  ReusableSidebar,
  type SidebarItem,
  type Group
} from "@helgadigitals/vera-ui";
import { Home, Calendar, Users, Settings } from "lucide-react";
```

## Data Types

### SidebarItem

```tsx
type SidebarItem = {
  title: string;           // Display name
  path: string;           // Route path
  icon: React.ElementType; // Lucide icon component
  exact?: boolean;        // Exact route matching
  badge?: string | number; // Optional badge/count
  tooltip?: string;       // Optional tooltip text
};
```

### Group

```tsx
type Group = {
  key: string;           // Unique identifier
  label: string;         // Group display name
  items: SidebarItem[];  // Array of sidebar items
};
```

## Basic Usage

### 1. Simple Sidebar with Direct Items

When you pass `SidebarItem[]`, the sidebar renders items directly without grouping:

```tsx
import { SidebarLayout } from "@helgadigitals/vera-ui";
import { Home, Calendar, Users, Settings } from "lucide-react";

const items: SidebarItem[] = [
  { title: "Home", path: "/", icon: Home },
  { title: "Calendar", path: "/calendar", icon: Calendar, badge: 3 },
  { title: "Users", path: "/users", icon: Users },
  { title: "Settings", path: "/settings", icon: Settings }
];

function App() {
  return (
    <SidebarLayout props={{ items }}>
      <div>Your main content here</div>
    </SidebarLayout>
  );
}
```

### 2. Grouped Sidebar

When you pass `Group[]`, the sidebar renders with collapsible groups:

```tsx
const groupedItems: Group[] = [
  {
    key: "main",
    label: "Main Navigation",
    items: [
      { title: "Dashboard", path: "/dashboard", icon: Home },
      { title: "Analytics", path: "/analytics", icon: BarChart }
    ]
  },
  {
    key: "admin",
    label: "Administration", 
    items: [
      { title: "Users", path: "/users", icon: Users, badge: 12 },
      { title: "Settings", path: "/settings", icon: Settings }
    ]
  }
];

function App() {
  return (
    <SidebarLayout props={{ items: groupedItems }}>
      <div>Your main content here</div>
    </SidebarLayout>
  );
}
```

## Auto-Detection Logic

The sidebar automatically detects your data shape:

### Detection Rules

1. **`isGroupArray()` returns `true`** when items have:
   - `key` property (string)
   - `label` property (string)  
   - `items` property (array)

2. **`isGroupArray()` returns `false`** when items are plain `SidebarItem[]`

### Behavior

- **Direct Items (`SidebarItem[]`)**: Renders flat list without group headers
- **Grouped Items (`Group[]`)**: Renders collapsible groups with headers and chevron icons

## Advanced Styling

### 1. Custom Class Names

```tsx
const customClassNames: ReusableSidebarClassNames = {
  root: "custom-sidebar-root",
  header: "custom-header",
  menuItem: "custom-menu-item",
  menuButton: "custom-menu-button",
  menuButtonActive: "custom-active-button"
};

<SidebarLayout 
  props={{
    items,
    classNames: customClassNames
  }}
>
  {children}
</SidebarLayout>
```

### 2. Style Configuration

```tsx
const stylesConfig: ReusableSidebarStyleProps = {
  bgColor: "bg-slate-900",
  textColor: "text-white",
  widthClass: "w-64",
  itemTextSize: "text-sm",
  headingTextSize: "text-lg",
  surfaceClasses: "rounded-lg shadow-lg"
};

<SidebarLayout 
  props={{
    items,
    stylesConfig
  }}
>
  {children}
</SidebarLayout>
```

### 3. Collapsible Modes

```tsx
// Icon mode (default) - collapses to icon bar
<SidebarLayout props={{ items, collapsibleMode: "icon" }}>

// Offcanvas mode - hides completely on mobile
<SidebarLayout props={{ items, collapsibleMode: "offcanvas" }}>

// None - always visible, no collapse
<SidebarLayout props={{ items, collapsibleMode: "none" }}>
```

## Complete Examples

### 1. Full-Featured Sidebar

```tsx
import { SidebarLayout, type SidebarItem } from "@helgadigitals/vera-ui";
import { 
  Home, Calendar, Users, Settings, 
  BarChart, FileText, Shield 
} from "lucide-react";

const items: SidebarItem[] = [
  { 
    title: "Dashboard", 
    path: "/dashboard", 
    icon: Home,
    exact: true 
  },
  { 
    title: "Analytics", 
    path: "/analytics", 
    icon: BarChart,
    badge: "New" 
  },
  { 
    title: "Users", 
    path: "/users", 
    icon: Users,
    badge: 24 
  },
  { 
    title: "Reports", 
    path: "/reports", 
    icon: FileText 
  },
  { 
    title: "Settings", 
    path: "/settings", 
    icon: Settings 
  }
];

function App() {
  return (
    <SidebarLayout 
      props={{
        items,
        heading: "My Application",
        image: "/logo.png",
        isFooterVisible: true,
        displayName: "John Doe",
        label: "Navigation",
        collapsibleMode: "icon",
        stylesConfig: {
          bgColor: "bg-slate-900",
          textColor: "text-slate-100",
          itemTextSize: "text-sm"
        }
      }}
    >
      <div className="p-6">
        <h1>Welcome to the Dashboard</h1>
        <p>Your main application content goes here.</p>
      </div>
    </SidebarLayout>
  );
}
```

### 2. Multi-Group Sidebar

```tsx
const workspaceItems: Group[] = [
  {
    key: "workspace",
    label: "Workspace",
    items: [
      { title: "Home", path: "/", icon: Home },
      { title: "Projects", path: "/projects", icon: FolderOpen, badge: 5 },
      { title: "Tasks", path: "/tasks", icon: CheckSquare, badge: 12 }
    ]
  },
  {
    key: "team",
    label: "Team",
    items: [
      { title: "Members", path: "/team/members", icon: Users },
      { title: "Roles", path: "/team/roles", icon: Shield },
      { title: "Permissions", path: "/team/permissions", icon: Key }
    ]
  },
  {
    key: "settings",
    label: "Settings",
    items: [
      { title: "General", path: "/settings/general", icon: Settings },
      { title: "Integrations", path: "/settings/integrations", icon: Plug },
      { title: "Billing", path: "/settings/billing", icon: CreditCard }
    ]
  }
];

function TeamApp() {
  return (
    <SidebarLayout 
      props={{
        items: workspaceItems,
        heading: "Team Workspace",
        image: "/team-logo.png",
        isFooterVisible: true,
        displayName: "Team Admin",
        classNames: {
          root: "border-r border-slate-200",
          groupLabel: "text-slate-500 font-semibold",
          menuButtonActive: "bg-blue-100 text-blue-900"
        }
      }}
    >
      <main className="flex-1 p-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          {/* ... other routes */}
        </Routes>
      </main>
    </SidebarLayout>
  );
}
```

### 3. Using ReusableSidebar Directly

If you need more control, use `ReusableSidebar` directly:

```tsx
import { SidebarProvider, ReusableSidebar } from "@helgadigitals/vera-ui";

function CustomLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <ReusableSidebar
          items={items}
          heading="Custom App"
          collapsibleMode="offcanvas"
          style={{ backgroundColor: '#1e293b' }}
        />
        <main className="flex-1 overflow-auto">
          <div className="p-4">
            <SidebarTrigger /> {/* Toggle button */}
            <div className="mt-4">
              {/* Your content */}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
```

## Props Reference

### SidebarLayout Props

```tsx
type SidebarLayoutProps = {
  props: {
    items: SidebarItem[] | Group[];
    heading?: string;
    image?: string;
    isFooterVisible?: boolean;
    label?: string;
    displayName?: string;
    bgColor?: string;
    textColor?: string;
    classNames?: ReusableSidebarClassNames;
    stylesConfig?: ReusableSidebarStyleProps;
    collapsibleMode?: "icon" | "offcanvas" | "none";
  };
  children: React.ReactNode;
};
```

### ReusableSidebar Props

```tsx
type SidebarProps = {
  items: SidebarItem[] | Group[];
  heading?: string;
  image?: string;
  isFooterVisible?: boolean;
  label?: string;
  displayName?: string;
  classNames?: ReusableSidebarClassNames;
  stylesConfig?: ReusableSidebarStyleProps;
  style?: React.CSSProperties;
  collapsibleMode?: "icon" | "offcanvas" | "none";
};
```

### Class Names Configuration

```tsx
type ReusableSidebarClassNames = {
  root?: string;              // Root sidebar container
  header?: string;            // Header section
  image?: string;             // Logo/image styling
  heading?: string;           // Heading text
  groupLabel?: string;        // Group labels
  menu?: string;              // Menu container
  menuItem?: string;          // Individual menu items
  menuButton?: string;        // Menu buttons
  menuButtonActive?: string;  // Active menu button
  footer?: string;            // Footer section
  footerUserIcon?: string;    // Footer user icon
  footerDisplayName?: string; // Footer display name
};
```

### Style Configuration

```tsx
type ReusableSidebarStyleProps = {
  bgColor?: string;          // Background color class
  textColor?: string;        // Text color class
  widthClass?: string;       // Width class
  itemTextSize?: string;     // Item text size
  headingTextSize?: string;  // Heading text size
  surfaceClasses?: string;   // Surface styling (borders, shadows, etc.)
};
```

## Features

### ✅ Auto-Detection
- Automatically detects data shape (`SidebarItem[]` vs `Group[]`)
- Renders appropriate UI based on data structure

### ✅ Persistent State
- Remembers group open/closed state in localStorage
- Survives page refreshes and navigation

### ✅ Active Route Detection
- Highlights currently active menu item
- Supports exact route matching
- Auto-expands groups containing active items

### ✅ Responsive Design
- Multiple collapse modes (icon, offcanvas, none)
- Mobile-friendly behavior
- Smooth animations

### ✅ Customizable Styling
- Extensive theming options
- Custom class name overrides
- Tailwind CSS integration

### ✅ Accessibility
- Proper ARIA attributes
- Keyboard navigation support
- Screen reader friendly

### ✅ Badges & Icons
- Support for badges/counts on menu items
- Lucide React icons integration
- Custom icon support

This sidebar system provides a complete navigation solution for React applications with automatic behavior adaptation based on your data structure.
