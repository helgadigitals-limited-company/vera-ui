import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./toggle";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
} from "lucide-react";
import { useState } from "react";

const meta: Meta<typeof Toggle> = {
  title: "Components/Forms/Toggle",
  component: Toggle,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A two-state button that can be either on or off. Built with Radix UI Toggle primitives.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "outline"],
      description: "The visual style variant of the toggle",
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg"],
      description: "The size of the toggle",
    },
    pressed: {
      control: { type: "boolean" },
      description: "The controlled pressed state of the toggle",
    },
    defaultPressed: {
      control: { type: "boolean" },
      description: "The default pressed state when initially rendered",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the toggle is disabled",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes to apply",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    children: "Toggle",
  },
};

export const Pressed: Story = {
  args: {
    defaultPressed: true,
    children: "Pressed",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};

export const DisabledPressed: Story = {
  args: {
    disabled: true,
    defaultPressed: true,
    children: "Disabled Pressed",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Toggle variant="default">Default</Toggle>
      <Toggle variant="outline">Outline</Toggle>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different visual variants of the toggle component.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Toggle size="sm">Small</Toggle>
      <Toggle size="default">Default</Toggle>
      <Toggle size="lg">Large</Toggle>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different sizes of toggle buttons.",
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-2">
      <Toggle>
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle>
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle>
        <Underline className="h-4 w-4" />
      </Toggle>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Toggle buttons with icons for text formatting.",
      },
    },
  },
};

export const TextFormatting: Story = {
  render: () => {
    const [bold, setBold] = useState(false);
    const [italic, setItalic] = useState(false);
    const [underline, setUnderline] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex gap-1">
          <Toggle
            pressed={bold}
            onPressedChange={setBold}
            aria-label="Bold"
            size="sm"
          >
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle
            pressed={italic}
            onPressedChange={setItalic}
            aria-label="Italic"
            size="sm"
          >
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle
            pressed={underline}
            onPressedChange={setUnderline}
            aria-label="Underline"
            size="sm"
          >
            <Underline className="h-4 w-4" />
          </Toggle>
        </div>
        <div className="p-4 border rounded-md min-h-[100px] bg-background">
          <p
            className={`${bold ? "font-bold" : ""} ${italic ? "italic" : ""} ${
              underline ? "underline" : ""
            }`}
          >
            This text reflects the current formatting state. Try toggling the
            buttons above!
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive text formatting toolbar with live preview.",
      },
    },
  },
};

export const TextAlignment: Story = {
  render: () => {
    const [alignment, setAlignment] = useState<"left" | "center" | "right">(
      "left"
    );

    return (
      <div className="space-y-4">
        <div className="flex gap-1">
          <Toggle
            pressed={alignment === "left"}
            onPressedChange={(pressed) => pressed && setAlignment("left")}
            aria-label="Align left"
            size="sm"
          >
            <AlignLeft className="h-4 w-4" />
          </Toggle>
          <Toggle
            pressed={alignment === "center"}
            onPressedChange={(pressed) => pressed && setAlignment("center")}
            aria-label="Align center"
            size="sm"
          >
            <AlignCenter className="h-4 w-4" />
          </Toggle>
          <Toggle
            pressed={alignment === "right"}
            onPressedChange={(pressed) => pressed && setAlignment("right")}
            aria-label="Align right"
            size="sm"
          >
            <AlignRight className="h-4 w-4" />
          </Toggle>
        </div>
        <div className="p-4 border rounded-md bg-background">
          <p className={`text-${alignment}`}>
            This paragraph alignment changes based on the selected toggle button
            above.
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Text alignment controls with mutually exclusive toggles.",
      },
    },
  },
};

export const ListToggle: Story = {
  render: () => {
    const [listType, setListType] = useState<"none" | "bullet" | "numbered">(
      "none"
    );

    return (
      <div className="space-y-4">
        <div className="flex gap-1">
          <Toggle
            pressed={listType === "bullet"}
            onPressedChange={(pressed) =>
              setListType(pressed ? "bullet" : "none")
            }
            aria-label="Bullet list"
            size="sm"
          >
            <List className="h-4 w-4" />
          </Toggle>
          <Toggle
            pressed={listType === "numbered"}
            onPressedChange={(pressed) =>
              setListType(pressed ? "numbered" : "none")
            }
            aria-label="Numbered list"
            size="sm"
          >
            <ListOrdered className="h-4 w-4" />
          </Toggle>
        </div>
        <div className="p-4 border rounded-md bg-background">
          {listType === "bullet" && (
            <ul className="list-disc list-inside space-y-1">
              <li>First item</li>
              <li>Second item</li>
              <li>Third item</li>
            </ul>
          )}
          {listType === "numbered" && (
            <ol className="list-decimal list-inside space-y-1">
              <li>First item</li>
              <li>Second item</li>
              <li>Third item</li>
            </ol>
          )}
          {listType === "none" && (
            <p className="text-muted-foreground">
              Select a list type above to see the preview.
            </p>
          )}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "List formatting controls with preview.",
      },
    },
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Default Variant</h3>
        <div className="flex gap-2">
          <Toggle>Normal</Toggle>
          <Toggle defaultPressed>Pressed</Toggle>
          <Toggle disabled>Disabled</Toggle>
          <Toggle disabled defaultPressed>
            Disabled Pressed
          </Toggle>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Outline Variant</h3>
        <div className="flex gap-2">
          <Toggle variant="outline">Normal</Toggle>
          <Toggle variant="outline" defaultPressed>
            Pressed
          </Toggle>
          <Toggle variant="outline" disabled>
            Disabled
          </Toggle>
          <Toggle variant="outline" disabled defaultPressed>
            Disabled Pressed
          </Toggle>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Overview of all toggle states and variants.",
      },
    },
  },
};

export const CustomStyling: Story = {
  render: () => (
    <div className="flex gap-2">
      <Toggle className="data-[state=on]:bg-green-500 data-[state=on]:text-white">
        Success
      </Toggle>
      <Toggle className="data-[state=on]:bg-red-500 data-[state=on]:text-white">
        Danger
      </Toggle>
      <Toggle className="data-[state=on]:bg-purple-500 data-[state=on]:text-white">
        Purple
      </Toggle>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Toggle buttons with custom colors when pressed.",
      },
    },
  },
};
