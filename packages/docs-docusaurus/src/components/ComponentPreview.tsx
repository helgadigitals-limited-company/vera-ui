import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

interface ComponentPreviewProps {
  children: React.ReactNode;
  code?: string;
  source?: string;
  extractedCode?: {
    imports: string;
    function: string;
    full: string;
  };
  title?: string;
}

/**
 * ComponentPreview - Docusaurus-compatible component preview with code display
 * Replaces Fumadocs' AutoExtractPreview
 */
export function ComponentPreview({
  children,
  code,
  extractedCode,
  title = 'Example',
}: ComponentPreviewProps) {
  // Determine code to display
  const codeToDisplay = extractedCode?.full || code || '';
  const hasCode = Boolean(codeToDisplay);

  if (!hasCode) {
    // If no code provided, just show the preview
    return (
      <div className="component-preview">
        <div className="preview-container">{children}</div>
      </div>
    );
  }

  return (
    <div className="component-preview">
      <Tabs groupId="preview-tabs" defaultValue="preview" children={false}>
        <TabItem value="preview" label="Preview" children={''}>
          <div className="preview-container">{children}</div>
        </TabItem>
        <TabItem value="code" label="Code" children={''}>
          <CodeBlock language="tsx" children={''}>{codeToDisplay}</CodeBlock>
        </TabItem>
      </Tabs>
    </div>
  );
}

/**
 * AutoExtractPreview - Wrapper for compatibility with Fumadocs imports
 * Maps to ComponentPreview with extracted code support
 */
export function AutoExtractPreview({
  children,
  source,
  functionName,
  code,
}: {
  children: React.ReactNode;
  source?: string;
  functionName?: string;
  code?: string;
}) {
  // TODO: Implement build-time code extraction similar to Fumadocs
  // For now, require manual code prop
  return (
    <ComponentPreview code={code} children={children} />
  );
}
