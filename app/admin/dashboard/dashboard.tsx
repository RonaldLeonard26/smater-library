'use client';

import { getStatsOverviewConfig } from '@/constants/adminStats';
import useAdminStats from './components/hooks/useAdminStats';
import CardKpi from './components/card/card-kpi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Library, TrendingUp } from 'lucide-react';
import CardWishlist from './components/card/card-wishlists';
import { Progress } from '@/components/ui/progress';

export default function Dashboard() {
  const { overview, isLoading, topWishlist, topBorrowed } = useAdminStats();
  const statsOverview = getStatsOverviewConfig(overview);
  const maxBorrowCount = topBorrowed.length > 0 ? topBorrowed[0].totalLoans : 1;

  return (
    <div className="h-full overflow-y-auto lg:overflow-hidden flex flex-col gap-4 p-2 overflow-hidden">
      {/* 1. Baris Kartu KPI (Tinggi Otomatis) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
        {statsOverview.map((item) => (
          <CardKpi
            key={item.id}
            title={item.title}
            value={item.value}
            desc={item.desc}
            icon={item.icon}
            iconBg={item.bg}
            iconColor={item.color}
          />
        ))}
      </div>

      {/* 2. Baris Utama Analitik (Memenuhi sisa tinggi layar / flex-1) */}
      <div className="flex-1 lg:min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Card Top Wishlist */}
        <Card className="h-full flex flex-col border-slate-200/80 lg:max-h-96 overflow-y-auto scrollbar-thin shadow-sm">
          <CardHeader className="pb-3 border-b border-slate-100 shrink-0">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Heart className="size-6 text-rose-500 fill-rose-500" />
              Permintaan Tinggi (Top Wishlist)
            </CardTitle>
            <p className="text-xs text-slate-500 mt-0.5">
              Buku yang paling banyak diminati siswa. Petunjuk pengadaan stok
              baru!
            </p>
          </CardHeader>

          {/* Area Konten Card: Hanya bagian ini yang bisa di-scroll jika item sangat banyak */}
          <CardContent className="flex-1  overflow-y-auto p-3 space-y-2.5">
            {topWishlist.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
                <div className="p-4 bg-slate-50 rounded-full text-slate-400">
                  <Library className="h-6 w-6" />
                </div>
                <p className="text-xs text-muted-foreground max-w-sm">
                  Belum ada buku yang ditambahkan ke wishlist.
                </p>
              </div>
            ) : (
              topWishlist.map((item) => (
                <CardWishlist
                  key={item.id}
                  title={item.title}
                  author={item.author}
                  category={item.categoryName}
                  availableCopies={item.availableCopies}
                  count={item.wishlistCount}
                />
              ))
            )}
          </CardContent>
        </Card>

        {/* Kolom Kanan (Nanti untuk Buku Terpopuler / Sering Dipinjam) */}
        <div className="block h-full">
          {/* Komponen Top Borrowed / Chart bisa dimasukkan di sini */}
          <Card className="h-full flex flex-col overflow-hidden border-slate-200/80 shadow-sm">
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <TrendingUp className="size-6 text-blue-500" />
                Buku Terpopuler (Sering Dipinjam)
              </CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">
                Frekuensi total peminjaman eksemplar berdasarkan riwayat
                transaksi.
              </p>
            </CardHeader>
            <CardContent className="pt-4 space-y-5">
              {topBorrowed.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
                  <div className="p-4 bg-slate-50 rounded-full text-slate-400">
                    <Library className="h-6 w-6" />
                  </div>
                  <p className="text-xs text-muted-foreground max-w-sm">
                    Belum ada transaksi peminjaman.
                  </p>
                </div>
              ) : (
                topBorrowed.map((book) => {
                  const percentage = Math.round(
                    (book.totalLoans / maxBorrowCount) * 100,
                  );
                  return (
                    <div key={book.id} className="space-y-1.5">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium text-slate-700">
                          {book.title}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          {book.totalLoans}x dipinjam
                        </span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  );
                })
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
