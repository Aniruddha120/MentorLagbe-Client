'use client';
import { useEffect, useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import Stats from '@/components/dashboard/Stats';
import { api } from '@/lib/api';
import { useAuth } from '@/components/Providers';

export default function TutorOverview() {
  const { token } = useAuth();
  const [stats, setStats] = useState<any>(null);
  useEffect(() => { if (token) api('/api/tutor/stats', { token }).then(setStats).catch(()=>{}); }, [token]);
  return (
    <DashboardShell allowed={['tutor']}>
      <h1 className="text-2xl font-bold mb-4">Tutor Overview</h1>
      <Stats items={[
        { label: 'Total Tuitions', value: stats?.totalTuitions ?? '—' },
        { label: 'Approved/Active', value: stats?.approvedTuitions ?? '—' },
        { label: 'Total Applicants', value: stats?.applicants ?? '—' },
        { label: 'Current Plan', value: (stats?.plan || 'free').toUpperCase() },
      ]} />
      <div className="bg-white border rounded-2xl p-6 text-slate-600">Post new tuition batches, manage listings, and review student applications from your dashboard.</div>
    </DashboardShell>
  );
}
