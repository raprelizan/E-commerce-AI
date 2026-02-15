import { z } from 'zod';

export const chatSchema = z.object({
  workspaceId: z.string().min(1),
  sessionId: z.string().min(1),
  question: z.string().min(2).max(4000),
  language: z.enum(['ar', 'fr', 'en']).default('ar')
});

export const articleSchema = z.object({
  title: z.string().min(3),
  tags: z.array(z.string()).default([]),
  language: z.enum(['ar', 'fr', 'en']).default('ar'),
  status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT')
});
