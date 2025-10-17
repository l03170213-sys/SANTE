import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  sector: string;
  city: string;
};

const SPECIALTIES = [
  "Médecin généraliste",
  "Pédiatre",
  "Psychiatre",
  "Dermatologue",
  "Gynécologue et Sage‑femme",
];

const FIRST = [
  "Zacharie",
  "Abdullah",
  "Berangere",
  "Alexis",
  "Hakima",
  "Anne",
  "Paul",
  "Claire",
  "Julien",
  "Lea",
  "Karim",
  "Sophie",
  "Marie",
  "Laurent",
  "Emma",
  "Thomas",
  "Olivier",
];

const LAST = [
  "HOUNDEHOTO",
  "AL DAAS",
  "BIROLINI",
  "ABI NASR",
  "BAHHOU",
  "MAUREL",
  "DUPONT",
  "MARTIN",
  "PETIT",
  "MOREAU",
  "BEN ALI",
  "LEROUX",
  "ROBERT",
  "GARNIER",
  "FAURE",
  "DURAND",
  "LEFEBVRE",
];

const CITIES = [
  "Paris",
  "Lyon",
  "Marseille",
  "Toulouse",
  "Bordeaux",
  "Nantes",
  "Nice",
  "Strasbourg",
  "Montpellier",
  "Rennes",
];

const TIMES = ["7:00","7:10","7:20","7:30","7:40","7:50","8:00","8:10","8:20","8:30"];

// generate fake doctors per specialty - 10 each
function generateDoctors(): Doctor[] {
  const out: Doctor[] = [];
  SPECIALTIES.forEach((spec, si) => {
    for (let i = 0; i < 10; i++) {
      const idx = (si * 10 + i) % FIRST.length;
      out.push({
        id: `${si + 1}-${i + 1}`,
        name: `Dr ${FIRST[idx]} ${LAST[(idx + i) % LAST.length]}`,
        specialty: spec,
        sector: `${32 + (i % 5)}€ - Secteur ${1 + (i % 3)}`,
        city: CITIES[(si * 3 + i) % CITIES.length],
      });
    }
  });
  return out;
}

export default function SearchResults(){
  const navigate = useNavigate();
  const location = useLocation();
  const motives = (location.state as any)?.motives ?? [];

  const [selectedCategory, setSelectedCategory] = useState<string>(SPECIALTIES[0]);

  const doctors = useMemo(()=> generateDoctors(), []);

  const filtered = useMemo(() => doctors.filter(d => d.specialty === selectedCategory), [doctors, selectedCategory]);

  return (
    <div className="container mx-auto py-12">
      <div className="mb-4 text-sm text-muted-foreground">Prends soin de ta santé — {motives.join(', ')}</div>

      {/* Category tabs */}
      <div className="mb-6 flex flex-wrap gap-3 items-center">
        {SPECIALTIES.map((s) => (
          <button
            key={s}
            onClick={() => setSelectedCategory(s)}
            className={`rounded-full px-4 py-2 text-sm ${s === selectedCategory ? 'bg-primary text-primary-foreground' : 'border bg-white text-muted-foreground'}`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filtered.map((d)=> (
          <div key={d.id} className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-3 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-gray-100 grid place-items-center text-sm font-semibold">{d.name.split(' ')[1]?.slice(0,2) ?? 'DR'}</div>
                <div>
                  <div className="font-medium">{d.name}</div>
                  <div className="text-xs text-muted-foreground">{d.specialty}</div>
                  <div className="mt-2 text-xs text-primary">Tiers payant partiel</div>
                </div>
              </div>

              <div className="col-span-3">
                <div className="rounded-md border p-3 text-sm">
                  <div className="mb-2">{d.sector}</div>
                  <div className="text-muted-foreground text-xs">{d.city}</div>
                </div>
              </div>

              <div className="col-span-6">
                <div className="flex flex-wrap gap-2">
                  {TIMES.slice(0,8).map((t)=> (
                    <button key={t} className="rounded-md border px-3 py-1 text-sm bg-primary/5">{t}</button>
                  ))}
                </div>
                <div className="mt-3">
                  <button onClick={()=>navigate(`/praticien/${d.id}`, { state: { doctor: d } })} className="text-sm text-primary inline-flex items-center gap-2">Voir l'agenda complet <ChevronRight className="h-4 w-4"/></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-sm text-muted-foreground">{filtered.length} praticiens affichés pour « {selectedCategory} »</div>
    </div>
  );
}
