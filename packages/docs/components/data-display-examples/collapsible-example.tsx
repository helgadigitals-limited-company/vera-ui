// File: components/data-display-examples/collapsible-examples.tsx
"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@helgadigitals/vera-ui";

export function BasicCollapsibleExample() {
  return (
    <div className="max-w-xl">
      <Collapsible>
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center justify-between px-4 py-3 text-left border rounded">
            <span>Show details</span>
            <ChevronDown aria-hidden />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 pb-4 text-sm">
            This is the content inside the collapsible. Place any markup here —
            lists, forms, code samples, etc.
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

export function OpenByDefaultExample() {
  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger asChild>
        <button className="w-full flex items-center justify-between px-4 py-3 text-left border rounded">
          <span>Open by default</span>
          <ChevronUp aria-hidden />
        </button>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="px-4 pb-4 text-sm">
          Opened content. Use this pattern for FAQs, progressive disclosure, or
          small panels.
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function AccordionExample() {
  const items = [
    {
      id: "q1",
      question: "What is Collapsible?",
      answer: "A wrapper around Radix Collapsible.",
    },
    {
      id: "q2",
      question: "How to use it?",
      answer: "Use trigger + content. Use controlled API for accordion.",
    },
  ];

  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      {items.map((i) => (
        <Collapsible
          key={i.id}
          open={openId === i.id}
          onOpenChange={(isOpen) => setOpenId(isOpen ? i.id : null)}
        >
          <CollapsibleTrigger asChild>
            <button className="w-full text-left px-3 py-2 border rounded">
              {i.question}
            </button>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <div className="p-3 border-l ml-3">{i.answer}</div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}

export function ProgressiveFormExample() {
  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <button className="px-3 py-2 border rounded">Advanced settings</button>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="space-y-3 p-3">
          <label className="block">
            Option A <input className="ml-2" />
          </label>
          <label className="block">
            Option B <input className="ml-2" />
          </label>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function TableRowExample() {
  return (
    <div className="border rounded">
      <div className="p-3 flex justify-between">
        <div>Row title</div>
        <div>
          <Collapsible>
            <CollapsibleTrigger asChild>
              <button className="px-2 py-1 text-sm">Details</button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-2 text-xs">Full item metadata and actions</div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
}
