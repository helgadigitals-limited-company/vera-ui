import { useCallback } from "react";

interface UseDataTableSelectionParams {
  selectable: boolean;
  selectionMode: "single" | "multiple";
  selectedRowIds: Array<string | number>;
  onSelectionChange?: (ids: Array<string | number>) => void;
  maxSelections?: number;
  onMaxSelectionsReached?: (attemptedId: string | number) => void;
  filteredRowIds: Array<string | number>;
}

export function useDataTableSelection({
  selectable,
  selectionMode,
  selectedRowIds,
  onSelectionChange,
  maxSelections,
  onMaxSelectionsReached,
  filteredRowIds,
}: UseDataTableSelectionParams) {
  const isRowSelected = useCallback(
    (id: string | number) => selectedRowIds.includes(id),
    [selectedRowIds]
  );

  // UPDATED: Enhanced toggle row selection with single/multi mode support
  const toggleRowSelection = useCallback(
    (id: string | number) => {
      if (!onSelectionChange) return;

      // Single selection mode
      if (selectionMode === "single") {
        const next = isRowSelected(id) ? [] : [id];
        onSelectionChange(next);
        return;
      }

      // Multiple selection mode
      if (isRowSelected(id)) {
        // Deselect the row
        const next = selectedRowIds.filter((x) => x !== id);
        onSelectionChange(next);
      } else {
        // Check max selections limit
        if (maxSelections && selectedRowIds.length >= maxSelections) {
          if (onMaxSelectionsReached) {
            onMaxSelectionsReached(id);
          }
          return;
        }
        // Select the row
        const next = [...selectedRowIds, id];
        onSelectionChange(next);
      }
    },
    [onSelectionChange, isRowSelected, selectedRowIds, selectionMode, maxSelections, onMaxSelectionsReached]
  );

  // UPDATED: Select all logic with single/multi mode support
  const allFilteredSelected =
    selectable &&
    selectionMode === "multiple" && // Only show for multiple selection mode
    filteredRowIds.length > 0 &&
    filteredRowIds.every((id) => selectedRowIds.includes(id));

  const someFilteredSelected =
    selectable &&
    selectionMode === "multiple" && // Only show for multiple selection mode
    !allFilteredSelected &&
    filteredRowIds.some((id) => selectedRowIds.includes(id));

  // UPDATED: Toggle select all with max selections support
  const toggleSelectAllFiltered = useCallback(() => {
    if (!onSelectionChange || selectionMode === "single") return;

    if (allFilteredSelected) {
      // Deselect all filtered rows
      onSelectionChange(
        selectedRowIds.filter((id) => !filteredRowIds.includes(id))
      );
    } else {
      // Select all filtered rows (respecting max selections)
      const currentNonFilteredSelections = selectedRowIds.filter(
        (id) => !filteredRowIds.includes(id)
      );

      let rowsToSelect = filteredRowIds;

      // Apply max selections limit
      if (maxSelections) {
        const availableSlots = maxSelections - currentNonFilteredSelections.length;
        if (availableSlots <= 0) {
          if (onMaxSelectionsReached) {
            onMaxSelectionsReached(filteredRowIds[0]); // Signal with first row
          }
          return;
        }
        rowsToSelect = filteredRowIds.slice(0, availableSlots);

        // If we couldn't select all due to limit, notify
        if (rowsToSelect.length < filteredRowIds.length && onMaxSelectionsReached) {
          onMaxSelectionsReached(filteredRowIds[rowsToSelect.length]);
        }
      }

      const set = new Set([...currentNonFilteredSelections, ...rowsToSelect]);
      onSelectionChange(Array.from(set));
    }
  }, [
    onSelectionChange,
    selectionMode,
    allFilteredSelected,
    selectedRowIds,
    filteredRowIds,
    maxSelections,
    onMaxSelectionsReached
  ]);

  return {
    isRowSelected,
    toggleRowSelection,
    allFilteredSelected,
    someFilteredSelected,
    toggleSelectAllFiltered,
  };
}
