import { useForm } from 'react-hook-form';
import {
  StudentRegisterForm,
  studentRegisterSchema,
  StudentRegisterSchema,
} from '../validation/student-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { authStudentService } from '@/services/auth.student.service';
import { toast } from 'sonner';

export default function useStudentRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StudentRegisterSchema>({
    resolver: zodResolver(studentRegisterSchema),
  });

  const { mutate: mutateStudentRegister, isPending: isPendingStudentRegister } =
    useMutation({
      mutationFn: (payload: StudentRegisterForm) =>
        authStudentService.register(payload),
      onError: () => {
        toast.error('Failed to register');
      },
      onSuccess: () => {
        toast.success('Check your email for confirmation');
        reset();
      },
    });

  const handleStudentRegister = (data: StudentRegisterSchema) => {
    const { confirmPassword, ...payload } = data;
    mutateStudentRegister(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    isPendingStudentRegister,
    handleStudentRegister,
  };
}
