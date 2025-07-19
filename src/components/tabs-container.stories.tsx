import type { Meta, StoryObj } from "@storybook/react";
import { TabsContainer, type TabItem } from "./tabs-container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Settings, Users, BarChart3 } from "lucide-react";

const meta: Meta<typeof TabsContainer> = {
  title: "Components/Navigation/TabsContainer",
  component: TabsContainer,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A comprehensive tabs container component with URL state management, scrollable tabs, and flexible content rendering. Built with Radix UI Tabs and enhanced with scroll arrows and URL persistence.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    tabs: {
      control: { type: "object" },
      description: "Array of tab items to display",
    },
    defaultTab: {
      control: { type: "text" },
      description: "Default selected tab value",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes to apply",
    },
    urlParamName: {
      control: { type: "text" },
      description: "URL parameter name for this tab group",
    },
    historyMode: {
      control: { type: "select" },
      options: ["push", "replace"],
      description: "Control URL history behavior",
    },
    shallow: {
      control: { type: "boolean" },
      description: "Whether to use shallow routing",
    },
    containerHeight: {
      control: { type: "text" },
      description: "Container height CSS value",
    },
    persistInUrl: {
      control: { type: "boolean" },
      description: "Whether to persist tab state in URL",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TabsContainer>;

// Sample content components for stories
const DashboardContent = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <BarChart3 className="h-5 w-5" />
        Dashboard Overview
      </CardTitle>
      <CardDescription>
        Key metrics and insights for your application
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-semibold">Total Users</h3>
          <p className="text-2xl font-bold text-primary">12,543</p>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-semibold">Active Sessions</h3>
          <p className="text-2xl font-bold text-green-600">3,241</p>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-semibold">Revenue</h3>
          <p className="text-2xl font-bold text-blue-600">$45,623</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const UsersContent = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Users className="h-5 w-5" />
        User Management
      </CardTitle>
      <CardDescription>Manage users and their permissions</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((user) => (
          <div
            key={user}
            className="flex items-center justify-between p-3 border rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                {user}
              </div>
              <div>
                <p className="font-medium">User {user}</p>
                <p className="text-sm text-muted-foreground">
                  user{user}@example.com
                </p>
              </div>
            </div>
            <Badge variant={user % 2 === 0 ? "default" : "secondary"}>
              {user % 2 === 0 ? "Active" : "Inactive"}
            </Badge>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const SettingsContent = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Settings className="h-5 w-5" />
        Application Settings
      </CardTitle>
      <CardDescription>Configure your application preferences</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Theme</label>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Light
          </Button>
          <Button variant="default" size="sm">
            Dark
          </Button>
          <Button variant="outline" size="sm">
            System
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Notifications</label>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Email
          </Button>
          <Button variant="default" size="sm">
            Push
          </Button>
          <Button variant="outline" size="sm">
            SMS
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Basic tabs data
const basicTabs: TabItem[] = [
  {
    value: "dashboard",
    label: "Dashboard",
    content: <DashboardContent />,
  },
  {
    value: "users",
    label: "Users",
    content: <UsersContent />,
  },
  {
    value: "settings",
    label: "Settings",
    content: <SettingsContent />,
  },
];

// Many tabs for scrolling demo
const manyTabs: TabItem[] = [
  {
    value: "overview",
    label: "Overview",
    content: <DashboardContent />,
  },
  {
    value: "analytics",
    label: "Analytics & Reports",
    content: (
      <Card>
        <CardContent className="p-6">
          <h2>Analytics Dashboard</h2>
        </CardContent>
      </Card>
    ),
  },
  {
    value: "users-management",
    label: "User Management",
    content: <UsersContent />,
  },
  {
    value: "content-management",
    label: "Content Management",
    content: (
      <Card>
        <CardContent className="p-6">
          <h2>Content Management System</h2>
        </CardContent>
      </Card>
    ),
  },
  {
    value: "system-settings",
    label: "System Settings",
    content: <SettingsContent />,
  },
  {
    value: "security",
    label: "Security & Permissions",
    content: (
      <Card>
        <CardContent className="p-6">
          <h2>Security Dashboard</h2>
        </CardContent>
      </Card>
    ),
  },
  {
    value: "billing",
    label: "Billing & Subscriptions",
    content: (
      <Card>
        <CardContent className="p-6">
          <h2>Billing Management</h2>
        </CardContent>
      </Card>
    ),
  },
  {
    value: "integrations",
    label: "Third-party Integrations",
    content: (
      <Card>
        <CardContent className="p-6">
          <h2>Integration Settings</h2>
        </CardContent>
      </Card>
    ),
  },
  {
    value: "notifications",
    label: "Notifications",
    content: (
      <Card>
        <CardContent className="p-6">
          <h2>Notification Center</h2>
        </CardContent>
      </Card>
    ),
  },
  {
    value: "api-keys",
    label: "API Keys & Webhooks",
    content: (
      <Card>
        <CardContent className="p-6">
          <h2>API Management</h2>
        </CardContent>
      </Card>
    ),
  },
];

// Tabs with icons and states
const complexTabs: TabItem[] = [
  {
    value: "dashboard",
    label: "📊 Dashboard",
    content: <DashboardContent />,
  },
  {
    value: "users",
    label: "👥 Users",
    content: <UsersContent />,
  },
  {
    value: "reports",
    label: "📈 Reports",
    content: (
      <Card>
        <CardContent className="p-6">
          <h2>Reports & Analytics</h2>
        </CardContent>
      </Card>
    ),
  },
  {
    value: "settings",
    label: "⚙️ Settings",
    content: <SettingsContent />,
  },
  {
    value: "disabled",
    label: "🚫 Disabled Tab",
    content: (
      <Card>
        <CardContent className="p-6">
          <h2>This tab is disabled</h2>
        </CardContent>
      </Card>
    ),
    disabled: true,
  },
  {
    value: "hidden",
    label: "Hidden Tab",
    content: (
      <Card>
        <CardContent className="p-6">
          <h2>This tab is hidden</h2>
        </CardContent>
      </Card>
    ),
    hidden: true,
  },
];

export const Default: Story = {
  args: {
    tabs: basicTabs,
    defaultTab: "dashboard",
  },
};

export const WithManyTabs: Story = {
  args: {
    tabs: manyTabs,
    defaultTab: "overview",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates the scrollable tabs behavior when there are many tabs that don't fit in the container width.",
      },
    },
  },
};

export const WithDisabledAndHidden: Story = {
  args: {
    tabs: complexTabs,
    defaultTab: "dashboard",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows tabs with different states including disabled and hidden tabs.",
      },
    },
  },
};

