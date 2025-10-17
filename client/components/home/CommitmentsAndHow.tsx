import React from "react";
import { CheckCircle, Headphones, Heart, ClipboardList } from "lucide-react";

export default function CommitmentsAndHow() {
  return (
    <section className="container mx-auto py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <h3 className="text-2xl font-semibold mb-4">Nos engagements qualité</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/5 p-2">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="font-medium">Formation</div>
                <div className="text-sm text-muted-foreground">100% des médecins sont formés à la téléconsultation et aux bonnes pratiques.</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/5 p-2">
                <Headphones className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="font-medium">Écoute</div>
                <div className="text-sm text-muted-foreground">Nos médecins prennent le temps d'écouter et de comprendre votre situation.</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/5 p-2">
                <ClipboardList className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="font-medium">Suivi</div>
                <div className="text-sm text-muted-foreground">Nous assurons un suivi clair et des conseils adaptés après la consultation.</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/5 p-2">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="font-medium">Confiance</div>
                <div className="text-sm text-muted-foreground">Votre confidentialité et la qualité des soins sont notre priorité.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-2xl font-semibold mb-4">Comment fonctionne une téléconsultation avec Toppatoo</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            <div className="flex items-start gap-4 rounded-2xl border bg-white p-4">
              <div className="h-10 w-10 rounded-full bg-primary/5 grid place-items-center text-primary font-semibold">1</div>
              <div>
                <div className="font-medium">Prenez rendez‑vous en ligne</div>
                <div className="text-sm text-muted-foreground">Choisissez votre créneau et votre praticien, sans déplacement.</div>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border bg-white p-4">
              <div className="h-10 w-10 rounded-full bg-primary/5 grid place-items-center text-primary font-semibold">2</div>
              <div>
                <div className="font-medium">Effectuez votre téléconsultation</div>
                <div className="text-sm text-muted-foreground">Discutez avec le médecin par vidéo depuis votre smartphone ou ordinateur.</div>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border bg-white p-4">
              <div className="h-10 w-10 rounded-full bg-primary/5 grid place-items-center text-primary font-semibold">3</div>
              <div>
                <div className="font-medium">Obtenez un avis médical</div>
                <div className="text-sm text-muted-foreground">Recevez un compte-rendu, ordonnance ou conseils adaptés à votre situation.</div>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border bg-white p-4">
              <div className="h-10 w-10 rounded-full bg-primary/5 grid place-items-center text-primary font-semibold">4</div>
              <div>
                <div className="font-medium">Soyez pris en charge</div>
                <div className="text-sm text-muted-foreground">Suivi et prise en charge selon les recommandations médicales.</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
