import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type RequestRow = {
  id: number;
  name: string;
  email: string;
  postal?: string;
  phone?: string;
  specialty?: string;
  practice_type?: string;
  created_at?: string;
  processed?: boolean;
};

export default function Admin() {
  const [requests, setRequests] = useState<RequestRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(()=>{
    (async ()=>{
      const session = await supabase.auth.getSession();
      const token = session.data?.session?.access_token;
      if (!token) return;
      // try to register self as admin if not already
      try {
        await fetch('/api/admin/register-self', { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
      } catch (e) {}

      // check admins table via service (we'll fetch via admin router)
      const res = await fetch('/api/admin/practitioner_requests');
      if (res.ok) {
        setIsAdmin(true);
        const body = await res.json();
        setRequests(body.data || []);
      } else {
        setIsAdmin(false);
      }
    })();
  },[]);

  const approve = async (id:number) => {
    const res = await fetch('/api/admin/approve', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ id }) });
    if (res.ok) {
      alert('Praticien approuvé — un mot de passe temporaire a été généré.');
      setRequests((r)=>r.filter(x=>x.id!==id));
    } else {
      const body = await res.json();
      alert('Erreur: ' + (body?.error || 'unknown'));
    }
  };

  if (!isAdmin) return <div className="container mx-auto py-12">Tu n'es pas autorisé à voir cette page.</div>;

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-2xl font-semibold mb-6">Demandes praticiens</h2>
      <div className="space-y-4">
        {requests.map(r => (
          <div key={r.id} className="rounded-md border p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{r.name} — {r.email}</div>
              <div className="text-sm text-muted-foreground">{r.specialty} • {r.postal}</div>
            </div>
            <div>
              <button onClick={()=>approve(r.id)} className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground">Approuver</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
