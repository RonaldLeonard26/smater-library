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
    <Card className="overflow-hidden p-0">
      <div className="relative aspect-3/4 w-full overflow-hidden">
        {book.cover_url && (
          <Image
            src={book.cover_url}
            alt="cover"
            className="object-cover"
            fill
          />
        )}
      </div>
      <CardContent className="space-y-2">
        <h3 className="line-clamp-2 text-sm md:text-lg font-semibold">
          {book.title}
        </h3>
        <p className="text-sm text-muted-foreground">{book.author}</p>

        <Separator />
        <div className="flex justify-between pb-2 w-full items-center">
          <Badge className="bg-teal-500 text-white">
            {book.availableCopies} tersedia
          </Badge>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={onToggleWishlist}
                variant="ghost"
                size="icon"
                className="cursor-pointer"
              >
                <Heart
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
              <p>Add to wishlist</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  );
}
