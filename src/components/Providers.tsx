'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { api } from '@/lib/api';
import { authClient } from '@/lib/auth-client';

type AuthCtxType = {
  session: any;
  user: any;
  token: string | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
};

const AuthCtx = createContext<AuthCtxType | null>(null);
export const useAuth = () => useContext(AuthCtx) as AuthCtxType;

export default function Providers({ children }: { children: ReactNode }) {
  const { data: session, isPending } = authClient.useSession();
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function sync() {
      if (isPending) return;
      if (!session?.user?.email) {
        if (mounted) { setUser(null); setToken(null); setLoadingProfile(false); }
        return;
      }
      try {
        const jwtRes: any = await api('/api/jwt', { method: 'POST', body: { email: session.user.email } });
        if (!mounted) return;
        setToken(jwtRes.token);
        localStorage.setItem('ml_token', jwtRes.token);
        const me = await api('/api/users/me', { token: jwtRes.token });
        if (mounted) setUser(me);
      } catch {
        if (mounted) setUser(null);
      } finally {
        if (mounted) setLoadingProfile(false);
      }
    }
    sync();
    return () => { mounted = false; };
  }, [session?.user?.email, isPending]);

  const refreshUser = async () => {
    const t = token || localStorage.getItem('ml_token');
    if (!t) return;
    const me = await api('/api/users/me', { token: t });
    setUser(me);
  };

  return (
    <AuthCtx.Provider value={{ session, user, token, loading: isPending || loadingProfile, refreshUser }}>
      {children}
      <Toaster position="top-right" />
    </AuthCtx.Provider>
  );
}
