import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./progress";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { useState, useEffect } from "react";

const meta: Meta<typeof Progress> = {
  title: "Components/Feedback/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar. Built with Radix UI Progress primitives.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "number", min: 0, max: 100 },
      description: "The progress value (0-100)",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes to apply",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 50,
  },
  render: (args) => (
    <div className="w-80">
      <Progress {...args} />
    </div>
  ),
};

export const ZeroPercent: Story = {
  args: {
    value: 0,
  },
  render: (args) => (
    <div className="w-80">
      <Progress {...args} />
      <p className="text-sm text-muted-foreground mt-2">0% Complete</p>
    </div>
  ),
};

export const HundredPercent: Story = {
  args: {
    value: 100,
  },
  render: (args) => (
    <div className="w-80">
      <Progress {...args} />
      <p className="text-sm text-muted-foreground mt-2">100% Complete</p>
    </div>
  ),
};

export const VariousValues: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Loading...</span>
          <span>25%</span>
        </div>
        <Progress value={25} />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Processing...</span>
          <span>60%</span>
        </div>
        <Progress value={60} />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Almost done...</span>
          <span>87%</span>
        </div>
        <Progress value={87} />
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span>Complete!</span>
          <span>100%</span>
        </div>
        <Progress value={100} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Progress bars with different values and labels.",
      },
    },
  },
};

export const ColorVariants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <p className="text-sm mb-2">Default (Primary)</p>
        <Progress value={65} />
      </div>
      <div>
        <p className="text-sm mb-2">Success (Green)</p>
        <Progress value={80} className="[&>div]:bg-green-500" />
      </div>
      <div>
        <p className="text-sm mb-2">Warning (Yellow)</p>
        <Progress value={45} className="[&>div]:bg-yellow-500" />
      </div>
      <div>
        <p className="text-sm mb-2">Danger (Red)</p>
        <Progress value={20} className="[&>div]:bg-red-500" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Progress bars with different color schemes for various states.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <p className="text-sm mb-2">Small (h-1)</p>
        <Progress value={60} className="h-1" />
      </div>
      <div>
        <p className="text-sm mb-2">Default (h-2)</p>
        <Progress value={60} />
      </div>
      <div>
        <p className="text-sm mb-2">Medium (h-3)</p>
        <Progress value={60} className="h-3" />
      </div>
      <div>
        <p className="text-sm mb-2">Large (h-4)</p>
        <Progress value={60} className="h-4" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Progress bars with different heights.",
      },
    },
  },
};

export const AnimatedProgress: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const timer = setTimeout(() => setProgress(66), 500);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="w-80">
        <div className="flex justify-between text-sm mb-2">
          <span>Loading assets...</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} />
        <Button
          className="mt-4 w-full"
          onClick={() => setProgress(Math.random() * 100)}
        >
          Randomize Progress
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Animated progress bar that updates when the value changes.",
      },
    },
  },
};

export const IndeterminateProgress: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <p className="text-sm mb-2">Indeterminate Progress</p>
        <div className="bg-primary/20 relative h-2 w-full overflow-hidden rounded-full">
          <div className="bg-primary h-full absolute animate-pulse rounded-full w-1/3 left-0"></div>
        </div>
      </div>
      <div>
        <p className="text-sm mb-2">Loading Animation</p>
        <div className="bg-primary/20 relative h-2 w-full overflow-hidden rounded-full">
          <div
            className="bg-primary h-full absolute rounded-full w-1/3 animate-[loading_2s_ease-in-out_infinite]"
            style={{
              animation: "loading 2s ease-in-out infinite",
            }}
          ></div>
        </div>
        <style jsx>{`
          @keyframes loading {
            0% {
              transform: translateX(-100%);
            }
            50% {
              transform: translateX(400%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}</style>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Indeterminate progress indicators for unknown completion times.",
      },
    },
  },
};

export const WithCards: Story = {
  render: () => (
    <div className="grid gap-4 w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>File Upload Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>document.pdf</span>
              <span>85%</span>
            </div>
            <Progress value={85} />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>image.png</span>
              <span>100%</span>
            </div>
            <Progress value={100} className="[&>div]:bg-green-500" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>video.mp4</span>
              <span>32%</span>
            </div>
            <Progress value={32} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>CPU Usage</span>
              <span>45%</span>
            </div>
            <Progress value={45} className="[&>div]:bg-blue-500" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Memory</span>
              <span>78%</span>
            </div>
            <Progress value={78} className="[&>div]:bg-orange-500" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Storage</span>
              <span>92%</span>
            </div>
            <Progress value={92} className="[&>div]:bg-red-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Progress bars used in card layouts for file uploads and system monitoring.",
      },
    },
  },
};
