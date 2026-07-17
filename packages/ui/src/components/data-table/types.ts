/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from "react";

export type StringKeys<T> = Extract<keyof T, string>;

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
  selectionMode?: "single" | "multiple"; // NEW: Selection mode
  selectedRowIds?: Array<string | number>;
  onSelectionChange?: (ids: Array<string | number>) => void;
  selectionColumnHeader?: ReactNode;
  maxSelections?: number; // NEW: Maximum number of selections allowed
  onMaxSelectionsReached?: (attemptedId: string | number) => void; // NEW: Callback when max reached

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
  expandOnRowClick?: boolean;
  expandIcon?: ReactNode;
  collapseIcon?: ReactNode;
  expandColumnHeader?: ReactNode;
}
