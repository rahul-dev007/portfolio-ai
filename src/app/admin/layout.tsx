import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

import AdminSidebar from "@/components/admin/admin-sidebar";
import AdminTopbar from "@/components/admin/admin-topbar";
import SupportAlert from "@/components/admin/support-alert";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-[#0b0b12] text-white">

      {/* SIDEBAR - Desktop Only */}
      <div className="hidden md:block">
        <AdminSidebar />
      </div>

      {/* MAIN AREA */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Topbar always visible */}
        <AdminTopbar />

        <SupportAlert />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 py-6">
            {children}
          </div>
          
        </main>
      </div>
    </div>
  );
}

