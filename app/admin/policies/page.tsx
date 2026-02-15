import { AdminNav } from '@/components/admin/admin-nav';

export default function AdminPoliciesPage() {
  return (
    <section>
      <AdminNav />
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-bold">السياسات والقواعد</h1>
        <p>إدارة Global System Prompt وقوالب: Strict KB only, Friendly, Short answers, Teach mode.</p>
      </div>
    </section>
  );
}
