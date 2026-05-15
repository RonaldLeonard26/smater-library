import Sidebard from '@/components/sidebar/sidebar';

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="min-h-screen flex gap-4">
      {/* sidebar */}
      <aside className="w-64 border-r">
        <Sidebard />
      </aside>
      {/* main content */}
      <main className="flex-1 p-2">{children}</main>
    </section>
  );
}
