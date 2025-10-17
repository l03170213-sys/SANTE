import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import React from "react";
import { useLang } from "@/i18n/LanguageProvider";
import useAuth from '@/hooks/useAuth';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang, setLang, t } = useLang();
  const { user, profile } = useAuth();

  // Determine current audience: prefer navigation state/query param, else infer from path
  const stateAudience = (location.state as any)?.audience;
  const queryAudience = new URLSearchParams(location.search).get('audience');
  const pathname = location.pathname || '/';
  const audience = stateAudience || queryAudience || (pathname.startsWith('/praticien') ? 'practitioner' : 'patient');

  const highlightClass = 'px-3 py-1 rounded-md bg-primary text-primary-foreground font-semibold shadow-md ring-1 ring-primary/30';
  const defaultClass = 'hover:underline px-2';

  const rawName = (profile?.full_name || user?.user_metadata?.full_name || user?.email || '').toString();
  const displayName = rawName ? rawName.split(' ').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ') : '';

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Top thin dark bar */}
      <div className="bg-[#111111] text-white">
        <div className="container mx-auto flex h-8 items-center justify-end gap-4 text-xs">
          <NavLink to="/praticien-recrutement" className={() => (audience === 'practitioner' ? highlightClass : defaultClass)}>{t('you_are_practitioner')}</NavLink>
          <NavLink to="/" className={() => (audience === 'patient' ? highlightClass : defaultClass)}>{t('you_are_patient')}</NavLink>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto flex h-20 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div aria-hidden className="h-9 w-9 rounded-full bg-primary ring-1 ring-primary/20" />
            <span className="font-semibold text-lg tracking-tight">Toppatoo</span>
          </Link>

          <form className="mx-auto w-full max-w-2xl">
            <label htmlFor="site-search" className="sr-only">Recherche</label>
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                <Search className="h-4 w-4" />
              </span>
              <input
                id="site-search"
                placeholder={t('searchPlaceholder')}
                className="w-full rounded-full border border-input bg-white py-3 pl-10 pr-4 text-sm shadow-sm placeholder:text-muted-foreground"
                onFocus={() => navigate('/search/audience')}
                onClick={() => navigate('/search/audience')}
                readOnly
              />
            </div>
          </form>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button onClick={() => setLang('fr')} aria-pressed={lang==='fr'} className={`rounded px-2 py-1 text-sm ${lang==='fr' ? 'bg-primary/10 ring-1 ring-primary' : ''}`}>
                FR
              </button>
              <button onClick={() => setLang('wo')} aria-pressed={lang==='wo'} className={`rounded px-2 py-1 text-sm ${lang==='wo' ? 'bg-primary/10 ring-1 ring-primary' : ''}`}>
                WO
              </button>
            </div>

            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/dashboard" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-50">
                  <div className="h-8 w-8 rounded-full bg-gray-100 grid place-items-center text-sm font-semibold">{displayName.charAt(0)?.toUpperCase()}</div>
                  <div className="text-sm">
                    <div className="font-medium">Bonjour, {displayName.split(' ')[0]}</div>
                    <div className="text-xs text-muted-foreground">{profile?.role ?? 'Patient'}</div>
                  </div>
                </Link>
              </div>
            ) : (
              <Button variant="ghost" asChild>
                <button onClick={() => navigate('/connexion', { state: { audience } })} className="text-sm">{t('login')}</button>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
