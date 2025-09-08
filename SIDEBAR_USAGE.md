# Sidebar & SidebarLayout Usage Guide

The Vera UI library provides a powerful and flexible sidebar system with two main components: `ReusableSidebar` and `SidebarLayout`. This guide covers all functionalities and usage patterns, including the new **Mixed Content Support**.

## Table of Contents

1. [Installation & Basic Setup](#installation--basic-setup)
2. [Data Types](#data-types)
3. [Basic Usage](#basic-usage)
4. [Mixed Content Support (NEW)](#mixed-content-support-new)
5. [Auto-Detection Logic](#auto-detection-logic)
6. [Advanced Styling](#advanced-styling)
7. [Complete Examples](#complete-examples)
8. [Props Reference](#props-reference)
9. [Features](#features)

## Installation & Basic Setup

```tsx
import {
  SidebarLayout,
  ReusableSidebar,
  type SidebarItem,
  type Group,
  type MixedSidebarItem
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

### Group (Updated)

```tsx
type Group = {
  key: string;             // Unique identifier
  label: string;           // Group display name
  icon?: React.ElementType; // Optional icon (NEW)
  items: SidebarItem[];    // Array of sidebar items
};
```

### MixedSidebarItem (NEW)

```tsx
type MixedSidebarItem = SidebarItem | Group;
```

This union type allows you to mix individual sidebar items and groups in the same array for maximum flexibility.

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

## Mixed Content Support (NEW)

The most powerful feature allows you to **mix individual `SidebarItem`s and `Group`s in the same array**:

### Basic Mixed Usage

```tsx
import { SidebarLayout, type MixedSidebarItem } from "@helgadigitals/vera-ui";
import { Home, Users, Settings, Profile, BarChart, FileText } from "lucide-react";

const mixedItems: MixedSidebarItem[] = [
  // Direct items appear at the top level
  { title: "Home", path: "/", icon: Home },
  { title: "Profile", path: "/profile", icon: Profile },
  
  // Groups appear below direct items
  {
    key: "admin",
    label: "Administration",
    items: [
      { title: "Users", path: "/users", icon: Users },
      { title: "Settings", path: "/settings", icon: Settings }
    ]
  },
  
  // Another direct item
  { title: "Quick Action", path: "/quick", icon: Zap },
  
  // Another group
  {
    key: "reports",
    label: "Reports & Analytics", 
    items: [
      { title: "Analytics", path: "/analytics", icon: BarChart },
      { title: "Reports", path: "/reports", icon: FileText }
    ]
  }
];

function App() {
  return (
    <SidebarLayout props={{ items: mixedItems }}>
      <div>Your application content</div>
    </SidebarLayout>
  );
}
```

### Enhanced Mixed Usage with Group Icons

```tsx
import { SidebarLayout, type MixedSidebarItem } from "@helgadigitals/vera-ui";
import { 
  Home, Users, Settings, Profile, BarChart, FileText, 
  Shield, Cog, ShoppingCart 
} from "lucide-react";

const enhancedMixedItems: MixedSidebarItem[] = [
  // Direct items appear at the top level
  { title: "Home", path: "/", icon: Home },
  { title: "Profile", path: "/profile", icon: Profile },
  
  // Groups with icons and chevron in front
  {
    key: "admin",
    label: "Administration",
    icon: Shield,  // NEW: Icon appears after chevron, before label
    items: [
      { title: "Users", path: "/users", icon: Users },
      { title: "Settings", path: "/settings", icon: Settings }
    ]
  },
  
  // Another direct item
  { title: "Quick Action", path: "/quick", icon: Zap },
  
  // Another group with icon
  {
    key: "reports",
    label: "Reports & Analytics",
    icon: BarChart,  // NEW: Icon for this group
    items: [
      { title: "Analytics", path: "/analytics", icon: BarChart },
      { title: "Reports", path: "/reports", icon: FileText }
    ]
  },
  
  // Group without icon (optional)
  {
    key: "ecommerce",
    label: "E-commerce",
    // No icon property - only chevron and label will show
    items: [
      { title: "Orders", path: "/orders", icon: ShoppingCart },
      { title: "Products", path: "/products", icon: Package }
    ]
  }
];

function App() {
  return (
    <SidebarLayout props={{ items: enhancedMixedItems }}>
      <div>Your application content</div>
    </SidebarLayout>
  );
}
```

### Visual Layout

The new group header layout is:
```
[>] [GroupIcon] Group Label    (collapsed)
[v] [GroupIcon] Group Label    (expanded)
    ├── Child Item 1
    ├── Child Item 2
    └── Child Item 3
```

Where:
- `[>]` / `[v]` = Chevron icon (rotates on expand/collapse)
- `[GroupIcon]` = Optional group icon (if provided)
- Groups without icons show: `[>] Group Label`

## Auto-Detection Logic

The sidebar automatically detects your data shape with enhanced logic:

### Detection Rules

1. **`isMixedArray()` returns `true`** when the array contains both:
   - Items with `title`, `path`, `icon` properties (`SidebarItem`)
   - Items with `key`, `label`, `items` properties (`Group`)

2. **`isGroupArray()` returns `true`** when all items have:
   - `key` property (string)
   - `label` property (string)  
   - `items` property (array)

3. **Otherwise**: Treats as pure `SidebarItem[]`

### Behavior

- **Direct Items (`SidebarItem[]`)**: Renders flat list without group headers
- **Grouped Items (`Group[]`)**: Renders only collapsible groups with headers and chevron icons
- **Mixed Items (`MixedSidebarItem[]`)**: Renders direct items first, then groups below with proper spacing

### Rendering Order in Mixed Mode

1. **Direct Items**: Rendered at the top level in order of appearance
2. **Groups**: Rendered below direct items with collapsible headers
3. **Active States**: Work across both direct items and grouped items
4. **Persistence**: Group open/closed states are remembered

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
    items: mixedItems, // Works with any item type
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
    items: mixedItems,
    stylesConfig
  }}
>
  {children}
</SidebarLayout>
```

### 3. Collapsible Modes

```tsx
// Icon mode (default) - collapses to icon bar
<SidebarLayout props={{ items: mixedItems, collapsibleMode: "icon" }}>

// Offcanvas mode - hides completely on mobile
<SidebarLayout props={{ items: mixedItems, collapsibleMode: "offcanvas" }}>

// None - always visible, no collapse
<SidebarLayout props={{ items: mixedItems, collapsibleMode: "none" }}>
```

## Complete Examples

### 1. Full-Featured Mixed Sidebar

```tsx
import { SidebarLayout, type MixedSidebarItem } from "@helgadigitals/vera-ui";
import { 
  Home, Search, Bell, FileText, Image, MessageCircle,
  User, Users, Shield, Settings, BarChart, Zap
} from "lucide-react";

const fullFeaturedItems: MixedSidebarItem[] = [
  // Top-level quick access
  { 
    title: "Dashboard", 
    path: "/", 
    icon: Home,
    exact: true 
  },
  { 
    title: "Search", 
    path: "/search", 
    icon: Search,
    tooltip: "Global search"
  },
  { 
    title: "Notifications", 
    path: "/notifications", 
    icon: Bell,
    badge: 5 
  },
  
  // Content management with icon
  {
    key: "content",
    label: "Content Management",
    icon: FileText,  // NEW: Group icon
    items: [
      { title: "Posts", path: "/posts", icon: FileText, badge: 12 },
      { title: "Media Library", path: "/media", icon: Image },
      { title: "Comments", path: "/comments", icon: MessageCircle, badge: 3 }
    ]
  },
  
  // Quick account access
  { 
    title: "My Account", 
    path: "/account", 
    icon: User 
  },
  
  // Analytics group with icon
  {
    key: "analytics",
    label: "Analytics & Reports",
    icon: BarChart,  // NEW: Group icon
    items: [
      { title: "Overview", path: "/analytics", icon: BarChart },
      { title: "Performance", path: "/analytics/performance", icon: Zap },
      { title: "Custom Reports", path: "/reports", icon: FileText }
    ]
  },
  
  // Admin section with icon
  {
    key: "admin",
    label: "Administration",
    icon: Shield,  // NEW: Group icon
    items: [
      { title: "User Management", path: "/admin/users", icon: Users },
      { title: "Roles & Permissions", path: "/admin/roles", icon: Shield },
      { title: "System Settings", path: "/admin/settings", icon: Settings }
    ]
  }
];

function App() {
  return (
    <SidebarLayout 
      props={{
        items: fullFeaturedItems,
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

### 2. E-commerce Mixed Sidebar

```tsx
const ecommerceItems: MixedSidebarItem[] = [
  // Quick actions
  { title: "Dashboard", path: "/", icon: Home },
  { title: "Orders", path: "/orders", icon: ShoppingCart, badge: 8 },
  { title: "Messages", path: "/messages", icon: MessageSquare, badge: 3 },
  
  // Product management with icon
  {
    key: "products",
    label: "Product Management",
    icon: Package,  // NEW: Group icon
    items: [
      { title: "All Products", path: "/products", icon: Package },
      { title: "Categories", path: "/categories", icon: Tags },
      { title: "Inventory", path: "/inventory", icon: Archive },
      { title: "Reviews", path: "/reviews", icon: Star, badge: "12 new" }
    ]
  },
  
  // Quick customer access
  { title: "Customers", path: "/customers", icon: Users, badge: 156 },
  
  // Sales & Analytics with icon
  {
    key: "sales",
    label: "Sales & Analytics",
    icon: BarChart,  // NEW: Group icon
    items: [
      { title: "Sales Report", path: "/sales", icon: TrendingUp },
      { title: "Analytics", path: "/analytics", icon: BarChart },
      { title: "Marketing", path: "/marketing", icon: Megaphone }
    ]
  },
  
  // Settings with icon
  {
    key: "settings",
    label: "Store Settings",
    icon: Settings,  // NEW: Group icon
    items: [
      { title: "General", path: "/settings", icon: Settings },
      { title: "Payment", path: "/settings/payment", icon: CreditCard },
      { title: "Shipping", path: "/settings/shipping", icon: Truck }
    ]
  }
];
```

## Props Reference

### SidebarLayout Props

```tsx
type SidebarLayoutProps = {
  props: {
    items: SidebarItem[] | Group[] | MixedSidebarItem[]; // NEW: Added mixed type support
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
  items: SidebarItem[] | Group[] | MixedSidebarItem[]; // NEW: Added mixed type support
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

### ✅ Mixed Content Support (NEW)
- Mix individual items and groups in the same array
- Direct items rendered at top level
- Groups rendered below with collapsible headers
- Maintains proper spacing and visual hierarchy

### ✅ Auto-Detection
- Automatically detects data shape (`SidebarItem[]` vs `Group[]` vs `MixedSidebarItem[]`)
- Renders appropriate UI based on data structure
- Enhanced detection logic for mixed arrays

### ✅ Persistent State
- Remembers group open/closed state in localStorage
- Survives page refreshes and navigation
- Works across all sidebar modes

### ✅ Active Route Detection
- Highlights currently active menu item
- Supports exact route matching
- Auto-expands groups containing active items
- Works for both direct items and grouped items

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

### ✅ Import Flexibility
- Direct imports: `import { SidebarLayout, MixedSidebarItem } from "@helgadigitals/vera-ui"`
- Namespace imports: `import { Sidebar } from "@helgadigitals/vera-ui"` (use as `Sidebar.MixedSidebarItem`)

This sidebar system provides a complete navigation solution for React applications with automatic behavior adaptation based on your data structure, now including powerful mixed content support for maximum flexibility.
