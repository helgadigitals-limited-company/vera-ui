/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ReactNode, useCallback, useMemo, useState } from "react";
import { cn, splitStringByUnderscore } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type StringKeys<T> = Extract<keyof T, string>;

export interface TableAction<T> {
  id: string;
  label?: string;
  icon?: ReactNode;
  onClick: (row: T) => void;
  variant?: string;
  disabled?: (row: T) => boolean;
  hidden?: (row: T) => boolean;
}

export interface DataTableProps<T> {
  tableData: T[];
  tableColumns: StringKeys<T>[];
  excludeColumns?: StringKeys<T>[];

  // Display / styling
  className?: string;
  rowClassName?: string | ((row: T) => string);

  // Loading and empty states
  loading?: boolean;
  loadingComponent?: ReactNode;
  emptyStateComponent?: ReactNode;
  emptyMessage?: string;

  // Custom cell / header render
  customHeadRender?: (
    col: StringKeys<T>, 
    helpers?: {
      sortable: boolean;
      direction: "asc" | "desc" | null;
      index: number | null;
      toggle: (additive?: boolean) => void;
      set: (direction: "asc" | "desc" | null, additive?: boolean) => void;
    }
  ) => ReactNode | null | undefined;
  customBodyRender?: (
    rowData: T,
    col: StringKeys<T>
  ) => ReactNode | null | undefined;

  // Row click
  onRowClick?: (rowData: T) => void;

  // Row identity
  getRowId?: (row: T, index: number) => string | number;

  // Selection (controlled)
  selectable?: boolean;
  selectedRowIds?: Array<string | number>;
  onSelectionChange?: (ids: Array<string | number>) => void;
  selectionColumnHeader?: ReactNode;

  // Actions column
  actions?: TableAction<T>[];
  actionsRender?: (row: T) => ReactNode;
  actionsColumnHeader?: ReactNode;
  actionsPlacement?: "start" | "end";

  // Sorting
  sortableColumns?: StringKeys<T>[];
  multiSort?: boolean;
  sortState?: Array<{ key: StringKeys<T>; direction: "asc" | "desc" }>;
  defaultSortState?: Array<{ key: StringKeys<T>; direction: "asc" | "desc" }>;
  onSortChange?: (
    state: Array<{ key: StringKeys<T>; direction: "asc" | "desc" }>
  ) => void;
  sortFns?: Partial<Record<StringKeys<T>, (a: any, b: any) => number>>;
  manualSort?: boolean;

  // Filtering
  enableGlobalFilter?: boolean;
  globalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;
  globalFilterPlaceholder?: string;
  globalFilterFn?: (row: T, searchTerm: string) => boolean;
  
  filterableColumns?: StringKeys<T>[];
  columnFilters?: Partial<Record<StringKeys<T>, string>>;
  onColumnFiltersChange?: (filters: Partial<Record<StringKeys<T>, string>>) => void;
  columnFilterFns?: Partial<Record<StringKeys<T>, (cellValue: any, filterValue: string) => boolean>>;

  // Row Expansion
  expandable?: boolean;
  expandedRowIds?: Array<string | number>;
  onExpandedRowsChange?: (ids: Array<string | number>) => void;
  defaultExpandedRowIds?: Array<string | number>;
  expandedContent?: (row: T) => ReactNode;
  expandOnRowClick?: boolean; // expand row when clicked (default: false)
  expandIcon?: ReactNode;
  collapseIcon?: ReactNode;
  expandColumnHeader?: ReactNode;
}

// Simple Input component (if not available from UI library)
const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cn(
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
);

// Default loading component
const DefaultLoadingComponent = () => (
  <div className="flex items-center justify-center py-16">
    <div className="flex items-center gap-2 text-muted-foreground">
      <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
      <span>Loading...</span>
    </div>
  </div>
);

// Default empty state component
const DefaultEmptyStateComponent = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="text-muted-foreground mb-2">
      <svg
        className="w-12 h-12 mx-auto mb-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    </div>
    <p className="text-lg font-medium text-gray-900 mb-1">No data found</p>
    <p className="text-sm text-muted-foreground">{message}</p>
  </div>
);

