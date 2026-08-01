import Navbar from '@/components/navbar/navbar';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <main className="container mx-auto py-4">{children}</main>
    </>
  );
}
