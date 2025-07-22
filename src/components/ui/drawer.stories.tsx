import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Settings, User, Bell, LogOut } from "lucide-react";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "./drawer";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";

const meta = {
  title: "UI/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A drawer component built on top of Vaul that slides out from the edges of the screen.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["top", "bottom", "left", "right"],
      description: "The direction from which the drawer slides in",
    },
    shouldScaleBackground: {
      control: "boolean",
      description:
        "Whether the background should scale when the drawer is open",
    },
    modal: {
      control: "boolean",
      description: "Whether the drawer is modal",
    },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>
            This is a drawer component. You can put any content inside it.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p className="text-sm text-muted-foreground">
            This is the main content area of the drawer. You can add forms,
            lists, or any other content here.
          </p>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  args: {
    direction: "bottom",
  },
};

export const FromTop: Story = {
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open from Top</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Notification Settings</DrawerTitle>
          <DrawerDescription>
            Manage your notification preferences
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Push Notifications</Label>
              <div className="text-sm text-muted-foreground">
                Receive notifications on your device
              </div>
            </div>
            <Button size="sm" variant="outline">
              Toggle
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Email Notifications</Label>
              <div className="text-sm text-muted-foreground">
                Receive notifications via email
              </div>
            </div>
            <Button size="sm" variant="outline">
              Toggle
            </Button>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  args: {
    direction: "top",
  },
};

export const FromLeft: Story = {
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Navigation</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Navigation Menu</DrawerTitle>
          <DrawerDescription>Quick access to main sections</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-2">
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
          <Button variant="ghost" className="w-full justify-start text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  ),
  args: {
    direction: "left",
  },
};

export const FromRight: Story = {
  render: (args) => (
    <Drawer {...args}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Settings</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Quick Settings</DrawerTitle>
          <DrawerDescription>Adjust your preferences</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" placeholder="Enter your username" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Input id="bio" placeholder="Tell us about yourself" />
          </div>
        </div>
        <DrawerFooter>
          <Button>Save Changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
  args: {
    direction: "right",
  },
};

export const WithForm: Story = {
  render: (args) => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Form submitted:", formData);
    };

    return (
      <Drawer {...args}>
        <DrawerTrigger asChild>
          <Button>Contact Us</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Contact Form</DrawerTitle>
            <DrawerDescription>
              Send us a message and we'll get back to you.
            </DrawerDescription>
          </DrawerHeader>
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Your name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Input
                id="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                placeholder="Your message..."
                required
              />
            </div>
          </form>
          <DrawerFooter>
            <Button type="submit" onClick={handleSubmit}>
              Send Message
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  },
  args: {
    direction: "bottom",
    shouldScaleBackground: true,
  },
};

export const NonModal: Story = {
  render: (args) => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        This drawer is non-modal, so you can interact with the background
        content.
      </p>
      <Drawer {...args}>
        <DrawerTrigger asChild>
          <Button variant="secondary">Open Non-Modal Drawer</Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Non-Modal Drawer</DrawerTitle>
            <DrawerDescription>
              You can still interact with the content behind this drawer.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <p className="text-sm">
              Try clicking outside the drawer or on other elements on the page.
            </p>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button>Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  ),
  args: {
    modal: false,
    direction: "right",
  },
};
