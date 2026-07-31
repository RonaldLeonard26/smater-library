import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { navLinks } from '../nav.constants/nav-link';
import StudentDropdown, { Profile } from './student-dropdown';
import { Separator } from '@/components/ui/separator';

interface Props {
  isAuthenticated: boolean;
  profile: Profile;
}

export default function MobileNav({ isAuthenticated, profile }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      {isAuthenticated && <StudentDropdown profile={profile} />}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent aria-describedby={undefined} side="top" className="mt-0">
          <SheetHeader>
            <SheetTitle className="sr-only">Nav Item</SheetTitle>
            <SheetDescription className="sr-only">
              See all menu.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4 mb-2 px-4 pb-2">
            <Separator />
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

            {!isAuthenticated && (
              <Link
                href="/auth"
                onClick={() => setOpen(false)}
                className="mt-2"
              >
                <Button variant="outline" className="w-full text-teal-500">
                  Masuk
                </Button>
              </Link>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
