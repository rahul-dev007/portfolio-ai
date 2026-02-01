import AdminSidebar from "@/components/admin/admin-sidebar";
import AdminTopbar from "@/components/admin/admin-topbar";

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0b0b12]">
      <AdminSidebar />

      <div className="flex flex-1 flex-col">
        <AdminTopbar />
        <main className="flex-1 p-6 text-white">
          {children}
        </main>
      </div>
    </div>
  );
}
