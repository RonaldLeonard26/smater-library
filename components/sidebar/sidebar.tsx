'use client';

import { usePathname } from 'next/navigation';
import { SIDEBAR_ADMIN } from './sidebar-item';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { ChevronRight, LogOut } from 'lucide-react';
import useLogOut from '../hooks/useLogout';
import { Spinner } from '../ui/spinner';
import { Separator } from '../ui/separator';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';

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

        {/* sidebar item */}
        <div className="space-y-2">
          {SIDEBAR_ADMIN.map((item) => {
            const Icon = item.icon;

            // render dengan sub-menu(collapsible)
            if (item.children) {
              const isChildActive = item.children.some(
                (child) => pathname === child.href,
              );
              return (
                <Collapsible
                  key={item.key}
                  defaultOpen={isChildActive}
                  className="group/collapsible space-y-1"
                >
                  <CollapsibleTrigger asChild>
                    <button
                      type="button"
                      className={cn(
                        'flex w-full items-center gap-2 p-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-200',
                        isChildActive && 'text-teal-600 font-semibold',
                      )}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                      <ChevronRight className="ml-auto w-4 h-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-4 space-y-1 border-l-2 border-slate-100 ml-3 my-1">
                    {item.children.map((subItem) => {
                      const SubIcon = subItem.icon;
                      const isActive = pathname === subItem.href;
                      return (
                        <Link
                          key={subItem.key}
                          href={subItem.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            'flex items-center gap-2 p-2 rounded-md text-sm transition-colors',
                            isActive
                              ? 'bg-teal-600 text-white font-medium'
                              : 'text-slate-600 hover:bg-gray-200',
                          )}
                        >
                          {SubIcon && <SubIcon className="w-4 h-4 shrink-0" />}
                          <span>{subItem.label}</span>
                        </Link>
                      );
                    })}
                  </CollapsibleContent>
                </Collapsible>
              );
            }
            // render menu tanpa children
            const isActive = item.href ? pathname.startsWith(item.href) : false;
            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-2 p-2 rounded-md text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-teal-600 text-white'
                    : 'text-slate-700 hover:bg-gray-200',
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
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
