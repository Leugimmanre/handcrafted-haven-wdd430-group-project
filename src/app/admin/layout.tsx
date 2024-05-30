import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="md:flex">
      <main className="md:flex-1 md:h-screen md:overflow-y-scroll bg-gray-100">
        {children}
      </main>
    </div>
  );
}
