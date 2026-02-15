# EcomBrain

Arabic-first full-stack RAG assistant for E-commerce operations (Shopify, ROAS, Pixel, logistics, COD, CRM), with strict **Answer-from-KB-only** behavior.

## Stack
- Next.js 14 (App Router) + TypeScript + TailwindCSS
- NextAuth (Credentials)
- PostgreSQL + Prisma + pgvector
- OpenAI-compatible provider abstraction for chat + embeddings
- Docker Compose for local development

## Project Tree
```txt
.
├── app/
│   ├── admin/(kb|policies|users|analytics|settings)/page.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── chat/route.ts
│   │   ├── admin/(kb|policies)/route.ts
│   │   └── feedback/route.ts
│   ├── chat/page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── admin/admin-nav.tsx
│   └── chat/chat-shell.tsx
├── lib/
│   ├── auth/options.ts
│   ├── db/prisma.ts
│   ├── rag/(chunking|prompt|provider|retrieval|service).ts
│   ├── utils/(cn|rate-limit).ts
│   └── validation/schemas.ts
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/0001_init/migration.sql
├── tests/chunking.test.ts
├── docker-compose.yml
├── Dockerfile
└── .env.example
```

## Setup
1. Copy environment:
   ```bash
   cp .env.example .env
   ```
2. Start database + app:
   ```bash
   docker compose up --build
   ```
3. Or run manually:
   ```bash
   npm install
   npm run prisma:generate
   npm run prisma:migrate
   npm run prisma:seed
   npm run dev
   ```

## Key Features
- **Strict KB-only RAG** with no-answer fallback in Arabic.
- **Admin KB workflows**: articles, sections, Q/A builder concept, retrieval preview concept.
- **Policies engine** with priority + enable toggles.
- **RBAC-ready schema**: ADMIN / EDITOR / USER.
- **Feedback + Audit logs** tables and APIs.
- **Rate limiting** and zod validation.
- **Unit tests** for chunking and no-answer threshold.

## Notes
- Ensure `pgvector` extension is enabled in Postgres.
- Embedding dimension assumes `text-embedding-3-large` (3072).
- For production, add full shadcn components and robust auth UI flows.
