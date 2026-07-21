import { Button } from '@/components/ui/button';
import { CircleX, List } from 'lucide-react';

interface PropsTypes {
  message: string;
  onViewLoans?: () => void;
  onClose: () => void;
}

export default function StudentsErrorCard(props: PropsTypes) {
  const { message, onViewLoans, onClose } = props;
  return (
    <div className="relative">
      <p>{message}</p>
      <Button type="button" onClick={onClose}>
        <CircleX />
      </Button>
      <Button type="button" onClick={onViewLoans}>
        Lihat daftar pinjam <List />
      </Button>
    </div>
  );
}
