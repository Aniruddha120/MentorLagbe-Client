import Link from 'next/link';
import { API_URL } from '@/lib/api';

async function getFeatured() {
  try {
    const res = await fetch(`${API_URL}/api/tuitions?limit=6&sort=latest`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.items || [];
  } catch { return []; }
}

function TuitionCard({ t }) {
  return (
    <div className="card bg-white shadow-sm border card-eq">
      <figure className="h-44"><img src={t.bannerImage || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop'} alt={t.title} className="h-full w-full object-cover" /></figure>
      <div className="card-body">
        <div className="flex gap-2 flex-wrap">
          <span className="badge badge-outline">{t.subject}</span>
          <span className="badge badge-ghost">{t.mode}</span>
        </div>
        <h3 className="card-title text-lg">{t.title}</h3>
        <p className="text-sm text-slate-600">{t.classLevel} • {t.daysPerWeek} days/week</p>
        <p className="text-sm"><span className="font-semibold text-teal-700">৳{t.monthlyFee}</span>/month</p>
        <p className="text-sm text-slate-500">Tutor: {t.tutorName}</p>
        <div className="card-actions mt-auto pt-2">
          <Link href={`/tuitions/${t._id}`} className="btn btn-primary btn-sm w-full">View Details</Link>
        </div>
      </div>
    </div>
  );
}

export default async function Home() {
  const featured = await getFeatured();
  return (
    <div>
      <section className="bg-gradient-to-br from-teal-50 via-white to-amber-50 border-b">
        <div className="container-max section grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="badge badge-primary badge-outline mb-4">EdTech • Tuition • Mentorship</div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-slate-900">Find Your Ideal Tutor or <span className="text-teal-700">Mentorship Batch</span> Today</h1>
            <p className="mt-5 text-slate-600 max-w-xl">MentorLagbe connects students with verified tutors for online and offline tuition. Post batches, apply with confidence, and grow with the right mentor.</p>
            <div className="mt-7 flex gap-3 flex-wrap">
              <Link href="/tuitions" className="btn btn-primary">Browse Tuitions</Link>
              <Link href="/pricing" className="btn btn-outline">View Pro Plans</Link>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md text-center">
              {[['500+','Tutors'],['2k+','Students'],['98%','Satisfaction']].map(([v,l]) => (
                <div key={l} className="bg-white rounded-xl border p-3"><div className="text-xl font-bold text-teal-700">{v}</div><div className="text-xs text-slate-500">{l}</div></div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop" alt="Mentorship" className="rounded-3xl shadow-xl w-full object-cover h-[420px]" />
            <div className="absolute -bottom-4 -left-4 bg-white border rounded-2xl shadow p-4">
              <div className="font-semibold">Verified Tutors</div>
              <div className="text-sm text-slate-500">Admin-moderated listings</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section container-max">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div><h2 className="text-3xl font-bold">Featured Tuitions</h2><p className="text-slate-600 mt-1">Latest approved batches from trusted tutors.</p></div>
          <Link href="/tuitions" className="btn btn-ghost">See all</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.length ? featured.map(t => <TuitionCard key={t._id} t={t} />) : <div className="col-span-full text-center text-slate-500">No tuitions yet. Seed the database to see listings.</div>}
        </div>
      </section>

      <section className="section bg-white border-y">
        <div className="container-max">
          <h2 className="text-3xl font-bold text-center">How MentorLagbe Works</h2>
          <p className="text-slate-600 text-center mt-2 mb-10">A simple flow for students, tutors, and admins.</p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              ['1','Create Account','Sign up as a student or tutor with a secure profile.'],
              ['2','Post or Browse','Tutors post batches; students search approved listings.'],
              ['3','Apply & Manage','Students apply, tutors accept or reject applicants.'],
              ['4','Upgrade with Stripe','Unlock Pro features with secure Stripe checkout.'],
            ].map(([n,t,d]) => (
              <div key={n} className="p-6 rounded-2xl border bg-slate-50">
                <div className="w-10 h-10 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold mb-4">{n}</div>
                <h3 className="font-semibold text-lg">{t}</h3><p className="text-sm text-slate-600 mt-2">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section container-max">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold">Top Subjects & Trusted Outcomes</h2>
            <p className="text-slate-600 mt-2">Popular categories students are learning right now.</p>
            <div className="flex flex-wrap gap-3 mt-6">
              {['Math','Physics','Programming','IELTS','Chemistry','English','ICT','Science'].map(s => (
                <span key={s} className="px-4 py-2 rounded-full bg-teal-50 text-teal-800 border border-teal-100 text-sm font-medium">{s}</span>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[['1200+','Applications'],['350+','Active Batches'],['4.8/5','Avg Rating']].map(([v,l]) => (
                <div key={l} className="bg-white border rounded-xl p-4 text-center"><div className="text-xl font-bold text-teal-700">{v}</div><div className="text-xs text-slate-500">{l}</div></div>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            {[
              ['"Found the perfect HSC physics tutor in two days."', 'Mahi, Student'],
              ['"Posting batches and managing applicants is incredibly simple."', 'Rakib, Tutor'],
            ].map(([q,a]) => (
              <div key={a} className="bg-white border rounded-2xl p-6 shadow-sm">
                <p className="text-slate-700">{q}</p><p className="mt-3 text-sm font-semibold text-teal-700">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-slate-900 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold">Ready to upgrade your learning journey?</h2>
          <p className="mt-3 text-slate-300">Unlock Pro features for tutors and students with secure Stripe payments.</p>
          <Link href="/pricing" className="btn btn-primary mt-6">See Pricing</Link>
        </div>
      </section>
    </div>
  );
}
