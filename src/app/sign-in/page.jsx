'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { api } from '@/lib/api';

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return toast.error('Email and password required');
    setLoading(true);
    try {
      const { error } = await authClient.signIn.email({ email: form.email, password: form.password });
      if (error) throw new Error(error.message || 'Sign in failed');
      await api('/api/jwt', { method: 'POST', body: { email: form.email } });
      toast.success('Signed in');
      router.push('/dashboard');
      router.refresh();
    } catch (err) { toast.error(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="container-max section max-w-xl">
      <div className="bg-white border rounded-2xl p-8 shadow-sm">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-slate-600 mt-1">Sign in to manage your tuitions and applications.</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <input className="input input-bordered w-full" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          <input className="input input-bordered w-full" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
          <button disabled={loading} className="btn btn-primary w-full">{loading ? 'Signing in...' : 'Sign In'}</button>
        </form>
        <p className="text-sm mt-4">New here? <Link href="/sign-up" className="link text-teal-700">Create account</Link></p>
      </div>
    </div>
  );
}
