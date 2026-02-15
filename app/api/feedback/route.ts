import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const feedback = await prisma.feedback.create({
    data: {
      messageId: body.messageId,
      userId: body.userId,
      rating: body.rating,
      note: body.note
    }
  });
  return NextResponse.json(feedback, { status: 201 });
}
