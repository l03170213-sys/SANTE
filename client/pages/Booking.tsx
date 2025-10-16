import { useLocation, Link } from "react-router-dom";

export default function Booking() {
  const location = useLocation();
  const { doctor, time, price } = (location.state as any) ?? {};

  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Left steps + appointment card */}
        <aside className="col-span-1">
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground grid place-items-center">1</div>
                <div>
                  <div className="text-sm font-medium">Authentification</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full border grid place-items-center">2</div>
                <div>
                  <div className="text-sm font-medium">Bénéficiaire</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full border grid place-items-center">3</div>
                <div>
                  <div className="text-sm font-medium">Détails médicaux</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full border grid place-items-center">4</div>
                <div>
                  <div className="text-sm font-medium">Tarification</div>
                </div>
              </li>
            </ol>
          </div>

          <div className="mt-6 rounded-2xl border bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-100 grid place-items-center text-sm font-semibold">{doctor?.name?.split(" ")[1]?.slice(0,2) ?? "DR"}</div>
              <div>
                <div className="text-sm font-semibold">{doctor?.name ?? "Dr Inconnu"}</div>
                <div className="text-xs text-muted-foreground">{doctor?.specialty ?? "Médecin généraliste"}</div>
              </div>
            </div>
            <div className="mt-4 rounded-md border bg-gray-50 p-3 text-sm">
              <div className="flex items-center justify-between">
                <div>Tarif</div>
                <div className="font-medium">{price ?? "6000 FCFA"}</div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div>Rendez-vous</div>
                <div className="font-medium">{time ?? "-"}</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right: login / create account form */}
        <main className="col-span-2">
          <div className="mx-auto max-w-xl rounded-2xl border bg-white p-8 shadow-sm">
            <div className="text-center">
              <img src="https://cdn.builder.io/api/v1/image/assets%2Fa55e2b675d8b4a19887bfba4c19f448e%2F39b7d6fac4a540eaaa705cdeae94bd58?format=webp&width=200" alt="logo" className="mx-auto mb-4 h-10" />
              <h2 className="text-2xl font-semibold">Connectez-vous ou créez votre compte</h2>
              <p className="mt-2 text-sm text-muted-foreground">Renseignez votre email et mot de passe</p>
            </div>

            <form className="mt-6 space-y-4">
              <div>
                <label className="sr-only">Email</label>
                <input type="email" placeholder="Email" className="w-full rounded-md border px-3 py-2" />
              </div>
              <div>
                <label className="sr-only">Mot de passe</label>
                <input type="password" placeholder="Mot de passe" className="w-full rounded-md border px-3 py-2" />
              </div>

              <div className="flex items-center justify-between">
                <a href="#" className="text-sm text-primary underline">Mot de passe oublié</a>
              </div>

              <div className="mt-4">
                <button type="button" className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Suivant</button>
              </div>

              <div className="mt-4 rounded-md bg-primary/5 p-4 text-sm">
                Pas encore de compte ? <Link to="#" className="text-primary underline">Créer un compte</Link>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
