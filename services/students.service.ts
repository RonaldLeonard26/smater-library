import { StudentProfileFormValues } from '@/app/admin/students/schemas/validation';
import { supabase } from '@/lib/supabase/client';
import {
  GetStudentParams,
  StudentHistoryParams,
  StudentHistoryResponse,
} from '@/types/student';

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
  async getStudentById(studentId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, nisn, nis, profile_picture')
      .eq('role', 'STUDENT')
      .eq('id', studentId)
      .single();
    if (error) throw new Error(error.message || 'Siswa tidak ditemukan');
    return data;
  },

  async updateStudent(id: string, payload: StudentProfileFormValues) {
    const { data, error } = await supabase
      .from('profiles')
      .update(payload)
      .eq('id', id);

    if (error) throw new Error(error.message || 'Gagal menguba data siswa');
    return data;
  },

  async getStudentHistory({
    studentId,
    search,
    statuses,
    isOverdue,
    page,
    limit,
  }: StudentHistoryParams) {
    const { data, error } = await supabase.rpc('get_student_loan_history', {
      p_student_id: studentId,
      p_search: search.trim(),
      p_statuses: statuses,
      p_is_overdue: isOverdue,
      p_page: page,
      p_limit: limit,
    });

    if (error) {
      throw new Error(
        error.message || 'Gagal mengambil riwayat peminjaman siswa',
      );
    }
    return data as StudentHistoryResponse;
  },
};
