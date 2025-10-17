import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

export default function ChangePasswordPage() {
  const { user } = useAuth();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (password !== confirm) return alert('Les mots de passe ne correspondent pas');
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }
    // call server to unset must_change_password
    await fetch('/.netlify/functions/unset-must-change', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user?.id }),
    });
    setLoading(false);
    alert('Mot de passe changé avec succès');
    navigate('/dashboard');
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Changer le mot de passe</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Nouveau mot de passe</label>
        <input type="password" className="w-full p-2 border mb-3" value={password} onChange={e => setPassword(e.target.value)} required />
        <label className="block mb-2">Confirmer</label>
        <input type="password" className="w-full p-2 border mb-3" value={confirm} onChange={e => setConfirm(e.target.value)} required />
        <button className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>{loading ? 'En cours...' : 'Changer le mot de passe'}</button>
      </form>
    </div>
  );
}
