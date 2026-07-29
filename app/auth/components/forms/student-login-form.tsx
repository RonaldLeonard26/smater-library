import { Button } from '@/components/ui/button';

import useStudentLogin from '../hooks/use-student-login';
import useAdminRegister from '../hooks/use-admin-register';
import { Eye, EyeOff, IdCard, LockKeyhole } from 'lucide-react';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import InputWithIcon from '@/components/common/input-with-icon';
import { Controller } from 'react-hook-form';

import { Spinner } from '@/components/ui/spinner';

export default function StudentLoginForm() {
  const { handleVisiblePassword, visiblePassword } = useAdminRegister();
  const { control, handleSubmit, isPendingStudentLogin, handleStudentLogin } =
    useStudentLogin();
  return (
    <form onSubmit={handleSubmit(handleStudentLogin)} className="grid gap-2">
      <Controller
        control={control}
        name="nisn"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>NISN</FieldLabel>
            <InputWithIcon
              {...field}
              type="text"
              leftIcon={<IdCard className="h-4 w-4" />}
              aria-invalid={fieldState.invalid}
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
        name="password"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>Password</FieldLabel>
            <InputWithIcon
              {...field}
              type={visiblePassword.password ? 'text' : 'password'}
              leftIcon={<LockKeyhole className="h-4 w-4" />}
              aria-invalid={fieldState.invalid}
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
      <div className="flex justify-end items-end">
        <p className="text-xs text-primary">Lupa Password?</p>
      </div>
      <div className="mt-2">
        <Button
          type="submit"
          variant="outline"
          className="w-full bg-teal-500 text-white"
          disabled={isPendingStudentLogin}
        >
          {isPendingStudentLogin ? <Spinner /> : 'Masuk'}
        </Button>
      </div>
    </form>
  );
}
