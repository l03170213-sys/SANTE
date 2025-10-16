import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto py-12 grid gap-8 md:grid-cols-4 text-sm">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div aria-hidden className="h-7 w-7 rounded-md bg-primary" />
            <span className="font-semibold text-lg tracking-tight">Qare</span>
          </div>
          <p className="text-muted-foreground">Téléconsultation médicale sécurisée, 7j/7.</p>
        </div>
        <div>
          <h3 className="font-medium mb-3">Patients</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/consulter" className="hover:text-foreground">Prendre rendez-vous</Link></li>
            <li><Link to="/specialites" className="hover:text-foreground">Spécialités</Link></li>
            <li><Link to="/tarifs" className="hover:text-foreground">Tarifs</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium mb-3">Professionnels</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/inscription" className="hover:text-foreground">Rejoindre Qare</Link></li>
            <li><Link to="/aide" className="hover:text-foreground">Centre d'aide</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium mb-3">Légal</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/mentions-legales" className="hover:text-foreground">Mentions légales</Link></li>
            <li><Link to="/confidentialite" className="hover:text-foreground">Confidentialité</Link></li>
            <li><Link to="/cookies" className="hover:text-foreground">Cookies</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Qare — Tous droits réservés</div>
    </footer>
  );
}
