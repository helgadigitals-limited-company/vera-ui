import type { Meta, StoryObj } from "@storybook/react"
import { MemoryRouter, NavLink } from "react-router-dom"
import { Home, Settings, Users, Bell, type LucideIcon } from "lucide-react"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

type Item = {
  title: string
  icon: LucideIcon
  to: string
  badge?: string | number
}

const items: Item[] = [
  { title: "Home", icon: Home, to: "/", badge: 3 },
  { title: "Users", icon: Users, to: "/users" },
  { title: "Notifications", icon: Bell, to: "/notifications", badge: 12 },
  { title: "Settings", icon: Settings, to: "/settings" },
]

const RouterDecorator = (Story: React.ComponentType) => (
  <MemoryRouter initialEntries={["/"]}>{<Story />}</MemoryRouter>
)

const LayoutShell = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-[520px] w-full max-w-5xl rounded border bg-background overflow-hidden">
    {children}
    <div className="flex-1 p-4 space-y-4">
      <SidebarTrigger />
      <h2 className="font-semibold text-lg">Content Area</h2>
      <p className="text-sm text-muted-foreground">
        Switch routes by clicking sidebar links. The active link is styled.
      </p>
    </div>
  </div>
)

const BasicSidebar = () => {
  const { state } = useSidebar()
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="px-2 pt-2">
        <span className="font-semibold text-sm tracking-tight">
          {state === "expanded" ? "Example App" : "App"}
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(i => (
                <SidebarMenuItem key={i.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={i.to}
                      className={({ isActive }) =>
                        "flex items-center gap-2" + (isActive ? " font-semibold" : "")
                      }
                    >
                      <i.icon className="size-4 shrink-0" />
                      <span className="truncate">{i.title}</span>
                      {i.badge != null && (
                        <span className="ml-auto inline-flex min-w-5 items-center justify-center rounded bg-primary px-1 text-[10px] font-medium text-primary-foreground">
                          {i.badge}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mt-auto border-t border-border px-3 py-2 text-xs">
        <span className="opacity-70">v2.3 Demo</span>
      </SidebarFooter>
    </Sidebar>
  )
}

const meta: Meta = {
  title: "Layout/Sidebar",
  component: BasicSidebar,
  decorators: [
    RouterDecorator,
    (Story) => (
      <SidebarProvider>
        <LayoutShell>
          <Story />
        </LayoutShell>
      </SidebarProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
  component: `Example usage of the low–level Sidebar primitives: wrap in SidebarProvider, compose structural parts, and supply navigation buttons. See also SidebarLayout for a higher-level abstraction.\n\n### Props Overview\n\n#### <SidebarProvider />\n| Prop | Type | Default | Description |\n| ---- | ---- | ------- | ----------- |\n| defaultOpen | boolean | true | Initial expanded state (uncontrolled). |\n| open | boolean | — | Controlled expanded/collapsed state (pair with onOpenChange). |\n| onOpenChange | (open: boolean) => void | — | Called when user toggles (trigger, shortcut, rail). |\n| theme | SidebarTheme | — | Token + slot class overrides (see Theme keys). |\n\n**SidebarTheme keys**: \`root\`, \`bgColor\`, \`textColor\`, \`surface\`, \`widthClass\`, \`itemTextSize\`, \`headingTextSize\`, \`menuButton\`, \`menuButtonActive\`, \`groupLabel\`, \`footer\`, \`footerUserIcon\`, \`footerDisplayName\`, \`header\`, \`heading\`, \`image\`, \`menu\`, \`menuItem\`.\n\n#### <Sidebar />\n| Prop | Type | Default | Description |\n| ---- | ---- | ------- | ----------- |\n| side | "left" | "left" | Docking side. |\n| variant | "sidebar" | "sidebar" | Visual style: sidebar | floating | inset. |\n| collapsible | "icon" | "icon" | Collapse strategy (icon, offcanvas, none). |\n\nCollapse modes:\n- **icon**: Shrinks to a thin rail with icons.\n- **offcanvas**: Slides fully out of view.\n- **none**: Static (no collapse UI or shortcut).\n\n#### Structural Primitives\nAll accept standard HTML props + className + children.\n- SidebarHeader\n- SidebarContent\n- SidebarGroup / SidebarGroupLabel / SidebarGroupContent\n- SidebarMenu / SidebarMenuItem / SidebarMenuButton (supports asChild)\n- SidebarFooter\n- SidebarTrigger (hidden when collapsible='none')\n- SidebarRail (if included)\n\n#### Hook: useSidebar()\nReturns \`{ state, open, setOpen, openMobile, setOpenMobile, isMobile, toggleSidebar, theme }\`.\n- state: 'expanded' | 'collapsed'\n- isMobile: responsive detection for auto offcanvas.\n\n#### Shortcut\nCmd/Ctrl + B toggles (unless collapsible='none').\n\n#### Theming Layers\n1. Provider theme tokens\n2. className overrides\n3. Tailwind CSS variables\n\n#### Accessibility\nSemantic list markup, focus rings, persisted preference (cookie).\n\n> Wrap NavLink with <SidebarMenuButton asChild> to inherit active & collapsed styling.`,
      },
    },
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Offcanvas: Story = {
  render: () => {
    const { state } = useSidebar()
    return (
      <Sidebar collapsible="offcanvas">
        <SidebarHeader className="px-2 pt-2">
          <span className="font-semibold text-sm tracking-tight">
            {state === "expanded" ? "Offcanvas Mode" : "OC"}
          </span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map(i => (
                  <SidebarMenuItem key={i.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={i.to}
                        className={({ isActive }) =>
                          "flex items-center gap-2" + (isActive ? " font-semibold" : "")
                        }
                      >
                        <i.icon className="size-4" />
                        <span>{i.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates offcanvas collapse: sidebar slides completely out instead of shrinking to icon width.",
      },
    },
  },
}

export const Themed: Story = {
  decorators: [
    (Story) => (
      <SidebarProvider
        theme={{
          bgColor: "bg-slate-900",
          textColor: "text-slate-100",
          surface: "border border-slate-700",
          itemTextSize: "text-xs",
          headingTextSize: "text-sm",
          menuButtonActive: "bg-slate-700 text-white",
          footer: "bg-slate-950",
        }}
      >
        <LayoutShell>
          <Story />
        </LayoutShell>
      </SidebarProvider>
    ),
  ],
  render: () => <BasicSidebar />,
  parameters: {
    docs: {
      description: {
        story:
          "Shows custom theming via the SidebarProvider theme prop overriding colors, sizes, and active styles.",
      },
    },
  },
}