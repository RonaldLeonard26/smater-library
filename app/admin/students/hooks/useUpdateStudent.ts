import { useForm } from 'react-hook-form';
import {
  StudentProfileFormValues,
  studentProfileSchema,
} from '../schemas/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Student } from '@/types/student';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { studentServices } from '@/services/students.service';
import { toast } from 'sonner';

interface PropsTypes {
  student: Student;
}

export default function useUpdateStudent({ student }: PropsTypes) {
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset } = useForm<StudentProfileFormValues>({
    resolver: zodResolver(studentProfileSchema),
    defaultValues: {
      nisn: student.nisn,
      nis: student.nis,
    },
  });
  const { mutate: updateStudent, isPending: isUpdatingStudent } = useMutation({
    mutationFn: (payload: StudentProfileFormValues) => {
      if (!student.id) throw new Error('Data siswa tidak ditemukan');

      return studentServices.updateStudent(student.id, payload);
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal mengubah data');
    },
    onSuccess: () => {
      toast.success('Berhasil mengubah data siswa');

      queryClient.invalidateQueries({ queryKey: ['profiles'] });
    },
  });
  const handleUpdate = (data: StudentProfileFormValues) => updateStudent(data);

  return {
    handleUpdate,
    isUpdatingStudent,
    control,
    handleSubmit,
    reset,
  };
}
