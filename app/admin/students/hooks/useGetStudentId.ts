import { studentServices } from '@/services/students.service';
import { useQuery } from '@tanstack/react-query';

export default function useGetStudentId(studentId: string) {
  const query = useQuery({
    queryKey: ['profiles', studentId],
    queryFn: () => studentServices.getStudentById(studentId),
    enabled: !!studentId,
  });

  return {
    student: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
}
