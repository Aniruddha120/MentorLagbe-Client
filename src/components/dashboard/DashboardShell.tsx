'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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

export default function DashboardShell({ children, allowed }: any) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
      <div className="bg-white border rounded-2xl p-4 mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button className="btn btn-sm btn-ghost" onClick={() => setSidebarOpen((v) => !v)} aria-label="Toggle sidebar">☰</button>
          <div>
            <div className="font-semibold capitalize">{user.role} Dashboard</div>
            <div className="text-xs text-slate-500">Manage your MentorLagbe activity</div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="hidden sm:block text-right">
            <div className="font-medium leading-4">{user.name}</div>
            <div className="text-xs text-slate-500 capitalize">{user.role} • {user.plan}</div>
          </div>
          <div className="avatar"><div className="w-9 rounded-full"><img src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}`} alt="avatar" /></div></div>
        </div>
      </div>
      <div className={`grid gap-6 ${sidebarOpen ? 'lg:grid-cols-[260px_1fr]' : 'grid-cols-1'}`}>
        {sidebarOpen && (
          <aside className="bg-white border rounded-2xl p-4 h-fit lg:sticky lg:top-24">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b">
              <div className="avatar"><div className="w-11 rounded-full"><img src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}`} alt="avatar" /></div></div>
              <div><div className="font-semibold leading-5">{user.name}</div><div className="text-xs capitalize text-slate-500">{user.role} • {user.plan}</div></div>
            </div>
            <ul className="menu gap-1">
              {items.map(([label, href]: any) => <li key={href}><Link href={href} className={pathname === href ? 'active font-semibold' : ''}>{label}</Link></li>)}
            </ul>
          </aside>
        )}
        <section className="min-w-0">{children}</section>
      </div>
    </div>
  );
}
