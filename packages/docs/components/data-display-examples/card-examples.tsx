"use client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@helgadigitals/vera-ui";
import { Avatar, AvatarFallback, AvatarImage } from "@helgadigitals/vera-ui";
import { Button } from "@helgadigitals/vera-ui";
import { Badge } from "@helgadigitals/vera-ui";
import { AspectRatio } from "@helgadigitals/vera-ui";
import { TrendingUp, Users, ShoppingCart, DollarSign, MoreHorizontal, Star, Bell, X } from "lucide-react";
import Image from "next/image";

export function BasicCardExample() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          Card description goes here. This provides additional context about the card content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the main content area of the card where you can place any information or components.</p>
      </CardContent>
    </Card>
  );
}

export function CardWithFooterExample() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Project</CardTitle>
        <CardDescription>
          Deploy your new project in one-click.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="name">Name</label>
              <input 
                id="name" 
                placeholder="Name of your project" 
                className="px-3 py-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="framework">Framework</label>
              <select id="framework" className="px-3 py-2 border rounded-md">
                <option value="">Select</option>
                <option value="next">Next.js</option>
                <option value="sveltekit">SvelteKit</option>
                <option value="astro">Astro</option>
                <option value="nuxt">Nuxt.js</option>
              </select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}

export function CardWithActionExample() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Repository</CardTitle>
        <CardDescription>
          A comprehensive React component library
        </CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Star className="mr-1 h-3 w-3" />
            1,234
          </div>
          <div>TypeScript</div>
          <div>Updated 2 hours ago</div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ProfileCardExample() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/avatars/01.png" alt="@johndoe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle>John Doe</CardTitle>
            <CardDescription>Senior Frontend Developer</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Skills</p>
            <div className="flex flex-wrap gap-1 mt-1">
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">Node.js</Badge>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Location</p>
            <p className="text-sm">San Francisco, CA</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View Profile</Button>
      </CardFooter>
    </Card>
  );
}

export function StatsCardExample() {
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      description: "+20.1% from last month",
      icon: DollarSign,
      trend: "up"
    },
    {
      title: "Subscriptions",
      value: "+2350",
      description: "+180.1% from last month",
      icon: Users,
      trend: "up"
    },
    {
      title: "Sales",
      value: "+12,234",
      description: "+19% from last month",
      icon: ShoppingCart,
      trend: "up"
    },
    {
      title: "Active Now",
      value: "+573",
      description: "+201 since last hour",
      icon: TrendingUp,
      trend: "up"
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ProductCardExample() {
  return (
    <Card className="w-[300px]">
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <Image
            src="/api/placeholder/400/225"
            alt="Product"
            width={400}
            height={225}
            className="rounded-t-lg object-cover w-full h-full"
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary">New</Badge>
            <Badge variant="outline">Free Shipping</Badge>
          </div>
          <CardTitle className="text-lg">Wireless Headphones</CardTitle>
          <CardDescription>
            High-quality wireless headphones with noise cancellation and 30-hour battery life.
          </CardDescription>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">$199.99</span>
            <span className="text-sm text-muted-foreground line-through">$249.99</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">Add to Cart</Button>
      </CardFooter>
    </Card>
  );
}

export function NotificationCardExample() {
  const notifications = [
    {
      title: "New message",
      description: "You have a new message from Sarah",
      time: "2 minutes ago",
      unread: true
    },
    {
      title: "System update",
      description: "System maintenance scheduled for tonight",
      time: "1 hour ago",
      unread: false
    },
    {
      title: "Payment received",
      description: "Payment of $299.00 has been received",
      time: "3 hours ago",
      unread: false
    }
  ];

  return (
    <div className="w-[400px] space-y-2">
      {notifications.map((notification, index) => (
        <Card key={index} className={notification.unread ? "border-l-4 border-l-blue-500" : ""}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="h-4 w-4" />
                <CardTitle className="text-sm">{notification.title}</CardTitle>
                {notification.unread && (
                  <Badge variant="destructive" className="h-2 w-2 p-0"></Badge>
                )}
              </div>
              <button 
                className="text-muted-foreground hover:text-foreground" 
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <CardDescription className="text-xs text-muted-foreground">
              {notification.time}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm">{notification.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}