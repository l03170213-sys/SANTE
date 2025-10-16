import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div aria-hidden className="h-7 w-7 rounded-md bg-primary" />
          <span className="font-semibold text-lg tracking-tight">Qare</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <NavLink to="/consulter" className={({isActive})=>isActive?"text-foreground font-medium":"hover:text-foreground"}>Consulter un médecin</NavLink>
          <NavLink to="/specialites" className={({isActive})=>isActive?"text-foreground font-medium":"hover:text-foreground"}>Spécialités</NavLink>
          <NavLink to="/tarifs" className={({isActive})=>isActive?"text-foreground font-medium":"hover:text-foreground"}>Tarifs</NavLink>
          <NavLink to="/aide" className={({isActive})=>isActive?"text-foreground font-medium":"hover:text-foreground"}>Aide</NavLink>
        </nav>
        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild className="hidden sm:inline-flex">
            <Link to="/connexion">Connexion</Link>
          </Button>
          <Button asChild>
            <Link to="/inscription">S'inscrire</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
