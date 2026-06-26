import InputFile from '@/components/input-file';
import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Trash } from 'lucide-react';
import useAddBooks from '../hooks/useAddBooks';
import { Controller } from 'react-hook-form';
import useCategories from '@/app/admin/categories/components/hooks/useCategories';
import { Spinner } from '@/components/ui/spinner';

interface PropsTypes {
  close: () => void;
  onSuccess: () => void;
}

export default function AddBooksForm(props: PropsTypes) {
  const { close, onSuccess } = props;
  const { dataCategories, isLoadingCategories } = useCategories();
  const {
    control,
    handleSubmit,
    errors,
    isPendingAddBooks,
    handleSave,

    fields,
    append,
    remove,
  } = useAddBooks({ onSuccess });

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <div className="max-h-80 overflow-y-auto scrollbar-thin px-4">
        {fields.map((field, index) => (
          <div key={field.id} className=" grid gap-4">
            <Controller
              control={control}
              name={`books.${index}.title`}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                  <Input
                    {...field}
                    type="text"
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    placeholder="Input book title here..."
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
              name={`books.${index}.author`}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Author</FieldLabel>
                  <Input
                    {...field}
                    type="text"
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    placeholder="Input book author here..."
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
              name={`books.${index}.stock`}
              render={({ field: { onChange, ...field }, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Stock</FieldLabel>
                  <Input
                    {...field}
                    type="number"
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    onChange={(e) => onChange(e.target.valueAsNumber || 0)}
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
              name={`books.${index}.category_id`}
              render={({ field: { onChange, value }, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Category</FieldLabel>
                  <Select
                    onValueChange={onChange}
                    value={value ? String(value) : undefined}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Please select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {dataCategories?.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={String(category.id)}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
              name={`books.${index}.cover_url`}
              render={({ field, fieldState }) => (
                <div className="pt-2">
                  <InputFile
                    name={field.name}
                    onChange={(file) => field.onChange(file)}
                    defaultValue={
                      typeof field.value === 'string' ? field.value : undefined
                    }
                  />
                  {fieldState.invalid && (
                    <FieldError
                      className="text-xs py-2 text-destructive"
                      errors={[fieldState.error]}
                    />
                  )}
                </div>
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
      <div className="flex px-4 items-center mt-4 justify-center">
        {fields.length < 5 && (
          <Button
            className="w-full bg-gray-100 hover:bg-gray-50"
            type="button"
            variant="outline"
            disabled={isPendingAddBooks}
            onClick={() =>
              append({
                title: '',
                author: '',
                category_id: 0,
                stock: 0,
                cover_url: null,
              })
            }
          >
            <Plus size={14} /> Add More Books
          </Button>
        )}
      </div>
      <div className="flex gap-2 items-center justify-end py-2">
        <Button
          variant="destructive"
          type="button"
          disabled={isPendingAddBooks}
          onClick={close}
        >
          Cancel
        </Button>
        <Button variant="outline" type="submit">
          {isPendingAddBooks ? <Spinner className="size-6" /> : 'Save'}
        </Button>
      </div>
    </form>
  );
}
