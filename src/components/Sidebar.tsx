// TODO: Enhance sidebar to accept mixed arrays of SidebarItems and Groups in a single array
// This would allow more flexible data structures like:
// items: [
//   { title: "Home", path: "/", icon: Home },  // Direct SidebarItem
//   {                                          // Group
//     key: "admin", 
//     label: "Administration", 
//     items: [
//       { title: "Users", path: "/users", icon: Users },
//       { title: "Settings", path: "/settings", icon: Settings }
//     ]
//   },
//   { title: "Profile", path: "/profile", icon: User }  // Another direct SidebarItem
// ]

import { User, ChevronRight } from "lucide-react";
import { cn, isGroupArray, isMixedArray } from "@/lib/utils";
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

  // Enhanced processing logic to handle mixed arrays
  const { groups, hasGrouping, directItems } = React.useMemo(() => {
    if (isMixedArray(items)) {
      // Handle mixed array: both groups and individual items
      const mixedItems = items as MixedSidebarItem[];
      const extractedGroups: Group[] = [];
      const extractedDirectItems: SidebarItem[] = [];
      
      mixedItems.forEach((item) => {
        if (isGroup(item)) {
          extractedGroups.push(item);
        } else if (isSidebarItem(item)) {
          extractedDirectItems.push(item);
        }
      });
      
      return {
        groups: extractedGroups,
        hasGrouping: extractedGroups.length > 0,
        directItems: extractedDirectItems
      };
    } else if (isGroupArray(items)) {
      // Items are already groups - use as-is
      const processedGroups = items as Group[];
      return {
        groups: processedGroups,
        hasGrouping: true,
        directItems: []
      };
    } else {
      // Items are SidebarItem[] - render directly without grouping
      const sidebarItems = items as SidebarItem[];
      
      return {
        groups: [],
        hasGrouping: false,
        directItems: sidebarItems
      };
    }
  }, [items]);

  // Only create group keys if we have grouping
  const groupKeys = React.useMemo(() => {
    if (!hasGrouping) return [];
    const keys = groups.map((g) => g.key);
    return keys;
  }, [groups, hasGrouping]);

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
              {/* Render direct items at the top level (for both pure direct items and mixed content) */}
              {directItems.map((item) => (
                <SidebarNavItem
                  key={item.title}
                  item={item}
                  appliedItemText={appliedItemText}
                  theme={theme}
                  classNames={classNames}
                />
              ))}

              {/* Render grouped items with collapsible groups */}
              {hasGrouping &&
                groups.map((group, idx) => {
                  // Group open logic: force-open if a child active
                  const anyChildActive = group.items.some((child) =>
                    matchPath(
                      { path: child.path, end: child.exact },
                      location.pathname
                    )
                  );
                  const persistedOpen = openMap[group.key] ?? idx === 0;
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
                          <ChevronRight
                            className={cn(
                              "ml-0.5 size-4 shrink-0 transition-transform",
                              isOpen && "rotate-90"
                            )}
                          />
                          <span className="truncate">{group.label}</span>
                        </button>
                      </SidebarMenuButton>

                      {state === "expanded" && isOpen && (
                        <ul
                          className={cn(
                            "mt-1 ml-2 border-l border-border/60 pl-3 space-y-0.5"
                          )}
                        >
                          {group.items.map((item) => (
                            <SidebarNavItem
                              key={item.title}
                              item={item}
                              appliedItemText={appliedItemText}
                              theme={theme}
                              classNames={classNames}
                            />
                          ))}
                        </ul>
                      )}
                    </li>
                  );
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





// eslint-disable-next-line react-refresh/only-export-components
export function isGroup(item: SidebarItem | Group): item is Group {
  return (
    typeof item === 'object' &&
    item !== null &&
    'key' in item &&
    'label' in item &&
    'items' in item &&
    Array.isArray((item as Group).items)
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function isSidebarItem(item: SidebarItem | Group): item is SidebarItem {
  return (
    typeof item === 'object' &&
    item !== null &&
    'title' in item &&
    'path' in item &&
    'icon' in item
  );
}
