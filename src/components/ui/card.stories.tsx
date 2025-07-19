import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "./button";
import { Badge } from "./badge";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Star,
} from "lucide-react";

const meta: Meta<typeof Card> = {
  title: "Components/Layout/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible container component for displaying content in a structured format. Cards can contain headers, content, and footers with various layouts and styles.",
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
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          This is a basic card with a title and description.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content area of the card.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const SimpleCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardContent>
        <p>A simple card with just content, no header or footer.</p>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: "A minimal card with only content.",
      },
    },
  },
};

export const ProfileCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">Sarah Connor</CardTitle>
            <CardDescription>@sarahconnor</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Software engineer passionate about building great user experiences.
          Love working with React, TypeScript, and modern web technologies.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-4">
          <Button variant="ghost" size="sm">
            <Heart className="h-4 w-4 mr-1" />
            24
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="h-4 w-4 mr-1" />
            12
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: "A social media style profile card with avatar and actions.",
      },
    },
  },
};

export const ProductCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader className="pb-2">
        <div className="aspect-video bg-muted rounded-lg mb-2 flex items-center justify-center">
          <span className="text-muted-foreground">Product Image</span>
        </div>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">Premium Headphones</CardTitle>
            <CardDescription>High-quality wireless headphones</CardDescription>
          </div>
          <Badge>New</Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">$299</span>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-muted-foreground ml-1">
              4.5 (123)
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "E-commerce style product card with image placeholder, price, and rating.",
      },
    },
  },
};

export const StatCard: Story = {
  render: () => (
    <Card className="w-64">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M2 7l10-5 10 5-10 5z" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$45,231.89</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Dashboard-style statistics card with metrics and growth indicators.",
      },
    },
  },
};

export const ArticleCard: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="outline">Technology</Badge>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <CardTitle className="text-xl">The Future of Web Development</CardTitle>
        <CardDescription>
          Exploring the latest trends and technologies that are shaping the
          future of web development.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-3">
          In this comprehensive article, we dive deep into the emerging
          technologies and frameworks that are revolutionizing how we build web
          applications. From new JavaScript frameworks to AI-powered development
          tools, discover what's coming next in the world of web development.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs">JD</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">John Doe</span>
          <span className="text-sm text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">5 min read</span>
        </div>
        <Button variant="ghost" size="sm">
          Read More
        </Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Blog-style article card with category, author info, and reading time.",
      },
    },
  },
};

export const NotificationCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <CardTitle className="text-base">New Message</CardTitle>
          <Badge variant="secondary" className="ml-auto text-xs">
            2m ago
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription>
          You have received a new message from Sarah. Click to view the full
          conversation.
        </CardDescription>
      </CardContent>
      <CardFooter className="pt-3">
        <Button variant="outline" size="sm" className="mr-2">
          Dismiss
        </Button>
        <Button size="sm">View Message</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Notification-style card with status indicator and action buttons.",
      },
    },
  },
};

export const GridLayout: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Card 1</CardTitle>
          <CardDescription>First card in the grid</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card demonstrates how cards look in a grid layout.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Card 2</CardTitle>
          <CardDescription>Second card in the grid</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Cards automatically adapt to the grid container.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Card 3</CardTitle>
          <CardDescription>Third card in the grid</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Perfect for dashboard layouts and content organization.</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Card 4</CardTitle>
          <CardDescription>Fourth card in the grid</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Consistent spacing and alignment across all cards.</p>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Multiple cards arranged in a responsive grid layout.",
      },
    },
  },
};
