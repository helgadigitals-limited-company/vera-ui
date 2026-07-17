import { useCallback, useMemo, useState } from "react";

interface UseDataTableExpansionParams<T> {
  expandable: boolean;
  expandedRowIds?: Array<string | number>;
  onExpandedRowsChange?: (ids: Array<string | number>) => void;
  defaultExpandedRowIds: Array<string | number>;
  expandOnRowClick: boolean;
  onRowClick?: (rowData: T) => void;
  processedRows: Array<{ row: T; id: string | number }>;
}

export function useDataTableExpansion<T>({
  expandable,
  expandedRowIds,
  onExpandedRowsChange,
  defaultExpandedRowIds,
  expandOnRowClick,
  onRowClick,
  processedRows,
}: UseDataTableExpansionParams<T>) {
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

  return {
    isRowExpanded,
    toggleRowExpansion,
    allRowsExpanded,
    toggleExpandAll,
    handleRowClick,
  };
}
