'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { useAuth } from '@/components/Providers';
import { api, uploadToImgbb } from '@/lib/api';

export default function ProfilePage() {
  const { user, token, refreshUser } = useAuth();
  const [form, setForm] = useState({ name: '', phone: '', bio: '', image: '' });
  const [saving, setSaving] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (user) setForm({ name: user.name || '', phone: user.phone || '', bio: user.bio || '', image: user.image || '' });
  }, [user]);

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let image = form.image;
      if (file) image = await uploadToImgbb(file);
      await api('/api/users/me', { method: 'PATCH', token, body: { ...form, image } });
      await refreshUser();
      toast.success('Profile updated');
      setFile(null);
    } catch (e) { toast.error(e.message); }
    finally { setSaving(false); }
  };

  return (
    <DashboardShell>
      <div className="bg-white border rounded-2xl p-6 max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
        <form onSubmit={save} className="space-y-4">
          <input className="input input-bordered w-full" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          <input className="input input-bordered w-full" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
          <textarea className="textarea textarea-bordered w-full" placeholder="Bio" value={form.bio} onChange={e=>setForm({...form,bio:e.target.value})} />
          <div className="space-y-2">
            <input type="file" accept="image/*" className="file-input file-input-bordered w-full" onChange={e=>setFile(e.target.files?.[0] || null)} />
            <input className="input input-bordered w-full" placeholder="Or paste image URL" value={form.image} onChange={e=>setForm({...form,image:e.target.value})} />
          </div>
          {form.image && <img src={form.image} alt="preview" className="w-24 h-24 rounded-full object-cover border" />}
          <button className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Profile'}</button>
        </form>
      </div>
    </DashboardShell>
  );
}
