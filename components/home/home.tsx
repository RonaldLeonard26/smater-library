'use client';

import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
import useSession from '../hooks/useSession';

export default function HomePage() {
  const { isAuthenticated } = useSession();
  return (
    <section className="w-full min-h-[calc(100vh-5rem)] bg-background flex items-center py-6 lg:py-14">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Kolom Kiri: Teks & Action */}
        <div className="space-y-4 text-left">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-primary text-sm font-bold tracking-wide">
            PERPUSTAKAAN DIGITAL
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-slate-700 tracking-tight leading-tight">
            SMAK FRATERAN <br className="hidden sm:inline" />
            <span className="text-primary">MAUMERE</span>
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-lg">
            Akses ribuan modul pembelajaran, karya sastra, dan buku referensi
            digital kapan saja dan di mana saja.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-accent text-white rounded-full px-8"
            >
              <Link href="/books">Jelajahi Katalog</Link>
            </Button>
            {!isAuthenticated ? (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full hover:bg-accent border-slate-300"
              >
                <Link href="/auth">Masuk / Daftar</Link>
              </Button>
            ) : (
              <div />
            )}
          </div>
        </div>

        {/* Kolom Kanan: Frame Gambar */}
        <div className="relative w-full aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-50">
          <Image
            src="/images/library-cover.svg"
            alt="Perpustakaan SMAK Frateran Maumere"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
