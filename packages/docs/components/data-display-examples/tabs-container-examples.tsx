"use client";

import { type TabItem, TabsContainer } from "@helgadigitals/vera-ui";

export function BasicTabsContainerExample() {

    const tabs: TabItem[] = [
      {
        value: 'overview',
        label: 'Overview',
        content:(
          <div className="space-y-4 p-4">
            <h3 className="text-lg font-semibold">Project Overview</h3>
            <p className="text-muted-foreground">
                          This is the main overview of your project with key metrics and summary information.
            </p>
          </div>
        ),
      },
      {
        value: 'analytics',
        label: 'Analytics',
        content:(
          <div className="space-y-4 p-4">
            <h3 className="text-lg font-semibold">Analytics  Dashboard</h3>
            <p className="text-muted-foreground">
            View detailed analytics and performance metrics for your project.  </p>
          </div>
        ),
        disabled: false,
      },
      {
        
      value: 'settings',
      label: 'Settings',
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
      <TabsContainer
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
      value: 'dashboard',
      label: 'Dashboard',
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
      value: 'reports',
      label: 'Reports',
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
    <TabsContainer
      tabs={tabs}
      defaultTab="dashboard"
      persistInUrl={true}
      urlParamName="tab"
      historyMode="replace"
      containerHeight="300px"
    />
  );
}

export function ScrollableTabsExample() {
 const tabs: TabItem[] = [
    {
      value: 'tab1',
      label: 'Overview',
      content: <div className="p-4">Overview content</div>,
    },
    {
      value: 'tab2',
      label: 'Analytics',
      content: <div className="p-4">Analytics content</div>,
    },
    {
      value: 'tab3',
      label: 'Performance',
      content: <div className="p-4">Performance content</div>,
    },
    {
      value: 'tab4',
      label: 'Security',
      content: <div className="p-4">Security content</div>,
    },
    {
      value: 'tab5',
      label: 'Integration',
      content: <div className="p-4">Integration content</div>,
    },
    {
      value: 'tab6',
      label: 'Documentation',
      content: <div className="p-4">Documentation content</div>,
    },
    {
      value: 'tab7',
      label: 'API Reference',
      content: <div className="p-4">API Reference content</div>,
    },
    {
      value: 'tab8',
      label: 'Support',
      content: <div className="p-4">Support content</div>,
    },
  ];
  return (
    <TabsContainer
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
      value: 'public',
      label: 'Public Data',
      content: (
        <div className="p-4">
          <h3 className="font-semibold">Public Information</h3>
          <p>This content is available to all users.</p>
        </div>
      ),
    },
    {
      value: 'private',
      label: 'Private Data',
      content: (
        <div className="p-4">
          <h3 className="font-semibold">Private Information</h3>
          <p>This content requires special permissions.</p>
        </div>
      ),
      disabled: true,
    },
    {
      value: 'help',
      label: 'Help & Support',
      content: (
        <div className="p-4">
          <h3 className="font-semibold">Help Center</h3>
          <p>Find answers to common questions and get support.</p>
        </div>
      ),
    },
  ];

  return (
    <TabsContainer
      tabs={tabs}
      defaultTab="public"
      persistInUrl={false}
      containerHeight="300px"
    />
  );
}