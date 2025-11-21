// File: collapsible.example.tsx
"use client";

import React from "react";

import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@helgadigitals/vera-ui";

export default function CollapsibleExample() {
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold">Collapsible examples</h2>

      {/* simple uncontrolled collapsible */}
      <Collapsible defaultOpen={false}>
        <div className="border rounded-md overflow-hidden">
          <div className="flex items-center">
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between px-4 py-3 text-left">
                <span>Show details</span>
                <ChevronDown aria-hidden />
              </button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent>
            <div className="px-4 pb-4">
              <p className="text-sm">
                This is the content inside the collapsible. Place any markup
                here — lists, forms, code samples, etc.
              </p>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* example with defaultOpen and slightly different trigger */}
      <Collapsible defaultOpen>
        <div className="border rounded-md overflow-hidden">
          <div className="flex items-center">
            <CollapsibleTrigger asChild>
              <button className="w-full flex items-center justify-between px-4 py-3 text-left">
                <span>Open by default</span>
                <ChevronUp aria-hidden />
              </button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent>
            <div className="px-4 pb-4">
              <p className="text-sm">
                Opened content. Use this pattern for FAQs, progressive
                disclosure, or small panels.
              </p>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
}
