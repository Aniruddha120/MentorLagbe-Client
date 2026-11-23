'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/components/Providers';

const menus = {
  student: [
    ['Overview', '/dashboard/student'],
    ['My Applications', '/dashboard/student/my-applications'],
    ['Update Profile', '/dashboard/profile'],
  ],
  tutor: [
    ['Overview', '/dashboard/tutor'],
    ['Post a Tuition', '/dashboard/tutor/post-tuition'],
    ['My Tuitions', '/dashboard/tutor/my-tuitions'],
    ['Applicants', '/dashboard/tutor/applicants'],
    ['Update Profile', '/dashboard/profile'],
  ],
  admin: [
    ['Overview', '/dashboard/admin'],
    ['User Management', '/dashboard/admin/users'],
    ['Tuition Approval', '/dashboard/admin/tuitions'],
    ['Transactions', '/dashboard/admin/transactions'],
    ['Update Profile', '/dashboard/profile'],
  ],
};

export default function DashboardShell({ children, allowed }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace('/sign-in');
    else if (allowed && !allowed.includes(user.role)) router.replace('/dashboard');
  }, [user, loading, allowed, router]);

  if (loading || !user) return <div className="container-max section"><div className="skeleton h-64 w-full" /></div>;
  if (allowed && !allowed.includes(user.role)) return null;

  const items = (menus as any)[user.role] || [];
  return (
    <div className="container-max section">
      <div className="grid lg:grid-cols-[260px_1fr] gap-6">
        <aside className="bg-white border rounded-2xl p-4 h-fit sticky top-24">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b">
            <div className="avatar"><div className="w-11 rounded-full"><img src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name||'User')}`} alt="avatar" /></div></div>
            <div><div className="font-semibold leading-5">{user.name}</div><div className="text-xs capitalize text-slate-500">{user.role} • {user.plan}</div></div>
          </div>
          <ul className="menu gap-1">
            {items.map(([label, href]: any) => <li key={href}><Link href={href} className={pathname === href ? 'active font-semibold' : ''}>{label}</Link></li>)}
          </ul>
        </aside>
        <section className="min-w-0">{children}</section>
      </div>
    </div>
  );
}
