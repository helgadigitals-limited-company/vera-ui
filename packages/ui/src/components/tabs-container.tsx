'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useQueryState } from "nuqs"

export type TabItem = {
    value: string
    label: string
    content: React.ReactNode
    disabled?: boolean
    hidden?: boolean
}

interface TabsContainerProps {
    /** Array of tab items to display */
    tabs: TabItem[]
    /** Default selected tab value */
    defaultTab?: string
    /** Optional CSS classes */
    className?: string
    /** URL parameter name for this tab group */
    urlParamName?: string
    /** Control URL history behavior */
    historyMode?: 'push' | 'replace'
    /** Whether to use shallow routing */
    shallow?: boolean
    /** Optional callback when tab changes */
    onTabChange?: (value: string) => void
    /** Container height, defaults to 'calc(100vh-5rem)' */
    containerHeight?: string
    /** Whether to persist tab state in URL */
    persistInUrl?: boolean
}

export function TabsContainer({
    tabs,
    defaultTab,
    className,
    urlParamName = 'tab',
    historyMode = 'push',
    shallow = true,
    onTabChange,
    containerHeight = 'calc(100vh-5rem)',
    persistInUrl = true,
}: TabsContainerProps) {
    const tabsListRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);
    const [localTab, setLocalTab] = useState(defaultTab || tabs[0]?.value || '');

    // Only use nuqs if persistInUrl is true
    const [urlTab, setUrlTab] = useQueryState(
        urlParamName,
        {
            shallow,
            history: historyMode,
            clearOnDefault: true,
            parse: (value) => {
                // Validate that the parsed value is a valid tab
                return tabs.some(tab => tab.value === value) ? value : defaultTab || tabs[0]?.value || '';
            },
        }
    );

    // Use the default value directly in the component logic
    const activeTab = persistInUrl ? (urlTab ?? defaultTab ?? tabs[0]?.value ?? '') : localTab;

    const handleTabChange = (value: string) => {
        if (persistInUrl) {
            setUrlTab(value).catch(console.error);
        } else {
            setLocalTab(value);
        }
        onTabChange?.(value);
    };

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
        tabsListRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    };

    const scrollRight = () => {
        if (!tabsListRef.current) return;
        tabsListRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    };

    // Filter out hidden tabs
    const visibleTabs = tabs.filter(tab => !tab.hidden);

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
                onValueChange={handleTabChange}
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
                            className="w-full justify-start bg-transparent gap-4 md:gap-8 overflow-x-auto scrollbar-hide px-2 md:px-0"
                            onScroll={checkForArrows}
                            style={{ scrollbarWidth: 'none' }}
                        >
                            {visibleTabs.map((tab) => (
                                <TabsTrigger
                                    key={tab.value}
                                    value={tab.value}
                                    disabled={tab.disabled}
                                    className={cn(
                                        "relative py-3 transition-all",
                                        "data-[state=active]:bg-transparent",
                                        "whitespace-nowrap flex-shrink-0",
                                        "text-muted-foreground data-[state=active]:text-foreground",
                                        "font-medium",
                                        "border-b-2 border-transparent data-[state=active]:border-primary"
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