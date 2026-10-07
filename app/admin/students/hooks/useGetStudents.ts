import { studentServices } from '@/services/students.service';
import { GetStudentParams } from '@/types/student';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export default function useGetStudents({
  search,
  page,
  limit,
}: GetStudentParams) {
  const query = useQuery({
    queryKey: ['profiles', search, page, limit],
    queryFn: () => studentServices.getStudents({ search, page, limit }),
    placeholderData: keepPreviousData,
  });

  return {
    students: query.data?.items ?? [],
    total: query.data?.total ?? 0,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}
