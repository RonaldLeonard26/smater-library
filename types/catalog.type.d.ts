export interface CatalogBook {
  id: string;
  title: string;
  author: string;
  cover_url: string | null;
  categories: {
    id: number;
    name: string;
  };
  availableCopies: number;
}
export interface CatalogBookParams {
  page: number;
  limit: number;
  search?: string;
  categories?: string[];
}

export interface WishlistItem {
  id: string;
  bookId: string;
  book: CatalogBook;
}
