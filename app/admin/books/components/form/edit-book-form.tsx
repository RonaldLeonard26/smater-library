import InputFile from '@/components/input-file';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useEditBook from '../hooks/useEditBook';
import { BookColumn } from '../columns';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Controller } from 'react-hook-form';
import { useEffect } from 'react';
import useCategoryOptions from '@/app/admin/categories/components/hooks/useCategoryOption';

interface PropsTypes {
  onSuccess: () => void;
  close: () => void;
  books?: BookColumn;
}

export default function EditBookForm(props: PropsTypes) {
  const { onSuccess, close, books } = props;
  const { categories, isLoading } = useCategoryOptions();
  const {
    control,
    handleSubmit,
    errors,
    isPendingEditBook,
    handleUpdate,
    reset,
  } = useEditBook({ onSuccess, books });

  useEffect(() => {
    if (books) {
      reset({
        title: books.title,
        author: books.author,
        category_id: books.category_id,
        cover_url: books.cover_url,
      });
    }
  }, [books, reset]);
  return (
    <form onSubmit={handleSubmit(handleUpdate)}>
      <div className=" max-h-80 overflow-y-auto scrollbar-thin px-3">
        <div className="grid gap-2">
          <Controller
            control={control}
            name="title"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Judul</FieldLabel>
                <Input
                  {...field}
                  disabled={isPendingEditBook}
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
            name="author"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Penulis</FieldLabel>
                <Input
                  {...field}
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
            name="category_id"
            render={({ field: { onChange, value }, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Kategori</FieldLabel>
                <Select
                  value={value ? String(value) : ''}
                  onValueChange={(value) => onChange(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Please select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={String(category.id)}>
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
          <div className="space-y-2">
            <Controller
              control={control}
              name="cover_url"
              render={({ field, fieldState }) => (
                <InputFile
                  {...field}
                  name="cover_url"
                  defaultValue={books?.cover_url}
                  onChange={(file) => field.onChange(file)}
                />
              )}
            />
            {errors?.cover_url && (
              <p className="text-destructive text-xs">
                {errors.cover_url.message as string}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center pt-2 justify-end gap-2">
        <Button
          type="button"
          variant="destructive"
          onClick={close}
          disabled={isPendingEditBook}
        >
          Cancel
        </Button>
        <Button type="submit" variant="outline" disabled={isPendingEditBook}>
          {isPendingEditBook ? <Spinner className="size-6" /> : 'Save'}
        </Button>
      </div>
    </form>
  );
}
