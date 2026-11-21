'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { api } from '@/lib/api';

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return toast.error('All fields are required');
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return toast.error('Invalid email');
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    try {
      const { error } = await authClient.signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });
      if (error) throw new Error(error.message || 'Sign up failed');
      await api('/api/jwt', { method: 'POST', body: { email: form.email } });
      toast.success('Account created');
      router.push('/dashboard');
      router.refresh();
    } catch (err) { toast.error(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="container-max section max-w-xl">
      <div className="bg-white border rounded-2xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold">Create your account</h1>
        <p className="text-slate-600 mt-1">Join MentorLagbe as a student or tutor.</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <input className="input input-bordered w-full" placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          <input className="input input-bordered w-full" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          <input className="input input-bordered w-full" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
          <select className="select select-bordered w-full" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
          </select>
          <button disabled={loading} className="btn btn-primary w-full">{loading ? 'Creating...' : 'Sign Up'}</button>
        </form>
        <p className="text-sm mt-4">Already have an account? <Link href="/sign-in" className="link text-teal-700">Sign in</Link></p>
      </div>
    </div>
  );
}
