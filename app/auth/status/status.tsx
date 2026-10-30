'use client';

import { useRouter } from 'next/navigation';
import useStatus from './hooks/useStatus';
import { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, RefreshCw, TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatusContent from './components/status-content';

export type RegistrationStatus = 'PENDING' | 'ACTIVE' | 'REJECTED';

export default function Status() {
  const router = useRouter();
  const {
    status,
    isLoading,
    isError,
    isFetching,
    refetch,
    logout,
    isLoggingOut,
    goToHome,
  } = useStatus();

  useEffect(() => {
    if (status === null) router.replace('/auth');
  }, [status, router]);

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center gap-5 p-8 text-center">
          {isLoading || status === null ? (
            <>
              <Loader2 className="size-8 animate-spin text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Memeriksa status akun...
              </p>
            </>
          ) : isError || !status ? (
            <>
              <div className="rounded-full bg-red-100 p-4 text-red-600 dark:bg-red-500/15 dark:text-red-400">
                <TriangleAlert className="size-8" />
              </div>
              <div className="space-y-1">
                <h1 className="text-xl font-semibold">Gagal memuat status</h1>
                <p className="text-sm text-muted-foreground">
                  Periksa koneksi internetmu, lalu coba lagi.
                </p>
              </div>
              <Button onClick={() => refetch()} className="w-full">
                <RefreshCw className="size-4" />
                Coba lagi
              </Button>
            </>
          ) : (
            <StatusContent
              status={status}
              isFetching={isFetching}
              isLoggingOut={isLoggingOut}
              onLogOut={logout}
              onContinue={goToHome}
            />
          )}
        </CardContent>
      </Card>
    </main>
  );
}
