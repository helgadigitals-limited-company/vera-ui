import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight 
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  siblingsCount?: number;
  totalItems: number;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions?: number[];
  isFetching?: boolean;
}

export function Pagination({
 currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  siblingsCount = 1,
  totalItems,
  pageSize,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50, 100],
  isFetching = false,
}: PaginationProps) {
  

  // Create array of all page numbers for select

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const totalNumbers = siblingsCount * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages <= totalBlocks) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    const leftSiblingIndex = Math.max(currentPage - siblingsCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingsCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      for (let i = 1; i <= leftSiblingIndex + siblingsCount; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
      return pages;
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);
    pages.push('...');
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      pages.push(i);
    }
    pages.push('...');
    pages.push(totalPages);
    return pages;
  };

  return (
     <div className="flex items-center justify-between w-full gap-4">
       <div className="flex-1 flex items-center justify-center gap-2">

      <div className="flex items-center gap-2">
        {showFirstLast && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
        )}

          <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
         {/* Page buttons for desktop */}
        <div className="hidden sm:flex items-center gap-2">
          {getPageNumbers().map((pageNumber, idx) => (
            pageNumber === '...' ? (
              <span key={`dots-${idx}`} className="px-2 text-muted-foreground">
                ...
              </span>
            ) : (
              <Button
                key={pageNumber}
                variant={currentPage === pageNumber ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(pageNumber as number)}
                className="w-8"
              >
                {pageNumber}
              </Button>
            )
          ))}
        </div>
         <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {showFirstLast && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        )}
      </div>
      </div>
       <div className="flex items-center gap-4">
       <Select
          value={pageSize.toString()}
          onValueChange={(value) => onPageSizeChange(Number(value))}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder={`${pageSize} per page`} />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size} per page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

         <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground whitespace-nowrap">
            Showing {((currentPage - 1) * pageSize) + 1}-
            {Math.min(currentPage * pageSize, totalItems)} of {totalItems} items
          </p>
          {isFetching && (
            <span className="text-sm text-muted-foreground">(Loading...)</span>
          )}
        </div>
      </div>
    </div>
      
  );
}