import { Book as BookIcon } from 'lucide-react';
import type { Book } from '../../components/hooks/useLoans';

interface PropsTypes {
  bookPreview: string;
}

export default function BookPreviewCard({ bookPreview }: PropsTypes) {
  return (
    <div className="flex flex-col">
      <div>
        <BookIcon />
        <p>{bookPreview}</p>
      </div>
    </div>
  );
}
