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
import { DataTableEmpty } from "./data-table/data-table-empty";
import { DataTableHeader } from "./data-table/data-table-header";

export type { DataTableProps, TableAction } from "./data-table/types";

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
      <DataTableEmpty<T>
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
        showFilterRow={showFilterRow}
        filterableColumns={filterableColumns}
        effectiveColumnFilters={effectiveColumnFilters}
        handleColumnFilterChange={handleColumnFilterChange}
        totalColumns={totalColumns}
        emptyStateComponent={emptyStateComponent}
        emptyMessage={emptyMessage}
      />
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
          <DataTableHeader<T>
            actionsPlacement={actionsPlacement}
            showActionsColumn={showActionsColumn}
            actionsColumnHeader={actionsColumnHeader}
            expandable={expandable}
            expandColumnHeader={expandColumnHeader}
            toggleExpandAll={toggleExpandAll}
            allRowsExpanded={allRowsExpanded}
            collapseIcon={collapseIcon}
            expandIcon={expandIcon}
            selectable={selectable}
            selectionMode={selectionMode}
            allFilteredSelected={allFilteredSelected}
            someFilteredSelected={someFilteredSelected}
            toggleSelectAllFiltered={toggleSelectAllFiltered}
            maxSelections={maxSelections}
            selectedRowIds={selectedRowIds}
            selectionColumnHeader={selectionColumnHeader}
            visibleDataColumns={visibleDataColumns}
            sortableColumns={sortableColumns}
            manualSort={manualSort}
            multiSort={multiSort}
            effectiveSortState={effectiveSortState}
            toggleSortForColumn={toggleSortForColumn}
            setSortForColumn={setSortForColumn}
            customHeadRender={customHeadRender}
            showFilterRow={showFilterRow}
            filterableColumns={filterableColumns}
            effectiveColumnFilters={effectiveColumnFilters}
            handleColumnFilterChange={handleColumnFilterChange}
          />

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

