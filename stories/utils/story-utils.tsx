import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentType } from "react";
import React from "react";

/**
 * Creates a standardized Meta configuration for Storybook stories
 */
export function createMeta<T extends ComponentType<unknown>>(
  component: T,
  title: string,
  options: {
    description?: string;
    layout?: "centered" | "fullscreen" | "padded";
    argTypes?: Record<string, unknown>;
    parameters?: Record<string, unknown>;
  } = {}
): Meta<T> {
  const {
    description,
    layout = "centered",
    argTypes = {},
    parameters = {},
  } = options;

  return {
    title,
    component,
    parameters: {
      layout,
      docs: {
        description: {
          component: description,
        },
      },
      ...parameters,
    },
    tags: ["autodocs"],
    argTypes: {
      className: {
        control: { type: "text" },
        description: "Additional CSS classes to apply",
        table: {
          type: { summary: "string" },
        },
      },
      ...argTypes,
    },
  } as Meta<T>;
}

/**
 * Creates argTypes for common variant patterns
 */
export function createVariantArgTypes<
  T extends Record<string, string[] | Record<string, unknown>>
>(variants: T, descriptions: Partial<Record<keyof T, string>> = {}) {
  return Object.entries(variants).reduce((acc, [key, options]) => {
    acc[key] = {
      control: { type: "select" },
      options: Array.isArray(options) ? options : Object.keys(options),
      description: descriptions[key] || `The ${key} variant`,
    };
    return acc;
  }, {} as Record<string, unknown>);
}

/**
 * Creates argTypes for boolean props
 */
export function createBooleanArgTypes(
  props: string[],
  descriptions: Record<string, string> = {}
) {
  return props.reduce((acc, prop) => {
    acc[prop] = {
      control: { type: "boolean" },
      description: descriptions[prop] || `Enable ${prop}`,
    };
    return acc;
  }, {} as Record<string, unknown>);
}

/**
 * Creates a playground story that allows full control over props
 */
export function createPlaygroundStory<T>(
  defaultArgs: Partial<T> = {}
): StoryObj<Meta<ComponentType<T>>> {
  return {
    name: "Playground",
    args: defaultArgs,
    parameters: {
      docs: {
        description: {
          story: "Experiment with all the props and see live changes.",
        },
      },
    },
  };
}

/**
 * Creates stories showing all variants of a component
 */
export function createVariantStories<T extends ComponentType<unknown>>(
  Component: T,
  variants: Record<string, string[]>,
  baseProps: Record<string, unknown> = {}
) {
  const stories: Record<string, StoryObj<Meta<T>>> = {};

  Object.entries(variants).forEach(([variantName, options]) => {
    if (Array.isArray(options)) {
      stories[
        `All${variantName.charAt(0).toUpperCase() + variantName.slice(1)}`
      ] = {
        name: `All ${variantName}`,
        render: () => {
          return React.createElement(
            "div",
            { className: "flex gap-4 flex-wrap items-center" },
            options.map((option: string) =>
              React.createElement(
                Component,
                {
                  key: option,
                  [variantName]: option,
                  ...baseProps,
                },
                `${variantName}: ${option}`
              )
            )
          );
        },
        parameters: {
          docs: {
            description: {
              story: `All available ${variantName} options for the component.`,
            },
          },
        },
      };
    }
  });

  return stories;
}

/**
 * Creates stories showing different component states
 */
export function createStateStories<T extends ComponentType<unknown>>(
  Component: T,
  states: Record<string, Record<string, unknown>>,
  baseProps: Record<string, unknown> = {}
) {
  const stories: Record<string, StoryObj<Meta<T>>> = {};

  Object.entries(states).forEach(([stateName, stateProps]) => {
    stories[stateName] = {
      name: stateName.charAt(0).toUpperCase() + stateName.slice(1),
      args: {
        ...baseProps,
        ...stateProps,
      },
      parameters: {
        docs: {
          description: {
            story: `Component in ${stateName} state.`,
          },
        },
      },
    };
  });

  return stories;
}

/**
 * Common component categories for consistent organization
 */
export const COMPONENT_CATEGORIES = {
  FORMS: "Components/Forms",
  NAVIGATION: "Components/Navigation",
  FEEDBACK: "Components/Feedback",
  DATA_DISPLAY: "Components/Data Display",
  LAYOUT: "Components/Layout",
  OVERLAYS: "Components/Overlays",
  INPUTS: "Components/Inputs",
} as const;

/**
 * Common layouts for different component types
 */
export const LAYOUTS = {
  CENTERED: "centered",
  FULLSCREEN: "fullscreen",
  PADDED: "padded",
} as const;

/**
 * Common parameters for different story types
 */
export const STORY_PARAMETERS = {
  NO_CONTROLS: {
    controls: { hideNoControlsWarning: true, include: [] },
  },
  MINIMAL_VIEWPORT: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  DARK_BACKGROUND: {
    backgrounds: {
      default: "dark",
    },
  },
} as const;
