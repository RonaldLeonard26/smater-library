import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useAddCategories from '../hooks/useAddCategories';
import { Plus, Trash } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';

interface PropsTypes {
  close: () => void;
  onSuccess: () => void;
}
export default function AddCategoryForm(props: PropsTypes) {
  const { close, onSuccess } = props;
  const {
    handleSubmit,
    control,
    fields,
    append,
    remove,
    isPendingCategories,
    handleSave,
  } = useAddCategories(onSuccess);
  return (
    <form onSubmit={handleSubmit(handleSave)} className=" grid gap-4 px-2">
      <div className="grid gap-4 max-h-80 no-scrollbar overflow-y-auto">
        {fields.map((field, index) => (
          <div key={field.id} className="grid gap-4 p-4 rounded-lg shadow-sm">
            <Controller
              control={control}
              name={`categories.${index}.name`}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                  <Input
                    {...field}
                    type="text"
                    id={field.name}
                    placeholder="Input category here..."
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
              name={`categories.${index}.duration_days`}
              render={({ field: { onChange, ...field }, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Duration Loans</FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) => onChange(e.target.valueAsNumber || 0)}
                    disabled={isPendingCategories}
                    id={field.name}
                    placeholder="Input duration loans here..."
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
              name={`categories.${index}.fine_amount`}
              render={({ field: { onChange, ...field }, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Fine Amount</FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) => onChange(e.target.valueAsNumber || 0)}
                    min={0}
                    disabled={isPendingCategories}
                    id={field.name}
                    placeholder="Input fine amount here..."
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
            {fields.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                className="w-full mb-4 flex items-center justify-center"
                onClick={() => remove(index)}
              >
                <Trash size={14} />
              </Button>
            )}
          </div>
        ))}
      </div>
      <div className="mt-2">
        {fields.length < 5 && (
          <Button
            className="w-full bg-gray-100 hover:bg-gray-50"
            type="button"
            variant="outline"
            onClick={() =>
              append({ name: '', duration_days: 1, fine_amount: 0 })
            }
          >
            <Plus size={14} /> Add More Categories
          </Button>
        )}
      </div>

      <div className="flex items-center justify-end mt-2 gap-2">
        <Button onClick={() => close()} type="button" variant="destructive">
          Cancel
        </Button>
        <Button type="submit" variant="outline">
          Save
        </Button>
      </div>
    </form>
  );
}
