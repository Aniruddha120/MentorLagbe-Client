'use client';
import { useEffect, useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import Stats from '@/components/dashboard/Stats';
import { api } from '@/lib/api';
import { useAuth } from '@/components/Providers';

export default function AdminOverview() {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  useEffect(() => { if (token) api('/api/admin/stats', { token }).then(setStats).catch(()=>{}); }, [token]);
  return (
    <DashboardShell allowed={['admin']}>
      <h1 className="text-2xl font-bold mb-4">Admin Overview</h1>
      <Stats items={[
        { label: 'Total Users', value: stats?.totalUsers ?? '—' },
        { label: 'Total Tutors', value: stats?.totalTutors ?? '—' },
        { label: 'Pending Tuitions', value: stats?.pendingTuitions ?? '—' },
        { label: 'Revenue ($)', value: stats?.totalRevenue ?? '—' },
      ]} />
      <div className="bg-white border rounded-2xl p-6 text-slate-600">Moderate tuition posts, manage user roles, and monitor Stripe transactions from the admin dashboard.</div>
    </DashboardShell>
  );
}
