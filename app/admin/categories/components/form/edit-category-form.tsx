import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import useEditCategory from '../hooks/useEditCategory';
import { CategoryColumn } from '../columns';
import { Controller } from 'react-hook-form';

interface PropsTypes {
  close: () => void;
  category: CategoryColumn;
  onSuccess: () => void;
}

export default function EditCategoryForm(props: PropsTypes) {
  const { close, category, onSuccess } = props;

  const { control, handleSubmit, errors, isPendingEditCategory, handleUpdate } =
    useEditCategory(category, onSuccess);

  return (
    <form onSubmit={handleSubmit(handleUpdate)}>
      <div className="grid gap-2">
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Category</FieldLabel>
              <Input
                {...field}
                disabled={isPendingEditCategory}
                type="text"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
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
          name="duration_days"
          render={({ field: { onChange, ...field }, fieldState }) => (
            <Field>
              <FieldLabel>Duration Loans</FieldLabel>
              <Input
                {...field}
                type="number"
                onChange={(e) => onChange(e.target.valueAsNumber || 0)}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
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
          name="fine_amount"
          render={({ field: { onChange, ...field }, fieldState }) => (
            <Field>
              <FieldLabel>Duration Loans</FieldLabel>
              <Input
                {...field}
                type="number"
                onChange={(e) => onChange(e.target.valueAsNumber || 0)}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
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
      </div>

      <div className="mt-4 flex gap-2 items-center justify-end">
        <Button type="button" variant="destructive" onClick={close}>
          Cancel
        </Button>
        <Button type="submit" className="bg-teal-500 hover:bg-teal-300">
          Save
        </Button>
      </div>
    </form>
  );
}
