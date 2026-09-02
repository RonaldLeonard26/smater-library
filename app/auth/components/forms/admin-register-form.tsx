import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useAdminRegister from '../hooks/use-admin-register';
import { Spinner } from '@/components/ui/spinner';
import { Eye, EyeOff, IdCard, LockKeyhole, Mail, User } from 'lucide-react';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Controller } from 'react-hook-form';
import InputWithIcon from '@/components/common/input-with-icon';

export default function AdminRegisterForm() {
  const {
    control,
    handleSubmit,
    errors,
    isPendingAdminRegister,
    handleRegister,
    handleVisiblePassword,
    visiblePassword,
  } = useAdminRegister();
  return (
    <form onSubmit={handleSubmit(handleRegister)} className=" grid gap-4">
      <Controller
        control={control}
        name="fullName"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="relative">
            <FieldLabel>Nama Lengkap</FieldLabel>
            <InputWithIcon
              {...field}
              type="text"
              aria-invalid={fieldState.invalid}
              leftIcon={<User className="h-4 w-4" />}
              placeholder="Masukan nama lengkap"
            />
            {fieldState.invalid && (
              <FieldError
                className="text-xs text-destructive"
                errors={[fieldState.error]}
              />
            )}
          </Field>
        )}
      />
      <Controller
        control={control}
        name="position"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="relative">
            <FieldLabel>Jabatan</FieldLabel>
            <InputWithIcon
              {...field}
              type="text"
              aria-invalid={fieldState.invalid}
              leftIcon={<IdCard className="h-4 w-4" />}
              placeholder="Masukan jabatan anda"
            />
            {fieldState.invalid && (
              <FieldError
                className="text-xs text-destructive"
                errors={[fieldState.error]}
              />
            )}
          </Field>
        )}
      />
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Email</FieldLabel>
            <InputWithIcon
              {...field}
              leftIcon={<Mail className="h-4 w-4" />}
              type="email"
              aria-invalid={fieldState.invalid}
              placeholder="Masukkan email aktif"
            />
            {fieldState.invalid && (
              <FieldError
                className="text-xs text-destructive"
                errors={[fieldState.error]}
              />
            )}
          </Field>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Password</FieldLabel>
            <InputWithIcon
              {...field}
              type={visiblePassword.password ? 'text' : 'password'}
              aria-invalid={fieldState.invalid}
              leftIcon={<LockKeyhole className="h-4 w-4" />}
              rightIcon={
                visiblePassword.password ? (
                  <Eye
                    className="h-4 w-4 cursor-pointer text-muted-foreground"
                    onClick={() => handleVisiblePassword('password')}
                  />
                ) : (
                  <EyeOff
                    className="h-4 w-4 cursor-pointer text-muted-foreground"
                    onClick={() => handleVisiblePassword('password')}
                  />
                )
              }
            />
            {fieldState.invalid && (
              <FieldError
                className="text-xs text-destructive"
                errors={[fieldState.error]}
              />
            )}
          </Field>
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Konfirmasi Password</FieldLabel>
            <InputWithIcon
              {...field}
              type={visiblePassword.confirmPassword ? 'text' : 'password'}
              leftIcon={<LockKeyhole className="h-4 w-4" />}
              aria-invalid={fieldState.invalid}
              rightIcon={
                visiblePassword.confirmPassword ? (
                  <Eye
                    className="h-4 w-4 cursor-pointer text-muted-foreground"
                    onClick={() => handleVisiblePassword('confirmPassword')}
                  />
                ) : (
                  <EyeOff
                    className="h-4 w-4 cursor-pointer text-muted-foreground"
                    onClick={() => handleVisiblePassword('confirmPassword')}
                  />
                )
              }
            />
            {fieldState.error && (
              <FieldError
                className="text-xs text-destructive"
                errors={[fieldState.error]}
              />
            )}
          </Field>
        )}
      />

      <div className="space-y-2">
        <Button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-400"
          disabled={isPendingAdminRegister}
        >
          {isPendingAdminRegister ? <Spinner className="size-6" /> : 'Daftar'}
        </Button>
      </div>
    </form>
  );
}
