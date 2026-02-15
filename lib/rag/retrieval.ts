import { prisma } from '@/lib/db/prisma';

type RetrievedChunk = {
  id: string;
  contentText: string;
  score: number;
  articleTitle: string;
  sectionHeading: string;
};

export async function retrieveTopChunks(workspaceId: string, queryEmbedding: number[], topK = 6) {
  const rows = await prisma.$queryRawUnsafe<RetrievedChunk[]>(
    `
    SELECT c.id,
           c."contentText",
           1 - (c.embedding <=> $1::vector) AS score,
           a.title AS "articleTitle",
           s.heading AS "sectionHeading"
    FROM "Chunk" c
    JOIN "Section" s ON s.id = c."sectionId"
    JOIN "Article" a ON a.id = s."articleId"
    WHERE a."workspaceId" = $2 AND a.status = 'PUBLISHED'
    ORDER BY c.embedding <=> $1::vector
    LIMIT $3
  `,
    `[${queryEmbedding.join(',')}]`,
    workspaceId,
    topK
  );

  return rows;
}

export function isNoAnswer(scores: number[], threshold = 0.25) {
  const best = Math.max(...scores, 0);
  return best < threshold;
}
