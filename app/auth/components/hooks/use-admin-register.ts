import { useForm } from 'react-hook-form';
import {
  AdminRegisterForm,
  adminRegisterSchema,
  AdminRegisterSchema,
} from '../validation/admin-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useState } from 'react';
import { setUpFirstAdmin } from '@/app/setup/actions';
import { useRouter } from 'next/navigation';

export default function useAdminRegister() {
  const router = useRouter();
  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleVisiblePassword = (key: 'password' | 'confirmPassword') => {
    setVisiblePassword({
      ...visiblePassword,
      [key]: !visiblePassword[key],
    });
  };
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdminRegisterSchema>({
    resolver: zodResolver(adminRegisterSchema),
    defaultValues: {
      setUpCode: '',
      fullName: '',
      email: '',
      position: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate: mutateAdminRegister, isPending: isPendingAdminRegister } =
    useMutation({
      mutationFn: async (payload: AdminRegisterForm) => {
        const res = await setUpFirstAdmin(payload);
        if (res.error) throw new Error(res.error);
      },

      onError: (error) => {
        toast.error(error.message || 'Pendaftaran akun anda gagal');
      },
      onSuccess: () => {
        toast.success('Periksa email untuk melakukan konfirmasi');
        reset();
        router.replace('/auth');
      },
    });

  const handleRegister = ({
    confirmPassword,
    ...payload
  }: AdminRegisterSchema) => mutateAdminRegister(payload);

  return {
    register,
    control,
    handleSubmit,
    errors,
    isPendingAdminRegister,
    handleRegister,

    handleVisiblePassword,
    visiblePassword,
  };
}
