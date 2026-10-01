import { ColumnDef, OnChangeFn, PaginationState } from '@tanstack/react-table';

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  globalFilter?: string;
  setGlobalFilter?: (value: string) => void;

  pagination?: PaginationState;
  setPagination?: OnChangeFn<PaginationState>;
  pageCount?: number;

  emptyMessage?: string;
  containerClassName?: string;

  rowSpanBy?: keyof TData;
  rowSpanColumns?: string[];
  getRowId?: (row: TData) => string;

  onSelectionChange?: (rows: TData[]) => void;
  selectionResetKey?: number;
}
