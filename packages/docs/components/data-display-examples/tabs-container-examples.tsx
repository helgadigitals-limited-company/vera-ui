"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@helgadigitals/vera-ui";

export function BasicTabsContainerExample() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4 p-4">
        <h3 className="text-lg font-semibold">Project Overview</h3>
        <p className="text-muted-foreground">
          This is the main overview of your project with key metrics and summary information.
        </p>
      </TabsContent>
      <TabsContent value="analytics" className="space-y-4 p-4">
        <h3 className="text-lg font-semibold">Analytics Dashboard</h3>
        <p className="text-muted-foreground">
          View detailed analytics and performance metrics for your project.
        </p>
      </TabsContent>
      <TabsContent value="settings" className="space-y-4 p-4">
        <h3 className="text-lg font-semibold">Project Settings</h3>
        <p className="text-muted-foreground">
          Configure your project settings and preferences here.
        </p>
      </TabsContent>
    </Tabs>
  );
}

export function URLPersistedTabsExample() {
  return (
    <Tabs defaultValue="dashboard" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="users">User Management</TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard" className="p-4">
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
      </TabsContent>
      <TabsContent value="reports" className="space-y-4 p-4">
        <h3 className="text-lg font-semibold">Generated Reports</h3>
        <div className="space-y-2">
          <div className="p-3 border rounded">Monthly Sales Report</div>
          <div className="p-3 border rounded">User Activity Report</div>
          <div className="p-3 border rounded">Performance Analysis</div>
        </div>
      </TabsContent>
      <TabsContent value="users" className="space-y-4 p-4">
        <h3 className="text-lg font-semibold">User Administration</h3>
        <p className="text-muted-foreground">
          Manage user accounts, permissions, and access controls.
        </p>
      </TabsContent>
    </Tabs>
  );
}

export function ScrollableTabsExample() {
  return (
    <Tabs defaultValue="tab1" className="w-full">
      <TabsList className="w-full justify-start overflow-x-auto">
        <TabsTrigger value="tab1">Overview</TabsTrigger>
        <TabsTrigger value="tab2">Analytics</TabsTrigger>
        <TabsTrigger value="tab3">Performance</TabsTrigger>
        <TabsTrigger value="tab4">Security</TabsTrigger>
        <TabsTrigger value="tab5">Integration</TabsTrigger>
        <TabsTrigger value="tab6">Documentation</TabsTrigger>
        <TabsTrigger value="tab7">API Reference</TabsTrigger>
        <TabsTrigger value="tab8">Support</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4">Overview content</TabsContent>
      <TabsContent value="tab2" className="p-4">Analytics content</TabsContent>
      <TabsContent value="tab3" className="p-4">Performance content</TabsContent>
      <TabsContent value="tab4" className="p-4">Security content</TabsContent>
      <TabsContent value="tab5" className="p-4">Integration content</TabsContent>
      <TabsContent value="tab6" className="p-4">Documentation content</TabsContent>
      <TabsContent value="tab7" className="p-4">API Reference content</TabsContent>
      <TabsContent value="tab8" className="p-4">Support content</TabsContent>
    </Tabs>
  );
}

export function ConditionalTabsExample() {
  return (
    <Tabs defaultValue="public" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="public">Public Data</TabsTrigger>
        <TabsTrigger value="private" disabled>Private Data</TabsTrigger>
        <TabsTrigger value="help">Help & Support</TabsTrigger>
      </TabsList>
      <TabsContent value="public" className="p-4">
        <h3 className="font-semibold">Public Information</h3>
        <p>This content is available to all users.</p>
      </TabsContent>
      <TabsContent value="private" className="p-4">
        <h3 className="font-semibold">Private Information</h3>
        <p>This content requires special permissions.</p>
      </TabsContent>
      <TabsContent value="help" className="p-4">
        <h3 className="font-semibold">Help Center</h3>
        <p>Find answers to common questions and get support.</p>
      </TabsContent>
    </Tabs>
  );
}