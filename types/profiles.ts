export type UserRole = 'ADMIN' | 'STUDENT';

export interface Profile {
  id: string;
  full_name: string;
  nisn: string | null;
  nis: string | null;
  position: string | null;
  profile_picture: string | null;
  role: UserRole;
}
