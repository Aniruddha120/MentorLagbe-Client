'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useAuth } from '@/components/Providers';

export default function PaymentSuccess() {
  const sp = useSearchParams();
  const router = useRouter();
  const { token, refreshUser } = useAuth();
  const [status, setStatus] = useState('Confirming payment...');

  useEffect(() => {
    const sessionId = sp.get('session_id');
    if (!sessionId || !token) return;
    (async () => {
      try {
        await api('/api/payments/confirm', { method: 'POST', token, body: { sessionId } });
        await refreshUser();
        setStatus('Payment successful! Your Pro plan is active.');
      } catch (e) { setStatus(e.message || 'Payment confirmation failed.'); }
    })();
  }, [sp, token]); 

  return (
    <div className="container-max section text-center max-w-xl">
      <div className="bg-white border rounded-2xl p-10">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-3xl font-bold">Payment Status</h1>
        <p className="mt-3 text-slate-600">{status}</p>
        <div className="mt-6 flex gap-3 justify-center">
          <Link href="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
          <button onClick={() => router.push('/pricing')} className="btn btn-ghost">Pricing</button>
        </div>
      </div>
    </div>
  );
}
