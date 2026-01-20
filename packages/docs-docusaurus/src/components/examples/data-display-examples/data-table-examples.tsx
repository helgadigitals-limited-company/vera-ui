"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { DataTable } from "@helgadigitals/vera-ui";
import { Badge } from "@helgadigitals/vera-ui";
import { Button } from "@helgadigitals/vera-ui";
import { Edit, Trash2, Eye, Plus, Minus } from "lucide-react";
import { useState, useMemo } from "react";

// Sample data
const sampleUsers = [
  {  
    name: "John Doe", 
    email: "john@example.com", 
    role: "Admin", 
    status: "Active",
    lastLogin: "2024-01-15",
    department: "Engineering"
  },
  { 
    name: "Jane Smith", 
    email: "jane@example.com", 
    role: "User", 
    status: "Inactive",
    lastLogin: "2024-01-10",
    department: "Marketing"
  },
  { 
    name: "Bob Johnson", 
    email: "bob@example.com", 
    role: "Editor", 
    status: "Active",
    lastLogin: "2024-01-12",
    department: "Content"
  },
  { 
    name: "Alice Brown", 
    email: "alice@example.com", 
    role: "User", 
    status: "Active",
    lastLogin: "2024-01-14",
    department: "Sales"
  },
  { 
    name: "Charlie Wilson", 
    email: "charlie@example.com", 
    role: "Editor", 
    status: "Inactive",
    lastLogin: "2024-01-08",
    department: "Support"
  }
];

const sampleProducts = [
  {
    name: "Laptop Pro",
    category: "Electronics",
    price: 1299,
    stock: 45,
    status: "In Stock"
  },
  {
    name: "Wireless Mouse",
    category: "Accessories",
    price: 29,
    stock: 150,
    status: "In Stock"
  },
  {
    
    name: "Gaming Keyboard",
    category: "Accessories",
    price: 89,
    stock: 0,
    status: "Out of Stock"
  },
  {
    name: "Monitor 4K",
    category: "Electronics",
    price: 399,
    stock: 12,
    status: "Low Stock"
  }
];

export function BasicDataTableExample() {
  return (
    <DataTable
      tableData={sampleUsers}
      tableColumns={['name', 'email', 'role', 'status']}
    />
  );
}

export function SortableDataTableExample() {
  return (
    <DataTable
      tableData={sampleUsers}
      tableColumns={['name', 'email', 'role', 'status', 'lastLogin']}
      sortableColumns={['name', 'email', 'role', 'lastLogin']}
      multiSort={true}
      defaultSortState={[{ key: 'name', direction: 'asc' }]}
    />
  );
}

export function RowExpansionDataTableExample() {
  return (
    <DataTable
      tableData={sampleUsers}
      tableColumns={['name', 'email', 'role', 'status', 'lastLogin']}
      expandable={true}
      expandOnRowClick={false}
      expandIcon={
          <Plus className="w-3 h-3 hover:bg-white hover:text-black transition-colors" strokeWidth={4} />
        }
        collapseIcon={
          <Minus className="w-3 h-3 hover:bg-white hover:text-black transition-colors" strokeWidth={4} />
        }
         expandedContent={(row) => (
          <div className="p-4 bg-white dark:bg-gray-800 rounded border dark:border-gray-600">
            <h4 className="font-semibold mb-2 dark:text-white">Users Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm dark:text-gray-200">
              <div>
                <strong className="dark:text-white">Full Name:</strong> {row.name}
              </div>
              <div>
                <strong className="dark:text-white">Role:</strong> {row.role}
              </div>
              <div>
                <strong className="dark:text-white">Status:</strong> {row.status}
              </div>
              <div>
                <strong className="dark:text-white">Last Login:</strong> {row.lastLogin}
              </div>
              <div>
                <strong className="dark:text-white">Email:</strong> {row.email}
              </div>
              <div>
                <strong className="dark:text-white">Department:</strong> {row.department}
              </div>
              </div>
            </div>
        )}
    />
  );
}

export function SearchableDataTableExample() {
  return (
    <DataTable
      tableData={sampleUsers}
      tableColumns={['name', 'email', 'role', 'status', 'department']}
      enableGlobalFilter={true}
      globalFilterPlaceholder="Search users..."
      sortableColumns={['name', 'email', 'role']}
    />
  );
}

