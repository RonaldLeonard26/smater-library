'use client';

import { usePathname } from 'next/navigation';
import { SIDEBAR_ADMIN } from './sidebar-item';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
import useLogOut from '../hooks/useLogout';
import { Spinner } from '../ui/spinner';
import { Separator } from '../ui/separator';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebard({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();
  const { logOut, isPendingLogOut } = useLogOut();
  return (
    <div className="h-screen flex flex-col justify-between p-4">
      <div className="flex flex-col gap-4">
        <Link href="/">
          <p className="text-lg font-semibold text-teal-500">
            SMATER
            <span className="font-serif font-medium text-black">-l𝓲brary.</span>
          </p>
        </Link>
        <Separator className="md:hidden" />
        <div className="space-y-2">
          {SIDEBAR_ADMIN.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-2 p-2 rounded-md',
                  isActive ? 'bg-teal-600 text-white' : 'hover:bg-gray-200',
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <Button
        className="flex gap-2 items-center text-destructive justify-center hover:bg-rose-300 hover:text-white"
        variant="outline"
        type="button"
        onClick={() => logOut()}
        disabled={isPendingLogOut}
      >
        <LogOut />
        {isPendingLogOut ? <Spinner className="size-6" /> : 'Logout'}
      </Button>
    </div>
  );
}
