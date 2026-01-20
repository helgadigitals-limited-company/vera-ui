"use client";

import { MenuBar } from "@helgadigitals/vera-ui";
import {
  Users,
  Settings,
  FileText,
  Package,
  Info,
  Mail,
  Image,
  Video,
  Star,
  Zap,
  BookOpen,
  Lightbulb,
  MessageCircle,
  Palette,
  Camera,
  Headphones,
  Globe,
  Phone,
} from "lucide-react";

export function BasicMenuBarExample() {
  const basicItems = [
    {
      trigger: "Home",
      type: "link" as const,
      href: "/",
    },
    {
      trigger: "Products",
      type: "dropdown" as const,
      items: [
        { title: "All Products", href: "#" },
        { title: "Featured", href: "#" },
        { title: "New Arrivals", href: "#" },
      ],
    },
    {
      trigger: "About",
      type: "link" as const,
      href: "#",
    },
    {
      trigger: "Contact",
      type: "link" as const,
      href: "#",
    },
  ];

  return (
    <div className="relative overflow-visible z-10">
      <div className="flex justify-center mb-80 overflow-visible">
        <MenuBar items={basicItems} />
      </div>
    </div>
  );
}

export function DropdownMenuBarExample() {
  const dropdownItems = [
    {
      trigger: "Services",
      type: "dropdown" as const,
      items: [
        {
          title: "Web Development",
          href: "#",
          description: "Custom web applications and websites",
          icon: <Package className="h-4 w-10" />,
        },
        {
          title: "Consulting",
          href: "#",
          description: "Technical consulting and strategy",
          icon: <Info className="h-4 w-4" />,
        },
        {
          title: "Support",
          href: "#",
          description: "24/7 customer support",
          icon: <Mail className="h-4 w-4" />,
        },
      ],
    },
    {
      trigger: "Company",
      type: "dropdown" as const,
      items: [
        {
          title: "About Us",
          href: "#",
          description: "Learn about our mission and team",
          icon: <Users className="h-4 w-4" />,
        },
        {
          title: "Careers",
          href: "#",
          description: "Join our growing team",
          icon: <Star className="h-4 w-4" />,
        },
        {
          title: "Contact",
          href: "#",
          description: "Get in touch with us",
          icon: <Phone className="h-4 w-4" />,
        },
      ],
    },
  ];

  return (
    <div className="relative overflow-visible z-10 w-auto">
      <div className="flex justify-center mb-80 overflow-visible">
        <MenuBar items={dropdownItems} />
      </div>
    </div>
  );
}

export function GridMenuBarExample() {
  const gridItems = [
    {
      trigger: "Resources",
      type: "grid" as const,
      items: [
        {
          title: "Documentation",
          href: "/docs",
          description: "Complete API documentation and guides",
        },
        {
          title: "Templates",
          href: "#",
          description: "Ready-to-use component templates",
        },
        {
          title: "Examples",
          href: "#",
          description: "Live examples and code samples",
        },
        {
          title: "Community",
          href: "#",
          description: "Join our developer community",
        },
      ],
      gridClassName: "md:grid-cols-2 lg:grid-cols-2",
    },
    {
      trigger: "Tools",
      type: "grid" as const,
      items: [
        {
          title: "Design System",
          href: "#",
          description: "Complete design tokens and guidelines",
        },
        {
          title: "Icon Library",
          href: "#",
          description: "Thousands of beautiful icons",
        },
        {
          title: "Color Palette",
          href: "#",
          description: "Curated color combinations",
        },
        {
          title: "Typography",
          href: "#",
          description: "Font combinations and styles",
        },
      ],
      gridClassName: "md:grid-cols-2",
    },
  ];

  return (
    <div className="relative overflow-visible z-10">
      <div className="flex justify-center mb-80 overflow-visible">
        <MenuBar items={gridItems} />
      </div>
    </div>
  );
}

