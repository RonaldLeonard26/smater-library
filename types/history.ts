export type LoanHistoryParams = {
  search: string;
  status: string;
  copyStatus: string;
  page: number;
  limit: number;
};

export type LoanHistoryItem = {
  student_id: string;
  nis: string;
  nisn: string;
  student_name: string;
  profile_picture: string | null;

  book_copy_id: string;
  copy_status: string;
  barcode: string;

  book_id: string;
  book_title: string;
  cover_url: string;
  book_authors: string;
  book_publisher: string;

  category_name: string;
  fine_per_day: number;

  loan_id: string;
  loan_date: string;

  loan_item_id: string;
  due_date: string;
  fine_amount: number;
  returned_at: string;

  days_overdue: number;
  status: string;
};

export type LoanHistoryResponse = {
  page: number;
  items: LoanHistoryItem[];
  limit: number;
  total: number;
};
const response = {
  page: 1,
  limit: 10,
  total: 7,
  items: [
    {
      student_id: '9ed65ae7-66cf-4e1a-875f-7cbf506024b8',
      nis: '1234',
      nisn: '1234567899',
      student_name: 'Lambertus Leonard Martino Mitan',
      profile_picture: null,

      book_copy_id: 'a3c02f67-c18b-40fe-9176-743d5544ccbf',
      copy_status: 'AVAILABLE',
      barcode: 'SM-MAT-BKPT-0112',

      book_id: '343ddbb9-2e99-49a6-96e2-7f00f7e70f84',
      book_title: 'Matematika',
      cover_url:
        'https://sccbgwbmuusfnqunmuxr.supabase.co/storage/v1/object/public/covers/1790317098268_matematika_DN42AK.jpg',
      book_authors: 'Sri Rahayu',
      loan_date: '2026-09-26T15:19:39.367767+00:00',
      book_publisher: 'Mediatama',

      category_name: 'Buku Paket',
      fine_per_day: 2000,

      loan_item_id: 'cc3a6486-8ab9-4853-9170-260f96a3bf14',
      fine_amount: 2000,
      returned_at: '2026-09-28T06:38:57.79502+00:00',
      days_overdue: 1,
      status: 'RETURNED',
      loan_id: '4b76aa83-8eb9-4e30-94b8-4754da05c690',
      due_date: '2026-09-26T16:00:00+00:00',
    },
    {
      nis: '4321',
      nisn: '1234512345',
      status: 'BORROWED',
      barcode: 'SM-MAT-MAPL-0012',
      book_id: 'a092b1b0-f137-4376-9b4d-e492cb3090d3',
      loan_id: 'ed078ec8-d7ce-4831-9491-9338427714b7',
      due_date: '2026-09-23T16:00:00+00:00',
      cover_url:
        'https://sccbgwbmuusfnqunmuxr.supabase.co/storage/v1/object/public/covers/1788770807991_matematika___peminatan_matematika_dan_ilmu_alam_untuk_sma_ma_xi_AAQ041.jpeg',
      loan_date: '2026-09-23T04:34:31+00:00',
      book_title:
        'Matematika | Peminatan Matematika dan Ilmu Alam untuk SMA/MA XI',
      student_id: '55b4c289-aa6e-4a2a-9e3f-35d3ed6ca051',
      copy_status: 'BORROWED',
      fine_amount: 0,
      returned_at: null,
      book_authors: 'Suparmin | Putri Estikarini',
      book_copy_id: 'd0f3c263-09be-4741-ae42-170925117c93',
      days_overdue: 6,
      fine_per_day: 1500,
      loan_item_id: 'cc6ef272-2be7-42de-a32c-18b8680b30a8',
      student_name: 'Budi Santoso',
      category_name: 'Buku Mapel',
      book_publisher: 'Mediatama',
      profile_picture: null,
    },
    {
      nis: '4321',
      nisn: '1234512345',
      status: 'RETURNED',
      barcode: 'SM-MAT-MAPL-0014',
      book_id: 'a092b1b0-f137-4376-9b4d-e492cb3090d3',
      loan_id: 'ed078ec8-d7ce-4831-9491-9338427714b7',
      due_date: '2026-09-29T16:00:00+00:00',
      cover_url:
        'https://sccbgwbmuusfnqunmuxr.supabase.co/storage/v1/object/public/covers/1788770807991_matematika___peminatan_matematika_dan_ilmu_alam_untuk_sma_ma_xi_AAQ041.jpeg',
      loan_date: '2026-09-23T04:34:31+00:00',
      book_title:
        'Matematika | Peminatan Matematika dan Ilmu Alam untuk SMA/MA XI',
      student_id: '55b4c289-aa6e-4a2a-9e3f-35d3ed6ca051',
      copy_status: 'AVAILABLE',
      fine_amount: 0,
      returned_at: '2026-09-29T14:45:22.586065+00:00',
      book_authors: 'Suparmin | Putri Estikarini',
      book_copy_id: '023af981-9055-40c5-8bbe-d9819c8e2026',
      days_overdue: 0,
      fine_per_day: 1500,
      loan_item_id: '067f6a44-7f1d-4e79-ace0-4c3933df3f47',
      student_name: 'Budi Santoso',
      category_name: 'Buku Mapel',
      book_publisher: 'Mediatama',
      profile_picture: null,
    },
    {
      nis: '1234',
      nisn: '1234567899',
      status: 'BORROWED',
      barcode: 'SM-PEN-MAPL-0064',
      book_id: 'dd30248b-4358-4499-9691-cea4fbd3c2b2',
      loan_id: '4b76aa83-8eb9-4e30-94b8-4754da05c690',
      due_date: '2026-09-26T16:00:00+00:00',
      cover_url:
        'https://sccbgwbmuusfnqunmuxr.supabase.co/storage/v1/object/public/covers/1788773428493_pendidikan_pancasila_sma_ma_smk_mak_kelas_xii_WBQQH1.jpg',
      loan_date: '2026-09-26T15:19:39.367767+00:00',
      book_title: 'Pendidikan Pancasila SMA/MA/SMK/MA Kelas XII',
      student_id: '9ed65ae7-66cf-4e1a-875f-7cbf506024b8',
      copy_status: 'BORROWED',
      fine_amount: 0,
      returned_at: null,
      book_authors: 'Ida Rohayani | Halim Gazali | Dwi Astuti Setiawan',
      book_copy_id: 'eeaf4e58-86b8-47ee-8fc0-71e45cedd336',
      days_overdue: 3,
      fine_per_day: 1500,
      loan_item_id: '01634557-9c7b-49e2-a332-f6f42561d177',
      student_name: 'Lambertus Leonard Martino Mitan',
      category_name: 'Buku Mapel',
      book_publisher: 'Kemendikbudristek',
      profile_picture: null,
    },
    {
      nis: '4321',
      nisn: '1234512345',
      status: 'BORROWED',
      barcode: 'SM-PUL-NOVL-0099',
      book_id: 'b25d65af-d833-4ef4-a46e-8cdcc7747c8b',
      loan_id: 'ed078ec8-d7ce-4831-9491-9338427714b7',
      due_date: '2026-09-23T16:00:00+00:00',
      cover_url:
        'https://sccbgwbmuusfnqunmuxr.supabase.co/storage/v1/object/public/covers/1789827459752_pulang_0O4JRA.jpg',
      loan_date: '2026-09-23T04:34:31+00:00',
      book_title: 'Pulang',
      student_id: '55b4c289-aa6e-4a2a-9e3f-35d3ed6ca051',
      copy_status: 'BORROWED',
      fine_amount: 0,
      returned_at: null,
      book_authors: 'Tere Liye',
      book_copy_id: '587c5cec-e1af-46ce-b8c9-4b5542483b95',
      days_overdue: 6,
      fine_per_day: 1000,
      loan_item_id: 'd21b3a7c-3b92-4588-a9ab-c6d605a11e54',
      student_name: 'Budi Santoso',
      category_name: 'Novel',
      book_publisher: 'Mediatama',
      profile_picture: null,
    },
    {
      nis: '1234',
      nisn: '1234567899',
      status: 'RETURNED',
      barcode: 'SM-PUL-NOVL-0100',
      book_id: 'b25d65af-d833-4ef4-a46e-8cdcc7747c8b',
      loan_id: '4b76aa83-8eb9-4e30-94b8-4754da05c690',
      due_date: '2026-09-26T16:00:00+00:00',
      cover_url:
        'https://sccbgwbmuusfnqunmuxr.supabase.co/storage/v1/object/public/covers/1789827459752_pulang_0O4JRA.jpg',
      loan_date: '2026-09-26T15:19:39.367767+00:00',
      book_title: 'Pulang',
      student_id: '9ed65ae7-66cf-4e1a-875f-7cbf506024b8',
      copy_status: 'AVAILABLE',
      fine_amount: 1000,
      returned_at: '2026-09-28T06:37:49.848368+00:00',
      book_authors: 'Tere Liye',
      book_copy_id: '0ec660cc-0c03-45db-a49c-b9d591ee0638',
      days_overdue: 1,
      fine_per_day: 1000,
      loan_item_id: 'b23589f8-143b-4296-bf60-966ef9130cf8',
      student_name: 'Lambertus Leonard Martino Mitan',
      category_name: 'Novel',
      book_publisher: 'Mediatama',
      profile_picture: null,
    },
    {
      nis: '4321',
      nisn: '1234512345',
      status: 'BORROWED',
      barcode: 'SM-SEJ-MAPL-0032',
      book_id: '1f318737-65e6-4513-b0e8-18210bea5a56',
      loan_id: 'ed078ec8-d7ce-4831-9491-9338427714b7',
      due_date: '2026-09-23T16:00:00+00:00',
      cover_url:
        'https://sccbgwbmuusfnqunmuxr.supabase.co/storage/v1/object/public/covers/1788771509387_sejarah_jilid_1_untuk_sma_ma_kelas_x__kelompok_peminatan_ips__MY72AI.jpeg',
      loan_date: '2026-09-23T04:34:31+00:00',
      book_title:
        'Sejarah Jilid 1 untuk SMA/MA kelas X (Kelompok Peminatan IPS)',
      student_id: '55b4c289-aa6e-4a2a-9e3f-35d3ed6ca051',
      copy_status: 'BORROWED',
      fine_amount: 0,
      returned_at: null,
      book_authors: 'Ratna Hapsari | M.Adil',
      book_copy_id: 'a73927f2-3408-49d0-bd9b-d21e1f469375',
      days_overdue: 6,
      fine_per_day: 1500,
      loan_item_id: '929b2506-d760-4a4a-94ff-cb7e71430a93',
      student_name: 'Budi Santoso',
      category_name: 'Buku Mapel',
      book_publisher: 'Erlangga',
      profile_picture: null,
    },
  ],
};
