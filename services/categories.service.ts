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
  async getAll(page: number, limit: number, search: string) {
    const from = page * limit;
    const to = from + limit - 1;
    let query = supabase.from('categories').select('*', { count: 'exact' });

    if (search) {
      query = query.ilike('name', `%${search}%`);
    }
    const { data, error, count } = await query
      .range(from, to)
      .order('id', { ascending: false });

    if (error) throw new Error(error.message);
    return { data, total: count ?? 0 };
  },

  async getOptions() {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name')
      .order('name');

    if (error) throw new Error(error.message);

    return data;
  },
  async create(payload: CategoriesForm) {
    const { data, error } = await supabase
      .from('categories')
      .insert(payload.categories);

    if (error) {
      if (error.code === '23505') {
        throw new Error('Category is available');
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
