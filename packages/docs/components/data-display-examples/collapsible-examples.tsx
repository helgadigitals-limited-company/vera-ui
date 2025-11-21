// File: components/data-display-examples/collapsible-examples.tsx
"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Minus, Settings } from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@helgadigitals/vera-ui";

export function BasicCollapsibleExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-xl">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center justify-between px-4 py-3 text-left border rounded hover:bg-gray-50 transition-colors">
            <span className="font-medium">Show details</span>
            {isOpen ? (
              <ChevronUp className="h-4 w-4" aria-hidden />
            ) : (
              <ChevronDown className="h-4 w-4" aria-hidden />
            )}
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 py-3 text-sm border border-t-0 rounded-b bg-gray-50">
            <p className="mb-2">
              This is the collapsible content area. You can place any content
              here:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Text paragraphs and descriptions</li>
              <li>Forms and input fields</li>
              <li>Lists and data tables</li>
              <li>Images and media</li>
            </ul>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

export function OpenByDefaultExample() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="max-w-xl">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center justify-between px-4 py-3 text-left border rounded hover:bg-gray-50 transition-colors">
            <span className="font-medium">User Profile Settings</span>
            {isOpen ? (
              <Minus className="h-4 w-4" aria-hidden />
            ) : (
              <Plus className="h-4 w-4" aria-hidden />
            )}
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 py-3 text-sm border border-t-0 rounded-b space-y-3">
            <p className="text-gray-600">
              This collapsible is open by default, useful for important content
              that users should see immediately but can dismiss if needed.
            </p>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-white rounded border">
                <span>Email notifications</span>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="flex items-center justify-between p-2 bg-white rounded border">
                <span>Marketing updates</span>
                <input type="checkbox" />
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

export function AccordionExample() {
  const items = [
    {
      id: "q1",
      question: "What is a Collapsible component?",
      answer:
        "A Collapsible is a UI component that allows you to show and hide content. It's built as a wrapper around Radix UI's Collapsible primitive, providing a simple way to manage expandable sections in your interface.",
    },
    {
      id: "q2",
      question: "How do I implement accordion behavior?",
      answer:
        "Use the controlled API with open and onOpenChange props. Maintain a single openId state and only allow one item to be open at a time by setting open={openId === item.id} for each collapsible.",
    },
    {
      id: "q3",
      question: "Can I customize the animations?",
      answer:
        "Yes! The CollapsibleContent component can be styled with CSS transitions. You can add custom animations for height, opacity, or use CSS animation libraries to create smooth expand/collapse effects.",
    },
  ];

  const [openId, setOpenId] = useState<string | null>("q1");

  return (
    <div className="max-w-2xl space-y-2">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <Collapsible
            key={item.id}
            open={isOpen}
            onOpenChange={(open) => setOpenId(open ? item.id : null)}
          >
            <CollapsibleTrigger asChild>
              <button className="w-full text-left px-4 py-3 border rounded hover:bg-gray-50 transition-colors flex items-center justify-between">
                <span className="font-medium">{item.question}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden
                />
              </button>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <div className="px-4 py-3 border border-t-0 rounded-b bg-gray-50 text-sm text-gray-700">
                {item.answer}
              </div>
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </div>
  );
}

export function ProgressiveFormExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-xl space-y-4">
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email *</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button className="flex items-center gap-2 px-3 py-2 border rounded hover:bg-gray-50 transition-colors text-sm">
            <Settings className="h-4 w-4" />
            <span>Advanced settings</span>
            {isOpen ? (
              <ChevronUp className="h-3 w-3" aria-hidden />
            ) : (
              <ChevronDown className="h-3 w-3" aria-hidden />
            )}
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="space-y-3 p-4 border border-t-0 rounded-b bg-gray-50">
            <div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                <span>Enable two-factor authentication</span>
              </label>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                <span>Subscribe to newsletter</span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Preferred language
              </label>
              <select className="w-full px-3 py-2 border rounded text-sm">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
        Submit
      </button>
    </div>
  );
}

export function TableRowExample() {
  const rows = [
    {
      id: 1,
      name: "Project Alpha",
      status: "Active",
      date: "2024-11-15",
      details: "Customer-facing dashboard with real-time analytics",
      team: "Engineering Team A",
      budget: "$45,000",
    },
    {
      id: 2,
      name: "Project Beta",
      status: "Planning",
      date: "2024-12-01",
      details: "Internal tool for workflow automation",
      team: "Engineering Team B",
      budget: "$28,000",
    },
  ];

  return (
    <div className="border rounded overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 font-medium text-sm border-b">
        <div className="grid grid-cols-4 gap-4">
          <div>Project</div>
          <div>Status</div>
          <div>Date</div>
          <div></div>
        </div>
      </div>
      {rows.map((row) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
          <div key={row.id} className="border-b last:border-b-0">
            <div className="px-4 py-3 grid grid-cols-4 gap-4 items-center hover:bg-gray-50">
              <div className="font-medium">{row.name}</div>
              <div>
                <span
                  className={`inline-block px-2 py-1 text-xs rounded ${
                    row.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {row.status}
                </span>
              </div>
              <div className="text-sm text-gray-600">{row.date}</div>
              <div className="text-right">
                <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                  <CollapsibleTrigger asChild>
                    <button className="px-3 py-1 text-sm border rounded hover:bg-gray-100 transition-colors">
                      {isOpen ? "Hide" : "Details"}
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="mt-3 p-3 bg-gray-50 rounded text-sm space-y-2">
                      <div>
                        <span className="font-medium">Description:</span>{" "}
                        {row.details}
                      </div>
                      <div>
                        <span className="font-medium">Team:</span> {row.team}
                      </div>
                      <div>
                        <span className="font-medium">Budget:</span>{" "}
                        {row.budget}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
