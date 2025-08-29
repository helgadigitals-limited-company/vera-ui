import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DataTable, type TableAction } from "./DataTable";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Eye, Edit, Trash2, Star, Phone, Mail, MapPin, DollarSign, Calendar } from "lucide-react";

// Sample employee data
export const Employees = [
  {
    id: "1",
    name: "John Doe",
    age: 30,
    department: "Engineering",
    position: "Frontend Developer",
    salary: 75000,
    email: "johndoe@example.com",
    phone: "+1234567890",
    address: "123 Main St, Cityville",
    isFullTime: true,
    skills: ["React", "TypeScript", "Tailwind CSS"],
    manager: "Jane Smith",
    joinDate: "2022-01-15",
    rating: 4.5,
  },
  {
    id: "2",
    name: "Alice Johnson",
    age: 28,
    department: "Marketing",
    position: "SEO Specialist",
    salary: 65000,
    email: "alicej@example.com",
    phone: "+0987654321",
    address: "456 Oak St, Townsville",
    isFullTime: false,
    skills: ["Google Analytics", "Content Strategy", "SEO"],
    manager: "Robert Brown",
    joinDate: "2021-08-10",
    rating: 4.2,
  },
  {
    id: "3",
    name: "Michael Lee",
    age: 35,
    department: "Human Resources",
    position: "HR Manager",
    salary: 80000,
    email: "michaellee@example.com",
    phone: "+1122334455",
    address: "789 Pine St, Villagetown",
    isFullTime: true,
    skills: ["Recruitment", "Conflict Resolution", "Employee Relations"],
    manager: "Susan Clark",
    joinDate: "2020-03-22",
    rating: 4.8,
  },
  {
    id: "4",
    name: "Emily Carter",
    age: 17,
    department: "Customer Support",
    position: "Intern",
    salary: 20000,
    email: "emilyc@example.com",
    phone: "+4455667788",
    address: "987 Elm St, Springfield",
    isFullTime: false,
    skills: ["Communication", "Problem-Solving"],
    manager: "David White",
    joinDate: "2024-06-01",
    rating: 3.8,
  },
  {
    id: "5",
    name: "Liam Anderson",
    age: 16,
    department: "Engineering",
    position: "Junior Intern",
    salary: 15000,
    email: "liama@example.com",
    phone: "+5544332211",
    address: "321 Birch St, Greenwood",
    isFullTime: false,
    skills: ["JavaScript", "CSS"],
    manager: "Jane Smith",
    joinDate: "2024-07-15",
    rating: 3.5,
  },
  {
    id: "6",
    name: "Sophia Martinez",
    age: 22,
    department: "Design",
    position: "UI/UX Designer",
    salary: 60000,
    email: "sophiam@example.com",
    phone: "+6677889900",
    address: "654 Maple St, Brookline",
    isFullTime: true,
    skills: ["Figma", "Adobe XD", "User Research"],
    manager: "Sarah Johnson",
    joinDate: "2023-02-01",
    rating: 4.3,
  },
  {
    id: "7",
    name: "Noah Wilson",
    age: 15,
    department: "IT Support",
    position: "Tech Intern",
    salary: 14000,
    email: "noahw@example.com",
    phone: "+9988776655",
    address: "852 Cedar St, Rivertown",
    isFullTime: false,
    skills: ["Troubleshooting", "Hardware Repair"],
    manager: "James Carter",
    joinDate: "2024-09-01",
    rating: 3.6,
  },
  {
    id: "8",
    name: "Olivia Adams",
    age: 19,
    department: "Finance",
    position: "Accounting Assistant",
    salary: 40000,
    email: "oliviaa@example.com",
    phone: "+3344556677",
    address: "159 Walnut St, Sunnyside",
    isFullTime: true,
    skills: ["Excel", "Financial Analysis"],
    manager: "Robert Brown",
    joinDate: "2023-11-12",
    rating: 4.0,
  },
  {
    id: "9",
    name: "Benjamin Scott",
    age: 14,
    department: "Marketing",
    position: "Social Media Intern",
    salary: 12000,
    email: "benjamins@example.com",
    phone: "+2233445566",
    address: "753 Oak St, Hillview",
    isFullTime: false,
    skills: ["Content Creation", "Video Editing"],
    manager: "Alice Johnson",
    joinDate: "2024-08-20",
    rating: 3.9,
  },
  {
    id: "10",
    name: "Charlotte Evans",
    age: 26,
    department: "Sales",
    position: "Account Manager",
    salary: 70000,
    email: "charlottee@example.com",
    phone: "+7788990011",
    address: "369 Aspen St, Meadowfield",
    isFullTime: true,
    skills: ["Negotiation", "CRM Tools"],
    manager: "David White",
    joinDate: "2022-05-18",
    rating: 4.6,
  },
];

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# DataTable Component

