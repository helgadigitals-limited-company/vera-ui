import type { Meta, StoryObj } from "@storybook/react"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import { Home, Users, Cog, Bell } from "lucide-react"
import {SidebarLayout, type SidebarLayoutProps } from "./SidebarLayout"

const items = [
  { title: "Dashboard", path: "/", icon: Home },
  { title: "Users", path: "/users", icon: Users, badge: 24 },
  { title: "Alerts", path: "/alerts", icon: Bell, badge: 5 },
  { title: "Settings", path: "/settings", icon: Cog },
]

const layoutProps: SidebarLayoutProps["props"] = {
  items,
  heading: "Admin Panel",
  label: "Main",
  displayName: "Jane Admin",
  isFooterVisible: true,
  image: "https://placehold.co/96x96/png",
  collapsibleMode: "icon",
}

const DemoApp = (extra?: Partial<SidebarLayoutProps["props"]>) => (
  <MemoryRouter initialEntries={["/"]}>
    <Routes>
      <Route
        path="/"
        element={<SidebarLayout props={{ ...layoutProps, ...extra }} />}
      >
        <Route index element={<Page title="Dashboard" />} />
        <Route path="users" element={<Page title="Users" />} />
        <Route path="alerts" element={<Page title="Alerts" />} />
        <Route path="settings" element={<Page title="Settings" />} />
      </Route>
    </Routes>
  </MemoryRouter>
)

const Page = ({ title }: { title: string }) => (
  <div className="p-4 space-y-2">
    <h2 className="text-lg font-semibold">{title}</h2>
    <p className="text-sm text-muted-foreground">
      This content is rendered inside the <code>Outlet</code> area managed by
      SidebarLayout.
    </p>
  </div>
)

const meta: Meta = {
  title: "Layout/SidebarLayout",
  component: SidebarLayout,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
  component: `High-level convenience layout combining SidebarProvider, ReusableSidebar, trigger button, and routed Outlet region. Supply a single \`props\` object with navigation items and presentation options.\n\n### SidebarLayout props.props fields\n| Field | Type | Required | Description |\n| ----- | ---- | -------- | ----------- |\n| items | SidebarItem[] | yes | Navigation entries (title, path, icon, optional badge, exact, tooltip). |\n| heading | string | no | Large heading shown in expanded header (e.g. product name). |\n| image | string | no | Image URL shown in header (resizes per state). |\n| isFooterVisible | boolean | no | Controls rendering of the footer section. |\n| label | string | no | Optional grouping label (future grouping usage). |\n| displayName | string | no | User display name in footer when expanded. |\n| bgColor | string | no | (Legacy) background utility shortcut; prefer stylesConfig.bgColor. |\n| textColor | string | no | (Legacy) text color utility shortcut; prefer stylesConfig.textColor. |\n| classNames | ReusableSidebarClassNames | no | Granular slot class overrides (root, header, image, heading, groupLabel, menu, menuItem, menuButton, menuButtonActive, footer, footerUserIcon, footerDisplayName). |\n| stylesConfig | ReusableSidebarStyleProps | no | Convenience styling tokens (bgColor, textColor, widthClass, itemTextSize, headingTextSize, surfaceClasses). |\n| collapsibleMode | "icon" | "icon" | Collapse behavior passed to underlying <Sidebar>. (icon | offcanvas | none). |\n\n### Derived Theme Mapping\nThe layout converts \`stylesConfig\` + \`classNames\` + legacy top-level color props into the provider \`theme\` (bgColor, textColor, widthClass, surface, itemTextSize, headingTextSize, plus slot classes).\n\n### When to use SidebarLayout vs primitives\nUse SidebarLayout when you want a fast scaffolded shell with an Outlet/content area. Use primitives if you need bespoke composition, multiple stacked navs, or advanced responsive control.\n\n### Customization Order\n1. stylesConfig / legacy color props -> base tokens\n2. classNames -> slot classes\n3. Additional className overrides directly on primitives (if you extend the layout)\n\n### Accessibility & State\nCollapse state (expanded/collapsed) persists via cookie at the provider level. Trigger button is rendered within main content area (as example) – you can reposition it as needed.\n\n> Tip: Provide stable item.icon components (LucideIcon) for consistent sizing in both states.`,
      },
    },
  },
  tags: ["autodocs"],
}
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => DemoApp(),
  parameters: {
    docs: {
      description: {
        story:
          "Default SidebarLayout with icon collapse mode, heading, footer user section, and badges.",
      },
    },
  },
}

export const Offcanvas: Story = {
  render: () => DemoApp({ collapsibleMode: "offcanvas", heading: "Offcanvas" }),
  parameters: {
    docs: {
      description: {
        story:
          "Same layout but using offcanvas collapse mode that fully hides the sidebar.",
      },
    },
  },
}

export const CustomStyles: Story = {
  render: () =>
    DemoApp({
      stylesConfig: {
        bgColor: "bg-zinc-900",
        textColor: "text-zinc-100",
        surfaceClasses: "border-r border-zinc-800",
        headingTextSize: "text-sm",
        itemTextSize: "text-xs",
      },
      classNames: {
        menuButtonActive: "bg-zinc-800 text-white",
        footer: "bg-zinc-950",
      },
      heading: "Themed",
    }),
  parameters: {
    docs: {
      description: {
        story:
          "Shows styling via stylesConfig (utility props) and classNames (granular overrides) passed through SidebarLayout down to SidebarProvider & ReusableSidebar.",
      },
    },
  },
}