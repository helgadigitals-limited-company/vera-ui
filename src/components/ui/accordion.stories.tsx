import type { Meta, StoryObj } from "@storybook/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Layout/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A vertically stacked set of interactive headings that each reveal an associated section of content. Built with Radix UI Accordion primitives.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["single", "multiple"],
      description:
        "Determines whether one or multiple items can be opened at the same time",
    },
    collapsible: {
      control: { type: "boolean" },
      description:
        "When type is 'single', allows closing content when clicking trigger for an open item",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS classes to apply",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    type: "single",
    collapsible: false,
  },
  render: (args) => (
    <Accordion {...args} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern and is fully accessible
          via keyboard navigation.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components'
          aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const SingleCollapsible: Story = {
  args: {
    type: "single",
    collapsible: true,
  },
  render: (args) => (
    <Accordion {...args} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is React?</AccordionTrigger>
        <AccordionContent>
          React is a JavaScript library for building user interfaces. It lets
          you compose complex UIs from small and isolated pieces of code called
          "components".
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What is TypeScript?</AccordionTrigger>
        <AccordionContent>
          TypeScript is a strongly typed programming language that builds on
          JavaScript, giving you better tooling at any scale.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What is Tailwind CSS?</AccordionTrigger>
        <AccordionContent>
          Tailwind CSS is a utility-first CSS framework packed with classes like
          flex, pt-4, text-center and rotate-90 that can be composed to build
          any design, directly in your markup.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Single accordion with collapsible behavior - clicking an open item will close it.",
      },
    },
  },
};

export const Multiple: Story = {
  args: {
    type: "multiple",
  },
  render: (args) => (
    <Accordion {...args} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Getting Started</AccordionTrigger>
        <AccordionContent>
          Welcome to our comprehensive guide! Here you'll find everything you
          need to know to get started with our platform. From basic setup to
          advanced configuration options.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Advanced Features</AccordionTrigger>
        <AccordionContent>
          Explore powerful features that can help streamline your workflow.
          These include automated processes, custom integrations, and advanced
          analytics tools.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>API Documentation</AccordionTrigger>
        <AccordionContent>
          Complete API reference with examples, authentication methods, rate
          limits, and best practices for integration with your applications.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Troubleshooting</AccordionTrigger>
        <AccordionContent>
          Common issues and their solutions. If you can't find what you're
          looking for here, please don't hesitate to contact our support team.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Multiple accordion allows several items to be open simultaneously.",
      },
    },
  },
};

export const LongContent: Story = {
  args: {
    type: "single",
    collapsible: true,
  },
  render: (args) => (
    <Accordion {...args} className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Privacy Policy</AccordionTrigger>
        <AccordionContent className="space-y-4">
          <p>
            This Privacy Policy describes how we collect, use, and handle your
            information when you use our services.
          </p>
          <h4 className="font-semibold">Information We Collect</h4>
          <p>
            We collect information you provide directly to us, such as when you
            create an account, use our services, or contact us for support.
          </p>
          <h4 className="font-semibold">How We Use Your Information</h4>
          <p>
            We use the information we collect to provide, maintain, and improve
            our services, process transactions, and communicate with you.
          </p>
          <h4 className="font-semibold">Information Sharing</h4>
          <p>
            We do not sell, trade, or otherwise transfer your personal
            information to third parties without your consent, except as
            described in this policy.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Terms of Service</AccordionTrigger>
        <AccordionContent>
          By using our services, you agree to these terms. Please read them
          carefully as they contain important information about your legal
          rights, remedies, and obligations.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Accordion with longer content that demonstrates scrolling and content organization.",
      },
    },
  },
};
