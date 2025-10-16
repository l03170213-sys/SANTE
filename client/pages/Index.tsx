import { Button } from "@/components/ui/button";
import { Check, Video, CalendarDays, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

const HERO_IMAGE = "https://cdn.builder.io/api/v1/image/assets%2Fa55e2b675d8b4a19887bfba4c19f448e%2F0faa616b2cf24f4bb758315a0c5b094c?format=webp&width=1200";

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

            {/* Stats row */}
            <div className="mt-8 grid grid-cols-2 gap-3 md:flex md:items-center md:gap-6">
              <StatCard number="2000" label="médecins inscrits à l'Ordre" />
              <StatCard number="7" label="millions de consultations" />
              <div className="hidden md:block md:flex-1" />
            </div>
          </div>

          {/* Right column: image mockup */}
          <div className="flex items-center justify-center">
            <div className="relative w-[320px] md:w-[420px]">
              <img
                src={HERO_IMAGE}
                alt="Aperçu téléconsultation"
                className="z-10 rounded-2xl shadow-2xl"
              />
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
