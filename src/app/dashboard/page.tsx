'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/Providers';

export default function DashboardIndex() {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (loading) return;
    if (!user) return router.replace('/sign-in');
    router.replace(`/dashboard/${user.role}`);
  }, [user, loading, router]);
  return <div className="container-max section"><div className="skeleton h-40 w-full" /></div>;
}
