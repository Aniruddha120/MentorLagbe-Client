'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { api } from '@/lib/api';
import { useAuth } from '@/components/Providers';

export default function MyApplications() {
  const { token } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const load = async () => { if (token) setItems(await api('/api/applications/my', { token }).catch(()=>[])); };
  useEffect(() => { load(); }, [token]); 
  const cancel = async (id: any) => {
    try { await api(`/api/applications/${id}`, { method: 'DELETE', token }); toast.success('Application cancelled'); load(); }
    catch (e: any) { toast.error(e.message); }
  };
  const badge = (s) => s === 'accepted' ? 'badge-success' : s === 'rejected' ? 'badge-error' : 'badge-warning';
  return (
    <DashboardShell allowed={['student']}>
      <h1 className="text-2xl font-bold mb-4">My Applications</h1>
      <div className="bg-white border rounded-2xl overflow-x-auto">
        <table className="table">
          <thead><tr><th>Tuition</th><th>Tutor</th><th>Fee</th><th>Applied</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {items.map((a: any) => (
              <tr key={a._id}>
                <td><div className="font-medium">{a.tuitionTitle}</div><div className="text-xs text-slate-500">{a.subject}</div></td>
                <td><div>{a.tutorName || '—'}</div><div className="text-xs text-slate-500">{a.tutorEmail}</div></td>
                <td>৳{a.monthlyFee}</td>
                <td>{new Date(a.appliedAt).toLocaleDateString()}</td>
                <td><span className={`badge ${badge(a.status)} capitalize`}>{a.status}</span></td>
                <td>{a.status === 'pending' && <button onClick={()=>cancel(a._id)} className="btn btn-xs btn-error btn-outline">Cancel</button>}</td>
              </tr>
            ))}
            {!items.length && <tr><td colSpan="6" className="text-center text-slate-500 py-8">No applications yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}
