import Sidebard from '@/components/sidebar/sidebar';

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="h-screen flex lg:gap-4 overflow-hidden">
      {/* sidebar */}
      <aside className="fixed lg:relative inset-y-0 left-0 z-50 w-64 border-r -translate-x-full lg:translate-x-0">
        <Sidebard />
      </aside>
      {/* main content */}
      <main className="flex-1 p-2 overflow-hidden">{children}</main>
    </section>
  );
}
