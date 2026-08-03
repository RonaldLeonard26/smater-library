import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';
import { SIDEBAR_ADMIN } from './sidebar-item';

interface AdminHeaderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function AdminHeader({ open, setOpen }: AdminHeaderProps) {
  const pathname = usePathname();

  const currentPage = SIDEBAR_ADMIN.find((item) =>
    pathname.startsWith(item.href),
  );
  return (
    <div className="flex flex-col items-start md:mx-0 lg:mb-4  md:m-0 mx-2 mb-4">
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/10 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <div className="flex w-full items-center justify-between">
        <h2 className="font-medium">{currentPage?.label}</h2>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu className="size-6" />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">{currentPage?.dsc}</p>
    </div>
  );
}
