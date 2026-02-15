import { AdminNav } from '@/components/admin/admin-nav';

export default function AdminUsersPage() {
  return (
    <section>
      <AdminNav />
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-bold">المستخدمون والصلاحيات</h1>
        <p>إدارة الأدوار ADMIN/EDITOR/USER وإعادة تعيين كلمات المرور.</p>
      </div>
    </section>
  );
}
