export interface AdminStatsOverview {
  totalBooks: number;
  totalCopies: number;
  activeLoans: number;
  overdueLoans: number;
  totalWishlists: number;
}

export interface TopWishlistedBook {
  id: string;
  title: string;
  author: string;
  categoryName: string;
  wishlistCount: number;
  availableCopies: number;
}

export interface TopBorrowedBook {
  id: string;
  title: string;
  totalLoans: number;
}

// Interface untuk mewakili struktur response Join Supabase
export interface SupabaseWishlistJoined {
  book_id: string;
  books:
    | {
        id: string;
        title: string;
        author: string;
        categories: { name: string } | { name: string }[] | null;
        book_copies: { status: string }[] | null;
      }
    | {
        id: string;
        title: string;
        author: string;
        categories: { name: string } | { name: string }[] | null;
        book_copies: { status: string }[] | null;
      }[]
    | null;
}

type BookObject = Extract<SupabaseWishlistJoined['books'], { id: string }>;
type BookArray = Extract<SupabaseWishlistJoined['books'], Array<[]>>;

export type RawBookData = BookObject | BookArray[number];
