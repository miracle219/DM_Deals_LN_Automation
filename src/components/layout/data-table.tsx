"use client";

import { useState, ReactNode } from 'react';
import { Icon } from '@iconify/react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<T> {
  data: T[];
  columns: {
    id: string;
    header: string;
    accessorKey?: keyof T;
    cell?: (item: T) => ReactNode;
  }[];
  title: string;
  totalCount: number;
  actions?: ReactNode[];
  enableSelection?: boolean;
  enableHover?: boolean;
  className?: string;
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  title,
  totalCount,
  actions = [],
  enableSelection = true,
  enableHover = true,
  className = '',
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // Toggle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map(item => item.id));
    }
    setSelectAll(!selectAll);
  };

  // Toggle select single row
  const handleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
      setSelectAll(false);
    } else {
      setSelectedRows([...selectedRows, id]);
      if (selectedRows.length + 1 === data.length) {
        setSelectAll(true);
      }
    }
  };

  // Check if row is selected
  const isRowSelected = (id: string) => selectedRows.includes(id);

  return (
    <div>
      {/* Table title and actions */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-bold">{title}</h2>
          <span className="text-sm text-gray-500">
            {selectedRows.length > 0 ? `${selectedRows.length} selected, ` : ''}
            {totalCount} total
          </span>
        </div>

        {/* Action buttons */}
        {actions.length > 0 && (
          <div className="flex space-x-2">
            {actions.map((action, index) => (
              <div key={index}>{action}</div>
            ))}
          </div>
        )}
      </div>

      {/* Table */}
      <div className={`border border-1 rounded-lg overflow-hidden ${className}`}>
        <Table>
          <TableHeader>
            <TableRow>
              {enableSelection && (
                <TableHead className="w-[60px]">
                  <div className="flex justify-center items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded-full border-gray-300 accent-black text-gray-900 focus:ring-gray-500"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </div>
                </TableHead>
              )}

              {columns.map(column => (
                <TableHead key={column.id} className="font-bold text-black">
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                className={`${
                  isRowSelected(row.id) ? 'bg-gray-50' : ''
                } hover:bg-gray-200`}
              >
                {enableSelection && (
                  <TableCell className="">
                    <div className="flex justify-center items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded-full border-gray-300 text-gray-900 accent-black focus:ring-gray-500"
                        checked={isRowSelected(row.id)}
                        onChange={() => handleSelectRow(row.id)}
                      />
                    </div>
                  </TableCell>
                )}

                {columns.map(column => (
                  <TableCell key={`${row.id}-${column.id}`}>
                    {column.cell
                      ? column.cell(row)
                      : column.accessorKey
                        ? row[column.accessorKey] as React.ReactNode
                        : null}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}