export function SelectableDataTableExample() {
  const [selectedRows, setSelectedRows] = useState<Array<string | number>>([]);

  return (
    <div className="space-y-4">
      {selectedRows.length > 0 && (
        <div className="text-sm text-muted-foreground">
          Selected {selectedRows.length} row(s): {selectedRows.join(', ')}
        </div>
      )}
      <DataTable
        tableData={sampleUsers}
        tableColumns={['name', 'email', 'role', 'status']}
        selectable={true}
        selectionMode="multiple"
        selectedRowIds={selectedRows}
        onSelectionChange={setSelectedRows}
        maxSelections={3}
        onMaxSelectionsReached={(id) => {
          console.log(`Maximum selections reached. Attempted to select: ${id}`);
        }}
      />
    </div>
  );
}

export function ActionsDataTableExample() {
  const actions = useMemo(() => [
    {
      id: "view",
      label: "View",
      icon: <Eye className="h-4 w-4" />,
      onClick: (row: any) => console.log("View", row),
    },
    {
      id: "edit",
      label: "Edit",
      icon: <Edit className="h-4 w-4" />,
      onClick: (row: any) => console.log("Edit", row),
    },
    {
      id: "delete",
      label: "Delete",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: (row: any) => console.log("Delete", row),
      variant: "destructive",
      disabled: (row: any) => row.role === "Admin",
    },
  ], []);

  return (
    <DataTable
      tableData={sampleUsers}
      tableColumns={['name', 'email', 'role', 'status']}
      actions={actions}
      actionsPlacement="end"
      actionsColumnHeader="Actions"
    />
  );
}

export function CustomRenderDataTableExample() {
  return (
    <DataTable
      tableData={sampleUsers}
      tableColumns={['name', 'email', 'role', 'status', 'lastLogin']}
      customBodyRender={(rowData, column) => {
        if (column === 'status') {
          return (
            <Badge variant={rowData.status === 'Active' ? 'default' : 'secondary'}>
              {rowData.status}
            </Badge>
          );
        }
        if (column === 'email') {
          return (
            <a 
              href={`mailto:${rowData.email}`}
              className="text-primary hover:underline"
            >
              {rowData.email}
            </a>
          );
        }
        if (column === 'role') {
          return (
            <Badge variant={rowData.role === 'Admin' ? 'destructive' : 'outline'}>
              {rowData.role}
            </Badge>
          );
        }
        if (column === 'lastLogin') {
          return new Date(rowData.lastLogin).toLocaleDateString();
        }
        return null; // Use default rendering
      }}
      customHeadRender={(column) => {
        if (column === 'status') {
          return <span className="font-bold text-primary">Status</span>;
        }
        return null; // Use default rendering
      }}
      sortableColumns={['name', 'email', 'lastLogin']}
    />
  );
}

export function ProductsDataTableExample() {
  const actions = useMemo(() => [
    {
      id: "edit",
      label: "Edit Product",
      icon: <Edit className="h-4 w-4" />,
      onClick: (row: any) => console.log("Edit product", row),
    },
    {
      id: "delete",
      label: "Delete Product",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: (row: any) => console.log("Delete product", row),
      variant: "destructive",
      disabled: (row: any) => row.stock > 0,
    },
  ], []);

  return (
    <DataTable
      tableData={sampleProducts}
      tableColumns={['name', 'category', 'price', 'stock', 'status']}
      actions={actions}
      enableGlobalFilter={true}
      globalFilterPlaceholder="Search products..."
      sortableColumns={['name', 'category', 'price', 'stock']}
      customBodyRender={(rowData, column) => {
        if (column === 'price') {
          return `$${rowData.price.toFixed(2)}`;
        }
        if (column === 'status') {
          let variant: "default" | "secondary" | "destructive" = "default";
          if (rowData.status === 'Out of Stock') variant = "destructive";
          else if (rowData.status === 'Low Stock') variant = "secondary";
          
          return (
            <Badge variant={variant}>
              {rowData.status}
            </Badge>
          );
        }
        if (column === 'stock') {
          return (
            <span className={rowData.stock === 0 ? 'text-destructive font-semibold' : ''}>
              {rowData.stock} units
            </span>
          );
        }
        return null;
      }}
    />
  );
}

