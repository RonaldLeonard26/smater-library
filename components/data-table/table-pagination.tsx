'use client';

import { Table } from '@tanstack/react-table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { LISTS_LIMIT } from '../../constants/list.constants';
import { Button } from '../ui/button';

type Props<TData> = {
  table: Table<TData>;
};

export default function TablePagination<TData>({ table }: Props<TData>) {
  return (
    <div className="flex items-center justify-between gap-4">
      {/* limit */}
      <Select
        value={String(table.getState().pagination.pageSize)}
        onValueChange={(value) => table.setPageSize(Number(value))}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {LISTS_LIMIT.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              Show : {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* pagination */}
      <div className="flex items-center pt-4">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Prev
        </Button>
        <span>{table.getState().pagination.pageIndex + 1}</span>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
