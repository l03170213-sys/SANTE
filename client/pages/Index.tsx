import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Search, Video, CalendarDays, ShieldCheck, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute -right-32 -top-24 h-80 w-80 rounded-full bg-accent blur-3xl" aria-hidden />
        <div className="container mx-auto grid gap-10 py-16 md:grid-cols-2 md:gap-12 md:py-24">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              Remboursé selon conditions
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl">
              Consultez un médecin en vidéo, 7j/7
            </h1>
            <p className="mt-4 max-w-prose text-muted-foreground md:text-lg">
              Prenez rendez-vous en quelques clics avec un médecin généraliste ou un spécialiste. Sans se déplacer, depuis votre mobile ou ordinateur.
            </p>

            <div className="mt-6 rounded-xl border bg-white p-2 shadow-sm">
              <div className="flex flex-col gap-2 md:flex-row">
                <div className="flex-1 rounded-lg border bg-white px-3 py-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Stethoscope className="h-4 w-4" />
                    <input
                      aria-label="Spécialité ou médecin"
                      placeholder="Spécialité ou médecin"
                      className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
                <div className="flex-1 rounded-lg border bg-white px-3 py-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Search className="h-4 w-4" />
                    <input
                      aria-label="Ville ou code postal"
                      placeholder="Ville ou code postal"
                      className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
                <Button size="lg" className="md:px-10">
                  Rechercher
                </Button>
              </div>
              <div className="mt-2 px-1 text-xs text-muted-foreground">
                <Link to="/consulter" className="text-primary underline">Voir les médecins disponibles maintenant</Link>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Video className="h-4 w-4 text-primary" />
                Téléconsultation sécurisée
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                Rendez-vous en quelques minutes
              </div>
            </div>
          </div>

          <div className="relative z-0">
            <div className="relative mx-auto max-w-md rounded-2xl border bg-white p-6 shadow-xl md:max-w-none">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-accent to-primary/10">
                <div className="h-full w-full grid place-items-center">
                  <div className="rounded-full bg-white p-4 shadow-md">
                    <Video className="h-10 w-10 text-primary" />
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Téléconsultation avec un médecin</p>
                  <span className="text-xs text-muted-foreground">~15 min</span>
                </div>
                <p className="text-xs text-muted-foreground">Depuis votre domicile, sans déplacement</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Confiance */}
      <section className="border-y bg-secondary">
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-8 py-8 text-muted-foreground">
          <span className="text-center text-sm">Plébiscité par des milliers de patients</span>
          <div className="flex items-center gap-6 opacity-80">
            <div className="h-6 w-24 rounded bg-foreground/10" />
            <div className="h-6 w-24 rounded bg-foreground/10" />
            <div className="h-6 w-24 rounded bg-foreground/10" />
            <div className="h-6 w-24 rounded bg-foreground/10" />
          </div>
        </div>
      </section>

      {/* Étapes */}
      <section className="container mx-auto py-16 md:py-24">
        <h2 className="text-center text-2xl font-semibold tracking-tight md:text-3xl">
          Comment ça marche ?
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <StepCard index={1} title="Choisissez votre praticien" desc="Trouvez un généraliste ou un spécialiste disponible." />
          <StepCard index={2} title="Prenez rendez-vous" desc="Sélectionnez un créneau et confirmez en ligne." />
          <StepCard index={3} title="Consultez en vidéo" desc="Depuis votre téléphone ou ordinateur, en toute sécurité." />
        </div>
      </section>

      {/* Spécialités */}
      <section className="border-y bg-secondary">
        <div className="container mx-auto py-16 md:py-24">
          <h2 className="text-center text-2xl font-semibold tracking-tight md:text-3xl">
            Spécialités populaires
          </h2>
          <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {[
              "Généraliste",
              "Pédiatre",
              "Gynécologue",
              "Dermatologue",
              "Psychiatre",
              "ORL",
            ].map((s) => (
              <Link
                to="/specialites"
                key={s}
                className="group rounded-full border bg-white px-4 py-2 text-center text-sm font-medium hover:border-primary hover:text-primary"
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-semibold tracking-tight md:text-3xl">
            Questions fréquentes
          </h2>
          <Accordion type="single" collapsible className="mt-8">
            <AccordionItem value="item-1">
              <AccordionTrigger>La téléconsultation est-elle remboursée ?</AccordionTrigger>
              <AccordionContent>
                Selon votre situation et la spécialité, la téléconsultation peut être prise en charge. Renseignez-vous auprès de votre assurance.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Quels équipements sont nécessaires ?</AccordionTrigger>
              <AccordionContent>
                Un smartphone ou un ordinateur avec une caméra, un micro et une connexion internet stable suffisent.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Comment obtenir une ordonnance ?</AccordionTrigger>
              <AccordionContent>
                À l'issue de la consultation, le médecin peut émettre une ordonnance numérique si nécessaire.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="mt-10 text-center">
            <Button asChild size="lg">
              <Link to="/inscription">Créer mon compte</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function StepCard({ index, title, desc }: { index: number; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground font-semibold">
          {index}
        </div>
        <p className="font-medium">{title}</p>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
