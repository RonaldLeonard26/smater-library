import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import TablePagination from './table-pagination';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { DataTableProps } from '@/types/data-table';

export default function DataTable<TData, TValue>({
  data,
  columns,
  globalFilter,
  setGlobalFilter,
  pagination,
  setPagination,
  pageCount,
  emptyMessage = 'No results.',
  containerClassName,
  rowSpanBy,
  rowSpanColumns = [],
  getRowId,
  onSelectionChange,
  selectionResetKey,
}: DataTableProps<TData, TValue>) {
  // Cek apakah fitur pagination diaktifkan via props
  const enablePagination = !!pagination && !!setPagination;
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    getRowId,

    // Masukkan state & handler pagination HANYA jika enabled
    ...(enablePagination && {
      state: { pagination, rowSelection },
      enableRowSelection: true,
      onRowSelectionChange: (updater) => {
        setRowSelection((prev) => {
          const next = typeof updater === 'function' ? updater(prev) : updater;

          return next;
        });
      },

      onPaginationChange: setPagination,
      manualPagination: true,
      pageCount,
      getPaginationRowModel: getPaginationRowModel(),
    }),
    ...(setGlobalFilter && {
      onGlobalFilterChange: setGlobalFilter,
    }),

    getCoreRowModel: getCoreRowModel(),
  });

  const rows = table.getRowModel().rows;

  //hitung jumlah row yg group value sama dan berurutan
  const getRowSpan = (rowIndex: number) => {
    if (!rowSpanBy) return 1;

    const currentRow = rows[rowIndex];
    const currentValue = currentRow.original[rowSpanBy];

    let span = 1;

    for (let i = rowIndex + 1; i < rows.length; i++) {
      const nextValue = rows[i].original[rowSpanBy];

      if (nextValue !== currentValue) {
        break;
      }

      span++;
    }

    return span;
  };

  //cek apakah cell harus di hide karena sudah di wakili row sblumnya
  const shouldSkipRowSpanCell = (rowIndex: number, columnId: string) => {
    if (!rowSpanBy) return false;
    if (!rowSpanColumns.includes(columnId)) {
      return false;
    }
    if (rowIndex === 0) return false;
    const currentRow = rows[rowIndex];
    const previousRow = rows[rowIndex - 1];

    return currentRow.original[rowSpanBy] === previousRow.original[rowSpanBy];
  };

  // ==========================
  useEffect(() => {
    setRowSelection({});
  }, [selectionResetKey]);
  // =============================

  useEffect(() => {
    const selectedRows = table
      .getSelectedRowModel()
      .rows.map((row) => row.original);

    onSelectionChange?.(selectedRows);
  }, [rowSelection, onSelectionChange, table]);

  return (
    <div
      className={cn(
        'flex flex-col h-full min-h-0 overflow-hidden ',
        containerClassName,
      )}
    >
      {/* table */}
      <div className="relative flex min-h-0 flex-1 overflow-auto rounded-md border">
        <div className="min-w-full pr-2">
          <Table className="w-full" containerClassName="overflow-visible">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="sticky top-0 z-10 bg-white"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {rows.length ? (
                rows.map((row, rowIndex) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      const shouldSkip = shouldSkipRowSpanCell(
                        rowIndex,
                        cell.column.id,
                      );

                      if (shouldSkip) {
                        return null;
                      }

                      const shouldRowSpan = rowSpanColumns.includes(
                        cell.column.id,
                      );

                      const rowSpan = shouldRowSpan ? getRowSpan(rowIndex) : 1;

                      return (
                        <TableCell
                          key={cell.id}
                          rowSpan={rowSpan}
                          className={rowSpan > 1 ? 'align-top' : undefined}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-muted-foreground text-center"
                  >
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* pagination and limit */}

      {/* Pagination hanya dirender jika props pagination dikirim */}
      {enablePagination && <TablePagination table={table} />}
    </div>
  );
}
