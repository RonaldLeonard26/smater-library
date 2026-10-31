import { StudentProfileFormValues } from '@/app/admin/students/schemas/validation';
import { supabase } from '@/lib/supabase/client';
import {
  GetStudentParams,
  StudentHistoryParams,
  StudentHistoryResponse,
} from '@/types/student';

export const studentServices = {
  async getStudents({ search, page, limit, status = 'ALL' }: GetStudentParams) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from('profiles')
      .select('id, full_name, nisn, nis, profile_picture, status', {
        count: 'exact',
      })
      .eq('role', 'STUDENT');

    if (status !== 'ALL') query = query.eq('status', status);

    const keyword = search.trim().replace(/[%,()\\]/g, '');
    if (keyword) {
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
  // ============================================================
  async getPendingCount() {
    const { count, error } = await supabase
      .from('profiles')
      .select('id', { count: 'exact', head: true })
      .eq('role', 'STUDENT')
      .eq('status', 'PENDING');
    if (error) throw new Error(error.message);
    return count ?? 0;
  },
  // ============================================================

  async reviewStudent(payload: {
    studentId: string;
    action: 'APPROVE' | 'REJECT';
  }) {
    const { error } = await supabase.rpc('review_student', {
      p_student_id: payload.studentId,
      p_action: payload.action,
    });
    if (error) throw new Error(error.message);
  },

  // ===============================================================
  async getStudentById(studentId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, nisn, nis, profile_picture, status')
      .eq('role', 'STUDENT')
      .eq('id', studentId)
      .single();
    if (error) throw new Error(error.message || 'Siswa tidak ditemukan');
    return data;
  },

  async updateStudent(id: string, payload: StudentProfileFormValues) {
    const { data, error } = await supabase
      .from('profiles')
      .update({ nisn: payload.nisn, nis: payload.nis })
      .eq('id', id)
      .eq('role', 'STUDENT')
      .select('id');

    if (error) {
      if (error.code === '23505') {
        throw new Error('NIS/NISN sudah dipakai siswa lain.');
      }
      throw new Error(error.message || 'Gagal mengubah data siswa');
    }
    if (!data || data.length === 0) {
      throw new Error('Data siswa tidak ditemukan atau tidak bisa diubah.');
    }
    return data[0];
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
