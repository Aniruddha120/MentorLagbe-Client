'use client';
import { useEffect, useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { api } from '@/lib/api';
import { useAuth } from '@/components/Providers';

export default function AdminTransactions() {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  useEffect(() => { if (token) api('/api/admin/transactions', { token }).then(setItems).catch(()=>{}); }, [token]);
  return (
    <DashboardShell allowed={['admin']}>
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <div className="bg-white border rounded-2xl overflow-x-auto">
        <table className="table">
          <thead><tr><th>User</th><th>Role</th><th>Plan</th><th>Amount</th><th>Transaction</th><th>Date</th></tr></thead>
          <tbody>
            {items.map(p => (
              <tr key={p._id}>
                <td><div>{p.userName || '—'}</div><div className="text-xs text-slate-500">{p.userEmail}</div></td>
                <td className="capitalize">{p.userRole}</td>
                <td>{p.planName}</td>
                <td>${p.amount} {String(p.currency||'').toUpperCase()}</td>
                <td className="text-xs">{p.transactionId}</td>
                <td>{p.paidAt ? new Date(p.paidAt).toLocaleString() : '—'}</td>
              </tr>
            ))}
            {!items.length && <tr><td colSpan="6" className="text-center text-slate-500 py-8">No transactions yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}
