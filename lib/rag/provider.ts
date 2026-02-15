import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.LLM_API_KEY,
  baseURL: process.env.LLM_BASE_URL || undefined
});

export async function embedText(input: string) {
  const res = await client.embeddings.create({
    model: process.env.EMBEDDING_MODEL || 'text-embedding-3-large',
    input
  });

  return res.data[0].embedding;
}

export async function chatCompletion(messages: OpenAI.ChatCompletionMessageParam[]) {
  return client.chat.completions.create({
    model: process.env.LLM_MODEL || 'gpt-4o-mini',
    messages,
    temperature: 0.1,
    stream: false
  });
}
