import { AdminNav } from '@/components/admin/admin-nav';

export default function AdminSettingsPage() {
  return (
    <section>
      <AdminNav />
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-bold">الإعدادات</h1>
        <p>لغة افتراضية، اسم العلامة التجارية، الشعار، وإعدادات مزود LLM.</p>
      </div>
    </section>
  );
}
