"use client";

import { Badge } from "@helgadigitals/vera-ui";
import {
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock,
  Bell,
  Mail,
  ShoppingCart,
  Star,
  X,
} from "lucide-react";
import { useState } from "react";

export function BasicBadgeExample() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}

export function StatusBadgeExample() {
  const statuses = [
    { label: "Active", variant: "default" as const },
    { label: "Pending", variant: "secondary" as const },
    { label: "Inactive", variant: "outline" as const },
    { label: "Error", variant: "destructive" as const },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">User Status</h4>
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <Badge key={status.label} variant={status.variant}>
              {status.label}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Order Status</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Draft</Badge>
          <Badge variant="secondary">Processing</Badge>
          <Badge variant="default">Shipped</Badge>
          <Badge variant="outline">Delivered</Badge>
        </div>
      </div>
    </div>
  );
}

export function BadgeWithIconExample() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">
        <CheckCircle />
        Completed
      </Badge>
      <Badge variant="secondary">
        <Clock />
        Pending
      </Badge>
      <Badge variant="destructive">
        <XCircle />
        Failed
      </Badge>
      <Badge variant="outline">
        <AlertCircle />
        Warning
      </Badge>
    </div>
  );
}

export function CountBadgeExample() {
  return (
    <div className="flex flex-wrap gap-6">
      <div className="relative">
        <Bell className="h-6 w-6" />
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
        >
          3
        </Badge>
      </div>

      <div className="relative">
        <Mail className="h-6 w-6" />
        <Badge
          variant="default"
          className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
        >
          12
        </Badge>
      </div>

      <div className="relative">
        <ShoppingCart className="h-6 w-6" />
        <Badge
          variant="secondary"
          className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
        >
          5
        </Badge>
      </div>

      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <Badge variant="outline">4.8</Badge>
      </div>
    </div>
  );
}

export function CustomBadgeExample() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Priority Levels</h4>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            High Priority
          </Badge>
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            Medium Priority
          </Badge>
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Low Priority
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Department Tags</h4>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-blue-100 text-blue-800">Engineering</Badge>
          <Badge className="bg-purple-100 text-purple-800">Design</Badge>
          <Badge className="bg-pink-100 text-pink-800">Marketing</Badge>
          <Badge className="bg-orange-100 text-orange-800">Sales</Badge>
        </div>
      </div>
    </div>
  );
}

export function InteractiveBadgeExample() {
  const [tags, setTags] = useState([
    "React",
    "TypeScript",
    "Tailwind",
    "Next.js",
  ]);

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Removable Tags</h4>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1">
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="ml-1 hover:bg-black/10 rounded-full p-0.5"
                aria-label={`Remove ${tag} tag`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Clickable Categories</h4>
        <div className="flex flex-wrap gap-2">
          <Badge asChild>
            <button className="cursor-pointer hover:opacity-80">
              Frontend
            </button>
          </Badge>
          <Badge asChild variant="secondary">
            <button className="cursor-pointer hover:opacity-80">Backend</button>
          </Badge>
          <Badge asChild variant="outline">
            <button className="cursor-pointer hover:opacity-80">DevOps</button>
          </Badge>
        </div>
      </div>
    </div>
  );
}
