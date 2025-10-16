import { useLocation, useParams } from "react-router-dom";

import { useLocation, useParams, Link } from "react-router-dom";

const FRONT_IMG = "https://cdn.builder.io/api/v1/image/assets%2Fa55e2b675d8b4a19887bfba4c19f448e%2F1380e7284ab3460a9b906f21b0e632e9?format=webp&width=800";
const BACK_IMG = "https://cdn.builder.io/api/v1/image/assets%2Fa55e2b675d8b4a19887bfba4c19f448e%2F4844691e2b37474981b9d09d2b925079?format=webp&width=800";

export default function Practitioner() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const doctor = (location.state as any)?.doctor ?? { name: "Dr Inconnu", specialty: "Médecin généraliste", city: "Dakar" };

  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleTimeClick = (t: string) => {
    setSelectedTime((s) => (s === t ? null : t));
  };

  const handleBook = () => {
    // navigate to booking/checkout page with selected time
    navigate("/booking", { state: { doctor, time: selectedTime, price: "6000 FCFA" } });
  };

  return (
    <div className="container mx-auto py-12">
      <div className="mx-auto grid gap-8 md:grid-cols-2 items-center">
        {/* Left: phone mockups */}
        <div className="relative flex justify-center">
          <div className="absolute -right-6 top-8 z-0 transform -rotate-6 rounded-3xl shadow-lg" style={{ width: 220, height: 420 }}>
            <img src={BACK_IMG} alt="Disponibilités" className="h-full w-full rounded-3xl object-cover" />
          </div>

          <div className="relative z-10 rounded-3xl shadow-2xl" style={{ width: 300, height: 620 }}>
            <img src={FRONT_IMG} alt="Téléconsultation" className="h-full w-full rounded-3xl object-cover" />
          </div>
        </div>

        {/* Right: details panel */}
        <div>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gray-100 grid place-items-center text-sm font-semibold">{doctor.name.split(" ")[1]?.slice(0,2) ?? "DR"}</div>
            <div>
              <div className="text-lg font-semibold">{doctor.name}</div>
              <div className="text-sm text-muted-foreground">{doctor.specialty}</div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-sm text-muted-foreground">Tarif</div>
              <div className="text-2xl font-bold">6000 FCFA</div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border bg-white p-4 shadow-sm">
            <div className="flex items-center gap-6">
              <button className="border-b-2 border-primary px-3 py-2 text-sm font-medium">Disponibilités</button>
              <button className="px-3 py-2 text-sm text-muted-foreground">Informations</button>
            </div>

            <div className="mt-4">
              <div className="rounded-md border p-3">
                <div className="text-sm font-medium">Dimanche 31 Jan. 2021</div>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {['12:30','13:00','14:30','15:00','16:30','17:00'].map((t)=> (
                    <button key={t} onClick={() => handleTimeClick(t)} className={`rounded-md px-3 py-2 text-sm border ${selectedTime===t? 'bg-primary text-primary-foreground':'bg-white'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-md border p-3">
                <div className="text-sm font-medium">Lundi 1 fév. 2021</div>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {['09:00','09:30','10:00','10:30','11:00','11:30'].map((t)=> (
                    <button key={t} onClick={() => handleTimeClick(t)} className={`rounded-md px-3 py-2 text-sm border ${selectedTime===t? 'bg-primary text-primary-foreground':'bg-white'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 text-right">
              <button onClick={handleBook} disabled={!selectedTime} className={`rounded-md px-4 py-2 text-sm ${selectedTime? 'bg-primary text-primary-foreground':'bg-gray-200 text-gray-500'}`}>
                Prendre rendez‑vous
              </button>
            </div>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Téléconsultation · Secteur 1 · {doctor.city}
          </div>
        </div>
      </div>
    </div>
  );
}
