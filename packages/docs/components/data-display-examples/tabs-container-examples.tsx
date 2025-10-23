"use client";

import { type TabItem, TabsContainer } from "@helgadigitals/vera-ui";
import { Suspense } from "react";

// component to handle Suspense boundary
function TabsContainerWithSuspense({
  tabs,
  defaultTab,
  persistInUrl,
  containerHeight,
  urlParamName,
  tabsLayout,
}: {
  tabs: TabItem[];
  defaultTab?: string;
  persistInUrl?: boolean;
  containerHeight?: string;
  urlParamName?: string;
  tabsLayout?: "compact" | "full";
}) {
  return (
    <Suspense fallback={<div className="p-4">Loading...</div>}>
      <TabsContainer
        tabs={tabs}
        defaultTab={defaultTab}
        persistInUrl={persistInUrl}
        containerHeight={containerHeight}
        urlParamName={urlParamName}
        tabsLayout={tabsLayout}
      />
    </Suspense>
  );
}

export function BasicTabsContainerExample() {
  const tabs: TabItem[] = [
    {
      value: "overview",
      label: "Overview",
      content: (
        <div className="space-y-4 p-4">
          <h3 className="text-lg font-semibold">Project Overview</h3>
          <p className="text-muted-foreground">
            This is the main overview of your project with key metrics and
            summary information.
          </p>
        </div>
      ),
    },
    {
      value: "analytics",
      label: "Analytics",
      content: (
        <div className="space-y-4 p-4">
          <h3 className="text-lg font-semibold">Analytics Dashboard</h3>
          <p className="text-muted-foreground">
            View detailed analytics and performance metrics for your project.
          </p>
        </div>
      ),
      disabled: false,
    },
    {
      value: "settings",
      label: "Settings",
      content: (
        <div className="space-y-4 p-4">
          <h3 className="text-lg font-semibold">Project Settings</h3>
          <p className="text-muted-foreground">
            Configure your project settings and preferences here.
          </p>
        </div>
      ),
      disabled: false,
    },
  ];

  return (
    <TabsContainerWithSuspense
      tabs={tabs}
      defaultTab="overview"
      persistInUrl={false}
      containerHeight="300px"
    />
  );
}

