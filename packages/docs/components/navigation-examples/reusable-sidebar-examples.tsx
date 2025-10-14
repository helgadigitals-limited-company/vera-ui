"use client";

import { ReusableSidebar, SidebarProviders } from "@helgadigitals/vera-ui";
import {
  Home,
  Users,
  Settings,
  BarChart,
  FileText,
  Zap,
  FolderOpen,
} from "lucide-react";

export function BasicSidebarExample() {
  const items = [
    { title: "Dashboard", path: "/", icon: Home },
    { title: "Users", path: "/users", icon: Users, badge: 12 },
    { title: "Analytics", path: "/analytics", icon: BarChart },
    { title: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <SidebarProviders>
      <div className="flex h-[500px] border rounded-lg overflow-hidden">
        <ReusableSidebar items={items} heading="My App" label="Navigation" />
        <main className="flex-1 overflow-auto bg-background">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard</h1>
            <p className="text-muted-foreground">
              Your main application content goes here.
            </p>
          </div>
        </main>
      </div>
    </SidebarProviders>
  );
}

export function GroupedSidebarExample() {
  const items = [
    {
      key: "content",
      label: "Content",
      icon: FileText,
      items: [
        { title: "Posts", path: "/posts", icon: FileText },
        { title: "Pages", path: "/pages", icon: FileText, badge: 5 },
      ],
    },
    {
      key: "admin",
      label: "Administration",
      items: [
        { title: "Users", path: "/users", icon: Users, badge: 8 },
        { title: "Settings", path: "/settings", icon: Settings },
      ],
    },
  ];

  return (
    <SidebarProviders>
      <div className="flex h-[500px] border rounded-lg overflow-hidden">
        <ReusableSidebar
          items={items}
          heading="Admin Panel"
          label="Main Menu"
        />
        <main className="flex-1 overflow-auto bg-background">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Grouped navigation for better organization.
            </p>
          </div>
        </main>
      </div>
    </SidebarProviders>
  );
}

export function MixedSidebarExample() {
  const mixedItems = [
    // Top-level items
    { title: "Dashboard", path: "/", icon: Home },
    { title: "Quick Actions", path: "/quick", icon: Zap, badge: "New" },

    // Grouped sections
    {
      key: "content",
      label: "Content",
      icon: FileText,
      items: [
        { title: "Posts", path: "/posts", icon: FileText },
        { title: "Pages", path: "/pages", icon: FileText },
      ],
    },
    {
      key: "admin",
      label: "Administration",
      items: [
        { title: "Users", path: "/users", icon: Users, badge: 8 },
        { title: "Settings", path: "/settings", icon: Settings },
      ],
    },
  ];

  return (
    <SidebarProviders>
      <div className="flex h-[500px] border rounded-lg overflow-hidden">
        <ReusableSidebar
          items={mixedItems}
          heading="My Application"
          label="Navigation"
          isFooterVisible={true}
          displayName="John Doe"
        />
        <main className="flex-1 overflow-auto bg-background">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Application Dashboard</h1>
            <p className="text-muted-foreground">
              Mixed navigation with both simple and grouped items.
            </p>
          </div>
        </main>
      </div>
    </SidebarProviders>
  );
}

export function CustomStyledSidebarExample() {
  const items = [
    { title: "Dashboard", path: "/", icon: Home },
    { title: "Users", path: "/users", icon: Users },
    { title: "Settings", path: "/settings", icon: Settings },
  ];

  const customStyles = {
    bgColor: "bg-slate-900",
    textColor: "text-slate-100",
    itemTextSize: "text-base",
    headingTextSize: "text-sm",
  };

  const customClasses = {
    header: "bg-slate-800 border-b border-slate-700",
    heading: "text-slate-200 font-bold",
    menuButton: "hover:bg-slate-800/50",
    menuButtonActive: "bg-slate-700 text-white",
  };

  return (
    <SidebarProviders>
      <div className="flex h-[500px] border rounded-lg overflow-hidden">
        <ReusableSidebar
          items={items}
          heading="Custom Theme"
          stylesConfig={customStyles}
          classNames={customClasses}
        />
        <main className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-900">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Custom Styled Sidebar</h1>
            <p className="text-muted-foreground">
              Customized colors and styling.
            </p>
          </div>
        </main>
      </div>
    </SidebarProviders>
  );
}

export function WithFooterExample() {
  const items = [
    { title: "Dashboard", path: "/", icon: Home },
    { title: "Projects", path: "/projects", icon: FolderOpen },
    { title: "Team", path: "/team", icon: Users },
    { title: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <SidebarProviders>
      <div className="flex h-[500px] border rounded-lg overflow-hidden">
        <ReusableSidebar
          items={items}
          heading="Project Manager"
          isFooterVisible={true}
          displayName="Jane Smith"
          label="Main Navigation"
        />
        <main className="flex-1 overflow-auto bg-background">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Project Dashboard</h1>
            <p className="text-muted-foreground">
              Sidebar with user footer information.
            </p>
          </div>
        </main>
      </div>
    </SidebarProviders>
  );
}

export function CollapsibleSidebarExample() {
  const items = [
    { title: "Dashboard", path: "/", icon: Home },
    { title: "Analytics", path: "/analytics", icon: BarChart, badge: 3 },
    { title: "Users", path: "/users", icon: Users },
    { title: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <SidebarProviders>
      <div className="flex h-[500px] border rounded-lg overflow-hidden">
        <ReusableSidebar
          items={items}
          heading="App Name"
          label="Menu"
          collapsibleMode="icon"
        />
        <main className="flex-1 overflow-auto bg-background">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <p className="text-muted-foreground">
              Click the toggle button to collapse the sidebar to icon-only mode.
            </p>
          </div>
        </main>
      </div>
    </SidebarProviders>
  );
}
