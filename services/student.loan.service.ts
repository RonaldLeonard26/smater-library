import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export const studentLoanServices = {
  async getStudentLoan(userId: string) {
    if (!userId) return [];

    const { data, error } = await supabase
      .from('loan_items')
      .select(
        `
          id, 
          due_date, 
          returned_at,
          created_at,
          book_copies:book_copy_id!inner (
            id,
            barcode,
            books:book_id!inner (
              id, 
              title, 
              author,
              cover_url
            )
          ),
          loans:loan_id!inner (
            id,
            student_id,
            loan_date
          )
        `,
      )
      .eq('loans.student_id', userId)
      .eq('is_hidden_by_student', false)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase Error:', error.message);
      throw new Error(error.message);
    }

    return data;
  },

  async hideStudentLoanHistory(loanItemId: string) {
    const { error } = await supabase
      .from('loan_items')
      .update({ is_hidden_by_student: true })
      .eq('id', loanItemId);

    if (error) {
      throw new Error(error.message);
    }
  },
};
