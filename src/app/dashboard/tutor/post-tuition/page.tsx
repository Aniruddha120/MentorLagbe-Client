'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { api, uploadToImgbb } from '@/lib/api';
import { useAuth } from '@/components/Providers';

const empty = { title:'', subject:'', classLevel:'', mode:'Online', location:'', monthlyFee:'', daysPerWeek:'', description:'', bannerImage:'' };

export default function PostTuition() {
  const { token } = useAuth();
  const [form, setForm] = useState(empty);
  const [file, setFile] = useState<any>(null);
  const [saving, setSaving] = useState<boolean>(false);

  const submit = async (e: any) => {
    e.preventDefault();
    setSaving(true);
    try {
      let bannerImage = form.bannerImage;
      if (file) bannerImage = await uploadToImgbb(file);
      await api('/api/tutor/tuitions', { method: 'POST', token, body: { ...form, bannerImage } });
      toast.success('Tuition submitted for admin approval');
      setForm(empty); setFile(null);
    } catch (e: any) { toast.error(e.message); }
    finally { setSaving(false); }
  };

  const set = (k) => (e: any) => setForm({ ...form, [k]: e.target.value });
  return (
    <DashboardShell allowed={['tutor']}>
      <div className="bg-white border rounded-2xl p-6 max-w-3xl">
        <h1 className="text-2xl font-bold mb-4">Post a Tuition</h1>
        <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4">
          <input className="input input-bordered sm:col-span-2" placeholder="Title" value={form.title} onChange={set('title')} required />
          <input className="input input-bordered" placeholder="Subject" value={form.subject} onChange={set('subject')} required />
          <input className="input input-bordered" placeholder="Class level" value={form.classLevel} onChange={set('classLevel')} required />
          <select className="select select-bordered" value={form.mode} onChange={set('mode')}><option>Online</option><option>Offline</option></select>
          <input className="input input-bordered" placeholder="Location / Platform" value={form.location} onChange={set('location')} required />
          <input className="input input-bordered" type="number" min="0" placeholder="Monthly fee" value={form.monthlyFee} onChange={set('monthlyFee')} required />
          <input className="input input-bordered" type="number" min="1" max="7" placeholder="Days per week" value={form.daysPerWeek} onChange={set('daysPerWeek')} required />
          <div className="sm:col-span-2 space-y-2">
            <input type="file" accept="image/*" className="file-input file-input-bordered w-full" onChange={e=>setFile(e.target.files?.[0]||null)} />
            <input className="input input-bordered w-full" placeholder="Or banner image URL" value={form.bannerImage} onChange={set('bannerImage')} />
          </div>
          <textarea className="textarea textarea-bordered sm:col-span-2" rows="4" placeholder="Description" value={form.description} onChange={set('description')} required />
          <button className="btn btn-primary sm:col-span-2" disabled={saving}>{saving ? 'Submitting...' : 'Submit for Approval'}</button>
        </form>
      </div>
    </DashboardShell>
  );
}
