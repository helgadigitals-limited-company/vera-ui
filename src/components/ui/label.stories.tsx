import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./label";
import { Input } from "./input";
import { Checkbox } from "./checkbox";
import { Switch } from "./switch";
import { Asterisk } from "lucide-react";

const meta: Meta<typeof Label> = {
  title: "Components/Forms/Label",
  component: Label,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A label component built with Radix UI. Associates text with form controls for better accessibility.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: { type: "text" },
      description: "The label text",
    },
    htmlFor: {
      control: { type: "text" },
      description: "The ID of the form control this label is associated with",
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
    children: "Label text",
    htmlFor: "example-input",
  },
  render: (args) => (
    <div className="space-y-2">
      <Label {...args} />
      <Input id="example-input" placeholder="Associated input" />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="required-input">
          Email address
          <Asterisk className="h-3 w-3 text-destructive" />
        </Label>
        <Input
          id="required-input"
          type="email"
          placeholder="your@email.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="required-input-2">
          Password
          <span className="text-destructive">*</span>
        </Label>
        <Input
          id="required-input-2"
          type="password"
          placeholder="Your password"
          required
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Labels with required field indicators.",
      },
    },
  },
};

export const WithHelperText: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="helper-input">Username</Label>
        <Input id="helper-input" placeholder="johndoe" />
        <p className="text-sm text-muted-foreground">
          This will be your public display name.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email-helper">
          Email address
          <span className="text-destructive">*</span>
        </Label>
        <Input id="email-helper" type="email" placeholder="your@email.com" />
        <p className="text-sm text-muted-foreground">
          We'll never share your email with anyone else.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Labels with helper text to provide additional context.",
      },
    },
  },
};

export const WithDifferentControls: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="text-input">Text Input</Label>
        <Input id="text-input" placeholder="Enter text" />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="checkbox-control" />
        <Label htmlFor="checkbox-control">
          I agree to the terms and conditions
        </Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="switch-control" />
        <Label htmlFor="switch-control">Enable notifications</Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="select-control">Country</Label>
        <select
          id="select-control"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">Select a country</option>
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="ca">Canada</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="textarea-control">Description</Label>
        <textarea
          id="textarea-control"
          placeholder="Enter description..."
          className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          rows={3}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Labels used with different form controls to show versatility.",
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="normal-state">Normal Label</Label>
        <Input id="normal-state" placeholder="Normal input" />
      </div>

      <div className="space-y-2" data-disabled="true">
        <Label htmlFor="disabled-state">Disabled Label</Label>
        <Input id="disabled-state" placeholder="Disabled input" disabled />
      </div>

      <div className="space-y-2">
        <Label htmlFor="error-state" className="text-destructive">
          Error Label
        </Label>
        <Input
          id="error-state"
          placeholder="Input with error"
          aria-invalid
          className="border-destructive"
        />
        <p className="text-sm text-destructive">This field is required.</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Labels in different states: normal, disabled, and error.",
      },
    },
  },
};

export const Playground: Story = {
  args: {
    children: "Playground Label",
    htmlFor: "playground-input",
  },
  render: (args) => (
    <div className="space-y-2">
      <Label {...args} />
      <Input id="playground-input" placeholder="Associated input" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Experiment with label props and see live changes.",
      },
    },
  },
};
