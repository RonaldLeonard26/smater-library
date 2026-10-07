import { GetStudentParams } from '@/types/student';
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const studentServices = {
  async getStudents({ search, page, limit }: GetStudentParams) {
    const from = (page - 1) * limit;
    const to = from + limit;

    let query = supabase
      .from('profiles')
      .select('id, full_name, nisn, nis, profile_picture', { count: 'exact' })
      .eq('role', 'STUDENT');

    if (search.trim()) {
      const keyword = search.trim();
      query = query.or(
        `full_name.ilike.%${keyword}%,nis.ilike.%${keyword}%,nisn.ilike.%${keyword}%`,
      );
    }
    const { data, error, count } = await query
      .order('full_name', {
        ascending: true,
      })
      .range(from, to);

    if (error) {
      throw new Error(error.message || 'Gagal mengambil data siswa');
    }
    return {
      items: data ?? [],
      total: count ?? 0,
    };
  },
};
