"use client";

import React from "react";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { getExtractedCode } from "@/lib/extracted-code-utils";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

interface ComponentPreviewProps {
  children: React.ReactNode;
  code?: string;
  source?: string; // Path to the source file relative to components directory
  lang?: string;
  // Which tab to show first (0 = preview, 1 = code)
  defaultIndex?: number;
  // Extract specific function from the source file
  extractFunction?: string;
  // Pre-extracted code (for build-time extraction)
  extractedCode?: {
    imports: string;
    function: string;
    full: string;
  };
}

export function ComponentPreview({
  children,
  code,
  source,
  extractFunction,
  extractedCode,
  lang = "tsx",
  defaultIndex = 0,
}: ComponentPreviewProps) {
  // Determine if we can show code tabs
  const hasExplicitCode = Boolean(code);
  const hasExtractedCode = Boolean(extractedCode);
  const hasSourceReference = Boolean(source && extractFunction);
  const canShowTabs = hasExplicitCode || hasExtractedCode || hasSourceReference;

  // Generate code to display
  let codeToDisplay = "";
  let sourceInfo: { path?: string; function?: string } = {};

  if (hasExplicitCode) {
    // Use explicitly provided code
    codeToDisplay = code!;
  } else if (hasExtractedCode) {
    // Use pre-extracted code (best option)
    codeToDisplay = extractedCode!.full;
    sourceInfo = { path: source, function: extractFunction };
  } else if (hasSourceReference) {
    // Show placeholder for runtime extraction
    sourceInfo = { path: source, function: extractFunction };
    codeToDisplay = `// Source: ${source}
// Function: ${extractFunction}

import { toast } from "@helgadigitals/vera-ui";
import { Button } from "@helgadigitals/vera-ui";

function ${extractFunction}() {
  // This function would be auto-extracted from the source file
  // To see the actual implementation, check: ${source}
  return (
    <div>
      {/* Component implementation */}
    </div>
  );
}`;
  }

  // If no code is provided, just show the preview
  if (!canShowTabs) {
    return (
      <div className="my-8 rounded-xl border border-border/50 bg-card shadow-sm overflow-visible relative">
        <div className="p-8">
          <div
            className="
              flex items-center justify-center min-h-[200px] 
              bg-gradient-to-br from-background to-muted/30 
              rounded-lg 
              relative overflow-visible z-10
            "
          >
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
            {/* The actual component preview — dropdowns, menus, etc. */}
            <div className="relative flex flex-wrap items-center justify-center gap-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Tabs items={["Preview", "Code"]} defaultIndex={defaultIndex}>
      <Tab value="Preview">
        <div className="p-8">
          <div
            className="
        flex items-center justify-center min-h-[200px] 
        bg-gradient-to-br from-background to-muted/30 
        rounded-lg 
        relative overflow-visible
      "
          >
            {/* Subtle background pattern — must not intercept pointer events */}
            <div
              className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"
              aria-hidden
            />

            {/* Put children on top so they receive clicks */}
            <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
              {children}
            </div>
          </div>
        </div>
      </Tab>

      <Tab value="Code">
        <div className="p-6">
          {sourceInfo.path && sourceInfo.function && (
            <div className="mb-4 p-3 bg-muted/50 rounded-lg border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                  {sourceInfo.path}
                </span>
                <span>→</span>
                <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                  {sourceInfo.function}()
                </span>
                {hasExtractedCode && (
                  <span className="ml-auto text-green-600 dark:text-green-400 text-xs">
                    ✓ Auto-extracted
                  </span>
                )}
              </div>
            </div>
          )}
          <DynamicCodeBlock lang={lang} code={codeToDisplay} />
        </div>
      </Tab>
    </Tabs>
  );
}

// Helper component for easier usage with auto-extraction
interface AutoExtractPreviewProps {
  children: React.ReactNode;
  source: string;
  functionName: string;
  lang?: string;
  defaultIndex?: number;
}

export function AutoExtractPreview({
  children,
  source,
  functionName,
  lang = "tsx",
  defaultIndex = 0,
}: AutoExtractPreviewProps) {
  // Try to get build-time extracted code
  const extractedCode = getExtractedCode(source, functionName);

  return (
    <ComponentPreview
      source={source}
      extractFunction={functionName}
      extractedCode={extractedCode || undefined}
      lang={lang}
      defaultIndex={defaultIndex}
    >
      {children}
    </ComponentPreview>
  );
}
