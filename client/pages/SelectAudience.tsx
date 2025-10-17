import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SelectAudience() {
  const [audience, setAudience] = useState<'adult'|'child'>('adult');
  const navigate = useNavigate();

  const onNext = () => {
    navigate('/search', { state: { beneficiary: audience } });
  };

  return (
    <div className="container mx-auto py-12">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl bg-primary/10 p-6 mb-6">
          <div className="text-sm font-medium">Prenez soin de votre santé</div>
          <div className="text-xs text-muted-foreground mt-1">Consultation en ligne — choisissez pour qui est la consultation</div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">À qui s'adresse la consultation ?</h2>

          <div className="space-y-3">
            <label className={`flex items-center justify-between rounded-md border p-3 ${audience==='adult' ? 'ring-2 ring-primary bg-primary/5' : ''}`}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-100" />
                <div>
                  <div className="font-medium">Adulte</div>
                  <div className="text-xs text-muted-foreground">Âge adulte</div>
                </div>
              </div>
              <input type="radio" name="audience" checked={audience==='adult'} onChange={()=>setAudience('adult')} />
            </label>

            <label className={`flex items-center justify-between rounded-md border p-3 ${audience==='child' ? 'ring-2 ring-primary bg-primary/5' : ''}`}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-100" />
                <div>
                  <div className="font-medium">Enfant - moins de 16 ans</div>
                  <div className="text-xs text-muted-foreground">Pour un mineur</div>
                </div>
              </div>
              <input type="radio" name="audience" checked={audience==='child'} onChange={()=>setAudience('child')} />
            </label>
          </div>

          <div className="mt-6">
            <button onClick={onNext} className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Suivant</button>
          </div>
        </div>
      </div>
    </div>
  );
}
