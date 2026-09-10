import { Control, useFieldArray, Controller } from 'react-hook-form';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash } from 'lucide-react';
import { BooksForm } from './validation';

interface IsbnFieldsProps {
  nestIndex: number;
  control: Control<BooksForm>;
}

export function IsbnFields({ nestIndex, control }: IsbnFieldsProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `books.${nestIndex}.isbn`,
  });

  return (
    <div className="space-y-2">
      <FieldLabel>ISBN</FieldLabel>

      {fields.map((fieldItem, k) => (
        <Controller
          key={fieldItem.id}
          control={control}
          name={`books.${nestIndex}.isbn.${k}.value`}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center gap-2">
                <Input
                  {...field}
                  type="text"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  placeholder={`ISBN ${k + 1}...`}
                />
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
                    onClick={() => remove(k)}
                  >
                    <Trash size={16} />
                  </Button>
                )}
              </div>
              {fieldState.invalid && (
                <FieldError
                  className="text-xs text-destructive"
                  errors={[fieldState.error]}
                />
              )}
            </Field>
          )}
        />
      ))}

      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="text-xs text-primary hover:bg-primary/10 flex items-center gap-1 h-8 px-2"
        onClick={() => append({ value: '' })}
      >
        <Plus size={14} /> Tambah ISBN Lain
      </Button>
    </div>
  );
}
