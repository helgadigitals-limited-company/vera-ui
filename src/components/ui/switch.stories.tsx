import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./switch";
import { Label } from "./label";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { useState } from "react";

const meta: Meta<typeof Switch> = {
  title: "Components/Forms/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A control that allows the user to toggle between checked and not checked. Built with Radix UI Switch primitives.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: { type: "boolean" },
      description: "The controlled state of the switch",
    },
    defaultChecked: {
      control: { type: "boolean" },
      description: "The default state when initially rendered",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the switch is disabled",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes to apply",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    defaultChecked: false,
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultChecked: false,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="notifications" />
      <Label htmlFor="notifications">Enable notifications</Label>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Switch with an associated label for better accessibility.",
      },
    },
  },
};

export const WithLabels: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <Label htmlFor="airplane-mode">Airplane Mode</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="wifi" defaultChecked />
        <Label htmlFor="wifi">Wi-Fi</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="bluetooth" />
        <Label htmlFor="bluetooth">Bluetooth</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="location" defaultChecked disabled />
        <Label htmlFor="location" className="text-muted-foreground">
          Location Services (Disabled)
        </Label>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Multiple switches with labels, showing different states.",
      },
    },
  },
};

export const Controlled: Story = {
  render: () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="controlled-switch"
            checked={isChecked}
            onCheckedChange={setIsChecked}
          />
          <Label htmlFor="controlled-switch">
            {isChecked ? "Enabled" : "Disabled"}
          </Label>
        </div>
        <p className="text-sm text-muted-foreground">
          Switch is {isChecked ? "ON" : "OFF"}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Controlled switch with state management and dynamic labeling.",
      },
    },
  },
};

export const SettingsPanel: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="notifications" className="text-base">
              Push Notifications
            </Label>
            <p className="text-sm text-muted-foreground">
              Receive notifications about updates and messages
            </p>
          </div>
          <Switch id="notifications" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="marketing" className="text-base">
              Marketing Emails
            </Label>
            <p className="text-sm text-muted-foreground">
              Receive emails about new features and promotions
            </p>
          </div>
          <Switch id="marketing" />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="analytics" className="text-base">
              Analytics
            </Label>
            <p className="text-sm text-muted-foreground">
              Help improve our service by sharing usage data
            </p>
          </div>
          <Switch id="analytics" defaultChecked />
        </div>

        <div className="flex items-center justify-between opacity-50">
          <div className="space-y-0.5">
            <Label htmlFor="security" className="text-base">
              Security Monitoring
            </Label>
            <p className="text-sm text-muted-foreground">
              Required for account security (cannot be disabled)
            </p>
          </div>
          <Switch id="security" defaultChecked disabled />
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Settings panel with multiple switches, descriptions, and one disabled option.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch className="scale-75" />
        <Label className="text-sm">Small switch</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch />
        <Label>Default switch</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch className="scale-125" />
        <Label className="text-lg">Large switch</Label>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different switch sizes using CSS scaling.",
      },
    },
  },
};

export const CustomColors: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch defaultChecked />
        <Label>Default (Primary)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch defaultChecked className="data-[state=checked]:bg-green-500" />
        <Label>Success Green</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch defaultChecked className="data-[state=checked]:bg-red-500" />
        <Label>Danger Red</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Switch defaultChecked className="data-[state=checked]:bg-purple-500" />
        <Label>Purple</Label>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Switches with custom colors for different states or themes.",
      },
    },
  },
};
