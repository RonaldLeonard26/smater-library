import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnimatedAdminAuth from '../animated-auth/admin-animated';
import AnimatedStudentsAuth from '../animated-auth/student-animated';
import { User } from 'lucide-react';

export default function Tab() {
  return (
    <div className="flex flex-col mt-5 gap-4 items-center justify-center">
      <div className="flex flex-col lg:flex-row space-x-2 items-center justify-center">
        <p className="font-semibold">Perpustakan Digital</p>
        <h2 className="font-bold text-teal-500">SMATER MOF</h2>
      </div>
      <Tabs className="w-full items-center">
        <TabsList className=" grid w-full grid-cols-2 max-w-xs mb-4">
          <TabsTrigger value="admin" className="text-xs sm:text-sm gap-2">
            <User />
            Admin
          </TabsTrigger>
          <TabsTrigger value="student" className="text-xs sm:text-sm gap-2">
            <User />
            Siswa
          </TabsTrigger>
        </TabsList>
        <TabsContent value="admin">
          <AnimatedAdminAuth />
        </TabsContent>

        {/* students */}
        <TabsContent value="student">
          <AnimatedStudentsAuth />
        </TabsContent>
      </Tabs>
    </div>
  );
}
