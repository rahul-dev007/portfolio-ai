import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// ======================
// Server Action: Mark as Read
// ======================
async function markAsRead(id: string) {
  "use server";

  await prisma.contactMessage.update({
    where: { id },
    data: { isRead: true },
  });

  revalidatePath("/admin/messages");
}

// ======================
// Server Action: Delete Message
// ======================
async function deleteMessage(id: string) {
  "use server";

  await prisma.contactMessage.delete({
    where: { id },
  });

  revalidatePath("/admin/messages");
}

// ======================
// Admin Messages Page
// ======================
export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
          📨 Contact Messages
        </h1>
        <p className="mt-1 text-sm text-white/60">
          Messages sent from your portfolio contact form
        </p>
      </div>

      {/* TABLE CARD */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {messages.map((msg) => (
              <TableRow
                key={msg.id}
                className={`
                  border-white/10 transition
                  ${!msg.isRead ? "bg-white/5" : ""}
                  hover:bg-white/10
                `}
              >
                <TableCell className="font-medium text-white">
                  {msg.name}
                </TableCell>

                <TableCell className="text-white/70">
                  {msg.email}
                </TableCell>

                <TableCell className="max-w-[320px] truncate text-white/70">
                  {msg.message}
                </TableCell>

                <TableCell>
                  {msg.isRead ? (
                    <Badge variant="secondary">Read</Badge>
                  ) : (
                    <Badge className="bg-emerald-500/20 text-emerald-300">
                      New
                    </Badge>
                  )}
                </TableCell>

                <TableCell className="text-white/70">
                  {msg.createdAt.toLocaleDateString()}
                </TableCell>

                <TableCell className="text-right space-x-2">
                  {!msg.isRead && (
                    <form
                      action={markAsRead.bind(null, msg.id)}
                      className="inline"
                    >
                      <Button size="sm" variant="outline">
                        Mark Read
                      </Button>
                    </form>
                  )}

                  <form
                    action={deleteMessage.bind(null, msg.id)}
                    className="inline"
                  >
                    <Button size="sm" variant="destructive">
                      Delete
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}

            {messages.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-10 text-center text-white/50"
                >
                  No messages yet 📭
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
