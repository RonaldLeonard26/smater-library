import Navbar from '@/components/navbar/navbar';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="container mx-auto">{children}</main>
    </>
  );
}
