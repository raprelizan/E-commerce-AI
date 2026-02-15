import { prisma } from '@/lib/db/prisma';
import { chatCompletion, embedText } from '@/lib/rag/provider';
import { buildStrictSystemPrompt } from '@/lib/rag/prompt';
import { isNoAnswer, retrieveTopChunks } from '@/lib/rag/retrieval';

export async function answerFromKbOnly({
  workspaceId,
  sessionId,
  userId,
  question,
  language = 'ar'
}: {
  workspaceId: string;
  sessionId: string;
  userId: string;
  question: string;
  language?: string;
}) {
  const embedding = await embedText(question);
  const chunks = await retrieveTopChunks(workspaceId, embedding, 6);
  const policies = await prisma.policy.findMany({
    where: { workspaceId, enabled: true },
    orderBy: { priority: 'asc' }
  });

  const noAnswer = !chunks.length || isNoAnswer(chunks.map((c) => c.score));

  const context = chunks
    .map((c, i) => `# Chunk ${i + 1}\n${c.contentText}\n[Source: ${c.articleTitle} > ${c.sectionHeading}]`)
    .join('\n\n');

  let answer = 'لا أملك معلومة كافية من قاعدة المعرفة الحالية.\n\n- ما نوع النشاط التجاري والمنتج؟\n- ما المرحلة التي تواجه فيها المشكلة؟\n\n**اقتراح للإدمن لإضافته لقاعدة المعرفة:**\n**العنوان:** فجوة معرفية من المحادثة\n- تعريف السيناريو بدقة\n- خطوات عملية\n- أخطاء شائعة\n';

  if (!noAnswer) {
    const completion = await chatCompletion([
      { role: 'system', content: buildStrictSystemPrompt(policies.map((p) => p.contentMarkdown)) },
      { role: 'system', content: `Language: ${language}\n\nKB Context:\n${context}` },
      { role: 'user', content: question }
    ]);
    answer = completion.choices[0]?.message?.content || answer;
  }

  const sourcePayload = chunks.map((c) => ({
    articleTitle: c.articleTitle,
    sectionHeading: c.sectionHeading,
    chunkId: c.id,
    score: c.score
  }));

  await prisma.chatMessage.createMany({
    data: [
      { sessionId, role: 'USER', content: question },
      { sessionId, role: 'ASSISTANT', content: answer, sources: sourcePayload as any }
    ]
  });

  return { answer, sources: sourcePayload, noAnswer };
}
