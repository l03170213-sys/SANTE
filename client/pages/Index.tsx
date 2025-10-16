import { Button } from "@/components/ui/button";
import { Check, Video, CalendarDays, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import PhoneCard from "@/components/ui/PhoneCard";


export default function Index() {
  return (
    <div className="bg-white">
      {/* Hero section under header */}
      <section className="container mx-auto py-12 md:py-20">
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* Left column: headline + bullets + CTA */}
          <div>
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
              Consultez en toute
              <br /> confiance un médecin
              <br /> en ligne aujourd'hui
            </h1>

            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3 w-3" />
                </span>
                <div>
                  <span className="font-medium text-foreground">Santé mentale et physique</span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3 w-3" />
                </span>
                <div>Avec ou sans rendez-vous</div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3 w-3" />
                </span>
                <div>~30 min d'attente moyenne</div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="h-3 w-3" />
                </span>
                <div>Consultation remboursable*</div>
              </li>
            </ul>

            <div className="mt-6 flex items-center gap-4">
              <Button size="lg">Consulter maintenant</Button>
              <Link to="/inscription" className="text-sm text-muted-foreground underline">Découvrir</Link>
            </div>

            <p className="mt-6 max-w-lg text-xs text-muted-foreground">
              *Selon votre situation et le praticien. Les frais non remboursables peuvent s'appliquer en
              fonction des services choisis.
            </p>

          </div>

          {/* Right column: coded phone mockup */}
          <div className="flex items-center justify-center">
            <div className="relative w-[320px] md:w-[420px]">
              {/* Back phone */}
              <div className="absolute -right-6 top-6 z-0 -rotate-6 rounded-3xl border bg-white p-0 shadow-lg md:-right-10 md:top-10 md:p-0" style={{width: '220px', height: '420px'}}>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2Fa55e2b675d8b4a19887bfba4c19f448e%2F4844691e2b37474981b9d09d2b925079?format=webp&width=800"
                  alt="Disponibilités"
                  className="h-full w-full rounded-3xl object-cover"
                />
              </div>

              {/* Front phone */}
              {/* Front phone: extracted component */}
              <div className="relative z-10 mx-auto">
                <PhoneCard />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Stats strip */}
      <section className="container mx-auto -mt-6 md:-mt-10">
        <div className="rounded-2xl bg-white p-2 shadow-sm">
          <div className="grid grid-cols-1 divide-y md:grid-cols-4 md:divide-y-0 md:divide-x items-stretch">

            <div className="flex flex-col items-start justify-center gap-2 px-6 py-6">
              <div className="text-sm font-semibold">2000</div>
              <div className="text-xs text-muted-foreground">médecins inscrits à l'Ordre</div>
            </div>

            <div className="flex flex-col items-start justify-center gap-2 px-6 py-6">
              <div className="text-sm font-semibold">7</div>
              <div className="text-xs text-muted-foreground">millions de consultations</div>
            </div>

            <div className="flex flex-col items-start justify-center gap-2 px-6 py-6">
              <div className="flex items-center gap-3">
                <div className="text-sm font-semibold">4.9</div>
                <div className="flex items-center text-amber-500">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 .587l3.668 7.431L24 9.748l-6 5.843L19.335 24 12 19.897 4.665 24 6 15.591 0 9.748l8.332-1.73z"/></svg>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 .587l3.668 7.431L24 9.748l-6 5.843L19.335 24 12 19.897 4.665 24 6 15.591 0 9.748l8.332-1.73z"/></svg>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 .587l3.668 7.431L24 9.748l-6 5.843L19.335 24 12 19.897 4.665 24 6 15.591 0 9.748l8.332-1.73z"/></svg>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 .587l3.668 7.431L24 9.748l-6 5.843L19.335 24 12 19.897 4.665 24 6 15.591 0 9.748l8.332-1.73z"/></svg>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 .587l3.668 7.431L24 9.748l-6 5.843L19.335 24 12 19.897 4.665 24 6 15.591 0 9.748l8.332-1.73z"/></svg>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">sur les stores</div>
            </div>

            <div className="flex items-center gap-4 px-6 py-6">
              <span className="inline-block h-6 w-8 overflow-hidden rounded-sm">
                <svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg" className="h-full w-full"><rect width="3" height="2" fill="#0055A4"/><rect y="0.67" width="3" height="0.66" fill="#FFFFFF"/><rect y="1.33" width="3" height="0.66" fill="#EF4135"/></svg>
              </span>
              <div className="text-xs text-muted-foreground">Société de téléconsultation agréée par le Ministère de la Santé</div>
            </div>

          </div>
        </div>
      </section>


      {/* Banner: santé mentale */}
      <section className="container mx-auto mb-12">
        <div className="rounded-2xl bg-gradient-to-r from-pink-100 to-pink-50 p-6 md:p-8">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold">Et si vous preniez soin de votre santé mentale ?</h3>
              <p className="mt-2 text-sm text-muted-foreground">Des psy à votre écoute, même le soir et le week-end</p>
            </div>
            <div className="mt-3 flex items-center gap-3 md:mt-0">
              <Button variant="outline">Découvrir Toppatoo Psy</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Nos services */}
      <section className="container mx-auto py-10">
        <h2 className="text-2xl font-semibold mb-6">Nos services</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <a href="#" className="flex items-center justify-between rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-pink-100 grid place-items-center">
                <svg className="h-5 w-5 text-pink-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C9.243 2 7 4.243 7 7c0 2.757 2.243 5 5 5s5-2.243 5-5c0-2.757-2.243-5-5-5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <div className="font-medium">Santé mentale</div>
                <div className="text-sm text-muted-foreground">Médecins Généralistes, Psychiatres et Psychologues</div>
              </div>
            </div>
            <div className="text-muted-foreground">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </a>

          <a href="#" className="flex items-center justify-between rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-emerald-100 grid place-items-center">
                <svg className="h-5 w-5 text-emerald-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v6M5 7h14M8 22h8a2 2 0 002-2v-5H6v5a2 2 0 002 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <div className="font-medium">Santé physique</div>
                <div className="text-sm text-muted-foreground">Médecins Généralistes, Gynécologues, Pédiatres...</div>
              </div>
            </div>
            <div className="text-muted-foreground">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="rounded-lg border bg-white px-4 py-3 shadow-sm">
      <div className="text-lg font-semibold">{number}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}
