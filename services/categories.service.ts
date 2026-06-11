import {
  CategoriesForm,
  EditCategoryForm,
} from '@/app/admin/categories/components/validation';
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const categoriesServices = {
  async getAll() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('id', { ascending: false });

    if (error) throw error;
    return data;
  },
  async create(payload: CategoriesForm) {
    const { data, error } = await supabase
      .from('categories')
      .insert(payload.categories);

    if (error) {
      if (error.code === '23505') {
        throw new Error('Salah satu nama kategori sudah terdaftar di sistem.');
      }
      throw new Error(error.message);
    }

    return data;
  },
  async update(id: number, payload: EditCategoryForm) {
    const { data, error } = await supabase
      .from('categories')
      .update(payload)
      .eq('id', id)
      .select();

    if (error) {
      if (error.code === '23505') {
        throw new Error('Category is available');
      }
      throw new Error(error.message);
    }
    return data;
  },
  async remove(id: number) {
    const { data, error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return data;
  },
};
