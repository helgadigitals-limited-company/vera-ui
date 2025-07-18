import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { ChevronRight, Download, Mail, Plus } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Components/Forms/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile button component built with Radix UI and styled with Tailwind CSS. Supports multiple variants, sizes, and states for different use cases.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      description: "The visual style variant of the button",
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg", "icon"],
      description: "The size of the button",
    },
    asChild: {
      control: { type: "boolean" },
      description: "Render as a child component",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable the button",
    },
    children: {
      control: { type: "text" },
      description: "The content of the button",
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
  args: {
    children: "Button",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All available button variants. Each serves different purposes and contexts.",
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Plus className="size-4" />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different button sizes for various UI contexts.",
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button>
        <Mail className="mr-2 h-4 w-4" />
        Send Email
      </Button>
      <Button variant="outline">
        <Download className="mr-2 h-4 w-4" />
        Download
      </Button>
      <Button variant="secondary">
        Continue
        <ChevronRight className="ml-2 h-4 w-4" />
      </Button>
      <Button size="icon" variant="ghost">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Buttons with icons for enhanced visual communication.",
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Button>Normal</Button>
        <Button disabled>Disabled</Button>
      </div>
      <div className="flex gap-4">
        <Button variant="destructive">Delete</Button>
        <Button variant="destructive" disabled>
          Disabled Delete
        </Button>
      </div>
      <div className="flex gap-4">
        <Button variant="outline">Normal Outline</Button>
        <Button variant="outline" disabled>
          Disabled Outline
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different button states including normal and disabled states.",
      },
    },
  },
};

export const Loading: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button disabled>
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground" />
        Loading...
      </Button>
      <Button variant="outline" disabled>
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
        Please wait
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Buttons in loading state with spinner animation.",
      },
    },
  },
};

export const Playground: Story = {
  args: {
    children: "Playground Button",
    variant: "default",
    size: "default",
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Experiment with all button props and see live changes.",
      },
    },
  },
};
