import type { ReactNode } from "react";
import { cn, splitStringByUnderscore } from "@/lib/utils";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import type { DataTableProps, StringKeys } from "./types";

interface DataTableHeaderProps<T> {
  actionsPlacement: "start" | "end";
  showActionsColumn: boolean;
  actionsColumnHeader: ReactNode;

  expandable: boolean;
  expandColumnHeader?: ReactNode;
  toggleExpandAll: () => void;
  allRowsExpanded: boolean;
  collapseIcon: ReactNode;
  expandIcon: ReactNode;

  selectable: boolean;
  selectionMode: "single" | "multiple";
  allFilteredSelected: boolean;
  someFilteredSelected: boolean;
  toggleSelectAllFiltered: () => void;
  maxSelections?: number;
  selectedRowIds: Array<string | number>;
  selectionColumnHeader?: ReactNode;

  visibleDataColumns: StringKeys<T>[];
  sortableColumns: StringKeys<T>[];
  manualSort: boolean;
  multiSort: boolean;
  effectiveSortState: Array<{ key: StringKeys<T>; direction: "asc" | "desc" }>;
  toggleSortForColumn: (col: StringKeys<T>, additive: boolean) => void;
  setSortForColumn: (col: StringKeys<T>, direction: "asc" | "desc" | null, additive: boolean) => void;
  customHeadRender?: DataTableProps<T>["customHeadRender"];

  showFilterRow: boolean;
  filterableColumns: StringKeys<T>[];
  effectiveColumnFilters: Partial<Record<StringKeys<T>, string>>;
  handleColumnFilterChange: (col: StringKeys<T>, value: string) => void;
}

export function DataTableHeader<T>({
  actionsPlacement,
  showActionsColumn,
  actionsColumnHeader,
  expandable,
  expandColumnHeader,
  toggleExpandAll,
  allRowsExpanded,
  collapseIcon,
  expandIcon,
  selectable,
  selectionMode,
  allFilteredSelected,
  someFilteredSelected,
  toggleSelectAllFiltered,
  maxSelections,
  selectedRowIds,
  selectionColumnHeader,
  visibleDataColumns,
  sortableColumns,
  manualSort,
  multiSort,
  effectiveSortState,
  toggleSortForColumn,
  setSortForColumn,
  customHeadRender,
  showFilterRow,
  filterableColumns,
  effectiveColumnFilters,
  handleColumnFilterChange,
}: DataTableHeaderProps<T>) {
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

  return (
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
  );
}
