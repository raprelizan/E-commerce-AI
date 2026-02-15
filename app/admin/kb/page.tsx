import { AdminNav } from '@/components/admin/admin-nav';

export default function AdminKbPage() {
  return (
    <section>
      <AdminNav />
      <div className="grid gap-4 rounded-xl bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-bold">إدارة قاعدة المعرفة</h1>
        <p>إنشاء المقالات، الأقسام، الاستيراد، إعدادات التقطيع، معاينة الاسترجاع، وكاشف التعارضات.</p>
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded border p-3">
            <h2 className="font-semibold">Q/A Builder</h2>
            <p className="text-sm text-gray-600">أضف أسئلة وأجوبة لتحويلها تلقائياً إلى Sections + Chunks.</p>
          </div>
          <div className="rounded border p-3">
            <h2 className="font-semibold">Preview Retrieval</h2>
            <p className="text-sm text-gray-600">اختبر أي استعلام واعرض أفضل المقاطع مع درجة التشابه.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
