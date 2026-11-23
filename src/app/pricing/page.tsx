'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuth } from '@/components/Providers';

export default function PricingPage() {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState<string>('');
  const router = useRouter();

  const subscribe = async (planFor) => {
    if (!user) return router.push('/sign-in');
    if (user.role === 'admin') return toast.error('Admin does not need subscription');
    if (planFor !== user.role) return toast.error(`This plan is for ${planFor}s`);
    if (user.plan === 'pro') return toast.success('You are already on Pro');
    setLoading(planFor);
    try {
      const { url } = await api('/api/create-checkout-session', { method: 'POST', token, body: {} });
      window.location.href = url;
    } catch (e: any) { toast.error(e.message); }
    finally { setLoading(''); }
  };

  const Card = ({ role, price, features }) => (
    <div className="bg-white border rounded-2xl p-7 shadow-sm flex flex-col">
      <div className="badge badge-outline capitalize mb-3">{role} plan</div>
      <h2 className="text-2xl font-bold">Pro {role[0].toUpperCase() + role.slice(1)}</h2>
      <div className="mt-3 text-4xl font-extrabold text-teal-700">${price}<span className="text-base font-medium text-slate-500">/one-time</span></div>
      <ul className="mt-6 space-y-2 text-sm text-slate-700 flex-1">{features.map((f: any) => <li key={f}>✓ {f}</li>)}</ul>
      <button onClick={() => subscribe(role)} disabled={loading === role} className="btn btn-primary mt-7">
        {loading === role ? 'Redirecting...' : 'Subscribe with Stripe'}
      </button>
    </div>
  );

  return (
    <div className="container-max section">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold">Simple Pricing</h1>
        <p className="mt-3 text-slate-600">Start free. Upgrade when you need more power. Payments are secured by Stripe.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-50 border rounded-2xl p-7">
          <div className="badge mb-3">Free</div>
          <h2 className="text-2xl font-bold">Free Plan</h2>
          <div className="mt-3 text-4xl font-extrabold">$0</div>
          <ul className="mt-6 space-y-2 text-sm text-slate-700">
            <li>✓ Browse approved tuitions</li>
            <li>✓ Student: apply to tuitions</li>
            <li>✓ Tutor: up to 2 tuition posts</li>
            <li>✓ Basic dashboard</li>
          </ul>
        </div>
        <Card role="tutor" price={15} features={['Unlimited tuition posts', 'Manage unlimited applicants', 'Pro tutor profile', 'Priority trust signal']} />
        <Card role="student" price={10} features={['Unlimited bookmarks', 'Priority booking confidence', 'Track all applications', 'Pro student profile']} />
      </div>
    </div>
  );
}
