import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Student } from '@/types/student';
import ProfileStudent from './profile';
import { History, User } from 'lucide-react';

interface DetailProps {
  student: Student;
}

export default function Detail({ student }: DetailProps) {
  if (!student) {
    return null;
  }

  return (
    <div>
      {/* Tabs */}
      <Tabs defaultValue="profile">
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

        <TabsContent value="history" className="mt-6">
          {/* <History /> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
