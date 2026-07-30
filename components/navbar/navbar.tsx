'use client';

import Link from 'next/link';
import { navLinks } from './nav.constants/nav-link';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { useState } from 'react';
import useSession from '../hooks/useSession';
import useLogOut from '../hooks/useLogout';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, session, isAuthenticated } = useSession();
  const { logOut, isPendingLogOut } = useLogOut();
  console.log(session, isAuthenticated);
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-12 items-center justify-between px-6">
        <Link href="/">
          <p className="text-lg font-medium text-teal-500">
            SMATER<span className="font-light text-black">-library</span>
          </p>
        </Link>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="hover:bg-teal-500 hover:rounded-lg hover:text-white p-1.5 text-sm font-medium transition-all"
            >
              {item.title}
            </Link>
          ))}

          {user ? (
            <Button variant="destructive" onClick={() => logOut()}>
              Keluar
            </Button>
          ) : (
            <Link href="/auth">
              <Button variant="ghost" className="bg-teal-500 text-white">
                Masuk
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent aria-describedby={undefined} side="top">
            <SheetHeader>
              <SheetTitle className="sr-only">Nav Item</SheetTitle>
              <SheetDescription className="sr-only">
                See all menu.
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-2 px-4 pb-2">
              {navLinks.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="font-medium cursor-pointer hover:underline"
                >
                  {item.title}
                </Link>
              ))}

              <Link
                href="/auth"
                onClick={() => setOpen(false)}
                className="mt-2"
              >
                <Button variant="outline" className="w-full text-teal-500">
                  Masuk
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
