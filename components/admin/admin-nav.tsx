import Link from 'next/link';

const items = [
  { href: '/admin/kb', label: 'قاعدة المعرفة' },
  { href: '/admin/policies', label: 'السياسات' },
  { href: '/admin/users', label: 'المستخدمون' },
  { href: '/admin/analytics', label: 'التحليلات' },
  { href: '/admin/settings', label: 'الإعدادات' }
];

export function AdminNav() {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="rounded border bg-white px-3 py-2 text-sm">
          {item.label}
        </Link>
      ))}
    </div>
  );
}
