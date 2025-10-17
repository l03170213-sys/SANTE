import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Signup() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [postal, setPostal] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // audience if present
  const audience = new URLSearchParams(location.search).get('audience') || 'patient';

  if (audience === 'practitioner') {
    return (
      <div className="container mx-auto py-12">
        <div className="mx-auto max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Candidature praticien</h2>
          <div className="rounded-md bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm">
            Les praticiens ne peuvent pas créer leur compte directement. Pour postuler, veuillez remplir le formulaire de recrutement.
          </div>
          <div className="mt-4">
            <Link to="/praticien-recrutement" className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Accéder au formulaire de recrutement</Link>
          </div>
        </div>
      </div>
    );
  }

  const next = () => setStep((s) => Math.min(3, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const submitSignup = async () => {
    setLoading(true);
    try {
      const result = await supabase.auth.signUp({ email, password } as any);
      const error = (result as any).error;
      const user = (result as any).data?.user ?? (result as any).user ?? null;

      if (user?.id) {
        await fetch('/api/profiles/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: user.id, email: user.email, full_name: fullName, phone, postal, birthdate, role: 'patient' }),
        });
      } else {
        await fetch('/api/profiles/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, full_name: fullName, phone, postal, birthdate, role: 'patient' }),
        });
      }

      setLoading(false);

      if (error) {
        alert(error.message);
      } else {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setLoading(false);
      alert(err?.message || "Erreur lors de l'inscription");
    }
  };

  const onSubmitStep = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (step < 3) return next();
    if (!accepted) return alert('Veuillez accepter les conditions');
    submitSignup();
  };

  return (
    <div className="container mx-auto py-12">
      <div className="mx-auto max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Créer un compte {audience === 'practitioner' ? '(Praticien)' : ''}</h2>

        <form onSubmit={onSubmitStep} className="space-y-4">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-md border px-3 py-2" required />
              </div>
              <div>
                <label className="text-sm font-medium">Mot de passe</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe (min 6)" className="w-full rounded-md border px-3 py-2" minLength={6} required />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={next} className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Suivant</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Prénom</label>
                  <input value={firstName} onChange={(e)=>setFirstName(e.target.value)} placeholder="Prénom" className="w-full rounded-md border px-3 py-2" required />
                </div>
                <div>
                  <label className="text-sm font-medium">Nom</label>
                  <input value={lastName} onChange={(e)=>setLastName(e.target.value)} placeholder="Nom" className="w-full rounded-md border px-3 py-2" required />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Téléphone</label>
                <input value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Numéro" className="w-full rounded-md border px-3 py-2" />
              </div>
              <div>
                <label className="text-sm font-medium">Code postal / Ville</label>
                <input value={postal} onChange={(e)=>setPostal(e.target.value)} placeholder="Ville" className="w-full rounded-md border px-3 py-2" />
              </div>
              <div>
                <label className="text-sm font-medium">Date de naissance</label>
                <input type="date" value={birthdate} onChange={(e)=>setBirthdate(e.target.value)} className="w-full rounded-md border px-3 py-2" />
              </div>

              <div className="flex items-center justify-between">
                <button type="button" onClick={prev} className="rounded-md border px-4 py-2 text-sm">Retour</button>
                <button type="button" onClick={next} className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Suivant</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Conditions</label>
                <div className="mt-2 text-sm text-muted-foreground">En créant un compte, vous acceptez nos conditions et notre politique de confidentialité.</div>
              </div>

              <div className="flex items-center gap-2">
                <input id="accepted" type="checkbox" checked={accepted} onChange={(e)=>setAccepted(e.target.checked)} />
                <label htmlFor="accepted" className="text-sm">J'accepte les conditions</label>
              </div>

              <div className="flex items-center justify-between">
                <button type="button" onClick={prev} className="rounded-md border px-4 py-2 text-sm">Retour</button>
                <button type="submit" disabled={loading} className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">{loading ? 'Envoi...' : "Créer mon compte"}</button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
