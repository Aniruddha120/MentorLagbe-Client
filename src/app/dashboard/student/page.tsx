'use client';
import { useEffect, useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import Stats from '@/components/dashboard/Stats';
import { api } from '@/lib/api';
import { useAuth } from '@/components/Providers';

export default function StudentOverview() {
  const { token } = useAuth();
  const [stats, setStats] = useState<any>(null);
  useEffect(() => { if (token) api('/api/student/stats', { token }).then(setStats).catch(()=>{}); }, [token]);
  return (
    <DashboardShell allowed={['student']}>
      <h1 className="text-2xl font-bold mb-4">Student Overview</h1>
      <Stats items={[
        { label: 'Total Applied', value: stats?.totalApplied ?? '—' },
        { label: 'Accepted', value: stats?.accepted ?? '—' },
        { label: 'Pending', value: stats?.pending ?? '—' },
        { label: 'Current Plan', value: (stats?.plan || 'free').toUpperCase() },
      ]} />
      <div className="bg-white border rounded-2xl p-6 text-slate-600">Track your applications, manage your profile, and upgrade to Pro for premium features.</div>
    </DashboardShell>
  );
}
