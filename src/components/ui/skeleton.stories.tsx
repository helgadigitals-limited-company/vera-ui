import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./skeleton";
import { Card, CardContent, CardHeader } from "./card";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Feedback/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A placeholder component that mimics the layout and appearance of content before it loads. Used to improve perceived loading performance.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: { type: "text" },
      description: "Additional CSS classes to apply",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => <Skeleton className="w-48 h-4" />,
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Skeleton className="w-32 h-3" />
      <Skeleton className="w-48 h-4" />
      <Skeleton className="w-64 h-5" />
      <Skeleton className="w-80 h-6" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different skeleton sizes for various content types.",
      },
    },
  },
};

export const Shapes: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <Skeleton className="h-12 w-12 rounded-lg" />
      <Skeleton className="h-12 w-12 rounded-none" />
      <Skeleton className="h-4 w-32" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Skeletons with different shapes - circle, rounded rectangle, square, and line.",
      },
    },
  },
};

export const CardSkeleton: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex space-x-2 mt-4">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: "Skeleton placeholder for a card with profile information.",
      },
    },
  },
};

export const ArticleList: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      {[1, 2, 3].map((item) => (
        <div key={item} className="space-y-3">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-5 w-full" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
          <div className="flex space-x-2">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-6 w-12" />
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Skeleton loader for a list of articles or blog posts.",
      },
    },
  },
};

export const TableSkeleton: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      {/* Table header */}
      <div className="flex space-x-4 mb-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>

      {/* Table rows */}
      {[1, 2, 3, 4, 5].map((row) => (
        <div key={row} className="flex items-center space-x-4 mb-3">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Skeleton placeholder for table data.",
      },
    },
  },
};

export const Dashboard: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
      {/* Stat cards */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-8 w-8" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-8 w-8" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
            <Skeleton className="h-8 w-8" />
          </div>
        </CardContent>
      </Card>

      {/* Chart area */}
      <Card className="col-span-full">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Skeleton layout for a dashboard with stats and charts.",
      },
    },
  },
};

export const ProfilePage: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6">
      {/* Profile header */}
      <div className="flex items-center space-x-6">
        <Skeleton className="h-24 w-24 rounded-full" />
        <div className="space-y-3">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
          <div className="flex space-x-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      </div>

      {/* Profile stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center space-y-2">
          <Skeleton className="h-6 w-12 mx-auto" />
          <Skeleton className="h-3 w-16 mx-auto" />
        </div>
        <div className="text-center space-y-2">
          <Skeleton className="h-6 w-12 mx-auto" />
          <Skeleton className="h-3 w-16 mx-auto" />
        </div>
        <div className="text-center space-y-2">
          <Skeleton className="h-6 w-12 mx-auto" />
          <Skeleton className="h-3 w-16 mx-auto" />
        </div>
      </div>

      {/* Content area */}
      <div className="space-y-4">
        <Skeleton className="h-5 w-32" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Complete skeleton layout for a user profile page.",
      },
    },
  },
};
