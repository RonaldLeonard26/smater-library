'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Clock, History } from 'lucide-react';
import { useState } from 'react';
import CardBorrowedBook from './card-borrowed';
import useStudentBook from './hooks/useStudentBook';
import useSession from '@/components/hooks/useSession';

export default function MyBookPage() {
  const [tab, setTab] = useState('active');
  const { userId } = useSession();
  const { activeLoans, historyLoans, isLoading, error, refetch } =
    useStudentBook(userId ?? '');
  return (
    <section className="container mx-auto px-6  py-6 space-y-4 max-w-6xl">
      {/* header */}
      <div className="flex flex-col gap-1 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <h1 className="text-xl sm:text-2xl font-semibold   tracking-tight text-slate-700">
            Buku Saya
          </h1>
        </div>
        <p className="text-muted-foreground text-xs sm:text-sm">
          Pantau buku yang sedang kamu pinjam dan riwayat peminjamanmu.
        </p>
      </div>

      {/* Tabs Filter */}
      <Tabs defaultValue="active" onValueChange={setTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-xs mb-6">
          <TabsTrigger value="active" className="text-xs sm:text-sm gap-2">
            <Clock className="h-4 w-4" />
            Dipinjam ({activeLoans.length})
          </TabsTrigger>
          <TabsTrigger value="history" className="text-xs sm:text-sm gap-2">
            <History className="h-4 w-4" />
            Riwayat
          </TabsTrigger>
        </TabsList>

        {/* Tab content: Sedang Dipinjam */}
        <TabsContent value="active" className="space-y-4">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-28 w-full rounded-xl" />
              <Skeleton className="h-28 w-full rounded-xl" />
            </div>
          ) : activeLoans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeLoans.map((item) => (
                <CardBorrowedBook key={item.id} loan={item} />
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              Kamu belum meminjam buku apapun saat ini.
            </p>
          )}
        </TabsContent>

        {/* Tab content: Riwayat */}
        {/* <TabsContent value="history" className="space-y-4">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-24 w-full rounded-xl" />
            </div>
          ) : historyLoans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {historyLoans.map((item) => (
                <CardHistoryBook key={item.id} loan={item} />
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              Belum ada riwayat pengembalian buku.
            </p>
          )}
        </TabsContent> */}
      </Tabs>
    </section>
  );
}
