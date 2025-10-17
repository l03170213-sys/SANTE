import React from 'react';
import { useAuthContext } from '@/components/AuthProvider';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user, profile, loading } = useAuthContext();

  if (loading) return <div className="container mx-auto py-12">Chargement...</div>;

  const role = profile?.role || 'patient';

  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="col-span-2 space-y-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h1 className="text-2xl font-semibold">Bienvenue, {profile?.full_name ?? user?.email ?? 'Utilisateur'}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{role === 'practitioner' ? "Voici votre tableau de bord praticien" : "Voici votre tableau de bord patient"}</p>

            {/* Quick actions */}
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
              <Link to="/booking" className="rounded-lg border p-3 text-center hover:shadow">
                <div className="text-sm font-medium">Réserver</div>
                <div className="text-xs text-muted-foreground">Prendre un RDV</div>
              </Link>
              <Link to="/praticien" className="rounded-lg border p-3 text-center hover:shadow">
                <div className="text-sm font-medium">Mes praticiens</div>
                <div className="text-xs text-muted-foreground">Voir la liste</div>
              </Link>
              <Link to="/" className="rounded-lg border p-3 text-center hover:shadow">
                <div className="text-sm font-medium">Mes documents</div>
                <div className="text-xs text-muted-foreground">Historique</div>
              </Link>
              <Link to="/" className="rounded-lg border p-3 text-center hover:shadow">
                <div className="text-sm font-medium">Mes messages</div>
                <div className="text-xs text-muted-foreground">Messagerie</div>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-medium">Prochains rendez‑vous</h2>
            <div className="mt-4 text-sm text-muted-foreground">Aucun rendez‑vous programmé pour l'instant.</div>
            <ul className="mt-4 space-y-3">
              {/* Example placeholder items (replace with real data from DB) */}
              <li className="flex items-start justify-between rounded-md bg-gray-50 p-3">
                <div>
                  <div className="font-medium">Aucun rendez‑vous</div>
                  <div className="text-xs text-muted-foreground">Tu n'as pas de rendez‑vous à venir.</div>
                </div>
                <div className="text-xs text-muted-foreground">—</div>
              </li>
            </ul>
          </div>

          {role === 'practitioner' && (
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-lg font-medium">Demandes en attente</h2>
              <div className="mt-4 text-sm text-muted-foreground">Utilise la page <Link to="/admin" className="text-primary underline">Admin</Link> pour approuver les demandes.</div>
            </div>
          )}
        </div>

        <aside className="col-span-1">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-gray-100 grid place-items-center text-xl font-semibold">{(profile?.full_name ?? user?.email ?? 'U').toString().charAt(0).toUpperCase()}</div>
              <div>
                <div className="font-medium">{profile?.full_name ?? user?.email}</div>
                <div className="text-sm text-muted-foreground">{profile?.role ?? 'patient'}</div>
              </div>
            </div>

            <div className="mt-6 space-y-2 text-sm">
              <div className="flex items-center justify-between"><div>Profil</div><Link to="/profil" className="text-primary underline">Modifier</Link></div>
              <div className="flex items-center justify-between"><div>Notifications</div><div className="text-muted-foreground">3</div></div>
              <div className="flex items-center justify-between"><div>Sécurité</div><Link to="/mot-de-passe-oublie" className="text-primary underline">Réinitialiser</Link></div>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border bg-white p-4 text-sm shadow-sm">
            <div className="font-medium">Support</div>
            <div className="mt-2 text-muted-foreground">Contacte le support pour toute question.</div>
            <div className="mt-4">
              <a href="mailto:contact@example.com" className="text-primary underline">Envoyer un email</a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
