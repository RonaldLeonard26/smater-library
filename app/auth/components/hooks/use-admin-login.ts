import { useForm } from 'react-hook-form';
import {
  AdminLoginForm,
  adminLoginSchema,
} from '../validation/admin-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { authAdminServices } from '@/services/auth.admin.service';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function useAdminLogin() {
  const [visiblePassword, setVisiblePassword] = useState({
    oldPassword: false,
    password: false,
    confirmPassword: false,
  });

  // 2. Perbarui tipe kuncinya menjadi 3 pilihan
  type PasswordFieldKey = 'oldPassword' | 'password' | 'confirmPassword';

  const handleVisiblePassword = (key: PasswordFieldKey) => {
    setVisiblePassword((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdminLoginForm>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: mutateAdminLogin, isPending: isPendingAdminLogin } =
    useMutation({
      mutationFn: (payload: AdminLoginForm) => authAdminServices.logIn(payload),
      onError: (error) => {
        toast.error(error.message || 'Gagal masuk ke akun anda');
      },
      onSuccess: () => {
        reset();
        router.push('/admin/dashboard');
      },
    });

  const handleLogin = (data: AdminLoginForm) => mutateAdminLogin(data);
  return {
    handleLogin,
    isPendingAdminLogin,
    control,
    errors,
    handleSubmit,
    visiblePassword,
    handleVisiblePassword,
  };
}
