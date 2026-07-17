/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Fragment, type ReactNode, useMemo } from "react";
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
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import type { DataTableProps, StringKeys } from "./data-table/types";
import { useDataTableSort } from "./data-table/use-data-table-sort";
import { useDataTableSelection } from "./data-table/use-data-table-selection";
import { useDataTableFilters } from "./data-table/use-data-table-filters";
import { useDataTableExpansion } from "./data-table/use-data-table-expansion";
import { DataTableLoading } from "./data-table/data-table-loading";

export type { DataTableProps, TableAction } from "./data-table/types";

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
    selectionMode = "multiple", // NEW: Default to multiple selection
    selectedRowIds = [],
    onSelectionChange,
    selectionColumnHeader,
    maxSelections, // NEW: Optional max selections
    onMaxSelectionsReached, // NEW: Callback for max selections

    actions,
    actionsRender,
    actionsColumnHeader = "Actions",
    actionsPlacement = "end",

    sortableColumns = [],
    multiSort = true,
    sortState,
    defaultSortState = [],
    onSortChange,
    sortFns = {} as Partial<Record<StringKeys<T>, (a: any, b: any) => number>>,
    manualSort = false,

    enableGlobalFilter = false,
    globalFilter,
    onGlobalFilterChange,
    globalFilterPlaceholder = "Search all columns...",
    globalFilterFn,
    filterableColumns = [],
    columnFilters,
    onColumnFiltersChange,
    columnFilterFns = {} as Partial<Record<StringKeys<T>, (cellValue: any, filterValue: string) => boolean>>,

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

  // ----- Sorting -----
  const { effectiveSortState, toggleSortForColumn, setSortForColumn, compareValues } =
    useDataTableSort<T>({
      sortState,
      defaultSortState,
      onSortChange,
      sortableColumns,
      multiSort,
      sortFns,
    });

  // Derive row ids
  const rowsWithId = useMemo(
    () =>
      (tableData || []).map((row, idx) => {
        const id = getRowId ? getRowId(row, idx) : idx;
        return { row, id };
      }),
    [tableData, getRowId]
  );

  const showActionsColumn =
    Boolean(actions && actions.length) || Boolean(actionsRender);

  // ----- Filtering -----
  const {
    effectiveGlobalFilter,
    effectiveColumnFilters,
    processedRows,
    filteredRowIds,
    handleGlobalFilterChange,
    handleColumnFilterChange,
  } = useDataTableFilters<T>({
    rowsWithId,
    visibleDataColumns,
    enableGlobalFilter,
    globalFilter,
    onGlobalFilterChange,
    globalFilterFn,
    columnFilters,
    onColumnFiltersChange,
    columnFilterFns,
    effectiveSortState,
    compareValues,
  });

  const {
    isRowSelected,
    toggleRowSelection,
    allFilteredSelected,
    someFilteredSelected,
    toggleSelectAllFiltered,
  } = useDataTableSelection({
    selectable,
    selectionMode,
    selectedRowIds,
    onSelectionChange,
    maxSelections,
    onMaxSelectionsReached,
    filteredRowIds,
  });

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
    if (!actions || actions.length === 0) return null;

    const visibleActions = actions.filter((a) => !(a.hidden && a.hidden(row)));
    
    if (visibleActions.length === 0) return null;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {visibleActions.map((a) => {
            const disabled = a.disabled ? a.disabled(row) : false;
            return (
              <DropdownMenuItem
                key={a.id}
                disabled={disabled}
                variant={a.variant as any}
                onClick={(e) => {
                  e.stopPropagation();
                  a.onClick(row);
                }}
                className="cursor-pointer"
              >
                {a.icon && (
                  <span className="mr-2 flex items-center">
                    {a.icon}
                  </span>
                )}
                {a.label}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  // ----- Expansion -----
  const {
    isRowExpanded,
    toggleRowExpansion,
    allRowsExpanded,
    toggleExpandAll,
    handleRowClick,
  } = useDataTableExpansion<T>({
    expandable,
    expandedRowIds,
    onExpandedRowsChange,
    defaultExpandedRowIds,
    expandOnRowClick,
    onRowClick,
    processedRows,
  });

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
      <DataTableLoading
        className={className}
        enableGlobalFilter={enableGlobalFilter}
        globalFilterPlaceholder={globalFilterPlaceholder}
        effectiveGlobalFilter={effectiveGlobalFilter}
        handleGlobalFilterChange={handleGlobalFilterChange}
        actionsPlacement={actionsPlacement}
        showActionsColumn={showActionsColumn}
        actionsColumnHeader={actionsColumnHeader}
        expandable={expandable}
        expandColumnHeader={expandColumnHeader}
        selectable={selectable}
        selectionColumnHeader={selectionColumnHeader}
        visibleDataColumns={visibleDataColumns}
        totalColumns={totalColumns}
        loadingComponent={loadingComponent}
      />
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

              {/* UPDATED: Selection header with single/multi mode support */}
              {selectable && (
                <TableHead className="w-8 text-center">
                  {selectionMode === "multiple" ? (
                    <input
                      type="checkbox"
                      aria-label="Select all rows"
                      checked={allFilteredSelected}
                      ref={(el) => {
                        if (el) el.indeterminate = someFilteredSelected;
                      }}
                      onChange={toggleSelectAllFiltered}
                      disabled={maxSelections ? selectedRowIds.length >= maxSelections && !allFilteredSelected : false}
                    />
                  ) : (
                    <span className="text-xs text-muted-foreground">Select</span>
                  )}
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
                <Fragment key={id}>
                  {/* Main row */}
                  <TableRow
                    data-row-id={id}
                    // NEW: expose selection state for styling and a11y
                    data-state={rowSelected ? "selected" : undefined}
                    aria-selected={rowSelected ? true : undefined}
                    className={cn(
                      // removed hardcoded bg; rely on attributes-based styling
                      expandOnRowClick && expandable && "cursor-pointer hover:bg-muted/50",
                      typeof rowClassName === "function" ? rowClassName(row) : rowClassName
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

                    {/* UPDATED: Selection cell with radio for single mode */}
                    {selectable && (
                      <TableCell
                        className="w-8 text-center"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type={selectionMode === "single" ? "radio" : "checkbox"}
                          name={selectionMode === "single" ? "table-selection" : undefined}
                          aria-label={selectionMode === "single" ? "Select row" : "Select row"}
                          checked={rowSelected}
                          onChange={() => toggleRowSelection(id)}
                          disabled={
                            selectionMode === "multiple" &&
                            maxSelections !== undefined &&
                            selectedRowIds.length >= maxSelections &&
                            !rowSelected
                          }
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
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

