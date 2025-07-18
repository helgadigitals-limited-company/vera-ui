import type { Meta, ArgTypes } from '@storybook/react';
import type { ComponentType } from 'react';

/**
 * Creates a standardized Meta configuration for Storybook stories
 */
export function createMeta<T extends ComponentType<unknown>>(
  component: T,
  title: string,
  options: {
    description?: string;
    layout?: 'centered' | 'fullscreen' | 'padded';
    argTypes?: ArgTypes;
    parameters?: Record<string, unknown>;
  } = {}
): Meta<T> {
  const {
    description,
    layout = 'centered',
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
    tags: ['autodocs'],
    argTypes: {
      className: {
        control: { type: 'text' },
        description: 'Additional CSS classes to apply',
        table: {
          type: { summary: 'string' },
        },
      },
      ...argTypes,
    },
  } as Meta<T>;
}

/**
 * Creates argTypes for variant props with select controls
 */
export function createSelectArgType(
  options: string[],
  description?: string
) {
  return {
    control: { type: 'select' },
    options,
    description: description || 'Select an option',
  };
}

/**
 * Creates argTypes for boolean props
 */
export function createBooleanArgType(description?: string) {
  return {
    control: { type: 'boolean' },
    description: description || 'Toggle boolean value',
  };
}

/**
 * Common component categories for consistent organization
 */
export const COMPONENT_CATEGORIES = {
  FORMS: 'Components/Forms',
  NAVIGATION: 'Components/Navigation', 
  FEEDBACK: 'Components/Feedback',
  DATA_DISPLAY: 'Components/Data Display',
  LAYOUT: 'Components/Layout',
  OVERLAYS: 'Components/Overlays',
  INPUTS: 'Components/Inputs',
} as const;

/**
 * Common layouts for different component types
 */
export const LAYOUTS = {
  CENTERED: 'centered',
  FULLSCREEN: 'fullscreen',
  PADDED: 'padded',
} as const;/**
 * Common parameters for different story types
 */
export const STORY_PARAMETERS = {
  NO_CONTROLS: {
    controls: { hideNoControlsWarning: true, include: [] },
  },
  MINIMAL_VIEWPORT: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  DARK_BACKGROUND: {
    backgrounds: {
      default: 'dark',
    },
  },
} as const;
