import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Documentation/Introduction",
  parameters: {
    docs: {
      page: () => {
        return (
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Welcome to Vera UI</h1>
            <p className="text-lg text-muted-foreground mb-6">
              A comprehensive React component library built with Radix UI
              primitives and styled with Tailwind CSS.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-2">✨ Features</h2>
                <ul className="space-y-1 text-sm">
                  <li>🎨 Beautiful, modern design system</li>
                  <li>♿ Accessibility-first approach</li>
                  <li>🌗 Dark mode ready</li>
                  <li>📱 Responsive design</li>
                  <li>🎯 TypeScript support</li>
                  <li>⚡ Performance optimized</li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-2">🏗️ Built With</h2>
                <ul className="space-y-1 text-sm">
                  <li>React 19</li>
                  <li>Radix UI</li>
                  <li>Tailwind CSS</li>
                  <li>TypeScript</li>
                  <li>Vite</li>
                  <li>Class Variance Authority</li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">🚀 Getting Started</h2>
              <p className="text-sm text-muted-foreground">
                Explore the components in the sidebar to see all available UI
                elements and their documentation.
              </p>
            </div>
          </div>
        );
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Introduction: Story = {};
