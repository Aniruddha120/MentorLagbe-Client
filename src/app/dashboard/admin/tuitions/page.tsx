'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { api } from '@/lib/api';
import { useAuth } from '@/components/Providers';

export default function AdminTuitions() {
  const { token } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const load = async () => { if (token) setItems(await api('/api/admin/tuitions', { token }).catch(()=>[])); };
  useEffect(() => { load(); }, [token]); 
  const setStatus = async (id, approvalStatus) => {
    try { await api(`/api/admin/tuitions/${id}/status`, { method:'PATCH', token, body:{ approvalStatus } }); toast.success(`Tuition ${approvalStatus}`); load(); }
    catch(e){ toast.error(e.message); }
  };
  return (
    <DashboardShell allowed={['admin']}>
      <h1 className="text-2xl font-bold mb-4">Tuition Approval</h1>
      <div className="space-y-4">
        {items.map((t: any) => (
          <div key={t._id} className="bg-white border rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold">{t.title}</h2>
              <div className="text-sm text-slate-500">{t.subject} • {t.classLevel} • {t.tutorName} ({t.tutorEmail})</div>
              <div className="mt-2"><span className={`badge ${t.approvalStatus==='approved'?'badge-success':t.approvalStatus==='rejected'?'badge-error':'badge-warning'}`}>{t.approvalStatus}</span></div>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-sm btn-success" onClick={()=>setStatus(t._id,'approved')}>Approve</button>
              <button className="btn btn-sm btn-error btn-outline" onClick={()=>setStatus(t._id,'rejected')}>Reject</button>
            </div>
          </div>
        ))}
        {!items.length && <div className="bg-white border rounded-2xl p-8 text-center text-slate-500">No tuitions found.</div>}
      </div>
    </DashboardShell>
  );
}
