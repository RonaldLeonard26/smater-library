import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BookCopy } from '@/types/type';

import { Trash2 } from 'lucide-react';
import Image from 'next/image';

interface Props {
  book: BookCopy;
  onRemove: (copyId: string) => void;
}
export default function SelectedBook(props: Props) {
  const { book, onRemove } = props;
  return (
    <Card className="relative rounded-sm p-2">
      <div className="flex items-start gap-4">
        <Image
          src={book.cover_url}
          width={60}
          height={60}
          className="object-cover"
          alt="cover.png"
        />
        <div className="flex flex-col items-start justify-center gap-2">
          <p className="font-semibold text-muted-foreground">{book.title}</p>
          <p className="font-normal text-muted-foreground">{book.author}</p>
          <p className="font-mono text-muted-foreground">{book.barcode}</p>
        </div>
      </div>
      <Button
        onClick={() => onRemove(book.copy_id)}
        type="button"
        className="absolute top-2 right-2 hover:bg-red-100 cursor-pointer"
        variant="secondary"
      >
        <Trash2 color="red" size={16} />
      </Button>
    </Card>
  );
}
