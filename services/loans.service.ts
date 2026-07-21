import { SelectedBook } from '@/app/admin/loans/components/hooks/useLoans';
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

    if (error) throw new Error(error.message || 'Student not found');

    return data;
  },

  async getActiveLoans(studentId: string) {
    const { data, error } = await supabase.rpc('get_active_loans', {
      student: studentId,
    });

    if (error) throw new Error(error.message);

    return data ?? 0;
  },

  async searchBooks(keyword: string) {
    const selectQuery = `id,
    title,
    author,
    barcode,
    stock,
    cover_url,
    category_id,
    categories (
      id,
      name,
      duration_days,
      fine_amount
    )`;

    let data;
    let error;

    if (/^\d+$/.test(keyword)) {
      const result = await supabase
        .from('books')
        .select(selectQuery)
        .eq('barcode', keyword)
        .single();

      data = result.data ? [result.data] : [];
      error = result.error;
    } else {
      const result = await supabase
        .from('books')
        .select(selectQuery)
        .ilike('title', `%${keyword}%`);
      data = result.data ?? [];
      error = result.error;
    }
    if (error) throw new Error(error.message);

    return data.map((book) => ({
      ...book,
      categories: Array.isArray(book.categories)
        ? book.categories[0]
        : book.categories,
    }));
  },

  async createLoan(studentId: string) {
    const { data, error } = await supabase
      .from('loans')
      .insert({ student_id: studentId })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async createLoanItem(loanId: string, book: SelectedBook) {
    const { error } = await supabase.from('loan_items').insert({
      loan_id: loanId,
      book_id: book.id,
      due_date: book.estimatedDueDate,
    });
    if (error) throw new Error(error.message);
  },

  async decreaseBookStock(bookId: string, stock: number) {
    const { error } = await supabase
      .from('books')
      .update({
        stock: stock - 1,
      })
      .eq('id', bookId);

    if (error) throw new Error(error.message);
  },
};
