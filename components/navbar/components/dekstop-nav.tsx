import Link from 'next/link';
import StudentDropdown, { Profile } from './user-dropdown';
import { Button } from '@/components/ui/button';
import { navLinks } from '../nav.constants/nav-link';
import UserDropdown from './user-dropdown';

interface Props {
  isAuthenticated: boolean;
  profile: Profile;
}
export default function DesktopNav({ profile, isAuthenticated }: Props) {
  return (
    <nav className="hidden md:flex items-center gap-6">
      {navLinks.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className="hover:bg-primary hover:rounded-full hover:text-white p-1.5 hover:px-2 text-sm border rounded-full px-2 text-slate-700 font-medium transition-all"
        >
          {item.title}
        </Link>
      ))}

      {isAuthenticated ? (
        <UserDropdown profile={profile} />
      ) : (
        <Link href="/auth">
          <Button
            variant="ghost"
            className="bg-primary rounded-full  text-white"
          >
            Masuk
          </Button>
        </Link>
      )}
    </nav>
  );
}