A powerful, feature-rich data table component built with React and TypeScript. This component provides comprehensive functionality for displaying, sorting, filtering, selecting, and managing tabular data with a clean and intuitive interface.

## Key Features

- **Sorting**: Single and multi-column sorting with custom sort functions
- **Filtering**: Global search and per-column filtering capabilities  
- **Selection**: Row selection with bulk operations
- **Actions**: Customizable row actions with conditional visibility
- **Expansion**: Expandable rows for detailed content
- **Customization**: Custom cell and header renderers
- **Performance**: Optimized for large datasets
- **Accessibility**: Full keyboard navigation and screen reader support

## Use Cases

Perfect for:
- Employee management systems
- Product catalogs
- Financial dashboards
- Admin panels
- Reporting interfaces
- Any application requiring sophisticated data presentation

        `,
      },
    },
  },
  argTypes: {
    tableData: {
      description: "Array of data objects to display in the table",
    },
    tableColumns: {
      description: "Array of column keys to display",
    },
    sortableColumns: {
      description: "Array of column keys that can be sorted",
    },
    selectable: {
      description: "Enable row selection functionality",
    },
    expandable: {
      description: "Enable row expansion functionality",
    },
    enableGlobalFilter: {
      description: "Enable global search functionality",
    },
    actions: {
      description: "Array of action configurations for each row",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DataTable>;

// Basic table story
export const Basic: Story = {
  name: "📊 Basic Table",
  args: {
    tableData: Employees.slice(0, 5),
    tableColumns: ["name", "age", "department", "position"],
  },
  parameters: {
    docs: {
      description: {
        story: `
### Basic Data Table

The simplest implementation showing employee data in a clean, readable format. 
This example demonstrates the minimal configuration needed to display tabular data.

**Features shown:**
- Clean column display
- Automatic header formatting
- Responsive layout
        `,
      },
    },
  },
};

// Sortable table story
export const Sortable: Story = {
  name: "🔄 Sortable Columns",
  args: {
    tableData: Employees,
    tableColumns: ["name", "age", "department", "position", "salary"],
    sortableColumns: ["name", "age", "salary"],
    defaultSortState: [{ key: "name", direction: "asc" }],
    multiSort: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
### Sortable Data Table

Enable sorting functionality on specific columns. Users can sort by multiple columns 
simultaneously using Shift+Click for complex data organization.

**Features shown:**
- Click headers to sort
- Multi-column sorting (Shift+Click)
- Visual sort indicators
- Default sort state
- Mixed data type sorting (text, numbers)

**Usage Tips:**
- Click a column header to sort ascending
- Click again to sort descending  
- Click a third time to remove sorting
- Hold Shift while clicking to add secondary sorts
        `,
      },
    },
  },
};

