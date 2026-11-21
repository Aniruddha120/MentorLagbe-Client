'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

export default function BrowseTuitions() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', subject: '', classLevel: '', mode: '', sort: 'latest' });

  const load = async (p = page, f = filters) => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({ page: String(p), limit: '9', ...Object.fromEntries(Object.entries(f).filter(([,v])=>v)) }).toString();
      const data = await api(`/api/tuitions?${qs}`);
      setItems(data.items || []); setTotal(data.total || 0); setPage(data.page || 1);
    } catch { setItems([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(1, filters); }, []); 

  const pages = Math.max(1, Math.ceil(total / 9));
  const apply = (e) => { e.preventDefault(); load(1, filters); };

  return (
    <div className="container-max section">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold">Browse Tuitions</h1>
        <p className="text-slate-600 mt-1">Find approved tuition batches by subject, class, and mode.</p>
      </div>
      <form onSubmit={apply} className="bg-white border rounded-2xl p-4 grid md:grid-cols-6 gap-3 mb-8">
        <input className="input input-bordered md:col-span-2" placeholder="Search title or subject" value={filters.search} onChange={e=>setFilters({...filters,search:e.target.value})} />
        <input className="input input-bordered" placeholder="Subject" value={filters.subject} onChange={e=>setFilters({...filters,subject:e.target.value})} />
        <input className="input input-bordered" placeholder="Class level" value={filters.classLevel} onChange={e=>setFilters({...filters,classLevel:e.target.value})} />
        <select className="select select-bordered" value={filters.mode} onChange={e=>setFilters({...filters,mode:e.target.value})}>
          <option value="">All modes</option><option>Online</option><option>Offline</option>
        </select>
        <button className="btn btn-primary">Search</button>
      </form>

      {loading ? <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{Array.from({length:6}).map((_,i)=><div key={i} className="skeleton h-80" />)}</div> : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(t => (
              <div key={t._id} className="card bg-white border shadow-sm card-eq">
                <figure className="h-44"><img src={t.bannerImage || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop'} alt={t.title} className="h-full w-full object-cover" /></figure>
                <div className="card-body">
                  <div className="flex gap-2 flex-wrap"><span className="badge badge-outline">{t.subject}</span><span className="badge badge-ghost">{t.mode}</span></div>
                  <h2 className="card-title text-lg">{t.title}</h2>
                  <p className="text-sm text-slate-600">{t.classLevel} • {t.location}</p>
                  <p className="font-semibold text-teal-700">৳{t.monthlyFee}/month</p>
                  <p className="text-sm text-slate-500">Tutor: {t.tutorName}</p>
                  <div className="card-actions mt-auto pt-2"><Link href={`/tuitions/${t._id}`} className="btn btn-primary btn-sm w-full">View Details</Link></div>
                </div>
              </div>
            ))}
          </div>
          {!items.length && <div className="text-center text-slate-500 py-10">No tuitions found.</div>}
          <div className="flex justify-center items-center gap-2 mt-10">
            <button className="btn btn-sm" disabled={page<=1} onClick={()=>load(page-1)}>Prev</button>
            <span className="text-sm">Page {page} of {pages}</span>
            <button className="btn btn-sm" disabled={page>=pages} onClick={()=>load(page+1)}>Next</button>
          </div>
        </>
      )}
    </div>
  );
}
