import useDebounce from '@/components/hooks/useDebounce';
import { studentServices } from '@/services/students.service';
import { StudentHistoryParams } from '@/types/student';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export default function useGetHistory({
  studentId,
  search,
  statuses,
  isOverdue,
  page,
  limit,
}: StudentHistoryParams) {
  const normalizedStatuses = [...statuses].sort();
  const debounceSearch = useDebounce(search, 300);
  const query = useQuery({
    queryKey: [
      'student-loan-history',
      studentId,
      page,
      limit,
      debounceSearch,
      isOverdue,
      normalizedStatuses,
    ],
    queryFn: () =>
      studentServices.getStudentHistory({
        studentId,
        search,
        statuses: normalizedStatuses,
        isOverdue,
        page,
        limit,
      }),
    enabled: !!studentId,
    placeholderData: keepPreviousData,
  });
  return {
    history: query.data?.items ?? [],
    total: query.data?.total ?? 0,
    summary: query.data?.summary,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    error: query.error,
  };
}
