import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "./separator";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { Badge } from "./badge";

const meta: Meta<typeof Separator> = {
  title: "Components/Layout/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Visually or semantically separates content. Built with Radix UI Separator primitives.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
      description: "The orientation of the separator",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes to apply",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  args: {
    orientation: "horizontal",
  },
  render: (args) => (
    <div className="w-64">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator {...args} className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <div className="w-64 space-y-4">
      <p>Content above the separator</p>
      <Separator />
      <p>Content below the separator</p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Horizontal separator dividing content vertically.",
      },
    },
  },
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-12 items-center space-x-4 text-sm">
      <div>Home</div>
      <Separator orientation="vertical" />
      <div>About</div>
      <Separator orientation="vertical" />
      <div>Contact</div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Vertical separator dividing content horizontally.",
      },
    },
  },
};

export const Navigation: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <nav className="flex items-center space-x-1 text-sm">
        <a href="#" className="hover:text-primary">
          Home
        </a>
        <Separator orientation="vertical" className="mx-2" />
        <a href="#" className="hover:text-primary">
          Products
        </a>
        <Separator orientation="vertical" className="mx-2" />
        <a href="#" className="hover:text-primary">
          About
        </a>
        <Separator orientation="vertical" className="mx-2" />
        <a href="#" className="hover:text-primary">
          Contact
        </a>
      </nav>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Separators used in navigation menus.",
      },
    },
  },
};

export const InCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">
            Manage your profile information
          </p>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-medium">Privacy</h3>
          <p className="text-sm text-muted-foreground">
            Control your privacy settings
          </p>
        </div>

        <Separator />

        <div>
          <h3 className="text-sm font-medium">Notifications</h3>
          <p className="text-sm text-muted-foreground">
            Configure notification preferences
          </p>
        </div>

        <Separator />

        <div className="pt-2">
          <Button variant="destructive" size="sm">
            Delete Account
          </Button>
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: "Separators used within a card to organize sections.",
      },
    },
  },
};

export const Breadcrumb: Story = {
  render: () => (
    <div className="flex items-center space-x-1 text-sm">
      <a href="#" className="hover:text-primary">
        Dashboard
      </a>
      <Separator orientation="vertical" className="mx-2" />
      <a href="#" className="hover:text-primary">
        Projects
      </a>
      <Separator orientation="vertical" className="mx-2" />
      <a href="#" className="hover:text-primary">
        Web App
      </a>
      <Separator orientation="vertical" className="mx-2" />
      <span className="text-muted-foreground">Settings</span>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Separators in breadcrumb navigation.",
      },
    },
  },
};

export const Sidebar: Story = {
  render: () => (
    <div className="flex w-64 h-48">
      <div className="w-16 bg-muted flex flex-col items-center py-4 space-y-4">
        <div className="w-8 h-8 bg-primary rounded"></div>
        <div className="w-8 h-8 bg-muted-foreground rounded"></div>
        <div className="w-8 h-8 bg-muted-foreground rounded"></div>
      </div>

      <Separator orientation="vertical" />

      <div className="flex-1 p-4 space-y-4">
        <h2 className="font-semibold">Main Content</h2>
        <p className="text-sm text-muted-foreground">
          The vertical separator divides the sidebar from the main content area.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Vertical separator dividing sidebar from main content.",
      },
    },
  },
};

export const TagList: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <h3 className="text-sm font-medium mb-3">Tags</h3>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline">React</Badge>
        <Separator orientation="vertical" className="h-4" />
        <Badge variant="outline">TypeScript</Badge>
        <Separator orientation="vertical" className="h-4" />
        <Badge variant="outline">Tailwind</Badge>
        <Separator orientation="vertical" className="h-4" />
        <Badge variant="outline">Storybook</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Separators between tags or badges.",
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => (
    <div className="w-64 space-y-6">
      <div>
        <p className="mb-2 text-sm">Default separator</p>
        <Separator />
      </div>

      <div>
        <p className="mb-2 text-sm">Thick separator</p>
        <Separator className="h-0.5" />
      </div>

      <div>
        <p className="mb-2 text-sm">Colored separator</p>
        <Separator className="bg-blue-500" />
      </div>

      <div>
        <p className="mb-2 text-sm">Dashed separator</p>
        <Separator className="border-dashed bg-transparent border-t border-border" />
      </div>

      <div>
        <p className="mb-2 text-sm">Gradient separator</p>
        <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Separators with different styling options.",
      },
    },
  },
};