export function URLPersistedTabsExample() {
  const tabs: TabItem[] = [
    {
      value: "dashboard",
      label: "Dashboard",
      content: (
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Key Metrics</h4>
              <p className="text-2xl font-bold text-primary">1,234</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Active Users</h4>
              <p className="text-2xl font-bold text-green-600">5,678</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      value: "reports",
      label: "Reports",
      content: (
        <div className="space-y-4 p-4">
          <h3 className="text-lg font-semibold">Generated Reports</h3>
          <div className="space-y-2">
            <div className="p-3 border rounded">Monthly Sales Report</div>
            <div className="p-3 border rounded">User Activity Report</div>
            <div className="p-3 border rounded">Performance Analysis</div>
          </div>
        </div>
      ),
      disabled: false,
    },
  ];

  return (
    <TabsContainerWithSuspense
      tabs={tabs}
      defaultTab="dashboard"
      persistInUrl={true}
      urlParamName="view"
      containerHeight="300px"
    />
  );
}

export function ScrollableTabsExample() {
  const tabs: TabItem[] = [
    {
      value: "tab1",
      label: "Overview",
      content: <div className="space-y-4 p-4">Overview content</div>,
    },
    {
      value: "tab2",
      label: "Analytics",
      content: <div className="space-y-4 p-4">Analytics content</div>,
    },
    {
      value: "tab3",
      label: "Performance",
      content: <div className="space-y-4 p-4">Performance content</div>,
    },
    {
      value: "tab4",
      label: "Security",
      content: <div className="space-y-4 p-4">Security content</div>,
    },
    {
      value: "tab5",
      label: "Integration",
      content: <div className="space-y-4 p-4">Integration content</div>,
    },
    {
      value: "tab6",
      label: "Documentation",
      content: <div className="space-y-4 p-4">Documentation content</div>,
    },
    {
      value: "tab7",
      label: "API Reference",
      content: <div className="space-y-4 p-4">API Reference content</div>,
    },
    {
      value: "tab8",
      label: "Support",
      content: <div className="space-y-4 p-4">Support content</div>,
    },
  ];

  return (
    <TabsContainerWithSuspense
      tabs={tabs}
      defaultTab="tab1"
      persistInUrl={false}
      containerHeight="300px"
    />
  );
}

export function ConditionalTabsExample() {
  const tabs: TabItem[] = [
    {
      value: "public",
      label: "Public Data",
      content: (
        <div className="p-4">
          <h3 className="font-semibold">Public Information</h3>
          <p>This content is available to all users.</p>
        </div>
      ),
    },
    {
      value: "private",
      label: "Private Data",
      content: (
        <div className="p-4">
          <h3 className="font-semibold">Private Information</h3>
          <p>This content requires special permissions.</p>
        </div>
      ),
      disabled: true,
    },
    {
      value: "help",
      label: "Help & Support",
      content: (
        <div className="p-4">
          <h3 className="font-semibold">Help Center</h3>
          <p>Find answers to common questions and get support.</p>
        </div>
      ),
    },
  ];

  return (
    <TabsContainerWithSuspense
      tabs={tabs}
      defaultTab="public"
      persistInUrl={false}
      containerHeight="300px"
    />
  );
}

export function CompactLayoutExample() {
  const tabs: TabItem[] = [
    {
      value: "inbox",
      label: "Inbox",
      content: (
        <div className="p-4">
          <h3 className="font-semibold mb-4">Inbox Messages</h3>
          <div className="space-y-2">
            <div className="p-3 border rounded">Email from John Doe</div>
            <div className="p-3 border rounded">Team Meeting Notes</div>
            <div className="p-3 border rounded">Project Update</div>
          </div>
        </div>
      ),
    },
    {
      value: "sent",
      label: "Sent",
      content: (
        <div className="p-4">
          <h3 className="font-semibold mb-4">Sent Messages</h3>
          <p className="text-muted-foreground">
            Your sent messages appear here.
          </p>
        </div>
      ),
    },
    {
      value: "drafts",
      label: "Drafts",
      content: (
        <div className="p-4">
          <h3 className="font-semibold mb-4">Draft Messages</h3>
          <p className="text-muted-foreground">
            Your draft messages appear here.
          </p>
        </div>
      ),
    },
  ];

  return (
    <TabsContainerWithSuspense
      tabs={tabs}
      defaultTab="inbox"
      persistInUrl={false}
      containerHeight="300px"
      tabsLayout="compact"
    />
  );
}

export function FullWidthLayoutExample() {
  const tabs: TabItem[] = [
    {
      value: "overview",
      label: "Overview",
      content: (
        <div className="p-4">
          <h3 className="font-semibold mb-4">System Overview</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 border rounded">
              <p className="text-sm text-muted-foreground">CPU Usage</p>
              <p className="text-2xl font-bold">45%</p>
            </div>
            <div className="p-4 border rounded">
              <p className="text-sm text-muted-foreground">Memory</p>
              <p className="text-2xl font-bold">8.2 GB</p>
            </div>
            <div className="p-4 border rounded">
              <p className="text-sm text-muted-foreground">Disk</p>
              <p className="text-2xl font-bold">234 GB</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      value: "performance",
      label: "Performance",
      content: (
        <div className="p-4">
          <h3 className="font-semibold mb-4">Performance Metrics</h3>
          <p className="text-muted-foreground">Real-time performance data.</p>
        </div>
      ),
    },
    {
      value: "logs",
      label: "Logs",
      content: (
        <div className="p-4">
          <h3 className="font-semibold mb-4">System Logs</h3>
          <p className="text-muted-foreground">View system logs and events.</p>
        </div>
      ),
    },
  ];

  return (
    <TabsContainerWithSuspense
      tabs={tabs}
      defaultTab="overview"
      persistInUrl={false}
      containerHeight="300px"
      tabsLayout="full"
    />
  );
}
