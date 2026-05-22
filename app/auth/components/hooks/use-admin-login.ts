import { useForm } from 'react-hook-form';
import {
  AdminLoginForm,
  adminLoginSchema,
  AdminLoginSchema,
} from '../validation/admin-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { authAdminServices } from '@/services/auth.admin.service';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function useAdminLogin() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdminLoginSchema>({
    resolver: zodResolver(adminLoginSchema),
  });

  const { mutate: mutateAdminLogin, isPending: isPendingAdminLogin } =
    useMutation({
      mutationFn: (payload: AdminLoginForm) => authAdminServices.logIn(payload),
      onError: () => {
        toast.error('Failed to login');
      },
      onSuccess: () => {
        toast.success('Success to login');
        reset();
        router.push('/admin/dashboard');
      },
    });

  const handleLogin = (data: AdminLoginSchema) => {
    const { confirmPassword, ...payload } = data;
    mutateAdminLogin(payload);
  };
  return { handleLogin, isPendingAdminLogin, register, errors, handleSubmit };
}
