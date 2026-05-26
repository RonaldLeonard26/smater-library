import { useRouter } from 'next/navigation';
import {
  StudentLoginForm,
  studentLoginSchema,
  StudentLoginSchema,
} from '../validation/student-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { authStudentService } from '@/services/auth.student.service';
import { toast } from 'sonner';

export default function useStudentLogin() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StudentLoginSchema>({
    resolver: zodResolver(studentLoginSchema),
  });

  const { mutate: mutateStudentLogin, isPending: isPendingStudentLogin } =
    useMutation({
      mutationFn: (payload: StudentLoginForm) =>
        authStudentService.logIn(payload),
      onError: (err) => {
        console.error(err);
        toast.error('Failed to login');
      },
      onSuccess: () => {
        toast.success('Success to login');
        reset();
        router.push('/');
      },
    });

  const handleStudentLogin = (data: StudentLoginSchema) => {
    const { confirmPassword, ...payload } = data;
    mutateStudentLogin(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    isPendingStudentLogin,
    handleStudentLogin,
  };
}
