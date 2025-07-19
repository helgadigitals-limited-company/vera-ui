import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react";

const meta: Meta<typeof Alert> = {
  title: "Components/Feedback/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Displays a callout for user attention. Alert components are used to communicate important information to users.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "destructive"],
      description: "The visual style variant of the alert",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes to apply",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    variant: "default",
  },
  render: (args) => (
    <Alert {...args} className="max-w-md">
      <Info className="h-4 w-4" />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        This is an informational alert with some helpful content.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
  },
  render: (args) => (
    <Alert {...args} className="max-w-md">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Something went wrong. Please check your input and try again.
      </AlertDescription>
    </Alert>
  ),
};

export const Success: Story = {
  render: (args) => (
    <Alert
      {...args}
      className="max-w-md border-green-200 bg-green-50 text-green-800 dark:bg-green-950/20 dark:border-green-900 dark:text-green-400"
    >
      <CheckCircle2 className="h-4 w-4" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>
        Your changes have been saved successfully.
      </AlertDescription>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Success alert variant with custom styling using Tailwind classes.",
      },
    },
  },
};

export const Warning: Story = {
  render: (args) => (
    <Alert
      {...args}
      className="max-w-md border-yellow-200 bg-yellow-50 text-yellow-800 dark:bg-yellow-950/20 dark:border-yellow-900 dark:text-yellow-400"
    >
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        This action cannot be undone. Please proceed with caution.
      </AlertDescription>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: "Warning alert variant with custom styling.",
      },
    },
  },
};

export const WithoutIcon: Story = {
  render: (args) => (
    <Alert {...args} className="max-w-md">
      <AlertTitle>No Icon Alert</AlertTitle>
      <AlertDescription>
        This alert doesn't have an icon but still conveys important information.
      </AlertDescription>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: "Alert without an icon - the grid layout automatically adjusts.",
      },
    },
  },
};

export const TitleOnly: Story = {
  render: (args) => (
    <Alert {...args} className="max-w-md">
      <Info className="h-4 w-4" />
      <AlertTitle>Title Only Alert</AlertTitle>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: "Alert with only a title and icon, no description.",
      },
    },
  },
};

export const DescriptionOnly: Story = {
  render: (args) => (
    <Alert {...args} className="max-w-md">
      <Info className="h-4 w-4" />
      <AlertDescription>
        This alert only has a description without a title.
      </AlertDescription>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story: "Alert with only a description and icon, no title.",
      },
    },
  },
};

export const LongContent: Story = {
  render: (args) => (
    <Alert {...args} className="max-w-md">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Important Update Required</AlertTitle>
      <AlertDescription>
        We've detected that your application is running an outdated version.
        This version has known security vulnerabilities and performance issues.
        Please update to the latest version immediately to ensure the security
        and optimal performance of your application. The update process will
        take approximately 5-10 minutes and requires a restart.
      </AlertDescription>
    </Alert>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Alert with longer content that demonstrates text wrapping behavior.",
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Default Alert</AlertTitle>
        <AlertDescription>This is a default alert message.</AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Destructive Alert</AlertTitle>
        <AlertDescription>
          This is a destructive alert message.
        </AlertDescription>
      </Alert>

      <Alert className="border-green-200 bg-green-50 text-green-800 dark:bg-green-950/20 dark:border-green-900 dark:text-green-400">
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>Success Alert</AlertTitle>
        <AlertDescription>This is a success alert message.</AlertDescription>
      </Alert>

      <Alert className="border-yellow-200 bg-yellow-50 text-yellow-800 dark:bg-yellow-950/20 dark:border-yellow-900 dark:text-yellow-400">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning Alert</AlertTitle>
        <AlertDescription>This is a warning alert message.</AlertDescription>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Overview of all alert variants and their visual appearance.",
      },
    },
  },
};
