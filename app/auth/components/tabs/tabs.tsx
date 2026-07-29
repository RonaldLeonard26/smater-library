import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnimatedAdminAuth from '../animated-auth/admin-animated';
import AnimatedStudentsAuth from '../animated-auth/student-animated';

export default function Tab() {
  return (
    <div className="flex flex-col mt-5 gap-4 items-center justify-center">
      <div className="flex flex-col lg:flex-row space-x-2 items-center justify-center">
        <p className="font-semibold">Perpustakan Digital</p>
        <h2 className="font-bold text-teal-500">SMATER MOF</h2>
      </div>
      <Tabs className="w-full  items-center">
        <TabsList>
          <TabsTrigger value="admin">Admin</TabsTrigger>
          <TabsTrigger value="student">Siswa</TabsTrigger>
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
