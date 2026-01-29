import { prisma } from "@/lib/prisma";

export async function searchSimilarChunks(
  embedding: number[],
  limit = 5
) {
  const vector = `[${embedding.join(",")}]`;

  const results = await prisma.$queryRawUnsafe<any[]>(`
    SELECT "content"
    FROM "PdfChunk"
    ORDER BY embedding <-> '${vector}'::vector
    LIMIT ${limit};
  `);

  return results.map((r) => r.content);
}