export const DataTable = <T extends Record<string, any>>(
  props: DataTableProps<T>
) => {
  const {
    tableColumns = [],
    tableData = [],
    excludeColumns = [],
    className,
    rowClassName = "",
    
    // Loading and empty states
    loading = false,
    loadingComponent,
    emptyStateComponent,
    emptyMessage = "No data available to display",
    
    customHeadRender,
    customBodyRender,
    onRowClick,

    getRowId,
    selectable = false,
    selectedRowIds = [],
    onSelectionChange,
    selectionColumnHeader,

    actions,
    actionsRender,
    actionsColumnHeader = "Actions",
    actionsPlacement = "end",

    sortableColumns = [],
    multiSort = true,
    sortState,
    defaultSortState = [],
    onSortChange,
    // Ensure the default empty object is correctly typed
    sortFns = {} as Partial<Record<StringKeys<T>, (a: any, b: any) => number>>,
    manualSort = false,

    // Filtering
    enableGlobalFilter = false,
    globalFilter,
    onGlobalFilterChange,
    globalFilterPlaceholder = "Search all columns...",
    globalFilterFn,
    filterableColumns = [],
    columnFilters,
    onColumnFiltersChange,
    columnFilterFns = {} as Partial<Record<StringKeys<T>, (cellValue: any, filterValue: string) => boolean>>,

    // Row Expansion
    expandable = false,
    expandedRowIds,
    onExpandedRowsChange,
    defaultExpandedRowIds = [],
    expandedContent,
    expandOnRowClick = false,
    expandIcon = "▶",
    collapseIcon = "▼",
    expandColumnHeader,
  } = props;

  // Filter visible data columns
  const visibleDataColumns = useMemo(
    () => (tableColumns || []).filter((c) => !excludeColumns.includes(c)),
    [tableColumns, excludeColumns]
  );

  // Internal filter states
  const [internalGlobalFilter, setInternalGlobalFilter] = useState("");
  const [internalColumnFilters, setInternalColumnFilters] = useState<Partial<Record<StringKeys<T>, string>>>({});
  
  const effectiveGlobalFilter = globalFilter ?? internalGlobalFilter;
  const effectiveColumnFilters = columnFilters ?? internalColumnFilters;

  // ----- Sorting -----
  type SortRule = { key: StringKeys<T>; direction: "asc" | "desc" };
  const [internalSortState, setInternalSortState] =
    useState<SortRule[]>(defaultSortState);
  const effectiveSortState = sortState ?? internalSortState;

  const applySortChange = useCallback(
    (next: SortRule[]) => {
      if (onSortChange) onSortChange(next);
      if (!sortState) setInternalSortState(next);
    },
    [onSortChange, sortState]
  );

  const toggleSortForColumn = useCallback(
    (col: StringKeys<T>, additive: boolean) => {
      if (!sortableColumns.includes(col)) return;
      const existing = effectiveSortState.find((r) => r.key === col);
      let next: SortRule[] = [];
      if (additive && multiSort) {
        next = [...effectiveSortState];
        if (!existing) {
          next.push({ key: col, direction: "asc" });
        } else if (existing.direction === "asc") {
          existing.direction = "desc";
          next = [...next];
        } else {
          next = next.filter((r) => r.key !== col);
        }
      } else {
        if (!existing) {
          next = [{ key: col, direction: "asc" }];
        } else if (existing.direction === "asc") {
          next = [{ key: col, direction: "desc" }];
        } else {
          next = [];
        }
      }
      applySortChange(next);
    },
    [effectiveSortState, sortableColumns, multiSort, applySortChange]
  );

  const setSortForColumn = useCallback(
    (col: StringKeys<T>, direction: "asc" | "desc" | null, additive: boolean) => {
      if (!sortableColumns.includes(col)) return;
      let next: SortRule[] = [];
      const multi = additive && multiSort;
      if (!multi) {
        if (direction == null) {
          next = [];
        } else {
          next = [{ key: col, direction }];
        }
      } else {
        next = [...effectiveSortState];
        const existing = next.find((r) => r.key === col);
        if (direction == null) {
          next = next.filter((r) => r.key !== col);
        } else if (!existing) {
          next.push({ key: col, direction });
        } else {
          existing.direction = direction;
          next = [...next];
        }
      }
      applySortChange(next);
    },
    [effectiveSortState, sortableColumns, multiSort, applySortChange]
  );

  const compareValues = useCallback(
    (a: T, b: T, col: StringKeys<T>) => {
      const custom = sortFns[col];
      if (custom) return custom(a, b);
      // Cast to any so instanceof is allowed even if the inferred property type is primitive
      const av = a?.[col] as any;
      const bv = b?.[col] as any;
      if (av == null && bv == null) return 0;
      if (av == null) return -1;
      if (bv == null) return 1;
      if (typeof av === "number" && typeof bv === "number") return av - bv;
      if (av instanceof Date && bv instanceof Date) return av.getTime() - bv.getTime();
      const astr = String(av).toLowerCase();
      const bstr = String(bv).toLowerCase();
      if (astr < bstr) return -1;
      if (astr > bstr) return 1;
      return 0;
    },
    [sortFns]
  );

  // Derive row ids
  const rowsWithId = useMemo(
    () =>
      (tableData || []).map((row, idx) => {
        const id = getRowId ? getRowId(row, idx) : idx;
        return { row, id };
      }),
    [tableData, getRowId]
  );

  const isRowSelected = useCallback(
    (id: string | number) => selectedRowIds.includes(id),
    [selectedRowIds]
  );

  const toggleRowSelection = useCallback(
    (id: string | number) => {
      if (!onSelectionChange) return;
      const next = isRowSelected(id)
        ? selectedRowIds.filter((x) => x !== id)
        : [...selectedRowIds, id];
      onSelectionChange(next);
    },
    [onSelectionChange, isRowSelected, selectedRowIds]
  );

  const showActionsColumn =
    Boolean(actions && actions.length) || Boolean(actionsRender);

  // ----- Filtering -----
  const defaultGlobalFilterFn = useCallback(
    (row: T, searchTerm: string): boolean => {
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      
      return visibleDataColumns.some((col) => {
        const value = row[col];
        if (value == null) return false;
        
        // Handle arrays (like skills) by joining them
        if (Array.isArray(value)) {
          return value.join(", ").toLowerCase().includes(term);
        }
        
        // Convert to string and search
        return String(value).toLowerCase().includes(term);
      });
    },
    [visibleDataColumns]
  );

  const defaultColumnFilterFn = useCallback(
    (cellValue: any, filterValue: string): boolean => {
      if (!filterValue.trim()) return true;
      if (cellValue == null) return false;
      
      const term = filterValue.toLowerCase();
      
      // Handle arrays by joining
      if (Array.isArray(cellValue)) {
        return cellValue.join(", ").toLowerCase().includes(term);
      }
      
      return String(cellValue).toLowerCase().includes(term);
    },
    []
  );

  // Apply filters and sort
  const processedRows = useMemo(() => {
    let filtered = [...rowsWithId];

    // Apply global filter
    if (enableGlobalFilter && effectiveGlobalFilter.trim()) {
      const filterFn = globalFilterFn || defaultGlobalFilterFn;
      filtered = filtered.filter(({ row }) => filterFn(row, effectiveGlobalFilter));
    }

    // Apply column filters
    const activeColumnFilters = Object.entries(effectiveColumnFilters).filter(
      ([, value]) => value && String(value).trim()
    );
    
    if (activeColumnFilters.length > 0) {
      filtered = filtered.filter(({ row }) => {
        return activeColumnFilters.every(([col, filterValue]) => {
          const customFn = columnFilterFns[col as StringKeys<T>];
          if (customFn) {
            return customFn(row[col as StringKeys<T>], String(filterValue));
          }
          return defaultColumnFilterFn(row[col as StringKeys<T>], String(filterValue));
        });
      });
    }

    // Apply sorting
    if (!effectiveSortState.length) return filtered;
    
    const sorted = [...filtered].sort((a, b) => {
      for (const rule of effectiveSortState) {
        const cmp = compareValues(a.row, b.row, rule.key);
        if (cmp !== 0) {
          return rule.direction === "asc" ? cmp : -cmp;
        }
      }
      return 0;
    });
    return sorted;
  }, [
    rowsWithId,
    enableGlobalFilter,
    effectiveGlobalFilter,
    globalFilterFn,
    defaultGlobalFilterFn,
    effectiveColumnFilters,
    columnFilterFns,
    defaultColumnFilterFn,
    effectiveSortState,
    compareValues
  ]);

  // Update selection logic to work with filtered data
  const filteredRowIds = useMemo(
    () => processedRows.map((r) => r.id),
    [processedRows]
  );

  const allFilteredSelected =
    selectable &&
    filteredRowIds.length > 0 &&
    filteredRowIds.every((id) => selectedRowIds.includes(id));

  const someFilteredSelected =
    selectable &&
    !allFilteredSelected &&
    filteredRowIds.some((id) => selectedRowIds.includes(id));

  const toggleSelectAllFiltered = useCallback(() => {
    if (!onSelectionChange) return;
    if (allFilteredSelected) {
      onSelectionChange(
        selectedRowIds.filter((id) => !filteredRowIds.includes(id))
      );
    } else {
      const set = new Set([...selectedRowIds, ...filteredRowIds]);
      onSelectionChange(Array.from(set));
    }
  }, [onSelectionChange, allFilteredSelected, selectedRowIds, filteredRowIds]);

  // Filter change handlers
  const handleGlobalFilterChange = useCallback(
    (value: string) => {
      if (onGlobalFilterChange) {
        onGlobalFilterChange(value);
      } else {
        setInternalGlobalFilter(value);
      }
    },
    [onGlobalFilterChange]
  );

  const handleColumnFilterChange = useCallback(
    (col: StringKeys<T>, value: string) => {
      const next = { ...effectiveColumnFilters, [col]: value };
      if (onColumnFiltersChange) {
        onColumnFiltersChange(next);
      } else {
        setInternalColumnFilters(next);
      }
    },
    [effectiveColumnFilters, onColumnFiltersChange]
  );

  const getSortMeta = (col: StringKeys<T>) => {
    const idx = effectiveSortState.findIndex((r) => r.key === col);
    if (idx === -1) {
      return { direction: null as null, index: null as number | null };
    }
    return {
      direction: effectiveSortState[idx].direction,
      index: idx,
    };
  };

  const renderHeaderContent = (col: StringKeys<T>): ReactNode => {
    const sortable = sortableColumns.includes(col);
    const { direction, index } = getSortMeta(col);
    const helpers = {
      sortable,
      direction,
      index,
      toggle: (additive?: boolean) =>
        toggleSortForColumn(col, Boolean(additive)),
      set: (dir: "asc" | "desc" | null, additive?: boolean) =>
        setSortForColumn(col, dir, Boolean(additive)),
    };

    if (customHeadRender) {
      const result = customHeadRender(col, helpers);
      return result ?? splitStringByUnderscore(col);
    }

    if (manualSort && sortable) {
      return (
        <div className="flex items-center gap-1">
          <span>{splitStringByUnderscore(col)}</span>
          <div className="flex items-center">
            <button
              type="button"
              className={cn(
                "text-xs px-1 py-0.5 rounded hover:bg-gray-100",
                direction === "asc" ? "bg-blue-100 text-blue-600" : "text-gray-400"
              )}
              onClick={(e) => {
                e.stopPropagation();
                helpers.set("asc", e.shiftKey);
              }}
              title="Sort ascending"
            >
              ▲
            </button>
            <button
              type="button"
              className={cn(
                "text-xs px-1 py-0.5 rounded hover:bg-gray-100",
                direction === "desc" ? "bg-blue-100 text-blue-600" : "text-gray-400"
              )}
              onClick={(e) => {
                e.stopPropagation();
                helpers.set("desc", e.shiftKey);
              }}
              title="Sort descending"
            >
              ▼
            </button>
            {direction && (
              <button
                type="button"
                className="text-xs px-1 py-0.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                onClick={(e) => {
                  e.stopPropagation();
                  helpers.set(null, e.shiftKey);
                }}
                title="Clear sort"
              >
                ✕
              </button>
            )}
            {multiSort && index !== null && effectiveSortState.length > 1 && (
              <span className="text-[10px] ml-1 opacity-60 bg-gray-200 px-1 rounded">
                {index + 1}
              </span>
            )}
          </div>
        </div>
      );
    }

    return splitStringByUnderscore(col);
  };

  const renderBodyCell = (row: T, col: StringKeys<T>) => {
    const renderedContent = customBodyRender ? customBodyRender(row, col) : null;
    return renderedContent ?? (row[col] as ReactNode);
  };

  const renderActionsCell = (row: T) => {
    if (actionsRender) return actionsRender(row);
    if (!actions) return null;
    return (
      <div className="flex items-center gap-2">
        {actions
          .filter((a) => !(a.hidden && a.hidden(row)))
          .map((a) => {
            const disabled = a.disabled ? a.disabled(row) : false;
            return (
              <Button
                key={a.id}
                variant={a.variant as any}
                size="sm"
                disabled={disabled}
                onClick={(e) => {
                  e.stopPropagation();
                  a.onClick(row);
                }}
              >
                {a.icon ? (
                  <span className="flex items-center gap-1">
                    {a.icon}
                    {a.label && <span>{a.label}</span>}
                  </span>
                ) : (
                  a.label
                )}
              </Button>
            );
          })}
      </div>
    );
  };

  // ----- Expansion -----
  const [internalExpandedRowIds, setInternalExpandedRowIds] = useState<Array<string | number>>(defaultExpandedRowIds);
  const effectiveExpandedRowIds = expandedRowIds ?? internalExpandedRowIds;

  const isRowExpanded = useCallback(
    (id: string | number) => effectiveExpandedRowIds.includes(id),
    [effectiveExpandedRowIds]
  );

  const toggleRowExpansion = useCallback(
    (id: string | number) => {
      const next = isRowExpanded(id)
        ? effectiveExpandedRowIds.filter((x) => x !== id)
        : [...effectiveExpandedRowIds, id];
      
      if (onExpandedRowsChange) {
        onExpandedRowsChange(next);
      } else {
        setInternalExpandedRowIds(next);
      }
    },
    [isRowExpanded, effectiveExpandedRowIds, onExpandedRowsChange]
  );

  const expandAll = useCallback(() => {
    const allIds = processedRows.map(r => r.id);
    if (onExpandedRowsChange) {
      onExpandedRowsChange(allIds);
    } else {
      setInternalExpandedRowIds(allIds);
    }
  }, [processedRows, onExpandedRowsChange]);

  const collapseAll = useCallback(() => {
    if (onExpandedRowsChange) {
      onExpandedRowsChange([]);
    } else {
      setInternalExpandedRowIds([]);
    }
  }, [onExpandedRowsChange]);

  const allRowsExpanded = useMemo(
    () => expandable && processedRows.length > 0 && processedRows.every(r => effectiveExpandedRowIds.includes(r.id)),
    [expandable, processedRows, effectiveExpandedRowIds]
  );

  const toggleExpandAll = useCallback(() => {
    if (allRowsExpanded) {
      collapseAll();
    } else {
      expandAll();
    }
  }, [allRowsExpanded, collapseAll, expandAll]);

  const handleRowClick = useCallback(
    (row: T, id: string | number) => {
      if (expandOnRowClick && expandable) {
        toggleRowExpansion(id);
      }
      if (onRowClick) onRowClick(row);
    },
    [onRowClick, expandOnRowClick, expandable, toggleRowExpansion]
  );

  // Calculate total columns for expansion row colspan
  const totalColumns = useMemo(() => {
    let count = visibleDataColumns.length;
    if (selectable) count++;
    if (showActionsColumn) count++;
    if (expandable) count++;
    return count;
  }, [visibleDataColumns.length, selectable, showActionsColumn, expandable]);

  const showFilterRow = filterableColumns.length > 0;

  // Show loading state
  if (loading) {
    return (
      <div className={cn("relative w-full", className)}>
        {enableGlobalFilter && (
          <div className="mb-4">
            <Input
              placeholder={globalFilterPlaceholder}
              value={effectiveGlobalFilter}
              onChange={(e) => handleGlobalFilterChange(e.target.value)}
              className="max-w-sm"
              disabled
            />
          </div>
        )}
        
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                {actionsPlacement === "start" && showActionsColumn && (
                  <TableHead className="whitespace-nowrap">
                    {actionsColumnHeader}
                  </TableHead>
                )}

                {expandable && (
                  <TableHead className="w-12 text-center">
                    {expandColumnHeader || ""}
                  </TableHead>
                )}

                {selectable && (
                  <TableHead className="w-8 text-center">
                    {selectionColumnHeader}
                  </TableHead>
                )}

                {visibleDataColumns.map((col) => (
                  <TableHead key={col} className="whitespace-nowrap first-letter:capitalize">
                    {splitStringByUnderscore(col)}
                  </TableHead>
                ))}

                {actionsPlacement === "end" && showActionsColumn && (
                  <TableHead className="whitespace-nowrap">
                    {actionsColumnHeader}
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell colSpan={totalColumns} className="h-64">
                  {loadingComponent || <DefaultLoadingComponent />}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  // Show empty state when no data after filtering
  if (processedRows.length === 0) {
    return (
      <div className={cn("relative w-full", className)}>
        {enableGlobalFilter && (
          <div className="mb-4">
            <Input
              placeholder={globalFilterPlaceholder}
              value={effectiveGlobalFilter}
              onChange={(e) => handleGlobalFilterChange(e.target.value)}
              className="max-w-sm"
            />
          </div>
        )}
        
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted">
                {actionsPlacement === "start" && showActionsColumn && (
                  <TableHead className="whitespace-nowrap">
                    {actionsColumnHeader}
                  </TableHead>
                )}

                {expandable && (
                  <TableHead className="w-12 text-center">
                    {expandColumnHeader || ""}
                  </TableHead>
                )}

                {selectable && (
                  <TableHead className="w-8 text-center">
                    {selectionColumnHeader}
                  </TableHead>
                )}

                {visibleDataColumns.map((col) => (
                  <TableHead key={col} className="whitespace-nowrap first-letter:capitalize">
                    {splitStringByUnderscore(col)}
                  </TableHead>
                ))}

                {actionsPlacement === "end" && showActionsColumn && (
                  <TableHead className="whitespace-nowrap">
                    {actionsColumnHeader}
                  </TableHead>
                )}
              </TableRow>

              {showFilterRow && (
                <TableRow>
                  {actionsPlacement === "start" && showActionsColumn && (
                    <TableHead className="py-2">
                      <div className="h-8"></div>
                    </TableHead>
                  )}

                  {expandable && (
                    <TableHead className="py-2">
                      <div className="h-8"></div>
                    </TableHead>
                  )}

                  {selectable && (
                    <TableHead className="py-2">
                      <div className="h-8"></div>
                    </TableHead>
                  )}

                  {visibleDataColumns.map((col) => {
                    const filterable = filterableColumns.includes(col);
                    return (
                      <TableHead key={col} className="py-2">
                        {filterable ? (
                          <Input
                            placeholder={`Filter ${splitStringByUnderscore(col)}...`}
                            value={effectiveColumnFilters[col] || ""}
                            onChange={(e) => handleColumnFilterChange(col, e.target.value)}
                            className="h-8 text-xs"
                          />
                        ) : (
                          <div className="h-8"></div>
                        )}
                      </TableHead>
                    );
                  })}

                  {actionsPlacement === "end" && showActionsColumn && (
                    <TableHead className="py-2">
                      <div className="h-8"></div>
                    </TableHead>
                  )}
                </TableRow>
              )}
            </TableHeader>

            <TableBody>
              <TableRow>
                <TableCell colSpan={totalColumns} className="h-64">
                  {emptyStateComponent || <DefaultEmptyStateComponent message={emptyMessage} />}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative w-full", className)}>
      {enableGlobalFilter && (
        <div className="mb-4">
          <Input
            placeholder={globalFilterPlaceholder}
            value={effectiveGlobalFilter}
            onChange={(e) => handleGlobalFilterChange(e.target.value)}
            className="max-w-sm"
          />
        </div>
      )}
      
      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              {actionsPlacement === "start" && showActionsColumn && (
                <TableHead className="whitespace-nowrap">
                  {actionsColumnHeader}
                </TableHead>
              )}

              {expandable && (
                <TableHead className="w-12 text-center">
                  {expandColumnHeader || (
                    <button
                      type="button"
                      onClick={toggleExpandAll}
                      className="p-1 hover:bg-gray-100 rounded text-xs"
                      title={allRowsExpanded ? "Collapse all" : "Expand all"}
                    >
                      {allRowsExpanded ? collapseIcon : expandIcon}
                    </button>
                  )}
                </TableHead>
              )}

              {selectable && (
                <TableHead className="w-8 text-center">
                  <input
                    type="checkbox"
                    aria-label="Select all rows"
                    checked={allFilteredSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = someFilteredSelected;
                    }}
                    onChange={toggleSelectAllFiltered}
                  />
                  {selectionColumnHeader}
                </TableHead>
              )}

              {visibleDataColumns.map((col) => {
                const sortable = sortableColumns.includes(col);
                return (
                  <TableHead
                    key={col}
                    className={cn(
                      "whitespace-nowrap first-letter:capitalize",
                      sortable && !manualSort && "cursor-pointer select-none"
                    )}
                    onClick={(e) => {
                      if (!sortable || manualSort) return;
                      const additive = e.shiftKey;
                      toggleSortForColumn(col, additive);
                    }}
                  >
                    {renderHeaderContent(col)}
                  </TableHead>
                );
              })}

              {actionsPlacement === "end" && showActionsColumn && (
                <TableHead className="whitespace-nowrap">
                  {actionsColumnHeader}
                </TableHead>
              )}
            </TableRow>

            {/* Filter row */}
            {showFilterRow && (
              <TableRow>
                {actionsPlacement === "start" && showActionsColumn && (
                  <TableHead className="py-2">
                    <div className="h-8"></div>
                  </TableHead>
                )}

                {expandable && (
                  <TableHead className="py-2">
                    <div className="h-8"></div>
                  </TableHead>
                )}

                {selectable && (
                  <TableHead className="py-2">
                    <div className="h-8"></div>
                  </TableHead>
                )}

                {visibleDataColumns.map((col) => {
                  const filterable = filterableColumns.includes(col);
                  return (
                    <TableHead key={col} className="py-2">
                      {filterable ? (
                        <Input
                          placeholder={`Filter ${splitStringByUnderscore(col)}...`}
                          value={effectiveColumnFilters[col] || ""}
                          onChange={(e) => handleColumnFilterChange(col, e.target.value)}
                          className="h-8 text-xs"
                        />
                      ) : (
                        <div className="h-8"></div>
                      )}
                    </TableHead>
                  );
                })}

                {actionsPlacement === "end" && showActionsColumn && (
                  <TableHead className="py-2">
                    <div className="h-8"></div>
                  </TableHead>
                )}
              </TableRow>
            )}
          </TableHeader>

          <TableBody>
            {processedRows.map(({ row, id }) => {
              const rowSelected = selectable && isRowSelected(id);
              const rowExpanded = expandable && isRowExpanded(id);
              
              return (
                <>
                  {/* Main row */}
                  <TableRow
                    key={id}
                    data-row-id={id}
                    className={cn(
                      rowSelected && "bg-slate-50",
                      expandOnRowClick && expandable && "cursor-pointer hover:bg-gray-50",
                      typeof rowClassName === "function"
                        ? rowClassName(row)
                        : rowClassName
                    )}
                    onClick={() => handleRowClick(row, id)}
                  >
                    {actionsPlacement === "start" && showActionsColumn && (
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        {renderActionsCell(row)}
                      </TableCell>
                    )}

                    {expandable && (
                      <TableCell 
                        className="w-12 text-center"
                        onClick={(e) => {
                          if (!expandOnRowClick) {
                            e.stopPropagation();
                            toggleRowExpansion(id);
                          }
                        }}
                      >
                        <button
                          type="button"
                          className="p-1 hover:bg-gray-100 rounded text-sm"
                          aria-label={rowExpanded ? "Collapse row" : "Expand row"}
                        >
                          {rowExpanded ? collapseIcon : expandIcon}
                        </button>
                      </TableCell>
                    )}

                    {selectable && (
                      <TableCell
                        className="w-8 text-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          aria-label="Select row"
                          checked={rowSelected}
                          onChange={() => toggleRowSelection(id)}
                        />
                      </TableCell>
                    )}

                    {visibleDataColumns.map((col) => (
                      <TableCell key={col} className="whitespace-nowrap">
                        {renderBodyCell(row, col)}
                      </TableCell>
                    ))}

                    {actionsPlacement === "end" && showActionsColumn && (
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        {renderActionsCell(row)}
                      </TableCell>
                    )}
                  </TableRow>

                  {/* Expanded content row */}
                  {expandable && rowExpanded && expandedContent && (
                    <TableRow key={`${id}-expanded`}>
                      <TableCell 
                        colSpan={totalColumns}
                        className="bg-gray-50 border-t-0 py-4"
                      >
                        {expandedContent(row)}
                      </TableCell>
                    </TableRow>
                  )}
                </>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

