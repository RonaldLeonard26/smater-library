import useSession from '@/components/hooks/useSession';
import { CatalogBook } from '@/types/catalog.type';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function useWishlist() {
  const [wishlist, setWishlist] = useState<CatalogBook[]>(() => {
    if (typeof window === 'undefined') return [];

    const saved = localStorage.getItem('wishlist');

    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  const router = useRouter();
  const { isAuthenticated } = useSession();

  const handleWishlist = (book: CatalogBook) => {
    if (!isAuthenticated) {
      router.push('/auth');
      return;
    }
    setWishlist((prev) => {
      const exist = prev.some((item) => item.id === book.id);
      if (exist) {
        return prev.filter((item) => item.id !== book.id);
      }
      return [...prev, book];
    });
  };
  return {
    wishlist,
    handleWishlist,
  };
}
