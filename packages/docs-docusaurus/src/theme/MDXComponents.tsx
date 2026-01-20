import React from 'react';
// Import the default MDXComponents from Docusaurus
import MDXComponents from '@theme-original/MDXComponents';
// Import our custom components
import { ComponentPreview, AutoExtractPreview } from '@site/src/components/ComponentPreview';
import { Callout, TypeTable, Steps, Step, Cards, Card } from '@site/src/components/MDXComponents';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Add custom components for Fumadocs compatibility
  ComponentPreview,
  AutoExtractPreview,
  Callout,
  TypeTable,
  Steps,
  Step,
  Cards,
  Card,
  // Make Tabs/TabItem available without import
  Tabs,
  TabItem,
  Tab: TabItem, // Alias for compatibility
};
