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
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdminRegisterSchema>({
    resolver: zodResolver(adminRegisterSchema),
  });

  const { mutate: mutateAdminRegister, isPending: isPendingAdminRegister } =
    useMutation({
      mutationFn: (payload: AdminRegisterForm) =>
        authAdminServices.register(payload),
      onError: () => {
        toast.error('Failed to register');
      },
      onSuccess: () => {
        toast.success('Check your email for confirmation');
        reset();
      },
    });

  const handleRegister = (data: AdminRegisterSchema) => {
    const { confirmPassword, ...payload } = data;
    mutateAdminRegister(payload);
  };

  return {
    register,
    handleSubmit,
    errors,
    isPendingAdminRegister,
    handleRegister,

    handleVisiblePassword,
    visiblePassword,
  };
}
