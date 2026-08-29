import InputWithIcon from '@/components/common/input-with-icon';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Eye, EyeOff, LockKeyhole } from 'lucide-react';
import useChangePass from '../hooks/useChangePass';
import { Controller } from 'react-hook-form';
import { Spinner } from '@/components/ui/spinner';

export default function ChangePasswordForm() {
  const {
    control,
    handleSubmit,
    isPending,
    onSubmit,
    toggleVisibility,
    visiblePassword,
  } = useChangePass();
  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="oldPassword"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Password Lama</FieldLabel>
            <InputWithIcon
              {...field}
              aria-invalid={fieldState.invalid}
              leftIcon={<LockKeyhole className="h-4 w-4" />}
              type={visiblePassword.oldPassword ? 'text' : 'password'}
              rightIcon={
                visiblePassword.oldPassword ? (
                  <Eye
                    className="h-4 w-4 cursor-pointer text-muted-foreground"
                    onClick={() => toggleVisibility('oldPassword')}
                  />
                ) : (
                  <EyeOff
                    className="h-4 w-4 cursor-pointer text-muted-foreground"
                    onClick={() => toggleVisibility('oldPassword')}
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
        name="newPassword"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Password Baru</FieldLabel>
            <InputWithIcon
              {...field}
              aria-invalid={fieldState.invalid}
              leftIcon={<LockKeyhole className="h-4 w-4" />}
              type={visiblePassword.newPassword ? 'text' : 'password'}
              rightIcon={
                visiblePassword.newPassword ? (
                  <Eye
                    className="h-4 w-4 cursor-pointer text-muted-foreground"
                    onClick={() => toggleVisibility('newPassword')}
                  />
                ) : (
                  <EyeOff
                    className="h-4 w-4 cursor-pointer text-muted-foreground"
                    onClick={() => toggleVisibility('newPassword')}
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
          <Field>
            <FieldLabel>Konfirmasi Password</FieldLabel>
            <InputWithIcon
              {...field}
              aria-invalid={fieldState.invalid}
              leftIcon={<LockKeyhole className="h-4 w-4" />}
              type={visiblePassword.confirmPassword ? 'text' : 'password'}
              rightIcon={
                visiblePassword.confirmPassword ? (
                  <Eye
                    className="h-4 w-4 cursor-pointer text-muted-foreground"
                    onClick={() => toggleVisibility('confirmPassword')}
                  />
                ) : (
                  <EyeOff
                    className="h-4 w-4 cursor-pointer text-muted-foreground"
                    onClick={() => toggleVisibility('confirmPassword')}
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
      ></Controller>

      <div className="flex items justify-end gap-2">
        <Button variant="destructive">Batal</Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? <Spinner className="size-6" /> : 'Simpan'}
        </Button>
      </div>
    </form>
  );
}
