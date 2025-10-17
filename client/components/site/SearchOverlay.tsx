import React, { useEffect, useRef, useState } from "react";
import { X, Search as SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SPECIALTIES = [
  "Médecin généraliste",
  "Pédiatre",
  "Psychiatre",
  "Dermatologue",
  "Gynécologue et Sage‑femme",
];

type Props = {
  open: boolean;
  initialQuery?: string;
  onClose: () => void;
};

export default function SearchOverlay({ open, initialQuery = "", onClose }: Props) {
  const navigate = useNavigate();
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    if (open) {
      // focus input when opened
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const suggestions = SPECIALTIES.filter((s) => s.toLowerCase().includes(query.toLowerCase()));

  const onSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    // navigate to a results page with query
    navigate(`/specialites?query=${encodeURIComponent(query)}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative mx-auto mt-20 max-w-3xl rounded-lg bg-white p-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gray-100 p-2">
            <SearchIcon className="h-4 w-4 text-muted-foreground" />
          </div>
          <form className="flex-1" onSubmit={onSubmit}>
            <label className="sr-only">Recherche</label>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un Généraliste, Psychiatre, Pédiatre..."
              className="w-full border-b px-2 py-2 text-sm outline-none"
            />
          </form>
          <button aria-label="Fermer" onClick={onClose} className="p-2">
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <div>
            <div className="text-sm font-medium text-muted-foreground">Suggestions</div>
            <ul className="mt-2 space-y-2">
              {suggestions.length > 0 ? (
                suggestions.map((s) => (
                  <li key={s}>
                    <button
                      onClick={() => {
                        navigate(`/specialites?query=${encodeURIComponent(s)}`);
                        onClose();
                      }}
                      className="w-full text-left rounded-md px-3 py-2 hover:bg-gray-50"
                    >
                      {s}
                    </button>
                  </li>
                ))
              ) : (
                <li className="text-sm text-muted-foreground">Aucune suggestion</li>
              )}
            </ul>
          </div>

          <div>
            <div className="text-sm font-medium text-muted-foreground">Recherches récentes</div>
            <ul className="mt-2 space-y-2">
              {['Généraliste', 'Pédiatre', 'Dermatologue'].map((r) => (
                <li key={r}>
                  <button
                    onClick={() => {
                      navigate(`/specialites?query=${encodeURIComponent(r)}`);
                      onClose();
                    }}
                    className="w-full text-left rounded-md px-3 py-2 hover:bg-gray-50"
                  >
                    {r}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
