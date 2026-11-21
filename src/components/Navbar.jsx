'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { useAuth } from './Providers';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/tuitions', label: 'Browse Tuitions' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'How It Works' },
];

export default function Navbar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const signOut = async () => {
    await authClient.signOut();
    localStorage.removeItem('ml_token');
    router.push('/');
    router.refresh();
  };
  return (
    <div className="navbar bg-white/90 backdrop-blur border-b sticky top-0 z-50">
      <div className="container-max flex w-full">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">☰</div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
              {nav.map(n => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}
            </ul>
          </div>
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-teal-700">MentorLagbe</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            {nav.map(n => <li key={n.href}><Link className={pathname === n.href ? 'active font-semibold' : ''} href={n.href}>{n.label}</Link></li>)}
          </ul>
        </div>
        <div className="navbar-end gap-2">
          {!user ? (
            <>
              <Link href="/sign-in" className="btn btn-ghost btn-sm">Sign In</Link>
              <Link href="/sign-up" className="btn btn-primary btn-sm">Sign Up</Link>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost gap-2">
                <div className="avatar">
                  <div className="w-9 rounded-full ring ring-teal-200">
                    <img src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name||'User')}`} alt="avatar" />
                  </div>
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-sm font-semibold leading-4">{user.name || 'User'}</div>
                  <div className="badge badge-xs badge-outline capitalize">{user.role}</div>
                </div>
              </div>
              <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><Link href="/dashboard/profile">Update Profile</Link></li>
                <li><button onClick={signOut}>Sign Out</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
