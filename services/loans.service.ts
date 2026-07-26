import { CreateLoanPayload } from '@/types/type';
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const loansServices = {
  //cari siswa by nisn
  async findStudentByNisn(nisn: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, nisn, full_name')
      .eq('nisn', nisn)
      .eq('role', 'STUDENT')
      .single();

    if (error)
      throw new Error(
        error.message || 'Siswa tidak ditemukan, masukan NISN yang sesuai',
      );

    return data;
  },

  async getActiveLoans(studentId: string) {
    const { data, error } = await supabase.rpc('get_active_loans', {
      student: studentId,
    });

    if (error) throw new Error(error.message);

    return data ?? 0;
  },

  async searchBooks(barcode: string) {
    const { data, error } = await supabase.rpc('search_available_books', {
      p_keyword: barcode,
    });

    if (error) throw new Error(error.message);

    return data?.[0] ?? [];
  },

  async createLoan(payload: CreateLoanPayload) {
    const { data, error } = await supabase.rpc('create_loan', {
      p_student_id: payload.studentId,
      p_copy_ids: payload.copyIds,
    });

    if (error) throw new Error(error.message);

    return data;
  },

  //get loans
  async getLoans(page: number, limit: number, search: string) {
    const { data, error } = await supabase.rpc('get_active_loans_items', {
      p_search: search,
      p_page: page,
      p_limit: limit,
    });
    const total = data.length > 0 ? data[0].total_count : 0;
    if (error) throw new Error(error.message);
    return {
      data: data ?? [],
      total,
    };
  },
};
