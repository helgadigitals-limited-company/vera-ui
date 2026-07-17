/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import type { DataTableProps, StringKeys } from "./data-table/types";
import { useDataTableSort } from "./data-table/use-data-table-sort";
import { useDataTableSelection } from "./data-table/use-data-table-selection";
import { useDataTableFilters } from "./data-table/use-data-table-filters";
import { useDataTableExpansion } from "./data-table/use-data-table-expansion";
import { DataTableLoading } from "./data-table/data-table-loading";
import { DataTableEmpty } from "./data-table/data-table-empty";
import { DataTableHeader } from "./data-table/data-table-header";
import { DataTableRow } from "./data-table/data-table-row";

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
            {processedRows.map(({ row, id }) => (
              <DataTableRow<T>
                key={id}
                row={row}
                id={id}
                rowClassName={rowClassName}
                expandable={expandable}
                expandOnRowClick={expandOnRowClick}
                isRowExpanded={isRowExpanded}
                toggleRowExpansion={toggleRowExpansion}
                collapseIcon={collapseIcon}
                expandIcon={expandIcon}
                expandedContent={expandedContent}
                selectable={selectable}
                selectionMode={selectionMode}
                isRowSelected={isRowSelected}
                toggleRowSelection={toggleRowSelection}
                maxSelections={maxSelections}
                selectedRowIds={selectedRowIds}
                handleRowClick={handleRowClick}
                actionsPlacement={actionsPlacement}
                showActionsColumn={showActionsColumn}
                actionsRender={actionsRender}
                actions={actions}
                visibleDataColumns={visibleDataColumns}
                customBodyRender={customBodyRender}
                totalColumns={totalColumns}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

