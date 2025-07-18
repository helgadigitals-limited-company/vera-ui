import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Label } from "./label";
import { Input } from "./input";
import { Button } from "./button";
import { User, Settings, CreditCard, Bell } from "lucide-react";

const meta: Meta<typeof Tabs> = {
  title: "Components/Navigation/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A tabs component built with Radix UI. Organizes content into multiple panels that users can navigate between.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    defaultValue: {
      control: { type: "text" },
      description: "The default active tab",
    },
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
      description: "The orientation of the tabs",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes to apply",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-96">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="mt-4">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Tab 1 Content</h3>
          <p className="text-sm text-muted-foreground mt-2">
            This is the content for the first tab.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab2" className="mt-4">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Tab 2 Content</h3>
          <p className="text-sm text-muted-foreground mt-2">
            This is the content for the second tab.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab3" className="mt-4">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Tab 3 Content</h3>
          <p className="text-sm text-muted-foreground mt-2">
            This is the content for the third tab.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-96">
      <TabsList>
        <TabsTrigger value="account">
          <User className="h-4 w-4" />
          Account
        </TabsTrigger>
        <TabsTrigger value="settings">
          <Settings className="h-4 w-4" />
          Settings
        </TabsTrigger>
        <TabsTrigger value="billing">
          <CreditCard className="h-4 w-4" />
          Billing
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue="john@example.com" />
            </div>
            <Button>Save changes</Button>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="settings" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Configure your application settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive emails about your account activity.
                </p>
              </div>
              <input type="checkbox" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications on your devices.
                </p>
              </div>
              <input type="checkbox" />
            </div>
            <Button>Save settings</Button>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="billing" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Billing</CardTitle>
            <CardDescription>
              Manage your billing information and subscription.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold">Current Plan</h4>
              <p className="text-sm text-muted-foreground">
                Pro Plan - $29/month
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="card">Credit Card</Label>
              <Input id="card" placeholder="**** **** **** 1234" />
            </div>
            <Button>Update billing</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tabs with icons for better visual identification of each tab.",
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-96">
      <TabsList>
        <TabsTrigger value="tab1">Available</TabsTrigger>
        <TabsTrigger value="tab2" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="tab3">Available</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="mt-4">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Available Tab</h3>
          <p className="text-sm text-muted-foreground mt-2">
            This tab is available and can be selected.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab3" className="mt-4">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Another Available Tab</h3>
          <p className="text-sm text-muted-foreground mt-2">
            This is another available tab.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tabs with disabled states to prevent user interaction.",
      },
    },
  },
};

export const VerticalOrientation: Story = {
  render: () => (
    <Tabs
      defaultValue="overview"
      orientation="vertical"
      className="flex w-96 h-64"
    >
      <TabsList className="flex-col h-full w-32">
        <TabsTrigger value="overview" className="w-full">
          Overview
        </TabsTrigger>
        <TabsTrigger value="analytics" className="w-full">
          Analytics
        </TabsTrigger>
        <TabsTrigger value="reports" className="w-full">
          Reports
        </TabsTrigger>
        <TabsTrigger value="notifications" className="w-full">
          <Bell className="h-4 w-4" />
          Alerts
        </TabsTrigger>
      </TabsList>
      <div className="flex-1 ml-4">
        <TabsContent value="overview" className="mt-0">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Dashboard overview with key metrics and insights.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="mt-0">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Detailed analytics and performance data.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="mt-0">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Generate and view detailed reports.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="mt-0">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage your notification preferences and alerts.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tabs arranged vertically for sidebar-style navigation.",
      },
    },
  },
};

export const ManyTabs: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-full max-w-2xl">
      <TabsList>
        <TabsTrigger value="tab1">Home</TabsTrigger>
        <TabsTrigger value="tab2">Products</TabsTrigger>
        <TabsTrigger value="tab3">Services</TabsTrigger>
        <TabsTrigger value="tab4">About</TabsTrigger>
        <TabsTrigger value="tab5">Contact</TabsTrigger>
        <TabsTrigger value="tab6">Blog</TabsTrigger>
        <TabsTrigger value="tab7">Support</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Home</CardTitle>
            <CardDescription>Welcome to our homepage</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This is the home page content with an overview of our services.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="tab2" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>Browse our product catalog</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Explore our wide range of products and solutions.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="tab3" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Services</CardTitle>
            <CardDescription>Professional services we offer</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Learn about our professional services and consulting options.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      {/* Additional tab contents would go here */}
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: "Example with many tabs to show horizontal scrolling behavior.",
      },
    },
  },
};

export const Playground: Story = {
  args: {
    defaultValue: "tab1",
    orientation: "horizontal",
  },
  render: (args) => (
    <Tabs {...args} className="w-96">
      <TabsList>
        <TabsTrigger value="tab1">First</TabsTrigger>
        <TabsTrigger value="tab2">Second</TabsTrigger>
        <TabsTrigger value="tab3">Third</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="mt-4">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">First Tab</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Content for the first tab.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab2" className="mt-4">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Second Tab</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Content for the second tab.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab3" className="mt-4">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Third Tab</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Content for the third tab.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
  parameters: {
    docs: {
      description: {
        story: "Experiment with tabs props and see live changes.",
      },
    },
  },
};
