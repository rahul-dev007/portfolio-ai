import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

import {
  FolderKanban,
  FileText,
  MessageSquare,
  Star,
  LifeBuoy,
} from "lucide-react";

import StatCard from "@/components/admin/stat-card";

export default async function AdminDashboardPage() {
  // 🔐 Auth guard
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    redirect("/admin/login");
  }

  // 📊 Real data
  const [
    totalProjects,
    featuredProjects,
    totalPdfs,
    unreadMessages,
    openSupportThreads,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { isFeatured: true } }),
    prisma.pdfDocument.count(),
    prisma.contactMessage.count({ where: { isRead: false } }),
    prisma.supportThread.count({ where: { isClosed: false } }),
  ]);

  return (
    <div className="space-y-10">
      {/* ================= PAGE TITLE ================= */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-white/60">
          Overview of your portfolio & support system
        </p>
      </div>

      {/* ================= STATS GRID ================= */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
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

        {/* ⭐ SUPPORT CHAT CARD */}
        <StatCard
          title="Support Chats"
          value={openSupportThreads}
          icon={<LifeBuoy size={26} />}
          gradient="hover:shadow-[0_0_40px_rgba(59,130,246,0.6)]"
          href="/admin/chat/support"
        />
      </div>

      {/* ================= SUPPORT OVERVIEW ================= */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            Support Inbox
          </h2>

          <a
            href="/admin/chat/support"
            className="text-sm text-cyan-400 hover:underline"
          >
            Open Inbox →
          </a>
        </div>

        <p className="mt-1 text-sm text-white/60">
          Live conversations from portfolio visitors
        </p>

        <div className="mt-6 flex items-center gap-6">
          <div className="rounded-xl bg-white/10 px-5 py-4">
            <p className="text-xs text-white/60">
              Open Threads
            </p>
            <p className="text-2xl font-bold text-white">
              {openSupportThreads}
            </p>
          </div>

          <div className="text-sm text-white/50">
            Realtime support powered by Pusher
          </div>
        </div>
      </div>

      {/* ================= SYSTEM STATUS ================= */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">
          System Status
        </h2>

        <ul className="space-y-2 text-sm text-white/60">
          <li>• Portfolio content managed securely</li>
          <li>• Guest support chat running in realtime</li>
          <li>• Admin replies are authenticated</li>
          <li>• Database & AI services operational</li>
        </ul>
      </div>
    </div>
  );
}
