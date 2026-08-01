'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { HeartPlus } from 'lucide-react';
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
}

export default function CardBook(props: BookCard) {
  const { book } = props;
  return (
    <Card className="overflow-hidden p-0">
      <div className="relative aspect-3/4  w-full overflow-hidden">
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
        <h3 className="line-clamp-2 text-lg font-semibold">{book.title}</h3>
        <p className="text-sm text-muted-foreground">{book.author}</p>

        <Separator />
        <div className="flex justify-between pb-2 w-full items-center">
          <Badge className="bg-teal-500 text-white">
            {book.availableCopies} tersedia
          </Badge>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="cursor-pointer">
                <HeartPlus className="size-6" />
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
