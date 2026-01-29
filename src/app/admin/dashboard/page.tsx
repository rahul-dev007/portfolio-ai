import { prisma } from "@/lib/prisma";
import {
  FolderKanban,
  FileText,
  MessageSquare,
  Star,
} from "lucide-react";
import StatCard from "@/components/admin/stat-card";

export default async function AdminDashboardPage() {
  // 🔥 REAL DATA (from Prisma)
  const [
    totalProjects,
    featuredProjects,
    totalPdfs,
    unreadMessages,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { isFeatured: true } }),
    prisma.pdfDocument.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
  ]);

  return (
    <div className="space-y-10">
      {/* PAGE TITLE */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-white/60">
          Overview of your portfolio system
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Projects"
          value={totalProjects}
          icon={<FolderKanban size={26} />}
          gradient="hover:shadow-[0_0_40px_rgba(34,211,238,0.6)]"
          href="/admin/projects"
        />

        <StatCard
          title="Featured Projects"
          value={featuredProjects}
          icon={<Star size={26} />}
          gradient="hover:shadow-[0_0_40px_rgba(236,72,153,0.6)]"
          href="/admin/projects"
        />

        <StatCard
          title="PDF Knowledge"
          value={totalPdfs}
          icon={<FileText size={26} />}
          gradient="hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]"
          href="/admin/pdf"
        />

        <StatCard
          title="Unread Messages"
          value={unreadMessages}
          icon={<MessageSquare size={26} />}
          gradient="hover:shadow-[0_0_40px_rgba(34,197,94,0.6)]"
          href="/admin/messages"
        />

      </div>

      {/* RECENT ACTIVITY (static for now) */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">
          Recent Activity
        </h2>

        <ul className="space-y-3 text-sm text-white/70">
          <li>🟢 Projects & portfolio updates</li>
          <li>📩 New contact messages</li>
          <li>📄 PDFs indexed for AI knowledge</li>
        </ul>
      </div>
    </div>
  );
}
