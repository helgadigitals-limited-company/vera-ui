import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Getting Started sidebar
  tutorialSidebar: [
    'index',
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/installation',
      ],
    },
    {
      type: 'category',
      label: 'Examples',
      items: [
        'examples/index',
      ],
    },
    {
      type: 'category',
      label: 'Contributing',
      items: [
        'contributing/guidelines',
      ],
    },
  ],

  // Components sidebar with categories matching Fumadocs structure
  componentsSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'Overview',
    },
    {
      type: 'category',
      label: 'Forms',
      collapsed: false,
      items: [
        'components/forms/button',
        'components/forms/input',
        'components/forms/textarea',
        'components/forms/select',
        'components/forms/checkbox',
        'components/forms/radio-group',
        'components/forms/switch',
        'components/forms/label',
        'components/forms/form',
        'components/forms/combobox',
        'components/forms/input-otp',
        'components/forms/file-upload',
        'components/forms/multi-select',
      ],
    },
    {
      type: 'category',
      label: 'Data Display',
      collapsed: false,
      items: [
        'components/data-display/accordion',
        'components/data-display/alert',
        'components/data-display/avatar',
        'components/data-display/badge',
        'components/data-display/card',
        'components/data-display/collapsible',
        'components/data-display/data-table',
        'components/data-display/pagination',
        'components/data-display/progress',
        'components/data-display/separator',
        'components/data-display/skeleton',
        'components/data-display/table',
        'components/data-display/tabs-container',
        'components/data-display/toast',
      ],
    },
    {
      type: 'category',
      label: 'Navigation',
      collapsed: false,
      items: [
        'components/navigation/menu-bar',
        'components/navigation/navigation-components',
        'components/navigation/reusable-sidebar',
      ],
    },
    {
      type: 'category',
      label: 'Layout',
      collapsed: false,
      items: [
        'components/layout/sidebar-layout',
      ],
    },
    {
      type: 'category',
      label: 'Utilities',
      collapsed: false,
      items: [
        'components/utilities/theme-provider',
        'components/utilities/utils',
      ],
    },
  ],
};

export default sidebars;
