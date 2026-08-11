'use client';

import useSession from '@/components/hooks/useSession';
import useWishlist from '@/components/hooks/useWishlists';
import { BookOpen, Library } from 'lucide-react';
import WishlistsCard from './components/wishlists-card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Wishlist() {
  const { userId } = useSession();
  const { wishlistItems, isLoading, handleToggle } = useWishlist(userId ?? '');
  console.log(wishlistItems);

  return (
    <section className="container mx-auto px-6  py-6 space-y-4 max-w-6xl">
      {/* header */}
      <div className="flex flex-col gap-1 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <h1 className="text-xl sm:text-2xl font-semibold   tracking-tight text-slate-700">
            Wishlist
          </h1>
        </div>
        <p className="text-muted-foreground text-xs sm:text-sm">
          Daftar buku yang akan kamu pinjam.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 mt-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="aspect-2/3 w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      ) : wishlistItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 mt-4">
          {wishlistItems.map((item) => (
            <WishlistsCard
              key={item.id}
              book={item.book}
              onRemove={() => handleToggle(item.bookId)}
            />
          ))}
        </div>
      ) : (
        // empti state
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
          <div className="p-4 bg-slate-50 rounded-full text-slate-400">
            <Library className="h-8 w-8" />
          </div>
          <p className="font-medium text-slate-700">Buku tidak ditemukan</p>
          <p className="text-xs text-muted-foreground max-w-sm">
            Belum ada buku yang ditambahkan ke wishlist.
          </p>
        </div>
      )}
    </section>
  );
}
