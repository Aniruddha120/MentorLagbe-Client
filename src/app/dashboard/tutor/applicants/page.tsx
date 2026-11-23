'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { api } from '@/lib/api';
import { useAuth } from '@/components/Providers';

export default function ApplicantsPage() {
  const { token } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const load = async () => { if (token) setItems(await api('/api/tutor/applicants', { token }).catch(()=>[])); };
  useEffect(() => { load(); }, [token]); 
  const setStatus = async (id: any, status: any) => {
    try { await api(`/api/tutor/applications/${id}`, { method:'PATCH', token, body:{ status } }); toast.success(`Application ${status}`); load(); }
    catch(e){ toast.error(e.message); }
  };
  return (
    <DashboardShell allowed={['tutor']}>
      <h1 className="text-2xl font-bold mb-4">Manage Applicants</h1>
      <div className="bg-white border rounded-2xl overflow-x-auto">
        <table className="table">
          <thead><tr><th>Student</th><th>Tuition</th><th>Schedule/Note</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {items.map((a: any) => (
              <tr key={a._id}>
                <td><div className="font-medium">{a.studentName}</div><div className="text-xs text-slate-500">{a.studentEmail}</div><div className="text-xs text-slate-500">{a.studentPhone}</div></td>
                <td>{a.tuitionTitle}</td>
                <td><div className="text-sm">{a.preferredSchedule}</div><div className="text-xs text-slate-500">{a.studentNote}</div></td>
                <td><span className="badge capitalize">{a.status}</span></td>
                <td className="flex gap-2">
                  <button className="btn btn-xs btn-success" disabled={a.status!=='pending'} onClick={()=>setStatus(a._id,'accepted')}>Accept</button>
                  <button className="btn btn-xs btn-error btn-outline" disabled={a.status!=='pending'} onClick={()=>setStatus(a._id,'rejected')}>Reject</button>
                </td>
              </tr>
            ))}
            {!items.length && <tr><td colSpan="5" className="text-center text-slate-500 py-8">No applicants yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}
