import TablePagination from '@/components/data-table/table-pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { AllActiveLoans } from '@/types/loans';
import {
  flexRender,
  getCoreRowModel,
  OnChangeFn,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getReturnColumns } from './columns';

type ReturnTableProps = {
  data: AllActiveLoans[];
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  pagination: PaginationState;
  setPagination: OnChangeFn<PaginationState>;
  pageCount: number;
  onSelectionChange: (rows: AllActiveLoans[]) => void;
  resetSelectionKey: number;
  containerClassName: string;
  onReturn: (item: AllActiveLoans) => void;
};

export default function ReturnTable({
  data,
  globalFilter,
  setGlobalFilter,
  pageCount,
  pagination,
  setPagination,
  onSelectionChange,
  resetSelectionKey,
  onReturn,
  containerClassName,
}: ReturnTableProps) {
  const [selectedItems, setSelectedItems] = useState<
    Record<string, AllActiveLoans>
  >({});
  const selectedItemList = Object.values(selectedItems);
  const selectedStudentId = selectedItemList[0]?.student_id ?? null;

  const handleToggleRow = useCallback(
    (item: AllActiveLoans, checked: boolean) => {
      setSelectedItems((prev) => {
        const next = { ...prev };

        if (checked) {
          next[item.loan_item_id] = item;
        } else {
          delete next[item.loan_item_id];
        }

        return next;
      });
    },
    [],
  );

  const tableColumns = useMemo(
    () =>
      getReturnColumns({
        selectedItems,
        onToggleRow: handleToggleRow,
        onReturn,
      }),
    [onReturn, selectedItems, handleToggleRow],
  );

  const currentPageSelection = useMemo(() => {
    return data.reduce<Record<string, boolean>>((acc, row) => {
      acc[row.loan_item_id] = !!selectedItems[row.loan_item_id];
      return acc;
    }, {});
  }, [data, selectedItems]);
  const table = useReactTable({
    data,
    columns: tableColumns,
    manualPagination: true,
    pageCount,
    state: {
      pagination,
      rowSelection: currentPageSelection,
    },
    ...(setGlobalFilter && {
      onGlobalFilterChange: setGlobalFilter,
    }),
    getRowId: (row) => row.loan_item_id,

    enableRowSelection: (row) => {
      if (!selectedStudentId) return true;
      return row.original.student_id === selectedStudentId;
    },

    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
  });

  const rows = table.getRowModel().rows;
  //hitung jumlah row yg group valuenya sama dan berurutan
  const getRowSpan = (rowIndex: number, columId: string) => {
    if (columId !== 'student_name') return 1;
    const currentStudentId = rows[rowIndex]?.original.student_id;
    if (!currentStudentId) return 1;
    // Kalau bukan row pertama dan student sebelumnya sama,
    // cell ini tidak perlu dirender.
    if (
      rowIndex > 0 &&
      rows[rowIndex - 1]?.original.student_id === currentStudentId
    ) {
      return 0;
    }
    let span = 1;
    for (let i = rowIndex + 1; i < rows.length; i++) {
      if (rows[i].original.student_id !== currentStudentId) {
        break;
      }
      span++;
    }
    return span;
  };

  // ==========================
  useEffect(() => {
    setSelectedItems({});
  }, [resetSelectionKey]);
  // =============================

  useEffect(() => {
    onSelectionChange?.(Object.values(selectedItems));
  }, [selectedItems, onSelectionChange]);

  return (
    <div
      className={cn(
        'flex flex-col min-h-0 h-full overflow-hidden  ',
        containerClassName,
      )}
    >
      <div className="relative flex min-h-0 flex-1 overflow-auto rounded-md border">
        <div className="min-w-full  pr-2">
          <Table className="w-full" containerClassName="overflow-visible">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="sticky top-0 z-10  bg-white"
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
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, rowIndex) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => {
                      const rowSpan = getRowSpan(rowIndex, cell.column.id);
                      if (rowSpan === 0) {
                        return null;
                      }
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
                    colSpan={tableColumns.length}
                    className="h-24 text-center text-muted-foreground"
                  >
                    Tidak ada data.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <TablePagination table={table} />
    </div>
  );
}
