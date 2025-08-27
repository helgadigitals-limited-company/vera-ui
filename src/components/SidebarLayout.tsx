import { SidebarTrigger, SidebarProvider } from "@/components/ui/sidebar"
import  {
  ReusableSidebar,
  type SidebarItem,
  type ReusableSidebarClassNames,
  type ReusableSidebarStyleProps,
} from "@/components/Sidebar"

export type SidebarLayoutProps = {
  props: {
    items: SidebarItem[]
    heading?: string
    image?: string
    isFooterVisible?: boolean
    label?: string
    displayName?: string
    bgColor?: string
    textColor?: string
    // New optional advanced styling
    classNames?: ReusableSidebarClassNames
    stylesConfig?: ReusableSidebarStyleProps
    collapsibleMode?: "icon" | "offcanvas" | "none"
  },
  children: React.ReactNode
}

export  function SidebarLayout({ props, children }: SidebarLayoutProps) {
  const {
    items,
    heading,
    image,
    isFooterVisible,
    label,
    displayName,
    bgColor,
    textColor,
    classNames,
    stylesConfig,
    collapsibleMode = "icon",
  } = props

  const theme = {
    bgColor: stylesConfig?.bgColor || bgColor,
    textColor: stylesConfig?.textColor || textColor,
    widthClass: stylesConfig?.widthClass,
    surface: stylesConfig?.surfaceClasses,
    itemTextSize: stylesConfig?.itemTextSize,
    headingTextSize: stylesConfig?.headingTextSize,
    // map classNames
    root: classNames?.root,
    header: classNames?.header,
    image: classNames?.image,
    heading: classNames?.heading,
    groupLabel: classNames?.groupLabel,
    menu: classNames?.menu,
    menuItem: classNames?.menuItem,
    menuButton: classNames?.menuButton,
    menuButtonActive: classNames?.menuButtonActive,
    footer: classNames?.footer,
    footerUserIcon: classNames?.footerUserIcon,
    footerDisplayName: classNames?.footerDisplayName,
  }

  return (
    <SidebarProvider theme={theme}>
      <ReusableSidebar
        items={items}
        heading={heading}
        image={image}
        isFooterVisible={isFooterVisible}
        label={label}
        displayName={displayName}
        collapsibleMode={collapsibleMode}
      />
      <main className="flex-1 min-h-svh">
        <div className="p-2">
          <SidebarTrigger />
        </div>
        {children}
      </main>
    </SidebarProvider>
  )
}