'use client';
import Link from 'next/link';
import useNavbar from './useNavbar';
import SkeletonNav from './components/skeleton-nav';
import MobileNav from './components/mobile-nav';
import DesktopNav from './components/dekstop-nav';

export default function Navbar() {
  const { profile, isAuthenticated, isLoading } = useNavbar();
  if (isLoading) return <SkeletonNav />;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-12 items-center justify-between px-6">
        <Link href="/">
          <p className="text-lg font-semibold text-teal-500">
            SMATER
            <span className="font-serif font-medium text-black">-l𝓲brary.</span>
          </p>
        </Link>

        {/* Desktop */}
        <DesktopNav profile={profile} isAuthenticated={isAuthenticated} />

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <MobileNav profile={profile} isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </header>
  );
}
