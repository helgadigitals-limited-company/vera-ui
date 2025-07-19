import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./textarea";
import { Label } from "./label";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { useState } from "react";

const meta: Meta<typeof Textarea> = {
  title: "Components/Forms/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A multi-line text input control, useful for longer text entries like comments, descriptions, or messages.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text to display when empty",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the textarea is disabled",
    },
    rows: {
      control: { type: "number", min: 1, max: 20 },
      description: "Number of visible text lines",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes to apply",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: "Type your message here...",
  },
  render: (args) => (
    <div className="w-80">
      <Textarea {...args} />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" placeholder="Type your message here..." />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Textarea with an associated label for better accessibility.",
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label htmlFor="disabled-textarea" className="text-muted-foreground">
        Disabled Textarea
      </Label>
      <Textarea
        id="disabled-textarea"
        disabled
        placeholder="This textarea is disabled..."
        defaultValue="This content cannot be edited."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Disabled textarea that cannot be edited.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <div>
        <Label htmlFor="small-textarea" className="text-sm">
          Small (2 rows)
        </Label>
        <Textarea
          id="small-textarea"
          rows={2}
          placeholder="Small textarea..."
        />
      </div>
      <div>
        <Label htmlFor="default-textarea" className="text-sm">
          Default (3 rows)
        </Label>
        <Textarea id="default-textarea" placeholder="Default textarea..." />
      </div>
      <div>
        <Label htmlFor="large-textarea" className="text-sm">
          Large (6 rows)
        </Label>
        <Textarea
          id="large-textarea"
          rows={6}
          placeholder="Large textarea..."
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Textareas with different row counts to control height.",
      },
    },
  },
};

export const WithCharacterCount: Story = {
  render: () => {
    const [text, setText] = useState("");
    const maxLength = 500;

    return (
      <div className="w-80 space-y-2">
        <Label htmlFor="char-count-textarea">Description</Label>
        <Textarea
          id="char-count-textarea"
          placeholder="Enter your description..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={maxLength}
          rows={4}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Describe your project or idea</span>
          <span>
            {text.length}/{maxLength}
          </span>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Textarea with character count and maximum length limit.",
      },
    },
  },
};

export const CommentForm: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Leave a Comment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="comment">Your Comment</Label>
          <Textarea
            id="comment"
            placeholder="Share your thoughts..."
            rows={4}
          />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground">
            Comments are moderated and will be reviewed before posting.
          </p>
          <div className="space-x-2">
            <Button variant="outline" size="sm">
              Cancel
            </Button>
            <Button size="sm">Post Comment</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comment form using textarea within a card layout.",
      },
    },
  },
};

export const ContactForm: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Contact Us</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">First Name</Label>
            <input
              id="first-name"
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="John"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last Name</Label>
            <input
              id="last-name"
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Doe"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <input
            id="email"
            type="email"
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="john.doe@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" placeholder="How can we help you?" rows={5} />
        </div>
        <Button className="w-full">Send Message</Button>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: "Complete contact form with textarea for message input.",
      },
    },
  },
};

export const FeedbackForm: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Share Your Feedback</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="feedback-type">Feedback Type</Label>
          <select
            id="feedback-type"
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select feedback type</option>
            <option value="bug">Bug Report</option>
            <option value="feature">Feature Request</option>
            <option value="improvement">Improvement</option>
            <option value="general">General Feedback</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="feedback-details">Details</Label>
          <Textarea
            id="feedback-details"
            placeholder="Please provide as much detail as possible..."
            rows={5}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reproduction-steps">
            Steps to Reproduce (if applicable)
          </Label>
          <Textarea
            id="reproduction-steps"
            placeholder="1. Go to...&#10;2. Click on...&#10;3. See error..."
            rows={3}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline">Save Draft</Button>
          <Button>Submit Feedback</Button>
        </div>
      </CardContent>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Feedback form with multiple textareas for different types of input.",
      },
    },
  },
};

export const ResizableTextarea: Story = {
  render: () => (
    <div className="w-80 space-y-2">
      <Label htmlFor="resizable-textarea">Resizable Notes</Label>
      <Textarea
        id="resizable-textarea"
        placeholder="This textarea can be resized by dragging the corner..."
        rows={4}
        className="resize-both"
      />
      <p className="text-xs text-muted-foreground">
        Drag the corner to resize this textarea
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Textarea that can be manually resized by the user.",
      },
    },
  },
};
