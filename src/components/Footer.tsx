import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 mt-16">
      <div className="container-max section grid gap-10 md:grid-cols-4">
        <div>
          <h3 className="text-2xl font-extrabold text-white">MentorLagbe</h3>
          <p className="mt-3 text-sm text-slate-400">Smart tuition & mentorship platform connecting verified tutors with ambitious students.</p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="/tuitions" className="hover:text-white">Browse Tuitions</Link></li>
            <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
            <li><Link href="/about" className="hover:text-white">How It Works</Link></li>
            <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>Email: support@mentorlagbe.com</li>
            <li>Phone: +880 1700-000000</li>
            <li>Dhaka, Bangladesh</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Follow Us</h4>
          <div className="flex gap-3">
            <a href="https://x.com" aria-label="X" className="btn btn-sm btn-circle btn-outline border-slate-600 text-white hover:bg-white hover:text-slate-900">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.244 2H21l-6.56 7.5L22.5 22h-6.09l-4.77-6.23L6.18 22H3.42l7.02-8.02L1.5 2h6.24l4.31 5.7L18.244 2Zm-2.13 17.95h1.67L7.08 3.92H5.29l10.824 16.03Z"/></svg>
            </a>
            <a href="https://facebook.com" aria-label="Facebook" className="btn btn-sm btn-circle btn-outline border-slate-600 text-white hover:bg-white hover:text-slate-900">f</a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="btn btn-sm btn-circle btn-outline border-slate-600 text-white hover:bg-white hover:text-slate-900">in</a>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-sm text-slate-500">© {new Date().getFullYear()} MentorLagbe. All rights reserved.</div>
    </footer>
  );
}
