import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CatalogBook, WishlistItem } from '@/types/catalog.type';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';

interface WishlistCardProps {
  book: CatalogBook;
  onRemove: () => void;
}

export default function WishlistsCard({ book, onRemove }: WishlistCardProps) {
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
            <Button
              onClick={onRemove}
              variant="ghost"
              size="icon"
              className="cursor-pointer h-8 w-8 rounded-full bg-background backdrop-blur-md hover:bg-white shadow-sm border border-slate-100"
            >
              <Trash2 className="size-5 text-destructive" />
            </Button>
          </div>
        </div>
        {/* informasi konten */}
        <CardContent className=" p-3 pb-0 space-y-1">
          <h3 className="line-clamp-2 text-lg sm:text-sm font-semibold text-slate-800 leading-snug group-hover:text-primary transition-colors">
            {book.title}
          </h3>
          <p className="line-clamp-1 text-[11px] sm:text-xs text-muted-foreground">
            {book.author}
          </p>
        </CardContent>
      </div>
    </Card>
  );
}
