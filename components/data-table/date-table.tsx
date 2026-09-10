import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  OnChangeFn,
  PaginationState,
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  globalFilter?: string;
  setGlobalFilter?: (value: string) => void;
  pagination?: PaginationState;
  setPagination?: OnChangeFn<PaginationState>;
  pageCount?: number;
  emptyMessage?: string;
}

export default function DataTable<TData, TValue>({
  data,
  columns,
  globalFilter,
  setGlobalFilter,
  pagination,
  setPagination,
  pageCount,
  emptyMessage = 'No results.',
}: DataTableProps<TData, TValue>) {
  // Cek apakah fitur pagination diaktifkan via props
  const enablePagination = !!pagination && !!setPagination;

  const table = useReactTable({
    data,
    columns,
    // Masukkan state & handler pagination HANYA jika enabled
    ...(enablePagination && {
      state: { pagination },
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

  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden">
      {/* table */}
      <div className="flex flex-1 min-h0 relative rounded-md border overflow-y-auto scrollbar-thin">
        <Table className="relative">
          <TableHeader className="sticky top-0 bg-white z-10 ">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
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

      {/* pagination and limit */}

      {/* Pagination hanya dirender jika props pagination dikirim */}
      {enablePagination && <TablePagination table={table} />}
    </div>
  );
}
