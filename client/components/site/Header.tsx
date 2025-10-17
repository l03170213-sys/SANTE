import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import React from "react";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="w-full sticky top-0 z-50">
      {/* Top thin dark bar */}
      <div className="bg-[#111111] text-white">
        <div className="container mx-auto flex h-8 items-center justify-end gap-4 text-xs">
          <a href="#" className="hover:underline px-2">Vous êtes praticien</a>
          <a href="#" className="hover:underline px-2">Vous êtes patient</a>
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
                placeholder="Rechercher un Généraliste, Psychiatre, Pédiatre..."
                className="w-full rounded-full border border-input bg-white py-3 pl-10 pr-4 text-sm shadow-sm placeholder:text-muted-foreground"
                onFocus={() => navigate('/search')}
                onClick={() => navigate('/search')}
                readOnly
              />
            </div>
          </form>

          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/connexion">Connexion</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
