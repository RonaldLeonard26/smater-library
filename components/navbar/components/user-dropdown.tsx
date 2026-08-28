import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { navAdmin, navStudents } from '../nav.constants/nav-link';
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import useLogOut from '@/components/hooks/useLogout';
import { Spinner } from '@/components/ui/spinner';

export interface Profile {
  full_name: string;
  nisn: string;
  role: string;
}

interface Props {
  profile: Profile;
}

export default function UserDropdown({ profile }: Props) {
  const { logOut, isPendingLogOut } = useLogOut();
  const isAdmin = profile?.role === 'ADMIN';
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarFallback className="bg-teal-50 border-2 text-slate-500 border-teal-500">
            {profile.full_name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{profile.full_name}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        {isAdmin
          ? navAdmin.map((item) => {
              const Icon = item.icon;
              return (
                <DropdownMenuItem key={item.key} asChild>
                  <Link href={item.href}>
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              );
            })
          : navStudents.map((item) => {
              const Icon = item.icon;

              return (
                <DropdownMenuItem key={item.key} asChild>
                  <Link href={item.href}>
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              );
            })}

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => logOut()}
          className="flex items-center justify-center text-destructive"
        >
          <LogOut /> {isPendingLogOut ? <Spinner /> : 'Keluar'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
