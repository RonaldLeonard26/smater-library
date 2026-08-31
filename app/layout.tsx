import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Providers from './providers';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Smater Library',
  description: 'Perpustakaan Digital',
  icons: {
    icon: [
      {
        url: '/images/logo.png',
        type: 'image/x-icon',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        inter.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
          <Providers>
            <main>{children}</main>
            <Toaster
              position="top-right"
              richColors
              toastOptions={{
                // Menyesuaikan font family & styling umum
                style: {
                  fontFamily: 'inter', // Mengikuti font utama aplikasi
                  borderRadius: '0.75rem', // Rounded-xl
                  padding: '10px 14px',
                  fontSize: '0.875rem', // text-sm
                },
              }}
            />
          </Providers>
        </TooltipProvider>
      </body>
    </html>
  );
}
