export type LoanHistoryStatus = 'BORROWED' | 'RETURNED';

export interface HistoryFilters {
  statuses: LoanHistoryStatus[];
  isOverdue: boolean;
}

export type LoanHistoryParams = {
  search: string;
  statuses: LoanHistoryStatus[];
  isOverdue: boolean;
  page: number;
  limit: number;
};

export type LoanHistoryItem = {
  loan_item_id: string;
  loan_id: string;

  book_id: string;
  book_title: string;
  book_authors: string;
  book_publisher: string | null;
  cover_url: string | null;
  category_name: string | null;

  book_copy_id: string;
  barcode: string;
  copy_status: string;

  student_id: string;
  student_name: string;
  nis: string;
  nisn: string;
  profile_picture: string | null;

  loan_date: string;
  due_date: string;
  returned_at: string | null;

  status: LoanHistoryStatus;

  days_overdue: number;
  fine_per_day: number;
  fine_amount: number;
};

export type LoanHistoryResponse = {
  page: number;
  limit: number;
  total: number;
  items: LoanHistoryItem[];
};

const item = [
  {
    page: 1,
    items: [
      {
        nis: '4321',
        nisn: '1234512345',
        status: 'BORROWED',
        barcode: 'SM-MAT-BKPT-0103',
        book_id: '343ddbb9-2e99-49a6-96e2-7f00f7e70f84',
        loan_id: '142e51d0-5a73-4bfa-9532-d6ed73c0f94d',
        due_date: '2026-10-02T16:00:00+00:00',
        cover_url:
          'https://sccbgwbmuusfnqunmuxr.supabase.co/storage/v1/object/public/covers/1790317098268_matematika_DN42AK.jpg',
        loan_date: '2026-10-02T10:54:31.566518+00:00',
        book_title: 'Matematika',
        student_id: '55b4c289-aa6e-4a2a-9e3f-35d3ed6ca051',
        copy_status: 'BORROWED',
        fine_amount: 0,
        returned_at: null,
        book_authors: 'Sri Rahayu',
        book_copy_id: 'c044079d-c6af-450d-83fc-da628a091bf2',
        days_overdue: 3,
        fine_per_day: 2000,
        loan_item_id: 'fda7d9df-c7f7-4f38-a251-0694fd149795',
        student_name: 'Budi Santoso',
        category_name: 'Buku Paket',
        book_publisher: 'Mediatama',
        profile_picture: null,
      },
      {
        nis: '1234',
        nisn: '1234567899',
        status: 'BORROWED',
        barcode: 'SM-MAT-BKPT-0104',
        book_id: '343ddbb9-2e99-49a6-96e2-7f00f7e70f84',
        loan_id: '143c7e11-26bf-4388-b85b-5a0d7de55f44',
        due_date: '2026-10-02T16:00:00+00:00',
        cover_url:
          'https://sccbgwbmuusfnqunmuxr.supabase.co/storage/v1/object/public/covers/1790317098268_matematika_DN42AK.jpg',
        loan_date: '2026-10-02T10:56:39.023256+00:00',
        book_title: 'Matematika',
        student_id: '9ed65ae7-66cf-4e1a-875f-7cbf506024b8',
        copy_status: 'BORROWED',
        fine_amount: 0,
        returned_at: null,
        book_authors: 'Sri Rahayu',
        book_copy_id: 'b5d05233-50d7-4383-a3d4-744d6d6272e7',
        days_overdue: 3,
        fine_per_day: 2000,
        loan_item_id: '82bc6d67-b83a-4041-8056-7349bc8d71f7',
        student_name: 'Lambertus Leonard Martino Mitan',
        category_name: 'Buku Paket',
        book_publisher: 'Mediatama',
        profile_picture: null,
      },
      {
        nis: '1234',
        nisn: '1234567899',
        status: 'BORROWED',
        barcode: 'SM-MAT-BKPT-0105',
        book_id: '343ddbb9-2e99-49a6-96e2-7f00f7e70f84',
        loan_id: '143c7e11-26bf-4388-b85b-5a0d7de55f44',
        due_date: '2026-10-02T16:00:00+00:00',
        cover_url:
          'https://sccbgwbmuusfnqunmuxr.supabase.co/storage/v1/object/public/covers/1790317098268_matematika_DN42AK.jpg',
        loan_date: '2026-10-02T10:56:39.023256+00:00',
        book_title: 'Matematika',
        student_id: '9ed65ae7-66cf-4e1a-875f-7cbf506024b8',
        copy_status: 'BORROWED',
        fine_amount: 0,
        returned_at: null,
        book_authors: 'Sri Rahayu',
        book_copy_id: '6d818686-372d-43a3-bb89-d2e4a3cdfea9',
        days_overdue: 3,
        fine_per_day: 2000,
        loan_item_id: '36819400-110b-4747-8d70-81387f84e28c',
        student_name: 'Lambertus Leonard Martino Mitan',
        category_name: 'Buku Paket',
        book_publisher: 'Mediatama',
        profile_picture: null,
      },
      {
        nis: '1234',
        nisn: '1234567899',
        status: 'BORROWED',
        barcode: 'SM-MAT-BKPT-0106',
        book_id: '343ddbb9-2e99-49a6-96e2-7f00f7e70f84',
        loan_id: '143c7e11-26bf-4388-b85b-5a0d7de55f44',
        due_date: '2026-10-02T16:00:00+00:00',
        cover_url:
          'https://sccbgwbmuusfnqunmuxr.supabase.co/storage/v1/object/public/covers/1790317098268_matematika_DN42AK.jpg',
        loan_date: '2026-10-02T10:56:39.023256+00:00',
        book_title: 'Matematika',
        student_id: '9ed65ae7-66cf-4e1a-875f-7cbf506024b8',
        copy_status: 'BORROWED',
        fine_amount: 0,
        returned_at: null,
        book_authors: 'Sri Rahayu',
        book_copy_id: '28793e43-f7d5-45a3-a3ef-56c0bbc7e20d',
        days_overdue: 3,
        fine_per_day: 2000,
        loan_item_id: '7573eb72-cbca-4565-bac0-f80d2d2ac1c7',
        student_name: 'Lambertus Leonard Martino Mitan',
        category_name: 'Buku Paket',
        book_publisher: 'Mediatama',
        profile_picture: null,
      },
      {
        nis: '4321',
        nisn: '1234512345',
        status: 'BORROWED',
        barcode: 'SM-MAT-MAPL-0001',
        book_id: 'a092b1b0-f137-4376-9b4d-e492cb3090d3',
        loan_id: '142e51d0-5a73-4bfa-9532-d6ed73c0f94d',
        due_date: '2026-10-02T16:00:00+00:00',
        cover_url:
          'https://sccbgwbmuusfnqunmuxr.supabase.co/storage/v1/object/public/covers/1788770807991_matematika___peminatan_matematika_dan_ilmu_alam_untuk_sma_ma_xi_AAQ041.jpeg',
        loan_date: '2026-10-02T10:54:31.566518+00:00',
        book_title:
          'Matematika | Peminatan Matematika dan Ilmu Alam untuk SMA/MA XI',
        student_id: '55b4c289-aa6e-4a2a-9e3f-35d3ed6ca051',
        copy_status: 'BORROWED',
        fine_amount: 0,
        returned_at: null,
        book_authors: 'Suparmin | Putri Estikarini',
        book_copy_id: '94264cbe-471b-4bac-8990-584909ebd3a5',
        days_overdue: 3,
        fine_per_day: 1500,
        loan_item_id: 'd2a1df1e-3bd1-42a1-b809-3f01e63145f7',
        student_name: 'Budi Santoso',
        category_name: 'Buku Mapel',
        book_publisher: 'Mediatama',
        profile_picture: null,
      },
      {
        nis: '4321',
        nisn: '1234512345',
        status: 'BORROWED',
        barcode: 'SM-PUL-NOVL-0093',
        book_id: 'b25d65af-d833-4ef4-a46e-8cdcc7747c8b',
        loan_id: '142e51d0-5a73-4bfa-9532-d6ed73c0f94d',
        due_date: '2026-10-02T16:00:00+00:00',
        cover_url:
          'https://sccbgwbmuusfnqunmuxr.supabase.co/storage/v1/object/public/covers/1789827459752_pulang_0O4JRA.jpg',
        loan_date: '2026-10-02T10:54:31.566518+00:00',
        book_title: 'Pulang',
        student_id: '55b4c289-aa6e-4a2a-9e3f-35d3ed6ca051',
        copy_status: 'BORROWED',
        fine_amount: 0,
        returned_at: null,
        book_authors: 'Tere Liye',
        book_copy_id: '35b5cc72-c30c-408d-aad1-772b77706bae',
        days_overdue: 3,
        fine_per_day: 1000,
        loan_item_id: 'b1c7e7aa-8460-40a5-a688-4c0536eba9ec',
        student_name: 'Budi Santoso',
        category_name: 'Novel',
        book_publisher: 'Mediatama',
        profile_picture: null,
      },
    ],
    limit: 10,
    total: 6,
  },
];
