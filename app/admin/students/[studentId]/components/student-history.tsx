import DataTable from '@/components/data-table/date-table';
import { columns } from './columns';
import useGetHistory from '../../hooks/useGetHistory';
import { useState } from 'react';
import { LIMIT_DEFAULT, PAGE_DEFAULT } from '@/constants/list.constants';
import HistoryFilter, {
  HistoryFilterValue,
} from '@/app/admin/transactions/history/components/history-filter';
import TableToolbar from '@/components/data-table/table-toolbar';
import { SkeletonTable } from '@/components/skeleton/skeleton-table';
import HistorySummary from './summary-card';

interface StudentHistoryProps {
  studentId: string;
}

export default function StudentHistory({ studentId }: StudentHistoryProps) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState({
    pageIndex: PAGE_DEFAULT,
    pageSize: Number(LIMIT_DEFAULT),
  });
  const [filters, setFilters] = useState<HistoryFilterValue>({
    statuses: [],
    isOverdue: false,
  });
  const { history, isLoading, total, error, summary } = useGetHistory({
    studentId: studentId,
    search: globalFilter,
    statuses: filters.statuses,
    isOverdue: filters.isOverdue,
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });

  return (
    <div className="h-full flex min-h-0 flex-col gap-4 overflow-hidden">
      <TableToolbar
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        childrenPosition="left"
      >
        <HistoryFilter value={filters} onChange={setFilters} />
        <HistorySummary
          total_fine={summary?.total_fine ?? 0}
          total={summary?.total ?? 0}
        />
      </TableToolbar>
      <div className="min-h-0 flex-1">
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <DataTable
            columns={columns}
            data={history || []}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            pageCount={Math.ceil(total / pagination.pageSize)}
            pagination={pagination}
            setPagination={setPagination}
            rowSpanBy="book_id"
            rowSpanColumns={['book_title']}
            containerClassName="max-h-[72vh]"
          />
        )}
      </div>
    </div>
  );
}
