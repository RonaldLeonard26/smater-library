import { Button } from '@/components/ui/button';
import useStudentRegister from '../hooks/use-student-register';
import { Spinner } from '@/components/ui/spinner';
import { Eye, EyeOff, IdCard, LockKeyhole, Mail, User } from 'lucide-react';
import useAdminRegister from '../hooks/use-admin-register';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import InputWithIcon from '@/components/common/input-with-icon';
import { Controller } from 'react-hook-form';

export default function StudentRegisterForm() {
  const {
    control,
    handleSubmit,
    isPendingStudentRegister,
    handleStudentRegister,
  } = useStudentRegister();
  const { handleVisiblePassword, visiblePassword } = useAdminRegister();
  return (
    <form
      onSubmit={handleSubmit(handleStudentRegister)}
      className="grid space-y-4 mb-2"
    >
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
        name="nisn"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>NISN</FieldLabel>
            <InputWithIcon
              {...field}
              type="text"
              aria-invalid={fieldState.invalid}
              leftIcon={<IdCard className="h-4 w-4" />}
              placeholder="Masukan NISN"
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

      <Button
        type="submit"
        disabled={isPendingStudentRegister}
        className="w-full bg-teal-600 hover:bg-teal-400"
      >
        {isPendingStudentRegister ? <Spinner className="size-6" /> : 'Daftar'}
      </Button>
    </form>
  );
}
