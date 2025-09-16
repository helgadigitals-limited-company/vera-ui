"use client";

import { Pagination } from "@helgadigitals/vera-ui";
import { useState } from "react";

// Mock data for examples
const mockData = Array.from({ length: 250 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  category: ['Electronics', 'Clothing', 'Books', 'Home'][i % 4],
  price: Math.floor(Math.random() * 100) + 10,
}));

export function BasicPaginationExample() {
  const [currentPage, setCurrentPage] = useState(3);
  const [pageSize, setPageSize] = useState(10);
  const totalItems = 100;

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Current page: {currentPage} of {Math.ceil(totalItems / pageSize)}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalItems / pageSize)}
        onPageChange={setCurrentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
}

export function SimplePaginationExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalItems = 50;

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={Math.ceil(totalItems / pageSize)}
      onPageChange={setCurrentPage}
      totalItems={totalItems}
      pageSize={pageSize}
      onPageSizeChange={setPageSize}
      showFirstLast={false}
    />
  );
}

export function LargePaginationExample() {
  const [currentPage, setCurrentPage] = useState(25);
  const [pageSize, setPageSize] = useState(20);
  const totalItems = 1000;

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Large dataset example - {totalItems} total items
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalItems / pageSize)}
        onPageChange={setCurrentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        pageSizeOptions={[10, 20, 50, 100]}
      />
    </div>
  );
}

export function InteractivePaginationExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const totalItems = mockData.length;

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsLoading(false);
    }, 500); // Simulate loading
  };

  const handlePageSizeChange = (size: number) => {
    setIsLoading(true);
    setTimeout(() => {
      setPageSize(size);
      setCurrentPage(1); // Reset to first page
      setIsLoading(false);
    }, 300);
  };

  // Get current page data
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = mockData.slice(startIndex, startIndex + pageSize);

  return (
    <div className="space-y-4">
      {/* Data Display */}
      <div className="border rounded-lg">
        <div className="p-4 border-b bg-muted/50">
          <h4 className="font-semibold">Sample Data</h4>
        </div>
        <div className="p-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
                <span>Loading...</span>
              </div>
            </div>
          ) : (
            <div className="grid gap-3">
              {currentData.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-2 border rounded">
                  <div>
                    <span className="font-medium">{item.name}</span>
                    <span className="text-muted-foreground ml-2">({item.category})</span>
                  </div>
                  <span className="font-semibold">${item.price}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalItems / pageSize)}
        onPageChange={handlePageChange}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        pageSizeOptions={[5, 10, 20]}
        isFetching={isLoading}
      />
    </div>
  );
}

export function CustomSizesPaginationExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const totalItems = 500;

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Custom page size options for different use cases
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalItems / pageSize)}
        onPageChange={setCurrentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1); // Reset to first page when changing size
        }}
        pageSizeOptions={[25, 50, 100, 200]}
        siblingsCount={2} // Show more page numbers
      />
    </div>
  );
}

export function MinimalPaginationExample() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalItems = 30;

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Minimal pagination for small datasets
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalItems / pageSize)}
        onPageChange={setCurrentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
        showFirstLast={false}
        siblingsCount={0} // Only show current page
        pageSizeOptions={[5, 10, 15]}
      />
    </div>
  );
}