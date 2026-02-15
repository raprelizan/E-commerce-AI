import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(req: NextRequest) {
  const workspaceId = req.nextUrl.searchParams.get('workspaceId');
  if (!workspaceId) return NextResponse.json({ error: 'workspaceId required' }, { status: 400 });

  const policies = await prisma.policy.findMany({ where: { workspaceId }, orderBy: { priority: 'asc' } });
  return NextResponse.json(policies);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const policy = await prisma.policy.create({
    data: {
      workspaceId: body.workspaceId,
      name: body.name,
      contentMarkdown: body.contentMarkdown,
      enabled: body.enabled ?? true,
      priority: body.priority ?? 100
    }
  });

  return NextResponse.json(policy, { status: 201 });
}
