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
import { MoveLeft, MoveRight } from 'lucide-react';

type Props<TData> = {
  table: Table<TData>;
};

export default function TablePagination<TData>({ table }: Props<TData>) {
  return (
    <div className="flex items-center py-4 justify-center md:justify-between">
      {/* limit */}
      <Select
        value={String(table.getState().pagination.pageSize)}
        onValueChange={(value) => table.setPageSize(Number(value))}
      >
        <SelectTrigger className="hidden md:flex">
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
      <div className="flex gap-2 items-center ">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          variant="outline"
        >
          <MoveLeft strokeWidth={2} />
        </Button>
        <span className="text-muted-foreground font-semibold">
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          variant="outline"
        >
          <MoveRight strokeWidth={2} />
        </Button>
      </div>
    </div>
  );
}
