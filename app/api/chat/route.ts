import { NextRequest, NextResponse } from 'next/server';
import { answerFromKbOnly } from '@/lib/rag/service';
import { chatSchema } from '@/lib/validation/schemas';
import { checkRateLimit } from '@/lib/utils/rate-limit';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = chatSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const ip = req.headers.get('x-forwarded-for') || 'anon';
  if (!checkRateLimit(`chat:${ip}`)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const result = await answerFromKbOnly({
    workspaceId: parsed.data.workspaceId,
    sessionId: parsed.data.sessionId,
    userId: 'anonymous',
    question: parsed.data.question,
    language: parsed.data.language
  });

  return NextResponse.json(result);
}
