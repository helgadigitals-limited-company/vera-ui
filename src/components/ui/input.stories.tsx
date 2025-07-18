import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";
import { Label } from "./label";
import { Eye, EyeOff, Search, Mail, Lock } from "lucide-react";
import { useState } from "react";

const meta: Meta<typeof Input> = {
  title: "Components/Forms/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile input component for forms. Supports various input types, states, and accessibility features.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "search", "tel", "url", "number"],
      description: "The input type",
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable the input",
    },
    readOnly: {
      control: { type: "boolean" },
      description: "Make the input read-only",
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
    placeholder: "Enter text...",
  },
};

export const Types: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label htmlFor="text-input">Text Input</Label>
        <Input id="text-input" type="text" placeholder="Enter text..." />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email-input">Email Input</Label>
        <Input id="email-input" type="email" placeholder="your@email.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password-input">Password Input</Label>
        <Input
          id="password-input"
          type="password"
          placeholder="Your password"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="search-input">Search Input</Label>
        <Input id="search-input" type="search" placeholder="Search..." />
      </div>
      <div className="space-y-2">
        <Label htmlFor="number-input">Number Input</Label>
        <Input id="number-input" type="number" placeholder="123" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different input types for various data collection needs.",
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label htmlFor="email-with-icon">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="email-with-icon"
            type="email"
            placeholder="your@email.com"
            className="pl-10"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="search-with-icon">Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="search-with-icon"
            type="search"
            placeholder="Search..."
            className="pl-10"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password-with-toggle">Password with toggle</Label>
        <PasswordWithToggle />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Input fields enhanced with icons for better user experience.",
      },
    },
  },
};

function PasswordWithToggle() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        type={showPassword ? "text" : "password"}
        placeholder="Your password"
        className="pl-10 pr-10"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}

export const States: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label htmlFor="normal">Normal</Label>
        <Input id="normal" placeholder="Normal input" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="disabled">Disabled</Label>
        <Input id="disabled" placeholder="Disabled input" disabled />
      </div>
      <div className="space-y-2">
        <Label htmlFor="readonly">Read-only</Label>
        <Input id="readonly" value="Read-only value" readOnly />
      </div>
      <div className="space-y-2">
        <Label htmlFor="error">Error state</Label>
        <Input id="error" placeholder="Error input" aria-invalid />
      </div>
      <div className="space-y-2">
        <Label htmlFor="with-value">With value</Label>
        <Input id="with-value" defaultValue="This field has content" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Different input states including normal, disabled, read-only, and error states.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label htmlFor="small">Small (custom)</Label>
        <Input id="small" placeholder="Small input" className="h-8" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="default">Default</Label>
        <Input id="default" placeholder="Default input" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="large">Large (custom)</Label>
        <Input id="large" placeholder="Large input" className="h-12" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different input sizes for various use cases.",
      },
    },
  },
};

export const FileInput: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div className="space-y-2">
        <Label htmlFor="file-single">Single file</Label>
        <Input id="file-single" type="file" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="file-multiple">Multiple files</Label>
        <Input id="file-multiple" type="file" multiple />
      </div>
      <div className="space-y-2">
        <Label htmlFor="file-image">Images only</Label>
        <Input id="file-image" type="file" accept="image/*" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "File input variations for different file selection needs.",
      },
    },
  },
};

export const Playground: Story = {
  args: {
    placeholder: "Playground input...",
    type: "text",
    disabled: false,
    readOnly: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Experiment with all input props and see live changes.",
      },
    },
  },
};
