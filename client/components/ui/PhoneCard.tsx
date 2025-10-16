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

        {/* video area - real image */}
        <div className="mx-3 mt-2 grid place-items-center rounded-xl p-2">
          <div className="h-72 w-full overflow-hidden rounded-lg bg-gray-100 shadow-md">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fa55e2b675d8b4a19887bfba4c19f448e%2F1380e7284ab3460a9b906f21b0e632e9?format=webp&width=800"
              alt="Téléconsultation"
              className="h-full w-full object-cover"
            />
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
