import { wishlistService } from '@/services/wishlists.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export default function useWishlist(userId: string | null) {
  const queryQlinet = useQueryClient();

  // 1. Query ambil wishlist
  const { data: wishlistData = [], isLoading } = useQuery({
    queryKey: ['wishlist', userId],
    queryFn: () => wishlistService.getUserWishlist(userId!),
    enabled: Boolean(userId),
  });

  // Kumpulan ID buku untuk cek status di BookCard O(1)
  const wishlistedBookIds = new Set(wishlistData.map((item) => item.bookId));

  const toggleMutation = useMutation({
    mutationFn: ({
      bookId,
      isWishlisted,
    }: {
      bookId: string;
      isWishlisted: boolean;
    }) => wishlistService.toggleWishlist(userId!, bookId, isWishlisted),
    onError: (error) => {
      toast.error(error.message || 'Gagal menambahkan buku ke wishlist');
    },
    onSuccess: () => {
      queryQlinet.invalidateQueries({ queryKey: ['wishlist', userId] });
    },
  });

  const handleToggle = (bookId: string) => {
    if (!userId) {
      toast.error('Silakan login terlebih dahulu');
      return;
    }
    const isWishlisted = wishlistedBookIds.has(bookId);
    toggleMutation.mutate({ bookId, isWishlisted });
  };

  return {
    wishlistItems: wishlistData,
    wishlistedBookIds,
    isLoading,
    handleToggle,
    isToggling: toggleMutation.isPending,
  };
}
