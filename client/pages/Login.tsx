import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const stateAudience = (location.state as any)?.audience;
  const queryAudience = new URLSearchParams(location.search).get('audience');
  const audience = stateAudience || queryAudience || 'patient';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      alert(error.message);
    } else {
      // go to unified dashboard which renders role-specific view
      navigate('/dashboard');
    }
  };

  return (
    <div className="container mx-auto py-12">
      <div className="mx-auto max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Se connecter {audience === 'practitioner' ? "(Praticien)" : ''}</h2>
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
            <button type="submit" disabled={loading} className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">{loading? 'Chargement...' : 'Se connecter'}</button>
          </div>

          <div className="flex items-center justify-between">
            <Link to="/mot-de-passe-oublie" className="text-sm text-primary underline">Mot de passe oublié</Link>
          </div>
        </form>
        <div className="mt-4 flex items-center justify-between">
          <div>
            Pas encore de compte ? <Link to={`/inscription${audience ? `?audience=${audience}` : ''}`} className="text-primary underline font-medium">Créer un compte</Link>
          </div>
          <div>
            <Link to="/" className="text-sm text-muted-foreground">Retour à l'accueil</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
