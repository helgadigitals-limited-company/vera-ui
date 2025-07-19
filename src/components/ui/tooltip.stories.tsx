import type { Meta, StoryObj } from "@storybook/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { Button } from "./button";
import { Badge } from "./badge";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Info, HelpCircle, Settings, Heart, Share2, Copy } from "lucide-react";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Overlays/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it. Built with Radix UI Tooltip primitives.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon">
          <Info className="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Get more information</p>
      </TooltipContent>
    </Tooltip>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tooltip triggered by an icon button.",
      },
    },
  },
};

export const Positioning: Story = {
  render: () => (
    <div className="flex gap-4 items-center justify-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">
            Top
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Tooltip on top</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">
            Right
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>Tooltip on right</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">
            Bottom
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Tooltip on bottom</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm">
            Left
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Tooltip on left</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tooltips positioned on different sides of the trigger element.",
      },
    },
  },
};

export const ActionButtons: Story = {
  render: () => (
    <div className="flex gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <Heart className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Like this post</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Share with friends</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <Copy className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy link</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Settings</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tooltips on action buttons to explain their purpose.",
      },
    },
  },
};

export const WithDelay: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button variant="outline">Fast (100ms)</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Quick tooltip</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip delayDuration={700}>
        <TooltipTrigger asChild>
          <Button variant="outline">Default (700ms)</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Default delay tooltip</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip delayDuration={1500}>
        <TooltipTrigger asChild>
          <Button variant="outline">Slow (1500ms)</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Slow tooltip</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tooltips with different delay durations before showing.",
      },
    },
  },
};

export const RichContent: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">User Info</Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Sarah Connor</p>
              <p className="text-xs text-muted-foreground">@sarahconnor</p>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline">Pro</Badge>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-center">
            <p className="font-medium">Pro Plan</p>
            <p className="text-xs text-muted-foreground">
              Unlimited projects
              <br />
              Priority support
              <br />
              Advanced features
            </p>
          </div>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-sm">
          <div className="space-y-2">
            <p className="font-medium">Need help?</p>
            <p className="text-sm">
              Check out our documentation or contact support for assistance.
            </p>
            <div className="flex gap-1">
              <Badge variant="secondary" className="text-xs">
                Docs
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Support
              </Badge>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Tooltips with rich content including avatars, badges, and formatted text.",
      },
    },
  },
};

export const FormFields: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <label className="text-sm font-medium">Email</label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-3 w-3 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <p>We'll never share your email address</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <input
          type="email"
          className="w-full px-3 py-2 border rounded-md text-sm"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <div className="flex items-center gap-2 mb-1">
          <label className="text-sm font-medium">Password</label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-3 w-3 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                <p>Password must contain:</p>
                <ul className="text-xs list-disc list-inside space-y-0.5">
                  <li>At least 8 characters</li>
                  <li>One uppercase letter</li>
                  <li>One number</li>
                  <li>One special character</li>
                </ul>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
        <input
          type="password"
          className="w-full px-3 py-2 border rounded-md text-sm"
          placeholder="Enter your password"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tooltips providing help information for form fields.",
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Button disabled>Disabled Button</Button>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>This feature is currently unavailable</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Button variant="ghost" size="icon" disabled>
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Settings access requires admin permissions</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Tooltips on disabled elements - note the wrapper div is needed for disabled elements to trigger tooltips.",
      },
    },
  },
};

export const KeyboardShortcuts: Story = {
  render: () => (
    <div className="flex gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <Copy className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex items-center gap-2">
            <span>Copy</span>
            <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded border">
              Ctrl+C
            </kbd>
          </div>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex items-center gap-2">
            <span>Settings</span>
            <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded border">
              Ctrl+,
            </kbd>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tooltips showing keyboard shortcuts for actions.",
      },
    },
  },
};
