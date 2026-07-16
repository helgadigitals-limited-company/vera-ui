"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryState } from "nuqs";

export type TabItem = {
  value: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  hidden?: boolean;
};

interface TabsContainerProps {
  /** Array of tab items to display */
  tabs: TabItem[];
  /** Default selected tab value */
  defaultTab?: string;
  /** Optional CSS classes */
  className?: string;
  /** URL parameter name for this tab group */
  urlParamName?: string;
  /** Control URL history behavior */
  historyMode?: "push" | "replace";
  /** Whether to use shallow routing */
  shallow?: boolean;
  /** Optional callback when tab changes */
  onTabChange?: (value: string) => void;
  /** Container height, defaults to 'calc(100vh-5rem)' */
  containerHeight?: string;
  /** Whether to persist tab state in URL */
  persistInUrl?: boolean;
  /** Whether tabs should take full width or be compact, defaults to 'compact' */
  tabsLayout?: "compact" | "full";
}

type TabsContainerInnerProps = Pick<
  TabsContainerProps,
  "tabs" | "className" | "containerHeight" | "tabsLayout"
> & {
  activeTab: string;
  onTabValueChange: (value: string) => void;
};

function TabsContainerInner({
  tabs,
  className,
  containerHeight = "calc(100vh-5rem)",
  tabsLayout = "compact",
  activeTab,
  onTabValueChange,
}: TabsContainerInnerProps) {
  const tabsListRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const checkForArrows = () => {
    if (!tabsListRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = tabsListRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    checkForArrows();
    const resizeObserver = new ResizeObserver(checkForArrows);
    if (tabsListRef.current) {
      resizeObserver.observe(tabsListRef.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  const scrollLeft = () => {
    if (!tabsListRef.current) return;
    tabsListRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (!tabsListRef.current) return;
    tabsListRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  const visibleTabs = tabs.filter((tab) => !tab.hidden);

  if (!visibleTabs.length) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No tabs available</p>
      </div>
    );
  }

  return (
    <section className="w-full h-full">
      <Tabs
        value={activeTab}
        onValueChange={onTabValueChange}
        className={cn("w-full", className)}
        style={{ height: containerHeight }}
      >
        <div className="border-b sticky top-0 bg-background z-10">
          {showLeftArrow && (
            <Button
              size="icon"
              variant="ghost"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full shadow-md bg-background/80 backdrop-blur-sm"
              onClick={scrollLeft}
              aria-label="Scroll tabs left"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}

          <div className="relative overflow-hidden">
            <TabsList
              ref={tabsListRef}
              className={cn(
                tabsLayout === "compact" ? "inline-flex" : "w-full",
                "justify-start bg-transparent gap-4 md:gap-8 overflow-x-auto scrollbar-hide px-2 md:px-0"
              )}
              onScroll={checkForArrows}
              style={{ scrollbarWidth: "none" }}
            >
              {visibleTabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  disabled={tab.disabled}
                  className={cn(
                    "relative py-3 transition-all duration-300 ease-in-out",
                    "data-[state=active]:bg-transparent",
                    "whitespace-nowrap flex-shrink-0",
                    "text-muted-foreground data-[state=active]:text-foreground",
                    "font-medium",
                    "hover:text-foreground/80 hover:scale-105"
                  )}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {showRightArrow && (
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full shadow-md bg-background/80 backdrop-blur-sm"
              onClick={scrollRight}
              aria-label="Scroll tabs right"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        {visibleTabs.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="h-[calc(100%-3rem)] mt-0 p-4 overflow-auto min-w-full"
          >
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

function UrlPersistedTabs({
  tabs,
  defaultTab,
  className,
  urlParamName = "tab",
  historyMode = "push",
  shallow = true,
  onTabChange,
  containerHeight = "calc(100vh-5rem)",
  tabsLayout = "compact",
}: TabsContainerProps) {
  const [urlTab, setUrlTab] = useQueryState(urlParamName, {
    shallow,
    history: historyMode,
    clearOnDefault: true,
    parse: (value) => {
      return tabs.some((tab) => tab.value === value)
        ? value
        : defaultTab || tabs[0]?.value || "";
    },
  });

  const activeTab = urlTab ?? defaultTab ?? tabs[0]?.value ?? "";

  const handleTabChange = (value: string) => {
    setUrlTab(value).catch(console.error);
    onTabChange?.(value);
  };

  return (
    <TabsContainerInner
      tabs={tabs}
      className={className}
      containerHeight={containerHeight}
      tabsLayout={tabsLayout}
      activeTab={activeTab}
      onTabValueChange={handleTabChange}
    />
  );
}

function LocalTabs({
  tabs,
  defaultTab,
  className,
  onTabChange,
  containerHeight = "calc(100vh-5rem)",
  tabsLayout = "compact",
}: TabsContainerProps) {
  const [localTab, setLocalTab] = useState(defaultTab || tabs[0]?.value || "");

  const handleTabChange = (value: string) => {
    setLocalTab(value);
    onTabChange?.(value);
  };

  return (
    <TabsContainerInner
      tabs={tabs}
      className={className}
      containerHeight={containerHeight}
      tabsLayout={tabsLayout}
      activeTab={localTab}
      onTabValueChange={handleTabChange}
    />
  );
}

export function TabsContainer({
  persistInUrl = true,
  ...props
}: TabsContainerProps) {
  return persistInUrl ? (
    <UrlPersistedTabs {...props} persistInUrl={persistInUrl} />
  ) : (
    <LocalTabs {...props} persistInUrl={persistInUrl} />
  );
}
