import Link from 'next/link';
import StudentDropdown, { Profile } from './student-dropdown';
import { Button } from '@/components/ui/button';
import { navLinks } from '../nav.constants/nav-link';

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
          className="hover:bg-teal-500 hover:rounded-lg hover:text-white p-1.5 text-sm font-medium transition-all"
        >
          {item.title}
        </Link>
      ))}

      {isAuthenticated ? (
        <StudentDropdown profile={profile} />
      ) : (
        <Link href="/auth">
          <Button variant="ghost" className="bg-teal-500 text-white">
            Masuk
          </Button>
        </Link>
      )}
    </nav>
  );
}
