import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { buildChunks, estimateTokens } from '../lib/rag/chunking';

const prisma = new PrismaClient();

async function main() {
  const workspace = await prisma.workspace.upsert({
    where: { id: 'ws_default' },
    update: {},
    create: { id: 'ws_default', name: 'EcomBrain Workspace', defaultLanguage: 'ar' }
  });

  const adminHash = await bcrypt.hash('admin12345', 10);
  await prisma.user.upsert({
    where: { email: 'admin@ecombrain.local' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@ecombrain.local',
      passwordHash: adminHash,
      role: 'ADMIN'
    }
  });

  const article = await prisma.article.create({
    data: {
      workspaceId: workspace.id,
      title: 'أساسيات ROAS وPixel وCOD',
      status: 'PUBLISHED',
      tags: ['roas', 'pixel', 'cod'],
      language: 'ar',
      sections: {
        create: [
          {
            heading: 'ROAS',
            order: 1,
            contentMarkdown:
              'ROAS = Revenue / Ad Spend. إذا كان ROAS أقل من الحد المستهدف، راجع جودة الزيارات وصفحة المنتج والسعر.'
          },
          {
            heading: 'Pixel',
            order: 2,
            contentMarkdown:
              'تأكد من تفعيل أحداث ViewContent وAddToCart وPurchase في Shopify. راقب تطابق الأحداث مع صفحة الشكر.'
          },
          {
            heading: 'COD Policies',
            order: 3,
            contentMarkdown:
              'لتقليل رفض COD: تأكيد الطلب عبر WhatsApp/SMS، تفعيل Blacklist للعملاء المتكررين بالرفض، وطلب عربون للطلبات عالية المخاطر.'
          }
        ]
      }
    },
    include: { sections: true }
  });

  for (const section of article.sections) {
    const rawChunks = buildChunks(section.contentMarkdown, { chunkSize: 80, overlap: 10 });
    for (const c of rawChunks) {
      await prisma.$executeRawUnsafe(
        'INSERT INTO "Chunk" (id, "sectionId", "contentText", "tokenCount", embedding, "createdAt") VALUES (gen_random_uuid()::text, $1, $2, $3, $4::vector, NOW())',
        section.id,
        c,
        estimateTokens(c),
        `[${new Array(3072).fill(0).join(',')}]`
      );
    }
  }

  await prisma.policy.createMany({
    data: [
      {
        workspaceId: workspace.id,
        name: 'Strict KB only',
        contentMarkdown: 'لا تجب إلا من سياق قاعدة المعرفة المقدم.',
        enabled: true,
        priority: 1
      },
      {
        workspaceId: workspace.id,
        name: 'رفض الاستخدام الضار',
        contentMarkdown: 'ارفض الاحتيال والاختراق أو أي نشاط غير قانوني وقدّم بدائل آمنة.',
        enabled: true,
        priority: 2
      }
    ]
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
