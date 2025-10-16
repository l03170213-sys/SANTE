import React from "react";

export default function PhoneCard() {
  return (
    <div className="relative z-10 mx-auto rounded-3xl border bg-white p-4 shadow-2xl" style={{ width: 260, height: 460 }}>
      <div className="h-full w-full overflow-hidden rounded-2xl bg-white">
        {/* top bar */}
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-emerald-500" />
            <div className="text-sm font-medium">Toppatoo</div>
          </div>
          <div className="text-xs text-muted-foreground">Dr. Marie Dupont</div>
        </div>

        {/* video area */}
        <div className="mx-3 mt-2 grid place-items-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 p-4">
          <div className="h-40 w-28 rounded-lg bg-white shadow-md grid place-items-center">
            <div className="h-20 w-20 rounded-full bg-gray-200" />
          </div>
        </div>

        {/* controls */}
        <div className="mt-4 flex items-center justify-center gap-6">
          <div className="h-10 w-10 rounded-full bg-gray-100" />
          <div className="h-12 w-12 rounded-full bg-red-500 shadow-md" />
          <div className="h-10 w-10 rounded-full bg-gray-100" />
        </div>

        {/* details */}
        <div className="mt-4 px-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">Téléconsultation</div>
            <div className="text-xs text-muted-foreground">~15 min</div>
          </div>
          <div className="mt-2 text-xs text-muted-foreground">Depuis votre domicile, sans déplacement</div>
        </div>
      </div>
    </div>
  );
}
