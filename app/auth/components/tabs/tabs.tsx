import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StudentLoginForm from '../forms/student-login-form';
import AnimatedAdminAuth from '../animated-auth/admin-animated';
import AnimatedStudentsAuth from '../animated-auth/student-animated';

export default function Tab() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Tabs className="w-full max-w-[420px] items-center">
        <TabsList variant="line">
          <TabsTrigger value="admin">Admin</TabsTrigger>
          <TabsTrigger value="student">Student</TabsTrigger>
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
