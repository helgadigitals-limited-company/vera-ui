import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Menu, Settings, User, Bell, Filter, Search } from "lucide-react";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "./sheet";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Switch } from "./switch";

const meta = {
  title: "UI/Sheet",
  component: Sheet,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A sheet component that slides out from the edge of the screen, built on top of Radix UI Dialog.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    modal: {
      control: "boolean",
      description: "Whether the sheet is modal",
    },
  },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>
            This is a sheet component. You can put any content inside it.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            This is the main content area of the sheet. You can add forms,
            lists, or any other content here.
          </p>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const FromLeft: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Menu className="mr-2 h-4 w-4" />
          Open Menu
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation Menu</SheetTitle>
          <SheetDescription>
            Navigate to different sections of the app
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const FromTop: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Search</SheetTitle>
          <SheetDescription>
            Search for anything across the application
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="search">Search query</Label>
            <Input
              id="search"
              placeholder="Type your search query..."
              className="w-full"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="case-sensitive" />
            <Label htmlFor="case-sensitive">Case sensitive</Label>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button>Search</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const FromBottom: Story = {
  render: (args) => (
    <Sheet {...args}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Filter Options</SheetTitle>
          <SheetDescription>
            Customize your view with these filter options
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <select id="category" className="w-full p-2 border rounded">
              <option>All Categories</option>
              <option>Technology</option>
              <option>Design</option>
              <option>Business</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date Range</Label>
            <select id="date" className="w-full p-2 border rounded">
              <option>All Time</option>
              <option>Last Week</option>
              <option>Last Month</option>
              <option>Last Year</option>
            </select>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Reset</Button>
          </SheetClose>
          <Button>Apply Filters</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const WithForm: Story = {
  render: (args) => {
    const [profile, setProfile] = useState({
      name: "",
      email: "",
      bio: "",
      notifications: true,
      marketing: false,
    });

    const handleSubmit = () => {
      console.log("Profile saved:", profile);
    };

    return (
      <Sheet {...args}>
        <SheetTrigger asChild>
          <Button>Edit Profile</Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>Edit Profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="your@email.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                value={profile.bio}
                onChange={(e) =>
                  setProfile((prev) => ({ ...prev, bio: e.target.value }))
                }
                placeholder="Tell us about yourself"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Notifications</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive emails about your account activity.
                  </div>
                </div>
                <Switch
                  checked={profile.notifications}
                  onCheckedChange={(checked) =>
                    setProfile((prev) => ({ ...prev, notifications: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Marketing Emails</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive emails about new products and features.
                  </div>
                </div>
                <Switch
                  checked={profile.marketing}
                  onCheckedChange={(checked) =>
                    setProfile((prev) => ({ ...prev, marketing: checked }))
                  }
                />
              </div>
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <Button onClick={handleSubmit}>Save changes</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  },
};

export const NonModal: Story = {
  render: (args) => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground max-w-sm">
        This sheet is non-modal, so you can interact with the background content
        while it's open.
      </p>
      <Sheet {...args}>
        <SheetTrigger asChild>
          <Button variant="secondary">Open Non-Modal Sheet</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Non-Modal Sheet</SheetTitle>
            <SheetDescription>
              You can still interact with content behind this sheet.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <p className="text-sm">
              Try clicking outside the sheet or interacting with other elements
              on the page.
            </p>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button>Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  ),
  args: {
    modal: false,
  },
};
