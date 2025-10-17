import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PractitionerRecruit() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    postal: "",
    phone: "",
    specialty: "",
    practiceType: "",
    orderNumber: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const onChange = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // basic validation
    if (!form.name || !form.email) {
      alert("Merci de renseigner au minimum le nom et l'email.");
      return;
    }
    setSubmitted(true);
    // simulate send then navigate or show success
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 1500);
  };

  return (
    <div className="bg-white">
      <section className="container mx-auto py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-start">
          <div>
            <div className="rounded-2xl bg-primary/10 p-6 mb-6">
              <h1 className="text-2xl font-bold">Qare Santé recrute des médecins : téléconsultez en toute liberté</h1>
              <p className="mt-3 text-sm text-muted-foreground">Offre exceptionnelle de bienvenue de 1500€* Pour les médecins généralistes qui rejoignent Qare entre le 1er et le 31 octobre 2025. *Sous conditions</p>
            </div>

            <ul className="space-y-4">
              <li className="rounded-2xl border bg-white p-4 shadow-sm">
                <h3 className="font-medium">Liberté totale</h3>
                <p className="text-sm text-muted-foreground mt-1">Choisissez vos horaires et vos créneaux de téléconsultation sans planification préalable.</p>
              </li>
              <li className="rounded-2xl border bg-white p-4 shadow-sm">
                <h3 className="font-medium">Contrat adapté</h3>
                <p className="text-sm text-muted-foreground mt-1">A chaque activité son modèle contractuel.</p>
              </li>
              <li className="rounded-2xl border bg-white p-4 shadow-sm">
                <h3 className="font-medium">Complément de rémunération</h3>
                <p className="text-sm text-muted-foreground mt-1">Rémunération attractive et avantages pour les médecins partenaires.</p>
              </li>
              <li className="rounded-2xl border bg-white p-4 shadow-sm">
                <h3 className="font-medium">Accompagnement personnalisé</h3>
                <p className="text-sm text-muted-foreground mt-1">Support et onboarding pour démarrer rapidement.</p>
              </li>
            </ul>
          </div>

          <div>
            <div className="rounded-2xl border bg-white p-6 shadow-md">
              {!submitted ? (
                <form onSubmit={onSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Nom</label>
                    <input value={form.name} onChange={(e)=>onChange('name', e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Adresse email</label>
                    <input type="email" value={form.email} onChange={(e)=>onChange('email', e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium">Code postal</label>
                      <input value={form.postal} onChange={(e)=>onChange('postal', e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Numéro de téléphone</label>
                      <input value={form.phone} onChange={(e)=>onChange('phone', e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Spécialité médicale</label>
                    <select value={form.specialty} onChange={(e)=>onChange('specialty', e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2">
                      <option value="">Sélectionner</option>
                      <option>Généraliste</option>
                      <option>Pédiatre</option>
                      <option>Gynécologue</option>
                      <option>Dermatologue</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Type de pratique</label>
                    <select value={form.practiceType} onChange={(e)=>onChange('practiceType', e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2">
                      <option value="">Sélectionner</option>
                      <option>Cabinet</option>
                      <option>Hôpital</option>
                      <option>Libéral</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3">
                    <input id="order" type="checkbox" checked={form.orderNumber} onChange={(e)=>onChange('orderNumber', e.target.checked)} />
                    <label htmlFor="order" className="text-sm">Inscrit à l'Ordre des Médecins Français</label>
                  </div>

                  <div className="mt-4">
                    <button type="submit" className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Soumettre</button>
                  </div>
                </form>
              ) : (
                <div className="text-center p-6">
                  <div className="text-lg font-semibold">Merci !</div>
                  <div className="mt-2 text-sm text-muted-foreground">Nous avons reçu votre demande. Un membre de l'équipe vous contactera prochainement.</div>
                </div>
              )}
            </div>

            <div className="mt-4 text-xs text-muted-foreground">
              En soumettant ce formulaire, vous acceptez que vos données soient utilisées pour le processus de recrutement. Voir la politique de confidentialité.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
