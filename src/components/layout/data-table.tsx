"use client";

import { useState, ReactNode } from 'react';
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
      <div className={`border border-gray-300 rounded-lg overflow-hidden ${className}`}>
        <Table>
          <TableHeader>
            <TableRow>
              {enableSelection && (
                <TableHead className="w-[60px]">
<div className="flex justify-center items-center">
  <label className="inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="hidden"
      checked={selectAll}
      onChange={handleSelectAll}
    />
    <span className={`w-5 h-5 border border-black rounded-full relative flex items-center justify-center ${selectAll ? 'bg-black border-black' : selectedRows.length > 0 && selectedRows.length < data.length ? 'bg-black border-black' : ''}`}>
      {selectAll ? (
        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
        </svg>
      ) : selectedRows.length > 0 && selectedRows.length < data.length ? (
        <div className="flex flex-col items-center">
          <div className="w-2 h-0.5 bg-white mb-0.5"></div>
          <div className="w-1.5 h-0.5 bg-white"></div>
        </div>
      ) : null}
    </span>
  </label>
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
  <label className="inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="hidden"
      checked={isRowSelected(row.id)}
      onChange={() => handleSelectRow(row.id)}
    />
    <span className={`w-5 h-5 border border-black rounded-full relative flex items-center justify-center ${isRowSelected(row.id) ? 'bg-black border-black' : ''}`}>
      {isRowSelected(row.id) && (
        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
        </svg>
      )}
    </span>
  </label>
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