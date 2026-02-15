export type ChunkOptions = {
  chunkSize: number;
  overlap: number;
};

export function estimateTokens(text: string) {
  return Math.ceil(text.split(/\s+/).length * 1.2);
}

export function splitMarkdownByHeading(markdown: string): string[] {
  return markdown
    .split(/\n(?=#+\s)/g)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function buildChunks(text: string, options: ChunkOptions) {
  const words = text.split(/\s+/).filter(Boolean);
  const { chunkSize, overlap } = options;
  const chunks: string[] = [];

  let start = 0;
  while (start < words.length) {
    const end = Math.min(start + chunkSize, words.length);
    chunks.push(words.slice(start, end).join(' '));
    if (end === words.length) break;
    start = Math.max(end - overlap, start + 1);
  }

  return chunks;
}
