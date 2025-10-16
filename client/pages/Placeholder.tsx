import { Link, useLocation } from "react-router-dom";

export default function Placeholder() {
  const { pathname } = useLocation();
  const title = pathname.replace(/\//g, " ").trim() || "Accueil";
  return (
    <div className="container mx-auto py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-semibold tracking-tight">{title.charAt(0).toUpperCase() + title.slice(1)}</h1>
        <p className="mt-4 text-muted-foreground">
          Cette page est en cours de création. Dites-moi ce que vous souhaitez y voir et je l'ajouterai rapidement.
        </p>
        <div className="mt-6">
          <Link className="text-primary underline" to="/">Retour à l'accueil</Link>
        </div>
      </div>
    </div>
  );
}
