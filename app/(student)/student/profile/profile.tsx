'use client';

import { LockKeyhole, User } from 'lucide-react';
import StudentProfileCard from './components/students-password-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import StudentInfoCard from './components/student-info-card';
import StudentPasswordCard from './components/students-password-card';

export default function ProfilePage() {
  const [tab, setTab] = useState('info');
  return (
    <section className="container mx-auto px-6 py-6 space-y-4 max-w-6xl">
      {/* header */}
      <div className="flex flex-col gap-1 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <User className="h-6 w-6 text-primary" />
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-700">
            Profil Saya
          </h1>
        </div>
        <p className="text-muted-foreground text-sm sm:text-sm">
          Kelola informasi akun dan keamanan kata sandi Anda.
        </p>
      </div>

      {/* tabs filter */}

      <Tabs defaultValue="info" onValueChange={setTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-xs mb-6">
          <TabsTrigger value="info" className="text-xs sm:text-sm gap-2">
            <User className="h-4 w-4" />
            Informasi
          </TabsTrigger>
          <TabsTrigger value="password" className="text-xs sm:text-sm gap-2">
            <LockKeyhole className="h-4 w-4" />
            Kata Sandi
          </TabsTrigger>
        </TabsList>

        {/* tabs kontent info */}
        <TabsContent value="info">
          <StudentInfoCard />
        </TabsContent>

        {/* tabs kontent password */}
        <TabsContent value="password">
          <StudentPasswordCard />
        </TabsContent>
      </Tabs>
    </section>
  );
}