export const CustomHeight: Story = {
  args: {
    tabs: basicTabs,
    defaultTab: "dashboard",
    containerHeight: "600px",
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstrates custom container height configuration.",
      },
    },
  },
};

export const NoUrlPersistence: Story = {
  args: {
    tabs: basicTabs,
    defaultTab: "dashboard",
    persistInUrl: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tabs without URL state persistence - tab state is only maintained in component state.",
      },
    },
  },
};

export const CustomUrlParam: Story = {
  args: {
    tabs: basicTabs,
    defaultTab: "dashboard",
    urlParamName: "section",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Uses a custom URL parameter name 'section' instead of the default 'tab'.",
      },
    },
  },
};

export const ReplaceHistory: Story = {
  args: {
    tabs: basicTabs,
    defaultTab: "dashboard",
    historyMode: "replace",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Uses 'replace' history mode instead of 'push', so tab changes don't create new browser history entries.",
      },
    },
  },
};

export const WithCallback: Story = {
  args: {
    tabs: basicTabs,
    defaultTab: "dashboard",
    onTabChange: (value: string) => {
      console.log("Tab changed to:", value);
      // In a real app, you might want to track analytics or perform other actions
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates the onTabChange callback functionality. Check the browser console when switching tabs.",
      },
    },
  },
};

export const EmptyTabs: Story = {
  args: {
    tabs: [],
  },
  parameters: {
    docs: {
      description: {
        story: "Shows the fallback UI when no tabs are provided.",
      },
    },
  },
};

export const AllHiddenTabs: Story = {
  args: {
    tabs: [
      {
        value: "hidden1",
        label: "Hidden Tab 1",
        content: <div>Content 1</div>,
        hidden: true,
      },
      {
        value: "hidden2",
        label: "Hidden Tab 2",
        content: <div>Content 2</div>,
        hidden: true,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Shows the fallback UI when all tabs are hidden.",
      },
    },
  },
};

export const Playground: Story = {
  args: {
    tabs: basicTabs,
    defaultTab: "dashboard",
    className: "",
    urlParamName: "tab",
    historyMode: "push",
    shallow: true,
    containerHeight: "calc(100vh - 5rem)",
    persistInUrl: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground to test all TabsContainer props and configurations.",
      },
    },
  },
};
