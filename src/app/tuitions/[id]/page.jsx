'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { api } from '@/lib/api';
import { useAuth } from '@/components/Providers';

export default function TuitionDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { user, token } = useAuth();
  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [form, setForm] = useState({ studentPhone: '', preferredSchedule: '', studentNote: '' });

  useEffect(() => {
    (async () => {
      try { setTuition(await api(`/api/tuitions/${id}`)); }
      catch (e) { toast.error(e.message); }
      finally { setLoading(false); }
    })();
  }, [id]);

  const canApply = user?.role === 'student';
  const submit = async (e) => {
    e.preventDefault();
    if (!user) return router.push('/sign-in');
    if (!canApply) return toast.error('Only students can apply');
    setApplying(true);
    try {
      await api('/api/applications', { method: 'POST', token, body: { tuitionId: id, ...form } });
      toast.success('Application submitted');
      setForm({ studentPhone: '', preferredSchedule: '', studentNote: '' });
    } catch (e) { toast.error(e.message); }
    finally { setApplying(false); }
  };

  if (loading) return <div className="container-max section"><div className="skeleton h-96 w-full" /></div>;
  if (!tuition) return <div className="container-max section">Tuition not found.</div>;

  return (
    <div className="container-max section grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <img src={tuition.bannerImage || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop'} alt={tuition.title} className="w-full h-72 object-cover rounded-2xl border" />
        <div className="bg-white border rounded-2xl p-6">
          <div className="flex gap-2 flex-wrap mb-3"><span className="badge badge-outline">{tuition.subject}</span><span className="badge">{tuition.mode}</span><span className="badge badge-ghost">{tuition.classLevel}</span></div>
          <h1 className="text-3xl font-bold">{tuition.title}</h1>
          <p className="text-slate-600 mt-3 whitespace-pre-line">{tuition.description}</p>
          <div className="grid sm:grid-cols-2 gap-3 mt-6 text-sm">
            <div className="p-3 bg-slate-50 rounded-lg"><span className="text-slate-500">Location/Mode:</span> <b>{tuition.location}</b></div>
            <div className="p-3 bg-slate-50 rounded-lg"><span className="text-slate-500">Schedule:</span> <b>{tuition.daysPerWeek} days/week</b></div>
            <div className="p-3 bg-slate-50 rounded-lg"><span className="text-slate-500">Monthly Fee:</span> <b>৳{tuition.monthlyFee}</b></div>
            <div className="p-3 bg-slate-50 rounded-lg"><span className="text-slate-500">Tutor:</span> <b>{tuition.tutorName}</b></div>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="bg-white border rounded-2xl p-6">
          <h2 className="font-semibold text-lg">Tutor Profile</h2>
          <div className="flex items-center gap-3 mt-4">
            <div className="avatar"><div className="w-12 rounded-full"><img src={tuition.tutor?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(tuition.tutorName||'Tutor')}`} alt="tutor" /></div></div>
            <div><div className="font-medium">{tuition.tutor?.name || tuition.tutorName}</div><div className="text-sm text-slate-500">{tuition.tutorEmail}</div></div>
          </div>
          {tuition.tutor?.bio && <p className="text-sm text-slate-600 mt-3">{tuition.tutor.bio}</p>}
        </div>
        <div className="bg-white border rounded-2xl p-6">
          <h2 className="font-semibold text-lg mb-3">Apply for Tuition</h2>
          {!user && <p className="text-sm text-slate-600 mb-3">Sign in as a student to apply.</p>}
          {user && !canApply && <div className="alert alert-warning text-sm mb-3">Only students can apply for tuitions.</div>}
          <form onSubmit={submit} className="space-y-3">
            <input className="input input-bordered w-full" placeholder="Phone" value={form.studentPhone} onChange={e=>setForm({...form,studentPhone:e.target.value})} required disabled={!canApply} />
            <input className="input input-bordered w-full" placeholder="Preferred schedule" value={form.preferredSchedule} onChange={e=>setForm({...form,preferredSchedule:e.target.value})} required disabled={!canApply} />
            <textarea className="textarea textarea-bordered w-full" placeholder="Learning note" value={form.studentNote} onChange={e=>setForm({...form,studentNote:e.target.value})} disabled={!canApply} />
            <button disabled={!canApply || applying} className="btn btn-primary w-full">{applying ? 'Submitting...' : 'Apply Now'}</button>
          </form>
        </div>
      </div>
    </div>
  );
}
