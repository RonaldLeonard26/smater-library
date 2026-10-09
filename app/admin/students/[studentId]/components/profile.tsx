import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Student } from '@/types/student';
import ProfileForm from './profile-form';
import { Separator } from '@/components/ui/separator';
interface ProfileProps {
  student: Student;
}

export default function ProfileStudent({ student }: ProfileProps) {
  return (
    <div className="max-w-1/2">
      <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
        {/* Student Identity */}
        <div className="flex items-center gap-4 border-b px-6 py-5">
          <Avatar className="h-14 w-14">
            <AvatarImage
              src={student.profile_picture ?? undefined}
              alt={student.full_name}
            />

            <AvatarFallback className="text-lg">
              {student.full_name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-0.5">
            <h2 className="font-semibold">{student.full_name}</h2>
            <p className="text-sm text-muted-foreground">Informasi siswa</p>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          <ProfileForm student={student} />
        </div>
      </div>
    </div>
  );
}
