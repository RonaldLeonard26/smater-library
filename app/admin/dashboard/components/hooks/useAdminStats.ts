import { adminStatsService } from '@/services/stats.service';
import { useQuery } from '@tanstack/react-query';

export default function useAdminStats() {
  const overviewQuery = useQuery({
    queryKey: ['admin-stats-overview'],
    queryFn: adminStatsService.getOverviewStats,
  });

  const topWishlistQuery = useQuery({
    queryKey: ['admin-top-wishlisted'],
    queryFn: () => adminStatsService.getTopWishlistedBooks(5),
  });

  const topBorrowedQuery = useQuery({
    queryKey: ['admin-top-borrowed'],
    queryFn: () => adminStatsService.getTopBorrowedBooks(5),
  });

  return {
    overview: overviewQuery.data,
    topWishlist: topWishlistQuery.data ?? [],
    topBorrowed: topBorrowedQuery.data ?? [],
    isLoading:
      overviewQuery.isLoading ||
      topWishlistQuery.isLoading ||
      topBorrowedQuery.isLoading,
  };
}
