import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useState } from "react";
import { User, Settings, Mail, Shield, Star } from "lucide-react";

import { Combobox } from "./combobox";

const meta = {
  title: "UI/Combobox",
  component: Combobox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A searchable select component built on top of Radix UI Command and Popover primitives.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "secondary", "destructive", "error"],
      description: "The visual variant of the combobox",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no value is selected",
    },
    isLoading: {
      control: "boolean",
      description: "Shows loading state",
    },
    isError: {
      control: "boolean",
      description: "Shows error state",
    },
    errorMessage: {
      control: "text",
      description: "Custom error message",
    },
    disabled: {
      control: "boolean",
      description: "Disables the combobox",
    },
    modalPopover: {
      control: "boolean",
      description: "Whether the popover is modal",
    },
  },
  args: {
    onValueChange: fn(),
  },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Date", value: "date" },
  { label: "Elderberry", value: "elderberry" },
  { label: "Fig", value: "fig" },
  { label: "Grape", value: "grape" },
];

const optionsWithIcons = [
  { label: "Profile", value: "profile", icon: User },
  { label: "Settings", value: "settings", icon: Settings },
  { label: "Messages", value: "messages", icon: Mail },
  { label: "Security", value: "security", icon: Shield },
  { label: "Favorites", value: "favorites", icon: Star },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
    placeholder: "Select a fruit...",
  },
};

export const WithIcons: Story = {
  args: {
    options: optionsWithIcons,
    placeholder: "Choose an option...",
  },
};

export const WithDefaultValue: Story = {
  args: {
    options: defaultOptions,
    defaultValue: "banana",
    placeholder: "Select a fruit...",
  },
};

export const Secondary: Story = {
  args: {
    options: defaultOptions,
    variant: "secondary",
    placeholder: "Select a fruit...",
  },
};

export const Destructive: Story = {
  args: {
    options: defaultOptions,
    variant: "destructive",
    placeholder: "Select a fruit...",
  },
};

export const Loading: Story = {
  args: {
    options: defaultOptions,
    placeholder: "Select a fruit...",
    isLoading: true,
  },
};

export const Error: Story = {
  args: {
    options: defaultOptions,
    variant: "error",
    placeholder: "Select a fruit...",
    isError: true,
    errorMessage: "Please select a valid option",
  },
};

export const Disabled: Story = {
  args: {
    options: defaultOptions,
    placeholder: "Select a fruit...",
    disabled: true,
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState<string>("");

    return (
      <div className="w-64 space-y-4">
        <Combobox {...args} value={value} onValueChange={setValue} />
        <p className="text-sm text-muted-foreground">
          Selected value: {value || "None"}
        </p>
      </div>
    );
  },
  args: {
    options: defaultOptions,
    placeholder: "Select a fruit...",
  },
};

export const LargeDataset: Story = {
  args: {
    options: Array.from({ length: 50 }, (_, i) => ({
      label: `Option ${i + 1}`,
      value: `option-${i + 1}`,
    })),
    placeholder: "Search from 50 options...",
  },
};
