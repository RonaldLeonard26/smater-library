import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useAdminLogin from '../hooks/use-admin-login';
import { Spinner } from '@/components/ui/spinner';
import { Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import InputWithIcon from '@/components/common/input-with-icon';

export default function AdminLoginForm() {
  const {
    handleLogin,
    isPendingAdminLogin,
    control,

    handleSubmit,
    visiblePassword,
    handleVisiblePassword,
  } = useAdminLogin();
  return (
    <form onSubmit={handleSubmit(handleLogin)} className="grid space-y-4">
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
      <div className="flex items-center justify-end text-xs">
        <p className="text-xs">Lupa password?</p>
      </div>
      <Button
        type="submit"
        className="w-full bg-teal-500 hover:bg-teal-400"
        disabled={isPendingAdminLogin}
      >
        {isPendingAdminLogin ? <Spinner className="size-6" /> : 'Masuk'}
      </Button>
    </form>
  );
}
