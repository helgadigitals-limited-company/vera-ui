"use client";

import React from 'react';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';

interface ComponentPreviewProps {
  children: React.ReactNode;
  code?: string;
  lang?: string;
  // Which tab to show first (0 = preview, 1 = code)
  defaultIndex?: number;
}

export function ComponentPreview({   
  children, 
  code,
  lang = 'tsx',
  defaultIndex = 0
}: ComponentPreviewProps) {
  const canShowTabs = Boolean(code);

  // If no code is provided, just show the preview
  if (!canShowTabs) {
    return (
      <div className="my-8 rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden">
      
        <div className="p-8">
          <div className="
            flex items-center justify-center min-h-[200px] 
            bg-gradient-to-br from-background to-muted/30 
            rounded-lg 
            relative overflow-hidden
          ">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden">
      

      <Tabs items={['Preview', 'Code']} defaultIndex={defaultIndex}>
        <Tab value="Preview">
          <div className="p-8">
            <div className="
              flex items-center justify-center min-h-[200px] 
              bg-gradient-to-br from-background to-muted/30 
              rounded-lg 
              relative overflow-hidden
            ">
              {/* Subtle background pattern */}
              <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
              <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
                {children}
              </div>
            </div>
          </div>
        </Tab>
        <Tab value="Code">
          <div className="p-6">
            <DynamicCodeBlock lang={lang} code={code || ''} />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