export function FeaturedMenuBarExample() {
  const featuredItems = [
    {
      trigger: "Solutions",
      type: "featured" as const,
      featured: {
        href: "#",
        title: "Enterprise Solutions",
        description:
          "Scalable solutions for large organizations with advanced security and support.",
        className: "bg-gradient-to-br from-blue-500 to-purple-600 text-white",
      },
      items: [
        {
          title: "Startup Plan",
          href: "#",
          description: "Perfect for growing startups",
        },
        {
          title: "Business Plan",
          href: "#",
          description: "Advanced features for businesses",
        },
        {
          title: "Developer Tools",
          href: "#",
          description: "APIs and integrations for developers",
        },
      ],
    },
    {
      trigger: "Products",
      type: "featured" as const,
      featured: {
        href: "#",
        title: "Premium Suite",
        description:
          "Our flagship product with all premium features and priority support.",
        className: "bg-gradient-to-br from-orange-400 to-red-500 text-white",
      },
      items: [
        {
          title: "Basic Plan",
          href: "#",
          description: "Essential features for individuals",
        },
        {
          title: "Pro Plan",
          href: "#",
          description: "Advanced features for professionals",
        },
        {
          title: "Team Plan",
          href: "#",
          description: "Collaboration tools for teams",
        },
      ],
    },
  ];

  return (
    <div className="relative overflow-visible z-10">
      <div className="flex justify-center mb-80 overflow-visible">
        <MenuBar items={featuredItems} />
      </div>
    </div>
  );
}

export function CompleteNavigationExample() {
  const completeMenuItems = [
    {
      trigger: "Home",
      type: "link" as const,
      href: "/docs",
    },
    {
      trigger: "Products",
      type: "featured" as const,
      featured: {
        href: "#",
        title: "Featured Products",
        description:
          "Discover our most popular and highly-rated products this month.",
        className: "bg-gradient-to-br from-green-400 to-blue-500 text-white",
      },
      items: [
        {
          title: "All Products",
          href: "#",
          description: "Browse our complete catalog",
        },
        {
          title: "Categories",
          href: "#",
          description: "Shop by category",
        },
        {
          title: "Sale Items",
          href: "#",
          description: "Special offers and discounts",
        },
      ],
    },
    {
      trigger: "Resources",
      type: "grid" as const,
      items: [
        {
          title: "Documentation",
          href: "/docs",
          description: "API docs and guides",
        },
        {
          title: "Tutorials",
          href: "#",
          description: "Step-by-step tutorials",
        },
        {
          title: "Examples",
          href: "#",
          description: "Code examples",
        },
        {
          title: "Community",
          href: "#",
          description: "Developer community",
        },
      ],
      gridClassName: "md:grid-cols-2",
    },
    {
      trigger: "Company",
      type: "dropdown" as const,
      items: [
        {
          title: "About Us",
          href: "#",
          description: "Learn about our mission and team",
          icon: <Users className="h-4 w-4" />,
        },
        {
          title: "Careers",
          href: "#",
          description: "Join our growing team",
          icon: <Star className="h-4 w-4" />,
        },
        {
          title: "Contact",
          href: "#",
          description: "Get in touch with us",
          icon: <FileText className="h-4 w-4" />,
        },
      ],
    },
  ];

  return (
    <div className="relative overflow-visible z-10">
      <header className="border-b bg-white dark:bg-gray-950">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between mb-80 overflow-visible">
            <div className="flex items-center space-x-4 overflow-visible">
              <div className="h-8 w-8 rounded bg-gradient-to-br from-blue-500 to-purple-600"></div>
              <span className="text-xl font-bold">Brand Name</span>
            </div>
            <MenuBar items={completeMenuItems} viewport={true} />
            <div className="flex items-center space-x-4">
              <button 
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Settings"
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to Our Platform</h1>
        <p className="text-muted-foreground">
          This is a complete navigation example with all menu types integrated
          into a header layout.
        </p>
      </main>
    </div>
  );
}

