import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
  type SidebarTheme,
} from "@/components/ui/sidebar";
import * as React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export type SidebarItem = {
  title: string;
  path: string;
  icon: React.ElementType;
  exact?: boolean;
  // Optional badge text (e.g. counts)
  badge?: string | number;
  // Optional override tooltip (if you later wire in collapsed tooltips)
  tooltip?: string;
};

export type ReusableSidebarClassNames = {
  root?: string;
  header?: string;
  image?: string;
  heading?: string;
  groupLabel?: string;
  menu?: string;
  menuItem?: string;
  menuButton?: string;
  menuButtonActive?: string;
  footer?: string;
  footerUserIcon?: string;
  footerDisplayName?: string;
};

export type ReusableSidebarStyleProps = {
  /**
   * Tailwind BG utility (e.g. "bg-slate-900")
   */
  bgColor?: string;
  /**
   * Tailwind text color utility (e.g. "text-white")
   */
  textColor?: string;
  /**
   * Tailwind width (default uses internal)
   */
  widthClass?: string;
  /**
   * Item text size class (e.g. "text-xs" | "text-sm" | "text-base")
   */
  itemTextSize?: string;
  /**
   * Heading text size class
   */
  headingTextSize?: string;
  /**
   * Apply rounded / border / shadow etc.
   */
  surfaceClasses?: string;
};

type SidebarProps = {
  items: SidebarItem[];
  heading?: string;
  image?: string;
  isFooterVisible?: boolean;
  label?: string;
  displayName?: string;
  /**
   * Pass Tailwind class tokens. These merge onto defaults.
   */
  classNames?: ReusableSidebarClassNames;
  /**
   * Style related utility props (shortcuts)
   */
  stylesConfig?: ReusableSidebarStyleProps;
  /**
   * Direct inline style override for root <Sidebar/>
   */
  style?: React.CSSProperties;
  /**
   * Collapse mode (defaults "icon")
   */
  collapsibleMode?: "icon" | "offcanvas" | "none";
};

// Add a small item component that uses hooks to detect active route
function SidebarNavItem({
  item,
  appliedItemText,
  theme,
  classNames,
}: {
  item: SidebarItem;
  appliedItemText: string;
  theme?: SidebarTheme;
  classNames?: ReusableSidebarClassNames;
}) {
  const resolved = useResolvedPath(item.path);
  const match = useMatch({ path: resolved.pathname, end: item.exact });
  const isActive = Boolean(match);

  return (
    <SidebarMenuItem className={cn(theme?.menuItem, classNames?.menuItem)}>
      <SidebarMenuButton
        asChild
        className={cn(appliedItemText, classNames?.menuButton)}
        data-active={isActive || undefined}
      >
        <Link
          to={item.path}
          className={cn(
            "flex w-full items-center gap-2 rounded-md transition-colors",
            appliedItemText,
            theme?.menuButton,
            classNames?.menuButton,
            isActive
              ? cn(
                  "bg-blue-200 text-blue-900 dark:bg-blue-500/20 dark:text-blue-50",
                  "font-semibold",
                  theme?.menuButtonActive,
                  classNames?.menuButtonActive
                )
              : "hover:bg-foreground/5"
          )}
        >
          {React.createElement(item.icon, { className: "shrink-0" })}
          <span className="truncate">{item.title}</span>
          {item.badge != null && (
            <span className="ml-auto inline-flex min-w-5 items-center justify-center rounded bg-primary px-1 text-[10px] font-medium text-primary-foreground">
              {item.badge}
            </span>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function ReusableSidebar({
  items,
  heading,
  image,
  isFooterVisible = false,
  label,
  displayName,
  classNames,
  stylesConfig,
  style,
  collapsibleMode = "icon",
}: SidebarProps) {
  const { state, theme } = useSidebar();
  // Backward compatibility: if stylesConfig provided directly (legacy),
  // we still derive fallbacks; theme from provider takes precedence.

  const {
    bgColor,
    textColor,
    widthClass,
    itemTextSize = "text-sm",
    headingTextSize = "text-xs",
    surfaceClasses = "",
  } = stylesConfig || {};

  const appliedItemText = theme?.itemTextSize || itemTextSize;
  const appliedHeadingText = theme?.headingTextSize || headingTextSize;

  return (
    <Sidebar
      collapsible={collapsibleMode}
      className={cn(
        // theme first
        theme?.bgColor,
        theme?.textColor,
        theme?.surface,
        theme?.widthClass,
        theme?.root,
        // legacy props second
        textColor,
        bgColor,
        widthClass,
        surfaceClasses || "bg-sidebar"
      )}
      style={style}
      data-custom-sidebar
    >
      <SidebarHeader
        className={cn("px-2 pt-2", theme?.header, classNames?.header)}
      >
        <div className="flex flex-col items-start gap-1">
          {state === "expanded" && image && (
            <img
              src={image}
              alt="Sidebar"
              className={cn(
                "w-24 h-24 object-cover rounded-md mx-auto",
                theme?.image,
                classNames?.image
              )}
            />
          )}
          {state === "expanded" && heading && (
            <span
              className={cn(
                "font-semibold tracking-tight",
                appliedHeadingText,
                theme?.heading,
                classNames?.heading
              )}
            >
              {heading}
            </span>
          )}
          {state === "collapsed" && image && (
            <img
              src={image}
              alt="Sidebar"
              className={cn(
                "w-12 h-12 object-cover rounded-md",
                theme?.image,
                classNames?.image
              )}
            />
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {label && (
            <SidebarGroupLabel
              className={cn(
                "uppercase font-medium tracking-wide text-[10px] opacity-70",
                theme?.groupLabel,
                classNames?.groupLabel
              )}
            >
              {label}
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className={cn(theme?.menu, classNames?.menu)}>
              {items.map((item) => (
                <SidebarNavItem
                  key={item.title}
                  item={item}
                  appliedItemText={appliedItemText}
                  theme={theme}
                  classNames={classNames}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {isFooterVisible && (
        <SidebarFooter
          className={cn(
            "flex flex-row items-center gap-2 px-3 py-2 border-t border-border mt-auto",
            theme?.footer,
            classNames?.footer
          )}
        >
          <User
            className={cn(
              "size-5",
              theme?.footerUserIcon,
              classNames?.footerUserIcon
            )}
          />
          {state === "expanded" && (
            <span
              className={cn(
                "font-medium text-sm truncate",
                theme?.footerDisplayName,
                classNames?.footerDisplayName
              )}
            >
              {displayName}
            </span>
          )}
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
