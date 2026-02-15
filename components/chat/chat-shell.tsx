'use client';

import { useState } from 'react';

type Message = { role: 'USER' | 'ASSISTANT'; content: string; sources?: any[] };

export function ChatShell() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim()) return;
    const question = input;
    setInput('');
    setMessages((m) => [...m, { role: 'USER', content: question }]);
    setLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        workspaceId: process.env.NEXT_PUBLIC_WORKSPACE_ID || 'default',
        sessionId: 'demo-session',
        question,
        language: 'ar'
      })
    });

    const data = await res.json();
    setMessages((m) => [...m, { role: 'ASSISTANT', content: data.answer, sources: data.sources }]);
    setLoading(false);
  }

  return (
    <div className="grid gap-4 md:grid-cols-[280px_1fr]">
      <aside className="rounded-xl bg-white p-4 shadow-sm">
        <h3 className="mb-3 font-semibold">الجلسات</h3>
        <button className="w-full rounded border px-3 py-2 text-right">جلسة تجريبية</button>
      </aside>
      <section className="rounded-xl bg-white p-4 shadow-sm">
        <div className="mb-4 max-h-[480px] space-y-3 overflow-y-auto">
          {messages.map((msg, idx) => (
            <div key={idx} className={`rounded p-3 ${msg.role === 'USER' ? 'bg-gray-100' : 'bg-teal-50'}`}>
              <p>{msg.content}</p>
              {msg.sources?.length ? (
                <details className="mt-2 text-sm">
                  <summary>المصادر</summary>
                  <ul className="mt-1 list-disc pr-4">
                    {msg.sources.map((s, i) => (
                      <li key={i}>[Source: {s.articleTitle} &gt; {s.sectionHeading}]</li>
                    ))}
                  </ul>
                </details>
              ) : null}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded border px-3 py-2"
            placeholder="اسأل عن ROAS أو Pixel أو COD..."
          />
          <button onClick={send} disabled={loading} className="rounded bg-primary px-4 py-2 text-white">
            {loading ? '...' : 'إرسال'}
          </button>
        </div>
      </section>
    </div>
  );
}