export function MegaMenuExample() {
  const megaMenuItems = [
    {
      trigger: "Design",
      type: "grid" as const,
      items: [
        {
          title: "UI Components",
          href: "#",
          description: "Pre-built interface components",
        },
        {
          title: "Design Tokens",
          href: "#",
          description: "Colors, typography, spacing",
        },
        {
          title: "Icons",
          href: "#",
          description: "Complete icon library",
        },
        {
          title: "Templates",
          href: "#",
          description: "Page and section templates",
        },
        {
          title: "Patterns",
          href: "#",
          description: "Common design patterns",
        },
        {
          title: "Guidelines",
          href: "#",
          description: "Design principles and best practices",
        },
      ],
      gridClassName: "md:grid-cols-3 lg:grid-cols-3",
    },
    {
      trigger: "Development",
      type: "grid" as const,
      items: [
        {
          title: "Getting Started",
          href: "#",
          description: "Quick setup and installation",
        },
        {
          title: "API Reference",
          href: "#",
          description: "Complete API documentation",
        },
        {
          title: "React Components",
          href: "#",
          description: "React component library",
        },
        {
          title: "Vue Components",
          href: "#",
          description: "Vue.js component library",
        },
        {
          title: "CSS Framework",
          href: "#",
          description: "Utility-first CSS framework",
        },
        {
          title: "Plugins",
          href: "#",
          description: "Extensions and integrations",
        },
      ],
      gridClassName: "md:grid-cols-3",
    },
  ];

  return (
    <div className="relative overflow-visible z-10">
      <div className="flex justify-center mb-80 overflow-visible">
        <MenuBar items={megaMenuItems} />
      </div>
    </div>
  );
}

export function IconMenuExample() {
  const iconMenuItems = [
    {
      trigger: "Media",
      type: "dropdown" as const,
      items: [
        {
          title: "Photos",
          href: "#",
          description: "Image gallery and management",
          icon: <Camera className="h-4 w-4" />,
        },
        {
          title: "Videos",
          href: "#",
          description: "Video content and streaming",
          icon: <Video className="h-4 w-4" />,
        },
        {
          title: "Audio",
          href: "#",
          description: "Music and audio files",
          icon: <Headphones className="h-4 w-4" />,
        },
        {
          title: "Graphics",
          href: "#",
          description: "Design assets and illustrations",
          icon: <Palette className="h-4 w-4" />,
        },
      ],
    },
    {
      trigger: "Learning",
      type: "dropdown" as const,
      items: [
        {
          title: "Courses",
          href: "#",
          description: "Online courses and tutorials",
          icon: <BookOpen className="h-4 w-4" />,
        },
        {
          title: "Workshops",
          href: "#",
          description: "Interactive workshops",
          icon: <Lightbulb className="h-4 w-4" />,
        },
        {
          title: "Webinars",
          href: "#",
          description: "Live and recorded sessions",
          icon: <Globe className="h-4 w-4" />,
        },
        {
          title: "Community",
          href: "#",
          description: "Discussion forums",
          icon: <MessageCircle className="h-4 w-4" />,
        },
      ],
    },
  ];

  return (
    <div className="relative overflow-visible z-10">
      <div className="flex justify-center mb-80 overflow-visible">
        <MenuBar items={iconMenuItems} />
      </div>
    </div>
  );
}

export function ResponsiveMenuBarExample() {
  const responsiveItems = [
    {
      trigger: "Dashboard",
      type: "link" as const,
      href: "#",
    },
    {
      trigger: "Quick Actions",
      type: "dropdown" as const,
      items: [
        {
          title: "Create Project",
          href: "#",
          description: "Start a new project",
          icon: <Zap className="h-4 w-4" />,
        },
        {
          title: "Upload Files",
          href: "#",
          description: "Upload media files",
          icon: <Image className="h-4 w-4" />,
        },
        {
          title: "Invite Team",
          href: "#",
          description: "Add team members",
          icon: <Users className="h-4 w-4" />,
        },
      ],
    },
    {
      trigger: "Workspace",
      type: "featured" as const,
      featured: {
        href: "#",
        title: "Premium Workspace",
        description: "Unlock advanced collaboration features and unlimited storage.",
        className: "bg-gradient-to-br from-purple-500 to-pink-600 text-white",
      },
      items: [
        {
          title: "Projects",
          href: "#",
          description: "Manage your projects",
        },
        {
          title: "Team",
          href: "#",
          description: "Collaborate with team members",
        },
        {
          title: "Settings",
          href: "#",
          description: "Configure workspace settings",
        },
      ],
    },
  ];

  return (
    <div className="relative overflow-visible z-10">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="flex items-center justify-between mb-4 overflow-visible">
          <h3 className="text-sm font-medium text-muted-foreground">
            Responsive Navigation
          </h3>
          <span className="text-xs text-muted-foreground">
            Try resizing your browser
          </span>
        </div>
        <div className="flex justify-center">
          <MenuBar items={responsiveItems} viewport={true} />
        </div>
      </div>
    </div>
  );
}