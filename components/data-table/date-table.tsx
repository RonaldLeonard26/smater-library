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
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  pagination: PaginationState;
  setPagination: OnChangeFn<PaginationState>;
  pageCount: number;
}

export default function DataTable<TData, TValue>({
  data,
  columns,
  globalFilter,
  setGlobalFilter,
  pagination,
  setPagination,
  pageCount,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    manualPagination: true,
    pageCount,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* pagination and limit */}
      {/* {data.length > 10 && <TablePagination table={table} />} */}
      <TablePagination table={table} />
    </div>
  );
}
