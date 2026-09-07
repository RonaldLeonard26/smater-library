export interface BookColumn {
  id: string;
  title: string;
  authors: string;
  isbn: string;
  publisher: string;
  cover_url: string;
  category_id: number;
  categories?: {
    id: number;
    name: string;
  };
  book_copies: {
    id: string;
    barcode: string;
    status: 'AVAILABLE' | 'BORROWED';
  }[];
}

export interface CreateBookPayload {
  title: string;
  authors: string;
  isbn: string;
  publisher: string;
  category_id: number;
  cover_url: string;
}

export interface CatalogBook {
  id: string;
  title: string;
  authors: string;
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
