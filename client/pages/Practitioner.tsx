import { useLocation, useParams } from "react-router-dom";

export default function Practitioner() {
  const { id } = useParams();
  const location = useLocation();
  const doctor = (location.state as any)?.doctor ?? { name: "Dr Inconnu", specialty: "Médecin généraliste", city: "Dakar" };

  return (
    <div className="container mx-auto py-12">
      <div className="mx-auto max-w-3xl rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-gray-100 grid place-items-center text-sm font-semibold">{doctor.name.split(" ")[1]?.slice(0,2) ?? "DR"}</div>
          <div>
            <div className="text-lg font-semibold">{doctor.name}</div>
            <div className="text-sm text-muted-foreground">{doctor.specialty}</div>
          </div>
          <div className="ml-auto text-right">
            <div className="text-sm text-muted-foreground">Tarif</div>
            <div className="text-xl font-bold">6000 FCFA</div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
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
              Téléconsultation · Secteur 1 · {doctor.city}
            </div>
            <div className="mt-4">
              <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Prendre rendez‑vous</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
