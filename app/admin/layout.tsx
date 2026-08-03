'use client';

import AdminHeader from '@/components/sidebar/admin-header';
import Sidebard from '@/components/sidebar/sidebar';
import { cn } from '@/lib/utils';

import { useState } from 'react';

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [open, setOpen] = useState(false);
  return (
    <section className="h-screen flex lg:gap-4 overflow-hidden">
      {/* sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 border-r bg-background transition-transform duration-300',
          open ? 'translate-x-0' : '-translate-x-full',
          'lg:relative lg:translate-x-0',
        )}
      >
        <Sidebard open={open} setOpen={setOpen} />
      </aside>
      {/* main content */}
      <main className="flex-1 p-2 overflow-hidden">
        <AdminHeader open={open} setOpen={setOpen} />
        {children}
      </main>
    </section>
  );
}