// Custom cell rendering with enhanced styling
export const CustomRendering: Story = {
  name: "🎨 Custom Cell Rendering",
  args: {
    tableData: Employees,
    tableColumns: ["name", "department", "position", "salary", "isFullTime", "skills", "rating"],
    sortableColumns: ["name", "salary", "rating"],
    customBodyRender: (row, col) => {
      switch (col) {
        case "name":
          return (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">
                  {row.name.split(" ").map((n: string) => n[0]).join("").toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{row.name}</div>
                <div className="text-xs text-muted-foreground">{row.email}</div>
              </div>
            </div>
          );
        case "department": {
          const deptColors: Record<string, string> = {
            "Engineering": "bg-blue-100 text-blue-800",
            "Marketing": "bg-green-100 text-green-800", 
            "Human Resources": "bg-purple-100 text-purple-800",
            "Design": "bg-pink-100 text-pink-800",
            "Finance": "bg-yellow-100 text-yellow-800",
            "Sales": "bg-orange-100 text-orange-800",
            "IT Support": "bg-gray-100 text-gray-800",
            "Customer Support": "bg-cyan-100 text-cyan-800",
          };
          return (
            <Badge className={deptColors[row.department] || "bg-gray-100 text-gray-800"}>
              {row.department}
            </Badge>
          );
        }
        case "salary":
          return (
            <div className="text-right font-mono">
              ${row.salary.toLocaleString()}
            </div>
          );
        case "isFullTime":
          return (
            <Badge variant={row.isFullTime ? "default" : "secondary"}>
              {row.isFullTime ? "Full-time" : "Part-time"}
            </Badge>
          );
        case "skills":
          return (
            <div className="flex flex-wrap gap-1 max-w-xs">
              {row.skills.slice(0, 3).map((skill: string) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {row.skills.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{row.skills.length - 3} more
                </Badge>
              )}
            </div>
          );
        case "rating":
          return (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{row.rating}</span>
            </div>
          );
        default:
          return row[col];
      }
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
### Custom Cell Rendering

Transform raw data into rich, visual components using the \`customBodyRender\` prop. 
This example shows various rendering techniques for different data types.

**Features shown:**
- Avatar with initials for names
- Color-coded department badges
- Formatted salary with currency
- Employment status indicators  
- Skill tags with overflow handling
- Star ratings with icons
- Email display in subtext

**Customization Examples:**
- **Name**: Avatar + formatted text with email
- **Department**: Color-coded badges by category
- **Salary**: Right-aligned currency formatting
- **Status**: Visual full-time/part-time indicators
- **Skills**: Tag list with overflow count
- **Rating**: Star icon with numeric value
        `,
      },
    },
  },
};

// Filtering functionality
export const WithFiltering: Story = {
  name: "🔍 Filtering & Search",
  args: {
    tableData: Employees,
    tableColumns: ["name", "department", "position", "skills"],
    enableGlobalFilter: true,
    globalFilterPlaceholder: "Search employees, departments, skills...",
    filterableColumns: ["department", "position"],
    sortableColumns: ["name"],
  },
  parameters: {
    docs: {
      description: {
        story: `
### Filtering & Search Capabilities

Comprehensive filtering system with both global search and column-specific filters.
Perfect for finding specific data points in large datasets.

**Features shown:**
- **Global Search**: Searches across all visible columns
- **Column Filters**: Dedicated filter inputs for specific columns
- **Array Search**: Automatically searches within array fields (like skills)
- **Real-time Filtering**: Instant results as you type
- **Combined Filters**: Global and column filters work together

**Usage Tips:**
- Use global search for quick, broad searches
- Use column filters for precise filtering
- Search terms are case-insensitive
- Filters work with custom rendered content
- Multiple filters combine with AND logic
        `,
      },
    },
  },
};

// Selection functionality
export const WithSelection: Story = {
  name: "✅ Row Selection",
  render: () => {
    const [selectedRows, setSelectedRows] = useState<Array<string | number>>([]);
    
    return (
      <div className="space-y-4">
        {selectedRows.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Selected Employees ({selectedRows.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Selected IDs: {selectedRows.join(", ")}
              </p>
              <div className="flex gap-2 mt-3">
                <Button 
                  size="sm" 
                  onClick={() => setSelectedRows([])}
                  variant="outline"
                >
                  Clear Selection
                </Button>
                <Button size="sm" variant="destructive">
                  Bulk Delete ({selectedRows.length})
                </Button>
                <Button size="sm">
                  Export Selected
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        <DataTable
          tableData={Employees}
          tableColumns={["name", "department", "position", "salary"]}
          selectable
          selectedRowIds={selectedRows}
          onSelectionChange={setSelectedRows}
          sortableColumns={["name", "salary"]}
          customBodyRender={(row, col) => {
            if (col === "salary") {
              return <span className="font-mono">${row.salary.toLocaleString()}</span>;
            }
            return row[col];
          }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
### Row Selection System

Enable users to select individual rows or use bulk selection for batch operations.
Perfect for admin interfaces requiring bulk actions.

**Features shown:**
- **Individual Selection**: Click checkboxes to select specific rows
- **Bulk Selection**: Header checkbox selects/deselects all
- **Selection State**: Visual feedback for selected rows  
- **Controlled Selection**: External state management
- **Bulk Actions**: Perform operations on selected items

**Implementation Notes:**
- Uses controlled component pattern
- Supports programmatic selection
- Visual highlighting for selected rows
- Indeterminate state for partial selections
- Compatible with filtering and sorting
        `,
      },
    },
  },
};

// Actions functionality
export const WithActions: Story = {
  name: "⚡ Row Actions",
  render: () => {
    const [employees_copy, setEmployees] = useState(Employees);
    
    const actions: TableAction<typeof Employees[0]>[] = [
      {
        id: "view",
        label: "View",
        icon: <Eye className="h-4 w-4" />,
        variant: "outline",
        onClick: (row) => {
          alert(`Viewing details for ${row.name}`);
        },
      },
      {
        id: "edit", 
        label: "Edit",
        icon: <Edit className="h-4 w-4" />,
        variant: "default",
        onClick: (row) => {
          alert(`Editing ${row.name}`);
        },
        disabled: (row) => row.age < 18, // Disable for minors
      },
      {
        id: "delete",
        icon: <Trash2 className="h-4 w-4" />,
        variant: "destructive",
        onClick: (row) => {
          if (confirm(`Delete ${row.name}?`)) {
            setEmployees((prev: typeof Employees) => prev.filter((emp: typeof Employees[0]) => emp.id !== row.id));
          }
        },
        hidden: (row) => row.position.includes("Manager"), // Hide for managers
      },
    ];

    return (
      <DataTable
        tableData={employees_copy}
        tableColumns={["name", "age", "position", "department"]}
        actions={actions}
        actionsPlacement="end"
        sortableColumns={["name", "age"]}
        customBodyRender={(row, col) => {
          if (col === "age") {
            const isMinor = row.age < 18;
            return (
              <div className={`flex items-center gap-2 ${isMinor ? "text-orange-600" : ""}`}>
                {row.age}
                {isMinor && <Badge variant="outline" className="text-xs">Minor</Badge>}
              </div>
            );
          }
          return row[col];
        }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
### Row Actions System

Add interactive buttons to each row for common operations like view, edit, and delete.
Actions can be conditionally enabled/disabled or hidden based on row data.

**Features shown:**
- **Multiple Actions**: View, Edit, Delete operations
- **Conditional Logic**: 
  - Edit disabled for employees under 18
  - Delete hidden for managers
- **Visual Variants**: Different button styles per action
- **Icons + Labels**: Clear action identification
- **Event Handling**: Click handlers with row context

**Action Configuration:**
- \`id\`: Unique identifier for the action
- \`label\`: Display text (optional if using icon only)
- \`icon\`: React icon component 
- \`variant\`: Button styling variant
- \`onClick\`: Handler function with row data
- \`disabled\`: Function to conditionally disable
- \`hidden\`: Function to conditionally hide

**Use Cases:**
- CRUD operations on table rows
- Quick actions without page navigation
- Context-sensitive operations
- Bulk operations with selection
        `,
      },
    },
  },
};

// Expandable rows
export const WithExpansion: Story = {
  name: "📖 Expandable Rows", 
  args: {
    tableData: Employees,
    tableColumns: ["name", "position", "department"],
    expandable: true,
    sortableColumns: ["name"],
    expandedContent: (row) => (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Contact Information  
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-3 w-3 text-muted-foreground" />
              {row.email}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-3 w-3 text-muted-foreground" />
              {row.phone}
            </div>
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="h-3 w-3 text-muted-foreground mt-0.5" />
              <span className="break-words">{row.address}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Employment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Salary:</span>
              <span className="font-mono">${row.salary.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Status:</span>
              <Badge variant={row.isFullTime ? "default" : "secondary"}>
                {row.isFullTime ? "Full-time" : "Part-time"}
              </Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Manager:</span>
              <span>{row.manager}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Join Date:</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {row.joinDate}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Skills & Expertise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {row.skills.map((skill: string) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{row.rating}/5.0</span>
              <span className="text-xs text-muted-foreground ml-2">Performance Rating</span>
            </div>
          </CardContent>
        </Card>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: `
### Expandable Rows

Provide detailed information for each row through expandable content panels.
Perfect for displaying comprehensive data without overwhelming the main table view.

**Features shown:**
- **Rich Content**: Cards, badges, icons in expanded view
- **Organized Layout**: Responsive grid system
- **Detailed Information**: Contact, employment, and skills data
- **Visual Elements**: Icons, ratings, formatted dates
- **Toggle Controls**: Click to expand/collapse rows

**Expanded Content Includes:**
- **Contact Info**: Email, phone, address with icons
- **Employment Details**: Salary, status, manager, join date
- **Skills**: Organized skill tags with performance rating

**Implementation Benefits:**
- Keeps main table clean and scannable  
- Provides comprehensive detail on demand
- Responsive design for different screen sizes
- Rich formatting with cards and badges
- Maintains table performance with large datasets
        `,
      },
    },
  },
};

// Complex example with all features
export const CompleteFeatureSet: Story = {
  name: "🚀 Complete Feature Set",
  render: () => {
    const [selectedRows, setSelectedRows] = useState<Array<string | number>>([]);
    const [employees_copy, setEmployees] = useState(Employees);
    
    const actions: TableAction<typeof Employees[0]>[] = [
      {
        id: "view",
        icon: <Eye className="h-4 w-4" />,
        onClick: (row) => alert(`Viewing ${row.name}`),
      },
      {
        id: "edit",
        icon: <Edit className="h-4 w-4" />,
        onClick: (row) => alert(`Editing ${row.name}`),
        disabled: (row) => row.age < 18,
      },
      {
        id: "delete",
        icon: <Trash2 className="h-4 w-4" />,
        variant: "destructive",
        onClick: (row) => {
          if (confirm(`Delete ${row.name}?`)) {
            setEmployees((prev: typeof Employees) => prev.filter((emp: typeof Employees[0]) => emp.id !== row.id));
          }
        },
      },
    ];

    return (
      <div className="space-y-4">
        {selectedRows.length > 0 && (
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {selectedRows.length} employee{selectedRows.length !== 1 ? 's' : ''} selected
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setSelectedRows([])}>
                    Clear
                  </Button>
                  <Button size="sm" variant="destructive">
                    Bulk Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        <DataTable
          tableData={employees_copy}
          tableColumns={["name", "age", "department", "position", "salary", "skills"]}
          
          // Selection
          selectable
          selectedRowIds={selectedRows}
          onSelectionChange={setSelectedRows}
          
          // Sorting
          sortableColumns={["name", "age", "salary"]}
          multiSort
          defaultSortState={[{ key: "name", direction: "asc" }]}
          
          // Filtering
          enableGlobalFilter
          globalFilterPlaceholder="Search all fields..."
          filterableColumns={["department", "position"]}
          
          // Actions
          actions={actions}
          
          // Expansion
          expandable
          expandedContent={(row) => (
            <Card className="m-4">
              <CardContent className="pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><strong>Email:</strong> {row.email}</p>
                    <p><strong>Phone:</strong> {row.phone}</p>
                    <p><strong>Manager:</strong> {row.manager}</p>
                  </div>
                  <div>
                    <p><strong>Full-time:</strong> {row.isFullTime ? "Yes" : "No"}</p>
                    <p><strong>Rating:</strong> {row.rating}/5.0</p>
                    <p><strong>Address:</strong> {row.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          // Custom rendering
          customBodyRender={(row, col) => {
            switch (col) {
              case "name":
                return (
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {row.name.split(" ").map((n: string) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>{row.name}</span>
                  </div>
                );
              case "department": {
                const colors: Record<string, string> = {
                  "Engineering": "bg-blue-100 text-blue-800",
                  "Marketing": "bg-green-100 text-green-800",
                  "Human Resources": "bg-purple-100 text-purple-800",
                  "Design": "bg-pink-100 text-pink-800",
                  "Finance": "bg-yellow-100 text-yellow-800",
                  "Sales": "bg-orange-100 text-orange-800",
                  "IT Support": "bg-gray-100 text-gray-800",
                  "Customer Support": "bg-cyan-100 text-cyan-800",
                };
                return (
                  <Badge className={colors[row.department]}>
                    {row.department}
                  </Badge>
                );
              }
              case "salary":
                return (
                  <span className="font-mono">${row.salary.toLocaleString()}</span>
                );
              case "skills":
                return (
                  <div className="flex flex-wrap gap-1 max-w-xs">
                    {row.skills.slice(0, 2).map((skill: string) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {row.skills.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{row.skills.length - 2}
                      </Badge>
                    )}
                  </div>
                );
              default:
                return row[col];
            }
          }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
### Complete Feature Demonstration

This comprehensive example showcases all DataTable capabilities working together 
in a realistic employee management scenario.

**All Features Combined:**
- ✅ **Row Selection** with bulk operations
- 🔄 **Multi-column Sorting** with default state  
- 🔍 **Global + Column Filtering** for precise searches
- ⚡ **Row Actions** with conditional logic
- 📖 **Expandable Rows** with detailed content
- 🎨 **Custom Rendering** for enhanced visuals

**Perfect For:**
- Admin dashboards
- Employee management systems
- Product catalogs  
- Financial reporting
- Any complex data management interface

**Performance Notes:**
- Optimized for large datasets
- Efficient re-rendering with React optimizations
- Smooth interactions with proper event handling
- Responsive design for all screen sizes

This represents the full power of the DataTable component, suitable for 
enterprise-grade applications requiring sophisticated data management.
        `,
      },
    },
  },
};

// Performance story with large dataset
export const LargeDataset: Story = {
  name: "⚡ Performance - Large Dataset",
  render: () => {
    // Generate large dataset
    const generateLargeDataset = (size: number) => {
      const departments = ["Engineering", "Marketing", "Sales", "Finance", "HR", "Design"];
      const positions = ["Manager", "Senior", "Junior", "Lead", "Specialist", "Intern"];
      const skills = ["React", "TypeScript", "Python", "Java", "AWS", "Docker", "Kubernetes"];
      
      return Array.from({ length: size }, (_, i) => ({
        id: (i + 1).toString(),
        name: `Employee ${i + 1}`,
        age: Math.floor(Math.random() * 40) + 20,
        department: departments[Math.floor(Math.random() * departments.length)],
        position: positions[Math.floor(Math.random() * positions.length)],
        salary: Math.floor(Math.random() * 80000) + 40000,
        email: `employee${i + 1}@company.com`,
        skills: Array.from({ length: Math.floor(Math.random() * 4) + 1 }, 
          () => skills[Math.floor(Math.random() * skills.length)]),
        isFullTime: Math.random() > 0.3,
        rating: +(Math.random() * 2 + 3).toFixed(1),
      }));
    };

    const largeDataset = generateLargeDataset(1000);
    
    return (
      <div className="space-y-4">
        <Card>
          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground">
              <strong>Dataset Size:</strong> {largeDataset.length.toLocaleString()} records
            </p>
            <p className="text-xs mt-1 text-muted-foreground">
              Demonstrating smooth performance with large datasets using React optimization techniques.
            </p>
          </CardContent>
        </Card>
        
        <DataTable
          tableData={largeDataset}
          tableColumns={["name", "department", "position", "salary", "rating"]}
          sortableColumns={["name", "salary", "rating"]}
          enableGlobalFilter
          filterableColumns={["department", "position"]}
          globalFilterPlaceholder="Search 1000 employees..."
          customBodyRender={(row, col) => {
            if (col === "salary") {
              return <span className="font-mono">${row.salary.toLocaleString()}</span>;
            }
            if (col === "rating") {
              return (
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{row.rating}</span>
                </div>
              );
            }
            return row[col];
          }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
### Large Dataset Performance

Demonstrates the DataTable's ability to handle large datasets (1000+ records) 
while maintaining smooth performance and responsive interactions.

**Performance Features:**
- **Efficient Rendering**: Only visible rows are processed
- **Optimized Filtering**: Fast search across large datasets  
- **Smooth Sorting**: Quick sort operations on numerical and text data
- **Memory Management**: Efficient React re-rendering patterns
- **Responsive UI**: No blocking during user interactions

**Technical Optimizations:**
- React.useMemo for expensive calculations
- React.useCallback for stable function references
- Efficient array operations for filtering/sorting
- Minimal re-renders with proper dependency arrays
- Optimized event handlers to prevent propagation issues

**Real-world Applications:**
- Employee directories (1000+ employees)
- Product catalogs (large inventories)
- Financial records (transaction histories)
- Customer databases (CRM systems)
- Reporting dashboards (analytics data)

**Best Practices Demonstrated:**
- Progressive loading strategies
- Efficient state management
- Proper event handling
- Performance monitoring considerations
        `,
      },
    },
  },
};

// Accessibility story
export const Accessibility: Story = {
  name: "♿ Accessibility Features",
  args: {
    tableData: Employees.slice(0, 5),
    tableColumns: ["name", "department", "position", "salary"],
    selectable: true,
    sortableColumns: ["name", "salary"],
    actions: [
      {
        id: "view",
        label: "View Profile",
        icon: <Eye className="h-4 w-4" />,
        onClick: (row) => alert(`Viewing ${row.name}`),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: `
### Accessibility & Keyboard Navigation

The DataTable component is built with accessibility as a first-class concern, 
ensuring usability for all users including those using assistive technologies.

**Accessibility Features:**
- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader Support**: Proper ARIA labels and announcements  
- **Focus Management**: Logical tab order and visible focus indicators
- **Semantic HTML**: Proper table structure with thead/tbody/th/td
- **High Contrast**: Clear visual distinction between elements
- **Descriptive Labels**: Meaningful text for all interactive elements

**Keyboard Shortcuts:**
- **Tab/Shift+Tab**: Navigate between interactive elements
- **Enter/Space**: Activate buttons and checkboxes
- **Click/Enter**: Sort columns (when sortable)
- **Escape**: Cancel/close any open states

**Screen Reader Announcements:**
- Column headers with sort state
- Selection state changes
- Row counts and filtering results
- Action button purposes
- Table structure and relationships

**ARIA Attributes:**
- \`aria-label\` for action buttons and checkboxes
- \`aria-sort\` for sortable column headers
- \`role\` attributes for proper semantics
- \`aria-expanded\` for expandable rows
- \`aria-selected\` for row selection state

**WCAG 2.1 Compliance:**
- Level AA color contrast ratios
- Keyboard accessibility requirements  
- Screen reader compatibility
- Focus management standards
- Semantic markup guidelines
        `,
      },
    },
  },
};