export function AdvancedDataTableExample() {
  const [selectedRows, setSelectedRows] = useState<Array<string | number>>([]);
  const [sortState, setSortState] = useState<Array<{ key: keyof typeof sampleUsers[0]; direction: "asc" | "desc" }>>([{ key: 'name', direction: 'asc' }]);
  const [globalFilter, setGlobalFilter] = useState("");

  const actions = useMemo(() => [
    {
      id: "view",
      label: "View Details",
      icon: <Eye className="h-4 w-4" />,
      onClick: (row: any) => console.log("View user", row),
    },
    {
      id: "edit",
      label: "Edit User",
      icon: <Edit className="h-4 w-4" />,
      onClick: (row: any) => console.log("Edit user", row),
    },
    {
      id: "delete",
      label: "Delete User",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: (row: any) => console.log("Delete user", row),
      variant: "destructive",
      disabled: (row: any) => row.role === "Admin",
      hidden: (row: any) => row.status === "Inactive",
    },
  ], []);

  const handleBulkAction = () => {
    console.log("Bulk action for:", selectedRows);
    alert(`Bulk action performed on ${selectedRows.length} users`);
  };

  return (
    <div className="space-y-4">
      {/* Header with actions */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Users Management</h3>
        <div className="flex gap-2">
          {selectedRows.length > 0 && (
            <Button onClick={handleBulkAction} variant="outline" size="sm">
              Bulk Action ({selectedRows.length})
            </Button>
          )}
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Advanced DataTable */}
      <DataTable
        tableData={sampleUsers}
        tableColumns={['name', 'email', 'role', 'status', 'department', 'lastLogin']}
        
        // Sorting
        sortableColumns={['name', 'email', 'role', 'lastLogin']}
        multiSort={true}
        sortState={sortState}
        onSortChange={setSortState}
        
        // Filtering
        enableGlobalFilter={true}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        globalFilterPlaceholder="Search users by name, email, or role..."
        
        // Selection
        selectable={true}
        selectionMode="multiple"
        selectedRowIds={selectedRows}
        onSelectionChange={setSelectedRows}
        maxSelections={3}
        
        // Actions
        actions={actions}
        actionsPlacement="end"
        actionsColumnHeader="Actions"
       
        //Row Expansion
        expandable={true}
        expandOnRowClick={false}
         expandIcon={
          <Plus className="w-3 h-3 hover:bg-white hover:text-black transition-colors" strokeWidth={4} />
        }
        collapseIcon={
          <Minus className="w-3 h-3 hover:bg-white hover:text-black transition-colors" strokeWidth={4} />
        }
         expandedContent={(row) => (
          <div className="p-4 bg-white dark:bg-gray-800 rounded border dark:border-gray-600">
            <h4 className="font-semibold mb-2 dark:text-white">Users Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm dark:text-gray-200">
              <div>
                <strong className="dark:text-white">Full Name:</strong> {row.name}
              </div>
              <div>
                <strong className="dark:text-white">Role:</strong> {row.role}
              </div>
              <div>
                <strong className="dark:text-white">Status:</strong> {row.status}
              </div>
              <div>
                <strong className="dark:text-white">Last Login:</strong> {row.lastLogin}
              </div>
              <div>
                <strong className="dark:text-white">Email:</strong> {row.email}
              </div>
              <div>
                <strong className="dark:text-white">Department:</strong> {row.department}
              </div>
              </div>
            </div>
        )}
        
        // Custom rendering
        customBodyRender={(rowData, column) => {
          switch (column) {
            case 'status':
              return (
                <Badge 
                  variant={rowData.status === 'Active' ? 'default' : 'secondary'}
                >
                  {rowData.status}
                </Badge>
              );
            case 'role':
              return (
                <Badge 
                  variant={rowData.role === 'Admin' ? 'destructive' : 'outline'}
                >
                  {rowData.role}
                </Badge>
              );
            case 'email':
              return (
                <a 
                  href={`mailto:${rowData.email}`}
                  className="text-primary hover:underline"
                >
                  {rowData.email}
                </a>
              );
            case 'lastLogin':
              return new Date(rowData.lastLogin).toLocaleDateString();
            default:
              return null;
          }
        }}
        
        // Row interactions
        onRowClick={(row) => console.log("Row clicked:", row)}
        rowClassName={(row) => 
          row.status === 'Inactive' ? 'opacity-60' : ''
        }
        
        // Styling
        className="border rounded-lg"
        
        // Empty state
        emptyMessage="No users found matching your criteria"
      />
      
      {selectedRows.length > 0 && (
        <div className="text-sm text-muted-foreground mt-2">
          Selected users: {selectedRows.join(', ')}
        </div>
      )}
    </div>
  );
}