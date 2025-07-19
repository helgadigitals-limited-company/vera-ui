import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";
import { Check, X, AlertCircle, Clock, Star, Zap } from "lucide-react";

const meta: Meta<typeof Badge> = {
  title: "Components/Data Display/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A small count and labeling component. Displays a badge element that can be used to show status, notifications, or categorical information.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "secondary", "destructive", "outline"],
      description: "The visual style variant of the badge",
    },
    asChild: {
      control: { type: "boolean" },
      description: "Render as a child component",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes to apply",
    },
    children: {
      control: { type: "text" },
      description: "The content of the badge",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Badge",
    variant: "default",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Destructive: Story = {
  args: {
    children: "Destructive",
    variant: "destructive",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Overview of all badge variants.",
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>
        <Check className="h-3 w-3" />
        Success
      </Badge>
      <Badge variant="destructive">
        <X className="h-3 w-3" />
        Error
      </Badge>
      <Badge variant="secondary">
        <AlertCircle className="h-3 w-3" />
        Warning
      </Badge>
      <Badge variant="outline">
        <Clock className="h-3 w-3" />
        Pending
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Badges with icons to enhance meaning and visual appeal.",
      },
    },
  },
};

export const StatusIndicators: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
      <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>
      <Badge className="bg-red-500 hover:bg-red-600">Inactive</Badge>
      <Badge className="bg-blue-500 hover:bg-blue-600">Draft</Badge>
      <Badge className="bg-purple-500 hover:bg-purple-600">Published</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Custom colored badges for status indicators.",
      },
    },
  },
};

export const NotificationBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="relative">
        <span className="text-sm">Inbox</span>
        <Badge className="ml-2">12</Badge>
      </div>
      <div className="relative">
        <span className="text-sm">Messages</span>
        <Badge variant="destructive" className="ml-2">
          99+
        </Badge>
      </div>
      <div className="relative">
        <span className="text-sm">Notifications</span>
        <Badge variant="secondary" className="ml-2">
          3
        </Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Badges used as notification counters.",
      },
    },
  },
};

export const TagsAndLabels: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1">
        <Badge variant="outline">React</Badge>
        <Badge variant="outline">TypeScript</Badge>
        <Badge variant="outline">Tailwind CSS</Badge>
        <Badge variant="outline">Vite</Badge>
      </div>
      <div className="flex flex-wrap gap-1">
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300">
          Frontend
        </Badge>
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300">
          Component
        </Badge>
        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300">
          UI Library
        </Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Badges used as tags and category labels.",
      },
    },
  },
};

export const InteractiveBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge asChild>
        <button className="cursor-pointer">
          <Star className="h-3 w-3" />
          Favorite
        </button>
      </Badge>
      <Badge variant="outline" asChild>
        <a href="#" className="hover:underline">
          <Zap className="h-3 w-3" />
          Link Badge
        </a>
      </Badge>
      <Badge variant="secondary" asChild>
        <button className="cursor-pointer hover:opacity-80">Clickable</button>
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Interactive badges that can be clicked or act as links using asChild prop.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 items-center">
      <Badge className="text-xs px-1 py-0.5">Small</Badge>
      <Badge>Default</Badge>
      <Badge className="text-sm px-3 py-1">Large</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different badge sizes achieved through custom classes.",
      },
    },
  },
};

export const ComplexContent: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          Online
        </div>
      </Badge>
      <Badge variant="outline">
        <div className="flex items-center gap-1">
          <span className="font-mono">v2.1.0</span>
        </div>
      </Badge>
      <Badge variant="secondary">
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3 fill-current" />
          4.8
        </div>
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Badges with complex content including indicators and formatted text.",
      },
    },
  },
};
