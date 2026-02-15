import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { articleSchema } from '@/lib/validation/schemas';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') || '';
  const status = req.nextUrl.searchParams.get('status') as 'DRAFT' | 'PUBLISHED' | null;

  const articles = await prisma.article.findMany({
    where: {
      title: { contains: q, mode: 'insensitive' },
      ...(status ? { status } : {})
    },
    include: { sections: true },
    orderBy: { updatedAt: 'desc' }
  });

  return NextResponse.json(articles);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = articleSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json(parsed.error.flatten(), { status: 400 });

  const article = await prisma.article.create({
    data: {
      workspaceId: body.workspaceId,
      title: parsed.data.title,
      tags: parsed.data.tags,
      language: parsed.data.language,
      status: parsed.data.status
    }
  });

  await prisma.auditLog.create({
    data: {
      workspaceId: body.workspaceId,
      action: 'ARTICLE_CREATE',
      entityType: 'Article',
      entityId: article.id,
      meta: { title: article.title }
    }
  });

  return NextResponse.json(article, { status: 201 });
}
