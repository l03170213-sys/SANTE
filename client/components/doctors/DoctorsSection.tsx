import { useMemo, useRef, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  sector: string;
  city: string;
  reimbursable?: boolean;
};

const SPECIALTIES = [
  "Médecin généraliste",
  "Pédiatre",
  "Psychiatre",
  "Dermatologue",
  "Gynécologue et Sage‑femme",
];

const FIRST = [
  "BERANGERE",
  "ALEXIS",
  "HAKIMA",
  "ANNE",
  "PAUL",
  "CLAIRE",
  "JULIEN",
  "LEA",
  "KARIM",
  "SOPHIE",
  "MARIE",
  "LAURENT",
  "EMMA",
  "THOMAS",
  "OLIVIER",
];
const LAST = [
  "BIROLINI",
  "ABI NASR",
  "BAHHOU NICOLAS",
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
  "Dakar",
  "Pikine",
  "Thiès",
  "Saint‑Louis",
  "Ziguinchor",
  "Kaolack",
  "Mbour",
  "Tambacounda",
  "Kolda",
  "Diourbel",
  "Rufisque",
  "Louga",
  "Fatick",
  "Matam",
  "Kédougou",
];

// Generate 10 doctors per specialty
const FAKE_DOCTORS: Doctor[] = SPECIALTIES.flatMap((spec, si) =>
  Array.from({ length: 10 }).map((_, ri) => {
    const idx = si * 10 + ri;
    const first = FIRST[idx % FIRST.length];
    const last = LAST[idx % LAST.length];
    return {
      id: `${si + 1}-${ri + 1}`,
      name: `Dr ${first} ${last}`,
      specialty: spec,
      sector: "Secteur 1",
      city: CITIES[idx % CITIES.length],
      reimbursable: ri % 2 === 0,
    };
  }),
);

export default function DoctorsSection() {
  const navigate = useNavigate();
  const [active, setActive] = useState<string>(SPECIALTIES[0]);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const doctors = useMemo(
    () => FAKE_DOCTORS.filter((d) => d.specialty === active),
    [active],
  );

  const scroll = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const offset = el.clientWidth * 0.7;
    el.scrollBy({ left: dir === "left" ? -offset : offset, behavior: "smooth" });
  };

  const goToDoctor = (d: Doctor) => {
    navigate(`/praticien/${d.id}`, { state: { doctor: d } });
  };

  return (
    <section className="container mx-auto py-10">
      <h2 className="text-2xl font-semibold mb-4">Prochaines disponibilités :</h2>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        {SPECIALTIES.map((s) => (
          <button
            key={s}
            onClick={() => setActive(s)}
            className={
              "rounded-full border px-4 py-2 text-sm " +
              (s === active
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:bg-gray-50")
            }
          >
            {s}
          </button>
        ))}
      </div>

      <div className="relative">
        <button
          aria-label="Précédent"
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-sm"
        >
          <ChevronLeft />
        </button>

        <div
          ref={scrollerRef}
          className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth px-12 py-2"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {doctors.map((d) => (
            <article
              key={d.id}
              onClick={() => goToDoctor(d)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  goToDoctor(d);
                }
              }}
              role="button"
              tabIndex={0}
              className="min-w-[280px] max-w-[320px] flex-shrink-0 rounded-2xl border bg-white p-5 shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-100 grid place-items-center text-sm font-semibold">{d.name.split(" ")[1]?.slice(0,2) ?? "DR"}</div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{d.name}</div>
                  <div className="text-xs text-muted-foreground">Médecin Généraliste</div>
                  <div className="mt-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">Tiers payant partiel</div>
                </div>
              </div>

              <div className="mt-4 rounded-lg border bg-gray-50 p-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="text-muted-foreground">Tarif</div>
                  <div className="font-medium">{d.sector}</div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-muted-foreground">Ville</div>
                  <div className="font-medium text-sm">{d.city}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <button
          aria-label="Suivant"
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-sm"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Modal / details */}
      {selected && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40">
          <div className="mx-4 max-w-2xl rounded-2xl bg-white p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-lg font-semibold">{selected.name}</div>
                <div className="text-sm text-muted-foreground">{selected.specialty}</div>
              </div>
              <button onClick={() => setSelected(null)} className="text-muted-foreground">Fermer</button>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-lg border p-4">
                <div className="text-sm font-medium">Disponibilités</div>
                <div className="mt-3 grid gap-2">
                  {['Dimanche 31 Jan. 2021','Lundi 1 fév. 2021','Mardi 2 fév. 2021'].map((day)=> (
                    <div key={day} className="rounded-md border p-3">
                      <div className="text-sm font-medium">{day}</div>
                      <div className="mt-2 grid grid-cols-4 gap-2">
                        {['12:30','13:00','14:30','15:00','16:30','17:00'].slice(0,4).map(t=> (
                          <button key={t} className="rounded-md bg-white px-2 py-1 text-xs border">{t}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="text-sm font-medium">Informations</div>
                <div className="mt-3 text-sm text-muted-foreground">
                  Téléconsultation · {selected.sector} · {selected.city}
                </div>
                <div className="mt-4">
                  <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Prendre rendez‑vous</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
