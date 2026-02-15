import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="rounded-xl bg-white p-8 shadow-sm">
      <h1 className="mb-4 text-3xl font-bold">EcomBrain — مساعدك المتخصص في التجارة الإلكترونية</h1>
      <p className="mb-6 text-gray-600">
        مساعد معرفي يعتمد فقط على قاعدة المعرفة التي يحددها فريقك، مع سياسات صارمة للالتزام بالمحتوى الداخلي.
      </p>
      <div className="flex gap-3">
        <Link href="/chat" className="rounded bg-primary px-4 py-2 text-white">ابدأ المحادثة</Link>
        <Link href="/admin/kb" className="rounded border px-4 py-2">إدارة المعرفة</Link>
      </div>
    </section>
  );
}
