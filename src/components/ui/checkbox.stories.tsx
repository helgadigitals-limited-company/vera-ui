import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./checkbox";
import { Label } from "./label";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Forms/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A checkbox component built with Radix UI. Allows users to select one or more options from a set.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: { type: "boolean" },
      description: "Disable the checkbox",
    },
    checked: {
      control: { type: "boolean" },
      description: "The checked state of the checkbox",
    },
    defaultChecked: {
      control: { type: "boolean" },
      description: "The default checked state",
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
    id: "default-checkbox",
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <Label htmlFor="default-checkbox">Accept terms and conditions</Label>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="unchecked" />
        <Label htmlFor="unchecked">Unchecked</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="checked" defaultChecked />
        <Label htmlFor="checked">Checked</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled" disabled />
        <Label htmlFor="disabled">Disabled</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-checked" disabled defaultChecked />
        <Label htmlFor="disabled-checked">Disabled & Checked</Label>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Different checkbox states including unchecked, checked, disabled, and disabled & checked.",
      },
    },
  },
};

export const WithLabels: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox id="newsletter" />
        <Label htmlFor="newsletter">Subscribe to newsletter</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="marketing" />
        <Label htmlFor="marketing">
          I agree to receive marketing communications
        </Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">
          I accept the{" "}
          <a href="#" className="text-primary underline">
            terms and conditions
          </a>
        </Label>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Checkboxes with descriptive labels for better user experience.",
      },
    },
  },
};

export const FormExample: Story = {
  render: () => (
    <div className="max-w-md space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notification preferences</h3>
        <p className="text-sm text-muted-foreground">
          Choose how you want to be notified about updates.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="email-notifications" defaultChecked />
          <Label htmlFor="email-notifications" className="text-sm font-normal">
            Email notifications
          </Label>
        </div>
        <div className="ml-6 text-sm text-muted-foreground">
          Receive emails about your account activity.
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="push-notifications" />
          <Label htmlFor="push-notifications" className="text-sm font-normal">
            Push notifications
          </Label>
        </div>
        <div className="ml-6 text-sm text-muted-foreground">
          Receive push notifications on your devices.
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="sms-notifications" />
          <Label htmlFor="sms-notifications" className="text-sm font-normal">
            SMS notifications
          </Label>
        </div>
        <div className="ml-6 text-sm text-muted-foreground">
          Receive text messages for important updates.
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A practical form example showing how checkboxes work in a real-world scenario.",
      },
    },
  },
};

export const Playground: Story = {
  args: {
    disabled: false,
    defaultChecked: false,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} id="playground-checkbox" />
      <Label htmlFor="playground-checkbox">Playground Checkbox</Label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Experiment with checkbox props and see live changes.",
      },
    },
  },
};
