'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { api } from '@/lib/api';
import { useAuth } from '@/components/Providers';

export default function MyTuitions() {
  const { token } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any>(null);
  const load = async () => { if (token) setItems(await api('/api/tutor/tuitions', { token }).catch(()=>[])); };
  useEffect(() => { load(); }, [token]); 

  const saveEdit = async () => {
    try {
      const { _id, ...body } = editing;
      await api(`/api/tutor/tuitions/${_id}`, { method: 'PATCH', token, body });
      toast.success('Tuition updated'); setEditing(null); load();
    } catch (e: any) { toast.error(e.message); }
  };
  const del = async (id: any) => { if (!confirm('Delete this tuition?')) return; try { await api(`/api/tutor/tuitions/${id}`, { method:'DELETE', token }); toast.success('Deleted'); load(); } catch(e){toast.error(e.message);} };
  const toggle = async (t: any) => { try { await api(`/api/tutor/tuitions/${t._id}`, { method:'PATCH', token, body:{ isActive: !t.isActive } }); load(); } catch(e){toast.error(e.message);} };

  return (
    <DashboardShell allowed={['tutor']}>
      <h1 className="text-2xl font-bold mb-4">My Tuitions</h1>
      <div className="space-y-4">
        {items.map((t: any) => (
          <div key={t._id} className="bg-white border rounded-2xl p-5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h2 className="font-semibold text-lg">{t.title}</h2>
                <div className="text-sm text-slate-500">{t.subject} • {t.classLevel} • ৳{t.monthlyFee}/mo</div>
                <div className="flex gap-2 mt-2">
                  <span className={`badge ${t.approvalStatus==='approved'?'badge-success':t.approvalStatus==='rejected'?'badge-error':'badge-warning'}`}>{t.approvalStatus}</span>
                  <span className={`badge ${t.isActive?'badge-info':'badge-ghost'}`}>{t.isActive?'Active':'Closed'}</span>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button className="btn btn-sm" onClick={()=>setEditing({...t})}>Edit</button>
                <button className="btn btn-sm btn-outline" onClick={()=>toggle(t)}>{t.isActive?'Close':'Activate'}</button>
                <button className="btn btn-sm btn-error btn-outline" onClick={()=>del(t._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
        {!items.length && <div className="bg-white border rounded-2xl p-8 text-center text-slate-500">No tuitions posted yet.</div>}
      </div>

      {editing && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-3">Edit Tuition</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {['title','subject','classLevel','location','bannerImage'].map(k => <input key={k} className="input input-bordered" value={editing[k]||''} onChange={e=>setEditing({...editing,[k]:e.target.value})} placeholder={k} />)}
              <select className="select select-bordered" value={editing.mode} onChange={e=>setEditing({...editing,mode:e.target.value})}><option>Online</option><option>Offline</option></select>
              <input className="input input-bordered" type="number" value={editing.monthlyFee} onChange={e=>setEditing({...editing,monthlyFee:e.target.value})} placeholder="Monthly fee" />
              <input className="input input-bordered" type="number" value={editing.daysPerWeek} onChange={e=>setEditing({...editing,daysPerWeek:e.target.value})} placeholder="Days/week" />
              <textarea className="textarea textarea-bordered sm:col-span-2" value={editing.description||''} onChange={e=>setEditing({...editing,description:e.target.value})} placeholder="Description" />
            </div>
            <div className="modal-action">
              <button className="btn btn-ghost" onClick={()=>setEditing(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={saveEdit}>Save</button>
            </div>
          </div>
        </dialog>
      )}
    </DashboardShell>
  );
}
