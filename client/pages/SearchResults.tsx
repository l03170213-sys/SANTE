import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  sector: string;
  city: string;
};

const SAMPLE_DOCTORS: Doctor[] = [
  { id: "1", name: "Dr Zacharie HOUNDEHOTO", specialty: "Gynécologue", sector: "32€ - Secteur 1", city: "Saint-Maur-des-Fossés (94210)" },
  { id: "2", name: "Dr ABDULLAH AL DAAS", specialty: "Gynécologue", sector: "32€ - Secteur 1", city: "Saint-Maur-des-Fossés (94210)" },
];

const TIMES = ["7:00","7:10","7:20","7:30","7:40","7:50","8:00","8:10","8:20","8:30"];

export default function SearchResults(){
  const navigate = useNavigate();
  const location = useLocation();
  const motives = (location.state as any)?.motives ?? [];

  const doctors = useMemo(()=>SAMPLE_DOCTORS, []);

  return (
    <div className="container mx-auto py-12">
      <div className="mb-4 text-sm text-muted-foreground">Prends soin de ta santé — {motives.join(', ')}</div>
      <div className="space-y-6">
        {doctors.map((d)=> (
          <div key={d.id} className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-3 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-gray-100 grid place-items-center text-sm font-semibold">{d.name.split(' ')[1]?.slice(0,2) ?? 'DR'}</div>
                <div>
                  <div className="font-medium">{d.name}</div>
                  <div className="text-xs text-muted-foreground">{d.specialty}</div>
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
                  {TIMES.map((t)=> (
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
    </div>
  );
}
