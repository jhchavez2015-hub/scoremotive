"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

// Next.js App Router detecta automáticamente este archivo como error boundary
// para todo lo que esté bajo app/tools/*. Si algo truena dentro de page.tsx
// (un cálculo inesperado, un crash de jsPDF, etc.), esto se muestra en vez de
// una pantalla blanca / la app entera caída.
export default function ToolsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Aquí es el lugar natural para mandar el error a un servicio de logging
    // (Sentry, LogRocket, etc.) cuando lo agregues más adelante.
    console.error("ScoreMotive /tools error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-slate-900/60 border border-rose-500/30 rounded-2xl p-6 text-center space-y-4">
        <div className="bg-rose-500/10 border border-rose-500/30 w-12 h-12 rounded-xl flex items-center justify-center mx-auto">
          <AlertTriangle className="h-6 w-6 text-rose-400" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white">
            Algo salió mal con la herramienta
          </h2>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            No pudimos completar el cálculo. Esto no afecta tus datos guardados.
            Intenta de nuevo — si el problema persiste, recarga la página.
          </p>
        </div>
        <button
          onClick={reset}
          className="btn-primary inline-flex items-center gap-2 text-white text-xs font-bold px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Intentar de nuevo
        </button>
      </div>
    </div>
  );
}
