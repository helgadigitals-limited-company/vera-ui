import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  User,
  Settings,
  Star,
  Globe,
  Palette,
  Code,
  Database,
  Smartphone,
} from "lucide-react";

import { MultiSelect } from "./Multi-select";

const meta = {
  title: "UI/Multi-Select",
  component: MultiSelect,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A multi-select component that allows users to select multiple options from a dropdown list.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "secondary", "destructive", "inverted"],
      description: "The visual variant of the multi-select",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when no options are selected",
    },
    maxCount: {
      control: "number",
      description: "Maximum number of selected items to display",
    },
    animation: {
      control: "number",
      description: "Animation duration in seconds",
    },
    disabled: {
      control: "boolean",
      description: "Disables the multi-select",
    },
    modalPopover: {
      control: "boolean",
      description: "Whether the popover is modal",
    },
    asChild: {
      control: "boolean",
      description: "Render as child component",
    },
  },
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const frameworkOptions = [
  { label: "React", value: "react", icon: Code },
  { label: "Vue", value: "vue", icon: Palette },
  { label: "Angular", value: "angular", icon: Globe },
  { label: "Svelte", value: "svelte", icon: Star },
  { label: "Next.js", value: "nextjs", icon: Database },
  { label: "Nuxt.js", value: "nuxtjs", icon: Settings },
  { label: "Gatsby", value: "gatsby", icon: Smartphone },
  { label: "Express", value: "express", icon: Database },
];

const skillOptions = [
  { label: "JavaScript", value: "javascript", icon: Code },
  { label: "TypeScript", value: "typescript", icon: Code },
  { label: "Python", value: "python", icon: Code },
  { label: "Java", value: "java", icon: Code },
  { label: "C++", value: "cpp", icon: Code },
  { label: "Go", value: "go", icon: Code },
  { label: "Rust", value: "rust", icon: Code },
  { label: "PHP", value: "php", icon: Code },
];

const categoryOptions = [
  { label: "Technology", value: "technology" },
  { label: "Design", value: "design" },
  { label: "Marketing", value: "marketing" },
  { label: "Sales", value: "sales" },
  { label: "Finance", value: "finance" },
  { label: "Operations", value: "operations" },
  { label: "Human Resources", value: "hr" },
  { label: "Legal", value: "legal" },
];

const teamOptions = [
  { label: "Alice Johnson", value: "alice", icon: User },
  { label: "Bob Smith", value: "bob", icon: User },
  { label: "Carol Davis", value: "carol", icon: User },
  { label: "David Wilson", value: "david", icon: User },
  { label: "Eva Brown", value: "eva", icon: User },
  { label: "Frank Miller", value: "frank", icon: User },
];

export const Default: Story = {
  args: {
    options: frameworkOptions,
    placeholder: "Select frameworks...",
    onValueChange: (values: string[]) => {
      console.log("Selected values:", values);
    },
  },
};

export const WithDefaultValue: Story = {
  args: {
    options: frameworkOptions,
    defaultValue: ["react", "nextjs"],
    placeholder: "Select frameworks...",
    onValueChange: (values: string[]) => {
      console.log("Selected values:", values);
    },
  },
};

export const Secondary: Story = {
  args: {
    options: skillOptions,
    variant: "secondary",
    placeholder: "Select skills...",
    onValueChange: (values: string[]) => {
      console.log("Selected values:", values);
    },
  },
};

export const Destructive: Story = {
  args: {
    options: categoryOptions,
    variant: "destructive",
    placeholder: "Select categories...",
    onValueChange: (values: string[]) => {
      console.log("Selected values:", values);
    },
  },
};

export const WithMaxCount: Story = {
  args: {
    options: skillOptions,
    maxCount: 2,
    placeholder: "Select up to 2 skills...",
    onValueChange: (values: string[]) => {
      console.log("Selected values:", values);
    },
  },
};

export const WithAnimation: Story = {
  args: {
    options: frameworkOptions,
    animation: 0.5,
    placeholder: "Select with animation...",
    onValueChange: (values: string[]) => {
      console.log("Selected values:", values);
    },
  },
};

export const Disabled: Story = {
  args: {
    options: frameworkOptions,
    defaultValue: ["react", "vue"],
    placeholder: "Disabled multi-select...",
    disabled: true,
    onValueChange: (values: string[]) => {
      console.log("Selected values:", values);
    },
  },
};

export const Controlled: Story = {
  args: {
    options: frameworkOptions,
    onValueChange: () => {},
  },
  render: (args) => {
    const [selectedValues, setSelectedValues] = useState<string[]>(["react"]);

    return (
      <div className="w-80 space-y-4">
        <MultiSelect
          {...args}
          options={frameworkOptions}
          value={selectedValues}
          onValueChange={setSelectedValues}
          placeholder="Select frameworks..."
        />
        <div className="text-sm text-muted-foreground">
          <p>Selected values: {selectedValues.join(", ") || "None"}</p>
          <p>Count: {selectedValues.length}</p>
        </div>
      </div>
    );
  },
};

export const LargeDataset: Story = {
  args: {
    options: Array.from({ length: 50 }, (_, i) => ({
      label: `Option ${i + 1}`,
      value: `option-${i + 1}`,
    })),
    placeholder: "Search from 50 options...",
    maxCount: 3,
    onValueChange: (values: string[]) => {
      console.log("Selected values:", values);
    },
  },
};

export const TeamAssignment: Story = {
  args: {
    options: teamOptions,
    onValueChange: () => {},
  },
  render: (args) => {
    const [assignedMembers, setAssignedMembers] = useState<string[]>([]);

    return (
      <div className="w-96 space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Assign Team Members</h3>
          <p className="text-sm text-muted-foreground">
            Select team members to assign to this project.
          </p>
        </div>
        <MultiSelect
          {...args}
          options={teamOptions}
          value={assignedMembers}
          onValueChange={setAssignedMembers}
          placeholder="Select team members..."
          maxCount={3}
        />
        {assignedMembers.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Assigned Members:</p>
            <div className="text-sm text-muted-foreground">
              {assignedMembers.map((memberId) => {
                const member = teamOptions.find(
                  (option) => option.value === memberId
                );
                return member ? (
                  <div key={memberId} className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {member.label}
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    );
  },
};

export const CategoryFilter: Story = {
  args: {
    options: categoryOptions,
    onValueChange: () => {},
  },
  render: (args) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    return (
      <div className="w-80 space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Filter by Categories</h3>
          <p className="text-sm text-muted-foreground">
            Select categories to filter the content.
          </p>
        </div>
        <MultiSelect
          {...args}
          options={categoryOptions}
          value={selectedCategories}
          onValueChange={setSelectedCategories}
          placeholder="All categories"
          variant="secondary"
        />
        <div className="text-sm">
          <p className="font-medium">Active Filters:</p>
          {selectedCategories.length === 0 ? (
            <p className="text-muted-foreground">No filters applied</p>
          ) : (
            <p className="text-muted-foreground">
              {selectedCategories.join(", ")}
            </p>
          )}
        </div>
      </div>
    );
  },
};
