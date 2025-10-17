import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MOTIFS = [
  "Santé mentale",
  "Fièvre",
  "Rhume",
  "Maux de gorge",
  "Renouvellement et Ré-évaluation de traitement",
  "Consultation de suivi",
  "Troubles digestifs",
  "Gêne urinaire",
  "Douleur au dos",
  "Symptômes allergiques",
  "Gynécologie",
  "Problème de peau",
  "Maux de tête",
];

export default function SearchFlow() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [otherText, setOtherText] = useState("");

  const toggle = (m: string) => {
    setSelected((prev) => {
      if (prev.includes(m)) return prev.filter((x) => x !== m);
      if (prev.length >= 3) return prev; // limit 3
      return [...prev, m];
    });
  };

  const onNext = () => {
    // go to results page with selected motives
    navigate('/search/results', { state: { motives: selected.length ? selected : [otherText || 'Autre'] } });
  };

  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-1">
        <main>

          <div className="mx-auto max-w-3xl rounded-2xl border bg-white p-6 shadow-sm">
            <div className="rounded-md bg-primary/10 p-4">
              <div className="text-sm font-medium">Sélectionnez 1 à 3 motifs en santé mentale ou physique</div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
              {MOTIFS.slice(0, showMore ? MOTIFS.length : 6).map((m) => (
                <button
                  key={m}
                  onClick={() => toggle(m)}
                  className={`flex items-center justify-between w-full rounded-md border px-4 py-3 text-sm text-left ${selected.includes(m) ? 'bg-primary/5 ring-2 ring-primary' : 'bg-white'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-100" />
                    <div>
                      <div className="font-medium">{m}</div>
                      <div className="text-xs text-muted-foreground">Ex: description brève</div>
                    </div>
                  </div>
                  <input type="checkbox" readOnly checked={selected.includes(m)} className="h-4 w-4" />
                </button>
              ))}
            </div>

            <div className="mt-4">
              <button onClick={() => setShowMore((s) => !s)} className="text-sm text-primary">{showMore ? 'Afficher moins de motifs' : 'Afficher plus de motifs'}</button>
            </div>

            {showMore && (
              <div className="mt-6">
                <div className="text-sm font-medium">Votre motif n’est pas dans la liste ?</div>
                <textarea value={otherText} onChange={(e)=>setOtherText(e.target.value)} placeholder="Saisir votre motif ici" className="mt-2 w-full rounded-md border p-3" rows={3} />

                <div className="mt-4 rounded-md border bg-primary/5 p-3 text-sm">
                  <ul className="space-y-1 list-disc list-inside text-muted-foreground">
                    <li>Pas d'arrêt de travail de plus de 3 jours, prolongement inclus.</li>
                    <li>Pas d'arrêt pour accident du travail.</li>
                    <li>Pas de certificat pour la pratique sportive.</li>
                  </ul>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-between">
              <div className="text-sm text-muted-foreground">{selected.length} sélectionné(s)</div>
              <div>
                <button onClick={onNext} className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Suivant</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
