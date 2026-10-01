import { ActiveLoanItem } from '@/types/loans';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getActiveLoanColumns } from './columns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import TableToolbar from '@/components/data-table/table-toolbar';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

type StudentLoanTable = {
  data: ActiveLoanItem[];
  onReturn: (item: ActiveLoanItem) => void;
  onSelectionChange: (items: ActiveLoanItem[]) => void;
  containerClassName?: string;
  resetSelectionKey: number;
  onBulkReturn: (items: ActiveLoanItem[]) => void;
};

export default function StudentLoanTable({
  data,
  onReturn,
  onBulkReturn,
  onSelectionChange,
  containerClassName,
  resetSelectionKey,
}: StudentLoanTable) {
  //=======================================================
  const [selectedItems, setSelectedItems] = useState<
    Record<string, ActiveLoanItem>
  >({});
  const selectedItemsArray = Object.values(selectedItems);

  //===========================================================
  const handleToggleRow = useCallback(
    (item: ActiveLoanItem, checked: boolean) => {
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

  // ==================================================================
  const tableColumns = useMemo(
    () =>
      getActiveLoanColumns({
        selectedItems,
        onToggleRow: handleToggleRow,
        onReturn,
      }),
    [onReturn, selectedItems, handleToggleRow],
  );

  // =====================================================================
  const table = useReactTable({
    data,
    columns: tableColumns,
    getRowId: (row) => row.loan_item_id,
    getCoreRowModel: getCoreRowModel(),
  });

  //==========================
  useEffect(() => {
    setSelectedItems({});
  }, [resetSelectionKey]);
  // =============================

  useEffect(() => {
    onSelectionChange?.(Object.values(selectedItems));
  }, [selectedItems, onSelectionChange]);
  //===============================================
  return (
    <div
      className={cn(
        'flex flex-col space-y-2 min-h-0 h-full overflow-hidden  ',
        containerClassName,
      )}
    >
      <TableToolbar hideFilter>
        <Button
          type="button"
          disabled={selectedItemsArray.length === 0}
          onClick={() => onBulkReturn(selectedItemsArray)}
          className="h-8"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Kembalikan({selectedItemsArray.length})
        </Button>
      </TableToolbar>
      <div className="relative flex min-h-0 flex-1 overflow-auto rounded-md border pr-2">
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
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={
                    selectedItems[row.original.loan_item_id]
                      ? 'selected'
                      : undefined
                  }
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
                  colSpan={tableColumns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  Tidak ada data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
