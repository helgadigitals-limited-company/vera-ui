import { User, ChevronRight } from "lucide-react";
import { cn, isGroup, isGroupArray, isMixedArray } from "@/lib/utils";
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
import {
  Link,
  useMatch,
  useResolvedPath,
  useLocation,
  matchPath,
} from "react-router-dom";

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

export type Group = {
  key: string;
  label: string;
  icon?: React.ElementType; // NEW: Optional icon for groups
  items: SidebarItem[];
};

// Update the union type to include a mixed type
export type MixedSidebarItem = SidebarItem | Group;

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
  items: SidebarItem[] | Group[] | MixedSidebarItem[]; // Add mixed type support
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

// Persist open/closed per group
const GROUPS_STORAGE_KEY = "sidebar_groups_open";



function usePersistentGroups(groupKeys: string[]) {
  const [openMap, setOpenMap] = React.useState<Record<string, boolean>>({});
  
  // Fix: Use a stable dependency by joining the keys
  const keyString = React.useMemo(() => groupKeys.join(','), [groupKeys]);
  const memoizedKeys = React.useMemo(() => groupKeys, [groupKeys]);
  const firstKey = memoizedKeys[0];

  React.useEffect(() => {
    // Only access localStorage on client side
    if (typeof window === 'undefined') return;
    
    const raw = localStorage.getItem(GROUPS_STORAGE_KEY);
    let initial: Record<string, boolean> = {};
    try {
      if (raw) initial = JSON.parse(raw);
    } catch {
      // ignore
    }
    
    // Ensure all keys exist; first group defaults to open if not stored
    const next: Record<string, boolean> = {};
    for (const k of memoizedKeys) {
      if (k in initial) {
        next[k] = initial[k];
      } else {
        next[k] = k === firstKey; // first group open by default
      }
    }
    
    setOpenMap(next);
  }, [keyString, firstKey, memoizedKeys]); // Use keyString instead of memoizedKeys

  const setAndPersist = React.useCallback(
    (updater: (prev: Record<string, boolean>) => Record<string, boolean>) => {
      setOpenMap((prev) => {
        const next = updater(prev);
        // Only access localStorage on client side
        if (typeof window !== 'undefined') {
          localStorage.setItem(GROUPS_STORAGE_KEY, JSON.stringify(next));
        }
        return next;
      });
    },
    []
  );

  const toggle = React.useCallback(
    (key: string) => {
      setAndPersist((prev) => ({ ...prev, [key]: !prev[key] }));
    },
    [setAndPersist]
  );

  const setOpen = React.useCallback(
    (key: string, open: boolean) => {
      setAndPersist((prev) => ({ ...prev, [key]: open }));
    },
    [setAndPersist]
  );

  return { openMap, toggle, setOpen };
}

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

  // Enhanced processing logic to handle mixed arrays while preserving order
  const { processedItems, hasGrouping } = React.useMemo(() => {
    if (isMixedArray(items)) {
      // Handle mixed array: preserve original order
      const mixedItems = items as MixedSidebarItem[];
      return {
        processedItems: mixedItems,
        hasGrouping: mixedItems.some(item => isGroup(item))
      };
    } else if (isGroupArray(items)) {
      // Items are already groups - use as-is
      const processedGroups = items as Group[];
      return {
        processedItems: processedGroups,
        hasGrouping: true
      };
    } else {
      // Items are SidebarItem[] - render directly without grouping
      const sidebarItems = items as SidebarItem[];
      return {
        processedItems: sidebarItems,
        hasGrouping: false
      };
    }
  }, [items]);

  // Only create group keys if we have grouping
  const groupKeys = React.useMemo(() => {
    if (!hasGrouping) return [];
    const keys: string[] = [];
    processedItems.forEach((item) => {
      if (isGroup(item)) {
        keys.push(item.key);
      }
    });
    return keys;
  }, [processedItems, hasGrouping]);

  // Persist open/closed per group (only if we have grouping)
  const { openMap, toggle } = usePersistentGroups(groupKeys);

  const location = useLocation();

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
              {/* Render items in their original order */}
              {processedItems.map((item, index) => {
                if (isGroup(item)) {
                  // Render group
                  const group = item as Group;
                  const anyChildActive = group.items.some((child) =>
                    matchPath(
                      { path: child.path, end: child.exact },
                      location.pathname
                    )
                  );
                  const persistedOpen = openMap[group.key] ?? index === 0;
                  const isOpen = anyChildActive || persistedOpen;

                  return (
                    <li
                      key={group.key}
                      className={cn(theme?.menuItem, classNames?.menuItem)}
                    >
                      <SidebarMenuButton
                        asChild
                        className={cn(
                          "flex w-full items-center gap-2 rounded-md transition-colors",
                          appliedItemText,
                          theme?.menuButton,
                          classNames?.menuButton
                        )}
                        data-state={isOpen ? "open" : "closed"}
                        aria-expanded={isOpen}
                      >
                        <button
                          type="button"
                          onClick={() => toggle(group.key)}
                          className={cn(
                            "group flex w-full items-center gap-2 px-2 py-1.5 hover:bg-foreground/5"
                          )}
                        >

                          
                          {/* Optional group icon */}
                          {group.icon && React.createElement(group.icon, { 
                            className: "size-4 shrink-0" 
                          })}
                          <span className="truncate">{group.label}</span>

                           {/* Chevron at front */}
                          <ChevronRight
                            className={cn(
                              "size-4 shrink-0 ml-auto transition-transform",
                              isOpen && "rotate-90"
                            )}
                          />
                        </button>
                      </SidebarMenuButton>

                      {state === "expanded" && isOpen && (
                        <ul
                          className={cn(
                            "mt-1 ml-2 border-l border-border/60 pl-3 space-y-0.5"
                          )}
                        >
                          {group.items.map((childItem) => (
                            <SidebarNavItem
                              key={childItem.title}
                              item={childItem}
                              appliedItemText={appliedItemText}
                              theme={theme}
                              classNames={classNames}
                            />
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                } else {
                  // Render direct item
                  const sidebarItem = item as SidebarItem;
                  return (
                    <SidebarNavItem
                      key={sidebarItem.title}
                      item={sidebarItem}
                      appliedItemText={appliedItemText}
                      theme={theme}
                      classNames={classNames}
                    />
                  );
                }
              })}
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





