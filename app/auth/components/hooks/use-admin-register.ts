import { useForm } from 'react-hook-form';
import {
  AdminRegisterForm,
  adminRegisterSchema,
  AdminRegisterSchema,
} from '../validation/admin-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { authAdminServices } from '@/services/auth.admin.service';
import { toast } from 'sonner';
import { useState } from 'react';

export default function useAdminRegister() {
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
      fullName: '',
      email: '',
      position: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate: mutateAdminRegister, isPending: isPendingAdminRegister } =
    useMutation({
      mutationFn: (payload: AdminRegisterForm) =>
        authAdminServices.register(payload),
      onError: (error) => {
        toast.error(error.message || 'Pendaftaran akun anda gagal');
      },
      onSuccess: () => {
        toast.success('Periksa email untuk melakukan konfirmasi');
        reset();
      },
    });

  const handleRegister = (data: AdminRegisterForm) => mutateAdminRegister(data);

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
