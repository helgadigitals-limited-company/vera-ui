"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@helgadigitals/vera-ui";
import { useState } from "react";

export function BasicTableExample() {
  const users = [
    { name: "John Doe", email: "john@example.com", role: "Admin" },
    { name: "Jane Smith", email: "jane@example.com", role: "User" },
    { name: "Bob Johnson", email: "bob@example.com", role: "Editor" },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={index}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function SelectableTableExample() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  
  const data = [
    { id: 1, name: "Product A", price: 99.99, status: "Active" },
    { id: 2, name: "Product B", price: 149.99, status: "Inactive" },
    { id: 3, name: "Product C", price: 79.99, status: "Active" },
  ];

  const handleSelectRow = (id: number) => {
    setSelectedRows(prev => 
      prev.includes(id) 
        ? prev.filter(rowId => rowId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === data.length ? [] : data.map(item => item.id)
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">
            <input
              type="checkbox"
              checked={selectedRows.length === data.length}
              onChange={handleSelectAll}
              className="rounded"
              aria-label="Select all rows"
            />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow 
            key={item.id}
            data-state={selectedRows.includes(item.id) ? "selected" : undefined}
          >
            <TableCell>
              <input
                type="checkbox"
                checked={selectedRows.includes(item.id)}
                onChange={() => handleSelectRow(item.id)}
                className="rounded"
                aria-label={`Select ${item.name}`}
              />
            </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>${item.price}</TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-xs ${
                item.status === 'Active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {item.status}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function TableWithFooterExample() {
  const invoices = [
    { invoice: "INV001", paymentStatus: "Paid", totalAmount: 250.00 },
    { invoice: "INV002", paymentStatus: "Pending", totalAmount: 150.00 },
    { invoice: "INV003", paymentStatus: "Unpaid", totalAmount: 350.00 },
    { invoice: "INV004", paymentStatus: "Paid", totalAmount: 450.00 },
  ];

  const total = invoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell className="text-right">${invoice.totalAmount.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right">${total.toFixed(2)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export function TableWithCaptionExample() {
  const recentSales = [
    { customer: "Liam Johnson", email: "liam@example.com", amount: 250.00 },
    { customer: "Olivia Smith", email: "olivia@example.com", amount: 150.00 },
    { customer: "Noah Williams", email: "noah@example.com", amount: 350.00 },
  ];

  return (
    <Table>
      <TableCaption>A list of your recent sales.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentSales.map((sale, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{sale.customer}</TableCell>
            <TableCell>{sale.email}</TableCell>
            <TableCell className="text-right">${sale.amount.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}