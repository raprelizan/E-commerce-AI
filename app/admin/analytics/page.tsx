import { AdminNav } from '@/components/admin/admin-nav';

export default function AdminAnalyticsPage() {
  return (
    <section>
      <AdminNav />
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-bold">التحليلات</h1>
        <ul className="list-disc pr-6 text-sm">
          <li>عدد المحادثات يومياً.</li>
          <li>الأسئلة الأكثر تكراراً.</li>
          <li>عدد الأسئلة غير المجابة وفجوات المعرفة.</li>
          <li>نسبة التقييمات الإيجابية/السلبية.</li>
        </ul>
      </div>
    </section>
  );
}
