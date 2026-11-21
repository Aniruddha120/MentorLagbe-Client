'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { api } from '@/lib/api';
import { useAuth } from '@/components/Providers';

export default function AdminUsers() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const load = async () => { if (token) setUsers(await api('/api/admin/users', { token }).catch(()=>[])); };
  useEffect(() => { load(); }, [token]); 
  const changeRole = async (id, role) => {
    try { await api(`/api/admin/users/${id}/role`, { method:'PATCH', token, body:{ role } }); toast.success('Role updated'); load(); }
    catch(e){ toast.error(e.message); }
  };
  return (
    <DashboardShell allowed={['admin']}>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="bg-white border rounded-2xl overflow-x-auto">
        <table className="table">
          <thead><tr><th>User</th><th>Email</th><th>Plan</th><th>Role</th><th>Change Role</th></tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td className="flex items-center gap-2"><div className="avatar"><div className="w-8 rounded-full"><img src={u.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name||'U')}`} alt="" /></div></div>{u.name || '—'}</td>
                <td>{u.email}</td>
                <td><span className="badge badge-outline capitalize">{u.plan || 'free'}</span></td>
                <td><span className="badge capitalize">{u.role}</span></td>
                <td>
                  <select className="select select-bordered select-sm" value={u.role} onChange={e=>changeRole(u._id, e.target.value)}>
                    <option value="student">student</option><option value="tutor">tutor</option><option value="admin">admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  );
}
