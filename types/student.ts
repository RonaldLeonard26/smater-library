export interface Student {
  id: string;
  full_name: string;
  nisn: string;
  nis: string;
  profile_picture: string;
}

export interface GetStudentParams {
  search: string;
  page: number;
  limit: number;
}
