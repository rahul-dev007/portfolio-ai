import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { UploadPdfForm } from "./upload-form";
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
import { ActivatePdfButton } from "./pdf-actions";

// ======================
// Server Action: Delete PDF
// ======================
async function deletePdf(id: string) {
  "use server";

  await prisma.pdfDocument.deleteMany({
    where: { id },
  });

  revalidatePath("/admin/pdf");
}

// ======================
// Page
// ======================
export default async function AdminPdfPage() {
  const pdfs = await prisma.pdfDocument.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      chunks: { select: { id: true } },
    },
  });

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
          📄 PDF Knowledge Base
        </h1>
        <p className="mt-1 text-sm text-white/60">
          Manage PDFs used for AI knowledge & RAG
        </p>
      </div>

      {/* UPLOAD */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <UploadPdfForm />
      </div>

      {/* TABLE */}
      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10">
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Chunks</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {pdfs.map((pdf) => (
              <TableRow
                key={pdf.id}
                className="border-white/10 hover:bg-white/5 transition"
              >
                <TableCell className="font-medium text-white">
                  {pdf.title}
                </TableCell>

                <TableCell>
                  {pdf.isActive ? (
                    <Badge className="bg-emerald-500/20 text-emerald-300">
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Inactive</Badge>
                  )}
                </TableCell>

                <TableCell className="text-white/70">
                  {pdf.chunks.length}
                </TableCell>

                <TableCell className="text-white/70">
                  {pdf.createdAt.toLocaleDateString()}
                </TableCell>

                <TableCell className="text-right space-x-2">
                  {!pdf.isActive && (
                    <ActivatePdfButton id={pdf.id} />
                  )}

                  <form
                    action={deletePdf.bind(null, pdf.id)}
                    className="inline"
                  >
                    <Button
                      type="submit"
                      variant="destructive"
                      size="sm"
                    >
                      Delete
                    </Button>
                  </form>
                </TableCell>
              </TableRow>
            ))}

            {pdfs.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-10 text-center text-white/50"
                >
                  No PDFs uploaded yet 📂
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
