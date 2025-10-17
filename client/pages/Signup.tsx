import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await supabase.auth.signUp({ email, password } as any);
      const error = (result as any).error;
      const user = (result as any).data?.user ?? (result as any).user ?? null;

      // attempt to create a profile server-side using service role
      if (user?.id) {
        await fetch('/api/profiles/create', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: user.id, email: user.email }) });
      } else {
        // fallback: create profile with email only (server can upsert by email if desired)
        await fetch('/api/profiles/create', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      }

      setLoading(false);

      if (error) {
        alert(error.message);
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setLoading(false);
      alert(err?.message || 'Erreur lors de l\'inscription');
    }
  };

  return (
    <div className="container mx-auto py-12">
      <div className="mx-auto max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Créer un compte</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="sr-only">Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="w-full rounded-md border px-3 py-2" />
          </div>
          <div>
            <label className="sr-only">Mot de passe</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Mot de passe" className="w-full rounded-md border px-3 py-2" />
          </div>
          <div>
            <button type="submit" disabled={loading} className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">{loading ? 'Chargement...' : "S'inscrire"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
