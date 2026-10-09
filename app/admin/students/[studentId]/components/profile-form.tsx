import InputWithIcon from '@/components/common/input-with-icon';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { IdCard, User } from 'lucide-react';
import useUpdateStudent from '../../hooks/useUpdateStudent';
import { Student } from '@/types/student';
import { Controller } from 'react-hook-form';
import { Spinner } from '@/components/ui/spinner';

interface ProfileFormProps {
  student: Student;
}

export default function ProfileForm({ student }: ProfileFormProps) {
  const { handleUpdate, isUpdatingStudent, control, handleSubmit, reset } =
    useUpdateStudent({ student });
  return (
    <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
      <Controller
        control={control}
        name="nisn"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Nisn</FieldLabel>
            <InputWithIcon
              {...field}
              aria-invalid={fieldState.invalid}
              className="text-sm"
              leftIcon={<IdCard className="h-4 w-4" />}
              disabled={isUpdatingStudent}
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
        name="nis"
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Nis</FieldLabel>
            <InputWithIcon
              {...field}
              aria-invalid={fieldState.invalid}
              className="text-sm"
              leftIcon={<IdCard className="h-4 w-4" />}
              disabled={isUpdatingStudent}
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

      <div className="flex items-center justify-end gap-1.5">
        <Button
          type="button"
          onClick={() => reset()}
          variant="destructive"
          className="cursor-pointer"
        >
          Batal
        </Button>
        <Button
          type="submit"
          className="cursor-pointer hover:bg-accent hover:text-primary"
          disabled={isUpdatingStudent}
        >
          {isUpdatingStudent ? <Spinner /> : 'Simpan'}
        </Button>
      </div>
    </form>
  );
}
