import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Lang = "fr" | "wo";

const translations: Record<Lang, Record<string, string>> = {
  fr: {
    login: "Connexion",
    searchPlaceholder: "Rechercher un Généraliste, Psychiatre, Pédiatre...",
    consultNow: "Consulter maintenant",
    discover: "Découvrir",
    hero_line1: "Consultez en toute",
    hero_line2: "confiance un médecin",
    hero_line3: "en ligne aujourd'hui",
  },
  wo: {
    // Visible Wolof placeholders (replace with accurate translations later)
    login: "WO: Jàmm",
    searchPlaceholder: "WO: Soppal xam-xam (Généraliste, Pédiatre...)",
    consultNow: "WO: Jëkk ci njàng",
    discover: "WO: Wone benn",
    hero_line1: "WO: Ñëw ci jokkoo",
    hero_line2: "WO: mën nañu jàngal say xalaat",
    hero_line3: "WO: ci internet tey",
    you_are_patient: "WO: Yow nit ku paciente",
    you_are_practitioner: "WO: Yow nit ku praticien",
  },
};

type LangContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const LangContext = createContext<LangContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const v = localStorage.getItem("site_lang");
      return (v as Lang) || "fr";
    } catch (e) {
      return "fr";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("site_lang", lang);
    } catch (e) {}
  }, [lang]);

  const t = (key: string) => {
    return translations[lang]?.[key] ?? key;
  };

  const value = useMemo(() => ({ lang, setLang, t }), [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
