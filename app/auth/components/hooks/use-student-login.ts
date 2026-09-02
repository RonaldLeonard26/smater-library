import { useRouter } from 'next/navigation';
import {
  StudentLoginForm,
  studentLoginSchema,
} from '../validation/student-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { authStudentService } from '@/services/auth.student.service';
import { toast } from 'sonner';

export default function useStudentLogin() {
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StudentLoginForm>({
    resolver: zodResolver(studentLoginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const { mutate: mutateStudentLogin, isPending: isPendingStudentLogin } =
    useMutation({
      mutationFn: (payload: StudentLoginForm) =>
        authStudentService.logIn(payload),
      onError: (error) => {
        toast.error(error.message || 'Gagal masuk ke akun anda');
      },
      onSuccess: () => {
        reset();
        router.push('/');
      },
    });

  const handleStudentLogin = (data: StudentLoginForm) =>
    mutateStudentLogin(data);

  return {
    control,
    register,
    handleSubmit,
    errors,
    isPendingStudentLogin,
    handleStudentLogin,
  };
}
