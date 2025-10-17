import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const appUrl = import.meta.env.VITE_APP_URL || window.location.origin;
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${appUrl}/connexion`,
      });
      if (error) {
        setMessage(error.message);
      } else {
        setMessage(
          "Un email de réinitialisation a été envoyé si l'adresse existe dans notre système.",
        );
      }
    } catch (err: any) {
      setMessage(err?.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <div className="mx-auto max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Mot de passe oublié</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Entrez votre adresse email; vous recevrez un lien pour réinitialiser
          votre mot de passe.
        </p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="sr-only">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-md border px-3 py-2"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
            >
              {loading ? "Envoi..." : "Envoyer le lien de réinitialisation"}
            </button>
          </div>
        </form>
        {message && (
          <div className="mt-4 text-sm text-center text-muted-foreground">
            {message}
          </div>
        )}
        <div className="mt-4 text-center">
          <Link to="/connexion" className="text-primary underline">
            Retour à la connexion
          </Link>
        </div>
      </div>
    </div>
  );
}
