import { describe, expect, it } from 'vitest';
import { buildChunks, splitMarkdownByHeading } from '@/lib/rag/chunking';
import { isNoAnswer } from '@/lib/rag/retrieval';

describe('chunking', () => {
  it('splits markdown by heading', () => {
    const parts = splitMarkdownByHeading('# A\nalpha\n## B\nbeta');
    expect(parts.length).toBe(2);
  });

  it('creates overlapped chunks', () => {
    const text = new Array(120).fill('word').join(' ');
    const chunks = buildChunks(text, { chunkSize: 50, overlap: 10 });
    expect(chunks.length).toBeGreaterThan(2);
  });
});

describe('retrieval threshold', () => {
  it('triggers no-answer below threshold', () => {
    expect(isNoAnswer([0.1, 0.2], 0.25)).toBe(true);
  });

  it('allows answer above threshold', () => {
    expect(isNoAnswer([0.4, 0.2], 0.25)).toBe(false);
  });
});
