import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Student } from '@/types/student';
import ProfileStudent from './profile';
import { History, User } from 'lucide-react';
import StudentHistory from './student-history';
import ReviewBanner from '../../components/review-banner';

interface DetailProps {
  student: Student;
}

export default function Detail({ student }: DetailProps) {
  if (!student) {
    return null;
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <ReviewBanner student={student} />
      {/* Tabs */}
      <Tabs defaultValue="profile" className="flex h-full min-h-0 flex-col">
        <TabsList className="w-full max-w-xs">
          <TabsTrigger value="profile" className="text-sm gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>

          <TabsTrigger value="history" className="text-sm gap-2">
            <History className="h-4 w-4" />
            Riwayat
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <ProfileStudent student={student} />
        </TabsContent>

        <TabsContent
          value="history"
          className="mt-6 h-full min-h-0 flex-1 overflow-hidden"
        >
          <StudentHistory studentId={student.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
