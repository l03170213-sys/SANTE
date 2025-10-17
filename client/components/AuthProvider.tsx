import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Profile = {
  id: string;
  email?: string;
  role?: string;
  full_name?: string;
};

type AuthContextValue = {
  user: any | null;
  profile: Profile | null;
  loading: boolean;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = async (uid?: string) => {
    if (!uid) {
      setProfile(null);
      return;
    }
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", uid)
        .single();
      if (!error && data) setProfile(data as Profile);
      else setProfile(null);
    } catch (e) {
      setProfile(null);
    }
  };

  const refresh = async () => {
    setLoading(true);
    try {
      const session = await supabase.auth.getSession();
      const u = session.data?.session?.user ?? null;
      setUser(u);
      await loadProfile(u?.id);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await refresh();
    })();

    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      const u = session?.user ?? null;
      setUser(u);
      loadProfile(u?.id);
    });

    const subscription = (data as any)?.subscription;
    return () => {
      subscription?.unsubscribe?.();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, loading, refresh }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    // Defensive fallback for HMR or unexpected render order: return a safe default
    return {
      user: null,
      profile: null,
      loading: true,
      refresh: async () => {},
    } as AuthContextValue;
  }
  return ctx;
};

export default AuthProvider;
