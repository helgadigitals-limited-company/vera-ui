"use client";

import { Separator } from "@helgadigitals/vera-ui";
import { Button } from "@helgadigitals/vera-ui";
import { Card, CardContent, CardHeader, CardTitle } from "@helgadigitals/vera-ui";
import { Badge } from "@helgadigitals/vera-ui";
import { Avatar, AvatarFallback, AvatarImage } from "@helgadigitals/vera-ui";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Undo,
  Redo,
  Save,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock
} from "lucide-react";

export function BasicSeparatorExample() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm">First section content</p>
      </div>
      
      <Separator />
      
      <div>
        <p className="text-sm">Second section content</p>
      </div>
      
      <Separator />
      
      <div>
        <p className="text-sm">Third section content</p>
      </div>
    </div>
  );
}

export function VerticalSeparatorExample() {
  return (
    <div className="flex h-16 items-center space-x-4">
      <div className="text-sm">Left content</div>
      <Separator orientation="vertical" />
      <div className="text-sm">Middle content</div>
      <Separator orientation="vertical" />
      <div className="text-sm">Right content</div>
    </div>
  );
}

export function NavigationMenuExample() {
  return (
    <div className="space-y-1">
      <div className="px-2 py-1">
        <h4 className="text-sm font-medium text-muted-foreground">Navigation</h4>
      </div>
      
      <Button variant="ghost" className="w-full justify-start">
        Dashboard
      </Button>
      <Button variant="ghost" className="w-full justify-start">
        Projects
      </Button>
      <Button variant="ghost" className="w-full justify-start">
        Tasks
      </Button>
      
      <Separator className="my-2" />
      
      <div className="px-2 py-1">
        <h4 className="text-sm font-medium text-muted-foreground">Settings</h4>
      </div>
      
      <Button variant="ghost" className="w-full justify-start">
        Profile
      </Button>
      <Button variant="ghost" className="w-full justify-start">
        Preferences
      </Button>
      
      <Separator className="my-2" />
      
      <Button variant="ghost" className="w-full justify-start text-red-600">
        Sign Out
      </Button>
    </div>
  );
}

export function BreadcrumbExample() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Electronics", href: "/products/electronics" },
    { label: "Smartphones", href: "/products/electronics/smartphones" },
  ];

  return (
    <nav className="flex items-center space-x-2 text-sm">
      {breadcrumbs.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          {index > 0 && (
            <Separator orientation="vertical" className="h-4" />
          )}
          <a 
            href={item.href}
            className={`hover:underline ${
              index === breadcrumbs.length - 1 
                ? 'text-foreground font-medium' 
                : 'text-muted-foreground'
            }`}
          >
            {item.label}
          </a>
        </div>
      ))}
    </nav>
  );
}

export function CardSectionsExample() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Team Meeting</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4" />
            March 15, 2024 at 2:00 PM
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            Conference Room A
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="mr-2 h-4 w-4" />
            8 attendees
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h4 className="text-sm font-medium mb-2">Agenda</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Project status update</li>
            <li>• Q2 planning discussion</li>
            <li>• Resource allocation</li>
          </ul>
        </div>
        
        <Separator />
        
        <div>
          <h4 className="text-sm font-medium mb-2">Tags</h4>
          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary">Planning</Badge>
            <Badge variant="secondary">Team</Badge>
            <Badge variant="secondary">Q2</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ToolbarExample() {
  return (
    <div className="flex items-center space-x-1 p-2 border rounded-lg bg-background">
      {/* File operations */}
      <Button variant="ghost" size="sm" aria-label="Save">
        <Save className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" aria-label="Undo">
        <Undo className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" aria-label="Redo">
        <Redo className="h-4 w-4" />
      </Button>
      
      <Separator orientation="vertical" className="h-6" />
      
      {/* Text formatting */}
      <Button variant="ghost" size="sm" aria-label="Bold">
        <Bold className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" aria-label="Italic">
        <Italic className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" aria-label="Underline">
        <Underline className="h-4 w-4" />
      </Button>
      
      <Separator orientation="vertical" className="h-6" />
      
      {/* Alignment */}
      <Button variant="ghost" size="sm" aria-label="Align left">
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" aria-label="Align center">
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="sm" aria-label="Align right">
        <AlignRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function StatsDashboardExample() {
  const stats = [
    {
      label: "Total Revenue",
      value: "$45,231.89",
      change: "+20.1%",
      trend: "up"
    },
    {
      label: "Subscriptions",
      value: "2,350",
      change: "+180.1%",
      trend: "up"
    },
    {
      label: "Sales",
      value: "12,234",
      change: "+19%",
      trend: "up"
    },
    {
      label: "Active Users",
      value: "573",
      change: "-2%",
      trend: "down"
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-500" />;
      case "down":
        return <TrendingDown className="h-3 w-3 text-red-500" />;
      default:
        return <Minus className="h-3 w-3 text-gray-500" />;
    }
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 divide-x">
      {stats.map((stat, index) => (
        <div key={index} className="px-4 py-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
            <div className="flex items-center space-x-1">
              {getTrendIcon(stat.trend)}
              <span className={`text-xs ${
                stat.trend === "up" 
                  ? "text-green-600" 
                  : stat.trend === "down" 
                  ? "text-red-600" 
                  : "text-gray-600"
              }`}>
                {stat.change}
              </span>
              <span className="text-xs text-muted-foreground">
                from last month
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ContentSectionsExample() {
  return (
    <article className="max-w-2xl space-y-6">
      {/* Article header */}
      <header className="space-y-4">
        <div className="space-y-2">
          <Badge variant="secondary">Technology</Badge>
          <h1 className="text-3xl font-bold">
            Building Scalable React Applications
          </h1>
          <p className="text-lg text-muted-foreground">
            Learn best practices for creating maintainable and performant React apps
          </p>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="Author" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <span>John Doe</span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>Mar 15, 2024</span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>5 min read</span>
          </div>
        </div>
      </header>
      
      <Separator />
      
      {/* Article content */}
      <section className="prose prose-gray max-w-none">
        <p>
          React has become one of the most popular frontend frameworks, but building 
          scalable applications requires careful planning and adherence to best practices.
        </p>
        <p>
          In this article, we&apos;ll explore key strategies for creating React applications 
          that can grow with your team and user base while maintaining code quality 
          and performance.
        </p>
      </section>
      
      <Separator />
      
      {/* Tags and sharing */}
      <footer className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">React</Badge>
            <Badge variant="outline">JavaScript</Badge>
            <Badge variant="outline">Frontend</Badge>
            <Badge variant="outline">Performance</Badge>
          </div>
        </div>
        
        <Separator />
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Share this article
          </p>
          <div className="flex space-x-2">
            <button className="text-sm text-blue-600 hover:underline">
              Twitter
            </button>
            <Separator orientation="vertical" className="h-4" />
            <button className="text-sm text-blue-600 hover:underline">
              LinkedIn
            </button>
            <Separator orientation="vertical" className="h-4" />
            <button className="text-sm text-blue-600 hover:underline">
              Copy Link
            </button>
          </div>
        </div>
      </footer>
    </article>
  );
}