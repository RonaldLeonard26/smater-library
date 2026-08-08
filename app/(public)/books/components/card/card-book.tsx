'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { Heart, HeartPlus } from 'lucide-react';
import Image from 'next/image';

export interface CatalogBook {
  id: string;
  title: string;
  author: string;
  cover_url: string | null;
  availableCopies: number;
}
interface BookCard {
  book: CatalogBook;
  isWishlist: boolean;
  onToggleWishlist: () => void;
}

export default function CardBook(props: BookCard) {
  const { book, isWishlist, onToggleWishlist } = props;

  return (
    <Card className="group overflow-hidden rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between p-0">
      <div>
        <div className="relative aspect-2/3 bg-slate-100 w-full overflow-hidden">
          {book.cover_url ? (
            <Image
              src={book.cover_url}
              alt="cover"
              className="object-cover"
              fill
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
              No Cover
            </div>
          )}
          {/* floating wishlist button */}
          <div className="absolute top-2 right-2 z-10">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onToggleWishlist}
                  variant="ghost"
                  size="icon"
                  className="cursor-pointer h-8 w-8 rounded-full bg-background backdrop-blur-md hover:bg-white shadow-sm border border-slate-100"
                >
                  <HeartPlus
                    className={cn(
                      'size-6 transition-colors',
                      isWishlist
                        ? 'fill-red-500 text-red-500'
                        : 'text-muted-foreground',
                    )}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {isWishlist ? 'Hapus dari wishlist' : 'Tambah ke wishlist'}
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        {/* informasi konten */}
        <CardContent className=" p-3 pb-0 space-y-1">
          <h3 className="line-clamp-2 text-xs sm:text-sm font-semibold text-slate-800 leading-snug group-hover:text-primary transition-colors">
            {book.title}
          </h3>
          <p className="line-clamp-1 text-[11px] sm:text-xs text-muted-foreground">
            {book.author}
          </p>
        </CardContent>
      </div>
      {/* footer card */}
      <div className="px-3 pb-3 pt-1">
        <Badge
          variant={book.availableCopies > 0 ? 'default' : 'outline'}
          className={cn(
            'text-[10px] font-medium px-2 py-0.5 rounded-md',
            book.availableCopies > 0
              ? 'bg-primary/10 text-primary hover:bg-primary/20 border-none'
              : 'text-muted-foreground border-slate-200',
          )}
        >
          {book.availableCopies > 0
            ? `${book.availableCopies} Tersedia`
            : 'Habis'}
        </Badge>
      </div>
    </Card>
  );
}
